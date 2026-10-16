import React from "react";

export function Marquee() {
  return (
    <div
      data-marquee=""
      className="marquee"
      title="Passe o mouse para circular o texto"
      style={{ cursor: "pointer" }}
    >
      <div className="marquee-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 442"
          width="100%"
          style={{ overflow: "visible" }}
          className="marquee-bg-svg"
          aria-hidden="true"
        >
          <path
            stroke="currentColor"
            strokeWidth="160"
            d="M-71 371.6C126.3 260 593.5 65.8 934.5 80.8c313 13.8 497 136 572 200"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 293"
          width="100%"
          style={{ overflow: "visible" }}
          data-marquee-svg=""
          className="marquee-text-svg"
        >
          <path
            d="M-68 300C173 173 515.5 1 937.2 1 1254.5 1 1468 183.3 1543 246.9"
            id="curve"
          />
          <text width="100%" style={{ transform: "translate3d(0,0,0)" }}>
            <textPath
              style={{ transform: "translate3d(0,0,0)" }}
              href="#curve"
              startOffset="-30%"
            >
              Engenharia • Inteligência • Automação • Resultados • Engenharia • Inteligência • Automação • Resultados • Engenharia • Inteligência • Automação • Resultados • Engenharia • Inteligência • Automação • Resultados •
            </textPath>
          </text>
        </svg>
        <div className="marquee-overlay" />
      </div>
    </div>
  );
}
