"""Favicon: Filipe's face (black and white) with the One Idea yellow dot.

Source photo: scripts repo social/channels/filipe-nevola/one-idea-brand/src/filipe-cutout.png
Run: python3 scripts/favicon/make.py <filipe-cutout.png> <out-dir>  (needs Pillow)
Then copy favicon.ico, icon-192.png, icon-512.png, apple-touch-icon.png to public/static/.
"""
import sys
from PIL import Image, ImageDraw, ImageOps, ImageEnhance, ImageFilter
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGBA')
face = im.crop((175, 70, 725, 620+0))  # head, slightly loose
face = im.crop((95, 70, 805, 780))
alpha = face.split()[3]
g = ImageOps.grayscale(face.convert('RGB'))
g = ImageEnhance.Contrast(g).enhance(1.35)
g = ImageEnhance.Brightness(g).enhance(1.08)
def make(size, dot_ratio):
    S = size * 4
    bg = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    mask = Image.new('L', (S, S), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, S - 1, S - 1), fill=255)
    base = Image.new('RGBA', (S, S), (11, 11, 11, 255))
    fs = int(S * 0.96)
    f = g.resize((fs, fs), Image.LANCZOS).convert('RGBA')
    a = alpha.resize((fs, fs), Image.LANCZOS)
    f.putalpha(a)
    base.alpha_composite(f, ((S - fs) // 2, int(S * 0.07)))
    bg.paste(base, (0, 0), mask)
    d = ImageDraw.Draw(bg)
    r = S * dot_ratio
    cx, cy = S * 0.80, S * 0.20
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(255, 212, 0, 255))
    return bg.resize((size, size), Image.LANCZOS)
big = make(512, 0.13)
big.save(f'{out}/icon-512.png')
make(192, 0.13).save(f'{out}/icon-192.png')
# apple: opaque square, no transparency
ap = Image.new('RGBA', (180, 180), (11, 11, 11, 255)); ap.alpha_composite(make(180, 0.13)); ap.convert('RGB').save(f'{out}/apple-touch-icon.png')
icos = [make(s, 0.17 if s <= 32 else 0.14) for s in (16, 32, 48)]
icos[2].save(f'{out}/favicon.ico', sizes=[(16,16),(32,32),(48,48)], append_images=icos[:2])
for s, i in zip((16,32,48), icos): i.save(f'{out}/preview-{s}.png')
# preview sheet on dark and light tab colors
sheet = Image.new('RGB', (560, 200), (255,255,255))
dark = Image.new('RGB', (280, 200), (40,40,40)); sheet.paste(dark, (280,0))
x=20
for s in (16,32,48):
    for ox in (0,280):
        sheet.paste(icos[(16,32,48).index(s)].resize((s*2,s*2),Image.NEAREST), (ox+x, 20), icos[(16,32,48).index(s)].resize((s*2,s*2),Image.NEAREST))
    x += s*2+20
sheet.paste(big.resize((96,96)), (20,100), big.resize((96,96))); sheet.paste(big.resize((96,96)), (300,100), big.resize((96,96)))
sheet.save(f'{out}/sheet.png')
