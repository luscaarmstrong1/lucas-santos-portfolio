import React from "react";
import { EDUCATION, SITE } from "@/config/site";
import { GitHubIcon, LinkedInIcon } from "./icons";

export function About() {
  return (
    <div data-inertia="" className="insider-section" id="sobre">
      <div className="insider-container">
        <div className="grid-layout">
          <h2
            id="w-node-_3e09cbcc-bb63-d8d5-fc92-5249d862c0ff-0ac01850"
            className="insider-heading"
          >
            Resolver problemas é
            <br />
            o que move
            <br />
            <span data-highlight-text="" className="light-green-span">
              minha engenharia.
            </span>
          </h2>
          <div
            id="w-node-e1fee9ee-097a-d41e-6a8c-8fb81a411381-0ac01850"
            className="insider-wrapper"
          >
            <div
              id="w-node-_93a09ee3-b180-b755-d23e-d7d2b5f676da-0ac01850"
              className="testimonial-wrapper cards-deck"
            >
              <div
                data-inertia-item=""
                className="testimonial-inner-wrap is-first deck-card"
              >
                <div data-inertia-item-child="" className="testimonial-inner _1">
                  <img
                    className="testimonial-img"
                    src="/assets/images/automation-editorial.webp"
                    alt="Automação & Gestão de Processos, IoT e Sistemas Inteligentes"
                    loading="lazy"
                  />
                  <div className="testimonial-text-inner">
                    <div className="testimonial-text">Automação &amp; Gestão</div>
                  </div>
                </div>
              </div>
              <div
                data-inertia-item=""
                className="testimonial-inner-wrap is-second deck-card"
              >
                <div data-inertia-item-child="" className="testimonial-inner _2">
                  <img
                    className="testimonial-img"
                    src="/assets/images/energy-editorial.webp"
                    alt="Sistemas & Energia, Geração Distribuída e Subestações"
                    loading="lazy"
                  />
                  <div className="testimonial-text-inner">
                    <div className="testimonial-text">Sistemas &amp; Energia</div>
                  </div>
                </div>
              </div>
              <div
                data-inertia-item=""
                className="testimonial-inner-wrap is-third deck-card"
              >
                <div data-inertia-item-child="" className="testimonial-inner _3">
                  <img
                    className="testimonial-img"
                    src="/assets/images/data-intelligence.webp"
                    alt="Ciência de Dados, Python e Inteligência Artificial Aplicada"
                    loading="lazy"
                  />
                  <div className="testimonial-text-inner">
                    <div className="testimonial-text">Dados, Python &amp; IA</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="w-node-_1ac78251-f73b-1f50-5984-75b855ef30eb-0ac01850"
              className="insider-text-inner"
            >
              <h3 className="insider-subheading">
                Sou engenheiro eletricista, pós-graduado em Energia Solar Fotovoltaica e especializando em Ciência de Dados e Inteligência Artificial.
              </h3>
              <p className="paragraph">
                Ao longo da minha trajetória na interface entre engenharia elétrica, geração distribuída e regulação técnica, conduzi desde estudos de viabilidade e conexão até a estruturação de processos e gestão de projetos.
              </p>
              <p className="paragraph">
                Essa vivência consolidou meu propósito: unir engenharia de energia, inteligência analítica, Python e automação para criar ferramentas digitais que transformam dados em decisão, gerando eficiência, previsibilidade e impacto real.
              </p>
              <div className="insider-cta">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta-grande"
                >
                  <LinkedInIcon className="insta-grande-icone" />
                  <span>{SITE.linkedinHandle}</span>
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta-grande"
                >
                  <GitHubIcon className="insta-grande-icone" />
                  <span>{SITE.githubHandle}</span>
                </a>
              </div>
            </div>

            <div className="about-edu-grid" aria-label="Formação acadêmica">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="about-edu-card">
                  <span className="about-edu-status">{edu.status}</span>
                  <h4 className="about-edu-degree">{edu.degree}</h4>
                  <span className="about-edu-inst">{edu.institution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
