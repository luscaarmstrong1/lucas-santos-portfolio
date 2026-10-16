"use client";

import React, { useState } from "react";

/**
 * Geometric stroke paths spelling "LUCAS" in monumental technical strokes
 * Compatible with GSAP stroke-dashoffset animation (`data-traco` / `data-ponto`).
 */
const LOGO_PATHS = [
  // L
  "M56 140V580H290",
  // U
  "M370 140V445A135 135 0 0 0 640 445V140",
  // C
  "M1010 235A165 165 0 1 0 1010 495",
  // A
  "M1110 580L1265 140L1420 580",
  "M1158 440H1372",
  // S
  "M1775 215C1730 140 1520 140 1520 255C1520 390 1790 340 1790 475C1790 590 1565 590 1510 505",
  // Technical accent bar
  "M1880 580H2010",
];

export function LogoLucas({
  id,
  className,
  animated = false,
}: {
  id?: string;
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      id={id}
      viewBox="0 100 2062 520"
      className={className}
      role="img"
      aria-label="Lucas Santos"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={68}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {LOGO_PATHS.map((d, idx) =>
          animated ? (
            <path key={idx} d={d} data-traco="" pathLength={1} />
          ) : (
            <path key={idx} d={d} />
          )
        )}
      </g>
      {animated ? (
        <circle cx="1945" cy="200" r="44" fill="currentColor" data-ponto="" />
      ) : (
        <circle cx="1945" cy="200" r="44" fill="currentColor" />
      )}
    </svg>
  );
}

export function LinkedInIcon({ className = "social-media-icon" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
    </svg>
  );
}

export function GitHubIcon({ className = "social-media-icon" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export function MailIcon({ className = "social-media-icon" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function BriefcaseIcon({ className = "circulo-icone" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  );
}

export function PinIcon({ className = "circulo-icone" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M12 21s-6.5-5.6-6.5-10.6a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </svg>
  );
}

export function EnviarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  );
}

/**
 * Technical Engineering Emblem (replaces SmileySvg)
 */
export function TechBadgeSvg() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" fill="none">
      <circle
        cx="32"
        cy="32"
        r="29"
        strokeWidth="2.5"
        style={{ fill: "var(--color-navy-deep)", stroke: "var(--color-gold-accent)" }}
      />
      <circle
        cx="32"
        cy="32"
        r="21"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        style={{ stroke: "var(--color-gold-accent)", opacity: 0.65 }}
      />
      <path
        d="M34.5 16L22 34h10l-2.5 14L42 30H32l2.5-14Z"
        stroke="var(--color-gold-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(211, 161, 92, 0.18)"
      />
    </svg>
  );
}

export function ActionButton({
  id,
  href,
  label,
  variant = "dark",
  asDiv = false,
  external = false,
}: {
  id?: string;
  href?: string;
  label: string;
  variant?: "dark" | "white" | "light";
  asDiv?: boolean;
  external?: boolean;
}) {
  const isWhite = variant === "white";
  const isLight = variant === "light";
  const bgMod = isWhite ? " white-bg" : isLight ? " light-bg" : "";
  const textMod = isWhite || isLight ? " dark-font" : "";
  const btnMod = isWhite ? " is-white" : isLight ? " is-light" : "";

  const inner = (
    <>
      <div className="button-cycle is-first">
        <svg
          viewBox="0 0 10 10"
          width="100%"
          className="button-arrow"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M1.6 8.4L8.2 1.8M3 1.6H8.4V7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="square"
          />
        </svg>
        <div className={`button-cycle-bg${bgMod}`} />
      </div>
      <div className={`button-bg${bgMod}`}>
        <div className={`button-text${textMod}`}>{label}</div>
      </div>
      <div className="button-cycle is-second">
        <svg
          viewBox="0 0 10 10"
          width="100%"
          className="button-arrow"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M1.6 8.4L8.2 1.8M3 1.6H8.4V7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="square"
          />
        </svg>
        <div className={`button-cycle-bg${bgMod}`} />
      </div>
    </>
  );

  if (asDiv) {
    return (
      <div aria-hidden="true" className={`button${btnMod}`}>
        {inner}
      </div>
    );
  }

  return (
    <a
      id={id}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`button${btnMod} w-inline-block`}
    >
      {inner}
    </a>
  );
}

export function Creditos() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={`footer-credits-toggle${open ? " is-open" : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="footer-credits-toggle-wrap">
          <span className="footer-credits-toggle-text">Stack & Arquitetura</span>
        </span>
      </button>
      <div className={`footer-credits${open ? " is-open" : ""}`}>
        <div className="footer-credits-inner">
          <div className="footer-credits-detail">
            <div className="footer-credits-text">Engenharia & Código</div>
            <a
              href="https://github.com/luscaarmstrong1"
              target="_blank"
              rel="noopener noreferrer"
              className="credits-link w-inline-block"
            >
              <div className="credits-link-wrap">
                <div className="credits-link-text">Lucas Silva Santos</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
