import React from "react";
import { SITE, linkContatoEmail } from "@/config/site";
import { Creditos, GitHubIcon, LinkedInIcon, LogoLucas, MailIcon } from "./icons";
import { FinalCTA } from "./FinalCTA";

export function Footer() {
  return (
    <footer className="footer">
      <div
        id="w-node-_01191fa0-2abf-23ff-44da-acbdf6476df4-0ac01850"
        className="footer-full-height-container"
      >
        <FinalCTA />
        <div
          id="w-node-_52f3956c-463e-cf84-00da-ec073fe306cc-0ac01850"
          className="footer-content"
        >
          <div
            id="w-node-_103e8af5-3d0c-0c66-5f7b-cd9c707fa04f-0ac01850"
            className="footer-fact-wrapper"
          >
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-info is-first w-inline-block"
            >
              <LinkedInIcon className="footer-info-img is-first" />
              <div className="footer-info-text">
                conectar no
                <br />
                LinkedIn
              </div>
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-info is-second w-inline-block"
            >
              <GitHubIcon className="footer-info-img is-second" />
              <div className="footer-info-text">
                explorar
                <br />
                GitHub
              </div>
            </a>
          </div>

          <div
            id="w-node-d7a8f3ad-3299-e0db-d6e1-45b4c5d40c53-0ac01850"
            className="footer-content-wrapper"
          >
            <h4 className="footer-heading">
              <span data-highlight-text="" className="heading-line">
                {SITE.nome}
              </span>
              <br />
              Engenheiro Eletricista
            </h4>
            <div className="footer-shipping-wrapper">
              <span className="shipping-link w-inline-block">
                <div className="shipping-link-wrap">
                  <div className="shipping-link-text">
                    Energia • Dados • Automação
                  </div>
                </div>
              </span>
              <a href="#projetos" className="shipping-link w-inline-block">
                <div className="shipping-link-wrap">
                  <div className="shipping-link-text">Projetos em destaque</div>
                </div>
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="shipping-link w-inline-block"
              >
                <div className="shipping-link-wrap">
                  <div className="shipping-link-text">LinkedIn</div>
                </div>
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="shipping-link w-inline-block"
              >
                <div className="shipping-link-wrap">
                  <div className="shipping-link-text">GitHub</div>
                </div>
              </a>
              <a href={SITE.contato} className="shipping-link w-inline-block">
                <div className="shipping-link-wrap">
                  <div className="shipping-link-text">Briefing &amp; Contato</div>
                </div>
              </a>
              <a href="/privacidade/" className="shipping-link w-inline-block">
                <div className="shipping-link-wrap">
                  <div className="shipping-link-text">
                    Política de privacidade
                  </div>
                </div>
              </a>
            </div>
            <div className="footer-social-media-wrap">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-link w-inline-block"
                aria-label="LinkedIn"
              >
                <div className="social-media-circle is-white">
                  <LinkedInIcon />
                </div>
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-link w-inline-block"
                aria-label="GitHub"
              >
                <div className="social-media-circle is-white">
                  <GitHubIcon />
                </div>
              </a>
              <a
                href={linkContatoEmail()}
                className="social-media-link w-inline-block"
                aria-label="E-mail"
              >
                <div className="social-media-circle is-white">
                  <MailIcon />
                </div>
              </a>
            </div>
          </div>
        </div>

        <LogoLucas
          id="w-node-_9cf1d991-93c8-9876-0a84-cf07ed027319-0ac01850"
          className="footer-logo mobile"
        />

        <div
          id="w-node-_440e9322-e28d-ad9e-9ab8-9d51f2096f5d-0ac01850"
          className="footer-bottom"
        >
          <div className="footer-bottom-text">
            © 2026 {SITE.nomeCompleto}. Todos os direitos reservados.
          </div>
          <Creditos />
        </div>
      </div>

      <LogoLucas className="footer-logo desktop" />
    </footer>
  );
}
