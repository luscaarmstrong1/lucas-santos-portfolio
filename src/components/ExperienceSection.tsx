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
                <div>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1em",
              marginBottom: "2em",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mao), Kalam, cursive",
                  fontSize: "1.6em",
                  color: "var(--color-gold-accent)",
                  display: "block",
                  marginBottom: "0.25em",
                }}
              >
                competências e ferramentas
              </span>
              <h3 className="skills-block-title" style={{ marginBottom: 0 }}>
                Stack Técnica &amp; Gestão
              </h3>
            </div>
            <span style={{ fontSize: "1.25em", color: "var(--color-text-light-muted)" }}>
              Engenharia Elétrica • Ciência de Dados • Python • Automação • Liderança de Projetos
            </span>
          </div>

          <div className="skills-categories">
            {SKILLS.map((group) => (
              <div key={group.category} className="skill-cat-card">
                <h4 className="skill-cat-title">{group.category}</h4>
                <div className="skill-tags">
                  {group.items.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
