#!/usr/bin/env python3
"""Gera o artifact de preview do kit a partir de produto/pdfs/*.md.

Cada arquivo .md tem um front matter e páginas separadas por <!-- ══ PÁGINA n ══ -->.
A saída é o HTML do artifact, com TODAS as páginas renderizadas.
"""
import re, glob, os, html, json, sys

PDF_DIR = 'produto/pdfs'
OUT = sys.argv[1] if len(sys.argv) > 1 else 'kit.html'

# ── ilustrações do arquivo 07, desenhadas à mão ──
FACE = '''
  <ellipse cx="60" cy="76" rx="35" ry="45" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".55"/>
  <path d="M40 65 q7 -5 14 0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>
  <path d="M66 65 q7 -5 14 0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>
  <path d="M38 56 q8 -4 15 -1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".45"/>
  <path d="M67 55 q8 -3 15 1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".45"/>
  <path d="M58 80 q3 7 5 7" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".45"/>
  <path d="M51 98 q9 5 18 0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>'''
ARROW = '<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 1 L9 5 L0 9 z" fill="#C03A63"/></marker></defs>'

ILUS = {
1: f'''<figure><svg viewBox="0 0 120 150" role="img" aria-label="Rosto de frente com seta diagonal da maçã do rosto em direção à têmpora">{ARROW}{FACE}
  <ellipse cx="42" cy="82" rx="11" ry="7" fill="#C03A63" opacity=".16" transform="rotate(-28 42 82)"/>
  <line x1="48" y1="86" x2="28" y2="62" stroke="#C03A63" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar)"/>
</svg><figcaption>Da maçã para a têmpora, sempre subindo</figcaption></figure>''',
2: f'''<figure><svg viewBox="0 0 120 150" role="img" aria-label="Rosto de frente com quatro pontos de luz numerados">{FACE}
  <circle cx="44" cy="78" r="4.5" fill="#C03A63"/><text x="44" y="80.5" text-anchor="middle" font-size="5.5" fill="#fff" font-family="Poppins,sans-serif" font-weight="600">1</text>
  <circle cx="36" cy="56" r="4.5" fill="#C03A63"/><text x="36" y="58.5" text-anchor="middle" font-size="5.5" fill="#fff" font-family="Poppins,sans-serif" font-weight="600">2</text>
  <circle cx="56" cy="66" r="4.5" fill="#C03A63"/><text x="56" y="68.5" text-anchor="middle" font-size="5.5" fill="#fff" font-family="Poppins,sans-serif" font-weight="600">3</text>
  <circle cx="60" cy="92" r="4.5" fill="#C03A63"/><text x="60" y="94.5" text-anchor="middle" font-size="5.5" fill="#fff" font-family="Poppins,sans-serif" font-weight="600">4</text>
</svg><figcaption>Os quatro pontos que pegam luz num rosto firme</figcaption></figure>''',
3: f'''<figure><svg viewBox="0 0 120 82" role="img" aria-label="Detalhe do olho com traço curto ascendente no canto externo">{ARROW}
  <path d="M24 48 q26 -19 58 0 q-26 17 -58 0" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>
  <circle cx="53" cy="48" r="7" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>
  <path d="M26 26 q26 -9 54 1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>
  <line x1="82" y1="46" x2="98" y2="34" stroke="#C03A63" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar)"/>
</svg><figcaption>Poucos milímetros, esfumado. É direção, não delineado</figcaption></figure>''',
4: '''<figure><svg viewBox="0 0 120 60" role="img" aria-label="Duas sobrancelhas comparadas: uma com a ponta caindo, outra terminando na horizontal">
  <path d="M6 24 q20 -8 40 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".45"/>
  <text x="26" y="48" text-anchor="middle" font-size="8" fill="currentColor" opacity=".6" font-family="Poppins,sans-serif">cai ✗</text>
  <path d="M70 26 q20 -9 40 -3" fill="none" stroke="#C03A63" stroke-width="2" stroke-linecap="round"/>
  <text x="90" y="48" text-anchor="middle" font-size="8" fill="#C03A63" font-family="Poppins,sans-serif">horizontal ✓</text>
</svg><figcaption>A ponta nunca desce abaixo do início</figcaption></figure>'''}

def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<![\*\w])\*([^*\n]+?)\*(?!\*)', r'<em>\1</em>', t)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', t)
    return t

def render(md, is_cover, is_print, filenum):
    lines = md.split('\n')
    out, i = [], 0
    while i < len(lines):
        ln = lines[i]; st = ln.strip()

        if not st:
            i += 1; continue

        if st == '---':
            out.append('<hr>'); i += 1; continue

        # ── ilustração ──
        m = re.match(r'>\s*\*\*\[ILUSTRAÇÃO (\d)', st)
        if m:
            out.append(ILUS[int(m.group(1))]); i += 1; continue

        # ── citação / caixa ──
        if st.startswith('>'):
            buf = []
            while i < len(lines) and (lines[i].strip().startswith('>') or
                  (buf and lines[i].strip() and not lines[i].strip().startswith(('#','|','-','☐','>')) and not re.match(r'^\d+\.', lines[i].strip()))):
                if not lines[i].strip().startswith('>'): break
                buf.append(re.sub(r'^>\s?', '', lines[i].strip())); i += 1
            body, blk = [], []
            for b in buf:
                if b.startswith('### '):
                    if blk: body.append('<p>' + inline(' '.join(blk)) + '</p>'); blk = []
                    body.append('<p class="big">' + inline(b[4:]) + '</p>')
                elif not b:
                    if blk: body.append('<p>' + inline(' '.join(blk)) + '</p>'); blk = []
                else:
                    blk.append(b)
            if blk: body.append('<p>' + inline(' '.join(blk)) + '</p>')
            out.append('<div class="box">' + ''.join(body) + '</div>'); continue

        # ── tabela ──
        if st.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')]); i += 1
            head = rows[0] if len(rows) > 1 and set(rows[1][0]) <= set('-: ') else None
            data = rows[2:] if head else rows
            t = '<table>'
            if head and any(h for h in head):
                t += '<thead><tr>' + ''.join(f'<th>{inline(h)}</th>' for h in head) + '</tr></thead>'
            t += '<tbody>' + ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in data) + '</tbody></table>'
            out.append(t); continue

        # ── checkboxes ──
        if st.startswith(('☐', '✓', '✗')):
            items = []
            while i < len(lines) and lines[i].strip().startswith(('☐', '✓', '✗')):
                s2 = lines[i].strip()
                cls = ' class="no"' if s2[0] == '✗' else ''
                items.append(f'<li{cls}>' + inline(s2[1:].strip()) + '</li>'); i += 1
            out.append('<ul class="chk">' + ''.join(items) + '</ul>'); continue

        # ── lista ordenada ──
        if re.match(r'^\d+\.\s', st):
            items = []
            while i < len(lines):
                s2 = lines[i].strip()
                if re.match(r'^\d+\.\s', s2):
                    txt = re.sub(r'^\d+\.\s', '', s2); i += 1
                    while i < len(lines) and lines[i].strip() and not re.match(r'^(\d+\.|-|\*|#|\||>|☐)', lines[i].strip()):
                        txt += ' ' + lines[i].strip(); i += 1
                    items.append('<li>' + inline(txt) + '</li>')
                elif not s2: i += 1; break
                else: break
            out.append('<ol class="steps">' + ''.join(items) + '</ol>'); continue

        # ── lista simples ──
        if st.startswith('- '):
            items = []
            while i < len(lines) and lines[i].strip().startswith('- '):
                items.append('<li>' + inline(lines[i].strip()[2:]) + '</li>'); i += 1
            out.append('<ul class="bul">' + ''.join(items) + '</ul>'); continue

        # ── títulos ──
        if st.startswith('#'):
            lvl = len(st) - len(st.lstrip('#')); txt = st.lstrip('#').strip()
            if lvl == 1: out.append(f'<h4>{inline(txt)}</h4>')
            elif lvl == 2: out.append(f'<p class="sub">{inline(txt)}</p>' if is_cover else f'<h5>{inline(txt)}</h5>')
            else: out.append(f'<p class="sub">{inline(txt)}</p>')
            i += 1; continue

        # ── parágrafo ──
        # Um ** aberto continua o parágrafo mesmo que a linha seguinte pareça
        # início de lista: "**É a área da camada\n2.** Primer..." é uma frase só.
        buf = [st]; i += 1
        while i < len(lines) and lines[i].strip():
            aberto = ' '.join(buf).count('**') % 2 == 1
            if not aberto and re.match(r'^(#|\||>|-\s|☐|✓|✗|\d+\.\s|---)', lines[i].strip()):
                break
            buf.append(lines[i].strip()); i += 1
        out.append('<p>' + inline(' '.join(buf)) + '</p>')

    cls = 'page' + (' cover' if is_cover else '') + (' print' if is_print else '')
    num = f'<span class="filenum">{filenum}</span>' if is_cover else ''
    return f'<article class="{cls}">' + ''.join(out) + num + '</article>'

# ── leitura dos arquivos ──
files, pages = [], {}
for path in sorted(glob.glob(f'{PDF_DIR}/*.md')):
    raw = open(path, encoding='utf-8').read()
    fm = raw.split('---')[1]
    num = re.search(r'arquivo:\s*(\d+)', fm).group(1)
    title = re.search(r'arquivo:\s*\d+\s*·\s*(.+)', fm).group(1).strip()
    func = (re.search(r'funcao:\s*(.+)', fm) or [None, ''])[1].strip()
    is_print = 'PRETO SOBRE BRANCO' in fm
    body = raw.split('---', 2)[2]
    chunks = re.split(r'<!--\s*══ PÁGINA (\d+)([^>]*)══\s*-->', body)
    rendered = []
    for k in range(1, len(chunks), 3):
        n, tag, md = int(chunks[k]), chunks[k+1], chunks[k+2]
        rendered.append({'p': n, 'h': render(md, 'CAPA' in tag, is_print, num)})
    pages[num] = rendered
    files.append({'n': num, 't': title, 'pg': len(rendered), 'cap': func})

total = sum(f['pg'] for f in files)

# ── montagem estática: nada depende de JavaScript ──
rail = ''.join(
    f'<li><a href="#f{f["n"]}"><span class="num">{f["n"]}</span>'
    f'<span>{html.escape(f["t"])}</span><span class="pg">{f["pg"]}p</span></a></li>'
    for f in files)

body = []
for f in files:
    chips = [f'<span class="chip">{f["pg"]} página{"s" if f["pg"]>1 else ""}</span>']
    if any('page print' in pg['h'] for pg in pages[f['n']]):
        chips.append('<span class="chip print">imprimível · preto sobre branco</span>')
    n_ilu = sum(pg['h'].count('<figure>') for pg in pages[f['n']])
    if n_ilu:
        chips.append(f'<span class="chip ilu">{n_ilu} ilustraç{"ões" if n_ilu>1 else "ão"}</span>')
    sheets = ''.join(
        f'<div class="holder">{pg["h"]}'
        f'<p class="pgnum">Página {pg["p"]} de {f["pg"]}</p></div>'
        for pg in pages[f['n']])
    body.append(
        f'<section class="filesec" id="f{f["n"]}">'
        f'<div class="filehd"><div class="fnum">Arquivo {f["n"]}</div>'
        f'<h3>{html.escape(f["t"])}</h3>'
        f'<p>{html.escape(f["cap"])}</p>'
        f'<div class="chips">{"".join(chips)}</div></div>'
        f'<div class="sheets">{sheets}</div>'
        f'<a class="totop" href="#">Voltar ao topo</a></section>')

tpl = open('tools/kit_template.html', encoding='utf-8').read()
out = (tpl.replace('__RAIL__', rail)
          .replace('__BODY__', ''.join(body))
          .replace('__NFILES__', str(len(files)))
          .replace('__NPAGES__', str(total)))
open(OUT, 'w', encoding='utf-8').write(out)
print(f'{len(files)} arquivos · {total} páginas · {len(out)//1024} KB → {OUT}')
