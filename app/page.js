"use client";
import { useState, useEffect } from "react";

const C = {
  terracotta: "#C4622D", terracottaDeep: "#9C3D1E", ochre: "#D4952A",
  cream: "#FAF6EF", creamDark: "#F0E8D8", brown: "#3D2314",
  brownMid: "#6B3D22", brownDeep: "#2A1810", white: "#FFFDF9",
  sand: "#E8D5B0", turquoise: "#00B4D8", turquoiseDark: "#0077B6",
};

const NAV = [
  { label: "Trip", target: "#trip-detail" },
  { label: "Route", target: "#route" },
  { label: "Reviews", target: "#reviews" },
  { label: "Pricing", target: "#pricing" },
  { label: "Booking", target: "#booking" },
  { label: "FAQ", target: "#faq" },
];

const PHOTOS = [
  { src: "/v3-photo-action.jpeg", caption: "Wind in your hair. Smiles all the way." },
  { src: "/v3-photo-cascade.jpeg", caption: "The hidden waterfall — your turn." },
  { src: "/v3-photo-sunset.jpeg", caption: "A glass of wine and the Algarve glowing." },
  { src: "/v3-photo-umm.jpeg", caption: "Your ride into the wild." },
];

export default function WildAlgarve() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInstagram, setIsInstagram] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);

  // Booking
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingError, setBookingError] = useState("");

  // Review
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isIG = ua.includes("Instagram") || ua.includes("FBAN") || ua.includes("FBAV");
    setIsInstagram(isIG);

    const onResize = () => setIsMobile(window.innerWidth < 768);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const hero = document.querySelector("[data-hero]");
      if (hero) setStickyVisible(hero.getBoundingClientRect().bottom < 0);
    };
    onResize(); onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPhotoIdx(p => (p + 1) % PHOTOS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const total = adults * 39 + kids * 25;

  const goTo = (sel) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const submitBooking = async () => {
    setSubmitting(true);
    setBookingError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, adults, kids, total, firstName, lastName, email, phone }),
      });
      const data = await res.json();
      if (data.success) setBookingResult(data);
      else setBookingError("Something went wrong. Please try again or contact us on WhatsApp.");
    } catch {
      setBookingError("Connection error. Please contact us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "13px 14px", fontSize: "1rem",
    border: `1px solid ${C.sand}`, borderRadius: "12px",
    fontFamily: "'Inter',sans-serif", color: C.brown,
    background: C.cream, boxSizing: "border-box",
    WebkitAppearance: "none", appearance: "none", outline: "none",
  };

  const labelStyle = {
    display: "block", fontFamily: "'Archivo',sans-serif",
    fontSize: "0.65rem", color: C.brownMid, marginBottom: "8px",
    fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
  };

  const primaryBtn = (disabled) => ({
    width: "100%", padding: "15px",
    background: disabled ? C.sand : C.terracotta,
    color: C.white, border: "none",
    fontFamily: "'Archivo',sans-serif", fontSize: "0.8rem",
    fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer", borderRadius: "999px",
    boxShadow: disabled ? "none" : "0 4px 16px rgba(196,98,45,0.3)",
    transition: "all 0.3s ease",
  });

  const backBtn = {
    padding: "14px 20px", background: C.cream, color: C.brown,
    border: `1px solid ${C.sand}`, fontFamily: "'Archivo',sans-serif",
    fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", cursor: "pointer", borderRadius: "999px",
  };

  const counterBtn = {
    width: "44px", height: "44px", border: `1px solid ${C.sand}`,
    background: C.cream, fontSize: "1.2rem", cursor: "pointer",
    borderRadius: "12px", color: C.brown,
  };

  // Instagram-specific styles
  const igFix = isInstagram ? {
    WebkitOverflowScrolling: "touch",
    overscrollBehavior: "none",
  } : {};

  return (
    <div style={{
      fontFamily: "'Inter',sans-serif", background: C.cream,
      color: C.brown, overflowX: "hidden",
      paddingBottom: isMobile ? "80px" : 0,
      ...igFix,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,900&family=Inter:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}
        html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
        body{-webkit-overflow-scrolling:touch;overscroll-behavior-y:none}
        ::selection{background:${C.terracotta};color:#fff}
        .marquee{animation:marquee 22s linear infinite;will-change:transform}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .stops::-webkit-scrollbar{display:none}
        details summary{list-style:none}
        details summary::-webkit-details-marker{display:none}
        .hov:hover{border-color:${C.terracotta}!important;transform:translateY(-3px);box-shadow:0 10px 28px rgba(61,35,20,.1)}
        .hov{transition:transform .35s cubic-bezier(.16,1,.3,1),border-color .25s,box-shadow .25s}
        .btn-t{transition:transform .3s ease,box-shadow .3s ease}
        .btn-t:hover{transform:translateY(-2px)}
        .faq-icon{transition:transform .3s ease}
        details[open] .faq-icon{transform:rotate(45deg)}
        .slide{transition:opacity .9s ease;position:absolute;inset:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .mlink{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) both}
        /* Instagram browser fixes */
        @supports (-webkit-touch-callout: none) {
          .hero-img{-webkit-transform:translateZ(0);transform:translateZ(0)}
          .nav-fixed{-webkit-transform:translateZ(0);transform:translateZ(0)}
        }
      `}</style>

      {/* STICKY CTA */}
      {isMobile && !bookingResult && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: C.white, padding: "12px 16px",
          borderTop: `1px solid ${C.sand}`, zIndex: 998,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 12, boxShadow: "0 -4px 24px rgba(61,35,20,.1)",
          transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform .4s cubic-bezier(.16,1,.3,1)",
          willChange: "transform",
        }}>
          <div>
            <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "1rem", color: C.terracotta, fontWeight: 600 }}>
              From <strong style={{ fontWeight: 800, fontSize: "1.2rem" }}>39€</strong>
            </div>
            <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "0.65rem", color: C.brownMid, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, marginTop: 2 }}>3h30 ride · 7 max</div>
          </div>
          <button onClick={() => goTo("#booking")} className="btn-t" style={{ background: C.terracotta, color: C.white, border: "none", padding: "13px 22px", fontFamily: "'Archivo',sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", borderRadius: "999px", boxShadow: "0 2px 12px rgba(196,98,45,.3)" }}>Book Now</button>
        </div>
      )}

      {/* NAV */}
      <nav className="nav-fixed" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "10px 5%" : "14px 5%",
        background: scrolled ? "rgba(61,35,20,0.92)" : "linear-gradient(to bottom,rgba(0,0,0,0.5),transparent)",
        backdropFilter: scrolled && !isInstagram ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled && !isInstagram ? "blur(12px)" : "none",
        transition: "all .4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        willChange: "transform",
      }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }}>
          <img src="/v3-logo.png" alt="Wild-Algarve" style={{ height: scrolled ? "28px" : (isMobile ? "32px" : "38px"), width: "auto", transition: "height .4s ease" }} />
        </div>
        {!isMobile ? (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV.map(n => <a key={n.label} onClick={() => goTo(n.target)} style={{ fontFamily: "'Archivo',sans-serif", fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", color: C.white }}>{n.label}</a>)}
          </div>
        ) : (
          <button onClick={() => setMenuOpen(true)} style={{ display: "flex", flexDirection: "column", gap: 5, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", padding: 0, width: 38, height: 38, borderRadius: 12, justifyContent: "center", alignItems: "center" }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 16, height: 2, background: C.white, borderRadius: 2 }} />)}
          </button>
        )}
      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: `linear-gradient(135deg,${C.brown},${C.brownDeep})`, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 5%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <img src="/v3-logo.png" alt="Wild-Algarve" style={{ height: 32 }} />
            <button onClick={() => setMenuOpen(false)} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontSize: "1.4rem", cursor: "pointer", padding: 0 }}>×</button>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 5%", gap: 4 }}>
            {NAV.map((n, i) => (
              <a key={n.label} className="mlink" onClick={() => goTo(n.target)} style={{ fontFamily: "'Archivo',sans-serif", fontSize: "2.4rem", fontWeight: 800, color: C.cream, cursor: "pointer", letterSpacing: "-0.02em", padding: "10px 0", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid rgba(255,255,255,0.08)`, animationDelay: `${0.05 + i * 0.05}s` }}>
                <span>{n.label}</span><span style={{ color: C.terracotta, fontSize: "1.3rem" }}>→</span>
              </a>
            ))}
          </div>
          <div style={{ padding: "20px 5% 32px" }}>
            <button onClick={() => goTo("#booking")} className="btn-t" style={{ width: "100%", background: C.terracotta, color: C.white, border: "none", padding: 16, fontFamily: "'Archivo',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "999px", boxShadow: "0 6px 24px rgba(196,98,45,.4)" }}>Book your ride →</button>
            <a href="https://wa.me/33651581703" style={{ display: "flex", alignItems: "center", gap: 10, color: C.cream, textDecoration: "none", fontFamily: "'Archivo',sans-serif", fontSize: "0.82rem", fontWeight: 600, marginTop: 20 }}>
              <svg viewBox="0 0 24 24" fill="#25D366" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp +33 6 51 58 17 03
            </a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section data-hero id="trip" style={{ position: "relative", overflow: "hidden", background: C.brown }}>
        <div style={{ position: "relative", width: "100%", height: isMobile ? "78vh" : "92vh", overflow: "hidden" }}>
          <picture>
            <source media="(min-width:768px)" srcSet="/v3-hero-desktop.jpeg" />
            <img className="hero-img" src="/v3-hero-mobile.jpeg" alt="Wild Algarve UMM Jeep" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%", display: "block" }} />
          </picture>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.35) 12%,rgba(0,0,0,0.08) 25%,rgba(0,0,0,0) 45%,rgba(0,0,0,0) 65%,rgba(61,35,20,0.4) 85%,${C.brown} 100%)` }} />
          <div style={{ position: "absolute", top: isMobile ? 76 : 110, left: 0, right: 0, zIndex: 10, padding: isMobile ? "0 20px" : "0 5%" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, color: C.ochre, fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
              <span style={{ display: "inline-block", width: 22, height: 1.5, background: C.ochre }} />
              Albufeira · The real Algarve
            </div>
            <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, color: C.white, lineHeight: 0.92, letterSpacing: "-0.035em", fontSize: isMobile ? "clamp(54px,14vw,130px)" : "clamp(80px,9vw,140px)", marginBottom: isMobile ? 26 : 32, textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
              Algarve,<br/><em style={{ color: C.ochre, fontStyle: "italic", fontWeight: 800, display: "block" }}>off the road.</em>
            </h1>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => goTo("#booking")} className="btn-t" style={{ padding: isMobile ? "13px 22px" : "16px 28px", border: "none", borderRadius: "999px", fontFamily: "'Archivo',sans-serif", fontSize: isMobile ? "0.78rem" : "0.92rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", background: C.terracotta, color: C.white, boxShadow: "0 4px 16px rgba(196,98,45,.4)" }}>Book your ride →</button>
              <button onClick={() => goTo("#trip-detail")} className="btn-t" style={{ padding: isMobile ? "13px 22px" : "16px 28px", borderRadius: "999px", fontFamily: "'Archivo',sans-serif", fontSize: isMobile ? "0.78rem" : "0.92rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", background: "rgba(255,255,255,0.1)", color: C.white, border: "1.5px solid rgba(255,255,255,0.35)" }}>What's it like?</button>
            </div>
          </div>
        </div>
        <div style={{ background: C.brown, padding: isMobile ? "22px 20px" : "32px 5%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: isMobile ? 12 : 32 }}>
          {[{ v: "3h30", l: "Duration" }, { v: "7", l: "Mates max" }, { v: "39€", l: "Per adult" }].map((s, i) => (
            <div key={i} style={{ padding: "0 8px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: isMobile ? "1.6rem" : "2.6rem", fontWeight: 800, color: C.white, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 6 }}>{s.v}</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Archivo',sans-serif", fontSize: isMobile ? "0.58rem" : "0.68rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: C.brown, padding: "14px 0", overflow: "hidden" }}>
        <div className="marquee" style={{ display: "flex", whiteSpace: "nowrap", fontFamily: "'Archivo',sans-serif", fontSize: "0.9rem", fontWeight: 600, color: C.ochre, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {[...Array(3)].map((_, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 44, paddingRight: 44 }}>
              <span style={{ marginLeft: 20 }}>3h30 ride</span><span style={{ color: C.turquoise }}>✦</span>
              <span>Open-top UMM jeep</span><span style={{ color: C.turquoise }}>✦</span>
              <span>Albufeira pickup</span><span style={{ color: C.turquoise }}>✦</span>
              <span>From 39€</span><span style={{ color: C.turquoise }}>✦</span>
              <span>The real Algarve</span><span style={{ color: C.turquoise }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* INSIDE THE JEEP — sans les 4 cards */}
      <section id="trip-detail" style={{ background: C.cream, padding: isMobile ? "64px 20px" : "100px 8%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ width: 22, height: 1.5, background: C.terracotta, borderRadius: 2, display: "inline-block" }} />
            <span style={{ color: C.terracotta, fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>Inside the jeep</span>
          </div>
          <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(38px,10vw,80px)" : "clamp(48px,7vw,92px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: isMobile ? 28 : 40, color: C.brown }}>
            Top off.<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>Let's go.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 28 : 56, alignItems: "center" }}>
            <div>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", borderRadius: 16, boxShadow: "0 8px 32px rgba(61,35,20,.12)", marginBottom: 16 }}>
                <img src="/v3-inside.jpeg" alt="Inside the UMM jeep" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ color: C.brownMid, fontStyle: "italic", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-block", width: 18, height: 1.5, background: C.turquoise, borderRadius: 2 }} />
                Real seats, real wind, real Algarve.
              </div>
            </div>
            <div>
              <p style={{ fontSize: isMobile ? "1rem" : "1.1rem", lineHeight: 1.75, color: C.brownMid, marginBottom: 20 }}>While the rest of Albufeira is glued to The Strip or stuck at a waterpark, you'll be hopping into our UMM — a tough vintage Portuguese 4×4 — and heading into the real Algarve.</p>
              <p style={{ fontSize: isMobile ? "1rem" : "1.1rem", lineHeight: 1.75, color: C.brownMid, marginBottom: 28 }}>Top down, dirt roads, hidden waterfalls. Just you, a small group of mates, and a local guide who knows where to find the good stuff. 3h30 that fly by.</p>
              {/* Inline stats — remplace les 4 cards */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", padding: "20px 0", borderTop: `1px solid ${C.sand}`, borderBottom: `1px solid ${C.sand}` }}>
                {[
                  { icon: "⏱", value: "3h30", label: "pure fun" },
                  { icon: "🚙", value: "UMM", label: "open-top jeep" },
                  { icon: "👥", value: "7 max", label: "small group" },
                  { icon: "🗣️", value: "English", label: "local guide" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                    <div>
                      <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: "0.95rem", color: C.brown }}>{s.value}</span>
                      <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: "0.8rem", color: C.brownMid, marginLeft: 4 }}>{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO SLIDER */}
      <section style={{ background: C.cream, paddingBottom: isMobile ? 64 : 100 }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: isMobile ? "16/10" : "21/9", overflow: "hidden" }}>
          {PHOTOS.map((p, i) => (
            <div key={i} className="slide" style={{ opacity: photoIdx === i ? 1 : 0 }}>
              <img src={p.src} alt={p.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top,rgba(0,0,0,0.6),transparent)" }} />
              <div style={{ position: "absolute", bottom: isMobile ? 20 : 32, left: isMobile ? 20 : "5%", color: C.white, fontFamily: "'Archivo',sans-serif", fontSize: isMobile ? "1.3rem" : "2rem", fontWeight: 700, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(0,0,0,0.6)", maxWidth: 600 }}>{p.caption}</div>
            </div>
          ))}
          <div style={{ position: "absolute", bottom: isMobile ? 12 : 20, right: isMobile ? 20 : "5%", display: "flex", gap: 6, zIndex: 5 }}>
            {PHOTOS.map((_, i) => (
              <button key={i} onClick={() => setPhotoIdx(i)} style={{ width: photoIdx === i ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: photoIdx === i ? C.white : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all .3s ease", padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ROUTE */}
      <section id="route" style={{ background: C.cream, paddingBottom: isMobile ? 64 : 100, overflow: "hidden" }}>
        <div style={{ padding: isMobile ? "0 20px" : "0 8%", marginBottom: isMobile ? 28 : 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ width: 22, height: 1.5, background: C.terracotta, borderRadius: 2, display: "inline-block" }} />
            <span style={{ color: C.terracotta, fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>The route</span>
          </div>
          <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(38px,10vw,80px)" : "clamp(48px,7vw,92px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: C.brown }}>
            Where we<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>take you.</em>
          </h2>
        </div>
        <div style={{ position: "relative", width: "100%", marginBottom: isMobile ? 32 : 56, overflow: "hidden", aspectRatio: "21/9" }}>
          <img src="/v3-waterfall.jpeg" alt="Hidden waterfall" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to top,rgba(0,0,0,0.5),transparent)" }} />
          <div style={{ position: "absolute", bottom: isMobile ? 14 : 24, left: isMobile ? 14 : 32, color: C.white, fontStyle: "italic", fontSize: isMobile ? "0.85rem" : "0.95rem", textShadow: "0 1px 6px rgba(0,0,0,.7)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 18, height: 1.5, background: C.ochre }} />
            The hidden waterfall — stop 03.
          </div>
        </div>
        <div className="stops" style={{ display: "flex", gap: isMobile ? 14 : 20, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", padding: isMobile ? "0 20px" : "0 8%", scrollbarWidth: "none" }}>
          {[
            { n: "01", c: C.turquoise, p: "The pickup", d: "We grab you right in Albufeira. Top off, engine roars, dust starts flying. Your adventure starts here." },
            { n: "02", c: C.ochre, p: "The ruins", d: "Hidden deep in the Algarve hills, these old stones tell stories most tourists never hear. Quiet, mysterious, ours." },
            { n: "03", c: C.turquoise, p: "The waterfall", d: "A secret cascade tumbling into turquoise water. Bring your swimsuit — this swim is the highlight of many rides." },
            { n: "04", c: C.terracotta, p: "The viewpoint", d: "We park up high, pour a glass of wine (or juice for the kids), and just watch the Algarve glow at golden hour." },
          ].map((s, i) => (
            <div key={i} style={{ flex: isMobile ? "0 0 280px" : "0 0 320px", scrollSnapAlign: "start", background: C.white, borderRadius: 20, padding: isMobile ? "28px 24px" : "36px 32px", boxShadow: "0 4px 24px rgba(61,35,20,.08)", position: "relative", overflow: "hidden", aspectRatio: "4/5", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", borderRadius: "50%", filter: "blur(60px)", opacity: .18, background: s.c }} />
              <div style={{ fontFamily: "'Archivo',sans-serif", fontStyle: "italic", fontWeight: 900, fontSize: isMobile ? "7rem" : "8rem", lineHeight: .85, letterSpacing: "-0.05em", position: "relative", color: s.c }}>{s.n}</div>
              <div style={{ position: "relative" }}>
                <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: isMobile ? "1.5rem" : "1.8rem", fontWeight: 800, color: C.brown, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 8 }}>{s.p}</div>
                <div style={{ fontSize: isMobile ? "0.88rem" : "0.95rem", color: C.brownMid, lineHeight: 1.55 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        {isMobile && <div style={{ textAlign: "center", marginTop: 16, color: C.brownMid, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Archivo',sans-serif", fontWeight: 500, opacity: .6 }}>← swipe →</div>}
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" style={{ background: C.creamDark, padding: isMobile ? "64px 20px" : "100px 8%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: "center" }}>
              <span style={{ width: 22, height: 1.5, background: C.terracotta, borderRadius: 2, display: "inline-block" }} />
              <span style={{ color: C.terracotta, fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>Reviews</span>
            </div>
            <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(38px,10vw,80px)" : "clamp(48px,7vw,92px)", lineHeight: .95, letterSpacing: "-0.03em", color: C.brown, marginBottom: 18 }}>
              What our<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>riders say.</em>
            </h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", background: C.white, borderRadius: "999px", boxShadow: "0 2px 12px rgba(61,35,20,.06)" }}>
              <span style={{ color: C.ochre, fontSize: "0.95rem" }}>★★★★★</span>
              <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: C.brown }}>4.9</span>
              <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 500, fontSize: "0.65rem", color: C.brownMid, letterSpacing: "0.1em", textTransform: "uppercase" }}>from 47 reviews</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 14 : 20 }}>
            {[
              { t: "Bloody brilliant. Way better than another beach day. Loved every single minute.", n: "Emma R.", l: "Manchester", i: "ER", c: C.terracotta, d: "2 weeks ago" },
              { t: "Forget the tourist coaches. Bumpy, dusty, real Algarve. Top day out, no doubt.", n: "James T.", l: "London", i: "JT", c: C.turquoise, d: "1 month ago" },
              { t: "Took the kids — they're still talking about the waterfall. Properly magic stuff.", n: "Sophie L.", l: "Bristol", i: "SL", c: C.ochre, d: "3 weeks ago" },
              { t: "Bit nervous about the off-road bits but the guide was top notch. Felt safe the whole time.", n: "Michael B.", l: "Leeds", i: "MB", c: C.brown, d: "1 month ago" },
              { t: "That viewpoint with a glass of wine? Unreal. Best 3 hours of the entire trip.", n: "Hannah K.", l: "Edinburgh", i: "HK", c: C.terracotta, d: "2 months ago" },
              { t: "Real authentic experience, no nonsense. Highly recommend to anyone heading to Albufeira.", n: "David P.", l: "Birmingham", i: "DP", c: C.turquoiseDark, d: "1 month ago" },
            ].map((t, i) => (
              <div key={i} className="hov" style={{ background: C.white, borderRadius: 16, padding: isMobile ? "22px 20px" : "26px", border: `1px solid ${C.sand}`, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.c, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: "0.95rem", flexShrink: 0 }}>{t.i}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: C.brown }}>{t.n}</div>
                      <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="10" fill={C.turquoise}/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                    </div>
                    <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 500, fontSize: "0.68rem", color: C.brownMid, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.l} · {t.d}</div>
                  </div>
                </div>
                <div style={{ color: C.ochre, fontSize: "0.85rem", marginBottom: 10 }}>★★★★★</div>
                <p style={{ fontSize: isMobile ? "0.95rem" : "1rem", lineHeight: 1.55, color: C.brown }}>{t.t}</p>
              </div>
            ))}
          </div>
          {/* Mini review form */}
          <div style={{ marginTop: isMobile ? 32 : 48, textAlign: "center" }}>
            <details style={{ display: "inline-block", textAlign: "left", maxWidth: 560, width: "100%" }}>
              <summary style={{ cursor: "pointer", listStyle: "none", fontFamily: "'Archivo',sans-serif", fontSize: "0.78rem", color: C.brownMid, fontWeight: 600, letterSpacing: "0.05em", padding: "10px 18px", border: `1px solid ${C.sand}`, borderRadius: "999px", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Been on the ride? Share your story
              </summary>
              {!reviewSubmitted ? (
                <div style={{ marginTop: 16, padding: 20, background: C.white, borderRadius: 16, border: `1px solid ${C.sand}` }}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={labelStyle}>Your name</label>
                    <input type="text" value={reviewName} onChange={e => setReviewName(e.target.value)} placeholder="John D." style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={labelStyle}>Rating</label>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[1,2,3,4,5].map(n => <button key={n} onClick={() => setReviewRating(n)} style={{ background: "transparent", border: "none", cursor: "pointer", color: n <= reviewRating ? C.ochre : C.sand, fontSize: "1.6rem", padding: 0 }}>★</button>)}
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Your review</label>
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Tell us about your ride..." rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: 80 }} />
                  </div>
                  <button onClick={() => { if (reviewName && reviewText) { setReviewSubmitted(true); setTimeout(() => { setReviewSubmitted(false); setReviewName(""); setReviewText(""); setReviewRating(5); }, 4000); } }} style={primaryBtn(!reviewName || !reviewText)}>Submit review</button>
                </div>
              ) : (
                <div style={{ marginTop: 16, padding: 20, background: C.white, borderRadius: 16, border: `1px solid ${C.turquoise}`, textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", color: C.turquoise, marginBottom: 8 }}>✓</div>
                  <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, color: C.brown }}>Thanks for sharing!</div>
                </div>
              )}
            </details>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" style={{ background: C.cream, padding: isMobile ? "64px 20px" : "100px 8%" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: "center" }}>
              <span style={{ width: 22, height: 1.5, background: C.terracotta, borderRadius: 2, display: "inline-block" }} />
              <span style={{ color: C.terracotta, fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>Booking</span>
            </div>
            <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(38px,10vw,80px)" : "clamp(48px,7vw,92px)", lineHeight: .95, letterSpacing: "-0.03em", color: C.brown }}>
              Book your<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>ride.</em>
            </h2>
          </div>

          {bookingResult ? (
            <div style={{ background: C.white, padding: isMobile ? "32px 24px" : "48px", borderRadius: 16, boxShadow: "0 8px 32px rgba(61,35,20,.08)", textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0,180,216,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "2rem" }}>✓</div>
              <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: C.brown, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: .95 }}>
                Request<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>received!</em>
              </h3>
              <p style={{ color: C.brownMid, fontSize: "1rem", lineHeight: 1.6, marginBottom: 8 }}>We'll confirm your spot on <strong>WhatsApp within a few hours</strong>.<br/>A confirmation email is on its way to you.</p>
              <div style={{ background: C.cream, borderRadius: 12, padding: "14px 20px", marginBottom: 28, display: "inline-block" }}>
                <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "0.65rem", color: C.terracotta, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>Your booking ref</div>
                <div style={{ fontFamily: "monospace", fontSize: "1.3rem", fontWeight: 700, color: C.brown, letterSpacing: "0.05em" }}>{bookingResult.bookingRef}</div>
              </div>
              <p style={{ color: C.brownMid, fontSize: "0.9rem", marginBottom: 16 }}>Want to speed things up? Confirm directly on WhatsApp:</p>
              <a href={bookingResult.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-t" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: C.white, textDecoration: "none", padding: "16px 28px", borderRadius: "999px", fontFamily: "'Archivo',sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", boxShadow: "0 4px 16px rgba(37,211,102,.3)" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Confirm on WhatsApp
              </a>
            </div>
          ) : (
            <div style={{ background: C.white, padding: isMobile ? "26px 20px" : "36px", borderRadius: 16, border: `1px solid ${C.sand}`, boxShadow: "0 8px 32px rgba(61,35,20,.08)" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 26 }}>
                {[1,2,3].map(s => <div key={s} style={{ height: 6, width: s === step ? 32 : 8, borderRadius: 3, background: s <= step ? C.terracotta : C.sand, transition: "all .3s ease" }} />)}
              </div>

              {step === 1 && (
                <div>
                  <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: 18, color: C.brown }}>Pick a date & time</h3>
                  <div style={{ marginBottom: 18 }}>
                    <label style={labelStyle}>Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 22 }}>
                    <label style={labelStyle}>Time</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[
                        { h: "13:30", l: "Afternoon", icon: <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></> },
                        { h: "17:00", l: "Sunset", icon: <><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></> },
                      ].map(t => (
                        <button key={t.h} onClick={() => setTime(t.h)} style={{ padding: "16px 12px", border: `1.5px solid ${time === t.h ? C.terracotta : C.sand}`, background: time === t.h ? C.terracotta : C.cream, borderRadius: 12, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: time === t.h ? C.white : C.brown, transition: "all .2s ease" }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>{t.icon}</svg>
                          <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: time === t.h ? "rgba(255,255,255,0.85)" : C.brownMid }}>{t.l}</div>
                          <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "1.1rem", fontWeight: 800 }}>{t.h}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} disabled={!date || !time} style={primaryBtn(!date || !time)}>Continue →</button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: 18, color: C.brown }}>How many of you?</h3>
                  {[
                    { label: "Adults · 39€ each", val: adults, set: setAdults, min: 1, max: 7 - kids },
                    { label: "Under 15 · 25€ each", val: kids, set: setKids, min: 0, max: 7 - adults },
                  ].map((r, i) => (
                    <div key={i} style={{ marginBottom: 18 }}>
                      <label style={labelStyle}>{r.label}</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <button onClick={() => r.set(Math.max(r.min, r.val - 1))} style={counterBtn}>−</button>
                        <div style={{ flex: 1, textAlign: "center", fontSize: "1.4rem", fontFamily: "'Archivo',sans-serif", fontWeight: 700, color: C.brown }}>{r.val}</div>
                        <button onClick={() => r.set(Math.min(r.max, r.val + 1))} style={counterBtn}>+</button>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: "16px 18px", background: C.cream, borderRadius: 12, marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, color: C.brown }}>Total</div>
                    <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "1.5rem", fontWeight: 800, color: C.terracotta }}>{total}€</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setStep(1)} style={backBtn}>← Back</button>
                    <button onClick={() => setStep(3)} className="btn-t" style={{ ...primaryBtn(false), flex: 1, width: "auto" }}>Continue →</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: 18, color: C.brown }}>Your details</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>First name</label>
                      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Last name</label>
                      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Email address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@email.com" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Phone (WhatsApp)</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+44 777 123 456" style={inputStyle} />
                  </div>
                  <div style={{ padding: "16px 18px", background: C.cream, borderRadius: 12, marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "0.65rem", color: C.terracotta, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>Summary</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: "0.88rem", color: C.brownMid }}>📅 {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span style={{ fontSize: "0.88rem", fontWeight: 600, color: C.brown }}>{time === "13:30" ? "☀️ 13:30" : "🌅 17:00"}</span>
                    </div>
                    <div style={{ fontSize: "0.88rem", color: C.brownMid, marginBottom: 8 }}>{adults} adult{adults > 1 ? "s" : ""}{kids > 0 ? ` + ${kids} under 15` : ""}</div>
                    <div style={{ borderTop: `1px solid ${C.sand}`, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, color: C.brown }}>Total</span>
                      <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, color: C.terracotta, fontSize: "1.15rem" }}>{total}€</span>
                    </div>
                  </div>
                  {bookingError && (
                    <div style={{ background: "rgba(196,98,45,0.1)", border: `1px solid ${C.terracotta}`, borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: "0.88rem", color: C.terracottaDeep }}>{bookingError}</div>
                  )}
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <button onClick={() => setStep(2)} style={backBtn}>← Back</button>
                    <button onClick={submitBooking} disabled={!firstName || !lastName || !email || !phone || submitting} className="btn-t" style={{ ...primaryBtn(!firstName || !lastName || !email || !phone || submitting), flex: 1, width: "auto" }}>
                      {submitting ? "Sending..." : "Request booking →"}
                    </button>
                  </div>
                  <p style={{ textAlign: "center", fontSize: "0.75rem", color: C.brownMid, lineHeight: 1.5 }}>No payment required now. We'll confirm on WhatsApp.</p>
                </div>
              )}

              {/* Trust signals */}
              <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px solid ${C.sand}`, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                {[
                  { icon: <polyline points="20 6 9 17 4 12"/>, l: "Free cancellation 24h" },
                  { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, l: "Albufeira pickup" },
                  { icon: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>, l: "WhatsApp confirmation" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Archivo',sans-serif", fontSize: "0.66rem", fontWeight: 500, color: C.brownMid, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={C.turquoise} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>{s.icon}</svg>
                    {s.l}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: C.creamDark, padding: isMobile ? "64px 20px" : "100px 8%", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: "center" }}>
            <span style={{ width: 22, height: 1.5, background: C.terracotta, borderRadius: 2, display: "inline-block" }} />
            <span style={{ color: C.terracotta, fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>Pricing</span>
          </div>
          <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(38px,9vw,80px)" : "clamp(48px,7vw,92px)", lineHeight: .95, letterSpacing: "-0.03em", marginBottom: 14, color: C.brown }}>
            Simple as<br/><em style={{ color: C.turquoiseDark, fontStyle: "italic" }}>that.</em>
          </h2>
          <p style={{ fontSize: "1rem", color: C.brownMid, marginBottom: 32, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>One trip, two prices. No hidden fees, no surprises. Just hop in.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24, maxWidth: 760, margin: "0 auto" }}>
            {[
              { tag: "All inclusive", label: "Adult", amount: "39", featured: true, items: ["3h30 off-road ride", "Pickup in Albufeira", "Local guide & stories", "Stops, swims, wine at viewpoint"] },
              { label: "Under 15", amount: "25", featured: false, items: ["Same trip as the adults", "Same pickup & ride", "Kids love the splash bits", "Min. age 4 years"] },
            ].map((p, i) => (
              <div key={i} className="hov" style={{ background: C.white, padding: isMobile ? "30px 22px" : "38px 30px", borderRadius: 16, textAlign: "left", border: p.featured ? `2px solid ${C.terracotta}` : "2px solid transparent", boxShadow: p.featured ? "0 12px 32px rgba(196,98,45,.15)" : "none", position: "relative" }}>
                {p.tag && <div style={{ position: "absolute", top: -12, left: 24, background: C.turquoise, color: C.white, fontFamily: "'Archivo',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "999px", boxShadow: "0 2px 8px rgba(0,180,216,.3)" }}>{p.tag}</div>}
                <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.terracotta, fontWeight: 600, marginBottom: 8 }}>{p.label}</div>
                <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "3.2rem", fontWeight: 800, color: C.brown, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 6 }}>
                  {p.amount}<span style={{ fontSize: "1.6rem", fontWeight: 600, marginLeft: 4 }}>€</span>
                </div>
                <div style={{ fontSize: "0.9rem", color: C.brownMid, marginBottom: 18 }}>Per person</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {p.items.map((item, j) => (
                    <li key={j} style={{ fontSize: "0.88rem", color: C.brownMid, padding: "5px 0", paddingLeft: 22, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: C.turquoise, fontWeight: 700 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: C.cream, padding: isMobile ? "64px 20px" : "100px 8%" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: "center" }}>
              <span style={{ width: 22, height: 1.5, background: C.terracotta, borderRadius: 2, display: "inline-block" }} />
              <span style={{ color: C.terracotta, fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>FAQ</span>
            </div>
            <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(38px,10vw,80px)" : "clamp(48px,7vw,92px)", lineHeight: .95, letterSpacing: "-0.03em", color: C.brown }}>
              Quick<br/><em style={{ color: C.terracotta, fontStyle: "italic" }}>questions.</em>
            </h2>
          </div>
          {[
            { q: "Where do you pick us up?", a: "Right in central Albufeira — your hotel, apartment, or any meeting point. Just give us the address when booking. We'll be there 5 min before the start." },
            { q: "What if it rains?", a: "Light rain is fine, the canvas top stays on and you stay dry. If it's pouring, we'll reschedule to another day at no extra cost — your booking stays valid." },
            { q: "Is it safe for kids?", a: "Yes — minimum age is 4 years. Kids absolutely love the bumpy bits and splashing through streams. Booster seats available on request. 25€ per child under 15." },
            { q: "Do I need to bring anything?", a: "Just sunscreen, a hat or sunglasses, and a towel if you fancy a swim at the waterfall. Comfortable clothes and closed shoes recommended. We'll handle everything else." },
            { q: "Can we eat or drink during the tour?", a: "Yes! We provide a glass of wine (or juice for the kids) at the viewpoint stop. Bring your own water for the ride to stay hydrated." },
            { q: "How fit do I need to be?", a: "No fitness required at all. Just sitting and enjoying the ride. Some easy walking at stops if you want to explore — totally optional." },
            { q: "Cancellation policy?", a: "Free cancellation up to 24h before the trip — full refund, no questions asked. After that, we offer to reschedule to any other available date." },
          ].map((item, i) => (
            <details key={i} style={{ borderBottom: `1px solid ${C.sand}`, borderTop: i === 0 ? `1px solid ${C.sand}` : "none", padding: "18px 0", cursor: "pointer" }}>
              <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, fontFamily: "'Archivo',sans-serif", fontWeight: 600, fontSize: isMobile ? "1rem" : "1.1rem", color: C.brown }}>
                {item.q}
                <span className="faq-icon" style={{ width: 30, height: 30, borderRadius: "50%", background: C.terracotta, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 300, flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ marginTop: 12, color: C.brownMid, lineHeight: 1.7, fontSize: isMobile ? "0.92rem" : "0.98rem", paddingRight: isMobile ? 46 : 56 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL — fond brun premium sans photo */}
      <section style={{ background: C.brown, position: "relative", overflow: "hidden" }}>
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "50%", height: "80%", borderRadius: "50%", background: C.terracotta, filter: "blur(140px)", opacity: 0.18, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "45%", height: "70%", borderRadius: "50%", background: C.turquoise, filter: "blur(140px)", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, padding: isMobile ? "100px 20px" : "140px 8%", textAlign: "center" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 18, color: C.ochre, fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600 }}>
              <span style={{ display: "inline-block", width: 22, height: 1.5, background: C.ochre }} />
              The Algarve is waiting
              <span style={{ display: "inline-block", width: 22, height: 1.5, background: C.ochre }} />
            </div>
            <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(52px,14vw,120px)" : "clamp(72px,9vw,130px)", lineHeight: .9, letterSpacing: "-0.04em", marginBottom: 22, color: C.white }}>
              Skip the beach.<br/><em style={{ color: C.ochre, fontStyle: "italic", fontWeight: 900 }}>Hop in.</em>
            </h2>
            <p style={{ fontSize: isMobile ? "1rem" : "1.1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto 36px" }}>3h30 off-road, hidden waterfalls, a glass of wine at golden hour. The real Algarve, just behind Albufeira.</p>
            <button onClick={() => goTo("#booking")} className="btn-t" style={{ background: C.terracotta, color: C.white, border: "none", padding: "20px 44px", fontFamily: "'Archivo',sans-serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "999px", boxShadow: "0 12px 40px rgba(196,98,45,.5)", display: "inline-flex", alignItems: "center", gap: 10 }}>Book your ride →</button>
            <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500 }}>
              <span>3h30 trip</span><span style={{ color: C.terracotta }}>·</span>
              <span>From 39€</span><span style={{ color: C.terracotta }}>·</span>
              <span>Daily · 13:30 & 17:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.brownDeep, color: C.cream, padding: isMobile ? "56px 20px" : "72px 8% 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 36 : 56, marginBottom: 36 }}>
            <div>
              <img src="/v3-logo.png" alt="Wild-Algarve" style={{ height: 40, marginBottom: 16, display: "block" }} loading="lazy" />
              <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(250,246,239,0.65)", maxWidth: 320 }}>Off-road jeep tours through the wild Algarve. Small groups, big adventures, real Portugal.</p>
              <a href="https://wa.me/33651581703" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18, padding: "9px 16px", background: "#25D366", color: C.white, borderRadius: "999px", fontFamily: "'Archivo',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", textDecoration: "none" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
            <div>
              <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.ochre, marginBottom: 14, fontWeight: 600 }}>Contact</div>
              <a href="https://wa.me/33651581703" style={{ display: "block", color: C.cream, textDecoration: "none", marginBottom: 8, fontSize: "0.9rem" }}>+33 6 51 58 17 03</a>
              <a href="mailto:wild.algarve@gmail.com" style={{ display: "block", color: C.cream, textDecoration: "none", fontSize: "0.9rem" }}>wild.algarve@gmail.com</a>
            </div>
            <div>
              <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.ochre, marginBottom: 14, fontWeight: 600 }}>The trip</div>
              <div style={{ fontSize: "0.9rem", color: "rgba(250,246,239,0.65)", marginBottom: 6 }}>3h30 · From 39€</div>
              <div style={{ fontSize: "0.9rem", color: "rgba(250,246,239,0.65)", marginBottom: 6 }}>Daily · 13:30 & 17:00</div>
              <div style={{ fontSize: "0.9rem", color: "rgba(250,246,239,0.65)" }}>Albufeira pickup</div>
            </div>
          </div>
          <div style={{ paddingTop: 22, borderTop: "1px solid rgba(250,246,239,0.08)", fontSize: "0.75rem", color: "rgba(250,246,239,0.4)", textAlign: isMobile ? "center" : "left" }}>
            © {new Date().getFullYear()} Wild-Algarve. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
