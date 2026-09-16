import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
const pg = await b.newPage({ viewport: { width: 1700, height: 1300 }, deviceScaleFactor: 1 });
let html = fs.readFileSync('remodelacion-cocina-lavadero.html', 'utf8');
html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>', '<script>' + fs.readFileSync('three.min.js', 'utf8') + '</script>');
await pg.setContent('<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0">' + html + '</body></html>', { waitUntil: 'load' });
await pg.addStyleTag({ content: '.viewer{width:1536px !important;max-width:none !important;aspect-ratio:3/2 !important;border:0 !important}.viewbtns{display:none !important}' });
await pg.waitForTimeout(1500);
const views = [
  ['pasillo', {t:[1.75,1.0,0.35], r: 2.45, theta: 0.12, phi: 1.25, fov: 74}],
  ['lavadero', {t:[1.7,1.0,0.45], r: 3.4, theta: 0.62, phi: 1.28}],
  ['frontal', {t:[1.78,1.2,0.3], r: 3.5, theta: 0, phi: 1.50}],
];
for (const [name, v] of views) {
  const data = await pg.evaluate(([v]) => { const m = window.__maqueta; m.doorG.rotation.y = 0; m.camera.fov = v.fov || 58; m.camera.updateProjectionMatrix(); m.M.glass.color.setHex(0x5f9fd0); m.M.glass.emissive.setHex(0x3f7fb0); m.M.glass.emissiveIntensity = 0.6; m.target.set(v.t[0], v.t[1], v.t[2]); m.sph.r = v.r; m.sph.theta = v.theta; m.sph.phi = v.phi; m.resize(); m.apply(); m.render(); return document.getElementById('c3d').toDataURL('image/png'); }, [v]);
  fs.writeFileSync('ref3d-' + name + '.png', Buffer.from(data.split(',')[1], 'base64'));
  const proj = await pg.evaluate(() => {
    const m = window.__maqueta; const c = document.getElementById('c3d'); const W = c.width, H = c.height;
    function P(x, y, z){ const v = new THREE.Vector3(x, y, z).project(m.camera); return [Math.round((v.x + 1) / 2 * W), Math.round((1 - v.y) / 2 * H)]; }
    function quad(x0, x1, y0, y1, z){ return [P(x0, y1, z), P(x1, y1, z), P(x1, y0, z), P(x0, y0, z)]; }
    return { W: W, H: H,
      window: quad(0.70, 3.00, 1.00, 1.60, 0.0),
      door1: quad(0.67, 1.29, 0.00, 0.88, 0.62),
      door2: quad(1.29, 1.74, 0.00, 0.88, 0.62) };
  });
  fs.writeFileSync('ref3d-' + name + '.json', JSON.stringify(proj));
  console.log('saved', name);
}
await b.close();
