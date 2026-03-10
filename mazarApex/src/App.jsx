import { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import brandLogo from "./assets/brandLogo.png";
import "./App.css";

/* ─── Reveal hook ─────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on];
}

/* ─── Ticker ──────────────────────────────────────────────────────────────── */
function Ticker() {
  const items = ["Facebook Ads", "Instagram Ads", "Lead Generation", "Landing Pages", "Conversion Optimization", "Local Business Growth", "Paid Media Strategy"];
  const repeated = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker__track">
        {repeated.map((t, i) => (
          <span key={i} className="ticker__item">
            {t} <span className="ticker__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Nav ─────────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <nav className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <div className="nav__wrap">
        <button className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={brandLogo} alt="Mazar Apex" className="nav__logo-img" />
        </button>
        <div className={`nav__menu ${open ? "nav__menu--open" : ""}`}>
          {["services", "process", "contact"].map(id => (
            <button key={id} className="nav__link" onClick={() => go(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <button className="nav__cta" onClick={() => go("contact")}>
            Free Strategy Call →
          </button>
        </div>
        <button className="nav__burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={open ? "x" : ""} /><span className={open ? "x" : ""} />
        </button>
      </div>
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= 847) return;
    const t = setTimeout(() => setCount(c => Math.min(c + Math.ceil(Math.random() * 40), 847)), 18);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <section className="hero">
      <div className="hero__eyebrow">
        <span className="hero__tag">— Est. Performance Agency</span>
        <span className="hero__tag">Maryland, USA</span>
      </div>

      <h1 className="hero__headline">
        <span className="hero__line hero__line--1">SOMETHING ELSE</span>
        <span className="hero__line hero__line--2">LOCAL<span className="hero__outline"> BUSINESSES</span></span>
        <span className="hero__line hero__line--3">GENERATE</span>
        <span className="hero__line hero__line--4">MORE <span className="hero__accent">LEADS.</span></span>
      </h1>

      <div className="hero__bottom">
        <div className="hero__desc-block">
          <p className="hero__desc">
            Mazar Apex Marketing specializes in high-performance <strong>Facebook &amp; Instagram advertising</strong> and conversion-optimized landing pages — built to turn ad spend into real revenue for local businesses.
          </p>
          <div className="hero__actions">
            <button className="btn-primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Book a Free Strategy Call
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              See What We Do ↓
            </button>
          </div>
        </div>
        <div className="hero__stat-block">
          <div className="hero__big-stat">
            <span className="hero__big-num">{count.toLocaleString()}+</span>
            <span className="hero__big-label">Leads Generated</span>
          </div>
          <div className="hero__divider" />
          <div className="hero__mini-stats">
            {[["3×", "Avg. ROI on Ad Spend"], ["48h", "Campaign Launch Time"], ["100%", "Local Business Focus"]].map(([n, l]) => (
              <div key={l} className="hero__mini">
                <span className="hero__mini-num">{n}</span>
                <span className="hero__mini-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
}

/* ─── Services ────────────────────────────────────────────────────────────── */
const SVCS = [
  { num: "01", title: "Facebook & Instagram Advertising", desc: "Precision-targeted campaigns that put your offer in front of the exact local buyers who are ready to act — not just scroll.", tags: ["Audience Targeting", "Creative Strategy", "A/B Testing"] },
  { num: "02", title: "Landing Page Creation", desc: "Pages engineered around one goal: conversion. Every headline, button, and layout decision is made to turn traffic into leads.", tags: ["Copywriting", "UX Design", "CRO"] },
  { num: "03", title: "Lead Generation Systems", desc: "End-to-end funnels that capture, qualify, and route warm leads directly to you — with automated follow-up so nothing slips.", tags: ["Funnel Build", "Automation", "CRM Integration"] },
  { num: "04", title: "Conversion Optimization", desc: "Continuous data-driven iteration that drives your cost-per-lead down month after month, turning spend into a predictable engine.", tags: ["Analytics", "Split Testing", "Reporting"] },
];

function ServiceCard({ s, i }) {
  const [ref, on] = useReveal(0.2);
  return (
    <div ref={ref} className={`svc-card reveal ${on ? "revealed" : ""}`} style={{ "--d": `${i * 0.12}s` }}>
      <div className="svc-card__num">{s.num}</div>
      <div className="svc-card__body">
        <h3 className="svc-card__title">{s.title}</h3>
        <p className="svc-card__desc">{s.desc}</p>
        <div className="svc-card__tags">{s.tags.map(t => <span key={t} className="svc-tag">{t}</span>)}</div>
      </div>
      <div className="svc-card__arrow">→</div>
    </div>
  );
}

function Services() {
  const [ref, on] = useReveal();
  return (
    <section className="services" id="services" ref={ref}>
      <div className={`services__header reveal ${on ? "revealed" : ""}`}>
        <span className="section-tag">/ Our Services</span>
        <h2 className="section-heading">WHAT WE<br /><em>ACTUALLY DO</em></h2>
      </div>
      <div className="services__grid">
        {SVCS.map((s, i) => <ServiceCard key={i} s={s} i={i} />)}
      </div>
    </section>
  );
}

/* ─── Process ─────────────────────────────────────────────────────────────── */
const STEPS = [
  { num: "01", phase: "Week 1", title: "Strategy & Research", desc: "We dissect your market, competitors, and ideal customer. You get a bespoke ad blueprint — audiences, offers, creative angles — before a single cent is spent." },
  { num: "02", phase: "Week 2–3", title: "Launch & Optimize", desc: "Campaigns go live. We monitor obsessively, kill what doesn't perform, double down on what does. Real-time dashboards. Daily eyes on your spend." },
  { num: "03", phase: "Week 4+", title: "Scale & Systemize", desc: "With a proven system in place, we scale what's working. Leads flow predictably. Your cost-per-lead drops. You focus on closing — we handle the pipeline." },
];

function ProcessStep({ s, i }) {
  const [ref, on] = useReveal(0.3);
  return (
    <div ref={ref} className={`step reveal ${on ? "revealed" : ""}`} style={{ "--d": `${i * 0.15}s` }}>
      <div className="step__meta">
        <span className="step__num">{s.num}</span>
        <span className="step__phase">{s.phase}</span>
      </div>
      <div className="step__content">
        <h3 className="step__title">{s.title}</h3>
        <p className="step__desc">{s.desc}</p>
      </div>
    </div>
  );
}

function Process() {
  const [ref, on] = useReveal();
  return (
    <section className="process" id="process" ref={ref}>
      <div className={`process__left reveal ${on ? "revealed" : ""}`}>
        <span className="section-tag">/ Our Process</span>
        <h2 className="section-heading">THREE<br />STEPS TO<br /><em>STEADY</em><br />LEADS.</h2>
        <p className="process__sub">No complexity. No fluff. A system that works — and keeps working.</p>
        <button className="btn-primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Start Now →</button>
      </div>
      <div className="process__steps">
        {STEPS.map((s, i) => <ProcessStep key={i} s={s} i={i} />)}
      </div>
    </section>
  );
}

/* ─── CTA Banner ──────────────────────────────────────────────────────────── */
function CtaBanner() {
  const [ref, on] = useReveal();
  return (
    <section className="cta-section" ref={ref}>
      <div className={`cta-section__inner reveal ${on ? "revealed" : ""}`}>
        <div className="cta-section__left">
          <span className="section-tag cta-tag">/ Limited Spots</span>
          <h2 className="cta-section__heading">READY TO GET<br />MORE LEADS<br /><em>THIS MONTH?</em></h2>
        </div>
        <div className="cta-section__right">
          <p className="cta-section__body">Book a free 30-minute strategy call. We'll map out your market, identify the biggest ad opportunities, and show you exactly what it would take to build a consistent lead pipeline — no pressure, no obligation.</p>
          <button className="btn-primary btn-large" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Book Your Free Consultation →
          </button>
          <p className="cta-note">No commitment. No sales pressure. Just strategy.</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────────────────────── */
function Contact() {
  const [ref, on] = useReveal();
  const [state, handleSubmit] = useForm("xwvrvzoa");

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className={`contact__wrap reveal ${on ? "revealed" : ""}`}>
        <div className="contact__left">
          <span className="section-tag">/ Get In Touch</span>
          <h2 className="contact__heading">LET'S BUILD<br />YOUR LEAD<br /><em>MACHINE.</em></h2>
          <div className="contact__links">
            <a href="mailto:mazarapexmarketing@gmail.com" className="contact__link">
              <span className="contact__link-label">EMAIL</span>
              <span className="contact__link-val">mazarapexmarketing@gmail.com</span>
              <span className="contact__link-arrow">↗</span>
            </a>
            <a href="tel:4343277384" className="contact__link">
              <span className="contact__link-label">PHONE</span>
              <span className="contact__link-val">434-327-7384</span>
              <span className="contact__link-arrow">↗</span>
            </a>
          </div>
        </div>

        <div className="contact__right">
          {state.succeeded ? (
            <div className="form-success">
              <div className="form-success__check">✓</div>
              <h3 className="form-success__title">Message Received.</h3>
              <p className="form-success__body">We'll be in touch within one business day to book your free strategy call.</p>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__row">
                <div className="form__field">
                  <label className="form__label" htmlFor="name">Your Name</label>
                  <input className="form__input" id="name" name="name" type="text" placeholder="John Smith" required />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="form__err" />
                </div>
                <div className="form__field">
                  <label className="form__label" htmlFor="email">Email Address</label>
                  <input className="form__input" id="email" name="email" type="email" placeholder="john@example.com" required />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="form__err" />
                </div>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="business">Business Name</label>
                <input className="form__input" id="business" name="business" type="text" placeholder="Your Business LLC" required />
                <ValidationError prefix="Business" field="business" errors={state.errors} className="form__err" />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="message">How Can We Help?</label>
                <textarea className="form__input form__textarea" id="message" name="message" rows={5} placeholder="Tell us about your business goals..." required />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="form__err" />
              </div>
              <button type="submit" className="btn-primary btn-submit" disabled={state.submitting}>
                {state.submitting ? <><span className="spin" /> Sending...</> : "Send Message & Book Call →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo"><img src={brandLogo} alt="Mazar Apex" className="footer__logo-img" /></div>
        <p className="footer__copy">© {new Date().getFullYear()} Mazar Apex Marketing. All rights reserved.</p>
        <p className="footer__tag">Helping local businesses grow with paid ads.</p>
      </div>
    </footer>
  );f
}

/* ─── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Process />
      <CtaBanner />
      <Contact />
      <Footer />
    </>
  );
}