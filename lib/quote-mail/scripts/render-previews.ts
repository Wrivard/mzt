import { mkdir, writeFile } from "node:fs/promises";
import { customerTemplate, ownerTemplate } from "../src/templates";

const example = {
  firstName: "Camille",
  lastName: "Exemple",
  email: "camille@example.com",
  phone: "(418) 555-0100",
  city: "Sainte-Claire",
  projectType: "Rénovation résidentielle",
  timeline: "prochains-mois",
  description: "Exemple de demande : rénovation de notre cuisine et réaménagement de l’aire ouverte.\nNous aimerions discuter des possibilités et des prochaines étapes avec votre équipe.",
};
const output = new URL("../../../generated-artifacts/email-previews/", import.meta.url);
await mkdir(output, { recursive: true });
await Promise.all([
  writeFile(new URL("confirmation-client.html", output), customerTemplate(example, "MZT-EXEMPLE", true).html),
  writeFile(new URL("demande-proprietaire.html", output), ownerTemplate(example, "MZT-EXEMPLE", true).html),
]);
console.info("Aperçus générés avec des renseignements fictifs, sans envoi de courriel.");
