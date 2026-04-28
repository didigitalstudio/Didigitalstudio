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
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
  return (
    <React.Fragment>
      <header className={`di-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="di-nav-inner">
          <a href="#top" className="di-logo-link" onClick={closeMenu}>
            <DILogoMark size={36} animated />
            <span className="di-logo-text">
              DI <span className="di-logo-accent">Digital Studio</span>
            </span>
          </a>
          <nav className="di-nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Proceso</a>
            <a href="#stack">Stack</a>
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
        <nav className="di-mobile-links">
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#proceso" onClick={closeMenu}>Proceso</a>
          <a href="#stack" onClick={closeMenu}>Stack</a>
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
            <div className="di-stat-label">A medida</div>
          </div>
          <div className="di-stat">
            <div className="di-stat-num">&lt; 2 sem</div>
            <div className="di-stat-label">Primer entregable</div>
          </div>
          <div className="di-stat">
            <div className="di-stat-num">24 / 7</div>
            <div className="di-stat-label">Soporte continuo</div>
          </div>
        </div>

        {/* Hero visual — orbit around the logo */}
        <div className="di-hero-visual">
          <div className="di-orbit">
            <div className="di-orbit-ring di-orbit-ring-1"></div>
            <div className="di-orbit-ring di-orbit-ring-2"></div>
            <div className="di-orbit-ring di-orbit-ring-3"></div>
            <div className="di-orbit-center">
              <DILogoMark size={120} animated />
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

        <div className="di-faq">
          {FAQS.map((f, i) => (
            <button
              key={f.q}
              className={`di-faq-item ${open === i ? "open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <div className="di-faq-q">
                <span>{f.q}</span>
                <span className="di-faq-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </div>
              <div className="di-faq-a">
                <p>{f.a}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
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
          </div>

          <div className="di-contact-right">
            <a href="mailto:info@didigitalstudio.com" className="di-contact-link">
              <div className="di-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="di-contact-label">Email</div>
                <div className="di-contact-value">info@didigitalstudio.com</div>
              </div>
              <svg className="di-contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>

            <a href="https://instagram.com/di.digital.studio" target="_blank" rel="noopener" className="di-contact-link">
              <div className="di-contact-icon instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div>
                <div className="di-contact-label">Instagram</div>
                <div className="di-contact-value">@di.digital.studio</div>
              </div>
              <svg className="di-contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>

            <a href="https://wa.me/5493584248863" target="_blank" rel="noopener" className="di-contact-link">
              <div className="di-contact-icon whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div className="di-contact-label">WhatsApp</div>
                <div className="di-contact-value">+54 9 358 424 8863</div>
              </div>
              <svg className="di-contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>

            <a href="https://wa.me/5491169459990" target="_blank" rel="noopener" className="di-contact-link">
              <div className="di-contact-icon whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div className="di-contact-label">WhatsApp</div>
                <div className="di-contact-value">+54 9 11 6945 9990</div>
              </div>
              <svg className="di-contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
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
          <a href="https://instagram.com/di.digital.studio" target="_blank" rel="noopener" className="di-footer-link">
            @di.digital.studio
          </a>
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
  // Parallax on glows
  useEffect(() => {
    const glow1 = document.querySelector(".di-glow-1");
    const glow2 = document.querySelector(".di-glow-2");
    let tx = 0, ty = 0, cx = 0, cy = 0, raf;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 40;
      ty = (e.clientY / window.innerHeight - 0.5) * 40;
    };
    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (glow1) glow1.style.transform = `translate(${cx}px, ${cy}px)`;
      if (glow2) glow2.style.transform = `translate(${-cx}px, ${-cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.addEventListener("mousemove", onMove);
      loop();
    }
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal on scroll (simple)
  useEffect(() => {
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
        ".di-hero h1, .di-hero-sub, .di-hero-ctas, .di-hero-stats, .di-hero-visual, .di-section-head, .di-service-card, .di-process-item, .di-stack-col, .di-faq-item, .di-contact-card"
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
      <main id="top">
        <Hero />
        <Services />
        <Process />
        <Stack />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

window.LandingApp = LandingApp;
