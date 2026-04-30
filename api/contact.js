// POST /api/contact
//
// Endpoint que recibe el form de la landing, valida y manda email vía Resend.
// Si RESEND_API_KEY no está seteada, devuelve 503 para que el front muestre
// fallback de contacto directo (mailto / WA).
//
// Env vars:
//   RESEND_API_KEY    — key de Resend (requerida para envío real)
//   RESEND_FROM       — remitente (default: "DI Digital Studio <onboarding@resend.dev>")
//   NOTIFICATIONS_EMAIL — destinatario (default: info@didigitalstudio.com)

export const config = {
  runtime: "nodejs",
};

const PROJECT_TYPE_LABELS = {
  "software-a-medida": "Software a medida",
  saas: "SaaS",
  webapp: "Webapp",
  automatizacion: "Automatización",
  ia: "Integración IA",
  consultoria: "Consultoría técnica",
  "no-se": "No estaba seguro / quiere asesoramiento",
};

const BUDGET_LABELS = {
  "2-5k": "USD 2.500 – 5.000",
  "5-15k": "USD 5.000 – 15.000",
  "15-50k": "USD 15.000 – 50.000",
  "50k+": "USD 50.000+",
  retainer: "Retainer mensual continuo",
  "no-se": "Todavía no lo definió",
};

const isEmail = (s) => typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const trim = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");

const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "invalid_json" }); }
  }
  body = body || {};

  // Honeypot
  if (body.website && String(body.website).trim().length > 0) {
    // Devolvemos 200 silenciosamente para no revelar el honeypot a bots
    return res.status(200).json({ ok: true });
  }

  const name = trim(body.name, 80);
  const company = trim(body.company, 120);
  const email = trim(body.email, 120);
  const projectType = trim(body.projectType, 40);
  const budget = trim(body.budget, 20);
  const message = trim(body.message, 2000);

  if (name.length < 2) return res.status(400).json({ error: "name_required" });
  if (!isEmail(email)) return res.status(400).json({ error: "email_invalid" });
  if (message.length < 10) return res.status(400).json({ error: "message_too_short" });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[/api/contact] RESEND_API_KEY no configurada — fallback a contacto manual");
    return res.status(503).json({ error: "email_not_configured", fallback: "info@didigitalstudio.com" });
  }

  const from = process.env.RESEND_FROM || "DI Digital Studio <onboarding@resend.dev>";
  const to = process.env.NOTIFICATIONS_EMAIL || "info@didigitalstudio.com";
  const projectLabel = PROJECT_TYPE_LABELS[projectType] || projectType || "—";
  const budgetLabel = BUDGET_LABELS[budget] || budget || "—";

  const subject = `Nuevo lead · ${name}${company ? " · " + company : ""}`;
  const receivedAt = new Date().toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const text = [
    `Nuevo lead desde didigitalstudio.com`,
    ``,
    `Nombre: ${name}`,
    `Empresa: ${company || "—"}`,
    `Email: ${email}`,
    `Tipo de proyecto: ${projectLabel}`,
    `Inversión orientativa: ${budgetLabel}`,
    ``,
    `Mensaje:`,
    message,
    ``,
    `—`,
    `Recibido: ${receivedAt} (ART)`,
  ].join("\n");

  const replySubject = encodeURIComponent(`Re: tu consulta a DI Digital Studio`);
  const messageHtml = escapeHtml(message).replace(/\n/g, "<br />");

  // HTML email — table-based para máxima compatibilidad (Gmail / Outlook / Apple Mail).
  const html = `<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Nuevo lead — DI Digital Studio</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f7;padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#0d0d18;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(7,7,11,0.18);">

        <!-- Gradient bar -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#a78bfa 0%,#22d3ee 55%,#ec4899 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;font-weight:600;letter-spacing:-0.01em;color:#f5f5f7;">
                  DI <span style="color:#a1a1aa;font-weight:400;">Digital Studio</span>
                </td>
                <td align="right" style="font-family:'JetBrains Mono','Fira Code',ui-monospace,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#22d3ee;">
                  // Nuevo lead
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Lead identity -->
        <tr>
          <td style="padding:8px 40px 28px;">
            <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:28px;font-weight:700;letter-spacing:-0.02em;line-height:1.15;color:#f5f5f7;">
              ${escapeHtml(name)}
            </p>
            ${company ? `<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:16px;color:#a1a1aa;">${escapeHtml(company)}</p>` : ""}
          </td>
        </tr>

        <!-- Data card -->
        <tr>
          <td style="padding:0 40px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
              <tr>
                <td style="padding:18px 22px;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="120" style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8c8c98;">Email</td>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;color:#f5f5f7;">
                        <a href="mailto:${escapeHtml(email)}" style="color:#67e8f9;text-decoration:none;">${escapeHtml(email)}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 22px;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="120" style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8c8c98;">Proyecto</td>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;color:#f5f5f7;">${escapeHtml(projectLabel)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 22px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="120" style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8c8c98;">Inversión</td>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;color:#f5f5f7;">${escapeHtml(budgetLabel)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:8px 40px 8px;">
            <p style="margin:0 0 12px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#22d3ee;">// Mensaje</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;">
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.65;color:#e4e4e7;border-left:3px solid #a78bfa;padding:6px 0 6px 18px;">
              ${messageHtml}
            </div>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:0 40px 36px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="border-radius:10px;background:linear-gradient(135deg,#7c3aed 0%,#22d3ee 100%);">
                  <a href="mailto:${escapeHtml(email)}?subject=${replySubject}" style="display:inline-block;padding:14px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;font-weight:600;color:#07070b;text-decoration:none;border-radius:10px;">Responder a ${escapeHtml(name.split(" ")[0])} →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px 32px;border-top:1px solid rgba(255,255,255,0.06);">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.05em;color:#71717a;">
                  Recibido: ${escapeHtml(receivedAt)} · ART
                </td>
                <td align="right" style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.05em;color:#71717a;">
                  <a href="https://www.didigitalstudio.com" style="color:#71717a;text-decoration:none;">didigitalstudio.com</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>

      <!-- Outer footer -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;margin-top:16px;">
        <tr>
          <td align="center" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;color:#a1a1aa;line-height:1.5;">
            Este email fue generado automáticamente por el formulario de<br />
            <a href="https://www.didigitalstudio.com" style="color:#7c3aed;text-decoration:none;">didigitalstudio.com</a> · Buenos Aires, Argentina
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
</body>
</html>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    if (!r.ok) {
      let detail = null;
      try { detail = await r.json(); } catch { detail = null; }
      const detailText = detail ? JSON.stringify(detail) : await r.text().catch(() => "");
      console.error("[/api/contact] Resend error:", r.status, detailText);
      // Solo en non-production exponemos el detalle del provider para facilitar setup.
      const isProd = process.env.VERCEL_ENV === "production";
      return res.status(502).json({
        error: "send_failed",
        provider_status: r.status,
        ...(isProd ? {} : { provider_error: detail || detailText }),
      });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] fetch failed:", err && err.message ? err.message : err);
    return res.status(502).json({ error: "send_failed" });
  }
}
