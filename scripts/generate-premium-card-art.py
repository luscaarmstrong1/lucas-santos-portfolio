import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = os.path.join(os.getcwd(), "public", "assets", "images")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_gradient(width, height, top_color, bottom_color):
    base = Image.new("RGBA", (width, height), top_color)
    top = Image.new("RGBA", (width, height), bottom_color)
    mask = Image.new("L", (width, height))
    mask_data = []
    for y in range(height):
        mask_data.extend([int(255 * (y / height))] * width)
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

# ==============================================================================
# 1. CARD 1: SISTEMAS & ENERGIA (Solar PV, BESS & Smart Grid Infrastructure)
# ==============================================================================
def generate_energy_editorial():
    W, H = 1200, 1500
    # Deep twilight / golden hour tech background
    img = create_gradient(W, H, (7, 24, 39, 255), (16, 43, 66, 255))
    draw = ImageDraw.Draw(img)

    # 1. Subtle isometric tech grid
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=(211, 161, 92, 18), width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=(211, 161, 92, 18), width=1)

    # 2. Glowing horizon & solar sunset rays
    horizon_y = 650
    sun_glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sun_draw = ImageDraw.Draw(sun_glow)
    sun_draw.ellipse([W//2 - 350, horizon_y - 250, W//2 + 350, horizon_y + 450], fill=(211, 161, 92, 70))
    sun_draw.ellipse([W//2 - 200, horizon_y - 120, W//2 + 200, horizon_y + 280], fill=(235, 195, 125, 90))
    sun_glow = sun_glow.filter(ImageFilter.GaussianBlur(50))
    img = Image.alpha_composite(img, sun_glow)
    draw = ImageDraw.Draw(img)

    # 3. Solar PV Arrays (Perspectiva 3D de Parque Solar)
    poly_rows = 6
    for i in range(poly_rows):
        y_top = horizon_y + i * 110 + 20
        y_bot = y_top + 80
        # Left array
        draw.polygon([
            (60 + i * 20, y_top),
            (W//2 - 40, y_top),
            (W//2 - 30, y_bot),
            (40 + i * 25, y_bot)
        ], fill=(12, 35, 56, 230), outline=(50, 180, 220, 180), width=2)
        # Solar panel cells in array
        for c in range(1, 8):
            cx = 60 + i * 20 + c * ((W//2 - 40 - (60 + i * 20)) // 8)
            draw.line([(cx, y_top), (cx - 10, y_bot)], fill=(40, 150, 200, 100), width=1)

        # Right array
        draw.polygon([
            (W//2 + 40, y_top),
            (W - 60 - i * 20, y_top),
            (W - 40 - i * 25, y_bot),
            (W//2 + 30, y_bot)
        ], fill=(12, 35, 56, 230), outline=(211, 161, 92, 180), width=2)
        for c in range(1, 8):
            cx = W//2 + 40 + c * ((W - 60 - i * 20 - (W//2 + 40)) // 8)
            draw.line([(cx, y_top), (cx + 10, y_bot)], fill=(211, 161, 92, 100), width=1)

    # 4. Central BESS Container / Substation Unit (High-tech)
    bess_x0, bess_y0 = W//2 - 180, horizon_y + 160
    bess_x1, bess_y1 = W//2 + 180, horizon_y + 360
    # Glassmorphism container body
    draw.rounded_rectangle([bess_x0, bess_y0, bess_x1, bess_y1], radius=14, fill=(10, 28, 48, 240), outline=(211, 161, 92, 220), width=2)
    # Status LED bar
    draw.rounded_rectangle([bess_x0 + 20, bess_y0 + 20, bess_x1 - 20, bess_y0 + 45], radius=6, fill=(5, 18, 32, 255))
    draw.rectangle([bess_x0 + 30, bess_y0 + 28, bess_x0 + 140, bess_y0 + 38], fill=(60, 220, 120, 255))
    # BESS ventilation grilles
    for g in range(6):
        gy = bess_y0 + 70 + g * 22
        draw.line([(bess_x0 + 30, gy), (bess_x1 - 30, gy)], fill=(40, 90, 130, 200), width=3)

    # 5. High-Tech HUD Badges overlay on top
    # Floating telemetry pill top-left
    draw.rounded_rectangle([60, 60, 420, 160], radius=12, fill=(7, 24, 39, 230), outline=(50, 180, 220, 180), width=2)
    draw.ellipse([90, 95, 115, 120], fill=(50, 220, 140, 255))
    
    # Floating power pill top-right
    draw.rounded_rectangle([W - 460, 60, W - 60, 160], radius=12, fill=(7, 24, 39, 230), outline=(211, 161, 92, 200), width=2)
    draw.ellipse([W - 430, 95, W - 405, 120], fill=(211, 161, 92, 255))

    # Grid nodes with glowing connections
    nodes = [(W//2, horizon_y - 100), (220, horizon_y - 20), (W - 220, horizon_y - 20)]
    for nx, ny in nodes:
        draw.ellipse([nx - 12, ny - 12, nx + 12, ny + 12], fill=(211, 161, 92, 255), outline=(255, 255, 255, 255), width=2)
        draw.line([(nx, ny), (W//2, bess_y0)], fill=(50, 180, 220, 160), width=2)

    # Text annotations via drawing
    try:
        font_large = ImageFont.truetype("arialbd.ttf", 36)
        font_small = ImageFont.truetype("arial.ttf", 24)
        font_mono = ImageFont.truetype("consola.ttf", 26)
    except Exception:
        font_large = font_small = font_mono = ImageFont.load_default()

    draw.text((135, 82), "GERAÇÃO MMGD", fill=(255, 255, 255, 255), font=font_large)
    draw.text((135, 122), "1.20 MWp • Telemetria Ativa", fill=(50, 200, 240, 255), font=font_small)

    draw.text((W - 385, 82), "SISTEMA BESS", fill=(255, 255, 255, 255), font=font_large)
    draw.text((W - 385, 122), "250 kW / 750 kWh • Online", fill=(211, 161, 92, 255), font=font_small)

    # Bottom badge
    draw.rounded_rectangle([W//2 - 260, H - 120, W//2 + 260, H - 40], radius=10, fill=(7, 24, 39, 240), outline=(211, 161, 92, 220), width=2)
    draw.text((W//2 - 230, H - 95), "SISTEMAS DE POTÊNCIA & SOLAR", fill=(255, 255, 255, 255), font=font_large)

    out_path = os.path.join(OUTPUT_DIR, "energy-editorial.webp")
    img.save(out_path, "WEBP", quality=92)
    print(f"Generated: {out_path}")

# ==============================================================================
# 2. CARD 3: DADOS & INTELIGÊNCIA ARTIFICIAL (Modern Dark-Mode Analytics & ML)
# ==============================================================================
def generate_data_intelligence():
    W, H = 1200, 1500
    # Cybernetic deep navy background
    img = create_gradient(W, H, (5, 16, 28, 255), (10, 30, 50, 255))
    draw = ImageDraw.Draw(img)

    # 1. Engineering grid
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=(30, 70, 100, 35), width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=(30, 70, 100, 35), width=1)

    # 2. Top Header HUD with KPI metrics
    # KPI 1
    draw.rounded_rectangle([60, 60, 380, 200], radius=12, fill=(12, 35, 58, 230), outline=(50, 180, 220, 180), width=2)
    # KPI 2
    draw.rounded_rectangle([420, 60, 780, 200], radius=12, fill=(12, 35, 58, 230), outline=(211, 161, 92, 180), width=2)
    # KPI 3
    draw.rounded_rectangle([820, 60, 1140, 200], radius=12, fill=(12, 35, 58, 230), outline=(60, 220, 140, 180), width=2)

    try:
        font_hero = ImageFont.truetype("arialbd.ttf", 46)
        font_title = ImageFont.truetype("arialbd.ttf", 30)
        font_sub = ImageFont.truetype("arial.ttf", 22)
        font_mono = ImageFont.truetype("consola.ttf", 22)
    except Exception:
        font_hero = font_title = font_sub = font_mono = ImageFont.load_default()

    draw.text((90, 85), "R² ACCURACY", fill=(140, 180, 210, 255), font=font_sub)
    draw.text((90, 120), "0.984", fill=(50, 220, 240, 255), font=font_hero)

    draw.text((450, 85), "PREVISÃO DE CARGA", fill=(140, 180, 210, 255), font=font_sub)
    draw.text((450, 120), "99.2% ACC", fill=(211, 161, 92, 255), font=font_hero)

    draw.text((850, 85), "ANOMALIA (DET.)", fill=(140, 180, 210, 255), font=font_sub)
    draw.text((850, 120), "0.012 MSE", fill=(60, 220, 140, 255), font=font_hero)

    # 3. Main Chart Card (Time-Series Generation & Forecast)
    card_x0, card_y0 = 60, 240
    card_x1, card_y1 = 1140, 820
    draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=16, fill=(8, 24, 40, 245), outline=(50, 140, 190, 160), width=2)

    draw.text((card_x0 + 40, card_y0 + 35), "MODELO PREDITIVO — GERAÇÃO VS. DESPACHO", fill=(255, 255, 255, 255), font=font_title)
    draw.text((card_x0 + 40, card_y0 + 75), "Série Temporal 24h • Rede Neural LSTM & XGBoost", fill=(211, 161, 92, 255), font=font_sub)

    # Chart Area
    ch_x0, ch_y0 = card_x0 + 50, card_y0 + 130
    ch_x1, ch_y1 = card_x1 - 50, card_y1 - 50

    # Grid lines inside chart
    for gy in range(ch_y0, ch_y1, 70):
        draw.line([(ch_x0, gy), (ch_x1, gy)], fill=(30, 60, 90, 80), width=1)
    for gx in range(ch_x0, ch_x1, 120):
        draw.line([(gx, ch_y0), (gx, ch_y1)], fill=(30, 60, 90, 80), width=1)

    # Draw Solar Bell Curve (Real vs Predicted)
    pts_real = []
    pts_pred = []
    total_pts = 60
    w_step = (ch_x1 - ch_x0) / total_pts

    for i in range(total_pts):
        x = ch_x0 + i * w_step
        # Bell curve peaked at noon (i ~ 30)
        norm = math.exp(-((i - 30) ** 2) / 120.0)
        # Real curve with small noise
        y_r = ch_y1 - norm * (ch_y1 - ch_y0 - 40) - math.sin(i * 0.8) * 6
        # Predicted curve smooth
        y_p = ch_y1 - norm * (ch_y1 - ch_y0 - 40)
        pts_real.append((x, y_r))
        pts_pred.append((x, y_p))

    # Gradient fill under curve
    for i in range(len(pts_pred) - 1):
        x_a, y_a = pts_pred[i]
        x_b, y_b = pts_pred[i+1]
        draw.polygon([(x_a, ch_y1), (x_a, y_a), (x_b, y_b), (x_b, ch_y1)], fill=(20, 80, 130, 45))

    # Real curve (gold line)
    for i in range(len(pts_real) - 1):
        draw.line([pts_real[i], pts_real[i+1]], fill=(211, 161, 92, 255), width=4)

    # Pred curve (cyan dashed line)
    for i in range(len(pts_pred) - 1):
        if i % 2 == 0:
            draw.line([pts_pred[i], pts_pred[i+1]], fill=(50, 220, 240, 255), width=3)

    # 4. Code & Terminal Glassmorphic Card (Python / ML Pipeline)
    term_x0, term_y0 = 60, 860
    term_x1, term_y1 = 1140, 1360
    draw.rounded_rectangle([term_x0, term_y0, term_x1, term_y1], radius=16, fill=(5, 18, 30, 250), outline=(211, 161, 92, 200), width=2)

    # Terminal buttons
    draw.ellipse([term_x0 + 35, term_y0 + 30, term_x0 + 53, term_y0 + 48], fill=(235, 87, 87, 255))
    draw.ellipse([term_x0 + 65, term_y0 + 30, term_x0 + 83, term_y0 + 48], fill=(242, 201, 76, 255))
    draw.ellipse([term_x0 + 95, term_y0 + 30, term_x0 + 113, term_y0 + 48], fill=(39, 174, 96, 255))
    draw.text((term_x0 + 135, term_y0 + 26), "python3 energy_intelligence_pipeline.py", fill=(140, 180, 210, 255), font=font_mono)

    # Code lines
    code_lines = [
        ("import numpy as np, pandas as pd, pvlib", (120, 200, 255, 255)),
        ("from sklearn.ensemble import GradientBoostingRegressor", (211, 161, 92, 255)),
        ("model = GradientBoostingRegressor(n_estimators=300, max_depth=6)", (240, 240, 240, 255)),
        ("model.fit(X_train, y_generation_target)", (60, 220, 140, 255)),
        ("y_pred = model.predict(X_solar_telemetry)", (50, 220, 240, 255)),
        (">> Optimized Dispatch: BESS discharge scheduled at 18:30 (Peak Rate)", (211, 161, 92, 255)),
        (">> Net Savings Projected: +34.8% vs. standard baseline tariff", (60, 220, 140, 255)),
    ]

    for idx, (code_text, color) in enumerate(code_lines):
        draw.text((term_x0 + 40, term_y0 + 80 + idx * 52), code_text, fill=color, font=font_mono)

    # Bottom badge
    draw.rounded_rectangle([W//2 - 240, H - 100, W//2 + 240, H - 30], radius=10, fill=(7, 24, 39, 240), outline=(50, 200, 240, 220), width=2)
    draw.text((W//2 - 210, H - 75), "CIÊNCIA DE DADOS & IA APLICADA", fill=(255, 255, 255, 255), font=font_title)

    out_path = os.path.join(OUTPUT_DIR, "data-intelligence.webp")
    img.save(out_path, "WEBP", quality=92)
    print(f"Generated: {out_path}")

if __name__ == "__main__":
    generate_energy_editorial()
    generate_data_intelligence()
