/* Budha&Co — interactive shop: Menu, Reserve, Cart drawer, Checkout, App root */
const { useState, useEffect, useRef, useCallback } = React;
const { Icon: I2, Seal: S2, Reveal: R2, Heading: H2, Photo: P2, TINTS: T2,
        Nav: NavBar, Hero: HeroSec, Marquee: MarqueeStrip,
        WhoWeAre: WhoSec, AboutFood: FoodSec, WhyVegan: WhySec, Ingredients: IngSec,
        Top5: Top5Sec, Gallery: GallerySec, InstagramGallery: IgSec, Reviews: RevSec,
        FAQ: FaqSec, Contact: ContactSec, Footer: FooterSec, FloatingDock: Dock, Toast: ToastEl } = window;

const fmt = (n) => "$" + n.toFixed(2);

/* ---------- MENU ---------- */
const TagPills = ({ tags }) => (
  <span className="mi-badges">
    {tags.map((t) => {
      const label = t === "gf" ? "GF" : t === "spicy" ? "Spicy" : "Signature";
      return <span key={t} className={"tagpill " + t}>{label}</span>;
    })}
  </span>
);

const MenuSection = ({ onAdd }) => {
  const B = window.BUDHA;
  const [cat, setCat] = useState("small");
  const [justAdded, setJustAdded] = useState(null);
  const items = B.menu[cat] || [];
  const add = (it) => {
    onAdd({ name: it.name, price: it.price, slot: cat });
    setJustAdded(it.name);
    setTimeout(() => setJustAdded((v) => (v === it.name ? null : v)), 1100);
  };
  return (
    <section className="section-pad" id="menu">
      <div className="wrap">
        <R2><H2 center eyebrow="The menu" title="Built for <span class='it' style='font-style:italic;color:var(--red)'>sharing</span>, plate after plate."
          lede="Order banquet-style. Tap any dish to add it to your pickup or delivery order." /></R2>
        <div className="menu-tabs">
          {B.menuCats.map((c) => (
            <button key={c.id} className={"menu-tab" + (cat === c.id ? " active" : "")} onClick={() => setCat(c.id)}>
              <span className="cn">{c.cn}</span>{c.label}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {items.map((it, i) => (
            <R2 key={it.name} delay={(i % 4) * 50}>
              <div className="menu-item">
                <div className="mi-photo">
                  <P2 id={"menu-" + cat + "-" + i} tint={T2.amber} radius={0} placeholder="" />
                </div>
                <div className="mi-body">
                  <div className="mi-top">
                    <h4>{it.name}{it.tags.length > 0 && <TagPills tags={it.tags} />}</h4>
                    <span className="price">{fmt(it.price)}</span>
                  </div>
                  <p>{it.desc}</p>
                  <button className={"add-btn" + (justAdded === it.name ? " added" : "")} onClick={() => add(it)}>
                    {justAdded === it.name ? <><I2 name="check" style={{ width: 15, height: 15 }} />Added</> : <><I2 name="plus" style={{ width: 15, height: 15 }} />Add to order</>}
                  </button>
                </div>
              </div>
            </R2>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- RESERVE + ORDER ---------- */
const ReserveSection = ({ onReserved, onCart }) => {
  const B = window.BUDHA;
  const [party, setParty] = useState("2");
  const [time, setTime] = useState("7:00 pm");
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10);
  const [date, setDate] = useState(dateStr);
  const UE = window.UberEatsLogo, DD = window.DoorDashLogo;
  const deliveries = [
    { key: "ue", sub: "20–35 min · CBD & Haymarket", href: "https://www.ubereats.com", Logo: UE },
    { key: "dd", sub: "25–40 min · Surry Hills & Pyrmont", href: "https://www.doordash.com", Logo: DD },
  ];
  return (
    <section className="section-pad band-dark" id="reserve">
      <div className="wrap">
        <R2><H2 center dark eyebrow="Reservations & ordering"
          title="Grab a seat, or <span class='it' style='font-style:italic;color:#f0c27a'>bring us home.</span>"
          lede="Book your table in seconds, or order in for delivery and pickup across the Sydney CBD." /></R2>
        <div className="reserve-grid" style={{ marginTop: 56 }}>
          {/* OpenTable card */}
          <R2>
            <div className="res-card opentable">
              <div className="brandrow">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#da3743", display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontFamily: "var(--sans)" }}>OT</div>
                <div><div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 600, lineHeight: 1 }}>Book a table</div><div className="lbl">Powered by OpenTable</div></div>
              </div>
              <div className="res-form">
                <div className="field">
                  <label>Party size</label>
                  <select value={party} onChange={(e) => setParty(e.target.value)}>
                    {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => <option key={n} value={n}>{n} {n === "1" ? "guest" : "guests"}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Date</label>
                  <input type="date" value={date} min={dateStr} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="field full">
                  <label>Time</label>
                  <div className="slot-times">
                    {B.reservationTimes.map((t) => (
                      <button key={t} type="button" className={"slot-time" + (time === t ? " sel" : "")} onClick={() => setTime(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 22 }}
                onClick={() => onReserved({ party, date, time })}>
                <I2 name="calendar" style={{ width: 18, height: 18 }} />Find my table
              </button>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", textAlign: "center", margin: "14px 0 0" }}>
                Free cancellation up to 2 hours before · Instant confirmation
              </p>
            </div>
          </R2>
          {/* Order card */}
          <R2 delay={120}>
            <div className="res-card order-card">
              <div className="brandrow">
                <S2 style={{ width: 40, height: 40, fontSize: 20, borderRadius: 10 }}>飲</S2>
                <div><div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 600, lineHeight: 1, color: "var(--cream)" }}>Order in</div><div className="lbl" style={{ color: "rgba(247,240,224,.6)" }}>Delivery & pickup</div></div>
              </div>
              <p style={{ color: "rgba(247,240,224,.74)", margin: "0 0 6px" }}>
                Craving us on the couch? We deliver across the CBD — or build a pickup order right here and skip the queue.
              </p>
              <div className="delivery-row">
                <button className="delivery-link" onClick={onCart} style={{ textAlign: "left", border: "1px solid rgba(247,240,224,.16)", color: "var(--cream)", font: "inherit", cursor: "pointer" }}>
                  <span className="dl-left">
                    <span className="dl-logo" style={{ background: "var(--red)", color: "var(--cream)" }}><I2 name="bowl" style={{ width: 24, height: 24 }} /></span>
                    <span><span className="dl-name">Pickup order</span><span className="dl-sub" style={{ display: "block" }}>Ready in ~20 min · pay online</span></span>
                  </span>
                  <I2 name="arrow" style={{ width: 22, height: 22 }} />
                </button>
                {deliveries.map((d) => (
                  <a key={d.key} className="delivery-link" href={d.href} target="_blank" rel="noopener">
                    <span className="dl-info">
                      <d.Logo onDark size={22} />
                      <span className="dl-sub">{d.sub}</span>
                    </span>
                    <I2 name="arrowUpRight" style={{ width: 20, height: 20 }} />
                  </a>
                ))}
              </div>
            </div>
          </R2>
        </div>
      </div>
    </section>
  );
};

/* ---------- RESERVATION CONFIRM MODAL ---------- */
const ReserveModal = ({ data, onClose }) => {
  const show = !!data;
  const [step, setStep] = useState("form"); // form -> done
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => { if (data) setStep("form"); }, [data]);
  const niceDate = data ? new Date(data.date + "T00:00:00").toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" }) : "";
  return (
    <div className={"modal" + (show ? " show" : "")} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {step === "form" ? (
          <>
            <S2 style={{ width: 64, height: 64, fontSize: 28, borderRadius: 12, margin: "0 auto 18px" }}>緣</S2>
            <h3 style={{ fontSize: "1.9rem", marginBottom: 6 }}>Confirm your booking</h3>
            <p style={{ color: "var(--ink-soft)", marginBottom: 22 }}>
              {data && <><strong>{data.party} {data.party === "1" ? "guest" : "guests"}</strong> · {niceDate} · <strong>{data.time}</strong></>}
            </p>
            <div style={{ textAlign: "left" }}>
              <div className="co-field"><label>Full name</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></div>
              <div className="co-field"><label>Mobile</label><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="04xx xxx xxx" /></div>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              onClick={() => setStep("done")}>Reserve table</button>
            <button className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={onClose}>Cancel</button>
          </>
        ) : (
          <>
            <S2 style={{ width: 84, height: 84, fontSize: 36, borderRadius: 14, margin: "0 auto 22px" }}>✓</S2>
            <h3 style={{ fontSize: "2rem", marginBottom: 8 }}>Table booked!</h3>
            <p style={{ color: "var(--ink-soft)" }}>
              See you soon{name ? ", " + name.split(" ")[0] : ""}. We've sent a confirmation{phone ? " by SMS" : ""}.
            </p>
            <p style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "var(--red)", marginTop: 14 }}>
              {data && <>{data.party} guests · {niceDate} · {data.time}</>}
            </p>
            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 12 }}>Shop 4, 1 Dixon Street, Haymarket</p>
            <button className="btn btn-dark btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 22 }} onClick={onClose}>Done</button>
          </>
        )}
      </div>
    </div>
  );
};

/* ---------- CART + CHECKOUT DRAWER ---------- */
const CartDrawer = ({ open, items, onClose, setQty, removeItem, onOrdered }) => {
  const [view, setView] = useState("cart"); // cart | checkout | done
  const [step, setStep] = useState(0);
  const [fulfil, setFulfil] = useState("pickup");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", time: "ASAP", card: "", exp: "", cvc: "" });
  const [ordNo, setOrdNo] = useState("");
  useEffect(() => { if (open) { setView("cart"); setStep(0); } }, [open]);

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const delivery = fulfil === "delivery" ? 5.9 : 0;
  const gst = subtotal * 0.1;
  const total = subtotal + delivery;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = () => {
    setOrdNo("BC-" + Math.floor(1000 + Math.random() * 9000));
    setView("done");
    onOrdered();
  };

  return (
    <>
      <div className={"overlay" + (open ? " show" : "")} onClick={onClose} />
      <aside className={"drawer" + (open ? " show" : "")} role="dialog" aria-label="Your order">
        <div className="drawer-head">
          <h3>{view === "cart" ? "Your order" : view === "checkout" ? "Checkout" : "Confirmed"}</h3>
          <button className="drawer-close" onClick={onClose} aria-label="Close"><I2 name="close" style={{ width: 24, height: 24 }} /></button>
        </div>

        {view === "cart" && (
          <>
            <div className="drawer-body">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <span className="cn">空</span>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", color: "var(--ink)" }}>Your bowl is empty</p>
                  <p>Add a few dishes from the menu to get started.</p>
                  <a className="btn btn-primary" href="#menu" onClick={onClose} style={{ marginTop: 10 }}>Browse the menu</a>
                </div>
              ) : items.map((it) => (
                <div className="cart-line" key={it.name}>
                  <div className="cl-photo"><P2 id={"cart-" + it.name.replace(/\W/g, "")} tint={T2.olive} radius={11} placeholder="" /></div>
                  <div className="cl-body">
                    <div className="cl-name">{it.name}</div>
                    <div className="cl-price">{fmt(it.price)}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <div className="qty">
                      <button onClick={() => setQty(it.name, it.qty - 1)} aria-label="Decrease">−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => setQty(it.name, it.qty + 1)} aria-label="Increase">+</button>
                    </div>
                    <button onClick={() => removeItem(it.name)} style={{ background: "none", border: "none", color: "var(--ink-soft)", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="drawer-foot">
                <div className="summary-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                <div className="summary-row"><span>Incl. GST (10%)</span><span>{fmt(gst)}</span></div>
                <div className="summary-row total"><span>Total</span><span>{fmt(subtotal)}</span></div>
                <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 14 }} onClick={() => setView("checkout")}>
                  Checkout · {fmt(subtotal)}
                </button>
              </div>
            )}
          </>
        )}

        {view === "checkout" && (
          <>
            <div className="drawer-body">
              <div className="steps"><div className={"st" + (step >= 0 ? " on" : "")} /><div className={"st" + (step >= 1 ? " on" : "")} /></div>
              {step === 0 ? (
                <>
                  <div className="fulfil-toggle">
                    <button className={fulfil === "pickup" ? "active" : ""} onClick={() => setFulfil("pickup")}>Pickup</button>
                    <button className={fulfil === "delivery" ? "active" : ""} onClick={() => setFulfil("delivery")}>Delivery</button>
                  </div>
                  <div className="co-field"><label>Full name</label><input value={form.name} onChange={set("name")} placeholder="Your name" /></div>
                  <div className="co-row">
                    <div className="co-field"><label>Mobile</label><input value={form.phone} onChange={set("phone")} placeholder="04xx xxx xxx" /></div>
                    <div className="co-field"><label>Email</label><input value={form.email} onChange={set("email")} placeholder="you@email.com" /></div>
                  </div>
                  {fulfil === "delivery" && (
                    <div className="co-field"><label>Delivery address</label><input value={form.address} onChange={set("address")} placeholder="Street, suburb, postcode" /></div>
                  )}
                  <div className="co-field">
                    <label>{fulfil === "pickup" ? "Pickup time" : "Delivery time"}</label>
                    <select value={form.time} onChange={set("time")}>
                      <option>ASAP</option><option>In 30 min</option><option>In 1 hour</option><option>This evening, 7:00 pm</option>
                    </select>
                  </div>
                  <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 6 }} onClick={() => setStep(1)}>Continue to payment</button>
                  <button className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => setView("cart")}>← Back to order</button>
                </>
              ) : (
                <>
                  <div className="co-field"><label>Card number</label><input value={form.card} onChange={set("card")} placeholder="4242 4242 4242 4242" inputMode="numeric" /></div>
                  <div className="co-row">
                    <div className="co-field"><label>Expiry</label><input value={form.exp} onChange={set("exp")} placeholder="MM / YY" /></div>
                    <div className="co-field"><label>CVC</label><input value={form.cvc} onChange={set("cvc")} placeholder="123" inputMode="numeric" /></div>
                  </div>
                  <div style={{ background: "var(--white)", borderRadius: 14, padding: "18px 20px", margin: "6px 0 18px", boxShadow: "var(--shadow-sm)" }}>
                    <div className="summary-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                    {fulfil === "delivery" && <div className="summary-row"><span>Delivery</span><span>{fmt(delivery)}</span></div>}
                    <div className="summary-row"><span>Incl. GST</span><span>{fmt(gst)}</span></div>
                    <div className="summary-row total"><span>Total</span><span>{fmt(total)}</span></div>
                  </div>
                  <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }} onClick={placeOrder}>
                    <I2 name="check" style={{ width: 18, height: 18 }} />Pay {fmt(total)}
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => setStep(0)}>← Back to details</button>
                  <p style={{ fontSize: 12, color: "var(--ink-soft)", textAlign: "center", marginTop: 14 }}>🔒 Demo checkout — no real payment is taken.</p>
                </>
              )}
            </div>
          </>
        )}

        {view === "done" && (
          <div className="drawer-body">
            <div className="success">
              <S2 className="seal">✓</S2>
              <h3>Order placed!</h3>
              <p>Thanks{form.name ? ", " + form.name.split(" ")[0] : ""} — your {fulfil} order is in the kitchen.</p>
              <p className="ordno">Order {ordNo}</p>
              <p style={{ fontSize: 14, marginTop: 18 }}>
                {fulfil === "pickup" ? "Ready for pickup at Shop 4, 1 Dixon Street in ~20 minutes." : "On its way to you in 25–40 minutes."}
              </p>
              <button className="btn btn-dark btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 24 }} onClick={onClose}>Back to browsing</button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

/* ---------- APP ROOT ---------- */
const App = () => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [reserveData, setReserveData] = useState(null);
  const [toast, setToast] = useState({ msg: "", show: false });
  const toastTimer = useRef(null);

  const flashToast = (msg) => {
    setToast({ msg, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  };

  const addToCart = useCallback((item) => {
    setCart((c) => {
      const ex = c.find((x) => x.name === item.name);
      if (ex) return c.map((x) => x.name === item.name ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...item, qty: 1 }];
    });
    flashToast(item.name + " added to your order");
  }, []);

  const setQty = (name, q) => setCart((c) => q <= 0 ? c.filter((x) => x.name !== name) : c.map((x) => x.name === name ? { ...x, qty: q } : x));
  const removeItem = (name) => setCart((c) => c.filter((x) => x.name !== name));
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  const scrollToReserve = () => {
    const el = document.getElementById("reserve");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
  };

  return (
    <>
      <NavBar cartCount={cartCount} onCart={() => setCartOpen(true)} onReserve={scrollToReserve} />
      <HeroSec onReserve={scrollToReserve} onCart={() => setCartOpen(true)} onReserved={(d) => setReserveData(d)} />
      <Top5Sec onAdd={addToCart} />
      <MenuSection onAdd={addToCart} />
      <WhoSec />
      <FoodSec />
      <GallerySec />
      <WhySec />
      <IngSec />
      <ReserveSection onReserved={(d) => setReserveData(d)} onCart={() => setCartOpen(true)} />
      <RevSec />
      <IgSec />
      <FaqSec />
      <ContactSec />
      <FooterSec onReserve={scrollToReserve} onCart={() => setCartOpen(true)} />

      <Dock />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)}
        setQty={setQty} removeItem={removeItem} onOrdered={() => setCart([])} />
      <ReserveModal data={reserveData} onClose={() => setReserveData(null)} />
      <ToastEl msg={toast.msg} show={toast.show} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
