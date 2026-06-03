/* Bảnh Barber landing page (English) */
const { useState, useEffect, useRef } = React;
const D = window.BANH_DATA;

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.classic-root .reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function BeforeAfterClassic() {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const move = (clientX) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, (clientX - r.left) / r.width * 100));
    setPos(p);
  };
  return (
    <div className="c-ba">
      <div
        className="c-ba-slider"
        ref={ref}
        onMouseDown={(e) => {dragging.current = true;move(e.clientX);}}
        onMouseMove={(e) => dragging.current && move(e.clientX)}
        onMouseUp={() => dragging.current = false}
        onMouseLeave={() => dragging.current = false}
        onTouchStart={(e) => move(e.touches[0].clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}>
        <div className="c-ba-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80)' }} />
        <div className="c-ba-img c-ba-after" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80)', clipPath: `inset(0 0 0 ${pos}%)` }} />
        <div className="c-ba-tag before">Before</div>
        <div className="c-ba-tag after">After</div>
        <div className="c-ba-handle" style={{ left: `${pos}%` }} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, letterSpacing: '0.2em', color: 'var(--brass-bright)', textTransform: 'uppercase', marginBottom: 16 }}>
          — Before & After
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 44, lineHeight: 1.05, color: 'var(--cream)', marginBottom: 20 }}>
          The difference lives <em style={{ color: 'var(--brass-bright)', fontStyle: 'italic' }}>in the details</em>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--cream-soft)', fontWeight: 300 }}>
          Every head of hair is a work of art. Our Master Barbers take their time to study your face, your lifestyle, and your taste before a single blade is drawn.
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--brass-bright)', fontSize: 15, marginTop: 24 }}>
          Drag the slider to reveal the transformation.
        </p>
      </div>
    </div>);

}

function ClassicPrototype({ tweaks, onBook }) {
  useReveal();
  const [galleryTab, setGalleryTab] = useState('all');
  const [selectedPkg, setSelectedPkg] = useState('gentleman');
  const [selectedBarber, setSelectedBarber] = useState('phong');
  const [selectedDate, setSelectedDate] = useState(8);
  const [selectedTime, setSelectedTime] = useState('15:00');
  const [confirmed, setConfirmed] = useState(false);

  const pkg = D.services.find((s) => s.id === selectedPkg) || D.services[0];
  const barber = D.barbers.find((b) => b.id === selectedBarber);
  const tagline = tweaks?.tagline || D.taglines[0];

  const filteredGallery = galleryTab === 'all' ? D.gallery : D.gallery.filter((g) => g.cat === galleryTab);

  const submit = (e) => {e.preventDefault();setConfirmed(true);};

  useEffect(() => {
    const root = document.querySelector('.classic-root');
    if (root && tweaks?.headingFont) root.style.setProperty('--serif', tweaks.headingFont);
  }, [tweaks?.headingFont]);

  const dayName = (n) => {
    const d = D.dates.find((d) => d.num === n);
    return d ? d.day : '';
  };

  return (
    <div className="classic-root" data-screen-label="Landing Page">
      {/* NAV */}
      <nav className="c-nav">
        <div className="c-logo">
          <span className="c-logo-mark">B</span>
          <span>Bảnh<em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--brass-bright)', marginLeft: 6 }}>Barber</em></span>
        </div>
        <div className="c-nav-links">
          <a className="active">Home</a>
          <a>Services</a>
          <a>Gallery</a>
          <a>Team</a>
          <a>Story</a>
          <a>Contact</a>
        </div>
        <button className="c-nav-cta" onClick={onBook}>Book now</button>
      </nav>

      {/* HERO */}
      <section className="c-hero" data-screen-label="Hero">
        <div className="reveal">
          <div className="c-hero-eyebrow" style={{ textAlign: "right", justifyContent: "center" }}>EST. 2019 — SAIGON</div>
          <h1 className="c-hero-title" style={{ letterSpacing: "-1.12px", textAlign: "left", padding: "0px", color: "rgb(126, 106, 66)" }}>
            The poise<br /><em style={{ lineHeight: "0.96", fontWeight: "400" }}>of a gentleman</em>.
          </h1>
          <p className="c-hero-sub">
            Bảnh Barber is a private retreat for gentlemen who value refinement. The English tradition of grooming, paired with the modern spirit of a rising Saigon — set in a room of dark wood, brass and golden light.
          </p>
          <div className="c-hero-actions" style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <button className="c-btn-primary" style={{ background: "#ffffff", color: "#0a0806" }} onClick={onBook}>Book now</button>
            <button className="c-btn-ghost">Explore services</button>
          </div>
        </div>
        <div className="c-hero-img reveal" style={{ textAlign: "left", backgroundSize: "auto" }}>
          <div className="c-hero-badge" style={{ width: "250.8px", borderWidth: "2px 0px 0px 1.6px" }}>
            <div className="c-hero-badge-label">The Bảnh Mark</div>
            <div className="c-hero-badge-text" style={{ color: "rgb(170, 159, 138)" }}>"A well-kept head of hair tells a man's story before he speaks a word."</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="c-marquee">
        <div className="c-marquee-track">
          <span>
            <span>Classic cuts</span><span className="c-marquee-dot">✦</span>
            <span>Hot towel shave</span><span className="c-marquee-dot">✦</span>
            <span>Relaxation massage</span><span className="c-marquee-dot">✦</span>
            <span>Welcome whisky</span><span className="c-marquee-dot">✦</span>
            <span>Private suites</span><span className="c-marquee-dot">✦</span>
          </span>
          <span>
            <span>Classic cuts</span><span className="c-marquee-dot">✦</span>
            <span>Hot towel shave</span><span className="c-marquee-dot">✦</span>
            <span>Relaxation massage</span><span className="c-marquee-dot">✦</span>
            <span>Welcome whisky</span><span className="c-marquee-dot">✦</span>
            <span>Private suites</span><span className="c-marquee-dot">✦</span>
          </span>
        </div>
      </div>

      {/* SERVICES */}
      <section className="c-section" data-screen-label="Services">
        <div className="c-section-head reveal">
          <div>
            <div className="c-section-num">— 01 / Services</div>
            <h2 className="c-section-title" style={{ textAlign: "left" }}>Three packages<br /><em>for three gentlemen</em>.</h2>
          </div>
          <p className="c-section-lede">
            Every package at Bảnh includes the cut, a hair wash, a massage, full styling and a welcome drink. The difference lies in the room, the time, and the refined details reserved for each.
          </p>
        </div>
        <div className="c-services">
          {D.services.map((s) =>
          <div key={s.id} className={'c-service reveal' + (s.featured ? ' featured' : '')}>
              <div className="c-service-num">— {s.num} —</div>
              <div className="c-service-name">
                {s.name.split(' ').slice(0, -1).join(' ')} <em>{s.name.split(' ').slice(-1)}</em>
              </div>
              <div className="c-service-tag">{s.tag}</div>
              <div className="c-service-price">
                {s.price}{s.currency && <small>{s.currency}</small>}
              </div>
              <ul className="c-service-list">
                {s.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button className="c-service-cta" onClick={() => {setSelectedPkg(s.id);onBook();}}>
                {s.id === 'group' ? 'Inquire' : 'Book this package'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section className="c-section c-gallery-section" data-screen-label="Gallery">
        <div className="c-section-head reveal">
          <div>
            <div className="c-section-num">— 02 / Gallery</div>
            <h2 className="c-section-title">The Bảnh<br /><em>portfolio.</em></h2>
          </div>
          <p className="c-section-lede">
            An ever-growing portfolio — from timeless classics to the sharpest contemporary European styles. Updated every week.
          </p>
        </div>
        <div className="reveal">
          <div className="c-gallery-tabs">
            {[
            { k: 'all', l: 'All' },
            { k: 'classic', l: 'Classic' },
            { k: 'modern', l: 'Modern' },
            { k: 'fade', l: 'Fade' },
            { k: 'beard', l: 'Beard' }].
            map((t) =>
            <button key={t.k} className={'c-gallery-tab' + (galleryTab === t.k ? ' active' : '')} onClick={() => setGalleryTab(t.k)}>
                {t.l}
              </button>
            )}
          </div>
          <div className="c-gallery-grid">
            {filteredGallery.map((g, i) =>
            <div key={i} className="c-gallery-item" style={{ backgroundImage: `url(${g.img})` }}>
                <div className="c-gallery-label">{g.label}</div>
              </div>
            )}
          </div>
          <BeforeAfterClassic />
        </div>
      </section>

      {/* BARBERS */}
      <section className="c-section" data-screen-label="Team">
        <div className="c-section-head reveal">
          <div>
            <div className="c-section-num">— 03 / The team</div>
            <h2 className="c-section-title">Hands of<br /><em>true craftsmen.</em></h2>
          </div>
          <p className="c-section-lede">
            Four Master Barbers, thirty years of combined experience. Each brings a distinct style — pick the one who suits you best.
          </p>
        </div>
        <div className="c-barbers reveal">
          {D.barbers.map((b) =>
          <div key={b.id} className="c-barber">
              <div className="c-barber-img" style={{ backgroundImage: `url(${b.img})` }}>
                <div className="c-barber-status">
                  <span className={'c-barber-dot ' + (b.status === 'busy' ? 'busy' : b.status === 'off' ? 'off' : '')} />
                  {b.status === 'online' ? 'Available' : b.status === 'busy' ? 'With a client' : 'Off duty'}
                </div>
              </div>
              <div className="c-barber-name">{b.name}</div>
              <div className="c-barber-role">{b.role}</div>
              <div className="c-barber-meta">
                <span>{b.exp} of practice</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STORY */}
      <section className="c-section" data-screen-label="Story" style={{ background: 'var(--bg-2)' }}>
        <div className="c-story reveal">
          <div className="c-story-img" />
          <div className="c-story-content">
            <div className="c-section-num" style={{ marginBottom: 16 }}>— 04 / Our story</div>
            <h3>Made for those<br />who know<br /><em>how to wait.</em></h3>
            <p>
              Bảnh was founded in 2019 by a group of friends who shared one obsession — the classical gentleman's culture, from Savile Row in London to the old shops of Milan. We believe a haircut is not an errand. It is a ritual.
            </p>
            <p>
              From the Italian leather chairs to the Japanese shears honed by hand each morning, down to the bottle of Macallan reserved for our regulars — every detail is chosen with care.
            </p>
            <div className="c-story-sig">— {tagline}</div>
            <div className="c-stats">
              <div>
                <div className="c-stat-num">5,000+</div>
                <div className="c-stat-label">Loyal members</div>
              </div>
              <div>
                <div className="c-stat-num">2</div>
                <div className="c-stat-label">Locations</div>
              </div>
              <div>
                <div className="c-stat-num">4.9</div>
                <div className="c-stat-label">Google rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="c-section c-booking-section" id="booking" data-screen-label="Booking">
        <div className="c-section-head reveal">
          <div>
            <div className="c-section-num">— 05 / Booking</div>
            <h2 className="c-section-title">Reserve your<br /><em>chair.</em></h2>
          </div>
          <p className="c-section-lede">
            Our calendar fills quickly in the prime hours. Book early to secure your preferred Master Barber and time slot.
          </p>
        </div>

        <div className="c-booking reveal">
          <aside className="c-booking-aside">
            <h3>You have selected<br /><em>{pkg.name}</em>.</h3>
            <p>{pkg.tag}. A summary of your reservation appears below — feel free to adjust any detail in the form to the right.</p>
            <div className="c-booking-summary">
              <div className="c-booking-summary-row">
                <span>Package</span><strong>{pkg.name}</strong>
              </div>
              <div className="c-booking-summary-row">
                <span>Master Barber</span><strong>{barber.name}</strong>
              </div>
              <div className="c-booking-summary-row">
                <span>Date</span><strong>{dayName(selectedDate)}, May {selectedDate}</strong>
              </div>
              <div className="c-booking-summary-row">
                <span>Time</span><strong>{selectedTime}</strong>
              </div>
              <div className="c-booking-summary-row total">
                <span>Estimated total</span><strong>{pkg.price}{pkg.currency && ' ' + pkg.currency}</strong>
              </div>
            </div>
          </aside>

          <form className="c-booking-form" onSubmit={submit}>
            <div className="c-form-section">
              <div className="c-form-step">
                <div className="c-form-step-num">I</div>
                <div className="c-form-step-label">Choose a package</div>
              </div>
              <div className="c-pkg-options">
                {D.services.map((s) =>
                <div
                  key={s.id}
                  className={'c-pkg-option' + (selectedPkg === s.id ? ' selected' : '')}
                  onClick={() => setSelectedPkg(s.id)}>
                    <div>
                      <div className="c-pkg-option-name">
                        {s.name.split(' ').slice(0, -1).join(' ')} <em>{s.name.split(' ').slice(-1)}</em>
                      </div>
                      <div className="c-pkg-option-desc">{s.tag}</div>
                    </div>
                    <div className="c-pkg-option-price">{s.price}{s.currency && ' ' + s.currency}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="c-form-section">
              <div className="c-form-step">
                <div className="c-form-step-num">II</div>
                <div className="c-form-step-label">Choose your Master Barber</div>
              </div>
              <div className="c-barber-pick">
                {D.barbers.map((b) =>
                <div
                  key={b.id}
                  className={'c-barber-pick-item' + (selectedBarber === b.id ? ' selected' : '')}
                  onClick={() => b.status !== 'off' && setSelectedBarber(b.id)}
                  style={b.status === 'off' ? { opacity: 0.4 } : {}}>
                    <div className="c-barber-pick-avatar" style={{ backgroundImage: `url(${b.img})` }} />
                    <div className="c-barber-pick-name">{b.name.split(' ')[0]}</div>
                    <div className="c-barber-pick-status">
                      {b.status === 'online' ? 'Free' : b.status === 'busy' ? 'Busy' : 'Off'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="c-form-section">
              <div className="c-form-step">
                <div className="c-form-step-num">III</div>
                <div className="c-form-step-label">Pick a date & time</div>
              </div>
              <div className="c-date-grid" style={{ marginBottom: 12 }}>
                {D.dates.map((d) =>
                <div
                  key={d.num}
                  className={'c-date-cell' + (selectedDate === d.num ? ' selected' : '') + (d.disabled ? ' disabled' : '')}
                  onClick={() => !d.disabled && setSelectedDate(d.num)}>
                    <div className="c-date-day">{d.day}</div>
                    <div className="c-date-num">{d.num}</div>
                  </div>
                )}
              </div>
              <div className="c-time-grid">
                {D.times.map((t) =>
                <div
                  key={t}
                  className={'c-time-cell' + (selectedTime === t ? ' selected' : '') + (D.busyTimes.includes(t) ? ' disabled' : '')}
                  onClick={() => !D.busyTimes.includes(t) && setSelectedTime(t)}>
                    {t}
                  </div>
                )}
              </div>
            </div>

            <div className="c-form-section">
              <div className="c-form-step">
                <div className="c-form-step-num">IV</div>
                <div className="c-form-step-label">Your contact details</div>
              </div>
              <div className="c-input-row" style={{ marginBottom: 10 }}>
                <input className="c-input" placeholder="Full name" defaultValue="James Anderson" />
                <input className="c-input" placeholder="Phone number" defaultValue="+84 901 234 567" />
              </div>
              <input className="c-input" placeholder="Additional notes (optional)" style={{ marginBottom: 0 }} />
            </div>

            <button type="submit" className="c-form-submit">Confirm reservation</button>
          </form>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="c-section c-testimonials-section" data-screen-label="Reviews">
        <div className="c-section-head reveal">
          <div>
            <div className="c-section-num">— 06 / Reviews</div>
            <h2 className="c-section-title">Gentlemen<br />speak of <em>Bảnh.</em></h2>
          </div>
          <p className="c-section-lede">More than 5,000 gentlemen have made Bảnh their regular retreat. Here are a few recent words.</p>
        </div>
        <div className="c-testimonials reveal">
          {D.testimonials.map((t, i) =>
          <div key={i} className="c-testi">
              <div className="c-testi-stars">{'★'.repeat(t.stars)}</div>
              <div className="c-testi-quote">{t.quote}</div>
              <div className="c-testi-author">
                <div className="c-testi-avatar" style={{ backgroundImage: `url(${t.avatar})` }} />
                <div>
                  <div className="c-testi-name">{t.name}</div>
                  <div className="c-testi-meta">{t.meta}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="c-section" data-screen-label="Instagram">
        <div className="c-section-head reveal">
          <div>
            <div className="c-section-num">— 07 / Instagram</div>
            <h2 className="c-section-title"><em>@banh.barber</em></h2>
          </div>
          <p className="c-section-lede">Follow our latest work and a glimpse behind the curtain at Bảnh.</p>
        </div>
        <div className="c-ig reveal">
          {D.igTiles.map((src, i) =>
          <div key={i} className="c-ig-tile" style={{ backgroundImage: `url(${src})` }} />
          )}
        </div>
      </section>

      {/* LOCATION */}
      <section className="c-section" data-screen-label="Location" style={{ background: 'var(--bg-2)' }}>
        <div className="c-section-head reveal">
          <div>
            <div className="c-section-num">— 08 / Visit us</div>
            <h2 className="c-section-title">Pay us<br /><em>a visit.</em></h2>
          </div>
          <p className="c-section-lede">Two locations in the heart of Hanoi and Saigon. Open all week.</p>
        </div>
        <div className="c-location reveal">
          <div className="c-loc-card">
            <h4>Bảnh <em>Saigon</em></h4>
            <div className="c-loc-addr">42 Ly Tu Trong, District 1</div>
            <div className="c-loc-row open"><strong>Today</strong><span>09:00 — 22:00 · Open now</span></div>
            <div className="c-loc-row"><strong>Mon — Fri</strong><span>09:00 — 22:00</span></div>
            <div className="c-loc-row"><strong>Sat</strong><span>08:00 — 23:00</span></div>
            <div className="c-loc-row"><strong>Sun</strong><span>10:00 — 20:00</span></div>
            <div className="c-loc-row"><strong>Phone</strong><span>+84 28 3823 4567</span></div>
            <div className="c-loc-row"><strong>Email</strong><span>saigon@banh.vn</span></div>
          </div>
          <div className="c-map">
            <div className="c-map-pin" />
            <div className="c-map-label">Bảnh Barber</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="c-footer">
        <div className="c-footer-grid">
          <div>
            <div className="c-footer-brand">Bảnh<em>Barber</em></div>
            <div className="c-footer-tag">"{tagline}"</div>
          </div>
          <div>
            <h5>Explore</h5>
            <ul><li>Home</li><li>Services</li><li>Gallery</li><li>Team</li><li>Story</li></ul>
          </div>
          <div>
            <h5>Support</h5>
            <ul><li>Booking</li><li>Membership</li><li>Gift vouchers</li><li>Contact</li></ul>
          </div>
          <div>
            <h5>Follow</h5>
            <ul><li>Instagram</li><li>Facebook</li><li>TikTok</li><li>YouTube</li></ul>
          </div>
        </div>
        <div className="c-footer-bottom">
          <span>© 2026 Bảnh Barber. <em>The poise of a gentleman.</em></span>
          <span>Privacy · Terms</span>
        </div>
      </footer>

      {/* CONFIRMATION MODAL */}
      {confirmed &&
      <div className="c-modal-overlay" onClick={() => setConfirmed(false)}>
          <div className="c-modal" onClick={(e) => e.stopPropagation()}>
            <button className="c-modal-close" onClick={() => setConfirmed(false)}>×</button>
            <div className="c-modal-mark">✓</div>
            <h3>Reservation <em>confirmed.</em></h3>
            <p>Thank you, sir. Your appointment at Bảnh Barber has been recorded. A confirmation message will arrive shortly.</p>
            <div className="c-modal-detail">
              <span className="label">Package</span><span className="val"><em>{pkg.name}</em></span>
              <span className="label">Master</span><span className="val">{barber.name}</span>
              <span className="label">Date</span><span className="val">May {selectedDate}, 2026</span>
              <span className="label">Time</span><span className="val">{selectedTime}</span>
              <span className="label">Location</span><span className="val">Saigon — Ly Tu Trong</span>
              <span className="label">Order #</span><span className="val"><em>#BNH-{Math.floor(Math.random() * 9000 + 1000)}</em></span>
            </div>
            <button className="c-btn-primary" style={{ width: '100%' }} onClick={() => setConfirmed(false)}>Done</button>
          </div>
        </div>
      }
    </div>);

}

window.ClassicPrototype = ClassicPrototype;