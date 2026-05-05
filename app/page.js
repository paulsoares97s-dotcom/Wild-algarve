"use client";

import { useState, useEffect, useRef } from "react";

const COLORS = {
  terracotta: "#C4622D",
  terracottaLight: "#D4784A",
  ochre: "#D4952A",
  cream: "#FAF6EF",
  creamDark: "#F0E8D8",
  brown: "#3D2314",
  brownMid: "#6B3D22",
  olive: "#6B7C3F",
  oliveLight: "#8A9E52",
  white: "#FFFDF9",
  sand: "#E8D5B0",
};

const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.15, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const AnimatedSection = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div ref={ref} className={className} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

const GrainOverlay = () => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    opacity: 0.4,
  }} />
);

const NAV_ITEMS = ["Experience", "The Route", "Pricing", "Book Now"];

export default function WildAlgarve() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalPrice = adults * 65 + children * 40;
  const totalPeople = adults + children + infants;

  const times = ["9:00 AM", "1:00 PM", "4:30 PM"];

  const handleBooking = () => {
    if (bookingStep < 3) setBookingStep(bookingStep + 1);
    else setBookingConfirmed(true);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", background: COLORS.cream, color: COLORS.brown, overflowX: "hidden" }}>
      <GrainOverlay />

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .nav-link {
          color: inherit;
          text-decoration: none;
          font-family: 'Lora', serif;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 2px;
          cursor: pointer;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          background: ${COLORS.terracotta};
          color: ${COLORS.white};
          border: none;
          padding: 16px 36px;
          font-family: 'Lora', serif;
          font-size: 0.85rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${COLORS.terracottaLight};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .btn-primary:hover::before { transform: scaleX(1); }
        .btn-primary span { position: relative; z-index: 1; }

        .btn-outline {
          background: transparent;
          color: ${COLORS.terracotta};
          border: 1.5px solid ${COLORS.terracotta};
          padding: 14px 32px;
          font-family: 'Lora', serif;
          font-size: 0.85rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          background: ${COLORS.terracotta};
          color: ${COLORS.white};
        }

        .card-hover {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(61,35,20,0.15);
        }

        .time-slot {
          border: 1.5px solid ${COLORS.sand};
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Lora', serif;
          background: transparent;
          color: ${COLORS.brown};
          font-size: 0.9rem;
        }
        .time-slot:hover { border-color: ${COLORS.terracotta}; color: ${COLORS.terracotta}; }
        .time-slot.selected { background: ${COLORS.terracotta}; color: white; border-color: ${COLORS.terracotta}; }

        .counter-btn {
          width: 32px; height: 32px;
          border: 1px solid ${COLORS.sand};
          background: transparent;
          cursor: pointer;
          font-size: 1.1rem;
          color: ${COLORS.brown};
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .counter-btn:hover { background: ${COLORS.terracotta}; color: white; border-color: ${COLORS.terracotta}; }

        .date-input {
          border: 1.5px solid ${COLORS.sand};
          background: transparent;
          padding: 12px 16px;
          font-family: 'Lora', serif;
          font-size: 0.9rem;
          color: ${COLORS.brown};
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .date-input:focus { border-color: ${COLORS.terracotta}; }

        .step-indicator {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          font-family: 'Lora', serif;
          transition: all 0.3s;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.cream}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.terracotta}; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "16px 48px" : "28px 48px",
        background: scrolled ? `rgba(250,246,239,0.96)` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.sand}` : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.02em", color: scrolled ? COLORS.brown : COLORS.white }}>
          Wild<span style={{ color: COLORS.terracotta }}>.</span>Algarve
        </div>
        <div style={{ display: "flex", gap: "36px", color: scrolled ? COLORS.brown : COLORS.white }}>
          {NAV_ITEMS.map(item => (
            <span key={item} className="nav-link" onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}>
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="experience" style={{
        minHeight: "100vh",
        background: `linear-gradient(165deg, ${COLORS.brown} 0%, ${COLORS.brownMid} 40%, #8B4513 70%, ${COLORS.terracotta} 100%)`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        {/* Background pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(196,98,45,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(212,149,42,0.2) 0%, transparent 50%)`,
        }} />

        {/* Decorative lines */}
        <div style={{ position: "absolute", top: "15%", right: "8%", width: "1px", height: "180px", background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)` }} />
        <div style={{ position: "absolute", top: "25%", right: "10%", width: "60px", height: "1px", background: "rgba(255,255,255,0.15)" }} />

        {/* Large background text */}
        <div style={{
          position: "absolute", bottom: "-2%", left: "-2%",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(80px, 18vw, 240px)",
          fontWeight: 900, fontStyle: "italic",
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
          letterSpacing: "-0.02em",
        }}>
          Algarve
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "0 8% 10%" }}>
          {/* Tag */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            marginBottom: "24px",
            opacity: 1,
            animation: "fadeInUp 1s ease 0.2s both",
          }}>
            <div style={{ width: "32px", height: "1px", background: COLORS.terracotta }} />
            <span style={{ color: COLORS.ochre, fontFamily: "'Lora', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Algarve, Portugal
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 8vw, 110px)",
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
            maxWidth: "700px",
          }}>
            Into the<br />
            <span style={{ fontStyle: "italic", color: COLORS.ochre }}>Wild</span><br />
            Heart
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'Lora', serif",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            maxWidth: "420px",
            marginBottom: "48px",
          }}>
            Discover the untamed soul of southern Portugal aboard an authentic UMM Jeep. Three hours. Seven souls. One unforgettable journey.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollToSection("book-now")}>
              <span>Book Your Safari</span>
            </button>
            <button className="btn-outline" style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.3)" }}
              onClick={() => scrollToSection("the-route")}>
              <span>Discover the Route</span>
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "48px", marginTop: "64px", paddingTop: "48px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[["3h", "Duration"], ["7", "Max guests"], ["2â3", "Daily tours"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: COLORS.white }}>{val}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "40px", right: "8%", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "1px", height: "48px", background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))` }} />
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", writingMode: "vertical-lr" }}>scroll</span>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section style={{ padding: "120px 8%", background: COLORS.cream }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ color: COLORS.terracotta, fontFamily: "'Lora', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "28px", height: "1px", background: COLORS.terracotta }} />
              The Experience
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "28px", color: COLORS.brown }}>
              Where the road<br /><em>ends, life begins</em>
            </h2>
            <p style={{ lineHeight: 1.9, color: COLORS.brownMid, marginBottom: "20px", fontSize: "1rem" }}>
              Climb aboard our legendary UMM Jeep â a true icon of Portuguese engineering â and venture beyond the tourist trails into the raw, ochre-dusted landscapes of the Algarve interior.
            </p>
            <p style={{ lineHeight: 1.9, color: COLORS.brownMid, fontSize: "1rem" }}>
              From hidden cork oak forests to ancient villages, dramatic cliffs to wildflower meadows, every turn reveals a side of Portugal most visitors never see.
            </p>
            <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {[["ð¿", "Native cork forests"], ["ð¦", "Local wildlife"], ["ðº", "Ancient villages"], ["ð", "Panoramic viewpoints"]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                  <span style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: COLORS.brownMid }}>{text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div style={{ position: "relative" }}>
              {/* Main image placeholder */}
              <div style={{
                aspectRatio: "3/4",
                background: `linear-gradient(145deg, ${COLORS.brownMid}, ${COLORS.terracotta}, ${COLORS.ochre})`,
                borderRadius: "2px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "12px" }}>ð</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>UMM Jeep</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.7rem", opacity: 0.6, marginTop: "4px" }}>Algarve Trails</div>
                </div>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 60%)` }} />
              </div>
              {/* Floating card */}
              <div style={{
                position: "absolute", bottom: "-24px", left: "-24px",
                background: COLORS.white,
                padding: "20px 24px",
                boxShadow: "0 16px 40px rgba(61,35,20,0.12)",
                minWidth: "180px",
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: COLORS.terracotta }}>100%</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: "0.75rem", color: COLORS.brownMid, marginTop: "4px" }}>Off-road experience<br />Authentic Portuguese</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* THE ROUTE */}
      <section id="the-route" style={{ padding: "120px 8%", background: COLORS.brown, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", backgroundImage: `radial-gradient(ellipse at right, rgba(196,98,45,0.15) 0%, transparent 70%)` }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <AnimatedSection>
            <div style={{ color: COLORS.ochre, fontFamily: "'Lora', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "28px", height: "1px", background: COLORS.ochre }} />
              The Route
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: COLORS.white, marginBottom: "64px", lineHeight: 1.1 }}>
              Your 3-hour<br /><em style={{ color: COLORS.ochre }}>adventure map</em>
            </h2>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {[
              { num: "01", place: "Albufeira", desc: "Meet your guide at the old town marina. Your UMM Jeep awaits.", icon: "â" },
              { num: "02", place: "Serra do CaldeirÃ£o", desc: "Deep into the mountain range â cork oaks, wild herbs, silence.", icon: "ð¿" },
              { num: "03", place: "Hidden Villages", desc: "Authentic whitewashed hamlets untouched by mass tourism.", icon: "ðº" },
              { num: "04", place: "Sunset Viewpoint", desc: "A secret panorama over the Algarve coast. Unforgettable.", icon: "ð" },
            ].map((stop, i) => (
              <AnimatedSection key={stop.num} delay={i * 0.1}>
                <div className="card-hover" style={{
                  background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(196,98,45,0.12)",
                  padding: "40px 28px",
                  borderTop: `2px solid ${i % 2 === 0 ? "rgba(255,255,255,0.1)" : COLORS.terracotta}`,
                  height: "100%",
                }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "16px" }}>{stop.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", fontWeight: 900, color: "rgba(255,255,255,0.06)", lineHeight: 1 }}>{stop.num}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 600, color: COLORS.white, marginTop: "-8px", marginBottom: "12px" }}>{stop.place}</div>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Lora', serif", fontSize: "0.85rem", lineHeight: 1.8 }}>{stop.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "120px 8%", background: COLORS.creamDark }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div style={{ color: COLORS.terracotta, fontFamily: "'Lora', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "1px", background: COLORS.terracotta }} />
                Pricing
                <div style={{ width: "28px", height: "1px", background: COLORS.terracotta }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, color: COLORS.brown, lineHeight: 1.1 }}>
                Simple, <em>transparent</em> pricing
              </h2>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { age: "Adults", range: "15 years +", price: "â¬65", note: "per person", featured: true },
              { age: "Children", range: "3 â 14 years", price: "â¬40", note: "per person", featured: false },
              { age: "Infants", range: "Under 3 years", price: "Free", note: "complimentary", featured: false },
            ].map((tier, i) => (
              <AnimatedSection key={tier.age} delay={i * 0.1}>
                <div style={{
                  background: tier.featured ? COLORS.terracotta : COLORS.white,
                  padding: "48px 36px",
                  position: "relative",
                  boxShadow: tier.featured ? `0 24px 48px rgba(196,98,45,0.3)` : "0 4px 20px rgba(61,35,20,0.06)",
                  transform: tier.featured ? "scale(1.04)" : "scale(1)",
                  transition: "all 0.3s",
                }}>
                  {tier.featured && (
                    <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: COLORS.ochre, color: COLORS.brown, padding: "4px 16px", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Lora', serif", whiteSpace: "nowrap" }}>
                      Most common
                    </div>
                  )}
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: tier.featured ? "rgba(255,255,255,0.7)" : COLORS.terracotta, marginBottom: "8px" }}>{tier.age}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 700, color: tier.featured ? COLORS.white : COLORS.brown, lineHeight: 1 }}>{tier.price}</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.8rem", color: tier.featured ? "rgba(255,255,255,0.6)" : COLORS.brownMid, marginTop: "6px", marginBottom: "20px" }}>{tier.note}</div>
                  <div style={{ height: "1px", background: tier.featured ? "rgba(255,255,255,0.2)" : COLORS.sand, marginBottom: "20px" }} />
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: tier.featured ? "rgba(255,255,255,0.8)" : COLORS.brownMid }}>{tier.range}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div style={{ marginTop: "40px", padding: "24px 32px", background: COLORS.white, display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 2px 12px rgba(61,35,20,0.05)" }}>
              <span style={{ fontSize: "1.5rem" }}>â¹ï¸</span>
              <p style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: COLORS.brownMid, lineHeight: 1.7 }}>
                Maximum <strong>7 guests</strong> per safari. Private bookings available for groups. Pickup from Albufeira town centre included. Water and local snacks provided.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="book-now" style={{ padding: "120px 8%", background: COLORS.cream }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div style={{ color: COLORS.terracotta, fontFamily: "'Lora', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "1px", background: COLORS.terracotta }} />
                Book Now
                <div style={{ width: "28px", height: "1px", background: COLORS.terracotta }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: COLORS.brown, lineHeight: 1.1 }}>
                Reserve your<br /><em>adventure</em>
              </h2>
            </div>
          </AnimatedSection>

          {!bookingConfirmed ? (
            <AnimatedSection>
              {/* Steps */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "48px", gap: "0" }}>
                {["Date & Time", "Guests", "Confirm"].map((label, i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <div className="step-indicator" style={{
                        background: bookingStep > i + 1 ? COLORS.olive : bookingStep === i + 1 ? COLORS.terracotta : "transparent",
                        border: `1.5px solid ${bookingStep >= i + 1 ? "transparent" : COLORS.sand}`,
                        color: bookingStep >= i + 1 ? COLORS.white : COLORS.brownMid,
                      }}>
                        {bookingStep > i + 1 ? "â" : i + 1}
                      </div>
                      <span style={{ fontFamily: "'Lora', serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: bookingStep === i + 1 ? COLORS.terracotta : COLORS.brownMid }}>{label}</span>
                    </div>
                    {i < 2 && <div style={{ flex: 1, height: "1px", background: bookingStep > i + 1 ? COLORS.olive : COLORS.sand, margin: "0 8px", marginBottom: "20px" }} />}
                  </div>
                ))}
              </div>

              <div style={{ background: COLORS.white, padding: "40px", boxShadow: "0 4px 32px rgba(61,35,20,0.06)" }}>
                {/* Step 1 */}
                {bookingStep === 1 && (
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "28px", color: COLORS.brown }}>Choose your date</h3>
                    <div style={{ marginBottom: "32px" }}>
                      <label style={{ display: "block", fontFamily: "'Lora', serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.brownMid, marginBottom: "10px" }}>Select date</label>
                      <input type="date" className="date-input" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "'Lora', serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.brownMid, marginBottom: "10px" }}>Select departure time</label>
                      <div style={{ display: "flex", gap: "12px" }}>
                        {times.map(time => (
                          <button key={time} className={`time-slot ${selectedTime === time ? "selected" : ""}`} onClick={() => setSelectedTime(time)}>{time}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {bookingStep === 2 && (
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "28px", color: COLORS.brown }}>Who's coming?</h3>
                    {[
                      { label: "Adults", sub: "15 years +", price: "â¬65", val: adults, set: setAdults, min: 1 },
                      { label: "Children", sub: "3â14 years", price: "â¬40", val: children, set: setChildren, min: 0 },
                      { label: "Infants", sub: "Under 3 years", price: "Free", val: infants, set: setInfants, min: 0 },
                    ].map(({ label, sub, price, val, set, min }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderBottom: `1px solid ${COLORS.sand}` }}>
                        <div>
                          <div style={{ fontFamily: "'Lora', serif", fontSize: "0.95rem", color: COLORS.brown }}>{label}</div>
                          <div style={{ fontFamily: "'Lora', serif", fontSize: "0.75rem", color: COLORS.brownMid }}>{sub} Â· {price}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <button className="counter-btn" onClick={() => set(Math.max(min, val - 1))}>â</button>
                          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", minWidth: "24px", textAlign: "center" }}>{val}</span>
                          <button className="counter-btn" onClick={() => { if (totalPeople < 7) set(val + 1); }}
                            disabled={totalPeople >= 7} style={{ opacity: totalPeople >= 7 ? 0.3 : 1 }}>+</button>
                        </div>
                      </div>
                    ))}
                    {totalPeople >= 7 && (
                      <p style={{ marginTop: "12px", fontFamily: "'Lora', serif", fontSize: "0.8rem", color: COLORS.terracotta }}>Maximum 7 guests per safari reached.</p>
                    )}
                  </div>
                )}

                {/* Step 3 */}
                {bookingStep === 3 && (
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "28px", color: COLORS.brown }}>Confirm your booking</h3>
                    <div style={{ background: COLORS.cream, padding: "24px", marginBottom: "24px" }}>
                      {[
                        ["Date", selectedDate || "â"],
                        ["Departure", selectedTime || "â"],
                        ["Adults", `${adults} Ã â¬65`],
                        ...(children > 0 ? [["Children", `${children} Ã â¬40`]] : []),
                        ...(infants > 0 ? [["Infants", `${infants} Ã Free`]] : []),
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                          <span style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: COLORS.brownMid }}>{k}</span>
                          <span style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: COLORS.brown }}>{v}</span>
                        </div>
                      ))}
                      <div style={{ height: "1px", background: COLORS.sand, margin: "16px 0" }} />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: COLORS.brown }}>Total</span>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: COLORS.terracotta }}>â¬{totalPrice}</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Lora', serif", fontSize: "0.8rem", color: COLORS.brownMid, lineHeight: 1.7 }}>
                      By confirming, you agree to our cancellation policy. Free cancellation up to 48h before departure.
                    </p>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", alignItems: "center" }}>
                  {bookingStep > 1 ? (
                    <button onClick={() => setBookingStep(bookingStep - 1)} style={{ background: "none", border: "none", fontFamily: "'Lora', serif", fontSize: "0.85rem", color: COLORS.brownMid, cursor: "pointer", textDecoration: "underline" }}>â Back</button>
                  ) : <div />}
                  <button className="btn-primary" onClick={handleBooking}
                    disabled={bookingStep === 1 && (!selectedDate || !selectedTime)}>
                    <span>{bookingStep === 3 ? "Confirm & Book" : "Continue â"}</span>
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div style={{ background: COLORS.white, padding: "56px 40px", textAlign: "center", boxShadow: "0 4px 32px rgba(61,35,20,0.06)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>ð¿</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: COLORS.brown, marginBottom: "16px" }}>
                  You're <em>all set!</em>
                </h3>
                <p style={{ fontFamily: "'Lora', serif", color: COLORS.brownMid, lineHeight: 1.8, marginBottom: "32px" }}>
                  Your Wild Algarve safari is booked. A confirmation email will be sent to you shortly. We can't wait to show you the real Algarve.
                </p>
                <div style={{ background: COLORS.cream, padding: "20px", display: "inline-block" }}>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.75rem", color: COLORS.brownMid, letterSpacing: "0.1em", textTransform: "uppercase" }}>Meet us at</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: COLORS.brown, marginTop: "4px" }}>Albufeira Old Town Marina</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: COLORS.terracotta, marginTop: "4px" }}>{selectedDate} Â· {selectedTime}</div>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.brown, padding: "64px 8% 40px", color: "rgba(255,255,255,0.6)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px", flexWrap: "wrap", gap: "32px" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: COLORS.white, marginBottom: "12px" }}>
                Wild<span style={{ color: COLORS.terracotta }}>.</span>Algarve
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", lineHeight: 1.8, maxWidth: "260px" }}>
                Authentic off-road safari experiences in the heart of southern Portugal.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.ochre, marginBottom: "16px" }}>Contact</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", lineHeight: 2 }}>
                <div>ð Albufeira, Algarve, Portugal</div>
                <div>ð +351 000 000 000</div>
                <div>âï¸ hello@wildalgarve.com</div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.ochre, marginBottom: "16px" }}>Hours</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", lineHeight: 2 }}>
                <div>Daily departures</div>
                <div>9:00 AM Â· 1:00 PM Â· 4:30 PM</div>
                <div style={{ color: COLORS.terracotta }}>Open every day</div>
              </div>
            </div>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontFamily: "'Lora', serif", fontSize: "0.75rem" }}>Â© 2025 Wild Algarve. All rights reserved.</span>
            <span style={{ fontFamily: "'Lora', serif", fontSize: "0.75rem" }}>Made with â¤ï¸ in Portugal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
