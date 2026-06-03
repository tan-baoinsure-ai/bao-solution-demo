/* Budha&Co — shared UI primitives. Exports to window. */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Icon set (stroke) ---------- */
const Icon = ({ name, ...p }) => {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
    cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.6 13h10.2l2.2-9H6" /></>,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    check: <path d="M4 12.5 9.5 18 20 6.5" />,
    leaf: <path d="M11 20c-4 0-8-3-8-9 6 0 9 1 11 4M21 4C9 4 6 11 11 17c4-5 6-9 10-13z" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    bowl: <><path d="M3 11h18a9 9 0 0 1-18 0z" /><path d="M8 7c0-1.5 1-2 1-3M12 6c0-1.5 1-2 1-3M16 7c0-1.5 1-2 1-3" /></>,
    pin: <><path d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M16 6a3 3 0 0 1 0 6M21 20c0-2.5-1.5-4-4-4.5" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M14 8h2V5h-2c-2 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.5c0-.4.3-.5.7-.5z" />,
    heart: <path d="M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      {paths[name]}
    </svg>
  );
};

/* Brand glyph logos for delivery partners (text-mark placeholders) */
const Seal = ({ children, ...p }) => (
  <span className="seal" {...p}>{children}</span>
);

const Wordmark = ({ onClick }) => (
  <a className="wordmark" onClick={onClick} href="#top" aria-label="Budha&Co home">
    <Seal className="chop">素</Seal>
    <span className="mk">Budha<span className="amp">&amp;</span>Co</span>
  </a>
);

/* ---------- Scroll reveal ---------- */
const Reveal = ({ children, className = "", style, delay = 0, as: Tag = "div" }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => setTimeout(() => el.classList.add("in"), delay);
    // If already in view on mount (e.g. hero / above-the-fold), reveal now —
    // don't depend on an IntersectionObserver that may not fire for content
    // that's visible before first paint.
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (el.getBoundingClientRect().top < vh * 0.95) { reveal(); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) { reveal(); io.unobserve(el); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={"reveal " + className} style={style}>{children}</Tag>;
};

/* ---------- Section heading block ---------- */
const Heading = ({ eyebrow, title, lede, center, dark, children }) => (
  <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? "780px" : "none", margin: center ? "0 auto" : 0 }}>
    {eyebrow && <span className={"eyebrow" + (center ? " center" : "")}>{eyebrow}</span>}
    {title && <h2 className="title" dangerouslySetInnerHTML={{ __html: title }} />}
    {lede && <p className="lede" style={{ marginTop: "20px", marginInline: center ? "auto" : 0 }}>{lede}</p>}
    {children}
  </div>
);

/* ---------- A branded photo slot (drag-drop + designed empty state) ---------- */
const Photo = ({ id, tint, label, tag, shape = "rounded", radius = 18, className = "", placeholder, src, children }) => {
  const resolved = src || (window.BUDHA && window.BUDHA.imgById && window.BUDHA.imgById[id]) || null;
  return (
    <div className={"photo " + className} style={{ width: "100%", height: "100%" }}>
      <image-slot
        id={id}
        shape={shape}
        radius={String(radius)}
        placeholder={placeholder || label || "Drop a photo"}
        src={resolved || undefined}
        style={{ "--slot-bg": tint, width: "100%", height: "100%" }}
      ></image-slot>
      {tag && <span className="tag">{tag}</span>}
      {children}
    </div>
  );
};

/* food-tone tints for placeholder slots */
const TINTS = {
  green:  "linear-gradient(140deg, #7a7a14, #565609)",
  red:    "linear-gradient(140deg, #c25216, #8f3800)",
  amber:  "linear-gradient(140deg, #d98a2b, #b34700)",
  olive:  "linear-gradient(140deg, #8a8a2e, #5a5a10)",
  cream:  "linear-gradient(140deg, #efe5d0, #e2d4b2)",
  dark:   "linear-gradient(140deg, #3a3a10, #232307)",
  jade:   "linear-gradient(140deg, #5e7a3a, #38501f)",
};

/* ---------- Brand logos: Uber Eats · DoorDash ---------- */
const UberEatsLogo = ({ onDark, size = 17 }) => (
  <span style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: size, letterSpacing: "-0.02em", lineHeight: 1, whiteSpace: "nowrap" }}>
    <span style={{ color: onDark ? "#ffffff" : "#142328" }}>Uber</span>
    <span style={{ color: "#06C167" }}>&nbsp;Eats</span>
  </span>
);
const DoorDashLogo = ({ onDark, size = 17 }) => {
  const clr = onDark ? "#ffffff" : "#FF3008";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block", flexShrink: 0 }}>
        <path fill={clr} d="M23.071 8.409a6.09 6.09 0 00-5.396-3.228H.584A.589.589 0 00.17 6.184L3.894 9.93a1.752 1.752 0 001.242.516h12.049a1.554 1.554 0 11.031 3.108H8.91a.589.589 0 00-.415 1.003l3.725 3.747a1.75 1.75 0 001.242.516h3.757c4.887 0 8.584-5.225 5.852-10.413z"/>
      </svg>
      <span style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: size, letterSpacing: "-0.025em", color: clr }}>DoorDash</span>
    </span>
  );
};

/* ---------- Floating dock — Uber Eats · DoorDash · Call (always visible) ---------- */
const FloatingDock = () => {
  const I = window.BUDHA.info;
  return (
    <div className="dock">
      <a className="dock-pill" href="https://www.ubereats.com" target="_blank" rel="noopener" aria-label="Order on Uber Eats">
        <UberEatsLogo />
      </a>
      <a className="dock-pill" href="https://www.doordash.com" target="_blank" rel="noopener" aria-label="Order on DoorDash">
        <DoorDashLogo />
      </a>
      <a className="dock-pill phone" href={"tel:" + I.phoneHref} aria-label={"Call " + I.phone}>
        <Icon name="phone" style={{ width: 18, height: 18 }} />
        <span className="dp-num">{I.phone}</span>
      </a>
    </div>
  );
};

/* ---------- Toast ---------- */
const Toast = ({ msg, show }) => (
  <div className={"toast" + (show ? " show" : "")}><Icon name="check" style={{ width: 18, height: 18, color: "#f0c27a" }} />{msg}</div>
);

Object.assign(window, { Icon, Seal, Wordmark, Reveal, Heading, Photo, TINTS, FloatingDock, Toast, UberEatsLogo, DoorDashLogo });
