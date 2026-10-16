import React from "react";
import { SITE } from "@/config/site";
import { ActionButton } from "./icons";

export function FinalCTA() {
  return (
    <div
      id="w-node-f35c7284-aa91-03b1-62fc-d15dd1353c80-0ac01850"
      className="footer-product"
    >
      <div className="absolute-background">
        <img
          src="/assets/images/lucas-footer.webp"
          alt="Lucas Silva Santos"
          className="footer-img top"
        />
        <div className="footer-img footer-img-fundo" />
      </div>
      <div className="footer-product-text-inner">
        <h3 className="footer-product-heading" style={{ fontSize: "5.25em" }}>
          Vamos construir a
          <br />
          próxima solução?
        </h3>
        <ActionButton label="Entrar em contato" variant="light" asDiv />
      </div>
      <a
        aria-label="Entrar em contato — Iniciar briefing de projeto"
        href={SITE.contato}
        className="footer-product-link w-inline-block"
      />
    </div>
  );
}
