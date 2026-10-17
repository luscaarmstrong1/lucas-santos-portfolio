import React from "react";
import { COMPLEMENTARY_AREAS } from "@/config/site";
import { TechBadgeSvg } from "./icons";
import { Attendance } from "./Attendance";

function StatementCardsList({ mobile = false }: { mobile?: boolean }) {
  const cardAttr = (left = false) =>
    mobile
      ? {}
      : left
      ? { "data-sequence-card": "", "data-sequence-card-left": "" }
      : { "data-sequence-card": "" };

  const smileyAttr = (left = false) =>
    mobile
      ? {}
      : left
      ? { "data-sequence-smiley": "", "data-sequence-smiley-left": "" }
      : { "data-sequence-smiley": "" };

  return (
    <>
      <div
        {...cardAttr(false)}
        id={
          mobile
            ? undefined
            : "w-node-_2b1d1553-2e40-4f8e-6012-8b41219152b8-0ac01850"
        }
        className="statement-card is-first"
      >
        <div className="statement-card-wrapper">
          <div {...smileyAttr(false)} className="top-smiley is-card">
            <TechBadgeSvg />
          </div>
          <h3 className="statement-heading">
            Engenharia
            <br />
            &amp; Energia
          </h3>
          <div className="statement-card-paragraph-wrap">
            <p className="paragraph center-align">
              <span>
                Projetos elétricos,{" "}
                <span className="circulado">
                  energia solar
                  <svg
                    viewBox="0 0 180 64"
                    preserveAspectRatio="none"
                    className="circulado-traco"
                    aria-hidden="true"
                    fill="none"
                    overflow="visible"
                  >
                    <path
                      d="M20 40C8 24 50 6 100 6C146 6 178 18 174 36C170 54 120 60 76 58C34 56 6 46 8 32C10 22 26 14 48 10"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 180 64"
                    preserveAspectRatio="none"
                    className="circulado-traco is-wiggle"
                    aria-hidden="true"
                    fill="none"
                    overflow="visible"
                  >
                    <path
                      d="M20 40C8 24 50 6 100 6C146 6 178 18 174 36C170 54 120 60 76 58C34 56 6 46 8 32C10 22 26 14 48 10"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
                ,
                <br />
              </span>
              <span>
                geração distribuída, sistemas de potência,
                <br />
              </span>
              <span>proteção, subestações e BESS.</span>
            </p>
          </div>
        </div>
      </div>

      <div
        {...cardAttr(true)}
        id={
          mobile
            ? undefined
            : "w-node-b2188393-b808-fcc5-146f-a5ea982f9c7e-0ac01850"
        }
        className="statement-card is-second"
      >
        <div className="statement-card-wrapper left">
          <div {...smileyAttr(true)} className="top-smiley is-card">
            <TechBadgeSvg />
          </div>
          <h3 className="statement-heading">
            Regulação &amp;
            <br />
            Consultoria
          </h3>
          <div className="statement-card-paragraph-wrap">
            <div className="second-icon">
              <svg
                viewBox="0 0 64 64"
                className="second-icon-img"
                aria-hidden="true"
                fill="none"
              >
                <path
                  d="M34 4L16 34H32L24 60L50 24H33L42 4Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 64 64"
                className="second-icon-img is-wiggle"
                aria-hidden="true"
                fill="none"
              >
                <path
                  d="M34 4L16 34H32L24 60L50 24H33L42 4Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="paragraph center-align">
              <span>
                Estudos de conexão, normas das
                <br />
              </span>
              <span>
                concessionárias, pareceres de acesso,
                <br />
              </span>
              <span>revisão de reprovas e viabilidade.</span>
            </p>
          </div>
        </div>
      </div>

      <div {...cardAttr(false)} className="statement-card is-third">
        <div className="statement-card-wrapper">
          <div {...smileyAttr(false)} className="top-smiley is-card">
            <TechBadgeSvg />
          </div>
          <h3 className="statement-heading">
            Dados &amp;
            <br />
            IA Aplicada
          </h3>
          <div className="statement-card-paragraph-wrap">
            <div className="third-statement-icon">
              <svg
                viewBox="0 0 64 64"
                className="third-statement-icon-img"
                aria-hidden="true"
                fill="none"
              >
                <path
                  d="M8 46C20 30 32 24 50 20M50 20L38 16M50 20L44 32"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 64 64"
                className="third-statement-icon-img is-wiggle"
                aria-hidden="true"
                fill="none"
              >
                <path
                  d="M8 46C20 30 32 24 50 20M50 20L38 16M50 20L44 32"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="paragraph center-align">
              <span>
                Dashboards executivos, análise preditiva,
                <br />
              </span>
              <span>
                modelos de machine learning, indicadores
                <br />
              </span>
              <span>operacionais e suporte à decisão.</span>
            </p>
          </div>
        </div>
      </div>

      <div
        {...cardAttr(true)}
        id={
          mobile
            ? undefined
            : "w-node-e73f88c6-bfeb-1639-4b8f-4b8fdd41da6c-0ac01850"
        }
        className="statement-card is-fourth"
      >
        <div className="statement-card-wrapper left">
          <div {...smileyAttr(true)} className="top-smiley is-card">
            <TechBadgeSvg />
          </div>
          <h3 className="statement-heading">
            Automação &amp;
            <br />
            Software
          </h3>
          <div className="statement-card-paragraph-wrap">
            <p className="paragraph center-align">
              <span>
                Aplicações web,{" "}
                <span className="circulado">
                  Python
                  <svg
                    viewBox="0 0 64 64"
                    preserveAspectRatio="none"
                    className="circulado-traco"
                    aria-hidden="true"
                    fill="none"
                    overflow="visible"
                  >
                    <path
                      d="M10 40C2 22 20 4 36 5C52 6 63 20 60 36C57 52 40 60 26 58C10 56 2 44 6 30C8 22 16 14 26 10"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 64 64"
                    preserveAspectRatio="none"
                    className="circulado-traco is-wiggle"
                    aria-hidden="true"
                    fill="none"
                    overflow="visible"
                  >
                    <path
                      d="M10 40C2 22 20 4 36 5C52 6 63 20 60 36C57 52 40 60 26 58C10 56 2 44 6 30C8 22 16 14 26 10"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
                , APIs,
                <br />
              </span>
              <span>
                integrações, automação de processos,
                <br />
              </span>
              <span>simuladores técnicos e ferramentas sob medida.</span>
            </p>
          </div>

          <div className="card-side-handwriting" aria-hidden="true">
            <svg
              viewBox="0 0 340 140"
              width={340}
              height={140}
              className="card-side-handwriting-svg"
              overflow="visible"
            >
              <g
                transform="rotate(4 170 70)"
                fill="currentColor"
                style={{ fontFamily: "var(--font-mao)" }}
                fontSize={34}
              >
                <text x={0} y={38}>
                  também atuo com
                </text>
                <text x={14} y={76}>
                  criação de sites e
                </text>
                <text x={28} y={114}>
                  landing pages
                </text>
              </g>
            </svg>
            <svg
              viewBox="0 0 340 140"
              width={340}
              height={140}
              className="card-side-handwriting-svg is-wiggle"
              overflow="visible"
            >
              <g
                transform="rotate(4 170 70)"
                fill="currentColor"
                style={{ fontFamily: "var(--font-mao)" }}
                fontSize={34}
              >
                <text x={0} y={38}>
                  também atuo com
                </text>
                <text x={14} y={76}>
                  criação de sites e
                </text>
                <text x={28} y={114}>
                  landing pages
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export function Specialties() {
  return (
    <div id="atuacao" data-sequence="" className="sequence-section">
      <div data-sequence-trigger="" className="sequence-scroll-wrap">
        <div data-sequence-stage="" className="sequence-sticky">
          <div data-sequence-canvas="" className="sequence-canvas sequence-prato">
            <img
              src="/assets/images/solar-engineering.webp"
              alt="Ambiente de trabalho e engenharia de projetos de Lucas Santos"
              width={1024}
              height={682}
            />
          </div>
          <div className="sequence-cards">
            <StatementCardsList mobile={false} />
          </div>
          <Attendance mobile={false} />
          <div className="sequence-lines" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 1440 691"
              fill="none"
              data-sequence-svg=""
              style={{ overflow: "visible" }}
              className="sequence-line-svg is-first"
            >
              <path
                d="M-11 627.781C31.2318 652.606 151.814 698.642 199.05 645.884C264.5 572.781 199.05 472.107 47.547 363.054C-103.956 254 -52.529 150.083 24.5115 108.595C210.583 8.39218 434.763 502.251 720.049 329.362C981.436 170.957 1134 -69.7188 1490 2.78121"
                stroke="currentColor"
                strokeWidth="40"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 1440 682"
              fill="none"
              data-sequence-svg=""
              style={{ overflow: "visible" }}
              className="sequence-line-svg is-second"
            >
              <path
                d="M1442.05 19.9995C1346.05 34.4995 1170.99 110.452 1098.05 191.999C975.047 329.499 1257.15 515.709 1159 626.498C1027 775.498 571.87 408.445 484.498 347.293C244.047 178.999 15 -12.5016 -102 87.9984"
                stroke="currentColor"
                strokeWidth="40"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 1440 750"
              fill="none"
              data-sequence-svg=""
              style={{ overflow: "visible" }}
              className="sequence-line-svg is-third"
            >
              <path
                d="M-918.224 5.00043C-948.225 142 -730.728 264 -473.726 252.501C-271.374 243.446 29.7721 170.716 170.275 135.501C1143.77 -108.499 460.741 462.659 570.773 634.5C651.773 761 1056.77 396 1392.27 396C1513.27 396 1835.87 454.857 2022.77 607.501C2178.27 734.5 2312.44 743.001 2363.77 718.001"
                stroke="currentColor"
                strokeWidth="40"
              />
            </svg>
            <div data-sequence-signature="" className="sequence-inner-signature">
              <svg
                viewBox="0 0 320 132"
                width={320}
                height={132}
                className="sequence-inner-signature-img"
                aria-hidden="true"
                overflow="visible"
              >
                <g
                  transform="rotate(-6 160 66)"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-mao)" }}
                  fontSize={36}
                >
                  <text x={0} y={38}>
                    também atuo em
                  </text>
                  <text x={18} y={76}>
                    eletromobilidade,
                  </text>
                  <text x={36} y={115}>
                    IoT e gestão
                  </text>
                </g>
              </svg>
              <svg
                viewBox="0 0 320 132"
                width={320}
                height={132}
                className="sequence-inner-signature-img is-wiggle"
                aria-hidden="true"
                overflow="visible"
              >
                <g
                  transform="rotate(-6 160 66)"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-mao)" }}
                  fontSize={36}
                >
                  <text x={0} y={38}>
                    também atuo em
                  </text>
                  <text x={18} y={76}>
                    eletromobilidade,
                  </text>
                  <text x={36} y={115}>
                    IoT e gestão
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="sequence-cards-mobile">
          <StatementCardsList mobile />
          <Attendance mobile />
        </div>
      </div>

      <div className="container" style={{ paddingTop: "1em", paddingBottom: "3.5em" }}>
        <div className="grid-layout">
          <div className="complementary-bar">
            <div className="complementary-bar-header">
              <h3 className="complementary-bar-title">
                Frentes Complementares &amp; Domínio Multidisciplinar
              </h3>
              <span
                style={{
                  fontSize: "1.25em",
                  color: "var(--color-text-secondary)",
                }}
              >
                Projetos técnicos • Soluções digitais • Dados e automação • Gestão e negócios
              </span>
            </div>
            <div className="complementary-pills">
              {COMPLEMENTARY_AREAS.areas.map((area) => (
                <span
                  key={area.title}
                  className="complementary-pill"
                  title={area.detail}
                >
                  {area.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
