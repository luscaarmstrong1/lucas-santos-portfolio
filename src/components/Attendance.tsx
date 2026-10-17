import React from "react";

const EQUIPMENT_ITEMS = [
  {
    key: "inverter",
    src: "/assets/images/elements/elem-inverter.webp",
    width: 183,
    height: 174,
    alt: "Inversor Solar Industrial",
    label: "Inversor Solar",
    className: "sequence-element-item elem-inverter",
  },
  {
    key: "transformer",
    src: "/assets/images/elements/elem-transformer.webp",
    width: 152,
    height: 143,
    alt: "Transformador de Subestação",
    label: "Subestação & Potência",
    className: "sequence-element-item elem-transformer",
  },
  {
    key: "ev-charger",
    src: "/assets/images/elements/elem-ev-charger.webp",
    width: 101,
    height: 162,
    alt: "Estação de Recarga Veicular Elétrica",
    label: "Eletromobilidade",
    className: "sequence-element-item elem-ev-charger",
  },
  {
    key: "workstation",
    src: "/assets/images/elements/elem-workstation.webp",
    width: 191,
    height: 174,
    alt: "Workstation de Engenharia e Simulação",
    label: "Engenharia & Dados",
    className: "sequence-element-item elem-workstation",
  },
  {
    key: "plc",
    src: "/assets/images/elements/elem-plc.webp",
    width: 158,
    height: 116,
    alt: "Controlador Lógico Programável CLP",
    label: "Automação & CLP",
    className: "sequence-element-item elem-plc",
  },
  {
    key: "server-rack",
    src: "/assets/images/elements/elem-server-rack.webp",
    width: 156,
    height: 128,
    alt: "Racks de Servidores e Datacenter",
    label: "Infra & Cloud IA",
    className: "sequence-element-item elem-server-rack",
  },
];

export function Attendance({ mobile = false }: { mobile?: boolean }) {
  const wrapperClass = mobile ? "sequence-final-mobile" : "sequence-final";
  const dataAttr = (name: string) => (mobile ? {} : { [name]: "" });

  return (
    <div className={wrapperClass}>
      <h2 {...dataAttr("data-sequence-title")} className="sequence-title">
        Da engenharia de campo
        <br />
        ao ambiente digital.
        <br />
        <span
          {...dataAttr("data-sequence-title-split")}
          className="light-green-span"
        >
          Energia, dados &amp; software.
        </span>
      </h2>
      <div
        style={{ "--animation-delay": ".05s" } as React.CSSProperties}
        {...dataAttr("data-sequence-final-signature")}
        className="sequence-final-signature"
      >
        <svg
          viewBox="0 0 320 150"
          width={320}
          height={150}
          className="sequence-final-signature-img"
          aria-hidden="true"
          overflow="visible"
        >
          <g
            transform="rotate(-6 160 75)"
            fill="currentColor"
            style={{ fontFamily: "var(--font-mao)" }}
            fontSize={40}
          >
            <text x={0} y={64}>
              projetos técnicos
            </text>
            <text x={18} y={110}>
              &amp; regulação
            </text>
          </g>
        </svg>
        <svg
          viewBox="0 0 320 150"
          width={320}
          height={150}
          className="sequence-final-signature-img is-wiggle"
          aria-hidden="true"
          overflow="visible"
        >
          <g
            transform="rotate(-6 160 75)"
            fill="currentColor"
            style={{ fontFamily: "var(--font-mao)" }}
            fontSize={40}
          >
            <text x={0} y={64}>
              projetos técnicos
            </text>
            <text x={18} y={110}>
              &amp; regulação
            </text>
          </g>
        </svg>
      </div>
      <div
        {...dataAttr("data-sequence-final-signature")}
        className="sequence-final-signature is-first-arrow"
      >
        <svg
          viewBox="0 0 300 92"
          width={300}
          height={92}
          className="sequence-final-signature-img"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M8 62C70 20 160 18 228 46C246 54 262 60 284 56M284 56C272 46 262 40 250 38M284 56C274 64 266 72 262 84"
            stroke="currentColor"
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          viewBox="0 0 300 92"
          width={300}
          height={92}
          className="sequence-final-signature-img is-wiggle"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M8 62C70 20 160 18 228 46C246 54 262 60 284 56M284 56C272 46 262 40 250 38M284 56C274 64 266 72 262 84"
            stroke="currentColor"
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        style={{ "--animation-delay": ".075s" } as React.CSSProperties}
        {...dataAttr("data-sequence-final-signature")}
        className="sequence-final-signature is-second"
      >
        <svg
          viewBox="0 0 330 125"
          width={330}
          height={125}
          className="sequence-final-signature-img"
          aria-hidden="true"
          overflow="visible"
        >
          <g
            transform="rotate(5 165 62.5)"
            fill="currentColor"
            style={{ fontFamily: "var(--font-mao)" }}
            fontSize={40}
          >
            <text x={0} y={49}>
              automação &amp;
            </text>
            <text x={18} y={102}>
              sistemas inteligentes
            </text>
          </g>
        </svg>
        <svg
          viewBox="0 0 330 125"
          width={330}
          height={125}
          className="sequence-final-signature-img is-wiggle"
          aria-hidden="true"
          overflow="visible"
        >
          <g
            transform="rotate(5 165 62.5)"
            fill="currentColor"
            style={{ fontFamily: "var(--font-mao)" }}
            fontSize={40}
          >
            <text x={0} y={49}>
              automação &amp;
            </text>
            <text x={18} y={102}>
              sistemas inteligentes
            </text>
          </g>
        </svg>
      </div>
      <div
        style={{ "--animation-delay": ".025s" } as React.CSSProperties}
        {...dataAttr("data-sequence-final-signature")}
        className="sequence-final-signature is-second-arrow"
      >
        <svg
          viewBox="0 0 153 150"
          width={153}
          height={150}
          className="sequence-final-signature-img"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M120 138C140 96 120 48 66 30M66 30C78 24 88 22 98 24M66 30C74 40 78 50 80 62"
            stroke="currentColor"
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          viewBox="0 0 153 150"
          width={153}
          height={150}
          className="sequence-final-signature-img is-wiggle"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M120 138C140 96 120 48 66 30M66 30C78 24 88 22 98 24M66 30C74 40 78 50 80 62"
            stroke="currentColor"
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {!mobile ? (
        <div className="sequence-final-elements" aria-hidden="true">
          {EQUIPMENT_ITEMS.map((item) => (
            <img
              key={item.key}
              src={item.src}
              width={item.width}
              height={item.height}
              alt={item.alt}
              data-sequence-elem={item.key}
              className={item.className}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="sequence-mobile-hero-photo">
            <img
              src="/assets/images/solar-engineering.webp"
              alt="Ambiente de trabalho e engenharia de projetos de Lucas Santos"
              width={1024}
              height={682}
              loading="lazy"
            />
          </div>
          <div
            className="sequence-mobile-elements-grid"
            aria-label="Equipamentos e soluções de engenharia, energia, dados e automação"
          >
            {EQUIPMENT_ITEMS.map((item) => (
              <div
                key={item.key}
                data-sequence-mobile-elem=""
                className={`sequence-mobile-elem-card is-${item.key}`}
              >
                <img
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  loading="lazy"
                  className="sequence-mobile-elem-img"
                />
                <span className="sequence-mobile-elem-label">{item.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
