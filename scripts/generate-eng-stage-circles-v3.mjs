import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('public/assets/images/stages');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Palette tokens
// Navy Deep: #06131F / #071827 / #0D2236
// Copper Gold: #D3A15C / #E5BA7E
// Cyan Tech: #22D3EE / #38BDF8
// Emerald: #34D399
// White text: #F4F6F3

const STAGES = [
  {
    num: '01',
    file: 'stage-eng-01-digital-twin.png',
    layer: 'CAMADA 01 • GÊMEO DIGITAL FV & BESS',
    theme: 'SISTEMAS FOTOVOLTAICOS & ARMAZENAMENTO ELETROQUÍMICO',
    accentColor: '#D3A15C',
    accentCyan: '#22D3EE',
    accentGreen: '#34D399',
    windowTitle: 'digital_twin_pv_bess.py • Usina 1,20 MWp + BESS 750 kWh',
    kpis: [
      { l: 'POTÊNCIA FV', v: '1,20 MWp', s: '2.244 mód • 22/str', c: '#D3A15C' },
      { l: 'BESS LiFePO4', v: '750 kWh', s: '250 kW • SOC 15-95%', c: '#22D3EE' },
      { l: 'PERFORMANCE', v: '83,3%', s: 'PR • R² = 0,9865', c: '#34D399' },
      { l: 'LCOS NIVELADO', v: 'R$ 0,466', s: 'por kWh despachado', c: '#E5BA7E' },
    ],
    chartKind: 'pv_bess',
    flowNodes: [
      { t: 'Arranjo FV 1,2 MWp', s: '22/string • CC' },
      { t: 'Inversores 1,0 MW', s: '4x 250 kW CA' },
      { t: 'BESS 750 kWh', s: 'PCS 250 kW' },
      { t: 'Rede / Ponta', s: 'Peak Shaving 18-21h' },
    ],
    codeTitle: 'despacho_otimo_bess.py',
    codeLines: [
      'soc[t] = soc[t-1] + (eta_ch * p_ch - p_dis / eta_dis) * dt / e_nom',
      'peak_reduction_kw = max(0, p_ponta_sem_bess - p_ponta_com_bess)',
      'lcos = (capex_bess + npv_opex_rep) / npv_throughput_mwh',
    ],
    bottomBadge: 'USINA 1,2 MWp • BESS 750 kWh • PEAK SHAVING',
  },
  {
    num: '02',
    file: 'stage-eng-02-energy-ai.png',
    layer: 'CAMADA 02 • ENERGY INTELLIGENCE & AI',
    theme: 'MACHINE LEARNING, ANOMALIAS & OTIMIZAÇÃO DE PONTA',
    accentColor: '#22D3EE',
    accentCyan: '#38BDF8',
    accentGreen: '#34D399',
    windowTitle: 'energy_ai_forecasting.py • Random Forest & Anomalias',
    kpis: [
      { l: 'MAPE CARGA', v: '4,63%', s: 'RF Regressor', c: '#34D399' },
      { l: 'COEFICIENTE R²', v: '0,974', s: 'Sem vazamento temp.', c: '#22D3EE' },
      { l: 'PR-AUC O&M', v: '0,932', s: 'Manutenção Preditiva', c: '#D3A15C' },
      { l: 'LOAD SHIFTING', v: 'R$ 123k', s: 'Economia Anual Líquida', c: '#E5BA7E' },
    ],
    chartKind: 'ai_curves',
    flowNodes: [
      { t: 'Telemetria 6 Plantas', s: 'Séries Horárias' },
      { t: 'Feature Eng.', s: 'Lags, TOU, Clima' },
      { t: 'Random Forest', s: 'R² = 0,974' },
      { t: 'Load Shifting', s: 'Ponta -> Janela Solar' },
    ],
    codeTitle: 'isolation_forest_load_shift.py',
    codeLines: [
      'z_score = abs(y_real[t] - y_pred[t]) / std_janela >= 2.50',
      'importacao_liq = np.clip(consumo_otim - geracao_solar, 0, None)',
      'savings_brl = (importacao_orig - importacao_liq) * tarifa_tou',
    ],
    bottomBadge: 'FORECASTING HORÁRIO • Z-SCORE 2,5σ • DESLOCAMENTO DE CARGA DEFENSÁVEL',
  },
  {
    num: '03',
    file: 'stage-eng-03-power-system.png',
    layer: 'CAMADA 03 • SISTEMA ELÉTRICO BRASILEIRO (SIN)',
    theme: 'SISTEMAS DE POTÊNCIA, MATRIZ ONS/ANEEL & CURVA DO PATO',
    accentColor: '#38BDF8',
    accentCyan: '#22D3EE',
    accentGreen: '#34D399',
    windowTitle: 'sin_ons_analytics.py • 220,5 GW Instalados no Brasil',
    kpis: [
      { l: 'CAPACIDADE SIGA', v: '220,5 GW', s: 'Matriz Nacional 2026', c: '#D3A15C' },
      { l: 'RENOVABILIDADE', v: '88,4%', s: 'Hidro + Eólica + Solar', c: '#34D399' },
      { l: 'RAMPA VESPERTINA', v: '7,11 GW/h', s: 'Recomposição 16h-19h', c: '#F87171' },
      { l: 'PLD MARGINAL', v: 'R$ 71/MWh', s: 'Submédio Histórico', c: '#38BDF8' },
    ],
    chartKind: 'duck_curve',
    flowNodes: [
      { t: 'Nordeste Export.', s: '34,9 GW Eólica' },
      { t: 'Sudeste / CO', s: '56% Carga Nacional' },
      { t: 'Sul Interligado', s: 'Hidro + Térmica' },
      { t: 'Norte UHEs', s: 'Belo Monte / Tucuruí' },
    ],
    codeTitle: 'curva_do_pato_rampa.py',
    codeLines: [
      'carga_liquida[t] = carga_bruta[t] - ger_solar[t] - ger_eolica[t]',
      'rampa_max_gwh = max(carga_liquida[t+1] - carga_liquida[t])',
      'flexibilidade_requerida = rampa_max_gwh * (1 + margem_reserva)',
    ],
    bottomBadge: '4 SUBSISTEMAS ONS • SIGA/ANEEL & CCEE • TRANSIÇÃO ENERGÉTICA',
  },
  {
    num: '04',
    file: 'stage-eng-04-solar-feasibility.png',
    layer: 'CAMADA 04 • VIABILIDADE TÉCNICO-ECONÔMICA SOLAR',
    theme: 'FLUXO DE CAIXA DESCONTADO 25 ANOS, VPL, TIR & LCOE',
    accentColor: '#FBBF24',
    accentCyan: '#38BDF8',
    accentGreen: '#34D399',
    windowTitle: 'solar_dcf_25y.py • Engenharia Econômica & Lei 14.300',
    kpis: [
      { l: 'VPL (WACC 9,5%)', v: 'R$ 479k', s: 'Valor Presente Líquido', c: '#34D399' },
      { l: 'TIR ANUALIZADA', v: '31,5%', s: 'Taxa Interna de Retorno', c: '#D3A15C' },
      { l: 'PAYBACK DESC.', v: '4,4 anos', s: 'Descontado pelo WACC', c: '#38BDF8' },
      { l: 'LCOE NIVELADO', v: 'R$ 0,385', s: 'por kWh gerado em 25a', c: '#E5BA7E' },
    ],
    chartKind: 'dcf_payback',
    flowNodes: [
      { t: 'Consumo Mensal', s: '4.500 kWh/mês' },
      { t: 'CAPEX Turnkey', s: '39,0 kWp • 65 mód' },
      { t: 'Degradação Anual', s: '0,55%/ano • Troca A12' },
      { t: 'DCF 25 Anos', s: 'VPL + R$ 479k' },
    ],
    codeTitle: 'cashflow_discounted_engine.py',
    codeLines: [
      'e_t = e_ano1 * ((1 - deg_anual) ** (t - 1))',
      'fc_t = e_t * tarifa_t * fio_b_comp - opex_t - inv_ano12',
      'vpl = -capex + sum(fc_t / ((1 + wacc) ** t))',
    ],
    bottomBadge: '39 kWp • HORIZONTE 25 ANOS • SUBST. INVERSOR ANO 12 • ANÁLISE TORNADO',
  },
  {
    num: '05',
    file: 'stage-eng-05-mercado-livre.png',
    layer: 'CAMADA 05 • MERCADO LIVRE DE ENERGIA (ACR vs ACL)',
    theme: 'DECOMPOSIÇÃO TARIFÁRIA GRUPO A, CCEE & PREÇO BREAK-EVEN',
    accentColor: '#34D399',
    accentCyan: '#38BDF8',
    accentGreen: '#D3A15C',
    windowTitle: 'migracao_acl_ccee.py • Simulação Grupo A4/A3a',
    kpis: [
      { l: 'ECONOMIA ANUAL', v: 'R$ 1,78 M', s: '-46,2% vs Cativo ACR', c: '#34D399' },
      { l: 'ECONOMIA 5 ANOS', v: 'R$ 10,6 M', s: 'Horizonte Contratual', c: '#D3A15C' },
      { l: 'BREAK-EVEN PPA', v: 'R$ 630', s: 'por MWh (Preço Limite)', c: '#38BDF8' },
      { l: 'VOLUME TOTAL', v: '3.528 MWh', s: 'Consumo Anual Faturado', c: '#E5BA7E' },
    ],
    chartKind: 'acr_acl_bars',
    flowNodes: [
      { t: 'Fatura ACR', s: 'TE + TUSD Plena' },
      { t: 'PPA Livre (ACL)', s: 'R$ 235/MWh Incent.' },
      { t: 'Desc. TUSD 50%', s: 'Encargos & CCEE' },
      { t: 'Economia Líquida', s: 'R$ 1,78 M/ano' },
    ],
    codeTitle: 'break_even_calculator.py',
    codeLines: [
      'custo_acr = (mwh_p*t_p + mwh_fp*t_fp + dem*t_dem) * tributos',
      'custo_acl = (mwh_tot*p_ppa + dem_fio_desc + enc_ccee) * tributos',
      'break_even_ppa = (custo_acr_sem_imp - dem_fio_acl - enc) / mwh_tot',
    ],
    bottomBadge: '3.528 MWh/ANO • DESCONTO TUSD 50% • BREAK-EVEN R$ 630/MWh • CCEE',
  },
  {
    num: '06',
    file: 'stage-eng-06-green-hydrogen.png',
    layer: 'CAMADA 06 • HIDROGÊNIO VERDE (H2V) & LCOH',
    theme: 'ELETRÓLISE PEM, ACOPLAMENTO HÍBRIDO & BALANÇO DE MASSA',
    accentColor: '#22D3EE',
    accentCyan: '#38BDF8',
    accentGreen: '#34D399',
    windowTitle: 'h2v_techno_economic.py • Eletrolisador PEM 20 MW',
    kpis: [
      { l: 'LCOH NIVELADO', v: 'R$ 26,25', s: 'US$ 4,91 por kg H2', c: '#34D399' },
      { l: 'PRODUÇÃO H2V', v: '2.653 t/a', s: 'Horas EFLH 6.898 h', c: '#22D3EE' },
      { l: 'EFICIÊNCIA LHV', v: '64,1%', s: 'SEC 52,0 kWh/kg H2', c: '#D3A15C' },
      { l: 'ÁGUA PURA OSMOSE', v: '39.794 m³', s: '15 L/kg H2 processo', c: '#38BDF8' },
    ],
    chartKind: 'h2v_decomp',
    flowNodes: [
      { t: 'Solar 45MW + Eólica', s: 'FC 78,7% Híbrido' },
      { t: 'Osmose Reversa', s: 'Água Desmineralizada' },
      { t: 'PEM 20 MW', s: 'SEC 52 kWh/kg' },
      { t: 'Compressão 350bar', s: 'LCOH R$ 26,25/kg' },
    ],
    codeTitle: 'electrolyzer_mass_balance.py',
    codeLines: [
      'm_h2_ton = (p_eletrolisador_kw * eflh_hours) / (sec_stack * 1000)',
      'crf = (wacc * (1 + wacc)**n) / ((1 + wacc)**n - 1)',
      'lcoh_brl_kg = (capex*crf + opex_fixo + c_energia + c_stack) / m_h2_kg',
    ],
    bottomBadge: 'PEM 20 MW • EFLH 6.898 h/ANO • 2.653 t H2V/ANO • 23.876 tCO2 EVITADAS',
  },
  {
    num: '07',
    file: 'stage-eng-07-project-mgmt.png',
    layer: 'CAMADA 07 • GESTÃO DE PROJETOS ELÉTRICOS & PMO',
    theme: 'GOVERNANÇA PMO, ESTEIRA DE HOMOLOGAÇÃO & CAMINHO CRÍTICO',
    accentColor: '#A78BFA',
    accentCyan: '#38BDF8',
    accentGreen: '#34D399',
    windowTitle: 'pmo_electrical_governance.py • 200 Projetos / 93 MW',
    kpis: [
      { l: 'CARTEIRA ATIVA', v: '200 Proj.', s: '93,05 MW • R$ 412 M', c: '#D3A15C' },
      { l: 'LEAD TIME MÉDIO', v: '103 dias', s: 'Ponta a ponta SLA', c: '#38BDF8' },
      { l: 'ENTREGAS ON-TIME', v: '42,5%', s: 'Conclusão no prazo', c: '#F87171' },
      { l: 'ÍNDICE SPI / CPI', v: '0,87 / 0,98', s: 'Valor Agregado PMO', c: '#A78BFA' },
    ],
    chartKind: 'pmo_kanban',
    flowNodes: [
      { t: 'Viabilidade & Carga', s: '24 proj. • 11 dias' },
      { t: 'Parecer de Acesso', s: '42 proj. • Gargalo' },
      { t: 'Projeto Executivo', s: '38 proj. • Proteção' },
      { t: 'Obras & Montagem', s: '34 proj. • Vistoria' },
    ],
    codeTitle: 'critical_path_leadtime.py',
    codeLines: [
      'lead_time = sum(t_etapa / (cap_eng**alpha)) + penalidade_sla_concess',
      'spi = earned_value / planned_value',
      'projetos_atraso = total_projetos * (1 - on_time_delivery_pct)',
    ],
    bottomBadge: '200 PROJETOS • 93,05 MW • SLA PRODIST MÓDULO 3 • KANBAN & GANTT',
  },
  {
    num: '08',
    file: 'stage-eng-08-energy-mgmt.png',
    layer: 'CAMADA 08 • GESTÃO & EFICIÊNCIA ENERGÉTICA',
    theme: 'FATOR DE POTÊNCIA, GESTÃO DE DEMANDA & METODOLOGIA ISO 50001',
    accentColor: '#22D3EE',
    accentCyan: '#34D399',
    accentGreen: '#D3A15C',
    windowTitle: 'industrial_energy_management.py • 6 Plantas (51 GWh/a)',
    kpis: [
      { l: 'CONSUMO ANUAL', v: '51,1 GWh', s: '6 Plantas Industriais', c: '#38BDF8' },
      { l: 'BANCO CAPACITOR', v: '496 kVAr', s: 'Correção cos φ 0,87->0,92', c: '#34D399' },
      { l: 'MULTA REATIVA', v: 'R$ 998k', s: 'Eliminada com Capacitores', c: '#F87171' },
      { l: 'ECONOMIA TOTAL', v: 'R$ 8,81 M', s: 'Payback 0,43 anos', c: '#D3A15C' },
    ],
    chartKind: 'iso_pie_bars',
    flowNodes: [
      { t: 'Medição 10 Setores', s: '51,08 GWh/ano' },
      { t: 'Diagnóstico cos φ', s: '0,87 ind. (Multa)' },
      { t: 'Retrofits VFD & Ar', s: '6.900 MWh/ano' },
      { t: 'Linha de Base EnPI', s: 'Payback 5 meses' },
    ],
    codeTitle: 'capacitor_bank_sizing.py',
    codeLines: [
      'q_cap_kvar = p_ativa_kw * (tan(acos(fp_atual)) - tan(acos(0.92)))',
      'multa_reativa_ano = consumo_kwh * ((0.92/fp_atual) - 1) * tar_reat',
      'saving_total = saving_vfd + multa_reativa_ano + multa_ultrapassagem',
    ],
    bottomBadge: '6 UNIDADES INDUSTRIAIS • BANCO 496 kVAr • CONTROLE DE DEMANDA • ISO 50001',
  },
  {
    num: '09',
    file: 'stage-eng-09-pv-sizing.png',
    layer: 'CAMADA 09 • DIMENSIONAMENTO FV & STRINGS MPPT',
    theme: 'ENGENHARIA ELÉTRICA FOTOVOLTAICA, TEMPERATURA & JANELA MPPT',
    accentColor: '#D3A15C',
    accentCyan: '#22D3EE',
    accentGreen: '#34D399',
    windowTitle: 'pv_string_electrical_checker.py • ABNT NBR 16690',
    kpis: [
      { l: 'POTÊNCIA CC', v: '4,95 kWp', s: '9 módulos 550 Wp', c: '#D3A15C' },
      { l: 'FDI (CC/CA)', v: '0,83', s: 'Inversor 6,0 kW 2-MPPT', c: '#34D399' },
      { l: 'Voc(-2°C) FRIO', v: '480,9 V', s: 'Seguro < 1.000 V máx', c: '#22D3EE' },
      { l: 'Vmp(70°C) CALOR', v: '317,7 V', s: 'Dentro MPPT 160-850V', c: '#E5BA7E' },
    ],
    chartKind: 'string_thermal',
    flowNodes: [
      { t: 'Consumo 595 kWh', s: 'Fração Trifásica' },
      { t: 'PR Multiplicativo', s: '80,25% encadeado' },
      { t: 'String 9x 550Wp', s: 'Voc frio 481V < 1kV' },
      { t: 'Inversor 6kW', s: 'MPPT rastreamento OK' },
    ],
    codeTitle: 'thermal_string_limits.py',
    codeLines: [
      'voc_cold = n_str * voc_stc * (1 + beta_voc * (t_min_record - 25))',
      'vmp_hot = n_str * vmp_stc * (1 + beta_vmp * (t_max_cell - 25))',
      'assert voc_cold <= v_max_inv and vmp_hot >= v_mppt_min',
    ],
    bottomBadge: 'ABNT NBR 16690 • COORDENAÇÃO MPPT • LIMITES TÉRMICOS Voc/Vmp • FDI CC/CA',
  },
];

// Rich bespoke engineering chart generator (High-DPI SVG)
function renderBespokeChart(kind) {
  if (kind === 'pv_bess') {
    return `<svg viewBox="0 0 540 135" width="100%" height="135">
      <defs>
        <linearGradient id="gPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#D3A15C" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#D3A15C" stop-opacity="0.0"/>
        </linearGradient>
        <linearGradient id="gBess" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22D3EE" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#22D3EE" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <line x1="20" y1="28" x2="520" y2="28" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
      <line x1="20" y1="68" x2="520" y2="68" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
      <line x1="20" y1="108" x2="520" y2="108" stroke="rgba(255,255,255,0.12)"/>
      <!-- PV Bell Curve -->
      <path d="M25 108 Q120 106 180 55 T270 20 T360 55 Q420 106 515 108 L515 108 L25 108 Z" fill="url(#gPv)"/>
      <path d="M25 108 Q120 106 180 55 T270 20 T360 55 Q420 106 515 108" fill="none" stroke="#D3A15C" stroke-width="3"/>
      <!-- Inverter Clip Line -->
      <line x1="185" y1="34" x2="355" y2="34" stroke="#F87171" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="270" y="30" text-anchor="middle" fill="#F87171" font-family="monospace" font-size="9">TETO INVERSOR 1.000 kW CA</text>
      <!-- BESS Peak Discharge window (18h-21h) -->
      <rect x="390" y="38" width="85" height="70" rx="4" fill="url(#gBess)" stroke="#22D3EE" stroke-width="1.8"/>
      <text x="432" y="58" text-anchor="middle" fill="#22D3EE" font-family="monospace" font-size="10" font-weight="700">DESCARGA BESS</text>
      <text x="432" y="74" text-anchor="middle" fill="#C8D1DA" font-family="monospace" font-size="9">Peak Shaving 18-21h</text>
      <text x="432" y="94" text-anchor="middle" fill="#34D399" font-family="monospace" font-size="10" font-weight="700">-130,7 kW</text>
    </svg>`;
  }

  if (kind === 'ai_curves') {
    return `<svg viewBox="0 0 540 135" width="100%" height="135">
      <defs>
        <linearGradient id="gAiBand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22D3EE" stop-opacity="0.30"/>
          <stop offset="100%" stop-color="#22D3EE" stop-opacity="0.05"/>
        </linearGradient>
      </defs>
      <line x1="20" y1="30" x2="520" y2="30" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
      <line x1="20" y1="70" x2="520" y2="70" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
      <line x1="20" y1="110" x2="520" y2="110" stroke="rgba(255,255,255,0.12)"/>
      <!-- Confidence band -->
      <path d="M25 90 Q90 80 150 50 T270 32 T390 62 Q450 78 515 84 L515 106 Q450 98 390 82 T270 52 T150 70 Q90 100 25 110 Z" fill="url(#gAiBand)"/>
      <!-- Real load line -->
      <path d="M25 100 Q90 90 150 60 T270 42 T390 72 Q450 88 515 95" fill="none" stroke="#22D3EE" stroke-width="2.6"/>
      <!-- Predicted line -->
      <path d="M25 102 Q90 88 150 58 T270 40 T390 70 Q450 86 515 93" fill="none" stroke="#D3A15C" stroke-width="2" stroke-dasharray="5 3"/>
      <!-- Detected anomalies -->
      <circle cx="210" cy="38" r="7" fill="#F87171" stroke="#06131F" stroke-width="2"/>
      <text x="210" y="24" text-anchor="middle" fill="#F87171" font-family="monospace" font-size="9" font-weight="700">Z=3,25σ ANOMALIA</text>
      <circle cx="430" cy="85" r="7" fill="#F87171" stroke="#06131F" stroke-width="2"/>
      <text x="430" y="70" text-anchor="middle" fill="#F87171" font-family="monospace" font-size="9" font-weight="700">Z=2,85σ</text>
      <text x="100" y="24" fill="#34D399" font-family="monospace" font-size="9">MAPE 4,63% • R² 0,974</text>
    </svg>`;
  }

  if (kind === 'duck_curve') {
    return `<svg viewBox="0 0 540 135" width="100%" height="135">
      <defs>
        <linearGradient id="gDuck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <line x1="20" y1="28" x2="520" y2="28" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
      <line x1="20" y1="68" x2="520" y2="68" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
      <line x1="20" y1="110" x2="520" y2="110" stroke="rgba(255,255,255,0.12)"/>
      <!-- Gross Load (White) -->
      <path d="M25 68 Q100 62 170 45 T310 38 T440 28 Q480 32 515 54" fill="none" stroke="#F4F6F3" stroke-width="2.2" stroke-dasharray="4 2"/>
      <text x="130" y="38" fill="#F4F6F3" font-family="monospace" font-size="9">Carga Bruta 103 GW</text>
      <!-- Net Load "Duck Belly" (Golden / Cyan) -->
      <path d="M25 68 Q90 65 160 76 T270 95 T380 62 Q450 30 515 54 L515 110 L25 110 Z" fill="url(#gDuck)"/>
      <path d="M25 68 Q90 65 160 76 T270 95 T380 62 Q450 30 515 54" fill="none" stroke="#D3A15C" stroke-width="3"/>
      <!-- Evening Ramp Annotation -->
      <line x1="270" y1="95" x2="445" y2="30" stroke="#F87171" stroke-width="2.5"/>
      <circle cx="270" cy="95" r="5" fill="#D3A15C"/>
      <circle cx="445" cy="30" r="5" fill="#F87171"/>
      <text x="375" y="104" text-anchor="middle" fill="#38BDF8" font-family="monospace" font-size="9" font-weight="700">VALE DO PATO (13h): 39,2 GW</text>
      <text x="385" y="44" fill="#F87171" font-family="monospace" font-size="10" font-weight="700">RAMPA +7,11 GW/h</text>
    </svg>`;
  }

  if (kind === 'dcf_payback') {
    return `<svg viewBox="0 0 540 135" width="100%" height="135">
      <defs>
        <linearGradient id="gDcf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#34D399" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#34D399" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <line x1="20" y1="70" x2="520" y2="70" stroke="rgba(211,161,92,0.4)" stroke-width="1.6"/>
      <text x="25" y="66" fill="#D3A15C" font-family="monospace" font-size="9">R$ 0 (PONTO DE EQUILÍBRIO)</text>
      <!-- Negative Capex start -->
      <path d="M30 115 Q90 98 140 70 T230 42 T370 24 T515 16 L515 70 L140 70 Z" fill="url(#gDcf)"/>
      <path d="M30 115 Q90 98 140 70 T230 42 T370 24 T515 16" fill="none" stroke="#34D399" stroke-width="3"/>
      <!-- Inverter replacement year 12 notch -->
      <circle cx="270" cy="38" r="5" fill="#F87171"/>
      <text x="270" y="54" text-anchor="middle" fill="#F87171" font-family="monospace" font-size="8.5">Troca Inversor (A12)</text>
      <!-- Payback marker -->
      <circle cx="140" cy="70" r="6" fill="#D3A15C" stroke="#06131F" stroke-width="2"/>
      <text x="140" y="86" text-anchor="middle" fill="#D3A15C" font-family="monospace" font-size="9.5" font-weight="700">PAYBACK 3,5 ANOS</text>
      <text x="460" y="32" text-anchor="middle" fill="#34D399" font-family="monospace" font-size="10" font-weight="700">VPL R$ 479k</text>
    </svg>`;
  }

  if (kind === 'acr_acl_bars') {
    const bars = [
      { l: 'Energia (TE/PPA)', acr: 88, acl: 42 },
      { l: 'Demanda / TUSD Fio', acr: 52, acl: 28 },
      { l: 'Encargos / Bandeiras', acr: 32, acl: 14 },
      { l: 'Tributos (ICMS/PIS)', acr: 45, acl: 21 },
    ];
    const bHtml = bars.map((b, i) => {
      const x = 35 + i * 122;
      return `
        <rect x="${x}" y="${110 - b.acr}" width="24" height="${b.acr}" rx="4" fill="#F87171" opacity="0.88"/>
        <rect x="${x + 28}" y="${110 - b.acl}" width="24" height="${b.acl}" rx="4" fill="#34D399" opacity="0.95"/>
        <text x="${x + 26}" y="124" text-anchor="middle" fill="#C8D1DA" font-family="monospace" font-size="8">${b.l}</text>
      `;
    }).join('');
    return `<svg viewBox="0 0 540 135" width="100%" height="135">
      <line x1="20" y1="110" x2="520" y2="110" stroke="rgba(255,255,255,0.14)"/>
      ${bHtml}
      <!-- Legend -->
      <rect x="350" y="16" width="12" height="12" rx="3" fill="#F87171"/>
      <text x="368" y="26" fill="#F87171" font-family="monospace" font-size="9" font-weight="600">Cativo ACR (R$ 3,85 M)</text>
      <rect x="350" y="34" width="12" height="12" rx="3" fill="#34D399"/>
      <text x="368" y="44" fill="#34D399" font-family="monospace" font-size="9" font-weight="600">Livre ACL (R$ 2,07 M)</text>
    </svg>`;
  }

  if (kind === 'h2v_decomp') {
    const parts = [
      { l: 'CAPEX Planta+Híbrido', v: 48, c: '#D3A15C' },
      { l: 'Energia Renovável', v: 36, c: '#22D3EE' },
      { l: 'O&M & BoP', v: 10, c: '#38BDF8' },
      { l: 'Stack & Água', v: 6, c: '#34D399' },
    ];
    let curX = 35;
    const segs = parts.map(p => {
      const w = p.v * 4.6;
      const res = `
        <rect x="${curX}" y="45" width="${w}" height="32" rx="4" fill="${p.c}"/>
        <text x="${curX + w/2}" y="38" text-anchor="middle" fill="${p.c}" font-family="monospace" font-size="9" font-weight="700">${p.v}%</text>
        <text x="${curX + w/2}" y="95" text-anchor="middle" fill="#C8D1DA" font-family="monospace" font-size="8.5">${p.l}</text>
      `;
      curX += w + 6;
      return res;
    }).join('');
    return `<svg viewBox="0 0 540 135" width="100%" height="135">
      <text x="35" y="22" fill="#22D3EE" font-family="monospace" font-size="10" font-weight="700">COMPOSIÇÃO DO LCOH: R$ 26,25/kg H2 (US$ 4,91/kg)</text>
      ${segs}
      <line x1="20" y1="115" x2="520" y2="115" stroke="rgba(255,255,255,0.08)"/>
      <text x="270" y="128" text-anchor="middle" fill="#34D399" font-family="monospace" font-size="9">Eletrolisador PEM 20 MW • 6.898 h/ano • 2.653 ton H2V/ano</text>
    </svg>`;
  }

  if (kind === 'pmo_kanban') {
    const cols = [
      { t: '1. Viabilidade', n: 24, d: '11 d', c: '#38BDF8' },
      { t: '2. Parecer Acesso', n: 42, d: '34 d', c: '#F87171' },
      { t: '3. Executivo MT', n: 38, d: '22 d', c: '#A78BFA' },
      { t: '4. Montagem Obra', n: 34, d: '24 d', c: '#D3A15C' },
      { t: '5. Comissionamento', n: 20, d: '14 d', c: '#34D399' },
    ];
    const cHtml = cols.map((col, idx) => {
      const x = 25 + idx * 98;
      const h = col.n * 1.8;
      return `
        <rect x="${x}" y="32" width="90" height="78" rx="6" fill="rgba(16,43,66,0.85)" stroke="${col.c}" stroke-width="1.4"/>
        <text x="${x + 45}" y="48" text-anchor="middle" fill="#F4F6F3" font-family="monospace" font-size="8.5" font-weight="700">${col.t}</text>
        <rect x="${x + 20}" y="56" width="50" height="24" rx="4" fill="${col.c}"/>
        <text x="${x + 45}" y="72" text-anchor="middle" fill="#06131F" font-family="monospace" font-size="12" font-weight="800">${col.n}</text>
        <text x="${x + 45}" y="98" text-anchor="middle" fill="${col.c}" font-family="monospace" font-size="9">Méd: ${col.d}</text>
      `;
    }).join('');
    return `<svg viewBox="0 0 540 135" width="100%" height="135">
      <text x="25" y="20" fill="#A78BFA" font-family="monospace" font-size="9.5" font-weight="700">FUNIL PMO: 200 PROJETOS ATIVOS • GARGALO PRINCIPAL: PARECER CONCESSIONÁRIA</text>
      ${cHtml}
      <line x1="20" y1="120" x2="520" y2="120" stroke="rgba(255,255,255,0.08)"/>
      <text x="270" y="130" text-anchor="middle" fill="#C8D1DA" font-family="monospace" font-size="8.5">SLA Regulatório PRODIST Módulo 3 • Lead Time Médio 103 dias</text>
    </svg>`;
  }

  if (kind === 'iso_pie_bars') {
    const sectors = [
      { s: 'Motores & VFD', pct: 46, c: '#22D3EE' },
      { s: 'Ar Comprimido', pct: 21, c: '#38BDF8' },
      { s: 'Refrigeração / HVAC', pct: 17, c: '#D3A15C' },
      { s: 'Fornos / Térmico', pct: 11, c: '#A78BFA' },
      { s: 'Iluminação', pct: 5, c: '#34D399' },
    ];
    let curX = 25;
    const sHtml = sectors.map(sec => {
      const w = sec.pct * 4.8;
      const res = `
        <rect x="${curX}" y="42" width="${w}" height="28" rx="4" fill="${sec.c}"/>
        <text x="${curX + w/2}" y="36" text-anchor="middle" fill="${sec.c}" font-family="monospace" font-size="9" font-weight="700">${sec.pct}%</text>
        <text x="${curX + w/2}" y="88" text-anchor="middle" fill="#C8D1DA" font-family="monospace" font-size="8">${sec.s}</text>
      `;
      curX += w + 6;
      return res;
    }).join('');
    return `<svg viewBox="0 0 540 135" width="100%" height="135">
      <text x="25" y="20" fill="#22D3EE" font-family="monospace" font-size="9.5" font-weight="700">PARETO SETORIAL: 51.076 MWh/ANO (6 PLANTAS INDUSTRIAIS)</text>
      ${sHtml}
      <!-- Correction Badge -->
      <rect x="25" y="100" width="490" height="26" rx="4" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="1"/>
      <text x="270" y="117" text-anchor="middle" fill="#34D399" font-family="monospace" font-size="9.5" font-weight="700">BANCO DE CAPACITORES 496 kVAr INSTALADO: ELIMINAÇÃO DE R$ 998k/ANO DE MULTA</text>
    </svg>`;
  }

  // default / kind === 'string_thermal'
  return `<svg viewBox="0 0 540 135" width="100%" height="135">
    <line x1="20" y1="30" x2="520" y2="30" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
    <line x1="20" y1="105" x2="520" y2="105" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3 3"/>
    <!-- Inverter limits -->
    <rect x="60" y="28" width="420" height="74" rx="6" fill="rgba(16,43,66,0.6)" stroke="#38BDF8" stroke-width="1.4"/>
    <text x="70" y="22" fill="#38BDF8" font-family="monospace" font-size="9">JANELA MPPT: 160 V A 850 V (Vmáx Inversor 1.000 V)</text>
    <!-- Operating String Voltage Bar -->
    <rect x="180" y="52" width="230" height="30" rx="4" fill="#34D399" opacity="0.9"/>
    <!-- Temperature pins -->
    <line x1="180" y1="42" x2="180" y2="92" stroke="#D3A15C" stroke-width="3"/>
    <circle cx="180" cy="52" r="5" fill="#D3A15C"/>
    <text x="180" y="40" text-anchor="middle" fill="#D3A15C" font-family="monospace" font-size="9" font-weight="700">Vmp(70°C) 318V</text>
    <line x1="410" y1="42" x2="410" y2="92" stroke="#22D3EE" stroke-width="3"/>
    <circle cx="410" cy="52" r="5" fill="#22D3EE"/>
    <text x="410" y="40" text-anchor="middle" fill="#22D3EE" font-family="monospace" font-size="9" font-weight="700">Voc(-2°C) 481V</text>
    <text x="295" y="72" text-anchor="middle" fill="#06131F" font-family="monospace" font-size="11" font-weight="800">STRING 100% SEGURA & COMPATÍVEL</text>
    <text x="270" y="122" text-anchor="middle" fill="#34D399" font-family="monospace" font-size="9">ABNT NBR 16690 • FDI 0,83 • 9 Módulos 550 Wp em Série</text>
  </svg>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 960 }, deviceScaleFactor: 1 });

for (const st of STAGES) {
  const kpiBoxes = st.kpis.map(k => `
    <div style="background:rgba(6,19,31,0.92);border:1px solid rgba(211,161,92,0.32);border-radius:10px;padding:9px 12px;flex:1;min-width:0;">
      <div style="font-size:10px;color:#8898A9;font-family:'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:0.04em;">${k.l}</div>
      <div style="font-size:22px;font-weight:800;color:${k.c};font-family:'Bebas Neue',sans-serif;letter-spacing:0.04em;line-height:1.1;margin-top:2px;">${k.v}</div>
      <div style="font-size:9.5px;color:#C8D1DA;font-family:'IBM Plex Mono',monospace;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${k.s}</div>
    </div>
  `).join('');

  const flowBoxes = st.flowNodes.map((fn, idx) => `
    <div style="background:rgba(16,43,66,0.92);border:1.2px solid ${idx === 2 ? '#34D399' : 'rgba(211,161,92,0.45)'};border-radius:8px;padding:6px 10px;flex:1;text-align:center;">
      <div style="font-size:9px;color:${st.accentColor};font-family:'IBM Plex Mono',monospace;font-weight:700;">ETAPA 0${idx+1}</div>
      <div style="font-size:11px;color:#F4F6F3;font-weight:700;line-height:1.15;margin-top:2px;">${fn.t}</div>
      <div style="font-size:9px;color:#C8D1DA;font-family:'IBM Plex Mono',monospace;margin-top:2px;">${fn.s}</div>
    </div>
    ${idx < st.flowNodes.length - 1 ? `<div style="color:${st.accentColor};font-weight:800;font-size:14px;align-self:center;">→</div>` : ''}
  `).join('');

  const codeHtml = st.codeLines.map((l, idx) => `
    <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.65;">
      <span style="color:#567089;margin-right:10px;user-select:none;">0${idx + 1}</span>
      <span style="color:#E5BA7E;font-family:'IBM Plex Mono',monospace;">${l}</span>
    </div>
  `).join('');

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8"/>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;600;700;800&display=swap" rel="stylesheet"/>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 960px;
        height: 960px;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .disc {
        width: 924px;
        height: 924px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 50% 28%, rgba(211,161,92,0.18), transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(34,211,238,0.12), transparent 50%),
          linear-gradient(rgba(211,161,92,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(211,161,92,0.06) 1px, transparent 1px),
          #071827;
        background-size: 100% 100%, 100% 100%, 36px 36px, 36px 36px;
        border: 8px solid #D3A15C;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 40px 60px;
        overflow: hidden;
        box-shadow: inset 0 0 70px rgba(0,0,0,0.85);
      }
      .inner-ring {
        position: absolute;
        inset: 16px;
        border-radius: 50%;
        border: 2px solid rgba(244,246,243,0.35);
        pointer-events: none;
      }
      .tech-grid-dots {
        position: absolute;
        inset: 30px;
        border-radius: 50%;
        border: 1px dashed rgba(211,161,92,0.22);
        pointer-events: none;
      }
      .pill-top {
        z-index: 2;
        background: rgba(13,34,54,0.96);
        border: 1.5px solid #D3A15C;
        color: #D3A15C;
        padding: 6px 20px;
        border-radius: 999px;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 19px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.45);
      }
      .pill-top .badge-circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #D3A15C;
        color: #06131F;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 800;
      }
      .main-win {
        z-index: 2;
        width: 710px;
        background: rgba(13,34,54,0.96);
        border: 2px solid rgba(211,161,92,0.55);
        border-radius: 14px;
        padding: 12px 16px 10px;
        box-shadow: 0 20px 48px rgba(0,0,0,0.72);
      }
      .win-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 7px;
        margin-bottom: 8px;
        border-bottom: 1px solid rgba(255,255,255,0.09);
      }
      .dots { display: flex; gap: 7px; }
      .dot { width: 10px; height: 10px; border-radius: 50%; }
      .flow-bar {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
        background: rgba(6,19,31,0.75);
        padding: 5px 8px;
        border-radius: 9px;
        border: 1px solid rgba(200,209,218,0.12);
      }
      .chart-container {
        background: rgba(6,19,31,0.85);
        border-radius: 9px;
        padding: 7px 10px;
        border: 1px solid rgba(211,161,92,0.22);
      }
      .code-win {
        z-index: 3;
        width: 610px;
        margin-top: -24px;
        background: rgba(5,16,28,0.98);
        border: 1.5px solid #D3A15C;
        border-radius: 12px;
        padding: 8px 14px;
        font-family: 'IBM Plex Mono', Consolas, monospace;
        font-size: 12px;
        box-shadow: 0 14px 32px rgba(0,0,0,0.75);
      }
      .pill-bottom {
        z-index: 2;
        background: rgba(13,34,54,0.96);
        border: 1.5px solid rgba(211,161,92,0.45);
        color: #F4F6F3;
        padding: 6px 18px;
        border-radius: 999px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-align: center;
        box-shadow: 0 6px 18px rgba(0,0,0,0.5);
      }
    </style>
  </head>
  <body>
    <div class="disc">
      <div class="inner-ring"></div>
      <div class="tech-grid-dots"></div>

      <div class="pill-top">
        <span class="badge-circle">${st.num}</span>
        <span>${st.layer}</span>
      </div>

      <div class="main-win">
        <div class="win-bar">
          <div class="dots">
            <span class="dot" style="background:#ef4444;"></span>
            <span class="dot" style="background:#f59e0b;"></span>
            <span class="dot" style="background:#10b981;"></span>
          </div>
          <span style="color:#22D3EE;font-family:'IBM Plex Mono',monospace;font-size:12.5px;font-weight:600;">${st.windowTitle}</span>
          <span style="color:#D3A15C;font-family:'IBM Plex Mono',monospace;font-size:11px;">v3.0.0 • verified</span>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:12px;">
          ${kpiBoxes}
        </div>

        <div class="flow-bar">
          ${flowBoxes}
        </div>

        <div class="chart-container">
          ${renderBespokeChart(st.chartKind)}
        </div>
      </div>

      <div class="code-win">
        <div style="display:flex;justify-content:space-between;color:#D3A15C;font-size:11.5px;margin-bottom:5px;font-weight:700;">
          <span>⚡ ${st.codeTitle}</span>
          <span style="color:#34D399;font-size:11px;">100% Determinístico</span>
        </div>
        ${codeHtml}
      </div>

      <div class="pill-bottom">${st.bottomBadge}</div>
    </div>
  </body>
  </html>`;

  await page.setContent(html, { waitUntil: 'networkidle' });
  const outPath = path.join(OUT_DIR, st.file);
  await page.screenshot({ path: outPath, omitBackground: true });
  console.log(`[GENERATED ART] ${st.num} ${st.file}`);
}

await browser.close();
console.log('=== ALL 9 BESPOKE STAGE ARTS REGENERATED SUCCESSFULLY ===');
