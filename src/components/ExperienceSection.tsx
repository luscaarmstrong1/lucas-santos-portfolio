import React from "react";
import { EXPERIENCE, SKILLS } from "@/config/site";

export function ExperienceSection() {
  return (
    <section className="experience-section" id="experiencia">
      <div className="container">
        <div className="experience-header">
          <span className="experience-eyebrow">trajetória real e multidisciplinar</span>
          <h2 className="experience-heading">
            Experiência construída
            <br />
            <span data-highlight-text="">na prática.</span>
          </h2>
        </div>

        <div className="experience-grid">
          {EXPERIENCE.map((item) => (
            <article key={item.company} className="exp-card">
              <div className="exp-card-top">
                <div className="exp-info">
                  <h3 className="exp-company">{item.company}</h3>
                  <div className="exp-role">{item.currentRole}</div>
                  {item.previousRole && (
                    <div className="exp-subrole">{item.previousRole}</div>
                  )}
                </div>
                <span className="exp-period">{item.period}</span>
              </div>
              <ul className="exp-highlights">
                {item.highlights.map((hl) => (
                  <li key={hl}>{hl}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="skills-block">
          <div className="skills-block-header">
            <div>
              <span className="skills-eyebrow">
                competências e ferramentas
              </span>
              <h3 className="skills-block-title">
                Stack Técnica &amp; Gestão
              </h3>
            </div>
            <div className="skills-summary-pills" aria-label="Áreas de especialidade">
              <span className="summary-pill">Engenharia Elétrica</span>
              <span className="summary-pill">Ciência de Dados</span>
              <span className="summary-pill">Python</span>
              <span className="summary-pill">Automação</span>
              <span className="summary-pill">Liderança de Projetos</span>
            </div>
          </div>

          <div className="skills-categories">
            {SKILLS.map((group) => (
              <div key={group.category} className="skill-cat-card">
                <div className="skill-cat-top">
                  <span className="skill-cat-code">{group.code}</span>
                  <span className="skill-cat-count">{group.items.length} competências</span>
                </div>
                <h4 className="skill-cat-title">{group.category}</h4>
                <div className="skill-cat-line" />
                <ul className="skill-tags">
                  {group.items.map((skill) => (
                    <li key={skill} className="skill-tag">
                      <span className="skill-tag-dot" />
                      <span className="skill-tag-label">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
