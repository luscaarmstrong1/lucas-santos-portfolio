"use client";

import React, { useEffect, useRef, useState } from "react";
import { SITE, linkContatoEmail } from "@/config/site";
import { origemDaVisita } from "@/lib/origem";
import { EnviarIcon, LinkedInIcon, MailIcon } from "./icons";

type StepType = "botao" | "texto" | "escolha" | "contato_retorno" | "consentimento" | "fim";

interface StepConfig {
  id: string;
  bot: (respostas: Record<string, string>) => string[];
  tipo: StepType;
  rotulo?: string;
  chave?: string;
  placeholder?: string;
  opcoes?: string[];
  valores?: Record<string, string>;
}

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

const firstName = (name = "") => name.trim().split(/\s+/)[0] ?? "";

const STEPS: StepConfig[] = [
  {
    id: "abertura",
    bot: () => [
      "👋 Olá! Eu sou o **Lucas**.",
      "Esta conversa rápida me ajuda a entender seu **contexto, desafio ou oportunidade** antes do nosso contato.",
      "Leva **menos de 2 minutos**.",
    ],
    tipo: "botao",
    rotulo: "Vamos começar",
  },
  {
    id: "nome",
    bot: () => ["Como posso te chamar?"],
    tipo: "texto",
    chave: "nome",
    placeholder: "Seu nome",
  },
  {
    id: "demanda",
    bot: (r) => [
      `Prazer, ${firstName(r.nome)}! Qual frente tem mais relação com o que você procura?`,
    ],
    tipo: "escolha",
    chave: "demanda",
    opcoes: [
      "Engenharia Elétrica / Energia Solar",
      "Estudos de Conexão / Consultoria Regulatória",
      "Dados, BI ou Inteligência Artificial",
      "Automação / Aplicação Web / Software",
      "Oportunidade Profissional / Parceria",
      "Outro assunto",
    ],
  },
  {
    id: "contexto",
    bot: () => ["Esse contato é para:"],
    tipo: "escolha",
    chave: "contexto",
    opcoes: [
      "Empresa",
      "Projeto específico",
      "Consultoria técnica",
      "Recrutamento / posição",
      "Parceria estratégica",
    ],
  },
  {
    id: "prazo",
    bot: () => ["Em que estágio está essa demanda?"],
    tipo: "escolha",
    chave: "prazo",
    opcoes: [
      "Preciso iniciar o quanto antes",
      "Estou estruturando o projeto",
      "Quero avaliar possibilidades",
      "Apenas primeiro contato",
    ],
  },
  {
    id: "retorno",
    bot: () => [
      "Qual o melhor canal para eu retornar o contato? Informe seu **e-mail corporativo/pessoal** ou **telefone com DDD**.",
    ],
    tipo: "contato_retorno",
    chave: "retorno",
    placeholder: "seu@email.com ou (11) 99999-9999",
  },
  {
    id: "consentimento",
    bot: () => [
      "Último passo: para eu registrar esse briefing e entrar em contato com você, confirme sua autorização conforme a LGPD.",
    ],
    tipo: "consentimento",
  },
  {
    id: "fim",
    bot: (r) => [
      `Perfeito, ${firstName(r.nome)}! Seu briefing foi estruturado.`,
      "Escolha abaixo como prefere enviar ou iniciar nossa conversa agora mesmo:",
    ],
    tipo: "fim",
  },
];

const PASSOS_KEY = "ls-passos";

export function validateContactChannel(input: string): { valid: boolean; formatted: string } {
  const trimmed = input.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  if (isEmail) {
    return { valid: true, formatted: trimmed.toLowerCase() };
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length >= 10 && digits.length <= 13) {
    return { valid: true, formatted: trimmed };
  }
  return { valid: false, formatted: trimmed };
}

interface ChatMessage {
  de: "ele" | "eu";
  texto: string;
  img?: string;
}

export function EvaluationFlow() {
  const [stepIdx, setStepIdx] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [locked, setLocked] = useState(true);
  const startedRef = useRef(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"nada" | "enviando" | "ok" | "erro">("nada");
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const replyAreaRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const startTimeRef = useRef(Date.now());
  const interactedRef = useRef(false);
  const [visitOrigin, setVisitOrigin] = useState<string | null>(null);

  const currentStep = STEPS[stepIdx];

  const trackStep = (stepId: string) => {
    if (
      !SITE.api ||
      /bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent)
    )
      return;
    try {
      const done: string[] = JSON.parse(sessionStorage.getItem(PASSOS_KEY) ?? "[]");
      if (done.includes(stepId)) return;
      if (stepId === "fim") sessionStorage.removeItem(PASSOS_KEY);
      else sessionStorage.setItem(PASSOS_KEY, JSON.stringify([...done, stepId]));
    } catch {}
  };

  useEffect(() => {
    const el = replyAreaRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      const overflow = el.getBoundingClientRect().bottom - (innerHeight - 24);
      if (overflow > 0) scrollBy({ top: overflow, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [messages, typing, locked]);

  useEffect(() => {
    if (
      interactedRef.current &&
      !locked &&
      (currentStep.tipo === "texto" || currentStep.tipo === "contato_retorno")
    ) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [stepIdx, locked, currentStep.tipo]);

  const sendBotMessages = async (items: Array<string | { img: string }>) => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLocked(true);
    for (const item of items) {
      setTyping(true);
      const delay = reduced
        ? 90
        : typeof item === "string"
        ? Math.min(1100, 380 + 10 * item.replace(/\*\*/g, "").length)
        : 650;
      await wait(delay);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        typeof item === "string"
          ? { de: "ele", texto: item }
          : { de: "ele", texto: "", img: item.img },
      ]);
      await wait(reduced ? 0 : 140);
    }
    setLocked(false);
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setVisitOrigin(origemDaVisita());
    trackStep("abertura");
    (async () => {
      await wait(250);
      await sendBotMessages([{ img: "/contato-og.jpg" }, ...STEPS[0].bot({})]);
    })();
  }, []);

  const advance = async (nextAnswers: Record<string, string>, userText: string) => {
    interactedRef.current = true;
    setMessages((prev) => [...prev, { de: "eu", texto: userText }]);
    setAnswers(nextAnswers);
    setInputVal("");
    setErrorMsg("");
    const nextIdx = stepIdx + 1;
    trackStep(STEPS[nextIdx].id);
    setStepIdx(nextIdx);
    await sendBotMessages(STEPS[nextIdx].bot(nextAnswers));
  };

  const handleConsent = async () => {
    interactedRef.current = true;
    setSubmitStatus("ok");
    await advance(
      {
        ...answers,
        origem: visitOrigin ?? "portfolio",
        duracao_ms: String(Date.now() - startTimeRef.current),
      },
      "Autorizo e concluir briefing"
    );
  };

  const summarySubject = `Briefing de Projeto — ${answers.nome ?? "Contato"} (${
    answers.demanda ?? "Engenharia & Tecnologia"
  })`;
  const summaryText = [
    `Olá, Lucas! Meu nome é ${answers.nome ?? ""}.`,
    `• Frente de interesse: ${answers.demanda ?? ""}`,
    `• Contexto: ${answers.contexto ?? ""}`,
    `• Estágio / Prazo: ${answers.prazo ?? ""}`,
    `• Canal de retorno: ${answers.retorno ?? ""}`,
  ].join("\n");

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const maxSteps = STEPS.length - 1;
  const currentProgress = Math.max(0, stepIdx);

  return (
    <div
      className="conversa"
      role="region"
      aria-label="Briefing de projeto com Lucas Silva Santos"
    >
      <div className="conversa__topo">
        <img
          className="conversa__avatar"
          src="/assets/images/lucas-about.webp"
          alt="Lucas Silva Santos"
          width={46}
          height={46}
        />
        <p className="conversa__quem">
          {SITE.nomeCompleto}
          <small>{typing ? "digitando..." : "briefing técnico & contato"}</small>
        </p>
      </div>

      <div
        className="conversa__barra"
        role="progressbar"
        aria-label="Progresso do briefing"
        aria-valuemin={0}
        aria-valuemax={maxSteps}
        aria-valuenow={currentProgress}
      >
        <i style={{ width: `${(currentProgress / maxSteps) * 100}%` }} />
      </div>

      <div className="conversa__lista" aria-live="polite">
        {messages.map((msg, idx) =>
          msg.img ? (
            <p key={idx} className="balao balao--img">
              <img
                src={msg.img}
                alt="Lucas Silva Santos — Engenheiro Eletricista | Gerente de Projetos | Energia, Dados & Automação"
                width={1200}
                height={630}
              />
            </p>
          ) : (
            <p
              key={idx}
              className={`balao${msg.de === "eu" ? " balao--eu" : ""}`}
            >
              {msg.texto.split(/\*\*(.+?)\*\*/g).map((part, pIdx) =>
                pIdx % 2 ? <strong key={pIdx}>{part}</strong> : part
              )}
            </p>
          )
        )}
        {typing && (
          <p
            className="balao balao--digitando"
            aria-label="Lucas está digitando"
          >
            <i />
            <i />
            <i />
          </p>
        )}
      </div>

      <div className="conversa__resposta" ref={replyAreaRef}>
        {!locked && currentStep.tipo === "botao" && (
          <button
            type="button"
            className="opcao"
            onClick={() => advance(answers, currentStep.rotulo ?? "Vamos começar")}
          >
            {currentStep.rotulo}
          </button>
        )}

        {!locked &&
          currentStep.tipo === "escolha" &&
          currentStep.opcoes?.map((opt) => (
            <button
              key={opt}
              type="button"
              className="opcao"
              onClick={() =>
                currentStep.chave &&
                advance(
                  {
                    ...answers,
                    [currentStep.chave]: currentStep.valores?.[opt] ?? opt,
                  },
                  opt
                )
              }
            >
              {opt}
            </button>
          ))}

        {!locked &&
          (currentStep.tipo === "texto" || currentStep.tipo === "contato_retorno") && (
            <form
              className="conversa__campo"
              noValidate
              onSubmit={(ev) => {
                ev.preventDefault();
                if (!currentStep.chave) return;
                if (currentStep.tipo === "contato_retorno") {
                  const res = validateContactChannel(inputVal);
                  if (!res.valid) {
                    setErrorMsg("Informe um e-mail válido ou telefone com DDD.");
                    return;
                  }
                  advance({ ...answers, retorno: res.formatted }, res.formatted);
                  return;
                }
                const cleaned = inputVal.trim().replace(/\s+/g, " ");
                if (cleaned.length < 2 || cleaned.length > 60) {
                  setErrorMsg("Por favor, informe seu nome (mínimo 2 caracteres).");
                  return;
                }
                advance({ ...answers, [currentStep.chave]: cleaned }, cleaned);
              }}
            >
              <label className="sr" htmlFor="conversa-campo">
                {currentStep.placeholder}
              </label>
              <input
                ref={inputRef}
                id="conversa-campo"
                type="text"
                placeholder={currentStep.placeholder}
                maxLength={80}
                value={inputVal}
                onChange={(ev) => setInputVal(ev.target.value)}
              />
              <button
                type="submit"
                aria-label="Enviar resposta"
                disabled={!inputVal.trim()}
              >
                <EnviarIcon />
              </button>
              {errorMsg && <p className="conversa__erro">{errorMsg}</p>}
            </form>
          )}

        {!locked && currentStep.tipo === "consentimento" && (
          <div className="conversa__ok">
            <p>
              Autorizo o uso das informações preenchidas neste briefing exclusivamente para retorno de contato profissional por Lucas Silva Santos, conforme a{" "}
              <a href="/privacidade/">Política de privacidade</a>.
            </p>
            <label className="conversa__isca" aria-hidden="true">
              Não preencha
              <input
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(ev) => setHoneypot(ev.target.value)}
              />
            </label>
            <button
              type="button"
              className="opcao"
              disabled={submitStatus === "enviando"}
              onClick={handleConsent}
            >
              {submitStatus === "enviando" ? "Processando..." : "Autorizo e concluir"}
            </button>
          </div>
        )}

        {!locked && currentStep.tipo === "fim" && (
          <div className="conversa__ok">
            <pre
              style={{
                background: "var(--white)",
                color: "var(--color-navy-deep)",
                padding: "0.85em 1em",
                borderRadius: "0.5em",
                border: "1px solid var(--color-border-light)",
                width: "100%",
                whiteSpace: "pre-wrap",
                fontSize: "1.05em",
                margin: 0,
              }}
            >
              {summaryText}
            </pre>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5em", justifyContent: "flex-end" }}>
              <a
                className="conversa__zap"
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
                Conectar no LinkedIn
              </a>
              <a
                className="conversa__zap"
                style={{ background: "var(--color-navy-tech)" }}
                href={linkContatoEmail(summarySubject, summaryText)}
              >
                <MailIcon />
                Enviar por E-mail
              </a>
              <button
                type="button"
                className="opcao"
                style={{ background: "var(--color-gold-accent)", color: "var(--color-navy-deep)", fontWeight: 600 }}
                onClick={handleCopySummary}
              >
                {copied ? "Resumo copiado!" : "Copiar resumo"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
