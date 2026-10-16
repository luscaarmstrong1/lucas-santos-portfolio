import os
import io
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance, ImageOps
from rembg import remove

ROOT = Path(r"C:\Users\lucas\.gemini\antigravity\scratch\lucas-santos-portfolio")
OUT_IMAGES = ROOT / "public" / "assets" / "images"
OUT_PROJECTS = OUT_IMAGES / "projects"
OUT_STAGES = OUT_IMAGES / "stages"
OUT_ELEMENTS = OUT_IMAGES / "elements"
OUT_FOTOS = ROOT / "public" / "fotos"

for d in [OUT_IMAGES, OUT_PROJECTS, OUT_STAGES, OUT_ELEMENTS, OUT_FOTOS]:
    d.mkdir(parents=True, exist_ok=True)

# Brand Palette
NAVY_DEEP = (7, 24, 39)        # #071827
BLUE_TECH = (16, 43, 66)       # #102B42
GOLD = (211, 161, 92)          # #D3A15C
GOLD_LIGHT = (232, 193, 134)   # #E8C186
ICE_BLUE = (220, 231, 237)     # #DCE7ED
OFF_WHITE = (244, 246, 243)    # #F4F6F3
GRAPHITE = (38, 60, 59)        # #263C3B

# Source paths
PORTRAIT_1 = Path(r"C:\Users\lucas\Downloads\ChatGPT Image 30_08_2026, 13_48_13.png")
PORTRAIT_2 = Path(r"C:\Users\lucas\Downloads\ChatGPT Image 31_08_2026, 13_02_19 (1).png")
SOLAR_HERO_SRC = Path(r"C:\Users\lucas\Downloads\Renovera-Solar-Imagens-Landing-Page\01_hero_usina_solar_urbana.png")
SOLAR_INV_SRC = Path(r"C:\Users\lucas\Downloads\Renovera-Solar-Imagens-Landing-Page\05_consultoria_tecnica_com_inversores.png")
SOLAR_BESS_SRC = Path(r"C:\Users\lucas\Downloads\Renovera-Solar-Imagens-Landing-Page\07_engenheiros_em_usina_solar.png")
EV_STATION_SRC = Path(r"C:\Users\lucas\Downloads\Estação RENOVERA ao Anoitecer.png")
IOT_TELEMETRY_SRC = Path(r"C:\Users\lucas\Downloads\1788269136520.png")
OMEGA_BANNER_SRC = Path(r"C:\Users\lucas\Downloads\ChatGPT Image 20_07_2026, 14_32_00.png")
CONEXIUM_DESTAQUE_SRC = Path(r"C:\Users\lucas\Downloads\Conexium Engenharia_ Projeto em Destaque.png")
CONEXIUM_PAGE_SRC = Path(r"C:\Users\lucas\Downloads\conexium\Conexium Engenharia_ Decisões Técnicas Seguras.png")
PROSPECTA_WS_SRC = Path(r"C:\Users\lucas\Downloads\Espaço de Trabalho ProspectaNicho.png")
PROSPECTA_INST_SRC = Path(r"C:\Users\lucas\Downloads\Apresentação Institucional Prospecta Nicho.png")

AP2_DIR = Path(r"C:\Users\lucas\Documents\Codex\2026-09-09\ap-2\assets")
ENERGY_AI_DIR = Path(r"C:\Users\lucas\Documents\Codex\2026-09-09\files-pasted-by-the-user-quero\energy-intelligence-ai-platform\assets")
POWER_DASH_DIR = Path(r"C:\Users\lucas\Documents\Codex\2026-09-08\ap-5\brazilian-power-system-dashboard\assets")
SOLAR_SIM_DIR = Path(r"C:\Users\lucas\Documents\Codex\2026-09-08\ap-3\solar-energy-feasibility-simulator\assets")
ACL_SIM_DIR = Path(r"C:\Users\lucas\Documents\Codex\2026-09-08\new-chat\work\free-energy-market-simulator\assets")
H2_SIM_DIR = Path(r"C:\Users\lucas\Documents\Codex\2026-09-09\ap\assets")


def load_font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\bahnschrift.ttf",
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                pass
    return ImageFont.load_default()


def draw_tech_grid(draw, width, height, color=(211, 161, 92, 22), step=48):
    for x in range(0, width, step):
        draw.line([(x, 0), (x, height)], fill=color, width=1)
    for y in range(0, height, step):
        draw.line([(0, y), (width, y)], fill=color, width=1)


def center_crop_resize(im, target_w, target_h):
    im = im.convert("RGB")
    src_w, src_h = im.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h
    if src_ratio > target_ratio:
        new_w = int(src_h * target_ratio)
        left = (src_w - new_w) // 2
        im = im.crop((left, 0, left + new_w, src_h))
    else:
        new_h = int(src_w / target_ratio)
        top = (src_h - new_h) // 2
        im = im.crop((0, top, src_w, top + new_h))
    return im.resize((target_w, target_h), Image.Resampling.LANCZOS)


def apply_editorial_grade(im, navy_tint=0.22):
    im = im.convert("RGB")
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Color(im).enhance(0.95)
    overlay = Image.new("RGB", im.size, NAVY_DEEP)
    return Image.blend(im, overlay, navy_tint)


print("1. Generating transparent cutouts of Lucas Silva Santos (lucas-hero.webp & lucas-footer.webp)...")
p1_raw = Image.open(PORTRAIT_1).convert("RGBA")
p1_cut = remove(p1_raw)

p2_raw = Image.open(PORTRAIT_2).convert("RGBA")
p2_cut = remove(p2_raw)


def enhance_cutout(cut_img, target_w, target_h):
    # Subtle contrast and warm clarity on face/shoulders
    r, g, b, a = cut_img.split()
    rgb = Image.merge("RGB", (r, g, b))
    rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.15)
    r2, g2, b2 = rgb.split()
    out = Image.merge("RGBA", (r2, g2, b2, a))
    # Resize preserving aspect ratio inside canvas aligned to bottom center
    canvas = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    scale = min(target_w / out.width, target_h / out.height)
    nw, nh = int(out.width * scale), int(out.height * scale)
    resized = out.resize((nw, nh), Image.Resampling.LANCZOS)
    ox = (target_w - nw) // 2
    oy = target_h - nh
    canvas.paste(resized, (ox, oy), resized)
    return canvas


hero_cutout = enhance_cutout(p1_cut, 1020, 1280)
hero_cutout.save(OUT_IMAGES / "lucas-hero.webp", "WEBP", quality=94)

footer_cutout = enhance_cutout(p2_cut, 1080, 1080)
footer_cutout.save(OUT_IMAGES / "lucas-footer.webp", "WEBP", quality=94)

print("2. Generating lucas-about.webp...")
# Editorial portrait card with navy/gold technical framing and real portrait
about_w, about_h = 960, 1160
about_canvas = Image.new("RGBA", (about_w, about_h), (*NAVY_DEEP, 255))
# Blend solar background subtly at top right
solar_bg = center_crop_resize(Image.open(SOLAR_HERO_SRC), about_w, about_h).convert("RGBA")
solar_bg = ImageEnhance.Brightness(solar_bg).enhance(0.28)
about_canvas = Image.alpha_composite(about_canvas, solar_bg)
draw_ab = ImageDraw.Draw(about_canvas, "RGBA")
draw_tech_grid(draw_ab, about_w, about_h, (211, 161, 92, 26), step=48)
# Subtle gold technical rings
draw_ab.ellipse([120, 80, 840, 800], outline=(211, 161, 92, 70), width=2)
draw_ab.ellipse([160, 120, 800, 760], outline=(220, 231, 237, 40), width=1)
# Paste Lucas cutout
p_about = enhance_cutout(p1_cut, 920, 1060)
about_canvas.paste(p_about, (20, 100), p_about)
# Gold border frame
draw_ab.rectangle([24, 24, about_w - 25, about_h - 25], outline=(211, 161, 92, 110), width=2)
about_canvas.convert("RGB").save(OUT_IMAGES / "lucas-about.webp", "WEBP", quality=92)


print("3. Generating the remaining core art package (energy-editorial, solar-engineering, power-systems, data-intelligence, ai-automation, iot-hardware, digital-products)...")

def make_framed_editorial(bg_img, overlay_img, badge_text, sub_text, out_name, size=(1200, 900)):
    w, h = size
    base = apply_editorial_grade(center_crop_resize(bg_img, w, h), 0.25).convert("RGBA")
    draw = ImageDraw.Draw(base, "RGBA")
    draw_tech_grid(draw, w, h, (211, 161, 92, 20), step=60)

    if overlay_img is not None:
        ov_w = int(w * 0.58)
        ov_h = int(h * 0.52)
        ov = center_crop_resize(overlay_img, ov_w, ov_h).convert("RGBA")
        # Card shadow & gold border
        card_x, card_y = w - ov_w - 48, h - ov_h - 48
        draw.rounded_rectangle(
            [card_x - 6, card_y - 6, card_x + ov_w + 6, card_y + ov_h + 6],
            radius=16,
            fill=(7, 24, 39, 215),
            outline=(211, 161, 92, 180),
            width=2,
        )
        base.paste(ov, (card_x, card_y))

    # Top-left editorial technical tag
    draw.rounded_rectangle([36, 36, 460, 108], radius=12, fill=(7, 24, 39, 215), outline=(211, 161, 92, 160), width=2)
    f_title = load_font(22, bold=True)
    f_sub = load_font(15, bold=False)
    draw.text((56, 48), badge_text, fill=GOLD, font=f_title)
    draw.text((56, 76), sub_text, fill=ICE_BLUE, font=f_sub)

    base.convert("RGB").save(OUT_IMAGES / out_name, "WEBP", quality=92)


# 3. energy-editorial.webp
make_framed_editorial(
    Image.open(SOLAR_HERO_SRC),
    Image.open(EV_STATION_SRC),
    "INFRAESTRUTURA & TRANSIÇÃO ENERGÉTICA",
    "Geração Distribuída • Redes BT/MT • Eletromobilidade",
    "energy-editorial.webp",
)

# 4. solar-engineering.webp
make_framed_editorial(
    Image.open(SOLAR_INV_SRC),
    Image.open(AP2_DIR / "screenshots" / "03_pv_model.png"),
    "ENGENHARIA FOTOVOLTAICA & BESS",
    "Dimensionamento • PR • Estudos de Proteção • Simulação",
    "solar-engineering.webp",
)

# 5. power-systems.webp
make_framed_editorial(
    Image.open(CONEXIUM_PAGE_SRC),
    Image.open(POWER_DASH_DIR / "screenshots" / "overview.png"),
    "REGULAÇÃO ANEEL/PRODIST & REDES",
    "Estudos de Conexão • Fluxo de Potência • Pareceres Técnicos",
    "power-systems.webp",
)

# 6. data-intelligence.webp
make_framed_editorial(
    Image.open(POWER_DASH_DIR / "screenshots" / "generation.png"),
    Image.open(SOLAR_SIM_DIR / "screenshots" / "05_fluxo_caixa.png"),
    "DATA INTELLIGENCE & MODELAGEM",
    "Python • Power BI • DAX • Simulações Técnico-Econômicas",
    "data-intelligence.webp",
)

# 7. ai-automation.webp
make_framed_editorial(
    Image.open(ENERGY_AI_DIR / "linkedin" / "capa_projeto_linkedin.png"),
    Image.open(ENERGY_AI_DIR / "screenshots" / "03_load_forecast.png"),
    "IA APLICADA & AUTOMAÇÃO",
    "Machine Learning • Previsão de Carga • Pipelines & APIs",
    "ai-automation.webp",
)

# 8. iot-hardware.webp
make_framed_editorial(
    Image.open(IOT_TELEMETRY_SRC),
    Image.open(OMEGA_BANNER_SRC),
    "ELETRÔNICA, SENSORES & IOT",
    "Aquisição de Dados • Telemetria FV • Sistemas Embarcados",
    "iot-hardware.webp",
)

# 9. digital-products.webp
make_framed_editorial(
    Image.open(PROSPECTA_WS_SRC),
    Image.open(CONEXIUM_DESTAQUE_SRC),
    "PRODUTOS & PLATAFORMAS DIGITAIS",
    "Sistemas Web • Prospecção B2B • Arquitetura Full-Stack",
    "digital-products.webp",
)


print("4. Generating 9 Priority Project cover images in /public/assets/images/projects/...")

def make_project_card_image(main_img_path, inset_img_path, tag, title, out_name):
    w, h = 900, 1120
    canvas = Image.new("RGBA", (w, h), (*NAVY_DEEP, 255))
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_tech_grid(draw, w, h, (211, 161, 92, 22), step=45)

    # Top glowing header band
    for y in range(220):
        alpha = int(95 * (1 - y / 220))
        draw.line([(0, y), (w, y)], fill=(16, 43, 66, alpha))

    # Main screenshot window
    main_im = Image.open(main_img_path).convert("RGB")
    mw, mh = 804, 560
    main_fitted = center_crop_resize(main_im, mw, mh)
    # Browser/window frame
    wx, wy = 48, 170
    draw.rounded_rectangle([wx - 4, wy - 36, wx + mw + 4, wy + mh + 4], radius=18, fill=(16, 43, 66, 255), outline=(211, 161, 92, 160), width=2)
    # Window dots
    draw.ellipse([wx + 16, wy - 24, wx + 28, wy - 12], fill=(211, 161, 92, 220))
    draw.ellipse([wx + 36, wy - 24, wx + 48, wy - 12], fill=(220, 231, 237, 140))
    draw.ellipse([wx + 56, wy - 24, wx + 68, wy - 12], fill=(220, 231, 237, 80))
    canvas.paste(main_fitted, (wx, wy))

    # Secondary inset screenshot if available
    if inset_img_path and os.path.exists(inset_img_path):
        in_im = Image.open(inset_img_path).convert("RGB")
        iw, ih = 460, 290
        in_fitted = center_crop_resize(in_im, iw, ih)
        ix, iy = w - iw - 42, wy + mh - 110
        draw.rounded_rectangle([ix - 4, iy - 4, ix + iw + 4, iy + ih + 4], radius=14, fill=(7, 24, 39, 255), outline=(211, 161, 92, 210), width=2)
        canvas.paste(in_fitted, (ix, iy))

    # Top pill & title
    f_tag = load_font(18, bold=True)
    f_tit = load_font(30, bold=True)
    draw.rounded_rectangle([48, 42, 48 + len(tag) * 11 + 36, 80], radius=19, fill=(16, 43, 66, 240), outline=(211, 161, 92, 180), width=1)
    draw.text((66, 51), tag.upper(), fill=GOLD, font=f_tag)
    draw.text((48, 96), title, fill=OFF_WHITE, font=f_tit)

    # Bottom technical bar
    draw.line([(48, h - 64), (w - 48, h - 64)], fill=(211, 161, 92, 90), width=1)
    draw.text((48, h - 46), "LUCAS SANTOS • PORTFOLIO DE ENGENHARIA & TECNOLOGIA", fill=ICE_BLUE, font=load_font(15, bold=False))

    canvas.convert("RGB").save(OUT_PROJECTS / out_name, "WEBP", quality=92)


make_project_card_image(
    AP2_DIR / "screenshots" / "02_digital_twin.png",
    AP2_DIR / "screenshots" / "10_dispatch.png",
    "Digital Twin • Solar & BESS",
    "Solar PV Digital Twin & BESS Platform",
    "proj-01-digital-twin.webp",
)

make_project_card_image(
    ENERGY_AI_DIR / "screenshots" / "03_load_forecast.png",
    ENERGY_AI_DIR / "screenshots" / "05_anomaly.png",
    "Machine Learning • Energia",
    "Energy Intelligence & AI Platform",
    "proj-02-energy-ai.webp",
)

make_project_card_image(
    POWER_DASH_DIR / "screenshots" / "overview.png",
    POWER_DASH_DIR / "screenshots" / "mmgd.png",
    "Sistemas de Potência • SIN/ANEEL",
    "Dashboard do Sistema Elétrico Brasileiro",
    "proj-03-power-dashboard.webp",
)

make_project_card_image(
    PROSPECTA_WS_SRC,
    PROSPECTA_INST_SRC,
    "Automação B2B • Produto Digital",
    "Prospecta Nicho — Inteligência Comercial",
    "proj-04-prospecta-nicho.webp",
)

make_project_card_image(
    CONEXIUM_DESTAQUE_SRC,
    CONEXIUM_PAGE_SRC,
    "Consultoria Regulatória • Web",
    "Conexium Engenharia & Perícias",
    "proj-05-conexium.webp",
)

make_project_card_image(
    OMEGA_BANNER_SRC,
    IOT_TELEMETRY_SRC,
    "Empreendedorismo • IoT & Hardware",
    "Omega Imports — Eletrônica & Automação",
    "proj-06-omega-imports.webp",
)

make_project_card_image(
    SOLAR_SIM_DIR / "screenshots" / "01_visao_geral.png",
    SOLAR_SIM_DIR / "screenshots" / "05_fluxo_caixa.png",
    "Viabilidade • VPL, TIR & LCOE",
    "Simulador Técnico-Econômico Solar FV",
    "proj-07-solar-simulator.webp",
)

make_project_card_image(
    ACL_SIM_DIR / "screenshots" / "01_visao_executiva.png",
    ACL_SIM_DIR / "screenshots" / "05_comparacao.png",
    "ACR vs ACL • Mercado de Energia",
    "Simulador do Mercado Livre de Energia",
    "proj-08-mercado-livre.webp",
)

make_project_card_image(
    H2_SIM_DIR / "linkedin" / "01_capa.png",
    H2_SIM_DIR / "screenshots" / "06_hibrido.png",
    "Eletrólise PEM • Híbrido + BESS",
    "Simulador Técnico-Econômico de H2 Verde",
    "proj-09-green-hydrogen.webp",
)


print("5. Generating 4 interactive stage discs for Section 7 (Solar PV Digital Twin & BESS)...")

def make_stage_disc(screenshot_path, secondary_path, stage_num, stage_label, metric_label, out_name):
    size = 920
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas, "RGBA")

    # Outer metallic gold & navy circular bezel (mirrors the circular plate geometry of the original Swiper!)
    draw.ellipse([16, 16, size - 16, size - 16], fill=(7, 24, 39, 255), outline=(211, 161, 92, 235), width=6)
    draw.ellipse([38, 38, size - 38, size - 38], fill=(16, 43, 66, 255), outline=(220, 231, 237, 70), width=2)

    # Create circular mask for inner technical composition
    inner_mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(inner_mask)
    mask_draw.ellipse([54, 54, size - 54, size - 54], fill=255)

    inner = Image.new("RGBA", (size, size), (*NAVY_DEEP, 255))
    in_draw = ImageDraw.Draw(inner, "RGBA")
    draw_tech_grid(in_draw, size, size, (211, 161, 92, 30), step=40)

    # Paste main chart inside the circle
    sc1 = center_crop_resize(Image.open(screenshot_path), 680, 420)
    in_draw.rounded_rectangle([114, 174, 806, 606], radius=16, fill=(7, 24, 39, 255), outline=(211, 161, 92, 180), width=2)
    inner.paste(sc1, (120, 180))

    if secondary_path and os.path.exists(secondary_path):
        sc2 = center_crop_resize(Image.open(secondary_path), 420, 210)
        in_draw.rounded_rectangle([244, 534, 676, 756], radius=14, fill=(16, 43, 66, 255), outline=(211, 161, 92, 220), width=2)
        inner.paste(sc2, (250, 540))

    # Top stage badge inside disc
    in_draw.rounded_rectangle([270, 88, 650, 148], radius=30, fill=(7, 24, 39, 240), outline=(211, 161, 92, 210), width=2)
    in_draw.text((310, 105), f"CAMADA 0{stage_num} • {stage_label}", fill=GOLD, font=load_font(22, bold=True))

    # Bottom metric pill
    in_draw.rounded_rectangle([230, 775, 690, 830], radius=24, fill=(7, 24, 39, 240), outline=(220, 231, 237, 120), width=1)
    in_draw.text((265, 792), metric_label, fill=OFF_WHITE, font=load_font(19, bold=True))

    canvas = Image.composite(inner, canvas, inner_mask)
    canvas.save(OUT_STAGES / out_name, "WEBP", quality=94)


make_stage_disc(
    AP2_DIR / "screenshots" / "03_pv_model.png",
    AP2_DIR / "architecture" / "energy_flow.png",
    1,
    "MODELAGEM FV",
    "Planta 1.20 MWp • Irradiação, Temperatura & PR",
    "stage-01-modelagem.webp",
)

make_stage_disc(
    AP2_DIR / "screenshots" / "02_digital_twin.png",
    AP2_DIR / "screenshots" / "04_performance.png",
    2,
    "GÊMEO DIGITAL",
    "Esperado vs Observado • Séries Horárias",
    "stage-02-analise.webp",
)

make_stage_disc(
    AP2_DIR / "screenshots" / "05_losses.png",
    AP2_DIR / "screenshots" / "07_faults.png",
    3,
    "DIAGNÓSTICO O&M",
    "Árvore de Perdas • Detecção de Anomalias",
    "stage-03-diagnostico.webp",
)

make_stage_disc(
    AP2_DIR / "screenshots" / "10_dispatch.png",
    AP2_DIR / "screenshots" / "12_economics.png",
    4,
    "OTIMIZAÇÃO BESS",
    "BESS 250 kW / 750 kWh • Despacho & LCOS",
    "stage-04-otimizacao.webp",
)


print("6. Generating floating engineering decorative elements (replacing nutrition fruits/utensils)...")

def make_hex_badge(title, subtitle, accent_type, out_name):
    size = 420
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im, "RGBA")
    cx, cy, r = size // 2, size // 2, 168

    # Rounded technical module card rotated slightly or hexagonal
    pts = [(cx + r * math.cos(math.radians(60 * i - 30)), cy + r * math.sin(math.radians(60 * i - 30))) for i in range(6)]
    draw.polygon(pts, fill=(7, 24, 39, 240), outline=(211, 161, 92, 230), width=4)
    r2 = 148
    pts2 = [(cx + r2 * math.cos(math.radians(60 * i - 30)), cy + r2 * math.sin(math.radians(60 * i - 30))) for i in range(6)]
    draw.polygon(pts2, fill=(16, 43, 66, 230), outline=(220, 231, 237, 70), width=2)

    if accent_type == "solar":
        # Draw solar cell grid in gold/ice blue
        for gx in range(cx - 75, cx + 75, 30):
            for gy in range(cy - 70, cy + 20, 30):
                draw.rectangle([gx, gy, gx + 26, gy + 26], fill=(7, 24, 39, 255), outline=(211, 161, 92, 200), width=2)
    elif accent_type == "pcb":
        # Draw circuit traces and nodes
        traces = [((cx - 70, cy - 40), (cx - 20, cy - 40), (cx, cy - 20), (cx + 65, cy - 20)),
                  ((cx - 60, cy + 5), (cx - 10, cy + 5), (cx + 15, cy - 20)),
                  ((cx - 45, cy - 65), (cx + 35, cy - 65), (cx + 60, cy - 40))]
        for t in traces:
            draw.line(t, fill=(211, 161, 92, 230), width=3)
            draw.ellipse([t[0][0] - 6, t[0][1] - 6, t[0][0] + 6, t[0][1] + 6], fill=GOLD)
            draw.ellipse([t[-1][0] - 6, t[-1][1] - 6, t[-1][0] + 6, t[-1][1] + 6], fill=ICE_BLUE)
    elif accent_type == "wave":
        # Sine wave / power harmonics
        wave_pts = []
        for x in range(-80, 84, 4):
            y = int(-25 + 32 * math.sin(x * 0.065))
            wave_pts.append((cx + x, cy + y))
        draw.line(wave_pts, fill=(211, 161, 92, 240), width=4)
        draw.line([(cx - 80, cy - 25), (cx + 80, cy - 25)], fill=(220, 231, 237, 90), width=1)
    elif accent_type == "bars":
        heights = [28, 52, 40, 74, 62, 86]
        for idx, bh in enumerate(heights):
            bx = cx - 75 + idx * 26
            by = cy + 15 - bh
            draw.rounded_rectangle([bx, by, bx + 18, cy + 15], radius=4, fill=GOLD if idx >= 3 else ICE_BLUE)

    f1 = load_font(22, bold=True)
    f2 = load_font(15, bold=False)
    draw.text((cx - len(title) * 6, cy + 36), title, fill=OFF_WHITE, font=f1)
    draw.text((cx - len(subtitle) * 4, cy + 66), subtitle, fill=GOLD, font=f2)

    im.save(OUT_ELEMENTS / out_name, "WEBP", quality=94)


make_hex_badge("80 MWp", "ANÁLISE FV", "solar", "elem-solar-module.webp")
make_hex_badge("PRODIST", "MÓDULO 3", "wave", "elem-grid-node.webp")
make_hex_badge("PYTHON", "DATA & IA", "pcb", "elem-pcb-node.webp")
make_hex_badge("BESS", "OTIMIZAÇÃO", "bars", "elem-bess-unit.webp")


print("7. Generating Open Graph images (/public/og.jpg and /public/contato-og.jpg)...")

def make_og_image(title_line1, title_line2, subtitle, out_path):
    w, h = 1200, 630
    og = Image.new("RGBA", (w, h), (*NAVY_DEEP, 255))
    bg_solar = center_crop_resize(Image.open(SOLAR_HERO_SRC), w, h).convert("RGBA")
    bg_solar = ImageEnhance.Brightness(bg_solar).enhance(0.22)
    og = Image.alpha_composite(og, bg_solar)

    draw = ImageDraw.Draw(og, "RGBA")
    draw_tech_grid(draw, w, h, (211, 161, 92, 24), step=48)
    draw.rectangle([28, 28, w - 29, h - 29], outline=(211, 161, 92, 160), width=2)

    # Paste Lucas cutout on the right
    p_og = enhance_cutout(p1_cut, 520, 590)
    og.paste(p_og, (w - 540, 40), p_og)

    draw.text((68, 78), "ENGENHEIRO ELETRICISTA • GERENTE DE PROJETOS", fill=GOLD, font=load_font(20, bold=True))
    draw.text((68, 130), title_line1, fill=OFF_WHITE, font=load_font(68, bold=True))
    draw.text((68, 210), title_line2, fill=GOLD, font=load_font(68, bold=True))
    draw.text((68, 315), subtitle, fill=ICE_BLUE, font=load_font(24, bold=False))
    draw.rounded_rectangle([68, 400, 640, 456], radius=12, fill=(16, 43, 66, 230), outline=(211, 161, 92, 180), width=2)
    draw.text((92, 416), "100+ Homologados  •  500+ Reanalisados  •  ~80 MWp", fill=OFF_WHITE, font=load_font(20, bold=True))
    draw.text((68, 535), "linkedin.com/in/lucasssantos1  •  github.com/luscaarmstrong1", fill=GOLD_LIGHT, font=load_font(18, bold=False))

    og.convert("RGB").save(out_path, "JPEG", quality=94)


make_og_image(
    "LUCAS",
    "SANTOS",
    "Engenharia Elétrica, Energia Solar, Regulação, Dados & IA",
    ROOT / "public" / "og.jpg",
)

make_og_image(
    "BRIEFING DE",
    "PROJETO",
    "Consultoria Técnica, Energia, Dados, Automação & Soluções Digitais",
    ROOT / "public" / "contato-og.jpg",
)

print("All portfolio visual assets generated successfully!")
