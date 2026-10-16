import type { Metadata } from "next";
import ContatoPage, { metadata as contatoMetadata } from "../contato/page";

export const metadata: Metadata = {
  ...contatoMetadata,
};

export default ContatoPage;
