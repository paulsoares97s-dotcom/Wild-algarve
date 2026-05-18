"use client";

import { useState, useEffect, useRef } from "react";

const C = {
  terracotta: "#C4622D",
  terracottaLight: "#D4784A",
  terracottaDeep: "#9C3D1E",
  ochre: "#D4952A",
  cream: "#FAF6EF",
  creamDark: "#F0E8D8",
  brown: "#3D2314",
  brownMid: "#6B3D22",
  white: "#FFFDF9",
  sand: "#E8D5B0",
  turquoise: "#00B4D8",
  turquoiseLight: "#48CAE4",
  turquoiseDark: "#0077B6",
};

const NAV = ["Trip", "Pricing", "Reviews", "Booking", "FAQ"];

export default function WildAlgarve() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const hero = document.querySelector('[data-hero]');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setStickyVisible(rect.bottom < 0);
      }
    };
    onResize();
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const total = adults * 39 + kids * 25;

  const goTo = (sel) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const goNext = () => {
    if (step < 3) setStep(step + 1);
    else setConfirmed(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.cream, color: C.brown, overflowX: "hidden", paddingBottom: isMobile ? "80px" : "0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,900&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        ::selection { background: ${C.terracotta}; color: ${C.white}; }
        :focus-visible { outline: 2px solid ${C.terracotta}; outline-offset: 3px; border-radius: 4px; }
        .marquee-track { animation: marquee 35s linear infinite; will-change: transform; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .stops-scroll::-webkit-scrollbar { display: none; }
        details summary::-webkit-details-marker { display: none; }
        details summary { list-style: none; }
        .feat-card, .price-card, .test-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease; }
        .feat-card:hover, .test-card:hover { border-color: ${C.terracotta}; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(61,35,20,0.1); }
        .price-card:hover { transform: translateY(-4px); }
        .btn { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .btn:hover { transform: translateY(-2px); }
        .faq-item summary { transition: color 0.3s ease; }
        .faq-item:hover summary { color: ${C.terracotta}; }
        .faq-item[open] .faq-icon { transform: rotate(45deg); }
        .faq-icon { transition: transform 0.3s ease; }
      `}</style>

      {/* STICKY CTA MOBILE */}
      {isMobile && !confirmed && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: C.white, padding: "12px 16px",
          borderTop: `1px solid ${C.sand}`, zIndex: 998,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
          boxShadow: "0 -4px 24px rgba(61,35,20,0.1)",
          transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "1.1rem", color: C.terracotta, fontWeight: 600, lineHeight: 1.2 }}>
              From <strong style={{ fontWeight: 900, fontSize: "1.3rem" }}>39€</strong>
            </div>
            <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", color: C.brownMid, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginTop: "2px" }}>
              3h30 ride · 7 max
            </div>
          </div>
          <button onClick={() => goTo("#booking")} className="btn" style={{
            background: C.terracotta, color: C.white, border: "none",
            padding: "14px 24px", fontFamily: "'Archivo', sans-serif",
            fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", cursor: "pointer", borderRadius: "999px",
            boxShadow: "0 2px 12px rgba(196,98,45,0.3)",
          }}>Book Now</button>
        </div>
      )}

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "12px 5%" : "14px 5%",
        background: scrolled ? "rgba(61, 35, 20, 0.95)" : "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }}>
          <img src="/v3-logo.png" alt="Wild-Algarve" style={{ height: scrolled ? "32px" : (isMobile ? "36px" : "44px"), width: "auto", display: "block", transition: "height 0.4s ease" }} />
        </div>
        {!isMobile && (
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {NAV.map(item => (
              <a key={item} onClick={() => goTo("#" + item.toLowerCase())} style={{
                fontFamily: "'Archivo', sans-serif", fontSize: "0.78rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer",
                color: C.white, padding: "6px 0",
              }}>{item}</a>
            ))}
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMenuOpen(true)} style={{
            display: "flex", flexDirection: "column", gap: "5px",
            background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            cursor: "pointer", padding: 0, width: "38px", height: "38px",
            borderRadius: "12px", justifyContent: "center", alignItems: "center",
          }}>
            <span style={{ width: "16px", height: "2px", background: C.white, borderRadius: "2px" }} />
            <span style={{ width: "16px", height: "2px", background: C.white, borderRadius: "2px" }} />
            <span style={{ width: "16px", height: "2px", background: C.white, borderRadius: "2px" }} />
          </button>
        )}
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: C.brown, zIndex: 999,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "24px", padding: "20px",
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: "absolute", top: "20px", right: "20px",
            background: "transparent", border: "none", color: C.white,
            fontSize: "2rem", cursor: "pointer", padding: 0, lineHeight: 1,
          }}>×</button>
          {NAV.map(item => (
            <a key={item} onClick={() => goTo("#" + item.toLowerCase())} style={{
              fontFamily: "'Archivo', sans-serif", fontSize: "2rem", fontWeight: 800,
              color: C.cream, cursor: "pointer", letterSpacing: "-0.02em",
            }}>{item}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section data-hero id="trip" style={{ position: "relative", overflow: "hidden", background: C.brown, display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative", width: "100%", height: isMobile ? "75vh" : "90vh", overflow: "hidden" }}>
          <picture>
            <source media="(min-width: 768px)" srcSet="/v3-hero-desktop.jpeg" />
            <source media="(max-width: 767px)" srcSet="/v3-hero-mobile.jpeg" />
            <img src="/v3-hero-desktop.jpeg" alt="Wild Algarve UMM Jeep" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
          </picture>
          <div style={{
            position: "absolute", inset: 0, zIndex: 2,
            background: `linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 12%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 70%, rgba(61,35,20,0.5) 92%, ${C.brown} 100%)`,
          }} />
          <div style={{ position: "absolute", top: isMobile ? "76px" : "110px", left: 0, right: 0, zIndex: 10, padding: isMobile ? "0 20px" : "0 5%" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px",
              color: C.ochre, fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem",
              letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700,
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}>
              <span style={{ display: "inline-block", width: "24px", height: "2px", background: C.ochre, borderRadius: "2px" }} />
              Off-road · Albufeira
            </div>
            <h1 style={{
              fontFamily: "'Archivo', sans-serif", fontWeight: 900, color: C.white,
              lineHeight: 0.92, letterSpacing: "-0.03em",
              fontSize: isMobile ? "clamp(52px, 14vw, 130px)" : "clamp(80px, 9vw, 140px)",
              marginBottom: isMobile ? "24px" : "32px",
              textShadow: "0 2px 24px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)",
            }}>
              Algarve,<br/>
              <em style={{ color: C.ochre, fontStyle: "italic", fontWeight: 800, display: "block", textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)" }}>off the road.</em>
            </h1>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button onClick={() => goTo("#booking")} className="btn" style={{
                padding: isMobile ? "12px 20px" : "16px 28px", border: "none", borderRadius: "999px",
                fontFamily: "'Archivo', sans-serif", fontSize: isMobile ? "0.8rem" : "0.95rem",
                fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "6px", textTransform: "uppercase",
                background: C.terracotta, color: C.white, boxShadow: "0 4px 16px rgba(196,98,45,0.4)",
              }}>Book your ride →</button>
              <button onClick={() => goTo("#trip-detail")} className="btn" style={{
                padding: isMobile ? "12px 20px" : "16px 28px", borderRadius: "999px",
                fontFamily: "'Archivo', sans-serif", fontSize: isMobile ? "0.8rem" : "0.95rem",
                fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", textTransform: "uppercase",
                background: "rgba(255,255,255,0.12)", color: C.white,
                border: "1.5px solid rgba(255,255,255,0.4)",
                backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              }}>What's it like?</button>
            </div>
          </div>
        </div>
        <div style={{
          background: C.brown, padding: isMobile ? "24px 20px" : "36px 5%",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: isMobile ? "12px" : "32px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          {[
            { value: "3h30", label: "Duration" },
            { value: "7", label: "Mates max" },
            { value: "39€", label: "Per adult" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "left", padding: "0 8px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
              <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: isMobile ? "1.7rem" : "2.8rem", fontWeight: 900, color: C.white, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "6px" }}>{stat.value}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Archivo', sans-serif", fontSize: isMobile ? "0.6rem" : "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: C.brown, padding: "16px 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="marquee-track" style={{ display: "flex", whiteSpace: "nowrap", fontFamily: "'Archivo', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: C.ochre, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {[...Array(2)].map((_, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "50px", paddingRight: "50px" }}>
              <span style={{ marginLeft: "20px" }}>3h30 ride</span><span style={{ color: C.turquoise }}>✦</span>
              <span>Old-school UMM jeep</span><span style={{ color: C.turquoise }}>✦</span>
              <span>Albufeira pickup</span><span style={{ color: C.turquoise }}>✦</span>
              <span>From 39€</span><span style={{ color: C.turquoise }}>✦</span>
              <span>Real Algarve</span><span style={{ color: C.turquoise }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* INSIDE THE JEEP */}
      <section id="trip-detail" style={{ background: C.cream, padding: isMobile ? "56px 20px" : "100px 8%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span style={{ width: "24px", height: "2px", background: C.terracotta, borderRadius: "2px" }} />
            <span style={{ color: C.terracotta, fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Inside the jeep</span>
          </div>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: isMobile ? "clamp(38px, 10vw, 80px)" : "clamp(48px, 7vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.025em", marginBottom: isMobile ? "28px" : "48px", color: C.brown }}>
            Top off.<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>Let's go.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr", gap: isMobile ? "32px" : "60px", alignItems: "start" }}>
            <div>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", marginBottom: "14px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(61,35,20,0.12)" }}>
                <img src="/v3-inside.jpeg" alt="Inside the UMM jeep" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ marginBottom: "24px", color: C.brownMid, fontStyle: "italic", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-block", width: "18px", height: "2px", background: C.turquoise, borderRadius: "2px" }} />
                Real seats, real wind, real Algarve.
              </div>
              <p style={{ fontSize: isMobile ? "1rem" : "1.1rem", lineHeight: 1.7, color: C.brownMid, marginBottom: "16px" }}>Hop into our UMM — a tough Portuguese 4×4, built for the army back in the day. We pull off the canvas top, hit the dirt, and head into the hills behind Albufeira.</p>
              <p style={{ fontSize: isMobile ? "1rem" : "1.1rem", lineHeight: 1.7, color: C.brownMid }}>Wind in your face, wild herbs in your nose, and the bits of the Algarve no tour bus ever shows you. 3h30 that fly by.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "12px" : "16px" }}>
              {[
                { iconBg: "rgba(0,180,216,0.12)", iconColor: C.turquoise, value: "3h30", label: "Of pure fun", icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></> },
                { iconBg: "rgba(196,98,45,0.12)", iconColor: C.terracotta, value: "UMM", label: "Open-top jeep", icon: <><path d="M5 17h14M3 13h18l-2-7H5l-2 7zM7 17v2M17 17v2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></> },
                { iconBg: "rgba(212,149,42,0.15)", iconColor: C.ochre, value: "7 max", label: "Mates only", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></> },
                { iconBg: "rgba(61,35,20,0.1)", iconColor: C.brown, value: "English", label: "Local guide", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/> },
              ].map((f, i) => (
                <div key={i} className="feat-card" style={{ background: C.white, borderRadius: "16px", padding: isMobile ? "24px 20px" : "28px", border: `1px solid ${C.sand}`, aspectRatio: "1/1.05", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: f.iconBg, color: f.iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>{f.icon}</svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: isMobile ? "1.8rem" : "2.2rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "4px", color: C.brown }}>{f.value}</div>
                    <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.brownMid }}>{f.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: C.creamDark, padding: isMobile ? "56px 20px" : "100px 8%", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px", justifyContent: "center" }}>
            <span style={{ width: "24px", height: "2px", background: C.terracotta, borderRadius: "2px" }} />
            <span style={{ color: C.terracotta, fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Pricing</span>
          </div>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: isMobile ? "clamp(38px, 9vw, 80px)" : "clamp(48px, 7vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.025em", marginBottom: "16px", color: C.brown }}>
            Simple as<br/><em style={{ color: C.turquoiseDark, fontStyle: "italic" }}>that.</em>
          </h2>
          <p style={{ fontSize: "1rem", color: C.brownMid, marginBottom: "36px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>One trip, two prices. No hidden fees, no surprises. Just hop in.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "16px" : "24px", maxWidth: "760px", margin: "0 auto" }}>
            {[
              { tag: "Most booked", label: "Adult", amount: "39", featured: true, items: ["3h30 off-road ride", "Pickup in Albufeira", "Local guide & stories", "Stops, swims, photos"] },
              { label: "Under 15", amount: "25", featured: false, items: ["Same trip as the adults", "Same pickup & ride", "Kids love the splash bits", "Min. age 4 years"] },
            ].map((p, i) => (
              <div key={i} className="price-card" style={{ background: C.white, padding: isMobile ? "32px 24px" : "40px 32px", borderRadius: "16px", textAlign: "left", border: p.featured ? `2px solid ${C.terracotta}` : "2px solid transparent", boxShadow: p.featured ? "0 12px 32px rgba(196,98,45,0.15)" : "none", position: "relative" }}>
                {p.tag && (
                  <div style={{ position: "absolute", top: "-12px", left: "24px", background: C.turquoise, color: C.white, fontFamily: "'Archivo', sans-serif", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "999px", boxShadow: "0 2px 8px rgba(0,180,216,0.3)" }}>{p.tag}</div>
                )}
                <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.terracotta, fontWeight: 700, marginBottom: "8px" }}>{p.label}</div>
                <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "3.5rem", fontWeight: 900, color: C.brown, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "8px" }}>
                  {p.amount}<span style={{ fontSize: "1.8rem", fontWeight: 700, marginLeft: "4px", color: C.brown }}>€</span>
                </div>
                <div style={{ fontSize: "0.95rem", color: C.brownMid, marginBottom: "20px" }}>Per person</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {p.items.map((item, j) => (
                    <li key={j} style={{ fontSize: "0.9rem", color: C.brownMid, padding: "6px 0", paddingLeft: "24px", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, top: "6px", color: C.turquoise, fontWeight: 800, fontSize: "1rem" }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" style={{ background: C.cream, padding: isMobile ? "56px 20px" : "120px 8%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px", justifyContent: "center" }}>
              <span style={{ width: "24px", height: "2px", background: C.terracotta, borderRadius: "2px" }} />
              <span style={{ color: C.terracotta, fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Reviews</span>
            </div>
            <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: isMobile ? "clamp(38px, 10vw, 80px)" : "clamp(48px, 7vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.025em", color: C.brown, marginBottom: "20px" }}>
              What our<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>riders say.</em>
            </h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 18px", background: C.white, borderRadius: "999px", boxShadow: "0 2px 12px rgba(61,35,20,0.06)" }}>
              <span style={{ color: C.ochre, fontSize: "1rem" }}>★★★★★</span>
              <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: C.brown }}>4.9</span>
              <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: "0.7rem", color: C.brownMid, letterSpacing: "0.1em", textTransform: "uppercase" }}>from 47 reviews</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "14px" : "20px" }}>
            {[
              { text: "Bloody brilliant. Way better than another beach day. Loved every minute of it.", name: "Emma R.", loc: "Manchester" },
              { text: "Forget the tourist coaches. Bumpy, dusty, real Algarve. Top day out, no doubt.", name: "James T.", loc: "London" },
              { text: "Took the kids — they're still talking about the waterfall. Properly magic stuff.", name: "Sophie L.", loc: "Bristol" },
              { text: "Bit nervous about the off-road bits but the guide was top notch. Felt safe the whole time.", name: "Michael B.", loc: "Leeds" },
              { text: "That viewpoint with a glass of wine? Unreal. Best 3 hours of the entire trip.", name: "Hannah K.", loc: "Edinburgh" },
              { text: "Real authentic experience, no nonsense. Highly recommend to anyone heading to Albufeira.", name: "David P.", loc: "Birmingham" },
            ].map((t, i) => (
              <div key={i} className="test-card" style={{ background: C.white, borderRadius: "16px", padding: isMobile ? "24px 22px" : "32px 28px", border: `1px solid ${C.sand}`, position: "relative" }}>
                <div style={{ position: "absolute", top: "14px", right: "20px", fontFamily: "'Archivo', sans-serif", fontSize: "3rem", fontWeight: 900, color: C.terracotta, opacity: 0.15, lineHeight: 1, fontStyle: "italic" }}>"</div>
                <div style={{ color: C.ochre, fontSize: "0.85rem", marginBottom: "12px", letterSpacing: "0.05em" }}>★★★★★</div>
                <p style={{ fontSize: isMobile ? "1rem" : "1.05rem", lineHeight: 1.6, color: C.brown, marginBottom: "16px" }}>{t.text}</p>
                <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: C.brown }}>{t.name}</div>
                <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: "0.7rem", color: C.brownMid, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "2px" }}>{t.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" style={{ background: C.cream, padding: isMobile ? "56px 20px" : "120px 8%" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px", justifyContent: "center" }}>
              <span style={{ width: "24px", height: "2px", background: C.terracotta, borderRadius: "2px" }} />
              <span style={{ color: C.terracotta, fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Booking</span>
            </div>
            <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: isMobile ? "clamp(38px, 10vw, 80px)" : "clamp(48px, 7vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.025em", color: C.brown }}>
              Book your<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>ride.</em>
            </h2>
          </div>
          {!confirmed ? (
            <div style={{ background: C.white, padding: isMobile ? "28px 20px" : "40px", borderRadius: "16px", border: `1px solid ${C.sand}`, boxShadow: "0 8px 32px rgba(61,35,20,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
                {[1,2,3].map(s => (
                  <div key={s} style={{ height: "8px", width: s === step ? "32px" : "8px", borderRadius: "4px", background: s <= step ? C.terracotta : C.sand, transition: "all 0.3s ease" }} />
                ))}
              </div>
              {step === 1 && (
                <div>
                  <h3 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "20px", color: C.brown }}>Pick a date & time</h3>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", color: C.brownMid, marginBottom: "8px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: "100%", maxWidth: "100%", padding: "14px 16px", fontSize: "1rem", border: `1px solid ${C.sand}`, borderRadius: "12px", fontFamily: "'Inter', sans-serif", color: C.brown, background: C.cream, boxSizing: "border-box", WebkitAppearance: "none", appearance: "none" }} />
                  </div>
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", color: C.brownMid, marginBottom: "8px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Time</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {[
                        { hour: "13:30", label: "Afternoon", icon: <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></> },
                        { hour: "17:00", label: "Sunset", icon: <><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></> },
                      ].map(t => (
                        <button key={t.hour} onClick={() => setTime(t.hour)} style={{ padding: "18px 12px", border: `1.5px solid ${time === t.hour ? C.terracotta : C.sand}`, background: time === t.hour ? C.terracotta : C.cream, borderRadius: "12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: time === t.hour ? C.white : C.brown, transition: "all 0.2s ease" }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>{t.icon}</svg>
                          <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: time === t.hour ? "rgba(255,255,255,0.85)" : C.brownMid }}>{t.label}</div>
                          <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "1.2rem", fontWeight: 900 }}>{t.hour}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={goNext} disabled={!date || !time} className="btn" style={{ width: "100%", padding: "16px", background: (date && time) ? C.terracotta : C.sand, color: C.white, border: "none", fontFamily: "'Archivo', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: (date && time) ? "pointer" : "not-allowed", borderRadius: "999px", boxShadow: (date && time) ? "0 4px 16px rgba(196,98,45,0.3)" : "none" }}>Continue →</button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h3 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "20px", color: C.brown }}>How many of you?</h3>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", color: C.brownMid, marginBottom: "8px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Adults · 39€ each</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} style={{ width: "44px", height: "44px", border: `1px solid ${C.sand}`, background: C.cream, fontSize: "1.2rem", cursor: "pointer", borderRadius: "12px" }}>−</button>
                      <div style={{ flex: 1, textAlign: "center", fontSize: "1.5rem", fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: C.brown }}>{adults}</div>
                      <button onClick={() => setAdults(Math.min(7 - kids, adults + 1))} style={{ width: "44px", height: "44px", border: `1px solid ${C.sand}`, background: C.cream, fontSize: "1.2rem", cursor: "pointer", borderRadius: "12px" }}>+</button>
                    </div>
                  </div>
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", color: C.brownMid, marginBottom: "8px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Under 15 · 25€ each</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <button onClick={() => setKids(Math.max(0, kids - 1))} style={{ width: "44px", height: "44px", border: `1px solid ${C.sand}`, background: C.cream, fontSize: "1.2rem", cursor: "pointer", borderRadius: "12px" }}>−</button>
                      <div style={{ flex: 1, textAlign: "center", fontSize: "1.5rem", fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: C.brown }}>{kids}</div>
                      <button onClick={() => setKids(Math.min(7 - adults, kids + 1))} style={{ width: "44px", height: "44px", border: `1px solid ${C.sand}`, background: C.cream, fontSize: "1.2rem", cursor: "pointer", borderRadius: "12px" }}>+</button>
                    </div>
                  </div>
                  <div style={{ padding: "20px", background: C.cream, borderRadius: "12px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: C.brown }}>Total</div>
                    <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "1.6rem", fontWeight: 900, color: C.terracotta }}>{total}€</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setStep(1)} style={{ padding: "16px 24px", background: C.cream, color: C.brown, border: `1px solid ${C.sand}`, fontFamily: "'Archivo', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "999px" }}>← Back</button>
                    <button onClick={goNext} className="btn" style={{ flex: 1, padding: "16px", background: C.terracotta, color: C.white, border: "none", fontFamily: "'Archivo', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "999px", boxShadow: "0 4px 16px rgba(196,98,45,0.3)" }}>Continue →</button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h3 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "20px", color: C.brown }}>Your details</h3>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", color: C.brownMid, marginBottom: "8px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Your name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" style={{ width: "100%", maxWidth: "100%", padding: "14px 16px", fontSize: "1rem", border: `1px solid ${C.sand}`, borderRadius: "12px", fontFamily: "'Inter', sans-serif", color: C.brown, background: C.cream, boxSizing: "border-box", WebkitAppearance: "none" }} />
                  </div>
                  <div style={{ padding: "20px", background: C.cream, borderRadius: "12px", marginBottom: "24px" }}>
                    <div style={{ fontSize: "0.85rem", color: C.brownMid, marginBottom: "8px" }}>Booking summary</div>
                    <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: C.brown }}>{date} · {time}</div>
                    <div style={{ fontSize: "0.9rem", color: C.brownMid, marginTop: "4px" }}>{adults} adults{kids > 0 ? `, ${kids} under 15` : ""}</div>
                    <div style={{ borderTop: `1px solid ${C.sand}`, marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: C.brown }}>Total</span>
                      <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, color: C.terracotta, fontSize: "1.2rem" }}>{total}€</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setStep(2)} style={{ padding: "16px 24px", background: C.cream, color: C.brown, border: `1px solid ${C.sand}`, fontFamily: "'Archivo', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "999px" }}>← Back</button>
                    <button onClick={goNext} disabled={!name} className="btn" style={{ flex: 1, padding: "16px", background: name ? C.terracotta : C.sand, color: C.white, border: "none", fontFamily: "'Archivo', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: name ? "pointer" : "not-allowed", borderRadius: "999px", boxShadow: name ? "0 4px 16px rgba(196,98,45,0.3)" : "none" }}>Pay {total}€ →</button>
                  </div>
                </div>
              )}
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${C.sand}`, display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                {[
                  { icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>, label: "Secure payment" },
                  { icon: <polyline points="20 6 9 17 4 12"/>, label: "Free cancellation 24h" },
                  { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, label: "Albufeira pickup" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: C.brownMid, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, color: C.turquoise }}>{s.icon}</svg>
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: C.white, padding: "48px 32px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(61,35,20,0.08)", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✓</div>
              <h3 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: "1.6rem", marginBottom: "12px", color: C.brown }}>You're booked!</h3>
              <p style={{ color: C.brownMid, marginBottom: "20px" }}>Check your email for confirmation. See you on {date} at {time}.</p>
            </div>
          )}
        </div>
      </section>

      {/* ROUTE */}
      <section style={{ background: C.cream, padding: isMobile ? "56px 0" : "100px 0", overflow: "hidden" }}>
        <div style={{ padding: isMobile ? "0 20px" : "0 8%", marginBottom: isMobile ? "28px" : "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span style={{ width: "24px", height: "2px", background: C.terracotta, borderRadius: "2px" }} />
            <span style={{ color: C.terracotta, fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>The route</span>
          </div>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: isMobile ? "clamp(38px, 10vw, 80px)" : "clamp(48px, 7vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.025em", color: C.brown }}>
            Where we<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>take you.</em>
          </h2>
        </div>
        <div style={{ position: "relative", width: "100%", marginBottom: isMobile ? "32px" : "56px", overflow: "hidden", aspectRatio: "21/9", boxShadow: "0 8px 32px rgba(61,35,20,0.15)" }}>
          <img src="/v3-waterfall.jpeg" alt="Hidden waterfall" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
          <div style={{ position: "absolute", bottom: isMobile ? "14px" : "24px", left: isMobile ? "14px" : "32px", color: C.white, fontStyle: "italic", fontSize: isMobile ? "0.85rem" : "0.95rem", textShadow: "0 1px 6px rgba(0,0,0,0.7)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: "18px", height: "2px", background: C.ochre, borderRadius: "2px" }} />
            The hidden waterfall — stop 03.
          </div>
        </div>
        <div className="stops-scroll" style={{ display: "flex", gap: isMobile ? "14px" : "20px", overflowX: "auto", overflowY: "hidden", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", padding: isMobile ? "0 20px" : "0 8%", scrollbarWidth: "none" }}>
          {[
            { num: "01", color: C.turquoise, place: "The pickup", desc: "We grab you right in Albufeira. Top off, engine roars, dust starts flying. Your adventure starts here." },
            { num: "02", color: C.ochre, place: "The ruins", desc: "Hidden deep in the Algarve hills, these old stones tell stories most tourists never hear. Quiet, mysterious, ours." },
            { num: "03", color: C.turquoise, place: "The waterfall", desc: "A secret cascade tumbling into turquoise water. Bring your swimsuit — this swim is the highlight of many rides." },
            { num: "04", color: C.terracotta, place: "The viewpoint", desc: "We park up high, pour a glass of wine (or juice for the kids), and just watch the Algarve glow at golden hour." },
          ].map((s, i) => (
            <div key={i} style={{ flex: isMobile ? "0 0 280px" : "0 0 320px", scrollSnapAlign: "start", background: C.white, borderRadius: "20px", padding: isMobile ? "28px 24px" : "36px 32px", boxShadow: "0 4px 24px rgba(61,35,20,0.08)", position: "relative", overflow: "hidden", aspectRatio: "4/5", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", borderRadius: "50%", filter: "blur(60px)", opacity: 0.18, background: s.color, zIndex: 0 }} />
              <div style={{ fontFamily: "'Archivo', sans-serif", fontStyle: "italic", fontWeight: 900, fontSize: isMobile ? "7rem" : "8rem", lineHeight: 0.85, letterSpacing: "-0.05em", position: "relative", zIndex: 1, color: s.color }}>{s.num}</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: isMobile ? "1.6rem" : "1.9rem", fontWeight: 800, color: C.brown, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "8px" }}>{s.place}</div>
                <div style={{ fontSize: isMobile ? "0.9rem" : "0.95rem", color: C.brownMid, lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        {isMobile && <div style={{ textAlign: "center", marginTop: "18px", color: C.brownMid, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Archivo', sans-serif", fontWeight: 600, opacity: 0.6 }}>← swipe →</div>}
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: C.cream, padding: isMobile ? "56px 20px" : "120px 8%" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px", justifyContent: "center" }}>
              <span style={{ width: "24px", height: "2px", background: C.terracotta, borderRadius: "2px" }} />
              <span style={{ color: C.terracotta, fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>FAQ</span>
            </div>
            <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: isMobile ? "clamp(38px, 10vw, 80px)" : "clamp(48px, 7vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.025em", color: C.brown }}>
              Quick<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>questions.</em>
            </h2>
          </div>
          <div>
            {[
              { q: "Where do you pick us up?", a: "Right in central Albufeira — your hotel, apartment, or any meeting point. Just give us the address when booking. We'll be there 5 min before the start." },
              { q: "What if it rains?", a: "Light rain is fine, the canvas top stays on and you stay dry. If it's pouring, we'll reschedule to another day at no extra cost — your booking stays valid." },
              { q: "Is it safe for kids?", a: "Yes — minimum age is 4 years. Kids absolutely love the bumpy bits and splashing through streams. Booster seats available on request. 25€ per child under 15." },
              { q: "Do I need to bring anything?", a: "Just sunscreen, a hat or sunglasses, and a towel if you fancy a swim at the waterfall. Comfortable clothes and closed shoes recommended. We'll handle everything else." },
              { q: "Can we eat or drink during the tour?", a: "Yes! We provide a glass of wine (or juice for the kids) at the viewpoint stop — it's the perfect moment to soak in the view. Bring your own water for the ride to stay hydrated." },
              { q: "How fit do I need to be?", a: "No fitness required at all. Just sitting and enjoying the ride. Some easy walking at stops if you want to explore the ruins or get closer to the waterfall — totally optional." },
              { q: "Cancellation policy?", a: "Free cancellation up to 24h before the trip — full refund, no questions asked. After that, we offer to reschedule to any other available date. Life happens, we get it." },
            ].map((item, i) => (
              <details key={i} className="faq-item" style={{ borderBottom: `1px solid ${C.sand}`, borderTop: i === 0 ? `1px solid ${C.sand}` : "none", padding: "20px 0", cursor: "pointer" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: isMobile ? "1.05rem" : "1.15rem", color: C.brown }}>
                  {item.q}
                  <span className="faq-icon" style={{ width: "32px", height: "32px", borderRadius: "50%", background: C.terracotta, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 300, lineHeight: 1, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ marginTop: "14px", color: C.brownMid, lineHeight: 1.7, fontSize: isMobile ? "0.95rem" : "1rem", paddingRight: isMobile ? "48px" : "56px" }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: C.brown, color: C.white, padding: isMobile ? "80px 20px" : "140px 8%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-50%", right: "-20%", width: "60%", height: "100%", borderRadius: "50%", background: C.terracotta, filter: "blur(120px)", opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-30%", left: "-10%", width: "50%", height: "80%", borderRadius: "50%", background: C.turquoise, filter: "blur(120px)", opacity: 0.15, zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: C.ochre, fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>
            <span style={{ display: "inline-block", width: "24px", height: "2px", background: C.ochre, borderRadius: "2px" }} />
            Ready?
            <span style={{ display: "inline-block", width: "24px", height: "2px", background: C.ochre, borderRadius: "2px" }} />
          </div>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: isMobile ? "clamp(44px, 12vw, 100px)" : "clamp(64px, 9vw, 120px)", lineHeight: 0.95, letterSpacing: "-0.025em", marginBottom: "16px", color: C.white }}>
            Ready to<br/><em style={{ color: C.ochre, fontStyle: "italic" }}>ride?</em>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto 32px" }}>Hop in our UMM jeep and discover the real Algarve. Small group, big adventure, real Portugal.</p>
          <button onClick={() => goTo("#booking")} className="btn" style={{ background: C.terracotta, color: C.white, border: "none", padding: "18px 36px", fontFamily: "'Archivo', sans-serif", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", borderRadius: "999px", boxShadow: "0 8px 32px rgba(196,98,45,0.4)", display: "inline-flex", alignItems: "center", gap: "8px" }}>Book your ride →</button>
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
            <span>3h30 trip</span>
            <span style={{ color: C.terracotta }}>·</span>
            <span>From 39€</span>
            <span style={{ color: C.terracotta }}>·</span>
            <span>Daily · 13:30 & 17:00</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.brown, color: C.cream, padding: isMobile ? "60px 20px 60px" : "80px 8% 60px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? "40px" : "60px", marginBottom: "40px" }}>
            <div>
              <img src="/v3-logo.png" alt="Wild-Algarve" style={{ height: "44px", marginBottom: "16px" }} loading="lazy" />
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(250,246,239,0.7)", maxWidth: "320px" }}>Off-road jeep tours through the wild Algarve. Small groups, big adventures, real Portugal.</p>
              <a href="https://wa.me/33651581703" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "18px", padding: "10px 18px", background: "#25D366", color: C.white, borderRadius: "999px", fontFamily: "'Archivo', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
            <div>
              <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.ochre, marginBottom: "14px", fontWeight: 700 }}>Contact</div>
              <a href="https://wa.me/33651581703" style={{ display: "block", color: C.cream, textDecoration: "none", marginBottom: "8px", fontSize: "0.95rem" }}>+33 6 51 58 17 03</a>
              <a href="mailto:wild.algarve@gmail.com" style={{ display: "block", color: C.cream, textDecoration: "none", fontSize: "0.95rem" }}>wild.algarve@gmail.com</a>
            </div>
            <div>
              <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.ochre, marginBottom: "14px", fontWeight: 700 }}>The trip</div>
              <div style={{ fontSize: "0.95rem", color: "rgba(250,246,239,0.7)", marginBottom: "6px" }}>3h30 · From 39€</div>
              <div style={{ fontSize: "0.95rem", color: "rgba(250,246,239,0.7)", marginBottom: "6px" }}>Daily · 13:30 & 17:00</div>
              <div style={{ fontSize: "0.95rem", color: "rgba(250,246,239,0.7)" }}>Albufeira pickup</div>
            </div>
          </div>
          <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(250,246,239,0.1)", fontSize: "0.8rem", color: "rgba(250,246,239,0.5)", textAlign: isMobile ? "center" : "left" }}>
            © {new Date().getFullYear()} Wild-Algarve. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
