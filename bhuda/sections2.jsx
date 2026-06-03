/* Budha&Co — sections part 2: Top5, Gallery, Instagram, Reviews, FAQ, Contact, Footer */
const { useState, useEffect } = React;
const { Icon: Icn, Seal: Sl, Wordmark: Wm, Reveal: Rv, Heading: Hd, Photo: Ph, TINTS: TN } = window;

/* ---------- TOP 5 ---------- */
const Top5 = ({ onAdd }) => {
  const B = window.BUDHA;
  const tints = [TN.amber, TN.red, TN.jade, TN.olive, TN.green];
  return (
    <section className="section-pad" id="top5" style={{ background: "var(--beige)" }}>
      <div className="wrap">
        <Rv>
          <div className="top5-head">
            <Hd
              eyebrow="Top 5 must-try"
              title="The dishes people <span class='it' style='font-style:italic;color:var(--red)'>cross town</span> for."
            />
            <p style={{ maxWidth: "34ch", color: "var(--ink-soft)", margin: 0 }}>
              New here? Start with these five. Tap any dish to drop it straight into your order.
            </p>
          </div>
        </Rv>
        <div className="top5-list">
          {B.top5.map((d, i) => (
            <Rv key={i} delay={i * 60}>
              <div className="top5-row" onClick={() => onAdd({ name: d.name, price: d.price, slot: d.slot })}>
                <div className="rank">{String(i + 1).padStart(2, "0")}</div>
                <div className="name"><span className="ro">{d.ro}</span>{d.name}</div>
                <div className="desc">{d.desc}</div>
                <div className="thumb"><Ph id={"top5-" + i} tint={tints[i]} radius={12} placeholder="" /></div>
                <span className="go"><Icn name="plus" style={{ width: 18, height: 18 }} /></span>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- GALLERY ---------- */
const Gallery = () => {
  const tints = [TN.red, TN.jade, TN.amber, TN.olive, TN.green, TN.dark];
  const tags = ["Plating up", "Laksa hour", "Dumpling fold", "The pass", "Sunday banquet", "House-made tofu"];
  return (
    <section className="section-pad" id="gallery">
      <div className="wrap">
        <Rv><div className="gallery-cap"><Hd center eyebrow="Our gallery" title="Come hungry. <span class='it' style='font-style:italic;color:var(--red)'>Leave glowing.</span>" /></div></Rv>
        <Rv delay={80}>
          <div className="gallery-grid">
            {tints.map((t, i) => (
              <Ph key={i} id={"gal-" + i} tint={t} tag={tags[i]} placeholder="Drop a photo" />
            ))}
          </div>
        </Rv>
      </div>
    </section>
  );
};

/* ---------- INSTAGRAM ---------- */
const InstagramGallery = () => {
  const I = window.BUDHA.info;
  const tints = [TN.amber, TN.jade, TN.red, TN.olive, TN.green, TN.dark, TN.cream, TN.amber, TN.red, TN.jade, TN.olive, TN.green];
  return (
    <section className="section-pad band-dark" id="instagram">
      <div className="wrap">
        <Rv>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
            <Hd dark eyebrow="Instagram" title="<span class='it' style='font-style:italic;color:#f0c27a'>@budhaandco</span>" />
            <a className="btn btn-ghost on-dark" href="https://instagram.com" target="_blank" rel="noopener">
              <Icn name="instagram" style={{ width: 18, height: 18 }} />Follow us
            </a>
          </div>
        </Rv>
        <Rv delay={80}>
          <div className="ig-grid">
            {tints.map((t, i) => (
              <a key={i} href="https://instagram.com" target="_blank" rel="noopener" style={{ position: "relative", display: "block" }}>
                <Ph id={"ig-" + i} tint={t} radius={12} placeholder="" />
                <span className="ig-ic" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0, background: "rgba(35,35,15,.45)", transition: "opacity .25s", borderRadius: 12, color: "var(--cream)", zIndex: 4 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)} onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}>
                  <Icn name="instagram" style={{ width: 26, height: 26 }} />
                </span>
              </a>
            ))}
          </div>
        </Rv>
      </div>
    </section>
  );
};

/* ---------- REVIEWS ---------- */
const Reviews = () => {
  const B = window.BUDHA;
  const avTints = [TN.green, TN.red, TN.amber];
  return (
    <section className="section-pad" id="reviews" style={{ background: "var(--beige)" }}>
      <div className="wrap">
        <Rv><Hd center eyebrow="Customer reviews" title="Don't take our word. <span class='it' style='font-style:italic;color:var(--red)'>Take theirs.</span>" /></Rv>
        <div className="rev-grid">
          {B.reviews.map((r, i) => (
            <Rv key={i} delay={i * 100}>
              <div className="rev-card card">
                <div className="stars">{"★".repeat(r.stars)}</div>
                <blockquote>“{r.quote}”</blockquote>
                <div className="who">
                  <div className="av"><Ph id={"rev-" + i} tint={avTints[i]} shape="circle" placeholder="" /></div>
                  <div><div className="nm">{r.nm}</div><div className="src">{r.src}</div></div>
                </div>
              </div>
            </Rv>
          ))}
        </div>
        <Rv>
          <div className="rev-summary">
            <div style={{ textAlign: "center" }}>
              <div className="big" style={{ color: "var(--red)" }}>{B.reviewSummary.rating}<span style={{ fontSize: "1.4rem" }}>★</span></div>
              <div className="src" style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-soft)", marginTop: 6 }}>{B.reviewSummary.count} reviews</div>
            </div>
            {B.reviewSummary.sources.map((s) => (
              <div className="logo-cnt" key={s}><div style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 600 }}>{s}</div><div className="src">Rated 4.8–5.0</div></div>
            ))}
          </div>
        </Rv>
      </div>
    </section>
  );
};

/* ---------- FAQ ---------- */
const FAQ = () => {
  const B = window.BUDHA;
  const [open, setOpen] = useState(0);
  return (
    <section className="section-pad" id="faq">
      <div className="wrap">
        <Rv><Hd center eyebrow="FAQ" title="Good to <span class='it' style='font-style:italic;color:var(--red)'>know</span>." /></Rv>
        <div className="faq-list">
          {B.faqs.map((f, i) => (
            <Rv key={i} delay={i * 40}>
              <div className={"faq-item" + (open === i ? " open" : "")}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}<span className="pm" />
                </button>
                <div className="faq-a" style={{ maxHeight: open === i ? "260px" : "0" }}>
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- CONTACT ---------- */
const Contact = () => {
  const I = window.BUDHA.info;
  const rows = [
    { ic: "pin", h: "Find us", v: <>{I.address}<br />{I.city}</> },
    { ic: "clock", h: "Hours", v: <>{I.hours.map(([d, t]) => <div key={d} style={{ display: "flex", gap: 14 }}><span style={{ minWidth: 110, color: "var(--ink-soft)" }}>{d}</span><span>{t}</span></div>)}</> },
    { ic: "phone", h: "Call", v: <a href={"tel:" + I.phoneHref}>{I.phone}</a> },
    { ic: "mail", h: "Email", v: <a href={"mailto:" + I.email}>{I.email}</a> },
  ];
  return (
    <section className="section-pad" id="contact" style={{ background: "var(--beige)" }}>
      <div className="wrap">
        <Rv><Hd eyebrow="Our contacts" title="Come see us in <span class='it' style='font-style:italic;color:var(--red)'>Chinatown.</span>" lede="Right on Dixon Street, in the heart of Sydney's CBD — two minutes from Town Hall station." /></Rv>
        <div className="contact-grid" style={{ marginTop: 50 }}>
          <Rv>
            <div className="contact-info">
              {rows.map((r, i) => (
                <div className="ci-row" key={i}>
                  <span className="ic"><Icn name={r.ic} style={{ width: 24, height: 24 }} /></span>
                  <div><h4>{r.h}</h4><div className="v">{r.v}</div></div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
                <a className="btn btn-dark" href="https://maps.google.com/?q=Dixon+Street+Haymarket+Sydney" target="_blank" rel="noopener"><Icn name="pin" style={{ width: 18, height: 18 }} />Get directions</a>
              </div>
            </div>
          </Rv>
          <Rv delay={120}>
            <div className="contact-map">
              <iframe
                className="map-iframe"
                src="https://www.openstreetmap.org/export/embed.html?bbox=151.2027%2C-33.8803%2C151.2067%2C-33.8773&layer=mapnik&marker=-33.8793%2C151.2047"
                loading="lazy"
                title="Budha&Co — 1 Dixon Street, Haymarket, Sydney"
              ></iframe>
              <a
                className="map-glink"
                href="https://maps.google.com/?q=1+Dixon+Street+Haymarket+Sydney+NSW+2000"
                target="_blank"
                rel="noopener"
              >
                <Icn name="pin" style={{ width: 14, height: 14 }} />
                View on Google Maps
              </a>
            </div>
          </Rv>
        </div>
      </div>
    </section>
  );
};

/* ---------- FOOTER ---------- */
const Footer = ({ onReserve, onCart }) => {
  const I = window.BUDHA.info;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="fm">
            <div className="mk" style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
              <Sl style={{ width: 34, height: 34, fontSize: 18, borderRadius: 8 }}>素</Sl>
              <span>Budha<span className="amp">&amp;</span>Co</span>
            </div>
            <p style={{ color: "rgba(247,240,224,.7)", marginTop: 18, maxWidth: "34ch", fontSize: ".95rem" }}>
              Bold, plant-based Asian soul food in the heart of Sydney's Chinatown. Vegan since day one.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              {[["instagram", "https://instagram.com"], ["facebook", "https://facebook.com"]].map(([ic, h]) => (
                <a key={ic} href={h} target="_blank" rel="noopener" style={{ width: 42, height: 42, borderRadius: 10, display: "grid", placeItems: "center", border: "1px solid rgba(247,240,224,.2)", color: "var(--cream)" }}>
                  <Icn name={ic} style={{ width: 20, height: 20 }} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="#food">Our food</a></li>
              <li><a href="#menu">Full menu</a></li>
              <li><a href="#top5">Top 5 dishes</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#why">Why vegan</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li><a href="#contact">{I.address}</a></li>
              <li><a href={"tel:" + I.phoneHref}>{I.phone}</a></li>
              <li><a href={"mailto:" + I.email}>{I.email}</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Order &amp; book</h4>
            <ul>
              <li><a onClick={onReserve} style={{ cursor: "pointer" }}>Reserve · OpenTable</a></li>
              <li><a onClick={onCart} style={{ cursor: "pointer" }}>Pickup order</a></li>
              <li><a href="https://www.ubereats.com" target="_blank" rel="noopener">Uber Eats</a></li>
              <li><a href="https://www.doordash.com" target="_blank" rel="noopener">DoorDash</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Budha&Co. Made with plants in Sydney.</span>
          <span style={{ display: "flex", gap: 22 }}>
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Accessibility</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Top5, Gallery, InstagramGallery, Reviews, FAQ, Contact, Footer });
