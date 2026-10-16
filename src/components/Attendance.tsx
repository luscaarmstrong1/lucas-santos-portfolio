import React from "react";

export function Attendance({ mobile = false }: { mobile?: boolean }) {
  const wrapperClass = mobile ? "sequence-final-mobile" : "sequence-final";
  const dataAttr = (name: string) =>
    mobile ? {} : { [name]: "" };

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
            fontSize={44}
          >
            <text x={0} y={49}>
              dados, IA &amp;
            </text>
            <text x={18} y={102}>
              produtos digitais
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
            fontSize={44}
          >
            <text x={0} y={49}>
              dados, IA &amp;
            </text>
            <text x={18} y={102}>
              produtos digitais
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
      {!mobile && (
        <>
          <img
            src="/assets/images/elements/elem-solar-module.webp"
            width={340}
            height={340}
            alt=""
            data-sequence-cookie-first=""
            className="sequence-final-cookie"
          />
          <img
            src="/assets/images/elements/elem-grid-node.webp"
            width={340}
            height={340}
            alt=""
            data-sequence-cookie-second=""
            className="sequence-final-cookie is-second"
          />
          <img
            src="/assets/images/elements/elem-pcb-node.webp"
            width={420}
            height={420}
            alt=""
            data-sequence-strawberry-first=""
            className="sequence-final-strawberry"
          />
          <img
            src="/assets/images/elements/elem-bess-unit.webp"
            width={420}
            height={420}
            alt=""
            data-sequence-strawberry-second=""
            className="sequence-final-strawberry is-second"
          />
        </>
      )}
    </div>
  );
}
