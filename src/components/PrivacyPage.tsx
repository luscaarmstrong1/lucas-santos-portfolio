import React from "react";
import { SITE, linkContatoEmail } from "@/config/site";
import { Pronto } from "@/lib/origem";

export function PrivacyPage() {
  return (
    <main id="principal" className="privacidade">
      <Pronto />
      <p>
        <a href="/">← Voltar ao portfólio</a>
      </p>
      <h1>Política de privacidade</h1>
      <p>
        Esta Política de Privacidade descreve como as informações fornecidas voluntariamente no fluxo de <strong>Briefing de Projeto e Contato</strong> deste portfólio são tratadas. O responsável pelo tratamento dos dados é <strong>{SITE.nomeCompleto}</strong> ({SITE.cargo}).
      </p>
      <h2>1. Dados coletados</h2>
      <ul>
        <li>Seu nome de identificação e canal de retorno informado (e-mail ou telefone).</li>
        <li>
          As respostas fornecidas no briefing interativo: frente de interesse técnico (Engenharia Elétrica, Energia Solar, Regulação, Ciência de Dados/IA, Automação/Software ou Parceria), contexto da demanda e estágio/prazo estimado.
        </li>
        <li>Data, horário da manifestação de consentimento e origem de navegação (como LinkedIn, GitHub ou acesso direto).</li>
      </ul>
      <p>
        O formulário de briefing não coleta dados pessoais sensíveis, informações financeiras ou credenciais confidenciais.
      </p>
      <h2>2. Finalidade do uso</h2>
      <p>
        As informações são utilizadas exclusivamente para compreender o escopo inicial da sua demanda, retornar o contato profissional solicitado e preparar reuniões técnicas, propostas de consultoria ou diálogos sobre oportunidades e parcerias. Seus dados nunca são vendidos, cedidos a terceiros ou utilizados para envio de spam.
      </p>
      <h2>3. Armazenamento e segurança</h2>
      <p>
        Os dados preenchidos no briefing permanecem na sua sessão para geração do resumo de contato (via e-mail ou LinkedIn) e, quando submetidos, são protegidos com medidas técnicas de segurança e acesso restrito ao titular do portfólio.
      </p>
      <h2>4. Prazo de retenção</h2>
      <p>
        Os registros de contato são mantidos pelo período necessário ao atendimento da solicitação ou por até 12 meses após o último contato, salvo solicitação anterior de exclusão pelo titular.
      </p>
      <h2>5. Direitos do titular (LGPD)</h2>
      <p>
        Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar a qualquer momento a confirmação de tratamento, acesso, correção, anonimização ou exclusão integral dos seus dados, bem como revogar o consentimento, entrando em contato diretamente pelo{" "}
        <a href={linkContatoEmail("Solicitação LGPD — Portfólio Lucas Silva Santos")}>
          e-mail de contato ({SITE.email})
        </a>{" "}
        ou pelo{" "}
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ({SITE.linkedinHandle})
        </a>
        .
      </p>
    </main>
  );
}
