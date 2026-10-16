import React from "react";
import { SITE } from "@/config/site";
import { ActionButton, GitHubIcon, LinkedInIcon } from "./icons";

export function Header() {
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
          <ActionButton
            id="w-node-c4e2d712-b9aa-e56d-102b-73576293bdd9-4811c289"
            href="#projetos"
            label="Ver projetos"
            variant="white"
          />
        </div>
      </div>
    </div>
  );
}
