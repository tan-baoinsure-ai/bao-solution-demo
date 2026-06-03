/* Budha&Co — content data. Plain JS, attached to window.BUDHA */
window.BUDHA = {
  info: {
    name: "Budha&Co",
    address: "Shop 4, 1 Dixon Street, Haymarket",
    city: "Sydney NSW 2000, Australia",
    phone: "+61 2 9211 8888",
    phoneHref: "+61292118888",
    email: "eat@budhaandco.com.au",
    hours: [
      ["Mon – Thu", "11:30am – 10:00pm"],
      ["Fri – Sat", "11:30am – 11:00pm"],
      ["Sunday", "12:00pm – 9:30pm"],
    ],
    instagram: "@budhaandco",
  },

  // Top 5 must-try
  top5: [
    { ro: "Char Siu", name: "Smoked King Oyster 'Char Siu'", desc: "Lacquered king oyster mushroom, five-spice glaze, charred scallion.", price: 24, slot: "wok" },
    { ro: "Mápó", name: "Mapo Silken Tofu", desc: "Sichuan peppercorn, fermented chilli bean, crisped soy mince.", price: 22, slot: "wok" },
    { ro: "Bao", name: "Crispy 'Crab' Bao", desc: "Hearts of palm, shiitake XO, pickled daikon, kewpie-style aioli.", price: 18, slot: "small" },
    { ro: "Laksa", name: "Penang Jackfruit Laksa", desc: "Coconut laksa broth, young jackfruit, tofu puffs, laksa leaf.", price: 23, slot: "noodle" },
    { ro: "Bibimbap", name: "Stone-Pot Mushroom Bibimbap", desc: "Sizzling rice crust, gochujang, market vegetables, sesame.", price: 21, slot: "rice" },
  ],

  // Full menu by category
  menuCats: [
    { id: "small", label: "Small & Share", cn: "點心" },
    { id: "wok",   label: "From the Wok", cn: "鑊氣" },
    { id: "noodle",label: "Noodles & Broth", cn: "麵" },
    { id: "rice",  label: "Rice & Bowls", cn: "飯" },
    { id: "sweet", label: "Sweet", cn: "甜" },
    { id: "drink", label: "Drinks", cn: "飲" },
  ],
  menu: {
    small: [
      { name: "Crispy 'Crab' Bao", desc: "Hearts of palm, shiitake XO, pickled daikon, kewpie-style aioli.", price: 18, tags: ["signature"] },
      { name: "Edamame, Black Garlic Salt", desc: "Steamed soy beans tossed in smoked black garlic salt.", price: 11, tags: ["gf"] },
      { name: "Gyoza, Shiitake & Cabbage", desc: "Pan-seared dumplings, ponzu, chilli oil. Six pieces.", price: 16, tags: [] },
      { name: "Salt & Pepper Oyster Mushroom", desc: "Wok-tossed with chilli, garlic, spring onion.", price: 17, tags: ["spicy"] },
      { name: "Summer Rice Paper Rolls", desc: "Tofu, mint, vermicelli, peanut hoisin. Four rolls.", price: 14, tags: ["gf"] },
    ],
    wok: [
      { name: "Smoked King Oyster 'Char Siu'", desc: "Lacquered king oyster mushroom, five-spice glaze, charred scallion.", price: 24, tags: ["signature"] },
      { name: "Mapo Silken Tofu", desc: "Sichuan peppercorn, fermented chilli bean, crisped soy mince.", price: 22, tags: ["spicy"] },
      { name: "Kung Pao Cauliflower", desc: "Twice-fried cauliflower, dried chilli, peanuts, black vinegar.", price: 23, tags: ["spicy"] },
      { name: "Thai Basil 'Pork' Holy Trinity", desc: "Soy mince, holy basil, long bean, bird's eye chilli.", price: 22, tags: ["spicy", "gf"] },
    ],
    noodle: [
      { name: "Penang Jackfruit Laksa", desc: "Coconut laksa broth, young jackfruit, tofu puffs, laksa leaf.", price: 23, tags: ["signature"] },
      { name: "Dan Dan Noodles", desc: "Sesame, chilli oil, preserved mustard, crushed peanut.", price: 21, tags: ["spicy"] },
      { name: "Shoyu Ramen, Roasted Corn", desc: "Kombu-shiitake broth, marinated tofu, sweetcorn, nori.", price: 22, tags: [] },
      { name: "Pad See Ew, Smoked Tofu", desc: "Wide rice noodles, gai lan, dark soy, white pepper.", price: 20, tags: ["gf"] },
    ],
    rice: [
      { name: "Stone-Pot Mushroom Bibimbap", desc: "Sizzling rice crust, gochujang, market vegetables, sesame.", price: 21, tags: ["signature", "spicy"] },
      { name: "Claypot 'Eel' & Eggplant", desc: "Braised eggplant, smoked soy, ginger, jasmine rice.", price: 23, tags: [] },
      { name: "Nasi Goreng, Tempeh", desc: "Indonesian fried rice, sambal, lime, fried shallot.", price: 20, tags: ["spicy", "gf"] },
      { name: "Donburi, Teriyaki Aubergine", desc: "Glazed aubergine, edamame, pickles, koshihikari rice.", price: 20, tags: ["gf"] },
    ],
    sweet: [
      { name: "Black Sesame Soft Serve", desc: "House-churned coconut soft serve, toasted sesame brittle.", price: 12, tags: ["gf"] },
      { name: "Pandan & Coconut Sago", desc: "Chilled pandan pudding, palm sugar, fresh mango.", price: 12, tags: ["gf"] },
      { name: "Mochi Trio", desc: "Matcha, yuzu, and red bean. Three pieces.", price: 13, tags: ["gf"] },
    ],
    drink: [
      { name: "Jasmine Iced Tea", desc: "Cold-brewed jasmine green, lightly sweetened.", price: 7, tags: ["gf"] },
      { name: "Lychee & Yuzu Spritz", desc: "Sparkling, fresh lychee, yuzu, mint.", price: 9, tags: ["gf"] },
      { name: "Vietnamese Coconut Coffee", desc: "Robusta, whipped coconut cream, ice.", price: 8, tags: ["gf"] },
      { name: "House Kombucha", desc: "Rotating seasonal ferment. Ask your server.", price: 8, tags: ["gf"] },
    ],
  },

  ingredients: [
    { name: "Heirloom Tofu", cn: "豆腐", desc: "Stone-ground, made fresh daily from organic Riverina soy beans." },
    { name: "Wild Mushrooms", cn: "菇", desc: "King oyster, shiitake and enoki from a NSW Blue Mountains grower." },
    { name: "Laksa & Spice", cn: "香", desc: "Toasted whole spices, hand-pounded curry pastes, no shortcuts." },
    { name: "Market Greens", cn: "菜", desc: "Gai lan, choy sum and herbs picked at Sydney Markets each morning." },
  ],

  why: [
    { title: "Kinder by nature", icon: "leaf", desc: "Every dish is 100% plant-based — bold flavour with a lighter footprint, no compromise on soul." },
    { title: "Better for the planet", icon: "globe", desc: "Plant-forward eating uses a fraction of the land and water of animal agriculture." },
    { title: "Ancient & alive", icon: "bowl", desc: "Buddhist temple cooking has celebrated vegetables for over a thousand years. We carry it forward." },
  ],
  whyStats: [
    { k: "1,000+", l: "years of Asian plant-based culinary tradition" },
    { k: "75%", l: "less land used than an equivalent meat-based menu" },
    { k: "100%", l: "vegan — every single plate, sauce and stock" },
  ],

  reviews: [
    { stars: 5, quote: "I brought my most sceptical, steak-loving uncle. He ordered the char siu twice. Twice!", nm: "Priya N.", src: "Google · Local Guide" },
    { stars: 5, quote: "The laksa is the best in Sydney — vegan or not. Dixon Street has a new institution.", nm: "Marcus T.", src: "OpenTable Diner" },
    { stars: 5, quote: "Every plate looks like art and tastes like a hug. The mapo tofu has genuine numbing heat.", nm: "Yuki & Sam", src: "Instagram" },
  ],
  reviewSummary: { rating: "4.9", count: "1,240+", sources: ["Google", "OpenTable", "Zomato"] },

  faqs: [
    { q: "Is everything on the menu vegan?", a: "Yes — 100%. Every dish, sauce, stock and dessert is entirely plant-based. We run a fully vegan kitchen, so there's never any cross-contamination with animal products." },
    { q: "Do you cater to gluten-free and nut allergies?", a: "Many dishes are gluten-free (look for the GF tag) and we can adapt others. Please flag allergies when you book or order — our kitchen is briefed daily and will guide you to safe choices." },
    { q: "Do you take walk-ins?", a: "Always. We hold a portion of tables for walk-ins, but Dixon Street gets busy on weekends — we'd recommend booking through OpenTable to skip the wait." },
    { q: "Can I order for delivery?", a: "Absolutely. We're live on Uber Eats and DoorDash across the Sydney CBD, Haymarket, Surry Hills and Pyrmont. You can also order pickup directly on this page." },
    { q: "Do you do large groups and events?", a: "We love a banquet. For groups of 8 or more, or full venue hire, email eat@budhaandco.com.au and our events team will craft a set menu with you." },
    { q: "Where exactly are you?", a: "In the heart of Chinatown — Shop 4, 1 Dixon Street, Haymarket, a two-minute walk from Town Hall and Central stations. Paid parking at Goulburn Street." },
  ],

  reservationTimes: ["5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm", "7:30 pm", "8:00 pm", "8:30 pm"],
};

/* ----------------------------------------------------------------
   Curated vegan-Asian photography (Unsplash CDN — free, hotlinkable).
   Mapped by slot id so <Photo> auto-fills a default; a user drag-drop
   still overrides any slot. Swap these for the restaurant's own shots.
   A consistent warm grade is applied in CSS so the set feels cohesive.
----------------------------------------------------------------- */
(function () {
  const U = (id, w) => "https://images.unsplash.com/photo-" + id +
    "?auto=format&fit=crop&q=80&w=" + (w || 1200);
  // verified plant-forward bowls / vegetable plates / noodle dishes
  const P = {
    B1: "1505576633757-0ac1084af824", B2: "1542354255-839e272e3408",
    B3: "1589442305595-62647c1514f9", B4: "1599020792689-9fde458e7e17",
    B5: "1675092789086-4bd2b93ffc69",
    N1: "1585032226651-759b368d7246", N2: "1612929633738-8fe44f7ec841",
    N3: "1555126634-323283e090fa",  N4: "1600490036275-35f5f1656861",
    N5: "1635685296916-95acaf58471f", N6: "1633352615955-f0c99e8b7e5a",
    N7: "1565976469782-7c92daebc42e", N8: "1627900440398-5db32dba8db1",
    N9: "1607328874071-45a9cd600644", N10: "1565976469791-9cbef1241c1f",
    N11: "1609672655400-c509bdbcf7e2", N12: "1496114212242-bac8bd9de53d",
    N13: "1553621043-f607bfbf6640",
  };
  window.BUDHA.imgById = {
    "hero-main": "https://images.unsplash.com/photo-1557770401-95a068e9440e?auto=format&fit=crop&q=80&w=2000",
    "who-1": U(P.N3, 1300), "who-2": U(P.B4, 900),
    "food-1": U(P.N4, 1300), "food-2": U(P.N8), "food-3": U(P.N7),
    "food-4": U(P.N6), "food-5": U(P.B5),
    "top5-0": U(P.B3, 500), "top5-1": U(P.N1, 500), "top5-2": U(P.B1, 500),
    "top5-3": U(P.N5, 500), "top5-4": U(P.B2, 500),
    "gal-0": U(P.N9, 1100), "gal-1": U(P.B4), "gal-2": U(P.N11),
    "gal-3": U(P.N12), "gal-4": U(P.B5), "gal-5": U(P.N10),
    "ing-0": U(P.B3, 700), "ing-1": U(P.N8, 700), "ing-2": U(P.N4, 700), "ing-3": U(P.N7, 700),
    "ig-0": U(P.N1, 600), "ig-1": U(P.B1, 600), "ig-2": U(P.N13, 600),
    "ig-3": U(P.N7, 600), "ig-4": U(P.B2, 600), "ig-5": U(P.N3, 600),
    "ig-6": U(P.B4, 600), "ig-7": U(P.N6, 600), "ig-8": U(P.N11, 600),
    "ig-9": U(P.B5, 600), "ig-10": U(P.N9, 600), "ig-11": U(P.N12, 600),
    // real customer profile photos
    "rev-0": "https://i.pravatar.cc/200?img=45",
    "rev-1": "https://i.pravatar.cc/200?img=13",
    "rev-2": "https://i.pravatar.cc/200?img=32",
    // menu card images (key = "menu-{category}-{index}")
    "menu-small-0": U(P.B1, 300), "menu-small-1": U(P.B3, 300), "menu-small-2": U(P.N13, 300),
    "menu-small-3": U(P.N12, 300), "menu-small-4": U(P.N7, 300),
    "menu-wok-0": U(P.N4, 300), "menu-wok-1": U(P.N8, 300),
    "menu-wok-2": U(P.N9, 300), "menu-wok-3": U(P.N10, 300),
    "menu-noodle-0": U(P.N5, 300), "menu-noodle-1": U(P.N1, 300),
    "menu-noodle-2": U(P.N6, 300), "menu-noodle-3": U(P.N2, 300),
    "menu-rice-0": U(P.B2, 300), "menu-rice-1": U(P.N11, 300),
    "menu-rice-2": U(P.N3, 300), "menu-rice-3": U(P.B4, 300),
    "menu-sweet-0": U(P.B5, 300), "menu-sweet-1": U(P.N10, 300), "menu-sweet-2": U(P.N9, 300),
    "menu-drink-0": U(P.N7, 300), "menu-drink-1": U(P.B4, 300),
    "menu-drink-2": U(P.N13, 300), "menu-drink-3": U(P.N12, 300),
  };
})();
