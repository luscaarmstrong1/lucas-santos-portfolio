import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('public/assets/images/stages');
fs.mkdirSync(OUT_DIR, { recursive: true });

const STAGES = [
  {
    file: 'stage-eng-01-digital-twin.png',
    layer: 'CAMADA 01 • DIGITAL TWIN & BESS',
    windowTitle: 'twin_bess_optimizer.py • Planta 1,20 MWp',
    kpis: [
      { l: 'Potência FV', v: '1,20 MWp', c: '#D3A15C' },
      { l: 'BESS Útil', v: '750 kWh', c: '#38bdf8' },
      { l: 'PR Global', v: '82,4%', c: '#34d399' },
    ],
    chartType: 'twin',
    codeTitle: 'despacho_bess.py',
    codeLines: [
      'soc[t+1] = soc[t] + (eta_ch*p_ch - p_dis/eta_d)*dt',
      'lcos = (capex + npv_opex) / npv_discharged_mwh',
      'dispatch = optimize_peak_shaving(pv_ac, tariff)',
    ],
    bottomBadge: '1,20 MWp • BESS 250 kW / 750 kWh • LCOS & O&M',
  },
  {
    file: 'stage-eng-02-energy-ai.png',
    layer: 'CAMADA 02 • ENERGY AI & MLOPS',
    windowTitle: 'energy_ai_pipeline.py • Forecasting & Anomalias',
    kpis: [
      { l: 'Load MAPE', v: '2,8%', c: '#34d399' },
      { l: 'PR-AUC O&M', v: '0,91', c: '#D3A15C' },
      { l: 'Ponta Opt.', v: '-14,6%', c: '#38bdf8' },
    ],
    chartType: 'ai',
    codeTitle: 'anomaly_detector.py',
    codeLines: [
      'model = IsolationForest(contamination=0.02)',
      'pred_mw = rf_forecaster.predict(X_weather_lags)',
      'shift_kw = solve_load_shifting(pred_mw, tou_tariff)',
    ],
    bottomBadge: 'Scikit-Learn • Previsão Horária • Isolation Forest',
  },
  {
    file: 'stage-eng-03-power-system.png',
    layer: 'CAMADA 03 • SISTEMA ELÉTRICO (SIN)',
    windowTitle: 'sin_ons_analytics.py • Matriz Nacional',
    kpis: [
      { l: 'Capacidade', v: '206+ GW', c: '#D3A15C' },
      { l: 'Renovável', v: '88,4%', c: '#34d399' },
      { l: 'MMGD Solar', v: '33+ GWp', c: '#38bdf8' },
    ],
    chartType: 'sin',
    codeTitle: 'balanco_sin.sql',
    codeLines: [
      'SELECT subsistema, SUM(geracao_mwmed) AS mwmed',
      'FROM fato_geracao_ons GROUP BY subsistema;',
      'net_load = carga_global - (ger_solar + ger_eolica)',
    ],
    bottomBadge: 'ONS & SIGA/ANEEL • 4 Subsistemas • Expansão MMGD',
  },
  {
    file: 'stage-eng-04-solar-feasibility.png',
    layer: 'CAMADA 04 • VIABILIDADE SOLAR 25 ANOS',
    windowTitle: 'solar_feasibility_25y.py • Fluxo Descontado',
    kpis: [
      { l: 'VPL 25 Anos', v: 'R$ 427k', c: '#34d399' },
      { l: 'TIR Anual', v: '34,1%', c: '#D3A15C' },
      { l: 'Payback', v: '3,1 anos', c: '#38bdf8' },
    ],
    chartType: 'cashflow',
    codeTitle: 'financial_engine.py',
    codeLines: [
      'e_yr[t] = kwp * hsp * 365 * pr * (1 - deg)**(t-1)',
      'vpl = -capex + sum(fc[t] / (1 + tma)**t)',
      'lcoe = npv_total_costs / npv_energy_kwh',
    ],
    bottomBadge: '38,4 kWp • VPL, TIR & Payback • LCOE R$ 0,396/kWh',
  },
  {
    file: 'stage-eng-05-mercado-livre.png',
    layer: 'CAMADA 05 • MERCADO LIVRE (ACR vs ACL)',
    windowTitle: 'migracao_acl_ccee.py • Grupo A / Incentivada',
    kpis: [
      { l: 'Economia/Ano', v: 'R$ 538k', c: '#34d399' },
      { l: 'Redução', v: '-18,7%', c: '#D3A15C' },
      { l: 'Break-Even', v: 'R$ 385', c: '#38bdf8' },
    ],
    chartType: 'acl',
    codeTitle: 'comparativo_tarifario.py',
    codeLines: [
      'custo_acr = (te_ponta + tusd_ponta) * mwh_p + fio',
      'custo_acl = mwh * ppa_inc + tusd_desc50 + ccee',
      'economia_5a = npv_savings(custo_acr - custo_acl)',
    ],
    bottomBadge: 'ACR vs. ACL • Desconto TUSD • Break-Even & Risco',
  },
  {
    file: 'stage-eng-06-green-hydrogen.png',
    layer: 'CAMADA 06 • HIDROGÊNIO VERDE (H2V)',
    windowTitle: 'h2v_lcoh_simulator.py • PEM + Solar & Eólica',
    kpis: [
      { l: 'Eletrólise', v: '50 MW PEM', c: '#38bdf8' },
      { l: 'Consumo SEC', v: '52,5 kWh', c: '#D3A15C' },
      { l: 'Descarb.', v: '9,8 kgCO₂', c: '#34d399' },
    ],
    chartType: 'h2v',
    codeTitle: 'electrolyzer_dispatch.py',
    codeLines: [
      'p_ren = p_solar_hourly + p_wind_hourly',
      'h2_kg = p_electrolyzer_kw / sec_kwh_per_kg',
      'lcoh = (capex_h2 + npv_opex_power) / npv_h2_kg',
    ],
    bottomBadge: 'Solar + Eólica + BESS • Eletrólise PEM • LCOH',
  },
  {
    file: 'stage-eng-07-project-mgmt.png',
    layer: 'CAMADA 07 • GESTÃO DE PROJETOS & PMO',
    windowTitle: 'pmo_homologacao_bi.py • PRODIST Módulo 3',
    kpis: [
      { l: 'Carteira', v: '16,8 MWp', c: '#D3A15C' },
      { l: 'SLA Prazo', v: '86,4%', c: '#34d399' },
      { l: 'Ciclo Médio', v: '48 dias', c: '#38bdf8' },
    ],
    chartType: 'pmo',
    codeTitle: 'sla_regulatorio.dax',
    codeLines: [
      'OTD_Homologacao = DIVIDE(Projetos_No_Prazo, Total)',
      'LeadTime_Parecer = DATEDIFF(Dt_Solic, Dt_Aprov, DAY)',
      'Margem_Eng = (Receita - Custo_HH - ART) / Receita',
    ],
    bottomBadge: 'Parecer de Acesso • ARTs • Prazos ANEEL/PRODIST',
  },
  {
    file: 'stage-eng-08-energy-mgmt.png',
    layer: 'CAMADA 08 • EFICIÊNCIA ENERGÉTICA',
    windowTitle: 'iso50001_energy_mgmt.py • Demanda & EnPI',
    kpis: [
      { l: 'Demanda P.', v: '-15,2%', c: '#34d399' },
      { l: 'Solar OnSite', v: '28,0%', c: '#D3A15C' },
      { l: 'Fator Pot.', v: '0,96 ind', c: '#38bdf8' },
    ],
    chartType: 'enpi',
    codeTitle: 'baseline_enpi.py',
    codeLines: [
      'enpi_kwh_un = kwh_medido / producao_industrial',
      'multa_ultrap = max(0, d_med - 1.05*d_cont) * 2 * tar',
      'saving_kwh = baseline_pred - kwh_real_ajustado',
    ],
    bottomBadge: 'ISO 50001 • Controle de Ponta • Baseline & Alertas',
  },
  {
    file: 'stage-eng-09-pv-sizing.png',
    layer: 'CAMADA 09 • DIMENSIONAMENTO & STRINGS FV',
    windowTitle: 'pv_string_calculator.py • Coordenação MPPT',
    kpis: [
      { l: 'Arranjo', v: '10×550Wp', c: '#D3A15C' },
      { l: 'Rel. CC/CA', v: '1,14 FDI', c: '#34d399' },
      { l: 'Voc(-2°C)', v: '534 V', c: '#38bdf8' },
    ],
    chartType: 'sizing',
    codeTitle: 'mppt_thermal_check.py',
    codeLines: [
      'voc_max = n_s * voc_stc * (1 + beta_voc*(t_min - 25))',
      'vmp_min = n_s * vmp_stc * (1 + gamma_vmp*(t_max - 25))',
      'assert v_mppt_min <= vmp_min and voc_max <= v_inv_max',
    ],
    bottomBadge: 'HSP & PR Multiplicativo • Strings MPPT • Voc/Vmp',
  },
];

function getChartSvg(type) {
  if (type === 'twin' || type === 'ai' || type === 'enpi') {
    return `<svg viewBox="0 0 520 155" width="100%" height="145">
      <defs>
        <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#D3A15C" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#D3A15C" stop-opacity="0.0"/>
        </linearGradient>
        <linearGradient id="gCyan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <line x1="20" y1="35" x2="500" y2="35" stroke="rgba(255,255,255,0.07)" stroke-dasharray="3 3"/>
      <line x1="20" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.07)" stroke-dasharray="3 3"/>
      <line x1="20" y1="115" x2="500" y2="115" stroke="rgba(255,255,255,0.07)" stroke-dasharray="3 3"/>
      <path d="M20 132 Q65 130 95 65 T150 28 T215 128 Q265 130 295 42 T355 24 T420 126 Q460 128 500 52 L500 135 L20 135 Z" fill="url(#gGold)"/>
      <path d="M20 132 Q65 130 95 65 T150 28 T215 128 Q265 130 295 42 T355 24 T420 126 Q460 128 500 52" fill="none" stroke="#D3A15C" stroke-width="3"/>
      <path d="M20 126 Q70 118 105 78 T155 44 T220 120 Q270 112 300 56 T360 38 T425 118 Q465 110 500 68 L500 135 L20 135 Z" fill="url(#gCyan)"/>
      <path d="M20 126 Q70 118 105 78 T155 44 T220 120 Q270 112 300 56 T360 38 T425 118 Q465 110 500 68" fill="none" stroke="#38bdf8" stroke-width="2.4" stroke-dasharray="5 3"/>
    </svg>`;
  }
  const valsA = [48, 62, 74, 88, 96, 108, 115, 102, 122, 134];
  const valsB = [32, 44, 52, 61, 68, 76, 84, 79, 91, 98];
  const bars = valsA.map((v, i) => {
    const x = 32 + i * 46;
    const hA = v * 0.85;
    const hB = valsB[i] * 0.85;
    return `<rect x="${x}" y="${135 - hA}" width="15" height="${hA}" rx="3" fill="#D3A15C"/>
            <rect x="${x + 18}" y="${135 - hB}" width="15" height="${hB}" rx="3" fill="#38bdf8"/>`;
  }).join('');
  return `<svg viewBox="0 0 520 155" width="100%" height="145">
    <line x1="20" y1="35" x2="500" y2="35" stroke="rgba(255,255,255,0.07)" stroke-dasharray="3 3"/>
    <line x1="20" y1="85" x2="500" y2="85" stroke="rgba(255,255,255,0.07)" stroke-dasharray="3 3"/>
    <line x1="20" y1="135" x2="500" y2="135" stroke="rgba(255,255,255,0.14)"/>
    ${bars}
  </svg>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 960 }, deviceScaleFactor: 1 });

for (const st of STAGES) {
  const kpiBoxes = st.kpis.map(k => `
    <div style="background:rgba(7,24,39,0.92);border:1px solid rgba(211,161,92,0.28);border-radius:10px;padding:10px 14px;flex:1;">
      <div style="font-size:11px;color:#9eb2c4;font-family:monospace;text-transform:uppercase;">${k.l}</div>
      <div style="font-size:24px;font-weight:800;color:${k.c};margin-top:2px;">${k.v}</div>
    </div>
  `).join('');

  const codeHtml = st.codeLines.map((l, idx) => `
    <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
      <span style="color:#567089;margin-right:10px;">0${idx + 1}</span>
      <span style="color:#e4bc82;">${l}</span>
    </div>
  `).join('');

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8"/>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 960px;
        height: 960px;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      .disc {
        width: 920px;
        height: 920px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 50% 35%, rgba(211,161,92,0.16), transparent 62%),
          linear-gradient(rgba(211,161,92,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(211,161,92,0.07) 1px, transparent 1px),
          #071827;
        background-size: 100% 100%, 38px 38px, 38px 38px;
        border: 8px solid #D3A15C;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 64px 72px;
        overflow: hidden;
        box-shadow: inset 0 0 60px rgba(0,0,0,0.75);
      }
      .inner-ring {
        position: absolute;
        inset: 18px;
        border-radius: 50%;
        border: 2px solid rgba(244,246,243,0.45);
        pointer-events: none;
      }
      .pill-top {
        z-index: 2;
        background: rgba(16,43,66,0.95);
        border: 1.5px solid #D3A15C;
        color: #D3A15C;
        padding: 10px 28px;
        border-radius: 999px;
        font-size: 19px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .main-win {
        z-index: 2;
        width: 680px;
        background: rgba(13,34,54,0.96);
        border: 2px solid rgba(211,161,92,0.55);
        border-radius: 16px;
        padding: 18px 20px;
        box-shadow: 0 22px 50px rgba(0,0,0,0.65);
      }
      .win-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 12px;
        margin-bottom: 14px;
        border-bottom: 1px solid rgba(255,255,255,0.09);
      }
      .dots { display: flex; gap: 7px; }
      .dot { width: 11px; height: 11px; border-radius: 50%; }
      .code-win {
        z-index: 3;
        width: 580px;
        margin-top: -22px;
        background: rgba(5,16,28,0.98);
        border: 1.5px solid #D3A15C;
        border-radius: 14px;
        padding: 14px 18px;
        font-family: Consolas, monospace;
        font-size: 13.5px;
        line-height: 1.65;
        box-shadow: 0 16px 36px rgba(0,0,0,0.7);
      }
      .pill-bottom {
        z-index: 2;
        background: rgba(16,43,66,0.95);
        border: 1.5px solid rgba(244,246,243,0.35);
        color: #F4F6F3;
        padding: 10px 26px;
        border-radius: 999px;
        font-size: 17px;
        font-weight: 600;
        letter-spacing: 0.03em;
      }
    </style>
  </head>
  <body>
    <div class="disc">
      <div class="inner-ring"></div>
      <div class="pill-top">${st.layer}</div>
      <div class="main-win">
        <div class="win-bar">
          <div class="dots">
            <span class="dot" style="background:#ef4444;"></span>
            <span class="dot" style="background:#f59e0b;"></span>
            <span class="dot" style="background:#10b981;"></span>
          </div>
          <span style="color:#9eb2c4;font-family:monospace;font-size:13px;">${st.windowTitle}</span>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:14px;">
          ${kpiBoxes}
        </div>
        <div style="background:rgba(7,24,39,0.88);border-radius:10px;padding:10px;border:1px solid rgba(255,255,255,0.06);">
          ${getChartSvg(st.chartType)}
        </div>
      </div>
      <div class="code-win">
        <div style="color:#D3A15C;font-size:12px;margin-bottom:6px;font-weight:700;">⚡ ${st.codeTitle}</div>
        ${codeHtml}
      </div>
      <div class="pill-bottom">${st.bottomBadge}</div>
    </div>
  </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'load' });
  const outPath = path.join(OUT_DIR, st.file);
  await page.screenshot({ path: outPath, omitBackground: true });
  console.log('Generated', outPath);
}

await browser.close();
