// DI Digital Studio — landing build
//
// 1. Transpila JSX con esbuild (sin bundle: React/ReactDOM van como globals UMD).
// 2. Concatena logo.jsx + landing.jsx + bootstrap → web/landing.bundle.js minificado.
// 3. Genera el HTML pre-rendered del landing en index.html (entre los marcadores
//    PRERENDER:START / PRERENDER:END) para crawlers y sin-JS.
//
// Run: `npm run build`. Vercel lo corre vía vercel-build.

import { build } from "esbuild";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const transpile = async (file) => {
  const result = await build({
    entryPoints: [resolve(root, file)],
    write: false,
    bundle: false,
    minify: true,
    target: "es2020",
    loader: { ".jsx": "jsx" },
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    legalComments: "none",
  });
  return result.outputFiles[0].text;
};

const main = async () => {
  console.log("→ Transpiling shared/logo.jsx…");
  const logoJs = await transpile("shared/logo.jsx");

  console.log("→ Transpiling web/landing.jsx…");
  const landingJs = await transpile("web/landing.jsx");

  const bootstrap = `
(function () {
  if (typeof window === "undefined" || !window.React || !window.ReactDOM) return;
  var el = document.getElementById("root");
  if (!el) return;
  // Limpiamos el HTML pre-rendered; React monta UI interactiva.
  while (el.firstChild) el.removeChild(el.firstChild);
  ReactDOM.createRoot(el).render(React.createElement(window.LandingApp));
})();
`;

  const bundle = [logoJs, landingJs, bootstrap].join("\n;\n");
  writeFileSync(resolve(root, "web/landing.bundle.js"), bundle);
  console.log(`✓ web/landing.bundle.js (${(Buffer.byteLength(bundle, "utf8") / 1024).toFixed(1)} KB)`);

  // Cache-busting: inyectamos el hash del contenido en el querystring de bundle/css.
  // Vercel sirve /web/* con max-age=31536000 immutable, así que sin esto los browsers
  // se quedan con la versión vieja indefinidamente.
  const hash = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 8);
  const jsHash = hash(bundle);
  const cssPath = resolve(root, "web/landing.css");
  const cssHash = existsSync(cssPath) ? hash(readFileSync(cssPath)) : jsHash;

  const stampAssetUrls = (html) =>
    html
      .replace(/\/web\/landing\.bundle\.js(?:\?v=[^"'\s]*)?/g, `/web/landing.bundle.js?v=${jsHash}`)
      .replace(/\/web\/landing\.css(?:\?v=[^"'\s]*)?/g, `/web/landing.css?v=${cssHash}`);

  // Pre-render del HTML estático
  const prerendered = renderPrerenderedHTML();
  const indexPath = resolve(root, "index.html");
  let indexHtml = readFileSync(indexPath, "utf8");
  const startMarker = "<!-- PRERENDER:START -->";
  const endMarker = "<!-- PRERENDER:END -->";
  const startIdx = indexHtml.indexOf(startMarker);
  const endIdx = indexHtml.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) {
    console.warn("⚠ Marcadores PRERENDER no encontrados en index.html — skipping");
  } else {
    indexHtml =
      indexHtml.slice(0, startIdx + startMarker.length) +
      "\n" +
      prerendered +
      "\n      " +
      indexHtml.slice(endIdx);
    indexHtml = stampAssetUrls(indexHtml);
    writeFileSync(indexPath, indexHtml);
    console.log(`✓ index.html prerender actualizado (${(prerendered.length / 1024).toFixed(1)} KB) — js?v=${jsHash} css?v=${cssHash}`);
  }

  // Resto de páginas que comparten el CSS (privacidad, términos…)
  for (const file of ["privacidad.html", "terminos.html"]) {
    const p = resolve(root, file);
    if (!existsSync(p)) continue;
    const original = readFileSync(p, "utf8");
    const stamped = stampAssetUrls(original);
    if (stamped !== original) {
      writeFileSync(p, stamped);
      console.log(`✓ ${file} actualizado con cache-bust`);
    }
  }
};

// Datos espejo de los arrays de landing.jsx (mantenerlos sincronizados manualmente).
// Si esto se desincroniza el script JS lo reemplaza al hidratar — no hay duplicación funcional.
const SERVICES = [
  { tag: "01", title: "Software a medida", desc: "Construimos el sistema que tu operación necesita. Sin templates, sin features que no usás. Código propio, documentado y tuyo.", bullets: ["Backend + frontend", "Arquitectura escalable", "Tests y CI/CD"] },
  { tag: "02", title: "SaaS", desc: "Tu producto listo para facturar: multi-tenant, suscripciones, onboarding y métricas. Del MVP al release en semanas.", bullets: ["Stripe / MercadoPago", "Multi-tenant", "Analytics incluido"] },
  { tag: "03", title: "Webapps", desc: "Aplicaciones web modernas, rápidas y responsive. Paneles internos, portales de cliente, dashboards operativos.", bullets: ["React / Next.js", "Real-time", "Mobile-first"] },
  { tag: "04", title: "Automatizaciones", desc: "Cortamos tareas repetitivas de raíz. Conectamos tus sistemas, scrapeamos datos, disparamos alertas y generamos reportes solos.", bullets: ["n8n / Zapier custom", "Scrapers", "Bots y webhooks"] },
  { tag: "05", title: "Integraciones IA", desc: "Agentes, copilots y flujos con LLMs aplicados a tu negocio. No demos — features reales en producción.", bullets: ["OpenAI / Claude", "RAG sobre tus datos", "Agentes custom"] },
  { tag: "06", title: "Consultoría", desc: "Revisamos tu stack, procesos y arquitectura. Sparring técnico para equipos que necesitan una segunda opinión honesta.", bullets: ["Auditoría técnica", "Roadmap", "Mentoría a tu equipo"] },
];

const PROCESS = [
  { n: "01", title: "Descubrimiento", desc: "Semana 1. Nos metemos en tu negocio: problema, usuarios, restricciones. Salimos con alcance, stack y plan de entregas.", deliv: "Brief técnico + propuesta" },
  { n: "02", title: "Diseño", desc: "Prototipos navegables y arquitectura técnica validada antes de escribir código de producción.", deliv: "Figma + doc técnico" },
  { n: "03", title: "Desarrollo", desc: "Sprints de 1–2 semanas con demos en vivo. Vos ves el avance en tiempo real, no al final.", deliv: "Staging + demos semanales" },
  { n: "04", title: "Soporte", desc: "Post-lanzamiento seguimos iterando: monitoreo, métricas, mejoras continuas y un humano que atiende cuando algo se rompe.", deliv: "SLA + iteraciones" },
];

const STACK = [
  { label: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind", "React Native"] },
  { label: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Supabase", "Redis"] },
  { label: "Infra", items: ["AWS", "Vercel", "Docker", "Cloudflare"] },
  { label: "IA & Auto", items: ["OpenAI", "Claude", "n8n", "LangChain", "Stripe"] },
];

const FAQS = [
  { q: "¿Cuánto tarda un proyecto típico?", a: "Un MVP funcional entre 4 y 8 semanas. Una landing o automatización, entre 1 y 3. Te damos un timeline realista desde el primer call — no promesas vacías." },
  { q: "¿Trabajan con pymes o solo con startups?", a: "Ambos. Gran parte de nuestro trabajo es con pymes y empresas medianas que necesitan digitalizar procesos, integrar sistemas o sumar IA a lo que ya tienen." },
  { q: "¿El código queda nuestro?", a: "Sí, siempre. Repositorio, documentación y credenciales son tuyos desde el día uno. Nada de vendor lock-in." },
  { q: "¿Cómo cobran?", a: "Depende del proyecto: precio cerrado por alcance definido, o retainer mensual para trabajo continuo. Sin letra chica, todo firmado antes de empezar." },
  { q: "¿Hacen soporte después del lanzamiento?", a: "Sí. Ofrecemos planes de mantenimiento y mejora continua. También podemos capacitar a tu equipo para que tome las riendas." },
  { q: "¿Trabajan 100% remoto?", a: "Sí. Estamos en Buenos Aires y trabajamos con clientes en toda Argentina y LATAM. Para proyectos grandes podemos visitar tus oficinas." },
];

const CASES = [
  { tag: "01", title: "Caso · Pyme logística", challenge: "Facturación electrónica manual. 32 hs/mes en data entry y errores de tipeo.", outcome: "Automatización end-to-end conectando ERP + AFIP. Cero data entry manual.", metric: "32 hs/mes ahorradas" },
  { tag: "02", title: "Caso · SaaS odontológico", challenge: "Necesitaban un sistema multi-clínica con turnos, cobranzas y reportes en menos de 2 meses.", outcome: "MVP con multi-tenant, RLS por clínica, suscripciones y onboarding wizard.", metric: "8 semanas a producción" },
  { tag: "03", title: "Caso · Reservas de barbería", challenge: "Agenda en cuaderno + WhatsApp. Doble reserva, no-shows y plata perdida.", outcome: "Webapp mobile-first con magic-link auth, agenda en tiempo real y caja diaria.", metric: "2× reservas/semana" },
];

const PROJECTS = [
  { initials: "TB", name: "TurnosBarbería", desc: "SaaS de turnos para barberías. Reserva con magic link y panel admin con caja, agenda y equipo.", stack: ["Next.js", "Supabase", "Tailwind"], status: "Activo", url: "https://barberiaonline.vercel.app" },
  { initials: "AT", name: "Atrio", desc: "Plataforma SaaS para inmobiliarias argentinas. Gestión de propiedades, clientes y operaciones.", stack: ["Next.js", "Supabase", "shadcn/ui"], status: "Activo", url: "https://atrio-omega.vercel.app" },
  { initials: "IN", name: "Inventario", desc: "Gestión de inventario multi-tenant con fotos, precios, ubicación e import/export Excel. PWA.", stack: ["React", "Vite", "Supabase"], status: "Activo", url: "https://inventario-mu-one.vercel.app" },
  { initials: "OG", name: "OdontoGestión", desc: "Webapp de gestión para consultorios odontológicos: pacientes, métricas y reportes.", stack: ["Next.js", "Supabase", "Recharts"], status: "Activo", url: "https://odontogestion.vercel.app" },
  { initials: "TD", name: "TravelDesk", desc: "Plataforma para agencias de viajes con generación de PDFs, integraciones Google y bot de Telegram.", stack: ["Next.js", "Supabase", "Google APIs"], status: "Activo", url: "https://traveldesk-two.vercel.app" },
];

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function renderPrerenderedHTML() {
  const services = SERVICES.map(
    (s) => `
        <article class="di-service-card">
          <div class="di-service-head">
            <span class="di-service-tag">${esc(s.tag)}</span>
            <h3>${esc(s.title)}</h3>
          </div>
          <p class="di-service-desc">${esc(s.desc)}</p>
          <ul class="di-service-bullets">
            ${s.bullets.map((b) => `<li><span class="di-bullet-dot"></span>${esc(b)}</li>`).join("")}
          </ul>
        </article>`,
  ).join("");

  const proc = PROCESS.map(
    (p) => `
        <div class="di-process-item">
          <div class="di-process-marker"><span>${esc(p.n)}</span></div>
          <div class="di-process-body">
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.desc)}</p>
            <div class="di-process-deliv">
              <span class="di-mono">entregable →</span> ${esc(p.deliv)}
            </div>
          </div>
        </div>`,
  ).join("");

  const cases = CASES.map(
    (c) => `
        <article class="di-case-card">
          <span class="di-service-tag">${esc(c.tag)}</span>
          <h3>${esc(c.title)}</h3>
          <div class="di-case-row"><span class="di-mono di-case-label">Problema</span><p>${esc(c.challenge)}</p></div>
          <div class="di-case-row"><span class="di-mono di-case-label">Solución</span><p>${esc(c.outcome)}</p></div>
          <div class="di-case-metric"><span class="di-gradient-text">${esc(c.metric)}</span></div>
        </article>`,
  ).join("");

  const projects = PROJECTS.map(
    (p) => `
        <a class="di-project-card" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.name)} — Ver proyecto (abre en pestaña nueva)">
          <div class="di-project-head">
            <div class="di-project-mono" aria-hidden="true"><span>${esc(p.initials)}</span></div>
            <div class="di-project-title">
              <h3>${esc(p.name)}</h3>
              <span class="di-project-status"><span class="di-project-status-dot"></span>${esc(p.status)}</span>
            </div>
          </div>
          <p class="di-project-desc">${esc(p.desc)}</p>
          <div class="di-project-chips">${p.stack.map((t) => `<span class="di-chip">${esc(t)}</span>`).join("")}</div>
          <span class="di-project-cta">Ver proyecto <span aria-hidden="true">→</span></span>
        </a>`,
  ).join("");

  const stack = STACK.map(
    (col) => `
        <div class="di-stack-col">
          <div class="di-stack-label">
            <span class="di-stack-dot"></span>
            <span class="di-mono">${esc(col.label)}</span>
          </div>
          <div class="di-stack-chips">
            ${col.items.map((t) => `<span class="di-chip">${esc(t)}</span>`).join("")}
          </div>
        </div>`,
  ).join("");

  const faqs = FAQS.map(
    (f, i) => `
          <details class="di-faq-item${i === 0 ? " open" : ""}"${i === 0 ? " open" : ""}>
            <summary class="di-faq-q">
              <span>${esc(f.q)}</span>
              <span class="di-faq-icon" aria-hidden="true">+</span>
            </summary>
            <div class="di-faq-a"><p>${esc(f.a)}</p></div>
          </details>`,
  ).join("");

  return `<div class="di-prerender">
        <header class="di-nav-static">
          <a href="#top" class="di-logo-link">
            <span class="di-logo-text">DI <span class="di-logo-accent">Digital Studio</span></span>
          </a>
          <nav class="di-nav-links" aria-label="Principal">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Proceso</a>
            <a href="#stack">Stack</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#faq">FAQ</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </header>

        <main id="main" tabindex="-1">
          <section class="di-hero" id="top">
            <div class="di-container di-hero-inner">
              <div class="di-badge">
                <span class="di-dot"></span>
                <span>Abierto para nuevos proyectos · 2026</span>
              </div>
              <h1>Entendemos tu negocio <span class="di-gradient-text">desde adentro</span>.<br/>Y construimos el software que necesita.</h1>
              <p class="di-hero-sub">Somos un estudio de desarrollo enfocado en pymes y empresas medianas. Diseñamos software a medida, SaaS, automatizaciones e integraciones con IA — del prototipo a producción.</p>
              <div class="di-hero-ctas">
                <a href="#contacto" class="di-btn di-btn-primary">Empezar un proyecto →</a>
                <a href="#servicios" class="di-btn di-btn-ghost">Ver servicios</a>
              </div>
            </div>
          </section>

          <section id="servicios" class="di-section">
            <div class="di-container">
              <div class="di-section-head">
                <span class="di-eyebrow">// Servicios</span>
                <h2>Todo lo que tu producto necesita, bajo un mismo estudio.</h2>
                <p class="di-section-sub">Seis servicios que cubren el ciclo completo: del descubrimiento a la operación. Integrados — no islas.</p>
              </div>
              <div class="di-services-grid">${services}
              </div>
            </div>
          </section>

          <section id="proceso" class="di-section di-section-alt">
            <div class="di-container">
              <div class="di-section-head">
                <span class="di-eyebrow">// Proceso</span>
                <h2>Simple, transparente, sin sorpresas.</h2>
                <p class="di-section-sub">Un flujo de cuatro etapas. Desde el primer call ya estás viendo avance — no al final del proyecto.</p>
              </div>
              <div class="di-process">
                <div class="di-process-line"></div>${proc}
              </div>
            </div>
          </section>

          <section id="stack" class="di-section">
            <div class="di-container">
              <div class="di-section-head">
                <span class="di-eyebrow">// Stack</span>
                <h2>Tecnología moderna, decisiones probadas.</h2>
                <p class="di-section-sub">Usamos lo que funciona. Elegimos cada herramienta según el problema, no según la moda.</p>
              </div>
              <div class="di-stack-grid">${stack}
              </div>
            </div>
          </section>

          <section id="proyectos" class="di-section">
            <div class="di-container">
              <div class="di-section-head">
                <span class="di-eyebrow">// Proyectos</span>
                <h2>Productos en producción.</h2>
                <p class="di-section-sub">Una selección de plataformas activas que diseñamos y construimos. Tocá en cada una para ver su landing.</p>
              </div>
              <div class="di-projects-grid">${projects}
              </div>
            </div>
          </section>

          <section id="faq" class="di-section di-section-alt">
            <div class="di-container">
              <div class="di-section-head">
                <span class="di-eyebrow">// FAQ</span>
                <h2>Preguntas que nos hacen seguido.</h2>
                <p class="di-section-sub">Si la tuya no está acá, escribinos. Respondemos en menos de 24 hs.</p>
              </div>
              <div class="di-faq">${faqs}
              </div>
            </div>
          </section>

          <section id="contacto" class="di-section di-section-contact">
            <div class="di-container">
              <div class="di-contact-card">
                <div class="di-contact-left">
                  <span class="di-eyebrow">// Contacto</span>
                  <h2>¿Tenés una idea?<br/><span class="di-gradient-text">Hablemos.</span></h2>
                  <p>Contanos qué necesitás. Respondemos en menos de 24 hs con una propuesta concreta y sin compromiso.</p>
                  <div class="di-contact-meta">
                    <div><span class="di-mono di-contact-meta-label">Ubicación</span><span>Buenos Aires · Argentina</span></div>
                    <div><span class="di-mono di-contact-meta-label">Horario</span><span>Lun – Vie · 9:00 a 19:00 ART</span></div>
                  </div>
                </div>
                <div class="di-contact-right">
                  <a href="mailto:info@didigitalstudio.com" class="di-contact-link">
                    <div><div class="di-contact-label">Email</div><div class="di-contact-value">info@didigitalstudio.com</div></div>
                  </a>
                  <a href="https://instagram.com/di.digital.studio" target="_blank" rel="noopener noreferrer" class="di-contact-link">
                    <div><div class="di-contact-label">Instagram</div><div class="di-contact-value">@di.digital.studio</div></div>
                  </a>
                  <a href="https://wa.me/5491169459990" target="_blank" rel="noopener noreferrer" class="di-contact-link">
                    <div><div class="di-contact-label">WhatsApp · Comercial (Lucas)</div><div class="di-contact-value">+54 9 11 6945 9990</div></div>
                  </a>
                  <a href="https://wa.me/5493584248863" target="_blank" rel="noopener noreferrer" class="di-contact-link">
                    <div><div class="di-contact-label">WhatsApp · Técnico (Agustín)</div><div class="di-contact-value">+54 9 358 424 8863</div></div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer class="di-footer">
          <div class="di-container di-footer-inner">
            <div class="di-footer-brand"><p>Software que impulsa negocios.</p></div>
            <div class="di-footer-meta di-mono">
              <a href="https://instagram.com/di.digital.studio" target="_blank" rel="noopener noreferrer">@di.digital.studio</a>
              <span> · </span>
              <span>© 2026 DI Digital Studio</span>
              <span> · </span>
              <span>Buenos Aires · Argentina</span>
              <span> · </span>
              <a href="/privacidad">Privacidad</a>
              <span> · </span>
              <a href="/terminos">Términos</a>
            </div>
          </div>
        </footer>
      </div>`;
}

// IndexNow ping (Bing/Yandex/Naver/etc.) — solo en builds de producción de Vercel
async function pingIndexNow() {
  if (process.env.VERCEL_ENV !== "production") return;
  const KEY = "7b5789ad2d23b3f24e8b72b574aa7e34";
  const HOST = "www.didigitalstudio.com";
  const urls = [
    `https://${HOST}/`,
    `https://${HOST}/privacidad`,
    `https://${HOST}/terminos`,
  ];
  try {
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: urls,
      }),
    });
    console.log(`✓ IndexNow: ${r.status} ${r.statusText} (${urls.length} URLs)`);
  } catch (err) {
    // No bloqueamos el deploy si falla
    console.warn("⚠ IndexNow ping falló:", err && err.message ? err.message : err);
  }
}

main()
  .then(pingIndexNow)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
