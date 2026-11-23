export type QuoteDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  projectType: string;
  timeline: string;
  description: string;
};

const timelines: Record<string, string> = {
  "des-que-possible": "Dès que possible",
  "prochaines-semaines": "Dans les prochaines semaines",
  "prochains-mois": "Dans les prochains mois",
  "a-determiner": "À déterminer",
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

function layout(preheader: string, eyebrow: string, title: string, content: string) {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(title)} — MZT Construction</title></head>
<body style="margin:0;padding:0;background:#f3f4ef;color:#1b1b1b;font-family:Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4ef"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#fff;border:1px solid #e2e5db">
<tr><td style="background:#1b1b1b;padding:30px 28px;border-bottom:5px solid #80a800">
<p style="margin:0;font-size:34px;font-weight:900;letter-spacing:2px;color:#95b63d">M.Z.T.</p>
<p style="margin:5px 0 0;font-size:12px;font-weight:bold;letter-spacing:3px;color:#fff">CONSTRUCTION</p>
</td></tr>
<tr><td style="padding:32px 28px">
<p style="margin:0 0 12px;color:#608000;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">${escapeHtml(eyebrow)}</p>
<h1 style="margin:0 0 20px;font-size:28px;line-height:1.2;color:#1b1b1b">${escapeHtml(title)}</h1>
${content}
</td></tr>
<tr><td style="background:#1b1b1b;padding:26px 28px;color:#c7c9c2;font-size:12px;line-height:1.8">
<p style="margin:0 0 6px;color:#fff;font-weight:bold">MZT Construction inc.</p>
<p style="margin:0">Construction &amp; rénovation · Chaudière-Appalaches</p>
<p style="margin:4px 0 0"><a href="tel:+14188836242" style="color:#fff;text-decoration:none">(418) 883-6242</a> &nbsp;|&nbsp; RBQ 5753-3283-01</p>
<p style="margin:12px 0 0;font-size:11px">Ce courriel concerne uniquement votre demande de soumission.</p>
</td></tr>
</table></td></tr></table></body></html>`;
}

function recap(details: QuoteDetails, reference: string, hasAttachment: boolean) {
  const fields = [
    ["Référence", reference],
    ["Nom", `${details.firstName} ${details.lastName}`],
    ["Courriel", details.email],
    ["Téléphone", details.phone],
    ["Municipalité", details.city],
    ["Type de projet", details.projectType],
    ["Échéancier souhaité", timelines[details.timeline] ?? details.timeline],
    ["Pièces jointes", hasAttachment ? "Photos et/ou PDF — archive ZIP transmise à MZT" : "Aucune"],
  ];
  return `<h2 style="margin:28px 0 14px;font-size:18px">Récapitulatif de la demande</h2>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px;line-height:1.6;table-layout:fixed">
${fields.map(([label, value]) => `<tr><td style="width:37%;padding:10px 8px 10px 0;border-bottom:1px solid #e5e7e0;color:#65695f;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #e5e7e0;vertical-align:top;word-wrap:break-word;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`).join("")}
</table>
<h2 style="margin:24px 0 10px;font-size:16px">Description du projet</h2>
<div style="padding:18px;background:#f4f6ef;border-left:3px solid #80a800;font-size:14px;line-height:1.75;word-wrap:break-word;overflow-wrap:anywhere">${escapeHtml(details.description).replace(/\r?\n/g, "<br>")}</div>`;
}

function recapText(details: QuoteDetails, reference: string, hasAttachment: boolean) {
  return `Référence : ${reference}
Nom : ${details.firstName} ${details.lastName}
Courriel : ${details.email}
Téléphone : ${details.phone}
Municipalité : ${details.city}
Type de projet : ${details.projectType}
Échéancier souhaité : ${timelines[details.timeline] ?? details.timeline}
Pièces jointes : ${hasAttachment ? "Archive ZIP transmise à MZT" : "Aucune"}

Description du projet :
${details.description}

MZT Construction inc. · RBQ 5753-3283-01
(418) 883-6242`;
}

export function ownerTemplate(details: QuoteDetails, reference: string, hasAttachment: boolean) {
  const intro = "Une nouvelle demande vous a été transmise depuis le site. Répondez à ce courriel pour joindre directement le client.";
  return {
    subject: `Nouvelle demande de soumission — ${details.projectType}`,
    html: layout("Un nouveau projet à étudier.", "Nouvelle soumission", "Un nouveau projet vous attend.", `
<p style="margin:0;font-size:15px;line-height:1.75">${intro}</p>
${recap(details, reference, hasAttachment)}
${hasAttachment ? '<p style="font-size:13px;line-height:1.7;color:#65695f">Les photos et documents se trouvent dans l’archive ZIP jointe à ce courriel. Ouvrez uniquement les fichiers attendus.</p>' : ""}
<table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:28px"><tr><td bgcolor="#80a800" style="border-radius:4px"><a href="mailto:${encodeURIComponent(details.email)}" style="display:inline-block;padding:15px 22px;color:#172000;font-size:14px;font-weight:bold;text-decoration:none">Répondre au client</a></td></tr></table>`),
    text: `${intro}\n\n${recapText(details, reference, hasAttachment)}`,
  };
}

export function customerTemplate(details: QuoteDetails, reference: string, hasAttachment: boolean) {
  const intro = `Bonjour ${details.firstName},\n\nMerci de faire confiance à MZT Construction. Nous avons bien reçu votre demande. Notre équipe en prendra connaissance et communiquera avec vous pour discuter de votre projet et des prochaines étapes.`;
  return {
    subject: "Nous avons reçu votre demande — MZT Construction",
    html: layout("Votre demande de soumission a bien été reçue.", "Demande reçue", "Merci de nous parler de votre projet.", `
<p style="margin:0 0 14px;font-size:15px">Bonjour ${escapeHtml(details.firstName)},</p>
<p style="margin:0;font-size:15px;line-height:1.75">Merci de faire confiance à MZT Construction. Nous avons bien reçu votre demande. Notre équipe en prendra connaissance et communiquera avec vous pour discuter de votre projet et des prochaines étapes.</p>
${recap(details, reference, hasAttachment)}
<p style="margin:24px 0 0;font-size:14px;line-height:1.75">Une précision à ajouter? Répondez simplement à ce courriel ou appelez-nous au <a href="tel:+14188836242" style="color:#608000;font-weight:bold">(418) 883-6242</a>.</p>
<p style="margin:18px 0 0;color:#65695f;font-size:12px;line-height:1.7">Cet accusé de réception ne constitue pas une soumission, une réservation ni une confirmation de disponibilité.</p>`),
    text: `${intro}\n\n${recapText(details, reference, hasAttachment)}\n\nUne précision à ajouter? Répondez à ce courriel ou appelez-nous.\nCet accusé de réception ne constitue pas une soumission, une réservation ni une confirmation de disponibilité.`,
  };
}
