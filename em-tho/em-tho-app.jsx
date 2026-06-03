// em-tho-app.jsx — Em Thơ landing page

const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#b03a2e", "#6b3a2e", "#ffffff"],
  "blurStrength": 22,
  "showAmbient": true,
  "heading": "Cormorant Garamond"
} /*EDITMODE-END*/;

// ───────── Data ─────────
const SHADES = [
{ id: 'em-1', name: 'Sương Mai', code: 'EM 01', color: '#c97b7a', desc: 'Hồng đào trong trẻo, như nắng sớm vương trên má em.', price: 380, tag: null },
{ id: 'em-2', name: 'Hoa Đào', code: 'EM 02', color: '#d97474', desc: 'Hồng phai dịu dàng, gợi nhớ mùa xuân Hà Nội.', price: 380, tag: 'Mới' },
{ id: 'em-3', name: 'Đỏ Tết', code: 'EM 03', color: '#b03a2e', desc: 'Đỏ son truyền thống — màu của may mắn và sum vầy.', price: 420, tag: 'Best' },
{ id: 'em-4', name: 'Cam Khế', code: 'EM 04', color: '#d96a3a', desc: 'Cam đất ấm áp, tươi sáng như buổi chiều quê.', price: 380, tag: null },
{ id: 'em-5', name: 'Mận Hậu', code: 'EM 05', color: '#8c2a40', desc: 'Mận tím trầm, sang trọng và bí ẩn.', price: 420, tag: null },
{ id: 'em-6', name: 'Nâu Trầu', code: 'EM 06', color: '#6b3a2e', desc: 'Nâu trầu cổ điển, gợi nét đẹp Á Đông xưa.', price: 420, tag: 'Hot' },
{ id: 'em-7', name: 'Hồng Phấn', code: 'EM 07', color: '#e8a8a0', desc: 'Hồng nude tinh khôi cho ngày thường tự nhiên.', price: 360, tag: null },
{ id: 'em-8', name: 'Đỏ Lụa', code: 'EM 08', color: '#a63a3a', desc: 'Đỏ lụa mềm mại, sang nhưng không quá lộng lẫy.', price: 420, tag: null }];


const TESTIMONIALS = [
{ who: 'Linh Chi', ref: 'Hà Nội', stars: 5, q: 'Em Thơ giữ màu rất bền mà không khô môi. Mình thích nhất Đỏ Tết — đánh lên trông sang lắm.' },
{ who: 'Mai Anh', ref: 'Sài Gòn', stars: 5, q: 'Bao bì xinh như một bức tranh. Mở hộp ra là muốn chụp ảnh ngay.' },
{ who: 'Quỳnh Như', ref: 'Đà Nẵng', stars: 5, q: 'Lần đầu dùng son Việt mà chất lượng hơn cả son ngoại. Sương Mai là bestie của mình.' }];


const LOOKS = [
{ id: 1, label: 'Sương Mai', sub: 'Daily', cls: 'look-1', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80&auto=format&fit=crop' },
{ id: 2, label: 'Hoa Đào', sub: 'Soft', cls: 'look-2', img: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80&auto=format&fit=crop' },
{ id: 3, label: 'Đỏ Tết', sub: 'Bold', cls: 'look-3', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop' },
{ id: 4, label: 'Mận Hậu', sub: 'Editorial', cls: 'look-4', img: 'https://images.unsplash.com/photo-1614108233086-b8e1d62b9e9b?w=600&q=80&auto=format&fit=crop' },
{ id: 5, label: 'Nâu Trầu', sub: 'Vintage', cls: 'look-5', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop' }];


// ───────── SVG: Lipstick (parametric color) ─────────
function LipstickSVG({ color = '#b03a2e', tube = '#2a1f1a', cap = '#c9a26b' }) {
  return (
    <svg viewBox="0 0 130 360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bullet-${color}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={color} stopOpacity="0.7" />
          <stop offset="0.45" stopColor={color} />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="1" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="tube-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={tube} />
          <stop offset="0.5" stopColor="#4a3a30" />
          <stop offset="1" stopColor={tube} />
        </linearGradient>
        <linearGradient id="cap-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={cap} stopOpacity="0.7" />
          <stop offset="0.5" stopColor={cap} />
          <stop offset="1" stopColor={cap} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Bullet (slanted lipstick) */}
      <path d="M40 10 L90 10 L90 110 L65 130 L40 110 Z" fill={`url(#bullet-${color})`} />
      <path d="M40 10 L90 10 L90 18 L40 18 Z" fill="rgba(255,255,255,0.25)" />
      {/* Gold ring */}
      <rect x="36" y="110" width="58" height="14" fill={`url(#cap-grad)`} rx="2" />
      {/* Tube */}
      <rect x="32" y="124" width="66" height="220" fill="url(#tube-grad)" rx="6" />
      <rect x="32" y="124" width="14" height="220" fill="rgba(255,255,255,0.08)" rx="6" />
      {/* Bottom cap */}
      <rect x="36" y="338" width="58" height="14" fill={`url(#cap-grad)`} rx="2" />
      {/* Brand mark on tube */}
      <text x="65" y="240" textAnchor="middle" fill={cap} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="22" opacity="0.85">em thơ</text>
    </svg>);

}

function FlowerSVG({ size = 100, color = '#fff' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <g fill={color} opacity="0.9">
        {[0, 60, 120, 180, 240, 300].map((deg) =>
        <ellipse key={deg} cx="50" cy="28" rx="11" ry="20" transform={`rotate(${deg} 50 50)`} />
        )}
        <circle cx="50" cy="50" r="8" fill="#f4c75e" />
      </g>
    </svg>);

}

// ───────── Components ─────────
function Nav({ cartCount, onOpenCart }) {
  return (
    <nav className="nav" data-screen-label="Nav">
      <div className="nav-inner">
        <a href="#" className="brand">
          <span className="brand-mark"><span className="em">em</span> thơ</span>
        </a>
        <div className="nav-links">
          <a href="#shades">Bộ sưu tập</a>
          <a href="#story">Câu chuyện</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#journal">Nhật ký</a>
          <a href="#contact">Liên hệ</a>
        </div>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </button>
          <button className="icon-btn" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>
          </button>
          <button className="icon-btn" aria-label="Cart" style={{ position: 'relative' }} onClick={onOpenCart}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 7Z" /><path d="M9 10V6a3 3 0 1 1 6 0v4" /></svg>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <a className="cta-pill" href="#shades">Mua ngay</a>
        </div>
      </div>
    </nav>);

}

function Hero({ onShop }) {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="container">
        <div className="hero-grid">
          <div style={{ padding: "0px" }}>
            <span className="eyebrow"><span className="dot"></span>Bộ sưu tập 2026 · Sắc Việt</span>
            <h1>
              Sắc đẹp<br />
              <span className="it" style={{ padding: "1px" }}>thuần Việt,</span><br />
              từ <span className="it">em thơ.</span>
            </h1>
            <p className="lead">
              Son lì dưỡng môi từ những thành phần thiên nhiên Việt Nam — gấc đỏ, dầu dừa, sáp ong.
              Một sắc môi cho mọi câu chuyện em muốn kể.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={onShop}>
                Khám phá bộ sưu tập
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
              <button className="btn btn-ghost">Xem câu chuyện</button>
            </div>
            <div className="hero-meta">
              <div className="stat"><div className="num">8</div><div className="lbl">Sắc môi · Shades</div></div>
              <div className="stat"><div className="num">100%</div><div className="lbl">Thuần chay · Vegan</div></div>
              <div className="stat"><div className="num">12h</div><div className="lbl">Giữ màu · Long-wear</div></div>
            </div>
          </div>
          <div className="hero-vis">
            <div className="vis-bloom"></div>
            <div className="lipstick">
              <LipstickSVG color="#b03a2e" />
            </div>
            <div className="vis-card vc-1">
              <div className="vc-name">Đỏ Tết</div>
              <div className="vc-meta">EM 03 · Velvet matte</div>
              <div className="vc-rating">★★★★★</div>
            </div>
            <div className="vis-card vc-2">
              <div className="vc-name">Bảng màu</div>
              <div className="vc-meta">8 sắc môi mới</div>
              <div className="swatch-row">
                {SHADES.slice(0, 6).map((s) =>
                <div key={s.id} className="sw" style={{ background: s.color }} />
                )}
              </div>
            </div>
            <div className="vis-card vc-3">
              <div className="vc-name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#b03a2e"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" /></svg>
                Yêu thương
              </div>
              <div className="vc-meta">Made with care · Vietnam</div>
            </div>
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) =>
            <React.Fragment key={i}>
                <span>Tinh dầu gấc <span className="sep"></span></span>
                <span>Sáp ong nguyên chất <span className="sep"></span></span>
                <span>Cruelty-free <span className="sep"></span></span>
                <span>Made in Hanoi <span className="sep"></span></span>
                <span>Bao bì tái chế <span className="sep"></span></span>
                <span>Hand-poured <span className="sep"></span></span>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function ProductCard({ shade, onAdd, onQuickView, isFav, onFav }) {
  return (
    <div className="product-card" onClick={() => onQuickView(shade)}>
      {shade.tag && <div className="tag">{shade.tag}</div>}
      <button
        className={`heart ${isFav ? 'active' : ''}`}
        onClick={(e) => {e.stopPropagation();onFav(shade.id);}}
        aria-label="Yêu thích">
        
        <svg width="14" height="14" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" />
        </svg>
      </button>
      <div className="pc-vis" style={{ background: `linear-gradient(160deg, ${lighten(shade.color, 0.35)}, ${shade.color})` }}>
        <LipstickSVG color={shade.color} />
      </div>
      <div className="pc-name">{shade.name}</div>
      <div className="pc-shade">{shade.code} · Velvet matte</div>
      <div className="pc-foot">
        <div className="pc-price">{shade.price}<span style={{ fontSize: 12, marginLeft: 2 }}>k</span></div>
        <button
          className="pc-add"
          aria-label="Add to cart"
          onClick={(e) => {e.stopPropagation();onAdd(shade);}}>
          
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
        </button>
      </div>
    </div>);

}

// helper: lighten a hex color
function lighten(hex, amount = 0.3) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16),g = parseInt(c.slice(2, 4), 16),b = parseInt(c.slice(4, 6), 16);
  const lr = Math.round(r + (255 - r) * amount);
  const lg = Math.round(g + (255 - g) * amount);
  const lb = Math.round(b + (255 - b) * amount);
  return `rgb(${lr},${lg},${lb})`;
}

function Collection({ onAdd, onQuickView, favs, onFav }) {
  return (
    <section className="section" id="shades" data-screen-label="02 Bộ sưu tập">
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">Bộ sưu tập · Collection</div>
            <h2 className="sec-title">Mỗi sắc môi <span className="it">một câu chuyện</span></h2>
          </div>
          <a href="#" className="sec-link">Xem tất cả →</a>
        </div>
        <div className="product-grid">
          {SHADES.map((s) =>
          <ProductCard
            key={s.id}
            shade={s}
            onAdd={onAdd}
            onQuickView={onQuickView}
            isFav={favs.has(s.id)}
            onFav={onFav} />

          )}
        </div>
      </div>
    </section>);

}

function ShadeStudio({ onAdd }) {
  const [idx, setIdx] = useState(2);
  const shade = SHADES[idx];
  return (
    <section className="container" id="studio" data-screen-label="03 Shade Studio">
      <div className="shade-section">
        <div className="shade-grid">
          <div className="shade-stage">
            <div className="shade-blob" style={{ background: `radial-gradient(circle at 30% 30%, ${lighten(shade.color, 0.25)}, ${shade.color} 60%, ${darken(shade.color, 0.3)} 100%)` }}></div>
            <div className="shade-lipstick"><LipstickSVG color={shade.color} /></div>
          </div>
          <div className="shade-info">
            <span className="pill">Shade Studio · Thử màu</span>
            <h3 style={{ color: shade.color }}>{shade.name}</h3>
            <div className="code">{shade.code} · Velvet matte</div>
            <p className="desc">{shade.desc}</p>
            <div className="shade-swatches">
              {SHADES.map((s, i) =>
              <button
                key={s.id}
                className={`swatch ${i === idx ? 'active' : ''}`}
                style={{ background: s.color }}
                onClick={() => setIdx(i)}
                aria-label={s.name}
                title={s.name} />

              )}
            </div>
            <div className="shade-actions">
              <span className="price-tag">{shade.price}.000đ</span>
              <button className="btn btn-primary" onClick={() => onAdd(shade)}>
                Thêm vào giỏ
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function darken(hex, amount = 0.3) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16),g = parseInt(c.slice(2, 4), 16),b = parseInt(c.slice(4, 6), 16);
  return `rgb(${Math.round(r * (1 - amount))},${Math.round(g * (1 - amount))},${Math.round(b * (1 - amount))})`;
}

function Story() {
  return (
    <section className="section" id="story" data-screen-label="04 Câu chuyện">
      <div className="container">
        <div className="story-grid">
          <div className="story-vis">
            <div className="pattern"></div>
            <FlowerSVG size={120} color="rgba(255,255,255,0.85)" />
            <div className="badge">Hà Nội · Est. 2024</div>
          </div>
          <div className="story-text">
            <div className="sec-eyebrow">Câu chuyện · Our story</div>
            <h2 className="sec-title">Em thơ — <span className="it">trong trẻo,</span><br />như thuở ban đầu.</h2>
            <p className="quote" style={{ marginTop: 28 }}>
              Chúng tôi tin rằng đẹp nhất là khi em được là chính mình — dịu dàng, chân thành, và đầy thi vị.
            </p>
            <div className="signed">
              Linh Trần
              <small>Nhà sáng lập · Founder</small>
            </div>

            <div className="pillars">
              <div className="pillar">
                <div className="ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2c1.5 4 5 5 5 9a5 5 0 0 1-10 0c0-4 3.5-5 5-9Z" /></svg>
                </div>
                <h4>Thuần chay</h4>
                <p>Không thử nghiệm trên động vật, công thức 100% từ thực vật.</p>
              </div>
              <div className="pillar">
                <div className="ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s-8-4-8-12a8 8 0 0 1 16 0c0 8-8 12-8 12Z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <h4>Made in VN</h4>
                <p>Sản xuất tại Hà Nội, từ nguyên liệu địa phương — gấc, dừa, sáp ong.</p>
              </div>
              <div className="pillar">
                <div className="ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
                </div>
                <h4>Bao bì xanh</h4>
                <p>Hộp giấy tái chế, vỏ son có thể nạp lại — nhẹ cho em và cho đất.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function Lookbook() {
  return (
    <section className="section" id="lookbook" data-screen-label="05 Lookbook">
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">Lookbook · Editorial</div>
            <h2 className="sec-title">Tám sắc môi, <span className="it">vô vàn cảm xúc.</span></h2>
          </div>
          <a href="#" className="sec-link">Xem editorial →</a>
        </div>
        <div className="lookbook-grid">
          {LOOKS.map((l) =>
          <div key={l.id} className={`look ${l.cls}`}>
              <div className="face" style={{ backgroundImage: `url(${l.img})` }}></div>
              <div className="label">{l.label} <small>· {l.sub}</small></div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Testimonials() {
  return (
    <section className="section" data-screen-label="06 Reviews">
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">Lời em kể · Reviews</div>
            <h2 className="sec-title">Những lời <span className="it">thương yêu</span></h2>
          </div>
        </div>
        <div className="test-grid">
          {TESTIMONIALS.map((t, i) =>
          <div key={i} className="testi">
              <div className="stars">{'★'.repeat(t.stars)}</div>
              <q>{t.q}</q>
              <div className="who">
                <div className="av">{t.who[0]}</div>
                <div>
                  <div className="nm">{t.who}</div>
                  <div className="ref">{t.ref}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <section className="container" data-screen-label="07 Newsletter" style={{ padding: '40px 32px 80px' }}>
      <div className="newsletter">
        <h3>Thư từ <span className="it">em thơ.</span></h3>
        <p>Nhận lời thì thầm về sắc mới, lookbook mỗi mùa và ưu đãi riêng cho em.</p>
        <form onSubmit={(e) => {e.preventDefault();setDone(true);}}>
          <input
            type="email"
            placeholder="email của em..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          
          <button type="submit">{done ? 'Cảm ơn em ♥' : 'Đăng ký'}</button>
        </form>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer id="contact">
      <div className="container">
        <div className="ft-grid">
          <div className="ft-brand">
            <div className="brand-mark"><span style={{ color: '#b03a2e' }}>em</span> thơ</div>
            <p>Son môi thuần Việt — dịu dàng, an toàn, từ thiên nhiên. Một sắc môi cho mọi câu chuyện em muốn kể.</p>
          </div>
          <div className="ft-col">
            <h5>Sản phẩm</h5>
            <ul>
              <li><a href="#">Bộ sưu tập</a></li>
              <li><a href="#">Son lì</a></li>
              <li><a href="#">Son dưỡng</a></li>
              <li><a href="#">Quà tặng</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <h5>Em Thơ</h5>
            <ul>
              <li><a href="#">Câu chuyện</a></li>
              <li><a href="#">Tạp chí</a></li>
              <li><a href="#">Cửa hàng</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <h5>Hỗ trợ</h5>
            <ul>
              <li><a href="#">Vận chuyển</a></li>
              <li><a href="#">Đổi trả</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
              <li><a href="#">Hướng dẫn dùng</a></li>
            </ul>
          </div>
        </div>
        <div className="ft-bot">
          <div>© 2026 Em Thơ Cosmetics. Made with ♥ in Hà Nội.</div>
          <div className="ft-social">
            <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" /></svg></a>
            <a href="#" aria-label="TikTok"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 4v3.5a4.5 4.5 0 0 0 4.5 4.5V15a7.5 7.5 0 0 1-4.5-1.5V17a5 5 0 1 1-5-5h.5v3a2 2 0 1 0 1.5 2V4Z" /></svg></a>
            <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1 .3-1.5 1.6-1.5H17V2.2c-.4 0-1.6-.2-3-.2-3 0-5 1.8-5 5v3H6v4h3v8z" /></svg></a>
          </div>
        </div>
      </div>
    </footer>);

}

function CartDrawer({ open, onClose, items, onQty, onRemove }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      <div className={`cart-overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-label="Giỏ hàng">
        <div className="cart-head">
          <h4>Giỏ của em</h4>
          <button className="icon-btn" onClick={onClose} aria-label="Đóng">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className="cart-body">
          {items.length === 0 ?
          <div className="cart-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 7Z" /><path d="M9 10V6a3 3 0 1 1 6 0v4" /></svg>
              <p>Giỏ còn trống...<br />Em chọn một sắc nhé.</p>
            </div> :
          items.map((item) =>
          <div key={item.id} className="cart-item">
              <div className="ci-vis" style={{ background: `linear-gradient(160deg, ${lighten(item.color, 0.35)}, ${item.color})` }}>
                <LipstickSVG color={item.color} />
              </div>
              <div className="ci-info">
                <div className="nm">{item.name}</div>
                <div className="sh">{item.code}</div>
                <div className="ctrl">
                  <div className="qty">
                    <button onClick={() => onQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onQty(item.id, +1)}>+</button>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ color: 'var(--ink-mute)', fontSize: 12, textDecoration: 'underline' }}>Xoá</button>
                </div>
              </div>
              <div className="ci-price">{item.price * item.qty}k</div>
            </div>
          )}
        </div>
        {items.length > 0 &&
        <div className="cart-foot">
            <div className="row"><span>Tạm tính</span><span>{subtotal}.000đ</span></div>
            <div className="row"><span>Phí giao hàng</span><span>Miễn phí</span></div>
            <div className="row total"><span>Tổng</span><span>{subtotal}.000đ</span></div>
            <button className="check">Thanh toán →</button>
          </div>
        }
      </aside>
    </>);

}

function QuickView({ shade, onClose, onAdd }) {
  if (!shade) return null;
  return (
    <div className={`qv-overlay open`} onClick={onClose}>
      <div className="qv-modal" onClick={(e) => e.stopPropagation()}>
        <button className="qv-close" onClick={onClose} aria-label="Đóng">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
        <div className="qv-vis" style={{ background: `linear-gradient(160deg, ${lighten(shade.color, 0.35)}, ${shade.color})` }}>
          <LipstickSVG color={shade.color} />
        </div>
        <div className="qv-info">
          <div className="sec-eyebrow">{shade.code} · Velvet matte</div>
          <h3>{shade.name}</h3>
          <div className="price">{shade.price}.000đ</div>
          <p className="desc">{shade.desc}</p>
          <p className="desc" style={{ fontSize: 13, color: 'var(--ink-mute)' }}>
            <strong style={{ color: 'var(--ink-soft)' }}>Thành phần:</strong> dầu gấc, sáp ong, dầu dừa, vitamin E. Không paraben, không hương liệu tổng hợp.
          </p>
          <div className="add-row">
            <button className="btn btn-primary" onClick={() => {onAdd(shade);onClose();}}>
              Thêm vào giỏ — {shade.price}.000đ
            </button>
          </div>
        </div>
      </div>
    </div>);

}

// ───────── App ─────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cart, setCart] = useState([]); // {id,name,code,color,price,qty}
  const [favs, setFavs] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [qv, setQv] = useState(null);
  const [toast, setToast] = useState('');

  // Apply tweaks
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--son-do', t.palette[0]);
    root.style.setProperty('--son-nau', t.palette[1]);
    root.style.setProperty('--cream', t.palette[2]);
    document.querySelectorAll('[style*="backdrop-filter"]'); // no-op marker
  }, [t.palette]);

  useEffect(() => {
    document.documentElement.style.setProperty('--blur', `${t.blurStrength}px`);
  }, [t.blurStrength]);

  useEffect(() => {
    document.querySelector('.ambient').style.opacity = t.showAmbient ? 1 : 0;
  }, [t.showAmbient]);

  useEffect(() => {
    document.documentElement.style.setProperty('--serif', `'${t.heading}', serif`);
  }, [t.heading]);

  const addToCart = (shade) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === shade.id);
      if (existing) return prev.map((i) => i.id === shade.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: shade.id, name: shade.name, code: shade.code, color: shade.color, price: shade.price, qty: 1 }];
    });
    setToast(`Đã thêm ${shade.name} vào giỏ`);
    setTimeout(() => setToast(''), 2200);
  };
  const updateQty = (id, delta) => {
    setCart((prev) => prev.flatMap((i) => {
      if (i.id !== id) return [i];
      const q = i.qty + delta;
      return q <= 0 ? [] : [{ ...i, qty: q }];
    }));
  };
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const toggleFav = (id) => setFavs((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Nav cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <Hero onShop={() => document.getElementById('shades')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
      <Collection
        onAdd={addToCart}
        onQuickView={setQv}
        favs={favs}
        onFav={toggleFav} />
      
      <ShadeStudio onAdd={addToCart} />
      <Story />
      <Lookbook />
      <Testimonials />
      <Newsletter />
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onQty={updateQty}
        onRemove={removeItem} />
      
      {qv && <QuickView shade={qv} onClose={() => setQv(null)} onAdd={addToCart} />}

      <div className={`toast ${toast ? 'show' : ''}`}>
        <span className="check-ic">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
        </span>
        {toast}
      </div>

      <TweaksPanel>
        <TweakSection label="Bảng màu" />
        <TweakColor
          label="Palette"
          value={t.palette}
          options={[
          ['#b03a2e', '#6b3a2e', '#ffffff'], // Em Thơ classic — white
          ['#c97b63', '#8c4a3a', '#ffffff'], // Terracotta — white
          ['#a63a3a', '#3a2018', '#fdfaf7'], // Đỏ thẫm — bone
          ['#d97474', '#6b3a2e', '#fff8f5'], // Hồng đào — soft
          ['#8c2a40', '#3d1820', '#fbf6f2'] // Mận — warm white
          ]}
          onChange={(v) => setTweak('palette', v)} />
        
        <TweakSection label="Glass morphism" />
        <TweakSlider
          label="Độ mờ blur"
          value={t.blurStrength}
          min={4} max={40} step={2} unit="px"
          onChange={(v) => setTweak('blurStrength', v)} />
        
        <TweakToggle
          label="Background gradient"
          value={t.showAmbient}
          onChange={(v) => setTweak('showAmbient', v)} />
        
        <TweakSection label="Typography" />
        <TweakSelect
          label="Font heading"
          value={t.heading}
          options={['Cormorant Garamond', 'Playfair Display', 'DM Serif Display', 'EB Garamond']}
          onChange={(v) => setTweak('heading', v)} />
        
      </TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);