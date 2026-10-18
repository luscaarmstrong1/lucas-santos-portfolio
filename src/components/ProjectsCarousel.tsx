import React from "react";
import { FEATURED_PROJECTS } from "@/config/site";

function GlobeLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19" />
      <path d="M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19" />
    </svg>
  );
}

export function ProjectsCarousel() {
  return (
    <div id="projetos" className="testimonial-section">
      <div data-testimonial-parallax="" className="bg-img-wrapper">
        <img
          className="bg-img projects-bg-main"
          src="/assets/images/projects-bg-webdev.webp"
          alt="Ambiente de desenvolvimento web, código, sites e soluções digitais"
          data-testimonial-parallax-item=""
        />
        <div className="projects-bg-gradient" aria-hidden="true" />
      </div>
      <div className="testimonial-container">
        <div className="grid-layout">
          <div
            id="w-node-_188a35c2-2913-dd29-6c54-5bf8cbbe64f3-0ac01850"
            className="big-title-wrapper"
          >
            <div className="testimonial-signature">
              <svg
                viewBox="0 0 360 32"
                width={360}
                height={32}
                className="testimonial-signature-img"
                aria-hidden="true"
                overflow="visible"
              >
                <g
                  transform="rotate(0 180 16)"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-mao)" }}
                  fontSize={26.5}
                >
                  <text x={0} y={22}>
                    sites &amp; landing pages em produção
                  </text>
                </g>
              </svg>
              <svg
                viewBox="0 0 360 32"
                width={360}
                height={32}
                className="testimonial-signature-img is-wiggle"
                aria-hidden="true"
                overflow="visible"
              >
                <g
                  transform="rotate(0 180 16)"
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-mao)" }}
                  fontSize={26.5}
                >
                  <text x={0} y={22}>
                    sites &amp; landing pages em produção
                  </text>
                </g>
              </svg>
            </div>
            <h2 className="testimonial-big-heading">
              Sites, plataformas
              <br />
              &amp; landing pages.
            </h2>
          </div>
          <div
            id="w-node-d56024cf-9b70-fc24-7ba0-e2b3ea8d1769-0ac01850"
            className="testimonial-slider"
          >
            <div
              data-testimonial-inview=""
              className="testimonial-slider-wrapper"
            >
              <div
                data-slider-interface=""
                className="testimonial-slider-interface"
              >
                <div
                  data-slider-arrows=""
                  className="testimonial-slider-button-wrapper"
                >
                  <button
                    type="button"
                    data-slider-left-button=""
                    className="testimonial-slider-button is-left"
                    aria-label="Site anterior"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="testimonial-slider-button-arrow"
                      aria-hidden="true"
                      fill="none"
                      style={{ transform: "scaleX(-1)" }}
                    >
                      <path
                        d="M4 10h12M11 5l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    data-slider-right-button=""
                    className="testimonial-slider-button is-right"
                    aria-label="Próximo site"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="testimonial-slider-button-arrow"
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
                  </button>
                </div>
              </div>
              <div
                data-slider=""
                className="testimonial-slider-inner"
                data-lenis-prevent-wheel=""
              >
                {FEATURED_PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className="testimonial-slider-item-wrap"
                  >
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-slider-item-inner=""
                      className="testimonial-slider-item"
                    >
                      <div>
                        <div className="project-card-badges">
                          <span className="project-badge-cat">
                            {project.category}
                          </span>
                          <span className="project-badge-type">
                            {project.projectType}
                          </span>
                        </div>
                        <img
                          src={project.image}
                          alt={`Tela inicial de ${project.title}`}
                          className="project-card-thumb"
                          loading="lazy"
                        />
                        <div
                          className="testimonial-item-inner-text"
                          style={{ paddingBottom: "1.25em" }}
                        >
                          <h3
                            className="testimonial-item-heading"
                            style={{ fontSize: "2.1em" }}
                          >
                            {project.title}
                          </h3>
                          <p
                            className="testimonial-item-text"
                            style={{ fontSize: "1.35em" }}
                          >
                            {project.description}
                          </p>
                          <div className="project-stack-tags">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="project-stack-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="testimonial-line" />
                        <div className="testimonial-item-bottom">
                          <div
                            className="testimonial-client-name"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4em",
                            }}
                          >
                            <GlobeLinkIcon className="testimonial-star testimonial-insta" />
                            <span>{project.siteDomain}</span>
                          </div>
                          <div className="testimonial-verified-wrap">
                            <div
                              className="testimonial-verified-text"
                              style={{ fontWeight: 600 }}
                            >
                              Acessar site →
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
