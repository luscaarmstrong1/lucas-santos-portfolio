import type { Metadata } from "next";
import React from "react";
import { SITE } from "@/config/site";
import { Pronto } from "@/lib/origem";
import { LogoLucas } from "@/components/icons";
import { EvaluationFlow } from "@/components/EvaluationFlow";

export const metadata: Metadata = {
  title: "Briefing de Projeto & Contato | Lucas Silva Santos",
  description:
    "Inicie uma conversa técnica ou briefing de projeto com Lucas Silva Santos, Engenheiro Eletricista e Gerente de Projetos em Energia, Dados & Automação.",
  alternates: { canonical: `${SITE.url}/contato/` },
  openGraph: {
    title: "Briefing de Projeto & Contato | Lucas Silva Santos",
    description:
      "Estruture sua demanda de Engenharia Elétrica, Energia Solar, Regulação, Ciência de Dados, IA ou Software em menos de 2 minutos.",
    url: `${SITE.url}/contato/`,
    siteName: SITE.nome,
    locale: "pt_BR",
    images: [
      {
        url: `${SITE.url}/contato-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Lucas Silva Santos | Briefing de Projeto & Contato",
      },
    ],
    type: "website",
  },
};

export default function ContatoPage() {
  return (
    <main id="principal" className="avaliacao-pagina">
      <Pronto />
      <svg
        viewBox="0 0 731 818"
        className="avaliacao-aro"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M542.941 42.7702C707.951 122.986 766.918 351.375 667.592 555.698C568.265 760.021 352.233 854.727 187.223 774.512C22.2122 694.296 -36.7556 465.905 62.5711 261.582C161.898 57.2593 377.93 -37.4456 542.941 42.7702Z"
          stroke="currentColor"
          strokeWidth="28"
        />
      </svg>
      <header className="avaliacao-topo">
        <a
          href="/"
          className="avaliacao-marca"
          aria-label="Voltar ao portfólio de Lucas Silva Santos"
        >
          <LogoLucas />
        </a>
        <div style={{ display: "flex", gap: "0.5em" }}>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link w-inline-block"
          >
            <div className="nav-text">LinkedIn</div>
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link w-inline-block"
          >
            <div className="nav-text">GitHub</div>
          </a>
        </div>
      </header>
      <div className="avaliacao-corpo">
        <h1 className="avaliacao-titulo">
          <span>Briefing</span>
          <br />
          de projeto
        </h1>
        <EvaluationFlow />
      </div>
    </main>
  );
}
