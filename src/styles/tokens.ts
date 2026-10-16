/**
 * Sistema Centralizado de Design Tokens
 * Identidade Visual: Lucas Silva Santos — Engenharia, Energia, Dados & Automação
 * Direção Estética: Editorial Engineering / Technology Portfolio / Premium Personal Brand
 */

export const DESIGN_TOKENS = {
  colors: {
    navyDeep: '#071827',
    blueTech: '#102B42',
    gold: '#D3A15C',
    goldLight: '#E8C186',
    iceBlue: '#DCE7ED',
    offWhite: '#F4F6F3',
    graphite: '#263C3B',
    white: '#FFFFFF',
    overlayDark: 'rgba(7, 24, 39, 0.85)',
  },
  typography: {
    families: {
      heading: "'Sofia Sans Condensed', sans-serif",
      script: "'Kalam', sans-serif",
      body: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
  breakpoints: {
    mobileCompact: 375,
    mobile: 390,
    mobileMax: 479,
    tabletPortrait: 768,
    tabletMax: 991,
    tabletLandscape: 1024,
    notebook: 1280,
    desktop: 1440,
    desktopWide: 1920,
  },
} as const;
