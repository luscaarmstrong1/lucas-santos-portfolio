import type { Metadata } from "next";
import React from "react";
import { SITE } from "@/config/site";
import { PrivacyPage } from "@/components/PrivacyPage";

export const metadata: Metadata = {
  title: "Política de Privacidade | Lucas Silva Santos",
  description:
    "Política de Privacidade e proteção de dados (LGPD) do portfólio profissional de Lucas Silva Santos.",
  alternates: { canonical: `${SITE.url}/privacidade/` },
};

export default function PrivacidadeRoute() {
  return <PrivacyPage />;
}
