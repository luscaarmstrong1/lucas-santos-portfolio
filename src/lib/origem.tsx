"use client";

import { useEffect } from "react";

const STORAGE_KEY = "ls-origem";

const ORIGIN_MAP: Record<string, string> = {
  linkedin: "linkedin",
  in: "linkedin",
  github: "github",
  gh: "github",
  portfolio: "portfolio",
  google: "google",
  email: "email",
  indicacao: "indicacao",
};

const VALID_ORIGINS = new Set(Object.values(ORIGIN_MAP));

const normalize = (val = "") =>
  val
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();

function parseSearchOrigin(params: URLSearchParams): string | null {
  const direct = ORIGIN_MAP[normalize(params.get("de") ?? params.get("origem") ?? "")];
  if (direct) return direct;
  const utmSource = ORIGIN_MAP[normalize(params.get("utm_source") ?? "")];
  return utmSource ?? null;
}

function parseReferrerOrigin(): string | null {
  try {
    const host = new URL(document.referrer).hostname;
    if (host === location.hostname) return null;
    if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google";
    if (/(^|\.)linkedin\.com$/.test(host)) return "linkedin";
    if (/(^|\.)github\.com$/.test(host)) return "github";
  } catch {}
  return null;
}

export function guardarOrigem(): void {
  try {
    const val =
      parseSearchOrigin(new URLSearchParams(location.search)) ??
      (sessionStorage.getItem(STORAGE_KEY) ? null : parseReferrerOrigin());
    if (val) sessionStorage.setItem(STORAGE_KEY, val);
  } catch {}
}

export function origemDaVisita(): string | null {
  guardarOrigem();
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved && VALID_ORIGINS.has(saved)) return saved;
  } catch {}
  return (
    parseSearchOrigin(new URLSearchParams(location.search)) ?? parseReferrerOrigin()
  );
}

export function Origem() {
  useEffect(() => {
    guardarOrigem();
  }, []);
  return null;
}

export function Pronto() {
  useEffect(() => {
    document.documentElement.classList.add(
      "fonts-loaded",
      "has-seq-ready",
      "is-ready"
    );
  }, []);
  return null;
}
