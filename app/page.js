"use client";

import { useState, useEffect, useRef } from "react";

const C = {
  terracotta: "#C4622D",
  terracottaLight: "#D4784A",
  ochre: "#D4952A",
  cream: "#FAF6EF",
  creamDark: "#F0E8D8",
  brown: "#3D2314",
  brownMid: "#6B3D22",
  olive: "#6B7C3F",
  white: "#FFFDF9",
  sand: "#E8D5B0",
  redEarth: "#9C3D1E",
};

const useReveal = () => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
};

const JeepLogo = ({ color = C.white, size = 28 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18 L3 14 L8 14 L10 9 L32 9 L36 14 L47 14 L47 18 L42 18 M18 18 L13 18 M28 18 L23 18 M37 18 L32 18 M42 18 A3 3 0 1 1 36 18 A3 3 0 1 1 42 18 Z M13 18 A3 3 0 1 1 7 18 A3 3 0 1 1 13 18 Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M14 9 L14 13 M22 9 L22 13 M30 9 L30 13" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const Grain = () => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`,
    opacity: 0.5, mixBlendMode: "multiply",
  }} />
);

const NAV = ["Trip", "Pricing", "Reviews", "Booking", "FAQ"];

export default function WildAlgarve() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const total = adults * 59 + kids * 39;
  const totalPeople = adults + kids;

  const goTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const goNext = () => {
    if (step < 3) setStep(step + 1);
    else setConfirmed(true);
  };

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", background: C.cream, color: C.brown, overflowX: "hidden", minHeight: "100vh" }}>
      <Grain />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700;1,900&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        html, body { scroll-behavior: smooth; overflow-x: hidden; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.cream}; }
        ::-webkit-scrollbar-thumb { background: ${C.terracotta}; }

        .nav-link {
          font-family: 'Lora', serif;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          padding: 6px 0;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px; background: currentColor;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .btn {
          background: ${C.terracotta};
          color: ${C.white};
          border: none;
          padding: 18px 36px;
          font-family: 'Lora', serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 320px;
          justify-content: center;
        }
        @media(min-width: 768px) { .btn { width: auto; } }
        .btn::before {
          content: ''; position: absolute; inset: 0;
          background: ${C.brown};
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.7,0,0.3,1);
        }
        .btn:hover::before { transform: scaleX(1); }
        .btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn:disabled::before { display: none; }
        .btn span { position: relative; z-index: 1; }

        .btn-ghost {
          background: transparent;
          border: 1.5px solid currentColor;
          color: inherit;
        }
        .btn-ghost::before { background: currentColor; opacity: 0.1; }

        .ts {
          padding: 14px;
          border: 1.5px solid ${C.sand};
          background: ${C.white};
          cursor: pointer;
          font-family: 'Lora', serif;
          color: ${C.brown};
          transition: all 0.2s;
          text-align: center;
          font-size: 0.85rem;
          line-height: 1.3;
        }
        .ts:hover { border-color: ${C.terracotta}; }
        .ts.active { background: ${C.terracotta}; color: white; border-color: ${C.terracotta}; }
        .ts strong { display: block; font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; }
        .ts span { font-size: 0.7rem; opacity: 0.75; letter-spacing: 0.1em; }

        .cb {
          width: 38px; height: 38px;
          border: 1px solid ${C.sand}; background: ${C.white};
          cursor: pointer; font-size: 1.2rem; color: ${C.brown};
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .cb:hover:not(:disabled) { background: ${C.terracotta}; color: white; border-color: ${C.terracotta}; }
        .cb:disabled { opacity: 0.3; cursor: not-allowed; }

        .input {
          border: 1.5px solid ${C.sand};
          background: ${C.white};
          padding: 14px 16px;
          font-family: 'Lora', serif;
          font-size: 0.95rem;
          color: ${C.brown};
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus { border-color: ${C.terracotta}; }

        .marquee {
          display: flex;
          animation: scroll 40s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fadeIn { animation: fadeInUp 1s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .pulse { animation: pulse 2s ease-in-out infinite; }

        a { color: inherit; text-decoration: none; }

        @media (max-width: 767px) {
          .h-stack-mobile { flex-direction: column !important; }
          .grid-mobile { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {!confirmed && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: C.white,
          padding: "12px 16px",
          borderTop: `1px solid ${C.sand}`,
          zIndex: 998,
          display: isMobile ? "flex" : "none",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          boxShadow: "0 -4px 24px rgba(61,35,20,0.1)",
        }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: C.terracotta }}>From €59</div>
            <div style={{ fontSize: "0.7rem", color: C.brownMid, letterSpacing: "0.08em", textTransform: "uppercase" }}>3h Safari · 7 max</div>
          </div>
          <button onClick={() => goTo("booking")} style={{
            background: C.terracotta, color: "white", border: "none",
            padding: "14px 24px", fontFamily: "'Lora', serif",
            fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.14em",
            textTransform: "uppercase", cursor: "pointer", flex: "0 0 auto",
          }}>Book Now</button>
        </div>
      )}

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "14px 24px" : "22px 24px",
        background: scrolled ? "rgba(250,246,239,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.sand}` : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <JeepLogo color={scrolled ? C.brown : C.white} size={32} />
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700,
            color: scrolled ? C.brown : C.white,
            letterSpacing: "0.01em",
          }}>
            Wild<span style={{ color: C.terracotta }}>.</span>Algarve
          </div>
        </div>

        <div style={{ display: isMobile ? "none" : "flex", gap: "32px", color: scrolled ? C.brown : C.white }}>
          {NAV.map(i => (
            <span key={i} className="nav-link" onClick={() => goTo(i.toLowerCase())}>{i}</span>
          ))}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: isMobile ? "flex" : "none",
          background: "none", border: "none", cursor: "pointer",
          flexDirection: "column", gap: "5px", padding: "8px",
        }}>
          <span style={{ width: "22px", height: "1.5px", background: scrolled ? C.brown : C.white, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: "22px", height: "1.5px", background: scrolled ? C.brown : C.white, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: "22px", height: "1.5px", background: scrolled ? C.brown : C.white, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: C.brown,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.4s ease",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "32px",
      }}>
        {NAV.map((i, idx) => (
          <span key={i} className="nav-link" style={{
            color: C.white,
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "0",
            textTransform: "none",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.5s ease ${0.1 + idx * 0.06}s`,
          }} onClick={() => goTo(i.toLowerCase())}>{i}</span>
        ))}
        <div style={{ position: "absolute", bottom: "60px", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Albufeira, Portugal
        </div>
      </div>

      <section id="hero" style={{
        minHeight: "100vh",
        position: "relative",
        background: `linear-gradient(170deg, ${C.brown} 0%, #5C2F18 35%, ${C.redEarth} 65%, ${C.terracotta} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        paddingTop: "100px",
        paddingBottom: isMobile ? "100px" : "8%",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 60%, rgba(212,149,42,0.25) 0%, transparent 60%), radial-gradient(ellipse at 90% 20%, rgba(196,98,45,0.3) 0%, transparent 50%)`,
        }} />

        <div style={{
          position: "absolute", bottom: "-3%", left: "-2%", right: "-2%",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(120px, 28vw, 380px)",
          fontWeight: 900, fontStyle: "italic",
          color: "rgba(0,0,0,0.18)",
          lineHeight: 0.85, userSelect: "none", pointerEvents: "none",
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}>
          Algarve
        </div>

        <div style={{ position: "absolute", top: "20%", right: "8%", width: "1px", height: "120px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))" }} />
        <div style={{ position: "absolute", top: "32%", right: "8%", color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.3em", writingMode: "vertical-lr", textTransform: "uppercase" }}>
          Est. Albufeira
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "0 24px" : "0 8%", maxWidth: "1200px", width: "100%" }}>
          <div className="fadeIn" style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ width: "32px", height: "1px", background: C.ochre }} />
            <span style={{ color: C.ochre, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Off-road · Albufeira
            </span>
          </div>

          <h1 className="fadeIn" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(54px, 11vw, 140px)",
            fontWeight: 900,
            color: C.white,
            lineHeight: 0.92,
            letterSpacing: "-0.025em",
            marginBottom: "32px",
            animationDelay: "0.15s",
          }}>
            Algarve,<br />
            <span style={{ fontStyle: "italic", color: C.ochre, fontWeight: 700 }}>off the road.</span>
          </h1>

          <p className="fadeIn" style={{
            color: "rgba(255,255,255,0.78)",
            fontSize: isMobile ? "1rem" : "1.1rem",
            lineHeight: 1.7,
            maxWidth: "540px",
            marginBottom: "44px",
            animationDelay: "0.3s",
          }}>
            Skip the tourist traps and hop in our old-school UMM Jeep for a 3-hour off-road ride through the wild Algarve. Small group of 7, real backroads, proper fun.
          </p>

          <div className="fadeIn h-stack-mobile" style={{ display: "flex", gap: "14px", flexWrap: "wrap", animationDelay: "0.45s" }}>
            <button className="btn" onClick={() => goTo("booking")}>
              <span>Book your ride →</span>
            </button>
            <button className="btn btn-ghost" onClick={() => goTo("trip")} style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.3)" }}>
              <span>What's it like?</span>
            </button>
          </div>

          <div className="fadeIn h-stack-mobile" style={{
            display: "flex", gap: isMobile ? "24px" : "56px",
            marginTop: "60px", paddingTop: "36px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            animationDelay: "0.6s",
          }}>
            {[["3h", "Trip duration"], ["7", "Small group max"], ["€59", "From, per adult"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 700, color: C.white, lineHeight: 1 }}>{v}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "8px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {!isMobile && (
          <div className="pulse" style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            ↓ scroll
          </div>
        )}
      </section>

      <div style={{ background: C.brown, padding: "20px 0", overflow: "hidden", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div className="marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "60px", paddingRight: "60px" }}>
              {["3h ride", "Old-school UMM Jeep", "Backroads only", "Small group · 7 max", "Albufeira pickup", "From €59", "No tourist traps", "Real Algarve"].map((t, j) => (
                <span key={j} style={{ display: "flex", alignItems: "center", gap: "60px", color: C.ochre, fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontStyle: "italic", whiteSpace: "nowrap" }}>
                  {t}
                  <span style={{ color: C.terracotta, fontSize: "1rem" }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="trip" style={{ padding: isMobile ? "80px 24px" : "140px 8%", background: C.cream }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", background: C.terracotta }} />
              <span style={{ color: C.terracotta, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Inside the Jeep</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 7vw, 84px)",
              fontWeight: 700, lineHeight: 1, marginBottom: "40px",
              color: C.brown, letterSpacing: "-0.02em",
            }}>
              No glass.<br />No roof.<br /><em style={{ color: C.terracotta }}>Just dust.</em>
            </h2>
          </Reveal>

          <div className="grid-mobile" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "60px", alignItems: "start", marginTop: "48px" }}>
            <Reveal>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: C.brownMid, marginBottom: "20px" }}>
                Hop into our UMM — a proper Portuguese 4×4, built tough back in the day for the army. We pull off the canvas top, hit the dirt, and head into the hills behind Albufeira.
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: C.brownMid }}>
                You'll feel the wind, smell the wild herbs, and see the bits of the Algarve no tour bus ever shows you. Three hours that fly by.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{
                background: C.white,
                padding: isMobile ? "32px 24px" : "44px 36px",
                position: "relative",
                boxShadow: "0 4px 24px rgba(61,35,20,0.06)",
              }}>
                <div style={{ position: "absolute", top: "-1px", left: 0, width: "60px", height: "3px", background: C.terracotta }} />
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.terracotta, marginBottom: "20px" }}>What you get</div>

                {[
                  ["3-hour off-road ride", "From Albufeira into the hills"],
                  ["Open-top UMM Jeep", "Authentic Portuguese 4×4"],
                  ["Small group, max 7", "No crowds, plenty of room"],
                  ["English-speaking guide", "Local stories included"],
                  ["Stops & viewpoints", "Plenty of time for photos"],
                ].map(([t, s], i) => (
                  <div key={t} style={{
                    display: "flex", alignItems: "flex-start", gap: "16px",
                    padding: "18px 0",
                    borderBottom: i < 4 ? `1px solid ${C.sand}` : "none",
                  }}>
                    <div style={{
                      width: "26px", height: "26px", flexShrink: 0,
                      borderRadius: "50%", background: C.cream,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: C.terracotta, fontSize: "0.75rem", fontWeight: 700,
                      fontFamily: "'Playfair Display', serif",
                    }}>0{i + 1}</div>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: C.brown }}>{t}</div>
                      <div style={{ fontSize: "0.85rem", color: C.brownMid, marginTop: "2px" }}>{s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: isMobile ? "80px 24px" : "140px 8%", background: C.creamDark }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "28px", height: "1px", background: C.terracotta }} />
                <span style={{ color: C.terracotta, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Pricing</span>
                <div style={{ width: "28px", height: "1px", background: C.terracotta }} />
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 6vw, 68px)",
                fontWeight: 700, color: C.brown, lineHeight: 1, letterSpacing: "-0.02em",
              }}>
                Two prices.<br /><em>That's it.</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              { label: "Adults", price: "€59", desc: "Per person", featured: true },
              { label: "Under 12", price: "€39", desc: "Per child", featured: false },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i * 0.1}>
                <div style={{
                  background: p.featured ? C.terracotta : C.white,
                  padding: isMobile ? "36px 28px" : "52px 40px",
                  position: "relative",
                  boxShadow: p.featured ? "0 20px 50px rgba(196,98,45,0.3)" : "0 4px 20px rgba(61,35,20,0.06)",
                  height: "100%",
                }}>
                  <div style={{
                    fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase",
                    color: p.featured ? "rgba(255,255,255,0.75)" : C.terracotta, marginBottom: "12px",
                  }}>{p.label}</div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(56px, 9vw, 84px)",
                    fontWeight: 700, lineHeight: 0.95,
                    color: p.featured ? C.white : C.brown,
                  }}>{p.price}</div>
                  <div style={{ fontSize: "0.9rem", color: p.featured ? "rgba(255,255,255,0.7)" : C.brownMid, marginTop: "8px" }}>{p.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div style={{ marginTop: "32px", padding: "24px", background: C.white, fontSize: "0.85rem", color: C.brownMid, lineHeight: 1.7, textAlign: isMobile ? "left" : "center" }}>
              Max 7 guests per ride. <strong style={{ color: C.brown }}>Not suitable for children under 4.</strong> Pickup from Albufeira included. Water and snacks on board.
            </div>
          </Reveal>
        </div>
      </section>

      <section id="reviews" style={{ padding: isMobile ? "80px 24px" : "140px 8%", background: C.brown, color: C.white, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: `radial-gradient(circle at right, rgba(196,98,45,0.18) 0%, transparent 70%)` }} />

        <div style={{
          position: "absolute", top: "60px", right: "5%",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(200px, 35vw, 500px)",
          color: "rgba(255,255,255,0.04)",
          fontWeight: 900, lineHeight: 0.8,
          fontStyle: "italic", pointerEvents: "none", userSelect: "none",
        }}>"</div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", background: C.ochre }} />
              <span style={{ color: C.ochre, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>From our riders</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 7vw, 84px)",
              fontWeight: 700, color: C.white, lineHeight: 1,
              marginBottom: "60px", letterSpacing: "-0.02em",
            }}>
              Word of mouth<br />from <em style={{ color: C.ochre }}>across the pond.</em>
            </h2>
          </Reveal>

          <div className="grid-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[
              {
                title: "Best afternoon of the trip",
                text: "Booked this on a whim and ended up being the highlight of our holiday. The Jeep is properly old-school and our guide knew all the spots. Way better than another beach day.",
                name: "Emma R.",
                from: "Manchester",
              },
              {
                title: "Forget the tourist stuff",
                text: "Honestly the only authentic thing we did all week. Bumpy, dusty, brilliant. Saw bits of the Algarve I didn't know existed. The lads loved it.",
                name: "James T.",
                from: "London",
              },
              {
                title: "Took my dad for his birthday",
                text: "Picked us up right in Albufeira, top off the Jeep, and off we went. Three hours flew by. Dad hasn't stopped talking about it since we got back to Brighton.",
                name: "Sarah W.",
                from: "Brighton",
              },
              {
                title: "Proper fun, proper local",
                text: "Was looking for something different from the all-inclusive resort scene and this nailed it. Small group, good vibes, proper local guide. Cracking views too.",
                name: "Daniel K.",
                from: "Bristol",
              },
              {
                title: "Cannae recommend enough",
                text: "Booked last minute and so glad we did. The UMM is a beast, the route is class, and our driver had us laughing the whole way. Wee bit chilly heading back so bring a jacket!",
                name: "Fiona M.",
                from: "Edinburgh",
              },
              {
                title: "Worth every euro",
                text: "Everything you want from a tour: small group, no rushing, off the beaten track. Saw cork forests, tiny villages, the lot. Genuinely brilliant afternoon out.",
                name: "Oliver H.",
                from: "Leeds",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={(i % 3) * 0.1}>
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  padding: isMobile ? "32px 24px" : "36px 32px",
                  height: "100%",
                  borderTop: `2px solid ${C.terracotta}`,
                  display: "flex", flexDirection: "column",
                }}>
                  <div style={{ color: C.ochre, marginBottom: "16px", letterSpacing: "0.15em" }}>★★★★★</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: C.white, marginBottom: "14px", fontStyle: "italic" }}>"{t.title}"</div>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "24px", flex: 1 }}>{t.text}</p>
                  <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ color: C.white, fontFamily: "'Playfair Display', serif", fontSize: "0.95rem" }}>— {t.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "3px" }}>{t.from}, UK</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" style={{ padding: isMobile ? "80px 24px" : "140px 8%", background: C.cream }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "28px", height: "1px", background: C.terracotta }} />
                <span style={{ color: C.terracotta, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Booking</span>
                <div style={{ width: "28px", height: "1px", background: C.terracotta }} />
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 700, color: C.brown, lineHeight: 1, letterSpacing: "-0.02em",
              }}>
                Hop on.<br /><em style={{ color: C.terracotta }}>Three steps.</em>
              </h2>
            </div>
          </Reveal>

          {!confirmed ? (
            <Reveal>
              <div style={{ display: "flex", marginBottom: "32px", gap: "8px" }}>
                {[1, 2, 3].map(n => (
                  <div key={n} style={{
                    flex: 1, height: "4px",
                    background: step >= n ? C.terracotta : C.sand,
                    transition: "background 0.4s ease",
                  }} />
                ))}
              </div>

              <div style={{
                background: C.white,
                padding: isMobile ? "28px 20px" : "44px 40px",
                boxShadow: "0 4px 28px rgba(61,35,20,0.06)",
              }}>
                {step === 1 && (
                  <div>
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.terracotta, marginBottom: "8px" }}>Step 1 of 3</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: "28px", color: C.brown }}>When are you coming?</h3>

                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.brownMid, marginBottom: "10px" }}>Pick a date</label>
                    <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} style={{ marginBottom: "28px" }} />

                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.brownMid, marginBottom: "10px" }}>Pick a time slot</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {[
                        { v: "13:00", label: "Afternoon", time: "1pm – 4pm" },
                        { v: "17:00", label: "Sunset", time: "5pm – 8pm" },
                      ].map(t => (
                        <button key={t.v} className={`ts ${time === t.v ? "active" : ""}`} onClick={() => setTime(t.v)}>
                          <strong>{t.label}</strong>
                          <span>{t.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.terracotta, marginBottom: "8px" }}>Step 2 of 3</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: "28px", color: C.brown }}>Who's joining?</h3>

                    {[
                      { label: "Adults", sub: "€59 each", val: adults, set: setAdults, min: 1 },
                      { label: "Under 12", sub: "€39 each", val: kids, set: setKids, min: 0 },
                    ].map(({ label, sub, val, set, min }) => (
                      <div key={label} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "20px 0", borderBottom: `1px solid ${C.sand}`,
                      }}>
                        <div>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: C.brown }}>{label}</div>
                          <div style={{ fontSize: "0.8rem", color: C.brownMid, marginTop: "2px" }}>{sub}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <button className="cb" onClick={() => set(Math.max(min, val - 1))} disabled={val <= min}>−</button>
                          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", minWidth: "28px", textAlign: "center" }}>{val}</span>
                          <button className="cb" onClick={() => totalPeople < 7 && set(val + 1)} disabled={totalPeople >= 7}>+</button>
                        </div>
                      </div>
                    ))}

                    {totalPeople >= 7 && (
                      <p style={{ marginTop: "14px", fontSize: "0.8rem", color: C.terracotta }}>
                        That's the max — 7 per ride. Bigger group? <a href="https://wa.me/33651581703" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Message us on WhatsApp</a>.
                      </p>
                    )}

                    <div style={{ marginTop: "24px", padding: "20px", background: C.cream, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.8rem", color: C.brownMid, letterSpacing: "0.1em", textTransform: "uppercase" }}>Total</span>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: C.terracotta }}>€{total}</span>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.terracotta, marginBottom: "8px" }}>Step 3 of 3</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: "28px", color: C.brown }}>Almost there.</h3>

                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.brownMid, marginBottom: "10px" }}>Your name</label>
                    <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" style={{ marginBottom: "28px" }} />

                    <div style={{ background: C.cream, padding: "24px", marginBottom: "20px" }}>
                      {[
                        ["Date", date || "—"],
                        ["Time", time === "13:00" ? "Afternoon (1pm – 4pm)" : time === "17:00" ? "Sunset (5pm – 8pm)" : "—"],
                        ["Adults", `${adults} × €59`],
                        ...(kids > 0 ? [["Under 12", `${kids} × €39`]] : []),
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.9rem" }}>
                          <span style={{ color: C.brownMid }}>{k}</span>
                          <span style={{ color: C.brown, fontWeight: 500 }}>{v}</span>
                        </div>
                      ))}
                      <div style={{ height: "1px", background: C.sand, margin: "16px 0" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: C.brown }}>Total</span>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: C.terracotta }}>€{total}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.8rem", color: C.brownMid, lineHeight: 1.6 }}>
                      Hit confirm and we'll send a WhatsApp to lock in your spot. Payment in cash or by card on the day.
                    </p>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", alignItems: "center", gap: "12px" }}>
                  {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} style={{
                      background: "none", border: "none", fontFamily: "'Lora', serif",
                      fontSize: "0.8rem", color: C.brownMid, cursor: "pointer",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>← Back</button>
                  ) : <div />}
                  <button className="btn" onClick={goNext} disabled={(step === 1 && (!date || !time)) || (step === 3 && !name)} style={{ flex: isMobile ? 1 : "0 0 auto", maxWidth: isMobile ? "none" : "320px" }}>
                    <span>{step === 3 ? "Confirm booking →" : "Continue →"}</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div style={{
                background: C.white, padding: isMobile ? "44px 24px" : "60px 40px",
                textAlign: "center", boxShadow: "0 4px 28px rgba(61,35,20,0.06)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: C.terracotta }} />
                <div style={{ display: "inline-flex", marginBottom: "24px", padding: "16px", borderRadius: "50%", background: C.cream }}>
                  <JeepLogo color={C.terracotta} size={48} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 40px)", color: C.brown, marginBottom: "16px", lineHeight: 1.1 }}>
                  See you {name ? name.split(" ")[0] : "there"}, <em style={{ color: C.terracotta }}>safe and sound.</em>
                </h3>
                <p style={{ color: C.brownMid, lineHeight: 1.7, marginBottom: "32px", fontSize: "0.95rem" }}>
                  We'll WhatsApp you within 24h to confirm your spot and the exact pickup point.
                </p>
                <div style={{ background: C.cream, padding: "24px", display: "inline-block", textAlign: "left" }}>
                  <div style={{ fontSize: "0.7rem", color: C.brownMid, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "6px" }}>Your ride</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: C.brown }}>
                    {date} · {time === "13:00" ? "1pm" : "5pm"}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: C.terracotta, marginTop: "4px" }}>{adults} adult{adults > 1 ? "s" : ""}{kids > 0 ? ` + ${kids} kid${kids > 1 ? "s" : ""}` : ""} · €{total}</div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section id="route" style={{ padding: isMobile ? "80px 24px" : "140px 8%", background: C.creamDark, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", background: C.terracotta }} />
              <span style={{ color: C.terracotta, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>The route</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 7vw, 84px)",
              fontWeight: 700, lineHeight: 1, marginBottom: "60px",
              color: C.brown, letterSpacing: "-0.02em",
            }}>
              Where we<br /><em style={{ color: C.terracotta }}>take you.</em>
            </h2>
          </Reveal>

          <div style={{ position: "relative" }}>
            {[
              { num: "01", place: "Albufeira", desc: "Pickup right in town. Hop in, top comes off, off we go." },
              { num: "02", place: "Up into the hills", desc: "Quick climb out of town and onto the dirt tracks. Welcome to the real Algarve." },
              { num: "03", place: "Cork forests & hidden villages", desc: "Old whitewashed hamlets, cork oak trees, wild herbs. Stops for photos." },
              { num: "04", place: "The viewpoint", desc: "Our spot. Big view over the coast. Best at sunset on the 5pm trip." },
            ].map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "60px 1fr" : "120px 200px 1fr",
                  gap: isMobile ? "16px" : "32px",
                  padding: isMobile ? "28px 0" : "36px 0",
                  borderTop: `1px solid ${C.sand}`,
                  alignItems: "start",
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile ? "2rem" : "3.5rem",
                    fontWeight: 900, color: C.terracotta, lineHeight: 0.9,
                    fontStyle: "italic",
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile ? "1.3rem" : "1.8rem",
                    fontWeight: 600, color: C.brown,
                    gridColumn: isMobile ? "2 / 3" : "auto",
                  }}>{s.place}</div>
                  {!isMobile && (
                    <div style={{ fontSize: "1rem", color: C.brownMid, lineHeight: 1.7, paddingTop: "10px" }}>{s.desc}</div>
                  )}
                  {isMobile && (
                    <div style={{ gridColumn: "2 / 3", fontSize: "0.95rem", color: C.brownMid, lineHeight: 1.7, marginTop: "6px" }}>{s.desc}</div>
                  )}
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: `1px solid ${C.sand}` }} />
          </div>
        </div>
      </section>

      <section id="faq" style={{ padding: isMobile ? "80px 24px" : "140px 8%", background: C.cream }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "28px", height: "1px", background: C.terracotta }} />
                <span style={{ color: C.terracotta, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>FAQ</span>
                <div style={{ width: "28px", height: "1px", background: C.terracotta }} />
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 700, color: C.brown, lineHeight: 1, letterSpacing: "-0.02em",
              }}>
                Quick <em style={{ color: C.terracotta }}>answers.</em>
              </h2>
            </div>
          </Reveal>

          <FAQList />

          <Reveal delay={0.3}>
            <div style={{
              marginTop: "56px", padding: isMobile ? "32px 24px" : "44px",
              background: C.brown, color: C.white, textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: "12px" }}>
                Got another question?
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px", fontSize: "0.95rem" }}>
                Easiest is WhatsApp — we usually reply within an hour.
              </p>
              <a href="https://wa.me/33651581703" target="_blank" rel="noreferrer" className="btn" style={{ background: C.terracotta }}>
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer style={{
        background: C.brown,
        padding: isMobile ? "60px 24px 32px" : "80px 8% 40px",
        color: "rgba(255,255,255,0.65)",
        paddingBottom: isMobile ? "100px" : "40px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="grid-mobile" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <JeepLogo color={C.white} size={32} />
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: C.white }}>
                  Wild<span style={{ color: C.terracotta }}>.</span>Algarve
                </div>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "320px" }}>
                Off-road safari trips through the wild Algarve in an old-school UMM Jeep. Small groups, real backroads, proper fun.
              </p>
            </div>

            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.ochre, marginBottom: "16px" }}>Get in touch</div>
              <div style={{ fontSize: "0.95rem", lineHeight: 2.2 }}>
                <a href="https://wa.me/33651581703" target="_blank" rel="noreferrer" style={{ display: "block" }}>
                  WhatsApp · +33 6 51 58 17 03
                </a>
                <a href="mailto:wild.algarve@gmail.com" style={{ display: "block" }}>
                  wild.algarve@gmail.com
                </a>
                <a href="https://instagram.com/wild.algarve" target="_blank" rel="noreferrer" style={{ display: "block" }}>
                  Instagram · @wild.algarve
                </a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.ochre, marginBottom: "16px" }}>When we ride</div>
              <div style={{ fontSize: "0.95rem", lineHeight: 2.2 }}>
                <div>Albufeira, Portugal</div>
                <div>Daily · 1pm and 5pm</div>
                <div style={{ color: C.terracotta }}>Year-round</div>
              </div>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "20px" }} />
          <div className="h-stack-mobile" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "0.78rem" }}>
            <span>© 2025 Wild Algarve. All rights reserved.</span>
            <span>Made in Portugal.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FAQList() {
  const [open, setOpen] = useState(0);
  const items = [
    {
      q: "What should I bring?",
      a: "Just a light jacket — once we pull the canvas top off, the wind can get a bit fresh, especially on the 5pm sunset ride. Sunglasses, a hat and a camera are great too. Water and snacks are on us.",
    },
    {
      q: "Is there a minimum age?",
      a: "Yes, no children under 4 — the dirt roads get bumpy and we want everyone safe. Kids 4 and up love it. Family bookings welcome.",
    },
    {
      q: "Do you pick us up from our hotel?",
      a: "Pickup point is in central Albufeira. Once you book, we send the exact spot on WhatsApp — it's a 5–10 min walk from most central hotels.",
    },
    {
      q: "What if it rains?",
      a: "Algarve weather is mostly sunshine, but if it really pours we'll reschedule for free or refund you fully. We'll WhatsApp you the morning of if there's any doubt.",
    },
    {
      q: "Can I book the whole Jeep for my group?",
      a: "Yes. Up to 7 people. Just message us on WhatsApp and we'll sort a private group price.",
    },
    {
      q: "Do you speak English?",
      a: "Of course. All our guides are fluent — most of our riders are British so you'll feel right at home.",
    },
    {
      q: "How fit do I need to be?",
      a: "Not very. You're sitting in a Jeep the whole time. As long as you can climb in and out and handle a bumpy ride, you're good.",
    },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${C.sand}` }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: "100%", background: "none", border: "none",
              padding: "24px 0", display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", gap: "20px", cursor: "pointer", textAlign: "left",
            }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 600, color: C.brown }}>
              {item.q}
            </span>
            <span style={{
              fontSize: "1.6rem", color: C.terracotta, lineHeight: 0.8,
              transform: open === i ? "rotate(45deg)" : "rotate(0)",
              transition: "transform 0.3s ease", flexShrink: 0,
              fontFamily: "'Playfair Display', serif",
            }}>+</span>
          </button>
          <div style={{
            maxHeight: open === i ? "300px" : "0",
            overflow: "hidden",
            transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <p style={{ paddingBottom: "24px", color: C.brownMid, lineHeight: 1.7, fontSize: "0.98rem", paddingRight: "32px" }}>
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
