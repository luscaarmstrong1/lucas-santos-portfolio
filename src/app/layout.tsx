import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/config/site";
import { Origem } from "@/lib/origem";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071827",
};

export const metadata: Metadata = {
  title: "Lucas Santos | Engenheiro Eletricista, Projetos, Dados & IA",
  description: SITE.descricao,
  applicationName: SITE.nome,
  keywords: [
    "Lucas Silva Santos",
    "Lucas Santos engenheiro eletricista",
    "Engenharia Elétrica",
    "Energia Solar Fotovoltaica",
    "Geração Distribuída",
    "Sistemas de Potência",
    "Ciência de Dados",
    "Inteligência Artificial",
    "Python",
    "Gerente de Projetos",
  ],
  icons: {
    icon: "/icon.svg",
  },
  alternates: { canonical: `${SITE.url}/` },
  openGraph: {
    title: "Lucas Santos | Engenheiro Eletricista, Projetos, Dados & IA",
    description: SITE.descricao,
    url: `${SITE.url}/`,
    siteName: SITE.nome,
    locale: "pt_BR",
    images: [
      {
        url: `${SITE.url}/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Lucas Silva Santos | Engenheiro Eletricista, Gerente de Projetos, Energia, Dados & Automação",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Santos | Engenheiro Eletricista, Projetos, Dados & IA",
    description: SITE.descricao,
    images: [`${SITE.url}/og.jpg`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.nomeCompleto,
  alternateName: SITE.nome,
  jobTitle: "Engenheiro Eletricista e Gerente de Projetos",
  url: SITE.url,
  image: [`${SITE.url}/og.jpg`],
  description: SITE.descricao,
  sameAs: [SITE.linkedin, SITE.github],
  knowsAbout: [
    "Engenharia Elétrica",
    "Energia Solar",
    "Sistemas de Potência",
    "Ciência de Dados",
    "Python",
    "Inteligência Artificial",
    "Automação",
    "Gestão de Projetos",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className="sofia_sans_condensed_8840682c-module__U6mvfq__variable kalam_e4449479-module__rPSdnW__variable"
    >
      <body className="body">
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".loader{display:none!important}html{cursor:auto!important}html *{pointer-events:auto}",
            }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#principal" className="salto">
          Ir para o conteúdo
        </a>
        <Origem />
        {children}
      </body>
    </html>
  );
}
