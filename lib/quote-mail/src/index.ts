import { createHash } from "node:crypto";
import { SubmitQuoteBody, SubmitQuoteResponse } from "../../api-zod/src/generated/api.js";
import { customerTemplate, ownerTemplate } from "./templates.js";

export const MAX_REQUEST_BYTES = 4_200_000;
export const MAX_ARCHIVE_BYTES = 2_800_000;
export type MailPayload = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: { filename: string; content: string }[];
};
export type MailSender = (payload: MailPayload, key: string) => Promise<void>;
type QuoteRequest = {
  method: string;
  origin?: string;
  host: string;
  contentType?: string;
  clientIp: string;
  body: unknown;
};
type Dependencies = { env?: NodeJS.ProcessEnv; send?: MailSender; now?: () => number };
type Result = { status: number; body: Record<string, unknown> };
const attempts = new Map<string, { count: number; reset: number }>();
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const emailPattern = /^[^\s@<>,;\r\n]+@[^\s@<>,;\r\n]+\.[^\s@<>,;\r\n]+$/;

function fail(status: number, error: string): Result {
  return { status, body: { error } };
}

export function resendSender(apiKey: string, fetcher: typeof fetch = fetch): MailSender {
  return async (payload, key) => {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": key,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error("Email provider rejected request");
    const body = await response.json() as { id?: string };
    if (!body.id) throw new Error("Email provider returned no message ID");
  };
}

/** Same implementation in Vercel and the managed Express preview; no persistent file storage. */
export async function handleQuoteRequest(request: QuoteRequest, deps: Dependencies = {}): Promise<Result> {
  if (request.method !== "POST") return fail(405, "Méthode non autorisée.");
  if (!request.contentType?.toLowerCase().startsWith("application/json")) {
    return fail(415, "Une requête JSON est requise.");
  }
  // No browser can submit this JSON cross-origin without a preflight; reject mismatches too.
  if (request.origin) {
    try {
      if (new URL(request.origin).host !== request.host) return fail(403, "Origine non autorisée.");
    } catch { return fail(403, "Origine non autorisée."); }
  }
  const serialized = JSON.stringify(request.body);
  if (!serialized || Buffer.byteLength(serialized) > MAX_REQUEST_BYTES) {
    return fail(413, "Les pièces jointes sont trop volumineuses.");
  }
  const parsed = SubmitQuoteBody.safeParse(request.body);
  if (!parsed.success) return fail(400, "Vérifiez les champs du formulaire et les pièces jointes.");
  const data = parsed.data;
  if (data.website) return fail(400, "La demande n’a pas pu être validée.");
  if (![data.firstName, data.lastName, data.city, data.phone].every((value) =>
    value.trim().length >= 2 && !/[\r\n\u0000]/.test(value)) ||
    data.description.trim().length < 10 || !emailPattern.test(data.email)) {
    return fail(400, "Vérifiez les coordonnées et la description du projet.");
  }
  if (data.attachment) {
    const content = data.attachment.content;
    if (content.length % 4 !== 0 || /[^A-Za-z0-9+/=]/.test(content)) {
      return fail(400, "Pièce jointe invalide.");
    }
    const archive = Buffer.from(content, "base64");
    if (archive.toString("base64") !== content) return fail(400, "Pièce jointe invalide.");
    if (archive.length > MAX_ARCHIVE_BYTES) return fail(413, "L’archive ne doit pas dépasser 2,8 Mo.");
    if (archive.length < 22 || !archive.subarray(0, 4).equals(Buffer.from([80, 75, 3, 4]))) {
      return fail(400, "Une archive ZIP valide est requise.");
    }
  }
  const env = deps.env ?? process.env;
  const from = env.RESEND_FROM_EMAIL ?? "bonjour@kua.quebec";
  const recipient = env.RECIPIENT_EMAIL;
  if (!env.RESEND_API_KEY || from !== "bonjour@kua.quebec" || !recipient || !emailPattern.test(recipient)) {
    return fail(503, "L’envoi est temporairement indisponible. Veuillez réessayer plus tard ou nous appeler au (418) 883-6242.");
  }
  const now = (deps.now ?? Date.now)();
  for (const [key, value] of attempts) if (value.reset <= now) attempts.delete(key);
  const ipKey = hash(request.clientIp);
  const attempt = attempts.get(ipKey) ?? { count: 0, reset: now + 15 * 60_000 };
  if (attempt.count >= 5 || (attempts.size >= 5000 && !attempts.has(ipKey))) {
    return fail(429, "Trop de demandes. Veuillez patienter avant de réessayer.");
  }
  attempt.count += 1;
  attempts.set(ipKey, attempt);
  const send = deps.send ?? resendSender(env.RESEND_API_KEY);
  // Include the content digest: unchanged retries deduplicate; edits become new messages.
  const digest = hash(JSON.stringify({ ...data, recipient, from }));
  const key = `mzt-quote/${data.requestId}/${digest}`;
  const reference = `MZT-${data.requestId}`;
  const hasAttachment = Boolean(data.attachment);
  const owner = ownerTemplate(data, reference, hasAttachment);
  try {
    await send({
      from: `MZT Construction <${from}>`,
      to: [recipient],
      reply_to: data.email,
      ...owner,
      ...(data.attachment ? {
        attachments: [{ filename: "pieces-jointes-soumission.zip", content: data.attachment.content }],
      } : {}),
    }, `${key}/owner`);
  } catch {
    return fail(502, "L’envoi n’a pas pu être confirmé. Vos données sont conservées dans ce formulaire; réessayez ou appelez-nous.");
  }
  let confirmationSent = true;
  try {
    await send({
      from: `MZT Construction <${from}>`,
      to: [data.email],
      reply_to: recipient,
      ...customerTemplate(data, reference, hasAttachment),
    }, `${key}/customer`);
  } catch {
    // The lead was accepted. Do not tell the visitor to resend an already received request.
    confirmationSent = false;
  }
  return {
    status: 200,
    body: SubmitQuoteResponse.parse({ requestId: data.requestId, confirmationSent }),
  };
}
