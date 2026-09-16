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
if not KEY:
    _kf = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".openai_key")
    if os.path.exists(_kf):
        KEY = open(_kf).read().strip()
MODEL = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-1")

BASE = ("Photorealistic architectural render of the SAME kitchen shown in the reference photo, same room "
        "geometry, same camera position and lens, same window position, same grey 40x40 floor tiles kept. "
        "Renovated: single run of flat white matte melamine cabinets (Egger white, no handles visible except slim "
        "horizontal stainless bar pulls), polished black granite countertop (Negro Brasil) 2 cm thick with 4 cm "
        "front edge and 7 cm black granite backsplash strip, white glossy subway tile 7.5x15 with graphite grout "
        "between countertop and upper cabinets, white upper cabinets 80 cm tall reaching a closing panel at the "
        "ceiling, warm-neutral 4000K LED strip hidden under the upper cabinets washing light over the black granite, "
        "new white plasterboard ceiling with four small recessed LED spots in a line, the existing window opening kept exactly "
        "where it is: a long horizontal window band about 2.30 m wide and 0.60 m high running along the cabinet wall from "
        "above the washing machine to above the drawers, sill just above the counter, top at the underside of the upper "
        "cabinets, now a new white PVC sliding window with double glazing (three sliding panes) and no blinds. Clean, uncluttered, no dishes, no objects on the counter except a small "
        "bowl of lemons. Realistic materials, natural reflections on the granite, editorial interior photography, "
        "no people, no text, no watermark. IMPORTANT LAYOUT RULE: this is a narrow single-wall galley kitchen. "
        "ALL cabinets, the countertop, the sink, the washing machine and the stove are on ONE wall only, the wall "
        "that has the window. The opposite wall is bare white 20x20 ceramic tile with nothing on it, no cabinets, no "
        "counter, no appliances. No island, no L-shaped corner, no built-in oven, no second sink; the only cooking "
        "appliance is the existing black freestanding gas stove at the far end of the single run.")

VIEWS = {
  "00-global": dict(
    ref=["RENDER:01-frente-cocina.jpg", "ad56bca0-image.jpg"], size="1024x1536",
    prompt=("The first reference image is a finished render of a kitchen wall seen straight on: from left to right a "
            "front-loading washing machine built in under a black granite counter, a cabinet door, a sink under a long "
            "window, a three-drawer unit and a black gas stove at the right end, with white upper cabinets and an LED strip. "
            "Produce the SAME wall with the SAME order of elements, same materials, but photographed in perspective: camera "
            "standing at the kitchen entrance, at the left end of this wall, looking along it, so the washing machine is the "
            "nearest module and the stove is the farthest, the run receding into depth on the right side of the image. At "
            "the near left, perpendicular to that run and touching the washing machine's side, stands the existing stainless "
            "Samsung top-freezer fridge from the second reference photo, facing the camera against the end wall, with a white "
            "cabinet above it; the wall to the left of the fridge is bare white 20x20 tile. The wall opposite the run is bare "
            "white tile with nothing on it. Room 1.90 m wide, 3.55 m long, grey 40x40 floor tiles, white plasterboard ceiling "
            "with recessed LED spots. No island, no L-shape, no second counter, nothing on the fridge's wall except the fridge "
            "and its cabinet. Editorial interior photography, no people, no text, no watermark.")),
  "01-frente-cocina": dict(
    ref=["31a01a22-image.jpg", "ad56bca0-image.jpg"], size="1536x1024",
    prompt=BASE + " CAMERA: standing in the middle of the room facing the cabinet wall straight on, frontal elevation "
           "view, wide angle, showing the whole 3.55 m wall from the left end wall to the right end wall. Only that one wall "
           "is visible. From left to right on that wall: (1) the stainless Samsung fridge in a recess with a white cabinet "
           "above it, (2) the built-in front-loading washing machine under the black granite counter, its round door visible "
           "and flush with the fronts, (3) one cabinet door, (4) the undermount stainless sink with a tall chrome mixer tap "
           "under the window, (5) a three-drawer unit, (6) the existing black freestanding gas stove at the right end with a "
           "slim stainless range hood above. Upper white cabinets run above from the washing machine to the stove, with an open "
           "niche holding a microwave above the washing machine, and the LED strip glowing under them. THE WINDOW IS VERY WIDE: "
           "one continuous white PVC window 2.30 m wide and 0.60 m high with three sliding panes, starting directly above the "
           "washing machine and ending above the drawer unit, filling the whole gap between the counter and the upper cabinets. "
           "There is NO tile between the counter and the upper cabinets except a short piece above the stove; everywhere else "
           "in that gap you see the window glass. The stove stands on this SAME wall, at the right end of the straight run, its side "
           "touching the right side wall; the counter ends at the stove and does NOT turn the corner, there is no counter and no "
           "cabinet on the right side wall."),
  "02-heladera-lavarropas": dict(
    ref=["ad56bca0-image.jpg"],
    prompt=BASE + " CAMERA: frontal close view facing the wall straight on, showing only the left 1.9 m of the cabinet wall. "
           "Everything is on this single wall, in one straight line, no corner, no L-shape: on the left the stainless Samsung "
           "fridge (keep it, but without magnets) in a recess between the tiled side wall and a white melamine side panel, "
           "with a white cabinet above it; immediately to its right the washing machine built in under the black granite "
           "counter, round door visible, flush with the white cabinet fronts; then a white cabinet door and the start of the "
           "sink module. Above the washing machine a white upper cabinet with an open niche holding a microwave, the LED strip "
           "glowing under the upper cabinets onto the white subway tiles. The broom in the corner is gone."),
  "03-lavadero-barra": dict(
    ref=["7b5faf5d-image.jpg"],
    prompt=("Photorealistic architectural render of the SAME small laundry room shown in the reference photo, same "
            "geometry, same camera position standing in the doorway looking in. The room is 1.70 m deep and 1.30 m wide. "
            "EXACT POSITIONS, do not move anything: LEFT WALL: a long window running almost the whole wall, the continuation of the "
            "kitchen window band (new white PVC sliding window with double glazing, 1.60 m wide and 1.00 m high, with a fixed "
            "upper pane with a ventilation grille) and, under it, a new polished black granite breakfast "
            "bar 160 x 50 cm at 90 cm height with a 4 cm front edge, two slim stools with light wood seats and black metal "
            "legs tucked underneath, a small white melamine module with an open shelf at the far end of the bar, a chrome "
            "service tap low in the far corner. BACK WALL (facing the camera): the existing white wall-mounted gas boiler "
            "with its round gauge and copper pipes below, kept exactly where it is, with its flue pipe going up; nothing "
            "else on that wall. RIGHT WALL: the existing large white Orbis gas water heater with louvered front and small "
            "digital display, kept exactly where it is at head height; below it and toward the door a slim white tall broom "
            "cabinet 40 cm wide. Removed: the washing machine, the concrete laundry sink, the ceiling clothes rack, the "
            "plastic drawers, the vacuum cleaner and all clutter. Walls in the existing white 20x20 tiles, cleaned; ceiling "
            "repaired and painted white with one round flush LED ceiling light; light beige floor tiles kept. Bright, tidy, "
            "editorial interior photography, no people, no text.")),
  "04-nocturna-led": dict(
    ref=["31a01a22-image.jpg"], size="1536x1024",
    prompt=BASE + " CAMERA: facing the cabinet wall straight on, frontal view, showing the central part of the run: the "
           "sink in the middle under the long window band, the washing machine at the left edge, the drawers at the right edge. Only "
           "this one wall is visible, no side walls. Evening scene: the room lights are off except the LED strip under the "
           "upper cabinets, which glows warm-neutral over the black granite and the white subway tiles, plus the ceiling "
           "spots at low level. The window shows a dark blue dusk outside. Moody but realistic exposure, the granite "
           "reflecting the LED line. THE WINDOW IS VERY WIDE: one continuous white PVC window 2.30 m wide and 0.60 m high with "
           "three sliding panes, starting directly above the washing machine and ending above the drawer unit, filling the whole "
           "gap between the counter and the upper cabinets; there is NO tile in that gap except a short piece above the stove. The "
           "stove stands on this SAME wall at the right end of the straight run; the counter does NOT turn the corner."),
}

def encode_ref(name, max_side=1536):
    src = os.path.join(OUT, name[7:]) if name.startswith("RENDER:") else os.path.join(UP, name)
    im = Image.open(src).convert("RGB")
    im.thumbnail((max_side, max_side))
    buf = io.BytesIO(); im.save(buf, "PNG"); buf.seek(0)
    return buf

def render(view):
    v = VIEWS[view]
    files = [("image[]", (f"ref{i}.png", encode_ref(n), "image/png")) for i, n in enumerate(v["ref"])]
    data = {"model": MODEL, "prompt": v["prompt"], "size": v.get("size", "1024x1536"), "quality": "high", "n": "1"}
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
