# -*- coding: utf-8 -*-
"""Rehace con máscara la banda de ventana y las dos primeras puertas en un render generado desde la maqueta.
Uso: python3 fixmask.py <vista> [luz]   (la máscara sale de ref3d-<vista>.json; el render de renders/<vista>.jpg)"""
import os, sys, json, io, base64, time, requests
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
KEY = os.environ.get("OPENAI_API_KEY") or open(os.path.join(HERE, ".openai_key")).read().strip()
LIGHT = {"dia": "daylight, frosted white glass, LED strip off",
         "atardecer": "warm orange sunset light through the glass, LED strip on above",
         "noche": "dark blue night outside the glass, LED strip on above lighting the frames"}
def run(view, light, base=None):
    base = base or view.split('-')[1]  # pasillo / lavadero / frontal
    proj = json.load(open(os.path.join(HERE, f"ref3d-{base}.json")))
    src = os.path.join(HERE, "renders", view + ".jpg")
    im = Image.open(src).convert("RGB")
    assert im.size == (proj["W"], proj["H"]), im.size
    os.makedirs(os.path.join(HERE, "cand"), exist_ok=True)
    im.save(os.path.join(HERE, "cand", view + "-premask.jpg"), "JPEG", quality=90)
    mask = Image.new("RGBA", im.size, (0, 0, 0, 255)); d = ImageDraw.Draw(mask)
    pad = 8
    def grow(poly):
        cx = sum(p[0] for p in poly)/4; cy = sum(p[1] for p in poly)/4
        return [(x + (pad if x > cx else -pad), y + (pad if y > cy else -pad)) for x, y in poly]
    for k in ("window", "door1", "door2"):
        d.polygon(grow(proj[k]), fill=(0, 0, 0, 0))
    mb = io.BytesIO(); mask.save(mb, "PNG"); mb.seek(0)
    ib = io.BytesIO(); im.save(ib, "PNG"); ib.seek(0)
    prompt = ("Edit ONLY the transparent masked areas and keep every other pixel exactly as it is. UPPER MASKED STRIP: one "
              "continuous white PVC sliding window 2.30 m wide and 0.60 m high with three sliding panes and slim white frames, "
              "filling the ENTIRE strip from its left edge to its right edge (it starts above the first cabinet door and ends "
              "above the drawers), " + LIGHT[light] + ", no wall tile anywhere inside the strip. LOWER MASKED AREA under the "
              "counter: two flat white matte melamine doors side by side, the LEFT one clearly WIDER (0.62 m; it hides the "
              "built-in washing machine and has a slim horizontal ventilation grille near its bottom) and the RIGHT one "
              "narrower (0.45 m), each with a slim vertical stainless bar pull, matching the style, color and lighting of the "
              "other doors. Photorealistic, seamless with the rest of the image.")
    files = [("image", (view + ".png", ib, "image/png")), ("mask", ("mask.png", mb, "image/png"))]
    data = {"model": "gpt-image-1", "prompt": prompt, "size": f"{im.size[0]}x{im.size[1]}", "quality": "high", "n": "1"}
    for attempt in range(3):
        r = requests.post("https://api.openai.com/v1/images/edits", headers={"Authorization": f"Bearer {KEY}"}, files=files, data=data, timeout=300)
        if r.status_code == 200:
            out = Image.open(io.BytesIO(base64.b64decode(r.json()["data"][0]["b64_json"]))).convert("RGB")
            out.save(src, "JPEG", quality=88, optimize=True); print("ok", view, out.size); return
        print("error", view, r.status_code, r.text[:300]); time.sleep(5); ib.seek(0); mb.seek(0)
    raise SystemExit("fallo " + view)
if __name__ == "__main__":
    run(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "dia", sys.argv[3] if len(sys.argv) > 3 else None)
