import React from "react";
import { INTERACTIVE_SHOWCASE } from "@/config/site";
import { ActionButton } from "./icons";

const PACK_IMAGES = [
  "/assets/images/elements/elem-solar-module.webp",
  "/assets/images/elements/elem-grid-node.webp",
  "/assets/images/elements/elem-pcb-node.webp",
  "/assets/images/elements/elem-bess-unit.webp",
];

export function DailyMeals() {
  return (
    <section data-inertia="" className="flavour" id="arquitetura">
      <span id="simuladores" style={{ position: "absolute", top: 0 }} aria-hidden="true" />
      <div className="flavour-container">
        <div className="flavour-header">
          <div className="flavour-heading-wrap">
            <h2 className="flavour-title">
              {INTERACTIVE_SHOWCASE.sectionTitle}
            </h2>
            <h3 data-highlight-text="" className="flavour-subline">
              {INTERACTIVE_SHOWCASE.sectionSubtitle}
            </h3>
          </div>
        </div>

        <div className="flavour-layer-pills" role="tablist" aria-label="Projetos e camadas de engenharia">
          {INTERACTIVE_SHOWCASE.stages.map((stage, idx) => (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={idx === 0}
              data-flavour-pill={idx}
              className={`flavour-layer-pill${idx === 0 ? " is-active" : ""}`}
            >
              {stage.shortNavLabel}
            </button>
          ))}
        </div>

        <div data-flavour-content="" className="flavour-content">
          <div className="flavour-left">
            <div className="flavour-signature-wrap">
              <div className="flavour-signature">
                <svg
                  viewBox="0 0 320 90"
                  width={320}
                  height={90}
                  className="flavour-signature-img"
                  aria-hidden="true"
                  overflow="visible"
                >
                  <g
                    transform="rotate(-6 160 45)"
                    fill="currentColor"
                    style={{ fontFamily: "var(--font-mao)" }}
                    fontSize={29}
                  >
                    <text x={0} y={38}>
                      9 simuladores reais
                    </text>
                    <text x={18} y={68}>
                      &amp; modelos em Python
                    </text>
                  </g>
                </svg>
                <svg
                  viewBox="0 0 320 90"
                  width={320}
                  height={90}
                  className="flavour-signature-img is-wiggle"
                  aria-hidden="true"
                  overflow="visible"
                >
                  <g
                    transform="rotate(-6 160 45)"
                    fill="currentColor"
                    style={{ fontFamily: "var(--font-mao)" }}
                    fontSize={29}
                  >
                    <text x={0} y={38}>
                      9 simuladores reais
                    </text>
                    <text x={18} y={68}>
                      &amp; modelos em Python
                    </text>
                  </g>
                </svg>
              </div>
              <div
                style={{ "--animation-delay": ".15s" } as React.CSSProperties}
                className="flavour-signature-arrow"
              >
                <svg
                  viewBox="0 0 150 150"
                  width={150}
                  height={150}
                  className="flavour-signature-arrow-img"
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
                  className="flavour-signature-arrow-img is-wiggle"
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
            <div data-inertia-item="" className="flavour-left-dose is-composite-art">
              <img
                src="/assets/images/projects/digital-twin-composite.webp"
                width={1448}
                height={1024}
                alt={INTERACTIVE_SHOWCASE.projectName}
                data-inertia-item-child=""
                className="flavour-left-dose-img is-composite-img"
              />
            </div>
          </div>

          <div className="flavour-plus" aria-hidden="true">
            <svg
              viewBox="0 0 146 150"
              className="flavour-plus-img"
              fill="none"
            >
              <path
                d="M73 18C72 52 74 98 72 132M20 76C56 73 92 75 126 72"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flavour-right">
            <div data-flavour-slider="" className="flavour-swiper swiper">
              <div className="flavour-swiper-wrapper swiper-wrapper">
                {INTERACTIVE_SHOWCASE.stages.map((stage, idx) => {
                  const packImg = PACK_IMAGES[idx % PACK_IMAGES.length];
                  return (
                    <div key={stage.id} className="flavour-slide swiper-slide">
                      <div className="flavour-slide-inner">
                        <div data-inertia-item="" className="flavour-slide-dose">
                          <img
                            className="flavour-slide-dose-img"
                            src={stage.image}
                            alt={stage.imageAlt}
                            data-inertia-item-child=""
                          />
                        </div>
                        <div
                          data-inertia-item=""
                          className="flavour-slide-pack is-first"
                        >
                          <img
                            className="flavour-slide-pack-img"
                            src={packImg}
                            alt=""
                            data-inertia-item-child=""
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flavour-right-bg" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 769 691"
                fill="none"
                data-flavour-content-svg=""
                className="flavour-right-bg-svg"
              >
                <path
                  d="M245.813 59.5015C54.1619 152.668 -34.1186 356.234 41.6525 512.101C117.424 667.969 332.042 724.289 523.692 631.123C715.343 537.957 803.624 334.39 727.852 178.522C652.081 22.6546 437.463 -33.6648 245.813 59.5015Z"
                  stroke="currentColor"
                  strokeWidth="28"
                />
              </svg>
            </div>
          </div>

          <div className="flavour-navigation">
            <button
              type="button"
              data-flavour-slider-left-button=""
              className="flavour-slider-button is-left"
              aria-label="Projeto anterior"
            >
              <svg
                viewBox="0 0 20 20"
                className="flavour-slider-button-arrow"
                aria-hidden="true"
                fill="none"
                style={{ transform: "scaleX(-1)" }}
              >
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              data-flavour-slider-right-button=""
              className="flavour-slider-button is-right"
              aria-label="Próximo projeto"
            >
              <svg
                viewBox="0 0 20 20"
                className="flavour-slider-button-arrow"
                aria-hidden="true"
                fill="none"
              >
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flavour-center">
            <div
              data-flavour-content-slider=""
              className="flavour-content-swiper swiper"
            >
              <div className="flavour-content-swiper-wrapper swiper-wrapper">
                {INTERACTIVE_SHOWCASE.stages.map((stage) => (
                  <div
                    key={stage.id}
                    className="flavour-content-slide swiper-slide"
                  >
                    <div className="flavour-content-slide-inner">
                      <div className="flavour-content-slide-header">
                        <p className="flavour-content-slider-subline">
                          {stage.subtitle}
                        </p>
                        <h3 className="flavour-content-slider-title">
                          {stage.titleLine1}
                          <br />
                          {stage.titleLine2}
                        </h3>
                      </div>
                      <p className="flavour-stage-description">
                        {stage.description}
                      </p>
                      <div className="flavour-tech-tags">
                        {stage.technologies.map((tech) => (
                          <span key={tech} className="flavour-tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flavour-cta-group">
                        <ActionButton
                          href={stage.demoUrl}
                          label={INTERACTIVE_SHOWCASE.demoCtaLabel}
                          variant="dark"
                          external
                        />
                        <a
                          href={stage.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flavour-github-link"
                        >
                          <span>{INTERACTIVE_SHOWCASE.ctaLabel}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
