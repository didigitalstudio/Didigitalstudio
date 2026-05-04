/* eslint-disable */
// DI Digital Studio — Landing page (React)

const { useEffect, useState, useRef } = React;

/* --------- Data --------- */
const SERVICES = [
  {
    tag: "01",
    title: "Software a medida",
    desc: "Construimos el sistema que tu operación necesita. Sin templates, sin features que no usás. Código propio, documentado y tuyo.",
    bullets: ["Backend + frontend", "Arquitectura escalable", "Tests y CI/CD"],
  },
  {
    tag: "02",
    title: "SaaS",
    desc: "Tu producto listo para facturar: multi-tenant, suscripciones, onboarding y métricas. Del MVP al release en semanas.",
    bullets: ["Stripe / MercadoPago", "Multi-tenant", "Analytics incluido"],
  },
  {
    tag: "03",
    title: "Webapps",
    desc: "Aplicaciones web modernas, rápidas y responsive. Paneles internos, portales de cliente, dashboards operativos.",
    bullets: ["React / Next.js", "Real-time", "Mobile-first"],
  },
  {
    tag: "04",
    title: "Automatizaciones",
    desc: "Cortamos tareas repetitivas de raíz. Conectamos tus sistemas, scrapeamos datos, disparamos alertas y generamos reportes solos.",
    bullets: ["n8n / Zapier custom", "Scrapers", "Bots y webhooks"],
  },
  {
    tag: "05",
    title: "Integraciones IA",
    desc: "Agentes, copilots y flujos con LLMs aplicados a tu negocio. No demos — features reales en producción.",
    bullets: ["OpenAI / Claude", "RAG sobre tus datos", "Agentes custom"],
  },
  {
    tag: "06",
    title: "Consultoría",
    desc: "Revisamos tu stack, procesos y arquitectura. Sparring técnico para equipos que necesitan una segunda opinión honesta.",
    bullets: ["Auditoría técnica", "Roadmap", "Mentoría equipo"],
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Descubrimiento",
    desc: "Semana 1. Nos metemos en tu negocio: problema, usuarios, restricciones. Salimos con alcance, stack y plan de entregas.",
    deliv: "Brief técnico + propuesta",
  },
  {
    n: "02",
    title: "Diseño",
    desc: "Prototipos navegables y arquitectura técnica validada antes de escribir código de producción.",
    deliv: "Figma + doc técnico",
  },
  {
    n: "03",
    title: "Desarrollo",
    desc: "Sprints de 1–2 semanas con demos en vivo. Vos ves el avance en tiempo real, no al final.",
    deliv: "Staging + demos semanales",
  },
  {
    n: "04",
    title: "Soporte",
    desc: "Post-lanzamiento seguimos iterando: monitoreo, métricas, mejoras continuas y un humano que atiende cuando algo se rompe.",
    deliv: "SLA + iteraciones",
  },
];

const STACK = [
  { label: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind", "React Native"] },
  { label: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Supabase", "Redis"] },
  { label: "Infra", items: ["AWS", "Vercel", "Docker", "Cloudflare"] },
  { label: "IA & Auto", items: ["OpenAI", "Claude", "n8n", "LangChain", "Stripe"] },
];

const FAQS = [
  {
    q: "¿Cuánto tarda un proyecto típico?",
    a: "Un MVP funcional entre 4 y 8 semanas. Una landing o automatización, entre 1 y 3. Te damos un timeline realista desde el primer call — no promesas vacías.",
  },
  {
    q: "¿Trabajan con pymes o solo con startups?",
    a: "Ambos. Gran parte de nuestro trabajo es con pymes y empresas medianas que necesitan digitalizar procesos, integrar sistemas o sumar IA a lo que ya tienen.",
  },
  {
    q: "¿El código queda nuestro?",
    a: "Sí, siempre. Repositorio, documentación y credenciales son tuyos desde el día uno. Nada de vendor lock-in.",
  },
  {
    q: "¿Cómo cobran?",
    a: "Depende del proyecto: precio cerrado por alcance definido, o retainer mensual para trabajo continuo. Sin letra chica, todo firmado antes de empezar.",
  },
  {
    q: "¿Hacen soporte después del lanzamiento?",
    a: "Sí. Ofrecemos planes de mantenimiento y mejora continua. También podemos capacitar a tu equipo para que tome las riendas.",
  },
  {
    q: "¿Trabajan 100% remoto?",
    a: "Sí. Estamos en Buenos Aires y trabajamos con clientes en toda Argentina y LATAM. Para proyectos grandes podemos visitar tus oficinas.",
  },
];

// TODO: reemplazar con clientes/casos/testimoniales reales cuando estén listos.
const CLIENTS = [
  // { name: "Cliente 1", logo: "/assets/clients/cliente-1.svg" },
];

const CASES = [
  {
    tag: "01",
    title: "Caso · Pyme logística",
    challenge: "Facturación electrónica manual. 32 hs/mes en data entry y errores de tipeo.",
    outcome: "Automatización end-to-end conectando ERP + AFIP. Cero data entry manual.",
    metric: "32 hs/mes ahorradas",
  },
  {
    tag: "02",
    title: "Caso · SaaS odontológico",
    challenge: "Necesitaban un sistema multi-clínica con turnos, cobranzas y reportes en menos de 2 meses.",
    outcome: "MVP con multi-tenant, RLS por clínica, suscripciones y onboarding wizard.",
    metric: "8 semanas a producción",
  },
  {
    tag: "03",
    title: "Caso · Reservas de barbería",
    challenge: "Agenda en cuaderno + WhatsApp. Doble reserva, no-shows y plata perdida.",
    outcome: "Webapp mobile-first con magic-link auth, agenda en tiempo real y caja diaria.",
    metric: "2× reservas/semana",
  },
];

const TESTIMONIALS = [
  // TODO: reemplazar con testimoniales reales con nombre + cargo + empresa
];

const PROJECTS = [
  {
    initials: "TB",
    name: "TurnosBarbería",
    desc: "SaaS de turnos para barberías. Reserva con magic link y panel admin con caja, agenda y equipo.",
    stack: ["Next.js", "Supabase", "Tailwind"],
    status: "Activo",
    url: "https://barberiaonline.vercel.app",
  },
  {
    initials: "AT",
    name: "Atrio",
    desc: "Plataforma SaaS para inmobiliarias argentinas. Gestión de propiedades, clientes y operaciones.",
    stack: ["Next.js", "Supabase", "shadcn/ui"],
    status: "Activo",
    url: "https://atrio-omega.vercel.app",
  },
  {
    initials: "IN",
    name: "Inventario",
    desc: "Gestión de inventario multi-tenant con fotos, precios, ubicación e import/export Excel. PWA.",
    stack: ["React", "Vite", "Supabase"],
    status: "Activo",
    url: "https://inventario-mu-one.vercel.app",
  },
  {
    initials: "OG",
    name: "OdontoGestión",
    desc: "Webapp de gestión para consultorios odontológicos: pacientes, métricas y reportes.",
    stack: ["Next.js", "Supabase", "Recharts"],
    status: "Activo",
    url: "https://odontogestion.vercel.app",
  },
  {
    initials: "TD",
    name: "TravelDesk",
    desc: "Plataforma para agencias de viajes con generación de PDFs, integraciones Google y bot de Telegram.",
    stack: ["Next.js", "Supabase", "Google APIs"],
    status: "Activo",
    url: "https://traveldesk-two.vercel.app",
  },
];

const PROJECT_TYPES = [
  { value: "software-a-medida", label: "Software a medida" },
  { value: "saas", label: "SaaS" },
  { value: "webapp", label: "Webapp" },
  { value: "automatizacion", label: "Automatización" },
  { value: "ia", label: "Integración IA" },
  { value: "consultoria", label: "Consultoría técnica" },
  { value: "no-se", label: "No estoy seguro / quiero asesoramiento" },
];

const BUDGETS = [
  { value: "2-5k", label: "USD 2.500 – 5.000" },
  { value: "5-15k", label: "USD 5.000 – 15.000" },
  { value: "15-50k", label: "USD 15.000 – 50.000" },
  { value: "50k+", label: "USD 50.000+" },
  { value: "retainer", label: "Retainer mensual continuo" },
  { value: "no-se", label: "Todavía no lo definí" },
];

/* --------- Components --------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Lock de scroll robusto para iOS Safari: `overflow: hidden` no alcanza,
  // hay que fijar el body con la scrollY guardada y restaurarla al cerrar.
  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);
  // Si el viewport cruza a desktop con el menú abierto, lo cerramos
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = (e) => { if (e.matches) setMenuOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else if (mq.removeListener) mq.removeListener(onChange);
    };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return (
    <React.Fragment>
      <header className={`di-nav ${scrolled ? "scrolled" : ""} ${menuOpen ? "di-nav-menu-open" : ""}`}>
        <div className="di-nav-inner">
          <a href="#main" className="di-logo-link" onClick={closeMenu}>
            <DILogoMark size={36} animated />
            <span className="di-logo-text">
              DI <span className="di-logo-accent">Digital Studio</span>
            </span>
          </a>
          <nav className="di-nav-links" aria-label="Principal">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Proceso</a>
            <a href="#stack">Stack</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#faq">FAQ</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a href="#contacto" className="di-btn di-btn-primary di-btn-sm di-nav-cta">
            Trabajemos juntos
          </a>
          <button
            className={`di-burger ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div className={`di-mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav className="di-mobile-links" aria-label="Móvil">
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#proceso" onClick={closeMenu}>Proceso</a>
          <a href="#stack" onClick={closeMenu}>Stack</a>
          <a href="#proyectos" onClick={closeMenu}>Proyectos</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>
        <a href="#contacto" onClick={closeMenu} className="di-btn di-btn-primary di-mobile-cta">
          Trabajemos juntos
        </a>
      </div>
    </React.Fragment>
  );
}

function Hero() {
  return (
    <section className="di-hero">
      <div className="di-container di-hero-inner">
        <div className="di-badge">
          <span className="di-dot"></span>
          <span>Abierto para nuevos proyectos · 2026</span>
        </div>
        <h1>
          Entendemos tu negocio{" "}
          <span className="di-gradient-text">desde adentro</span>.<br />
          Y construimos el software que necesita.
        </h1>
        <p className="di-hero-sub">
          Somos un estudio de desarrollo enfocado en pymes y empresas medianas.
          Diseñamos software a medida, SaaS, automatizaciones e integraciones con IA —
          del prototipo a producción.
        </p>
        <div className="di-hero-ctas">
          <a href="#contacto" className="di-btn di-btn-primary">
            Empezar un proyecto
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href="#servicios" className="di-btn di-btn-ghost">Ver servicios</a>
        </div>

        <div className="di-hero-stats">
          <div className="di-stat">
            <div className="di-stat-num">100%</div>
            <div className="di-stat-label">Código del cliente</div>
          </div>
          <div className="di-stat">
            <div className="di-stat-num">&lt; 2 sem</div>
            <div className="di-stat-label">Primer entregable</div>
          </div>
          <div className="di-stat">
            <div className="di-stat-num">SLA</div>
            <div className="di-stat-label">Soporte post-launch</div>
          </div>
        </div>

        {/* Hero visual — orbit around the logo */}
        <div className="di-hero-visual">
          <div className="di-orbit">
            <div className="di-orbit-ring di-orbit-ring-1"></div>
            <div className="di-orbit-ring di-orbit-ring-2"></div>
            <div className="di-orbit-ring di-orbit-ring-3"></div>
            <div className="di-orbit-center">
              <DILogoMark size={120} animated decorative={false} label="DI Digital Studio — Software a medida" />
            </div>
            <span className="di-orbit-chip" style={{ "--angle": "20deg" }}>SaaS</span>
            <span className="di-orbit-chip" style={{ "--angle": "95deg" }}>IA</span>
            <span className="di-orbit-chip" style={{ "--angle": "170deg" }}>Webapps</span>
            <span className="di-orbit-chip" style={{ "--angle": "245deg" }}>Automation</span>
            <span className="di-orbit-chip" style={{ "--angle": "315deg" }}>Software</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="di-section">
      <div className="di-container">
        <div className="di-section-head">
          <span className="di-eyebrow">// Servicios</span>
          <h2>Todo lo que tu producto necesita, bajo un mismo estudio.</h2>
          <p className="di-section-sub">
            Seis servicios que cubren el ciclo completo: del descubrimiento a la
            operación. Integrados — no islas.
          </p>
        </div>

        <div className="di-services-grid">
          {SERVICES.map((s) => (
            <article key={s.tag} className="di-service-card">
              <div className="di-service-head">
                <span className="di-service-tag">{s.tag}</span>
                <h3>{s.title}</h3>
              </div>
              <p className="di-service-desc">{s.desc}</p>
              <ul className="di-service-bullets">
                {s.bullets.map((b) => (
                  <li key={b}>
                    <span className="di-bullet-dot"></span>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="proceso" className="di-section di-section-alt">
      <div className="di-container">
        <div className="di-section-head">
          <span className="di-eyebrow">// Proceso</span>
          <h2>Simple, transparente, sin sorpresas.</h2>
          <p className="di-section-sub">
            Un flujo de cuatro etapas. Desde el primer call ya estás viendo avance —
            no al final del proyecto.
          </p>
        </div>

        <div className="di-process">
          <div className="di-process-line"></div>
          {PROCESS.map((p, i) => (
            <div key={p.n} className="di-process-item">
              <div className="di-process-marker">
                <span>{p.n}</span>
              </div>
              <div className="di-process-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="di-process-deliv">
                  <span className="di-mono">entregable →</span> {p.deliv}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="di-section">
      <div className="di-container">
        <div className="di-section-head">
          <span className="di-eyebrow">// Stack</span>
          <h2>Tecnología moderna, decisiones probadas.</h2>
          <p className="di-section-sub">
            Usamos lo que funciona. Elegimos cada herramienta según el problema,
            no según la moda.
          </p>
        </div>

        <div className="di-stack-grid">
          {STACK.map((col) => (
            <div key={col.label} className="di-stack-col">
              <div className="di-stack-label">
                <span className="di-stack-dot"></span>
                <span className="di-mono">{col.label}</span>
              </div>
              <div className="di-stack-chips">
                {col.items.map((t) => (
                  <span key={t} className="di-chip">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="proyectos" className="di-section">
      <div className="di-container">
        <div className="di-section-head">
          <span className="di-eyebrow">// Proyectos</span>
          <h2>Productos en producción.</h2>
          <p className="di-section-sub">
            Una selección de plataformas activas que diseñamos y construimos. Tocá en
            cada una para ver su landing.
          </p>
        </div>

        <div className="di-projects-grid">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="di-project-card"
              aria-label={`${p.name} — Ver proyecto (abre en pestaña nueva)`}
            >
              <div className="di-project-head">
                <div className="di-project-mono" aria-hidden="true">
                  <span>{p.initials}</span>
                </div>
                <div className="di-project-title">
                  <h3>{p.name}</h3>
                  <span className="di-project-status">
                    <span className="di-project-status-dot"></span>
                    {p.status}
                  </span>
                </div>
              </div>
              <p className="di-project-desc">{p.desc}</p>
              <div className="di-project-chips">
                {p.stack.map((t) => (
                  <span key={t} className="di-chip">{t}</span>
                ))}
              </div>
              <span className="di-project-cta">
                Ver proyecto <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="di-section di-section-alt">
      <div className="di-container">
        <div className="di-section-head">
          <span className="di-eyebrow">// FAQ</span>
          <h2>Preguntas que nos hacen seguido.</h2>
          <p className="di-section-sub">
            Si la tuya no está acá, escribinos. Respondemos en menos de 24 hs.
          </p>
        </div>

        <div className="di-faq" role="list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`di-faq-item ${isOpen ? "open" : ""}`} role="listitem">
                <h3 className="di-faq-h">
                  <button
                    className="di-faq-trigger"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`di-faq-panel-${i}`}
                    id={`di-faq-trigger-${i}`}
                  >
                    <span className="di-faq-q">{f.q}</span>
                    <span className="di-faq-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`di-faq-panel-${i}`}
                  className="di-faq-a"
                  role="region"
                  aria-labelledby={`di-faq-trigger-${i}`}
                  hidden={!isOpen}
                >
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section id="casos" className="di-section">
      <div className="di-container">
        <div className="di-section-head">
          <span className="di-eyebrow">// Casos</span>
          <h2>Lo que construimos para clientes reales.</h2>
          <p className="di-section-sub">
            Tres ejemplos del último ciclo. Más casos detallados bajo NDA — los compartimos
            en el primer call si te interesan.
          </p>
        </div>

        <div className="di-cases-grid">
          {CASES.map((c) => (
            <article key={c.tag} className="di-case-card">
              <span className="di-service-tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <div className="di-case-row">
                <span className="di-mono di-case-label">Problema</span>
                <p>{c.challenge}</p>
              </div>
              <div className="di-case-row">
                <span className="di-mono di-case-label">Solución</span>
                <p>{c.outcome}</p>
              </div>
              <div className="di-case-metric">
                <span className="di-gradient-text">{c.metric}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  if (!CLIENTS.length) return null;
  return (
    <section className="di-clients" aria-label="Clientes">
      <div className="di-container">
        <p className="di-clients-label di-mono">// Confían en nosotros</p>
        <div className="di-clients-strip">
          {CLIENTS.map((c) => (
            <img key={c.name} src={c.logo} alt={c.name} loading="lazy" className="di-client-logo" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  return (
    <section id="testimoniales" className="di-section">
      <div className="di-container">
        <div className="di-section-head">
          <span className="di-eyebrow">// Testimoniales</span>
          <h2>Lo que dicen quienes ya trabajaron con nosotros.</h2>
        </div>
        <div className="di-testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="di-testimonial">
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.role} · {t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error | manual
  const [errorMsg, setErrorMsg] = useState("");
  const [startedAt] = useState(() => Date.now());

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: bots completan campos hidden — descartamos si tiene contenido o si tarda <3s.
    if (data.get("website") || Date.now() - startedAt < 3000) {
      setStatus("ok"); // engaño silencioso
      form.reset();
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else if (res.status === 503) {
        setStatus("manual");
      } else {
        const j = await res.json().catch(() => ({}));
        const errorMessages = {
          name_required: "Necesitamos tu nombre para responderte.",
          email_invalid: "Revisá el email — parece tener algún error.",
          message_too_short: "Contanos un poco más sobre tu proyecto (mínimo 10 caracteres).",
          send_failed: "No pudimos enviar el mensaje. Probá los canales directos.",
          invalid_json: "Hubo un problema con el envío. Recargá la página y volvé a intentar.",
        };
        let msg = errorMessages[j.error] || "No pudimos enviar el mensaje. Probá los canales directos.";
        // En preview/dev, mostramos el detalle del provider para facilitar el debug
        if (j.provider_error) {
          const pe = j.provider_error;
          const detail = typeof pe === "string" ? pe : (pe.message || pe.name || JSON.stringify(pe));
          msg += ` [debug: ${detail}]`;
        }
        setErrorMsg(msg);
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg("Sin conexión. Probá los canales directos abajo.");
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="di-form-success" role="status">
        <div className="di-form-success-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3>¡Listo, recibimos tu mensaje!</h3>
        <p>Te respondemos en menos de 24 hs hábiles a tu email.</p>
      </div>
    );
  }

  return (
    <form className="di-form" onSubmit={onSubmit} noValidate>
      <div className="di-form-row">
        <label className="di-form-field">
          <span>Nombre <em aria-hidden="true">*</em></span>
          <input type="text" name="name" required minLength={2} maxLength={80} autoComplete="name" />
        </label>
        <label className="di-form-field">
          <span>Empresa</span>
          <input type="text" name="company" maxLength={120} autoComplete="organization" />
        </label>
      </div>

      <label className="di-form-field">
        <span>Email <em aria-hidden="true">*</em></span>
        <input type="email" name="email" required maxLength={120} autoComplete="email" inputMode="email" />
      </label>

      <div className="di-form-row">
        <label className="di-form-field">
          <span>Tipo de proyecto</span>
          <select name="projectType" defaultValue="">
            <option value="" disabled>Seleccioná uno</option>
            {PROJECT_TYPES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </label>
        <label className="di-form-field">
          <span>Inversión orientativa</span>
          <select name="budget" defaultValue="">
            <option value="" disabled>Seleccioná uno</option>
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="di-form-field">
        <span>Contanos qué necesitás <em aria-hidden="true">*</em></span>
        <textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder="Sumá contexto del problema, plazos si los tenés, y cualquier detalle útil." />
      </label>

      {/* Honeypot para bots — no completar */}
      <div className="di-form-hp" aria-hidden="true">
        <label>No completar este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" className="di-btn di-btn-primary di-form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
        {status !== "sending" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </button>

      {status === "error" && (
        <p className="di-form-msg di-form-msg-error" role="alert">{errorMsg}</p>
      )}
      {status === "manual" && (
        <p className="di-form-msg di-form-msg-warning" role="status">
          El form no está activo todavía. Escribinos directo a{" "}
          <a href="mailto:info@didigitalstudio.com">info@didigitalstudio.com</a>{" "}
          o por WhatsApp abajo.
        </p>
      )}

      <p className="di-form-legal di-mono">
        Al enviar aceptás nuestra{" "}
        <a href="/privacidad">política de privacidad</a>.
      </p>
    </form>
  );
}

function Contact() {
  return (
    <section id="contacto" className="di-section di-section-contact">
      <div className="di-container">
        <div className="di-contact-card">
          <div className="di-contact-left">
            <span className="di-eyebrow">// Contacto</span>
            <h2>
              ¿Tenés una idea?
              <br />
              <span className="di-gradient-text">Hablemos.</span>
            </h2>
            <p>
              Contanos qué necesitás. Respondemos en menos de 24 hs con una
              propuesta concreta y sin compromiso.
            </p>
            <div className="di-contact-meta">
              <div>
                <span className="di-mono di-contact-meta-label">Ubicación</span>
                <span>Buenos Aires · Argentina</span>
              </div>
              <div>
                <span className="di-mono di-contact-meta-label">Horario</span>
                <span>Lun – Vie · 9:00 a 19:00 ART</span>
              </div>
            </div>

            <div className="di-contact-channels">
              <a href="mailto:info@didigitalstudio.com" className="di-channel">
                <span className="di-mono di-channel-label">Email</span>
                <span className="di-channel-value">info@didigitalstudio.com</span>
              </a>
              <a href="https://wa.me/5491169459990?text=Hola%20Lucas%2C%20quiero%20consultar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="di-channel">
                <span className="di-mono di-channel-label">WhatsApp · Comercial · Lucas</span>
                <span className="di-channel-value">+54 9 11 6945 9990</span>
              </a>
              <a href="https://wa.me/5493584248863?text=Hola%20Agust%C3%ADn%2C%20quiero%20consultar%20algo%20t%C3%A9cnico" target="_blank" rel="noopener noreferrer" className="di-channel">
                <span className="di-mono di-channel-label">WhatsApp · Técnico · Agustín</span>
                <span className="di-channel-value">+54 9 358 424 8863</span>
              </a>
              <a href="https://instagram.com/di.digital.studio" target="_blank" rel="noopener noreferrer" className="di-channel">
                <span className="di-mono di-channel-label">Instagram</span>
                <span className="di-channel-value">@di.digital.studio</span>
              </a>
            </div>
          </div>

          <div className="di-contact-right">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="di-footer">
      <div className="di-container di-footer-inner">
        <div className="di-footer-brand">
          <DILogo size={28} />
          <p>Software que impulsa negocios.</p>
        </div>
        <div className="di-footer-meta di-mono">
          <a href="mailto:info@didigitalstudio.com" className="di-footer-link">info@didigitalstudio.com</a>
          <span className="di-footer-sep">·</span>
          <a href="https://instagram.com/di.digital.studio" target="_blank" rel="noopener noreferrer" className="di-footer-link">@di.digital.studio</a>
          <span className="di-footer-sep">·</span>
          <a href="/privacidad" className="di-footer-link">Privacidad</a>
          <span className="di-footer-sep">·</span>
          <a href="/terminos" className="di-footer-link">Términos</a>
          <span className="di-footer-sep">·</span>
          <span>© {new Date().getFullYear()} DI Digital Studio</span>
          <span className="di-footer-sep">·</span>
          <span>Buenos Aires · Argentina</span>
        </div>
      </div>
    </footer>
  );
}

function LandingApp() {
  // Parallax on glows — pausa cuando la pestaña está oculta y respeta reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const glow1 = document.querySelector(".di-glow-1");
    const glow2 = document.querySelector(".di-glow-2");
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    let running = false;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 40;
      ty = (e.clientY / window.innerHeight - 0.5) * 40;
      if (!running) start();
    };
    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (glow1) glow1.style.transform = `translate(${cx}px, ${cy}px)`;
      if (glow2) glow2.style.transform = `translate(${-cx}px, ${-cy}px)`;
      // Detener cuando converge para no consumir CPU innecesario
      if (Math.abs(tx - cx) < 0.05 && Math.abs(ty - cy) < 0.05) {
        running = false;
        raf = null;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        running = false;
        raf = null;
      }
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal on scroll — solo si no hay reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("di-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document
      .querySelectorAll(
        ".di-hero h1, .di-hero-sub, .di-hero-ctas, .di-hero-stats, .di-hero-visual, .di-section-head, .di-service-card, .di-case-card, .di-process-item, .di-stack-col, .di-faq-item, .di-testimonial, .di-contact-card"
      )
      .forEach((el) => {
        el.classList.add("di-reveal");
        obs.observe(el);
      });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="di-grid-bg"></div>
      <div className="di-glow di-glow-1"></div>
      <div className="di-glow di-glow-2"></div>

      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <Process />
        <Stack />
        <Projects />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

window.LandingApp = LandingApp;
