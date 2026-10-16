import React from "react";
import { SITE, linkContatoEmail } from "@/config/site";
import { BriefcaseIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./icons";

export function Contact() {
  return (
    <div data-inertia="" className="payment-section" id="contato">
      <div className="payment-container">
        <div className="grid-layout">
          <div
            id="w-node-_041f45d4-47b7-9fbf-98ee-78b1c2254fcb-0ac01850"
            className="payment-wrapper"
          >
            <div
              id="w-node-_358aeb55-90b6-f7e1-a5ad-3d95f312e343-0ac01850"
              className="payment-signature-days is-desktop"
            >
              <svg
                viewBox="0 0 300 150"
                width={300}
                height={150}
                className="payment-signature-days-img"
                aria-hidden="true"
                overflow="visible"
              >
                <g
                  transform="rotate(-6 150 75)"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-mao)" }}
                  fontSize={36}
                >
                  <text x={0} y={65}>
                    projetos, dados
                  </text>
                  <text x={18} y={105}>
                    &amp; consultoria
                  </text>
                </g>
              </svg>
              <svg
                viewBox="0 0 300 150"
                width={300}
                height={150}
                className="payment-signature-days-img is-wiggle"
                aria-hidden="true"
                overflow="visible"
              >
                <g
                  transform="rotate(-6 150 75)"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-mao)" }}
                  fontSize={36}
                >
                  <text x={0} y={65}>
                    projetos, dados
                  </text>
                  <text x={18} y={105}>
                    &amp; consultoria
                  </text>
                </g>
              </svg>
            </div>
            <h2
              id="w-node-_5aa7990f-3909-960f-ff04-09bf6fbaf58f-0ac01850"
              className="insider-heading"
            >
              Boas soluções começam
              <br />
              <span className="light-green-span">com boas conversas.</span>
            </h2>
            <div
              id="w-node-_3b9ad9e4-4de9-0d6f-0561-c6944df56da5-0ac01850"
              className="payment-methods-inner"
            >
              <div data-payment="" className="pament-methods">
                <div data-inertia-item="" className="payment-method-item-outer">
                  <a
                    href={SITE.linkedin}
                    className="circulo-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      data-payment-item=""
                      data-inertia-item-child=""
                      className="payment-method-item _1"
                    >
                      <div className="circulo-miolo">
                        <LinkedInIcon className="circulo-icone" />
                        <span className="circulo-rotulo">LinkedIn</span>
                        <span className="circulo-sub">
                          {SITE.linkedinHandle}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                <div data-inertia-item="" className="payment-method-item-outer">
                  <a
                    href={SITE.github}
                    className="circulo-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      data-payment-item=""
                      data-inertia-item-child=""
                      className="payment-method-item _2"
                    >
                      <div className="circulo-miolo">
                        <GitHubIcon className="circulo-icone" />
                        <span className="circulo-rotulo">GitHub</span>
                        <span className="circulo-sub">{SITE.githubHandle}</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div data-inertia-item="" className="payment-method-item-outer">
                  <a href={SITE.contato} className="circulo-link">
                    <div
                      data-payment-item=""
                      data-inertia-item-child=""
                      className="payment-method-item _3"
                    >
                      <div className="circulo-miolo">
                        <svg
                          viewBox="0 0 20 20"
                          className="circulo-icone circulo-seta"
                          aria-hidden="true"
                          fill="none"
                        >
                          <path
                            d="M4 10h12M11 5l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="circulo-rotulo">Briefing</span>
                        <span className="circulo-sub">Iniciar conversa</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div data-inertia-item="" className="payment-method-item-outer">
                  <a
                    href={linkContatoEmail()}
                    className="circulo-link"
                  >
                    <div
                      data-payment-item=""
                      data-inertia-item-child=""
                      className="payment-method-item _4"
                    >
                      <div className="circulo-miolo">
                        <MailIcon className="circulo-icone" />
                        <span className="circulo-rotulo">E-mail</span>
                        <span className="circulo-sub">Contato direto</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div data-inertia-item="" className="payment-method-item-outer">
                  <a href={SITE.contato} className="circulo-link">
                    <div
                      data-payment-item=""
                      data-inertia-item-child=""
                      className="payment-method-item _5"
                    >
                      <div className="circulo-miolo">
                        <BriefcaseIcon className="circulo-icone" />
                        <span className="circulo-rotulo">Consultoria</span>
                        <span className="circulo-sub">Energia &amp; Regulação</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div data-inertia-item="" className="payment-method-item-outer">
                  <a href="#projetos" className="circulo-link">
                    <div
                      data-payment-item=""
                      data-inertia-item-child=""
                      className="payment-method-item _6"
                    >
                      <div className="circulo-miolo">
                        <span className="circulo-rotulo">Dados &amp; IA</span>
                        <span className="circulo-sub">Python &amp; Software</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div data-inertia-item="" className="payment-method-item-outer">
                  <a href={SITE.contato} className="circulo-link">
                    <div
                      data-payment-item=""
                      data-inertia-item-child=""
                      className="payment-method-item _7"
                    >
                      <div className="circulo-miolo">
                        <PinIcon />
                        <span className="circulo-rotulo">Brasil</span>
                        <span className="circulo-sub">Remoto &amp; Projetos</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="payment-signature-days is-mobile">
                  <svg
                    viewBox="0 0 300 150"
                    width={300}
                    height={150}
                    className="payment-signature-days-img"
                    aria-hidden="true"
                    overflow="visible"
                  >
                    <g
                      transform="rotate(-6 150 75)"
                      fill="currentColor"
                      style={{ fontFamily: "var(--font-mao)" }}
                      fontSize={36}
                    >
                      <text x={0} y={65}>
                        projetos, dados
                      </text>
                      <text x={18} y={105}>
                        &amp; consultoria
                      </text>
                    </g>
                  </svg>
                  <svg
                    viewBox="0 0 300 150"
                    width={300}
                    height={150}
                    className="payment-signature-days-img is-wiggle"
                    aria-hidden="true"
                    overflow="visible"
                  >
                    <g
                      transform="rotate(-6 150 75)"
                      fill="currentColor"
                      style={{ fontFamily: "var(--font-mao)" }}
                      fontSize={36}
                    >
                      <text x={0} y={65}>
                        projetos, dados
                      </text>
                      <text x={18} y={105}>
                        &amp; consultoria
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="payment-signature-mobile">
                  <svg
                    viewBox="0 0 300 150"
                    width={300}
                    height={150}
                    className="payment-signature-img is-mobile"
                    aria-hidden="true"
                    overflow="visible"
                  >
                    <g
                      transform="rotate(-6 150 75)"
                      fill="currentColor"
                      style={{ fontFamily: "var(--font-mao)" }}
                      fontSize={38}
                    >
                      <text x={0} y={65}>
                        engenharia, IA
                      </text>
                      <text x={20} y={106}>
                        e soluções reais
                      </text>
                    </g>
                  </svg>
                  <svg
                    viewBox="0 0 300 150"
                    width={300}
                    height={150}
                    className="payment-signature-img is-mobile is-wiggle"
                    aria-hidden="true"
                    overflow="visible"
                  >
                    <g
                      transform="rotate(-6 150 75)"
                      fill="currentColor"
                      style={{ fontFamily: "var(--font-mao)" }}
                      fontSize={38}
                    >
                      <text x={0} y={65}>
                        engenharia, IA
                      </text>
                      <text x={20} y={106}>
                        e soluções reais
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div
              id="w-node-a4554c61-f2f6-fed6-6652-44ed900999ad-0ac01850"
              className="payment-signature"
            >
              <svg
                viewBox="0 0 300 96"
                width={300}
                height={96}
                className="payment-signature-img"
                aria-hidden="true"
                overflow="visible"
              >
                <g
                  transform="rotate(-6 150 48)"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-mao)" }}
                  fontSize={38}
                >
                  <text x={0} y={38}>
                    engenharia, IA
                  </text>
                  <text x={20} y={80}>
                    e soluções reais
                  </text>
                </g>
              </svg>
              <svg
                viewBox="0 0 300 96"
                width={300}
                height={96}
                className="payment-signature-img is-wiggle"
                aria-hidden="true"
                overflow="visible"
              >
                <g
                  transform="rotate(-6 150 48)"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-mao)" }}
                  fontSize={38}
                >
                  <text x={0} y={38}>
                    engenharia, IA
                  </text>
                  <text x={20} y={80}>
                    e soluções reais
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bridge" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 362"
          data-fill-line=""
          className="footer-line"
        >
          <path
            stroke="currentColor"
            strokeWidth="40"
            d="M-18.71 5c-13.946 63.747 87.162 120.514 206.635 115.163 94.068-4.213 234.063-38.055 299.378-54.44C939.856-47.813 622.333 217.95 673.484 297.908c37.655 58.861 225.928-110.975 381.896-110.975 56.25 0 206.21 27.386 293.1 98.412 72.29 59.093 134.66 63.049 158.52 51.416"
          />
        </svg>
      </div>
    </div>
  );
}
