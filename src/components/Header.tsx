"use client";

import React, { useEffect, useRef, useState } from "react";
import { SITE } from "@/config/site";
import { ActionButton, GitHubIcon, LinkedInIcon, LogoLucas } from "./icons";

const MOBILE_NAV_LINKS = [
  { num: "01", href: "#sobre", label: "Sobre" },
  { num: "02", href: "#atuacao", label: "Atuação & Especialidades" },
  { num: "03", href: "#diferenca", label: "Metodologia" },
  { num: "04", href: "#projetos", label: "Sites & Landing Pages" },
  { num: "05", href: "#arquitetura", label: "Simuladores & BESS" },
  { num: "06", href: "#experiencia", label: "Experiência & Stack" },
  { num: "07", href: "#contato", label: "Contato" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("rolagem:trava", { detail: menuOpen }));
    if (menuOpen) {
      document.body.classList.add("has-mobile-menu-open");
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus({ preventScroll: true });
      }, 60);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove("has-mobile-menu-open");
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        ev.preventDefault();
        setMenuOpen(false);
        toggleBtnRef.current?.focus({ preventScroll: true });
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <div data-load-nav="" role="banner" className="navbar w-nav">
      <div className="nav-container">
        <div className="grid-layout">
          <div
            id="w-node-_084a53a4-1315-9fde-31ee-e99a4811c28c-4811c289"
            className="nav-social-media-inner"
          >
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-media-link w-inline-block"
              aria-label="LinkedIn de Lucas Silva Santos"
            >
              <div className="social-media-circle">
                <LinkedInIcon />
              </div>
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-media-link w-inline-block"
              aria-label="GitHub de Lucas Silva Santos"
            >
              <div className="social-media-circle">
                <GitHubIcon />
              </div>
            </a>
          </div>
          <nav
            id="w-node-_084a53a4-1315-9fde-31ee-e99a4811c293-4811c289"
            className="nav-link-inner"
            aria-label="Seções do portfólio"
          >
            <a href="#sobre" className="nav-link w-inline-block">
              <div className="nav-text">Sobre</div>
            </a>
            <a href="#atuacao" className="nav-link w-inline-block">
              <div className="nav-text">Atuação</div>
            </a>
            <a href="#projetos" className="nav-link w-inline-block">
              <div className="nav-text">Projetos</div>
            </a>
            <a href="#experiencia" className="nav-link w-inline-block">
              <div className="nav-text">Experiência</div>
            </a>
            <a href="#contato" className="nav-link w-inline-block">
              <div className="nav-text">Contato</div>
            </a>
          </nav>
          <div
            id="w-node-c4e2d712-b9aa-e56d-102b-73576293bdd9-4811c289"
            className="nav-actions-right"
          >
            <ActionButton
              href="#projetos"
              label="Ver projetos"
              variant="white"
            />
            <button
              ref={toggleBtnRef}
              type="button"
              className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={
                menuOpen
                  ? "Fechar menu de navegação"
                  : "Abrir menu de navegação"
              }
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="mobile-menu-toggle-bars" aria-hidden="true">
                <span className="bar bar-1" />
                <span className="bar bar-2" />
                <span className="bar bar-3" />
              </span>
              <span className="mobile-menu-toggle-label">Menu</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-nav-backdrop${menuOpen ? " is-open" : ""}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <aside
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer${menuOpen ? " is-open" : ""}`}
        aria-label="Navegação mobile"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav-drawer-top">
          <a
            href="#"
            className="mobile-nav-brand"
            aria-label="Lucas Silva Santos - Início"
            onClick={handleNavClick}
          >
            <LogoLucas className="mobile-nav-logo" />
          </a>
          <button
            type="button"
            className="mobile-nav-close"
            aria-label="Fechar menu"
            onClick={() => {
              setMenuOpen(false);
              toggleBtnRef.current?.focus({ preventScroll: true });
            }}
          >
            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="mobile-nav-list" aria-label="Links de navegação">
          {MOBILE_NAV_LINKS.map((item, idx) => (
            <a
              key={item.href}
              ref={idx === 0 ? firstLinkRef : undefined}
              href={item.href}
              className="mobile-nav-item"
              tabIndex={menuOpen ? 0 : -1}
              onClick={handleNavClick}
            >
              <span className="mobile-nav-num">{item.num}</span>
              <span className="mobile-nav-text">{item.label}</span>
              <span className="mobile-nav-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>

        <div className="mobile-nav-footer">
          <a
            href={SITE.contato}
            className="mobile-nav-cta"
            tabIndex={menuOpen ? 0 : -1}
            onClick={handleNavClick}
          >
            <span>Iniciar Briefing de Projeto</span>
            <span aria-hidden="true">↗</span>
          </a>
          <div className="mobile-nav-socials">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-social-pill"
              tabIndex={menuOpen ? 0 : -1}
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-social-pill"
              tabIndex={menuOpen ? 0 : -1}
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
