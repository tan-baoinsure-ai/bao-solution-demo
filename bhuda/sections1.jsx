/* Budha&Co — sections part 1: Nav, Hero, story bands */
const { useState, useEffect, useRef } = React;
const { Icon, Seal, Wordmark, Reveal, Heading, Photo, TINTS } = window;

/* ---------- NAV ---------- */
const NAV_LINKS = [
  ["Our Food", "#food"], ["Menu", "#menu"], ["Top 5", "#top5"],
  ["Gallery", "#gallery"], ["Reserve", "#reserve"], ["Contact", "#contact"],
];
const Nav = ({ cartCount, onCart, onReserve }) => {
  const [scrolled, setScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const hero = document.querySelector(".hero");
      setOnHero(hero ? window.scrollY < hero.offsetHeight - 90 : false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <nav className={"nav" + (scrolled ? " scrolled" : "") + (onHero ? " on-hero" : "")}>
        <Wordmark onClick={() => setMobile(false)} />
        <div className="nav-links">
          {NAV_LINKS.map(([t, h]) => <a key={h} href={h}>{t}</a>)}
        </div>
        <div className="nav-cta">
          <button className="btn btn-primary btn-sm" onClick={onReserve}>Book a table</button>
          <button className="btn btn-ghost btn-sm" onClick={onCart} style={{ position: "relative" }}>
            <Icon name="cart" style={{ width: 18, height: 18 }} />
            Order
            {cartCount > 0 && <span key={cartCount} className="nav-cart-badge">{cartCount}</span>}
          </button>
          <button className="nav-burger" onClick={() => setMobile((m) => !m)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={"mobile-menu" + (mobile ? " show" : "")}>
        {NAV_LINKS.map(([t, h]) => <a key={h} href={h} onClick={() => setMobile(false)}>{t}</a>)}
        <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
          <button className="btn btn-primary" onClick={() => { setMobile(false); onReserve(); }}>Book a table</button>
          <button className="btn btn-ghost on-dark" onClick={() => { setMobile(false); onCart(); }}>Order now</button>
        </div>
      </div>
    </>
  );
};

/* ---------- HERO reservation card (OpenTable) ---------- */
const HeroReserveCard = ({ onReserved }) => {
  const B = window.BUDHA;
  const todayStr = new Date().toISOString().slice(0, 10);
  const [party, setParty] = useState("2");
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState("7:00 pm");
  return (
    <div className="hero-res-card">
      <div className="hrc-head">
        <div className="ot-badge">OT</div>
        <div>
          <div className="hrc-title">Reserve a table</div>
          <div className="hrc-sub">Powered by OpenTable</div>
        </div>
      </div>
      <div className="hrc-row">
        <div className="field">
          <label>Guests</label>
          <select value={party} onChange={(e) => setParty(e.target.value)}>
            {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => <option key={n} value={n}>{n} {n === "1" ? "guest" : "guests"}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Date</label>
          <input type="date" value={date} min={todayStr} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>Time</label>
        <div className="slot-times">
          {B.reservationTimes.slice(0, 6).map((t) => (
            <button key={t} type="button" className={"slot-time" + (time === t ? " sel" : "")} onClick={() => setTime(t)}>{t}</button>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 18 }}
        onClick={() => onReserved({ party, date, time })}>
        <Icon name="calendar" style={{ width: 17, height: 17 }} />Find a table
      </button>
      <p className="hrc-foot">Free cancellation up to 2 hrs before · Instant confirmation</p>
    </div>
  );
};

/* ---------- HERO ---------- */
const Hero = ({ onReserve, onCart, onReserved }) => (
  <header className="hero" id="top">
    <div className="hero-bg">
      <Photo id="hero-main" tint={TINTS.dark} radius={0} placeholder="Drop an Asian dining-room photo" />
    </div>
    <span className="cn hero-cn" aria-hidden="true">素食</span>
    <div className="wrap hero-inner">
      <div className="hero-grid">
        <Reveal>
          <span className="kicker">Vegan Asian Kitchen · Chinatown, Sydney</span>
          <h1>Bold, plant‑based<br /><span className="it">Asian soul food.</span></h1>
          <p className="hero-sub">
            A vegan food tour across Asia — from Sichuan heat to Penang laksa — crafted to win over
            the most devoted meat lover. No compromise. All flavour.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={onReserve}><Icon name="calendar" style={{ width: 18, height: 18 }} />Reserve a table</button>
            <button className="btn btn-ghost on-dark btn-lg" onClick={onCart}>View menu &amp; order</button>
          </div>
          <div className="hero-meta">
            <div><div className="m-k">4.9★</div><div className="m-l">1,240+ reviews</div></div>
            <div><div className="m-k">100%</div><div className="m-l">Plant-based</div></div>
            <div><div className="m-k">Est. 2022</div><div className="m-l">Dixon Street</div></div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <HeroReserveCard onReserved={onReserved} />
        </Reveal>
      </div>
    </div>
  </header>
);

/* ---------- MARQUEE ---------- */
const Marquee = () => {
  const words = ["Bold", "Plant-based", "Unapologetically Asian", "Made fresh daily", "100% Vegan", "Sydney born"];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <span key={dup}>{words.map((w, i) => <React.Fragment key={i}>{w}</React.Fragment>)}</span>
        ))}
      </div>
    </div>
  );
};

/* ---------- WHO WE ARE ---------- */
const WhoWeAre = () => (
  <section className="section-pad" id="who">
    <div className="wrap split">
      <Reveal>
        <Heading
          eyebrow="Who we are"
          title="A love letter to Asia, written in&nbsp;<span class='it' style='font-style:italic;color:var(--red)'>vegetables</span>."
          lede="Budha&Co opened on Dixon Street in 2022 with one stubborn belief: that vegan Asian food shouldn't ask you to give anything up. It should give you more."
        />
        <p style={{ marginTop: 22, color: "var(--ink-soft)", maxWidth: "54ch" }}>
          We grew up around bustling hawker stalls and Sunday yum cha — the clatter of woks, the
          steam, the joy of sharing. Our kitchen carries that energy forward, entirely plant-based,
          honouring centuries of Buddhist temple cooking while flirting shamelessly with the new.
        </p>
        <ul className="sig-list">
          <li><span className="n">素</span><div><h4>Vegetable-first, always</h4><p>Real produce, treated like the star — not an imitation of something else.</p></div></li>
          <li><span className="n">味</span><div><h4>Flavour without apology</h4><p>Deep, fermented, smoky, numbing, sweet. We chase the big notes.</p></div></li>
          <li><span className="n">緣</span><div><h4>Made to be shared</h4><p>Banquet-style plates built for a crowded, happy table.</p></div></li>
        </ul>
      </Reveal>
      <Reveal delay={120}>
        <div className="stack-photos">
          <Seal className="who-seal">福</Seal>
          <Photo className="a" id="who-1" tint={TINTS.green} tag="Our dining room, Dixon St" placeholder="Drop a restaurant interior photo" />
          <Photo className="b" id="who-2" tint={TINTS.red} tag="Wok station" placeholder="Drop a kitchen / chef photo" />
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------- ABOUT OUR FOOD ---------- */
const AboutFood = () => (
  <section className="section-pad band-dark" id="food">
    <div className="wrap">
      <Reveal>
        <Heading center dark
          eyebrow="About our food"
          title="One tour. <span class='it' style='font-style:italic;color:#f0c27a'>Every</span> corner of Asia."
          lede="From Chengdu to George Town, our menu travels — reimagining the dishes we love with nothing but plants. Each plate is photographed, plated and seasoned to make you forget there was ever meat to miss."
        />
      </Reveal>
      <Reveal delay={100} style={{ marginTop: 56 }}>
        <div className="foodgrid">
          <Photo className="fg-1" id="food-1" tint={TINTS.amber} tag="Smoked King Oyster Char Siu" placeholder="Hero dish — wide shot" />
          <Photo className="fg-2" id="food-2" tint={TINTS.red} tag="Mapo Silken Tofu" placeholder="Close-up, steam & chilli oil" />
          <Photo className="fg-3" id="food-3" tint={TINTS.jade} tag="Summer rolls" placeholder="Fresh, bright dish" />
          <Photo className="fg-4" id="food-4" tint={TINTS.olive} tag="Dan Dan Noodles" placeholder="Noodle dish, top-down" />
          <Photo className="fg-5" id="food-5" tint={TINTS.amber} tag="Black Sesame Soft Serve" placeholder="Dessert shot" />
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------- WHY VEGANISM ---------- */
const WhyVegan = () => {
  const B = window.BUDHA;
  return (
    <section className="section-pad band-green" id="why">
      <div className="wrap">
        <Reveal>
          <Heading dark
            eyebrow="Why veganism"
            title="Eating plants is the <span class='it' style='font-style:italic'>oldest</span> new idea."
            lede="Long before it was a movement, Asian kitchens were turning tofu, mushrooms and greens into feasts. We think the future of food tastes a lot like its past."
          />
        </Reveal>
        <div className="why-grid">
          {B.why.map((w, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="why-card">
                <div className="ic"><Icon name={w.icon} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="why-stats">
            {B.whyStats.map((s, i) => (
              <div key={i}><div className="k">{s.k}</div><div className="l">{s.l}</div></div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ---------- INGREDIENTS ---------- */
const Ingredients = () => {
  const B = window.BUDHA;
  const tints = [TINTS.cream, TINTS.olive, TINTS.amber, TINTS.jade];
  return (
    <section className="section-pad" id="ingredients">
      <div className="wrap">
        <Reveal>
          <Heading center
            eyebrow="About our ingredients"
            title="Sourced with <span class='it' style='font-style:italic;color:var(--red)'>obsession</span>."
            lede="Great vegan food is only as good as its produce. We buy small, local and seasonal — then treat every ingredient like it matters, because it does."
          />
        </Reveal>
        <div className="ing-grid">
          {B.ingredients.map((ing, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="ing-card">
                <Photo id={"ing-" + i} tint={tints[i % tints.length]} placeholder={"Photo: " + ing.name} />
                <h4>{ing.name} <span className="cn" style={{ writingMode: "horizontal-tb", color: "var(--red)", fontSize: "1.1rem" }}>{ing.cn}</span></h4>
                <p>{ing.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Nav, Hero, Marquee, WhoWeAre, AboutFood, WhyVegan, Ingredients });
