import React from "react";
import { SITE } from "@/config/site";
import { ActionButton, LogoLucas } from "./icons";
import { Marquee } from "./Marquee";

export function Hero() {
  return (
    <section data-load-stage="" data-inertia="" className="stage">
      <div className="stage-overlay" />
      <div className="stage-container">
        <div className="stage-inner">
          <div className="stage-content">
            <div className="stage-logo">
              <div data-load-stage-logo="" className="stage-logo-svg">
                <LogoLucas className="logo-lucas" animated />
              </div>
            </div>
            <div
              data-load-stage-cta=""
              className="stage-cta"
              style={{ display: "flex", gap: "1em", flexWrap: "wrap", justifyContent: "center" }}
            >
              <ActionButton
                href="#projetos"
                label="Explorar meus projetos"
                variant="dark"
              />
              <ActionButton
                href={SITE.linkedin}
                label="Conectar no LinkedIn"
                variant="white"
                external
              />
            </div>
            <div className="stage-wrap">
              <div className="stage-left">
                <div className="stage-deco">
                  <div
                    data-load-stage-deco-text=""
                    style={{ "--animation-delay": ".05s" } as React.CSSProperties}
                    className="stage-deco-text-wrap"
                  >
                    <svg
                      viewBox="0 0 320 112"
                      width={320}
                      height={112}
                      className="stage-deco-text"
                      aria-hidden="true"
                      overflow="visible"
                    >
                      <g
                        transform="rotate(-6 160 56)"
                        fill="currentColor"
                        style={{ fontFamily: "var(--font-mao)" }}
                        fontSize={40}
                      >
                        <text x={0} y={45}>
                          Energia, Dados
                        </text>
                        <text x={18} y={90}>
                          &amp; Inteligência
                        </text>
                      </g>
                    </svg>
                    <svg
                      viewBox="0 0 320 112"
                      width={320}
                      height={112}
                      className="stage-deco-text is-wiggle"
                      aria-hidden="true"
                      overflow="visible"
                    >
                      <g
                        transform="rotate(-6 160 56)"
                        fill="currentColor"
                        style={{ fontFamily: "var(--font-mao)" }}
                        fontSize={40}
                      >
                        <text x={0} y={45}>
                          Energia, Dados
                        </text>
                        <text x={18} y={90}>
                          &amp; Inteligência
                        </text>
                      </g>
                    </svg>
                  </div>
                  <div
                    data-load-stage-deco-arrow=""
                    style={{ "--animation-delay": ".15s" } as React.CSSProperties}
                    className="stage-deco-arrow-wrap"
                  >
                    <svg
                      viewBox="0 0 150 150"
                      width={150}
                      height={150}
                      className="stage-deco-arrow"
                      aria-hidden="true"
                      fill="none"
                    >
                      <path
                        d="M30 14C12 48 18 98 62 122M62 122C58 108 50 100 40 96M62 122C48 124 38 130 32 140"
                        stroke="currentColor"
                        strokeWidth={3.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      viewBox="0 0 150 150"
                      width={150}
                      height={150}
                      className="stage-deco-arrow is-wiggle"
                      aria-hidden="true"
                      fill="none"
                    >
                      <path
                        d="M30 14C12 48 18 98 62 122M62 122C58 108 50 100 40 96M62 122C48 124 38 130 32 140"
                        stroke="currentColor"
                        strokeWidth={3.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="stage-visual">
                  <img
                    data-load-stage-canvas=""
                    className="stage-canvas"
                    src="/assets/images/lucas-hero.webp"
                    alt="Lucas Silva Santos — Engenheiro Eletricista e Gerente de Projetos"
                    width={1100}
                    height={1280}
                  />
                </div>
                <div className="stage-facts">
                  <div data-inertia-item="" className="stage-fact-outer">
                    <div
                      data-load-stage-fact=""
                      data-inertia-item-child=""
                      className="stage-fact is-first"
                    >
                      <div className="stage-fact-wrap">
                        <div className="stage-fact-number">100</div>
                        <div className="stage-fact-unit">+</div>
                      </div>
                      <div className="stage-fact-text">projetos homologados</div>
                    </div>
                  </div>
                  <div data-inertia-item="" className="stage-fact-outer">
                    <div
                      data-load-stage-fact=""
                      data-inertia-item-child=""
                      className="stage-fact is-second"
                    >
                      <div className="stage-fact-wrap">
                        <div className="stage-fact-number">500</div>
                        <div className="stage-fact-unit">+</div>
                      </div>
                      <div className="stage-fact-text">projetos reanalisados</div>
                    </div>
                  </div>
                  <div data-inertia-item="" className="stage-fact-outer">
                    <div
                      data-load-stage-fact=""
                      data-inertia-item-child=""
                      className="stage-fact is-third"
                    >
                      <div className="stage-fact-wrap">
                        <div className="stage-fact-number">~80</div>
                        <div className="stage-fact-unit">MWp</div>
                      </div>
                      <div className="stage-fact-text">analisados</div>
                    </div>
                  </div>
                </div>
                <div className="stage-bg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 731 818"
                    fill="none"
                    data-load-stage-svg=""
                    className="stage-bg-svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M542.941 42.7702C707.951 122.986 766.918 351.375 667.592 555.698C568.265 760.021 352.233 854.727 187.223 774.512C22.2122 694.296 -36.7556 465.905 62.5711 261.582C161.898 57.2593 377.93 -37.4456 542.941 42.7702Z"
                      stroke="currentColor"
                      strokeWidth="28"
                    />
                  </svg>
                </div>
              </div>
              <div className="stage-right">
                <div className="stage-text-wrap">
                  <div
                    style={{
                      fontSize: "1.2em",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-gold-accent)",
                      fontWeight: 600,
                    }}
                  >
                    LUCAS SILVA SANTOS • ENGENHEIRO ELETRICISTA &amp; GERENTE DE PROJETOS
                  </div>
                  <h1 data-load-stage-title="" className="hero-heading">
                    <span className="white-span">Engenharia,</span>
                    <br />
                    dados e
                    <br />
                    tecnologia.
                  </h1>
                  <div className="stage-paragraph-wrap">
                    <p
                      data-load-stage-text=""
                      className="paragraph is-stage-paragraph"
                    >
                      Soluções técnicas, produtos digitais e automação inteligente para energia, operações e negócios.
                    </p>
                    <div
                      data-load-stage-underline=""
                      style={{ "--animation-delay": ".2s" } as React.CSSProperties}
                      className="stage-subline-wrap"
                    >
                      <svg
                        viewBox="0 0 152 42"
                        width={152}
                        height={42}
                        className="subline-img"
                        aria-hidden="true"
                        fill="none"
                      >
                        <path
                          d="M4 30C30 22 62 20 92 22C112 23 128 26 148 18M30 36C56 32 84 32 112 34"
                          stroke="currentColor"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        viewBox="0 0 152 42"
                        width={152}
                        height={42}
                        className="subline-img is-wiggle"
                        aria-hidden="true"
                        fill="none"
                      >
                        <path
                          d="M4 30C30 22 62 20 92 22C112 23 128 26 148 18M30 36C56 32 84 32 112 34"
                          stroke="currentColor"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee />
    </section>
  );
}
