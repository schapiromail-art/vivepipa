# -*- coding: utf-8 -*-
S = 110  # px por metro

def fmt(v):
    return f"{v:.2f}".rstrip("0").rstrip(".").replace(".", ",")

class SVG:
    def __init__(self, W, H, ox, oy, label):
        self.W, self.H, self.ox, self.oy, self.label = W, H, ox, oy, label
        self.parts = []
    def X(self, x): return self.ox + x*S
    def Y(self, y): return self.oy + y*S
    def rect(self, x, y, w, h, cls, extra=""):
        self.parts.append(f'<rect class="{cls}" x="{self.X(x):.1f}" y="{self.Y(y):.1f}" width="{w*S:.1f}" height="{h*S:.1f}" {extra}/>')
    def line(self, x1, y1, x2, y2, cls, extra=""):
        self.parts.append(f'<line class="{cls}" x1="{self.X(x1):.1f}" y1="{self.Y(y1):.1f}" x2="{self.X(x2):.1f}" y2="{self.Y(y2):.1f}" {extra}/>')
    def circle(self, x, y, r, cls, extra=""):
        self.parts.append(f'<circle class="{cls}" cx="{self.X(x):.1f}" cy="{self.Y(y):.1f}" r="{r*S:.1f}" {extra}/>')
    def text(self, x, y, s, cls="lbl", anchor="middle", extra=""):
        self.parts.append(f'<text class="{cls}" x="{self.X(x):.1f}" y="{self.Y(y):.1f}" text-anchor="{anchor}" {extra}>{s}</text>')
    def raw(self, s): self.parts.append(s)
    # cota horizontal: y en metros (posición de la línea), texto arriba
    def dimh(self, x1, x2, y, label=None, below=False):
        X1, X2, Y = self.X(x1), self.X(x2), self.Y(y)
        t = 6
        self.parts.append(f'<line class="dim" x1="{X1:.1f}" y1="{Y:.1f}" x2="{X2:.1f}" y2="{Y:.1f}"/>')
        for X in (X1, X2):
            self.parts.append(f'<line class="dim" x1="{X:.1f}" y1="{Y-t:.1f}" x2="{X:.1f}" y2="{Y+t:.1f}"/>')
            self.parts.append(f'<line class="dim" x1="{X-3:.1f}" y1="{Y+3:.1f}" x2="{X+3:.1f}" y2="{Y-3:.1f}"/>')
        lab = label if label is not None else fmt(x2-x1)
        ty = Y+13 if below else Y-4
        self.parts.append(f'<text class="dimt" x="{(X1+X2)/2:.1f}" y="{ty:.1f}" text-anchor="middle">{lab}</text>')
    def dimv(self, y1, y2, x, label=None, right=True):
        Y1, Y2, X = self.Y(y1), self.Y(y2), self.X(x)
        t = 6
        self.parts.append(f'<line class="dim" x1="{X:.1f}" y1="{Y1:.1f}" x2="{X:.1f}" y2="{Y2:.1f}"/>')
        for Y in (Y1, Y2):
            self.parts.append(f'<line class="dim" x1="{X-t:.1f}" y1="{Y:.1f}" x2="{X+t:.1f}" y2="{Y:.1f}"/>')
            self.parts.append(f'<line class="dim" x1="{X-3:.1f}" y1="{Y+3:.1f}" x2="{X+3:.1f}" y2="{Y-3:.1f}"/>')
        lab = label if label is not None else fmt(abs(y2-y1))
        tx = X+5 if right else X-5
        anc = "start" if right else "end"
        self.parts.append(f'<text class="dimt" x="{tx:.1f}" y="{(Y1+Y2)/2+4:.1f}" text-anchor="{anc}">{lab}</text>')
    def out(self):
        body = "\n".join(self.parts)
        return (f'<svg viewBox="0 0 {self.W} {self.H}" role="img" aria-label="{self.label}" '
                f'xmlns="http://www.w3.org/2000/svg">\n{body}\n</svg>')

# ---------- geometría común (metros) ----------
KX, KY = 3.55, 1.90          # cocina interior
WT = 0.15                    # muro
LX0, LX1 = KX+WT, KX+WT+1.70 # lavadero interior en x
LY0, LY1 = 0.00, 1.45        # lavadero interior en y (mismo muro norte que la cocina)

def plan_shell(sv, current):
    # muros (relleno) como polígono simple: dibujamos rectángulos de muro
    # cocina
    sv.rect(-WT, -WT, KX+2*WT, WT, "wall")                 # norte
    sv.rect(-WT, KY, KX+2*WT, WT, "wall")                  # sur
    sv.rect(-WT, -WT, WT, KY+2*WT, "wall")                 # oeste
    sv.rect(KX, -WT, WT, KY+2*WT, "wall")                  # este (muro B)
    # lavadero
    sv.rect(KX, LY0-WT, LX1-KX+WT, WT, "wall")             # norte lav
    sv.rect(KX, LY1, LX1-KX+WT, WT, "wall")                # sur lav
    sv.rect(LX1, LY0-WT, WT, LY1-LY0+2*WT, "wall")         # este lav
    # pisos
    sv.rect(0, 0, KX, KY, "floor")
    sv.rect(LX0, LY0, LX1-LX0, LY1-LY0, "floor")
    # puerta cocina (muro sur, x 0.10-0.90) y puerta lavadero (muro B, y 1.00-1.75)
    sv.rect(0.10, KY, 0.80, WT, "floor")
    sv.raw(f'<path class="thin" d="M{sv.X(0.10):.1f} {sv.Y(KY):.1f} A{0.8*S:.1f} {0.8*S:.1f} 0 0 1 {sv.X(0.90):.1f} {sv.Y(KY-0.80):.1f}" fill="none"/>')
    sv.line(0.90, KY, 0.90, KY-0.80, "thin")
    sv.rect(KX, 0.70, WT, 0.75, "floor")
    sv.raw(f'<path class="thin" d="M{sv.X(KX+WT):.1f} {sv.Y(0.70):.1f} A{0.75*S:.1f} {0.75*S:.1f} 0 0 1 {sv.X(KX+WT+0.75):.1f} {sv.Y(1.45):.1f}" fill="none"/>')
    sv.line(KX+WT, 1.45, KX+WT+0.75, 1.45, "thin")
    # ventanas
    sv.rect(0.70, -WT, 2.30, WT, "win")   # cocina: banda 2,30
    sv.rect(3.75, LY0-WT, 1.60, WT, "win")  # lavadero: continúa la banda, 1,60
    # artefactos a gas fijos
    sv.rect(LX1-0.12, 0.30, 0.12, 0.45, "gas"); sv.text(LX1-0.05, 0.55, "caldera", "lbls", "end", 'transform="rotate(-90 %.1f %.1f)"' % (sv.X(LX1-0.05), sv.Y(0.55)))
    sv.rect(4.60, LY1-0.12, 0.50, 0.12, "gas"); sv.text(4.85, LY1-0.16, "calefón", "lbls")

def plan_actual():
    sv = SVG(780, 400, 60, 70, "Planta actual estimada: cocina lineal de 3,55 por 1,90 y lavadero de 1,70 por 1,30 con lavarropas, pileta, caldera y calefón")
    plan_shell(sv, True)
    sv.rect(0.03, 0.03, 0.60, 0.66, "furn"); sv.text(0.33, 0.40, "helad.", "lbls")
    sv.rect(0.66, 0, 2.32, 0.60, "furn")
    sv.text(1.30, 0.34, "bajo mesada existente", "lbls")
    sv.rect(1.97, 0.10, 0.48, 0.38, "sink", 'rx="4"'); sv.text(2.21, 0.33, "bacha", "lbls")
    sv.rect(2.98, 0.02, 0.55, 0.58, "furn"); sv.text(3.26, 0.34, "cocina", "lbls")
    # lavadero actual
    sv.rect(LX0+0.02, 0.02, 0.60, 0.56, "furn"); sv.text(LX0+0.32, 0.33, "lavarr.", "lbls")
    sv.rect(4.70, 0.02, 0.56, 0.50, "sink", 'rx="3"'); sv.text(4.98, 0.30, "pileta", "lbls")
    sv.rect(LX1-0.42, 0.85, 0.40, 0.42, "furn"); sv.text(LX1-0.22, 1.10, "cajon.", "lbls")
    sv.circle(4.50, 1.10, 0.20, "furn"); sv.text(4.50, 1.13, "aspir.", "lbls")
    # cotas
    sv.dimh(0, KX, -0.42); sv.dimh(LX0, LX1, -0.42)
    sv.dimv(0, KY, KX+WT+0.05+1.70+WT+0.35, right=True)
    sv.dimv(LY0, LY1, LX1+WT+0.12, right=True)
    sv.dimh(0.70, 3.00, -0.27, "vent. 2,30"); sv.dimh(3.75, 5.35, -0.27, "vent. 1,60")
    sv.text(1.78, KY+0.55, "acceso desde living", "lbl")
    sv.text(0.50, 1.35, "COCINA  6,7 m²", "room", "start")
    sv.text(LX0+0.10, 0.80, "LAVADERO", "room", "start"); sv.text(LX0+0.10, 0.98, "2,5 m²", "room", "start")
    return sv.out()

def plan_propuesta():
    sv = SVG(780, 430, 60, 70, "Planta propuesta: heladera, lavarropas embutido, módulo de puerta, bacha, cajonera y cocina en una sola línea; en el lavadero barra de granito bajo la ventana con dos banquetas")
    plan_shell(sv, False)
    # frente cocina
    mods = [(0.00,0.66,"heladera","torre"),(0.66,1.28,"lavarr.","embutido"),(1.28,1.73,"puerta","residuos"),
            (1.73,2.53,"bacha","2 puertas"),(2.53,2.98,"cajones","3"),(2.98,3.55,"cocina","57")]
    for x0,x1,a,b in mods:
        cls = "furn" if a not in ("heladera","cocina") else "furn2"
        d = 0.60 if a!="heladera" else 0.66
        sv.rect(x0+0.01, 0.01, x1-x0-0.02, d-0.02, cls)
        sv.text((x0+x1)/2, 0.28, a, "lbls"); sv.text((x0+x1)/2, 0.42, b, "lbls2")
    sv.rect(1.88, 0.10, 0.50, 0.40, "sink", 'rx="4"')
    sv.line(0.66, 0.64, 3.55, 0.64, "granite")   # mesada granito (frentín)
    sv.text(2.10, 0.80, "mesada granito Negro Brasil 2 cm · prof. 0,64", "lbl")
    # lavadero propuesta
    sv.rect(LX0, LY0, 1.60, 0.50, "granite2"); sv.text(LX0+0.62, LY0+0.22, "barra granito", "lblw"); sv.text(LX0+0.62, LY0+0.38, "1,60 × 0,50 · h 0,90", "lblw2")
    sv.rect(LX0+1.17, LY0+0.03, 0.40, 0.44, "thinrw"); sv.text(LX0+1.37, LY0+0.28, "mód. 0,45", "lblw2")
    sv.circle(LX0+0.30, LY0+0.78, 0.17, "stool"); sv.circle(LX0+0.85, LY0+0.78, 0.17, "stool")
    sv.text(LX0+0.57, LY0+1.10, "2 banquetas", "lbls2")
    sv.circle(LX1-0.08, LY0+0.58, 0.04, "sink"); sv.text(LX1-0.14, LY0+0.62, "canilla", "lbls2", "end")
    sv.rect(LX0+0.02, LY1-0.36, 0.40, 0.34, "furn"); sv.text(LX0+0.22, LY1-0.18, "escob.", "lbls2")
    sv.dimv(LY0+0.50, LY1, LX0+1.62, "paso 0,95", right=False)
    # cotas frente
    y = -0.27
    for x0,x1,a,b in mods: sv.dimh(x0, x1, y)
    sv.dimh(0, KX, -0.42); sv.dimh(LX0, LX0+1.60, -0.42, "barra 1,60")
    sv.dimv(0, KY, LX1+WT+0.12, right=True)
    sv.text(0.50, 1.35, "COCINA", "room", "start")
    sv.text(1.78, KY+0.55, "acceso desde living", "lbl")
    sv.text(LX0+0.05, LY1+0.55, "LAVADERO / DESAYUNADOR", "room", "start")
    return sv.out()

def alzado_cocina():
    # z hacia arriba: convertimos con Y = oy + (H - z)
    H = 2.60
    sv = SVG(720, 470, 70, 40, "Alzado del frente de cocina: torre de heladera, lavarropas embutido bajo mesada, módulos blancos, mesada de granito negro, ventana PVC, alacenas con tira LED y cielorraso de durlock")
    def R(x, z, w, h, cls, extra=""): sv.rect(x, H-z-h, w, h, cls, extra)
    def T(x, z, s, cls="lbls", anchor="middle"): sv.text(x, H-z, s, cls, anchor)
    R(0, 0, KX, H, "floor")
    R(3.00, 0.99, 0.55, 0.61, "tile"); R(0.66, 0.99, 0.04, 0.61, "tile")
    R(0, 2.52, KX, 0.08, "ceil"); T(0.06, 2.545, "cielorraso durlock 2,52", "lbls2", "start")
    # torre heladera
    R(0.03, 0.05, 0.60, 1.72, "furn2"); T(0.33, 0.95, "heladera", "lbls"); T(0.33, 0.80, "0,60 × 1,72", "lbls2")
    R(0.00, 1.80, 0.66, 0.60, "furn"); T(0.33, 2.08, "alacena", "lbls"); T(0.33, 1.94, "0,66 × 0,60", "lbls2")
    R(0.63, 0.10, 0.03, 2.30, "panel")
    # zócalo + bajo mesada
    R(0.66, 0.00, 2.32, 0.10, "plinth")
    R(0.66, 0.10, 0.62, 0.78, "nicho"); sv.circle(0.97, H-0.50, 0.19, "thinc"); sv.circle(0.97, H-0.50, 0.13, "thinc")
    T(0.97, 0.80, "lavarropas", "lbls"); T(0.97, 0.16, "nicho 62 × 88", "lbls2")
    R(1.29, 0.10, 0.43, 0.78, "furn"); T(1.505, 0.50, "puerta", "lbls"); T(1.505, 0.37, "residuos", "lbls2")
    R(1.74, 0.10, 0.39, 0.78, "furn"); R(2.14, 0.10, 0.38, 0.78, "furn"); T(2.13, 0.50, "bacha", "lbls"); T(2.13, 0.37, "2 puertas 0,40", "lbls2")
    R(2.54, 0.10, 0.43, 0.20, "furn"); R(2.54, 0.31, 0.43, 0.25, "furn"); R(2.54, 0.57, 0.43, 0.31, "furn"); T(2.755, 0.44, "cajones", "lbls")
    # tiradores
    for x in (1.31, 1.76, 2.49): sv.line(x, H-0.70, x, H-0.55, "handle")
    for z in (0.20, 0.44, 0.73): sv.line(2.66, H-z, 2.86, H-z, "handle")
    # mesada granito
    R(0.66, 0.88, 2.32, 0.04, "granite2"); R(0.66, 0.92, 2.32, 0.07, "granite2")
    R(0.66, 0.99, 2.89, 0.01, "granite2")
    # cocina
    R(2.98, 0.00, 0.57, 0.88, "furn2"); T(3.265, 0.45, "cocina", "lbls"); T(3.265, 0.32, "0,55 existente", "lbls2")
    # ventana
    R(0.70, 1.00, 2.30, 0.60, "winel"); sv.line(1.467, H-1.00, 1.467, H-1.60, "thin"); sv.line(2.233, H-1.00, 2.233, H-1.60, "thin")
    T(1.85, 1.38, "ventana PVC DVH 2,30 × 0,60 · banda existente", "lbls"); T(1.85, 1.24, "3 hojas corredizas · sigue en el lavadero", "lbls2")
    # alacenas
    R(0.66, 1.60, 0.62, 0.40, "nicho"); T(0.97, 1.78, "microondas", "lbls2"); R(0.66, 2.00, 0.62, 0.40, "furn")
    R(1.29, 1.60, 0.43, 0.80, "furn"); R(1.74, 1.60, 0.39, 0.80, "furn"); R(2.14, 1.60, 0.38, 0.80, "furn"); R(2.54, 1.60, 0.43, 0.80, "furn")
    R(2.98, 1.75, 0.57, 0.65, "furn"); R(2.98, 1.62, 0.57, 0.12, "hood"); T(3.265, 1.665, "purificador 60", "lbls2")
    R(0.66, 2.40, 2.89, 0.12, "panel"); T(2.10, 2.445, "tapa de cierre", "lbls2")
    # LED
    sv.line(0.66, H-1.60, 2.98, H-1.60, "led"); T(1.90, 1.635, "tira LED 4000K en perfil de aluminio", "led-t")
    # spots
    for x in (0.55, 1.45, 2.35, 3.20):
        sv.circle(x, H-2.56, 0.05, "led-c")
    # cotas horizontales
    zc = -0.18
    for x0,x1 in [(0,0.66),(0.66,1.28),(1.28,1.73),(1.73,2.53),(2.53,2.98),(2.98,3.55)]: sv.dimh(x0, x1, H-zc, below=True)
    sv.dimh(0, KX, H+0.34, below=True)
    # cotas verticales
    xd = KX+0.18
    sv.dimv(H-0.90, H, xd, "0,90"); sv.dimv(H-1.60, H-0.90, xd, "0,70"); sv.dimv(H-2.40, H-1.60, xd, "0,80"); sv.dimv(H-2.52, H-2.40, xd, "0,12")
    sv.dimv(0, H, xd+0.42, "2,60")
    return sv.out()

def alzado_lavadero():
    H = 2.40; L = 1.70
    sv = SVG(520, 430, 70, 40, "Alzado de la pared de la ventana del lavadero: barra de granito a 0,90 con dos banquetas, ventana PVC con paño fijo ventilado arriba, canilla de servicio y estante bajo barra para la aspiradora")
    def R(x, z, w, h, cls, extra=""): sv.rect(x, H-z-h, w, h, cls, extra)
    def T(x, z, s, cls="lbls", anchor="middle"): sv.text(x, H-z, s, cls, anchor)
    R(0, 0, L, H, "floor")
    R(0, 0, L, 1.05, "tile")
    R(0.05, 1.00, 1.60, 1.00, "winel"); sv.line(0.85, H-1.00, 0.85, H-2.00, "thin")
    T(0.85, 1.55, "PVC DVH 1,60 × 1,00", "lbls"); T(0.85, 1.42, "continúa la banda de cocina · 2 hojas", "lbls2")
    R(0.05, 2.00, 1.60, 0.30, "winfix"); T(0.85, 2.135, "paño fijo + rejilla de ventilación permanente", "lbls2")
    # barra
    R(0.00, 0.88, 1.60, 0.04, "granite2"); R(0.00, 0.92, 1.60, 0.07, "granite2")
    T(0.80, 0.80, "barra granito Negro Brasil 1,60 × 0,50", "lbls2")
    # estante bajo barra aspiradora
    R(1.15, 0.12, 0.45, 0.74, "nicho"); T(1.375, 0.64, "aspiradora", "lbls2"); T(1.375, 0.52, "balde", "lbls2")
    R(1.15, 0.00, 0.45, 0.12, "plinth")
    # banquetas
    for x in (0.35, 0.85):
        R(x-0.17, 0.62, 0.34, 0.05, "stool"); R(x-0.02, 0.04, 0.04, 0.58, "stool"); R(x-0.15, 0.00, 0.30, 0.04, "stool")
    T(0.60, 0.30, "banquetas h 0,65", "lbls2")
    # canilla servicio
    R(1.62, 0.52, 0.06, 0.04, "sink"); sv.line(1.65, H-0.52, 1.65, H-0.40, "thin"); T(1.69, 0.30, "canilla", "lbls2", "end")
    R(1.40, -0.02, 0.30, 0.03, "hood"); T(1.55, 0.06, "rejilla", "lbls2")
    # LED bajo barra
    sv.line(0.02, H-0.86, 1.13, H-0.86, "led"); T(0.57, 0.70, "tira LED opcional bajo barra", "led-t")
    # cotas
    sv.dimh(0.05, 1.65, H+0.18, "ventana 1,60", below=True)
    sv.dimh(0, 1.60, H+0.34, "barra 1,60", below=True)
    xd = L+0.18
    sv.dimv(H-0.90, H, xd, "0,90"); sv.dimv(H-1.00, H-0.90, xd, "0,10"); sv.dimv(H-2.00, H-1.00, xd, "1,00"); sv.dimv(H-2.30, H-2.00, xd, "0,30")
    return sv.out()

def plan_luz():
    sv = SVG(780, 400, 60, 70, "Plano de iluminación: cuatro spots LED embutidos en línea sobre el borde de la mesada, tira LED bajo alacenas, plafón estanco en el lavadero, tira opcional bajo barra y puntos de encendido junto a cada puerta")
    plan_shell(sv, False)
    sv.rect(0.66, 0.0, 2.89, 0.35, "thinr"); sv.text(2.10, 0.20, "alacenas", "lbls2")
    sv.rect(0.03, 0.03, 0.60, 0.66, "thinr"); sv.rect(0.66, 0.35, 2.89, 0.29, "thinr")
    sv.rect(LX0, LY0, 1.60, 0.50, "thinr")
    # spots
    for x in (0.55, 1.45, 2.35, 3.20):
        sv.circle(x, 0.85, 0.09, "led-c"); sv.circle(x, 0.85, 0.03, "led-c2")
    sv.text(2.05, 1.15, "4 spots LED 12 W · 4000K · línea a 0,85", "led-t")
    sv.line(0.66, 0.36, 3.55, 0.36, "led"); sv.text(2.10, 0.50, "tira LED bajo alacena 9,6 W/m · 4000K · 2,9 m", "led-t")
    # lavadero
    sv.circle(LX0+0.85, 1.42, 0.14, "led-c"); sv.text(LX0+0.85, 1.72, "plafón 18 W", "led-t")
    sv.line(LX0, LY0+0.48, LX0+1.13, LY0+0.48, "led"); sv.text(LX0+0.56, LY0+0.66, "tira bajo barra (opc.)", "led-t")
    # llaves
    sv.rect(0.95, KY-0.10, 0.10, 0.10, "sw"); sv.text(1.02, KY-0.16, "llave 2 pts + LED", "lbls2", "start")
    sv.rect(KX-0.10, 0.88, 0.10, 0.10, "sw"); sv.text(KX-0.13, 1.10, "llave lav.", "lbls2", "end")
    # tomas
    tomas = [(0.30,0.02,"helad."),(0.97,0.02,"lavarr. 20 A"),(1.50,0.02,"tomas"),(2.75,0.02,"tomas"),(3.26,0.02,"purif."),(0.97,0.38,"micro")]
    for x,y,t in tomas:
        sv.rect(x-0.05, y, 0.10, 0.06, "sw")
    sv.text(1.78, KY+0.45, "tomas: heladera · lavarropas 20 A dedicado · 2 dobles a 1,15 · microondas · purificador", "lbls2")
    sv.dimh(0, KX, -0.42); sv.dimh(LX0, LX1, -0.42)
    return sv.out()

svgs = dict(actual=plan_actual(), prop=plan_propuesta(), alz=alzado_cocina(), lav=alzado_lavadero(), luz=plan_luz())

import os, base64
CAPS = {
  "01-frente-cocina": "Frente completo de 3,55 m visto de frente, como el alzado: heladera en su nicho con alacena y microondas arriba, lavarropas embutido al lado, puerta, bacha, cajonera y la cocina existente al final de la misma línea con purificador; mesada de granito Negro Brasil, alacenas hasta el cielorraso, tira LED y spots. La banda de ventana real mide 2,30 m, desde el lavarropas hasta la cajonera; el render la dibuja algo más corta.",
  "02-heladera-lavarropas": "Detalle del extremo izquierdo (recorte de la vista anterior): heladera en su nicho con alacena de cierre y nicho de microondas, lavarropas embutido a ras de los frentes bajo el granito, arranque de la banda de ventana sobre la mesada.",
  "03-lavadero-barra": "Lavadero desde la puerta: ventana nueva de PVC y barra de granito de 1,60 en la pared izquierda, caldera en la pared del fondo y calefón Orbis en la derecha con el escobero debajo, todos donde están hoy. La imagen muestra la variante con bacha compacta en la barra.",
  "04-nocturna-led": "El tramo lavarropas a cajonera de noche, con la tira LED bajo alacena como luz principal: el granito negro refleja la línea de luz, el vidrio de la banda de ventana y el subway la devuelven.",
}
def renders_section():
    d = os.path.join(os.path.dirname(os.path.abspath(__file__)), "renders")
    if not os.path.isdir(d): return ""
    items = []
    for name in sorted(os.listdir(d)):
        if not name.endswith(".jpg"): continue
        key = name[:-4]
        b64 = base64.b64encode(open(os.path.join(d, name), "rb").read()).decode()
        items.append(f'<figure class="render"><img src="data:image/jpeg;base64,{b64}" alt="{CAPS.get(key, key)}" loading="lazy"><figcaption>{CAPS.get(key, key)}</figcaption></figure>')
    if not items: return ""
    return ('<section id="renders">\n<div class="sec-head"><span class="n">09</span><h2>Renders</h2></div>\n'
            '<p>Imágenes generadas sobre las fotos actuales del departamento (imagen a imagen), manteniendo la geometría del ambiente, la posición de la cámara y los artefactos que se conservan. Son una referencia de materiales y luz, no un fotomontaje a escala: las medidas válidas son las de los planos.</p>\n'
            '<div class="renders">' + "\n".join(items) + '</div>\n</section>')
html = open("template.html", encoding="utf-8").read()
html = html.replace("{{RENDERS}}", renders_section())
for k, v in svgs.items():
    html = html.replace("{{SVG_%s}}" % k.upper(), v)
open("remodelacion-cocina-lavadero.html", "w", encoding="utf-8").write(html)
print(len(html))
