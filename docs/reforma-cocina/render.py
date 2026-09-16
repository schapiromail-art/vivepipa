# -*- coding: utf-8 -*-
"""Genera los renders del anteproyecto con la API de imágenes de OpenAI (gpt-image-1),
usando las fotos actuales como referencia (imagen a imagen).
Uso: OPENAI_API_KEY=... python3 render.py [nombre_vista ...]
"""
import os, sys, base64, json, time, io, requests
from PIL import Image

UP = "/root/.claude/uploads/43c206c1-fcb5-5a46-80aa-692f5ce7647d"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "renders")
os.makedirs(OUT, exist_ok=True)
KEY = os.environ.get("OPENAI_API_KEY")
MODEL = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-1")

BASE = ("Photorealistic architectural render of the SAME kitchen shown in the reference photo, same room "
        "geometry, same camera position and lens, same window position, same grey 40x40 floor tiles kept. "
        "Renovated: single run of flat white matte melamine cabinets (Egger white, no handles visible except slim "
        "horizontal stainless bar pulls), polished black granite countertop (Negro Brasil) 2 cm thick with 4 cm "
        "front edge and 7 cm black granite backsplash strip, white glossy subway tile 7.5x15 with graphite grout "
        "between countertop and upper cabinets, white upper cabinets 80 cm tall reaching a closing panel at the "
        "ceiling, warm-neutral 4000K LED strip hidden under the upper cabinets washing light over the black granite, "
        "new white plasterboard ceiling with four small recessed LED spots in a line, new white PVC sliding window "
        "with double glazing and no blinds. Clean, uncluttered, no dishes, no objects on the counter except a small "
        "bowl of lemons. Realistic materials, natural reflections on the granite, editorial interior photography, "
        "no people, no text, no watermark.")

VIEWS = {
  "01-frente-cocina": dict(
    ref=["31d69a80-image.jpg"],
    prompt=BASE + " View from the kitchen entrance looking down the room toward the laundry door at the far end: "
           "from left to right the fridge framed by a white tower, the built-in front-loading washing machine under the "
           "black granite counter, a cabinet door, the undermount stainless sink with a tall chrome mixer tap, a three-drawer "
           "unit, and the existing black freestanding gas stove at the end with a slim 60 cm stainless range hood above it. "
           "Dog not present."),
  "02-heladera-lavarropas": dict(
    ref=["ad56bca0-image.jpg"],
    prompt=BASE + " Close view of the left end of the run: the stainless Samsung fridge (keep it, but without magnets) sits "
           "in a niche framed by a white melamine side panel and a white cabinet above it; immediately to its right the "
           "washing machine is built in under the black granite counter with its round door visible and flush with the white "
           "cabinet fronts; above, a white upper cabinet with an open niche holding a microwave. The broom in the corner is gone."),
  "03-lavadero-barra": dict(
    ref=["7b5faf5d-image.jpg", "0c8cc46d-image.jpg"],
    prompt=("Photorealistic architectural render of the SAME small laundry room shown in the reference photos, same "
            "geometry and camera position, same wall-mounted white gas boiler and white Orbis water heater kept exactly "
            "where they are with their flue pipes. Renovated: the washing machine, the concrete laundry sink, the ceiling "
            "clothes rack and the clutter are gone. Under the window a polished black granite breakfast bar 160 x 50 cm at "
            "90 cm height with a 4 cm front edge, two slim stools with light wood seats and black metal legs tucked "
            "underneath, a small white melamine module with an open shelf at the right end of the bar, a chrome service "
            "tap low in the corner. New white PVC sliding window with double glazing and a fixed upper pane with a "
            "ventilation grille. Walls in the existing white 20x20 tiles, cleaned; ceiling repaired and painted white with "
            "one round flush LED ceiling light; a slim white tall broom cabinet by the door. Bright, tidy, editorial interior "
            "photography, no people, no text.")),
  "04-nocturna-led": dict(
    ref=["31a01a22-image.jpg"],
    prompt=BASE + " Evening scene: the room lights are off except the LED strip under the upper cabinets, which glows "
           "warm-neutral over the black granite and the white subway tiles, plus the four ceiling spots at low level. The "
           "window shows a dark blue dusk outside. Moody but realistic exposure, the granite reflecting the LED line."),
}

def encode_ref(name, max_side=1536):
    im = Image.open(os.path.join(UP, name)).convert("RGB")
    im.thumbnail((max_side, max_side))
    buf = io.BytesIO(); im.save(buf, "PNG"); buf.seek(0)
    return buf

def render(view):
    v = VIEWS[view]
    files = [("image[]", (f"ref{i}.png", encode_ref(n), "image/png")) for i, n in enumerate(v["ref"])]
    data = {"model": MODEL, "prompt": v["prompt"], "size": "1024x1536", "quality": "high", "n": "1"}
    for attempt in range(3):
        r = requests.post("https://api.openai.com/v1/images/edits",
                          headers={"Authorization": f"Bearer {KEY}"}, files=files, data=data, timeout=300)
        if r.status_code == 200:
            b64 = r.json()["data"][0]["b64_json"]
            im = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGB")
            im.save(os.path.join(OUT, view + ".jpg"), "JPEG", quality=86, optimize=True)
            print("ok", view, im.size)
            return
        print("error", view, r.status_code, r.text[:300]); time.sleep(5)
        files = [("image[]", (f"ref{i}.png", encode_ref(n), "image/png")) for i, n in enumerate(v["ref"])]
    raise SystemExit(f"fallo {view}")

if __name__ == "__main__":
    if not KEY:
        raise SystemExit("Falta OPENAI_API_KEY")
    for view in (sys.argv[1:] or VIEWS):
        render(view)
