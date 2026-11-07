/* Din — "Designed in glass". Plain JS, three.js 0.169.0 loaded lazily from the import map. */
/* Din — "Designed in glass". Single-page app: pages are swapped without reloading, so WebGL and fonts load once. */
const ROOT = new URL('./', import.meta.url).pathname;
const HREF = { home: ROOT, shop: ROOT + 'shop', bio: ROOT + 'bio', gifts: ROOT + 'gifts' };
const NAVL = [[HREF.home, 'Главная'], [HREF.shop, 'Магазин'], [HREF.bio, 'Био'], [HREF.gifts, 'Подарки']];
const TITLES = { home: 'Din — Главная', shop: 'Din — Магазин', bio: 'Din — Био', gifts: 'Din — Подарки' };
const routeOf = p => ({ shop: 'shop', bio: 'bio', gifts: 'gifts' })[p.slice(ROOT.length).replace(/\.html$/, '').replace(/\/+$/, '')] || 'home';
const TG = 'https://t.me/Din_Tag';
/* ВСЕ ТЕКСТЫ И ССЫЛКИ САЙТА — ЗДЕСЬ */
const PAGES = {
  home: {
    page: 'home', nav: NAVL, tg: TG,
    hero: {
      title: 'Din.',
      sub: 'Аккаунты, аренда, подарки, сайты и плагины. В канале постоянные розыгрыши.',
      btns: [['Магазин', HREF.shop], ['Био', HREF.bio], ['Подарки', HREF.gifts]],
      channel: 'Канал @Din_Tag'
    },
    tiles: [
      ['Магазин', '@DinSells', 'Аккаунты, аренда, накрутка, сайты и плагины.', HREF.shop],
      ['Био', '@DinsBio', 'Коротко обо мне.', HREF.bio],
      ['Подарки', 'Постоянные розыгрыши', 'Раздаю мишек и NFT-подарки в @DinPodarok.', HREF.gifts],
      ['Канал', '@Din_Tag', 'Главный канал Din.', TG]
    ]
  },
  shop: {
    page: 'shop', nav: NAVL, link: 'https://t.me/DinSells', tag: 'Часть выбора', btn: 'Перейти в канал',
    cards: [
      { type: 'num', flag: 'us', mask: '+1 ••• ••• ••••', title: 'Аккаунт США +1', desc: 'Аккаунт Telegram с номером США.' },
      { type: 'num', flag: 'jp', mask: '+81 ••• ••• ••••', title: 'Аккаунт Япония', desc: 'Аккаунт Telegram с номером Японии.' },
      { type: 'nft', title: 'Аренда NFT', desc: 'Подарки и NFT в аренду на нужный срок.' },
      { type: 'user', title: 'Аренда юзов', desc: 'Красивые юзернеймы в аренду.' },
      { type: 'followers', title: 'Накрутка подписчиков', desc: 'Для всех популярных соцсетей: Telegram, Instagram, TikTok, YouTube и других.' },
      { type: 'reactions', title: 'Накрутка реакций', desc: 'Реакции и лайки в популярных соцсетях: Telegram, Instagram, TikTok и других.' },
      { type: 'web', title: 'Разработка сайтов', desc: 'Лендинги, визитки и магазины под ключ: дизайн, анимации, адаптив.' },
      { type: 'plugin', title: 'Плагины для AyuGram и ExteraGram', desc: 'Пишу плагины и расширения под клиенты AyuGram и ExteraGram.' }
    ]
  },
  bio: {
    page: 'bio', nav: NAVL, link: 'https://t.me/DinsBio', linkText: 't.me/DinsBio', handle: '@DinsBio',
    about: 'Продаю аккаунты, сдаю в аренду NFT и юзы, раздаю подарки.', btn: 'Открыть канал',
    services: [['phone', 'Аккаунты'], ['gem', 'Аренда NFT'], ['at', 'Аренда юзов'], ['trend', 'Подписчики'], ['heart', 'Реакции'], ['code', 'Сайты'], ['plug', 'Плагины'], ['gift', 'Раздачи']],
    post: {
      label: 'Чем занимаюсь', title: 'Привет, я Din',
      text: [
        'Продаю аккаунты Telegram с номерами разных стран, сдаю в аренду NFT, подарки и красивые юзернеймы.',
        'Делаю сайты и плагины для AyuGram и ExteraGram, помогаю каналам расти и постоянно устраиваю розыгрыши.'
      ],
      time: 'Магазин @DinSells · Раздачи @DinPodarok'
    }
  },
  gifts: {
    page: 'gifts', nav: NAVL, link: 'https://t.me/DinPodarok', title: 'Раздаю мишек',
    text: 'Постоянные розыгрыши для подписчиков. Как это работает — ниже, а все новые раздачи выходят в канале.',
    btn: 'Перейти в канал',
    cards: [
      { ic: 'bell', title: 'Подпишись на канал', text: 'Раздачи выходят в @DinPodarok. Включи уведомления, чтобы не пропустить.' },
      { ic: 'check', title: 'Нажми «Участвую»', text: 'Один клик под постом. Никаких заданий и репостов.' },
      { ic: 'dice', title: 'Честный розыгрыш', text: 'Победителей выбирает случайный выбор, без договорных мест.' },
      { ic: 'gift', title: 'Мишки и NFT-подарки', text: 'В призах плюшевые мишки, редкие подарки и NFT.' },
      { ic: 'star', title: 'Звёзды и бонусы', text: 'Иногда добавляю Telegram Stars для участников.' },
      { ic: 'trophy', title: 'Итоги в канале', text: 'Победителей объявляю постом и пишу им лично.' }
    ]
  }
};
let C = PAGES[routeOf(location.pathname)];
const doc = document;
const $ = (t, c) => { const e = doc.createElement(t); if (c) e.className = c; return e; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const FONT = (w, s) => `${w} ${s}px Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif`;
const TXT = '#f2f2f7', MUT = 'rgba(242,242,247,.62)', ACC = '#b7abff';
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const COARSE = matchMedia('(pointer:coarse)').matches;
let CUR = HREF[C.page];
const MORPH = !COARSE && !REDUCED;
const isExt = h => /^https?:/.test(h);
const D2R = Math.PI / 180;
const mc = $('canvas').getContext('2d');
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2); this.moveTo(x + r, y); this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r); this.arcTo(x, y + h, x, y, r); this.arcTo(x, y, x + w, y, r); this.closePath();
  };
}
const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
function wrap(str, font, w) {
  mc.font = font; w = Math.max(40, w); const out = [];
  for (const para of String(str).split('\n')) {
    let cur = '';
    for (const wd of para.split(' ')) {
      const t = cur ? cur + ' ' + wd : wd;
      if (cur && mc.measureText(t).width > w) { out.push(cur); cur = wd; } else cur = t;
    }
    out.push(cur);
  }
  return out;
}
(() => {
  if (doc.getElementById('bg')) return;
  const b = $('div'); b.id = 'bg'; b.setAttribute('aria-hidden', 'true');
  const W = 'M0 160 Q360 60 720 160 T1440 160 T2160 160 T2880 160 V320 H0Z';
  b.innerHTML = '<i class="bl b1"></i><i class="bl b2"></i><i class="bl b3"></i><svg class="wv w1" viewBox="0 0 2880 320" preserveAspectRatio="none"><path d="' + W + '"/></svg><svg class="wv w2" viewBox="0 0 2880 320" preserveAspectRatio="none"><path d="' + W + '"/></svg>';
  doc.body.prepend(b);
})();
const rng = s => () => (s = (s * 16807) % 2147483647) / 2147483647;

/* ---------- drawn art (no image files) ---------- */

/* ---------- SVG icons (Path2D, 24x24 grid, lucide-style strokes) ---------- */
const SVGP = {
  shop: ['M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z', 'M3 6h18', 'M16 10a4 4 0 0 1-8 0'],
  user: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'],
  gift: ['M20 12v10H4V12', 'M2 7h20v5H2z', 'M12 22V7', 'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z', 'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'],
  plane: ['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13'],
  heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  flame: ['M12 2c.6 3.6 5 5.6 5 10.6a5 5 0 0 1-10 0c0-1.9.8-3.2 2-4.3.1 1.6.9 2.5 1.8 2.9C10.4 8 10.8 4.6 12 2z'],
  trend: ['M22 7 13.5 15.5 8.5 10.5 2 17', 'M16 7h6v6'],
  gem: ['M6 3h12l4 6-10 13L2 9Z', 'M11 3 8 9l4 13 4-13-3-6', 'M2 9h20'],
  at: ['M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z', 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'],
  bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  dice: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M8 8h.01', 'M16 8h.01', 'M12 12h.01', 'M8 16h.01', 'M16 16h.01'],
  star: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22', 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22', 'M18 2H6v7a6 6 0 0 0 12 0V2Z'],
  check: ['M20 6 9 17l-5-5'],
  plug: ['M12 22v-5', 'M9 8V2', 'M15 8V2', 'M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z'],
  code: ['m16 18 6-6-6-6', 'm8 6-6 6 6 6'],
  mega: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6']
};
const SVGC = {};
const svgIcon = (c, name, x, y, s, col, lw) => {
  const P = SVGC[name] || (SVGC[name] = SVGP[name].map(d => new Path2D(d)));
  c.save(); c.translate(x, y); c.scale(s / 24, s / 24);
  c.strokeStyle = col || TXT; c.lineWidth = lw || 1.9; c.lineCap = 'round'; c.lineJoin = 'round';
  P.forEach(p => c.stroke(p)); c.restore();
};
const svgFill = (c, name, x, y, s, col) => {
  const P = SVGC[name] || (SVGC[name] = SVGP[name].map(d => new Path2D(d)));
  c.save(); c.translate(x, y); c.scale(s / 24, s / 24); c.fillStyle = col; P.forEach(p => c.fill(p)); c.restore();
};
const tile = (c, x, y, s) => { rr(c, x + .5, y + .5, s - 1, s - 1, s * .3); const g = c.createLinearGradient(x, y, x + s, y + s); g.addColorStop(0, 'rgba(183,171,255,.22)'); g.addColorStop(1, 'rgba(255,255,255,.05)'); c.fillStyle = g; c.fill(); c.strokeStyle = 'rgba(255,255,255,.26)'; c.lineWidth = 1; c.stroke(); };
const iconTile = (name) => (c, x, y, s) => { tile(c, x, y, s); svgIcon(c, name, x + s * .26, y + s * .26, s * .48, TXT, 1.9); };

const glassBox = (c, x, y, w, h, r) => {
  const g = c.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, 'rgba(150,135,240,.30)'); g.addColorStop(1, 'rgba(30,28,52,.55)');
  rr(c, x + .5, y + .5, w - 1, h - 1, r); c.fillStyle = g; c.fill();
  c.strokeStyle = 'rgba(255,255,255,.2)'; c.lineWidth = 1; c.stroke();
};
const heart = (c, x, y, s) => { c.beginPath(); c.moveTo(x, y + s * .9); c.bezierCurveTo(x - s * 1.5, y - s * .2, x - s * .7, y - s * 1.1, x, y - s * .35); c.bezierCurveTo(x + s * .7, y - s * 1.1, x + s * 1.5, y - s * .2, x, y + s * .9); c.closePath(); };
const flame = (c, x, y, s) => { c.beginPath(); c.moveTo(x, y - s); c.bezierCurveTo(x + s * .2, y - s * .4, x + s * .8, y - s * .2, x + s * .7, y + s * .4); c.bezierCurveTo(x + s * .6, y + s * .95, x - s * .6, y + s * .95, x - s * .7, y + s * .4); c.bezierCurveTo(x - s * .8, y - s * .1, x - s * .2, y - s * .2, x, y - s); c.closePath(); };
const FLAG = {
  us(c, cx, cy, r) {
    const h = 2 * r / 7;
    for (let i = 0; i < 7; i++) { c.fillStyle = i % 2 ? '#f1f1f5' : '#c9364a'; c.fillRect(cx - r, cy - r + i * h, 2 * r, h + .5); }
    c.fillStyle = '#34408f'; c.fillRect(cx - r, cy - r, r * 1.1, h * 4); c.fillStyle = '#fff';
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { c.beginPath(); c.arc(cx - r + r * .28 + j * r * .5, cy - r + h * .7 + i * h * 1.1, r * .07, 0, 7); c.fill(); }
  },
  jp(c, cx, cy, r) { c.fillStyle = '#f4f4f8'; c.fillRect(cx - r, cy - r, 2 * r, 2 * r); c.fillStyle = '#d0243c'; c.beginPath(); c.arc(cx, cy, r * .46, 0, 7); c.fill(); }
};
const numCard = (flag, mask) => (c, x, y, w, h) => {
  glassBox(c, x, y, w, h, 14);
  const pad = 14, r = clamp(h * .2, 12, 20), fs0 = clamp(w * .07, 14, 20);
  const two = h >= 2 * pad + 2 * r + 12 + fs0;
  const cx = x + pad + r, cy = two ? y + pad + r : y + h / 2;
  c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 7); c.clip(); FLAG[flag](c, cx, cy, r); c.restore();
  c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 1.5; c.beginPath(); c.arc(cx, cy, r, 0, 7); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.5)';
  for (let i = 0; i < 4; i++) c.fillRect(x + w - pad - 18 + i * 5, cy + 8 - (4 + i * 3), 3, 4 + i * 3);
  const tx = two ? x + pad : x + pad + 2 * r + 12, tmax = w - (tx - x) - pad - (two ? 0 : 28);
  let fs = fs0; c.font = FONT(600, fs); const mw = c.measureText(mask).width; if (mw > tmax) fs = Math.max(10, fs * tmax / mw);
  c.fillStyle = TXT; c.font = FONT(600, fs); c.textBaseline = 'middle'; c.textAlign = 'left';
  c.fillText(mask, tx, two ? y + h - pad - fs / 2 : cy + 1);
};
const nftArt = (c, x, y, w, h) => {
  const cx = x + w / 2, cy = y + h / 2, g = c.createRadialGradient(cx, cy, 2, cx, cy, Math.max(w, h) * .6);
  g.addColorStop(0, 'rgba(150,135,240,.30)'); g.addColorStop(1, 'rgba(150,135,240,0)'); c.fillStyle = g; c.fillRect(x, y, w, h);
};
const webArt = (c, x, y, w, h) => {
  glassBox(c, x, y, w, h, 14);
  const bh = Math.min(26, h * .22); c.fillStyle = 'rgba(255,255,255,.07)'; c.fillRect(x + 1, y + 1, w - 2, bh);
  ['#ff6f8e', '#ffb15e', '#7be0a4'].forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.arc(x + 14 + i * 13, y + 1 + bh / 2, 3.5, 0, 7); c.fill(); });
  const L = [[0, .42, ACC], [.12, .3, 'rgba(255,255,255,.45)'], [.12, .5, 'rgba(255,255,255,.3)'], [0, .26, ACC]], top = y + bh + 14, gap = Math.max(10, Math.min(16, (h - bh - 28) / 4));
  L.forEach(([ox, lw, col], i) => { rr(c, x + 16 + ox * w * 1.2, top + i * gap, w * lw, 5, 2.5); c.fillStyle = col; c.fill(); });
  const is = Math.min(44, h * .4); svgIcon(c, 'code', x + w - 16 - is, y + bh + (h - bh - is) / 2, is, ACC, 1.8);
};
const pluginArt = (c, x, y, w, h) => {
  glassBox(c, x, y, w, h, 14);
  const rh = Math.min(h * .34, 36), gap = (h - 2 * rh) / 3;
  ['AyuGram', 'ExteraGram'].forEach((t, i) => {
    const ry = y + gap + i * (rh + gap);
    rr(c, x + 14, ry, w - 28, rh, rh / 2); c.fillStyle = 'rgba(255,255,255,.07)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.2)'; c.lineWidth = 1; c.stroke();
    svgIcon(c, 'plug', x + 14 + rh * .22, ry + rh * .22, rh * .56, ACC, 2);
    c.fillStyle = TXT; c.font = FONT(600, Math.min(17, rh * .46)); c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillText(t, x + 14 + rh, ry + rh / 2 + 1);
    c.fillStyle = MUT; c.font = FONT(500, Math.min(12, rh * .34)); c.textAlign = 'right'; c.fillText('плагин', x + w - 14 - rh * .4, ry + rh / 2 + 1);
  });
};
const userArt = (c, x, y, w, h) => {
  glassBox(c, x, y, w, h, 14);
  const rh = Math.min(h * .34, 36), gap = (h - 2 * rh) / 3;
  ['@din', '@din_shop'].forEach((t, i) => {
    const ry = y + gap + i * (rh + gap);
    rr(c, x + 14, ry, w - 28, rh, rh / 2); c.fillStyle = 'rgba(255,255,255,.07)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.2)'; c.stroke();
    c.fillStyle = 'rgba(183,171,255,.55)'; c.beginPath(); c.arc(x + 14 + rh / 2, ry + rh / 2, rh * .32, 0, 7); c.fill();
    c.fillStyle = TXT; c.font = FONT(600, Math.min(17, rh * .46)); c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillText(t, x + 14 + rh, ry + rh / 2 + 1);
    c.fillStyle = MUT; c.font = FONT(500, Math.min(12, rh * .34)); c.textAlign = 'right'; c.fillText('в аренду', x + w - 14 - rh * .4, ry + rh / 2 + 1);
  });
};
const followArt = (c, x, y, w, h) => {
  glassBox(c, x, y, w, h, 14);
  const fs = Math.min(30, h * .3);
  c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillStyle = TXT; c.font = FONT(700, fs); c.fillText('+12 480', x + 16, y + h * .4);
  c.fillStyle = MUT; c.font = FONT(500, 12); c.fillText('подписчиков', x + 16, y + h * .4 + fs * .85);
  const n = 8, bx = x + w * .52, bwid = (w * .42 - 3 * n) / n;
  for (let i = 0; i < n; i++) {
    const bh = h * .16 + i * (h * .52 / n), g = c.createLinearGradient(0, y + h - 14 - bh, 0, y + h - 14);
    g.addColorStop(0, '#cfc6ff'); g.addColorStop(1, 'rgba(116,102,209,.5)'); c.fillStyle = g;
    rr(c, bx + i * (bwid + 3), y + h - 14 - bh, bwid, bh, 3); c.fill();
  }
};
const reactArt = (c, x, y, w, h) => {
  glassBox(c, x, y, w, h, 14);
  const pill = (px, ic, t, col) => {
    rr(c, px, y + 12, 66, 26, 13); c.fillStyle = 'rgba(255,255,255,.08)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.22)'; c.stroke();
    svgFill(c, ic, px + 8, y + 18, 14, col);
    c.fillStyle = TXT; c.font = FONT(600, 12); c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillText(t, px + 28, y + 26);
  };
  pill(x + 14, 'heart', '248', '#ff6f8e'); pill(x + 88, 'flame', '1,2K', '#ffb15e');
  const cy0 = y + h * .52, ch = h * .38, pts = [.05, .22, .15, .4, .3, .55, .5, .8, .95].map((v, i, a) => [x + 14 + i * (w - 28) / (a.length - 1), cy0 + ch - v * ch]);
  c.beginPath(); pts.forEach(([a, b], i) => i ? c.lineTo(a, b) : c.moveTo(a, b));
  c.strokeStyle = ACC; c.lineWidth = 2.5; c.lineJoin = 'round'; c.stroke();
  c.lineTo(x + w - 14, cy0 + ch); c.lineTo(x + 14, cy0 + ch); c.closePath();
  const g = c.createLinearGradient(0, cy0, 0, cy0 + ch); g.addColorStop(0, 'rgba(183,171,255,.32)'); g.addColorStop(1, 'rgba(183,171,255,0)'); c.fillStyle = g; c.fill();
};
const bear = (c, cx, cy, s, col) => {
  c.fillStyle = col; [-1, 1].forEach(d => { c.beginPath(); c.arc(cx + d * s * .68, cy - s * .7, s * .34, 0, 7); c.fill(); });
  c.beginPath(); c.arc(cx, cy, s, 0, 7); c.fill();
  c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(cx, cy + s * .32, s * .46, s * .34, 0, 0, 7); c.fill();
  c.fillStyle = '#26202c'; [-1, 1].forEach(d => { c.beginPath(); c.arc(cx + d * s * .36, cy - s * .12, s * .09, 0, 7); c.fill(); });
  c.beginPath(); c.ellipse(cx, cy + s * .2, s * .13, s * .09, 0, 0, 7); c.fill();
};
const BEAR = ['#c08b68', '#b89bd8', '#8fb4d9', '#d99a9a', '#a9c79a', '#d8c07a'];
const shotArt = k => (c, x, y, w, h) => {
  glassBox(c, x, y, w, h, 12);
  c.fillStyle = 'rgba(255,255,255,.07)'; c.fillRect(x + 1, y + 1, w - 2, 28);
  c.fillStyle = 'rgba(183,171,255,.6)'; c.beginPath(); c.arc(x + 18, y + 15, 8, 0, 7); c.fill();
  c.fillStyle = 'rgba(255,255,255,.3)'; rr(c, x + 32, y + 12, w * .3, 6, 3); c.fill();
  const bub = (bx, by, bw, bh) => { rr(c, bx, by, bw, bh, 10); c.fillStyle = 'rgba(255,255,255,.09)'; c.fill(); };
  const m = 12, ww = w - 2 * m;
  bub(x + m, y + 40, ww * (.5 + (k % 3) * .1), 22); bub(x + w - m - ww * .46, y + 68, ww * .46, 22);
  const by = y + 98, bhh = Math.max(40, h - 98 - 40);
  bub(x + m, by, ww * .8, bhh);
  bear(c, x + m + ww * .4, by + bhh * .46, Math.min(ww * .17, bhh * .26), BEAR[k % 6]);
  c.fillStyle = 'rgba(255,255,255,.25)'; rr(c, x + m + 10, by + bhh - 14, ww * .5, 5, 2.5); c.fill();
  rr(c, x + m, y + h - 30, ww, 20, 10); c.fillStyle = 'rgba(255,255,255,.06)'; c.fill();
};
const drawMark = (c, x, y, s) => {
  const g = c.createLinearGradient(x, y, x + s, y + s); g.addColorStop(0, '#f4f3ff'); g.addColorStop(1, '#8c7ee6');
  rr(c, x, y, s, s, s * .26); c.fillStyle = g; c.fill();
  c.strokeStyle = 'rgba(8,8,14,.55)'; c.lineWidth = Math.max(1.5, s * .06); c.beginPath(); c.moveTo(x + s * .22, y + s * .78); c.lineTo(x + s * .78, y + s * .22); c.stroke();
};
const avatar = (c, x, y, s) => {
  const g = c.createLinearGradient(x, y, x + s, y + s); g.addColorStop(0, '#b7abff'); g.addColorStop(1, '#2d2760');
  c.beginPath(); c.arc(x + s / 2, y + s / 2, s / 2, 0, 7); c.fillStyle = g; c.fill(); c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 1.5; c.stroke();
  drawMark(c, x + s * .27, y + s * .27, s * .46);
};
const ICON = { shop: iconTile('shop'), bio: iconTile('user'), gift: iconTile('gift'), plane: iconTile('plane') };
const ART = { num: cd => numCard(cd.flag, cd.mask), nft: () => nftArt, user: () => userArt, web: () => webArt, plugin: () => pluginArt, followers: () => followArt, reactions: () => reactArt };

/* ---------- content (items in block coordinates) ---------- */
const HM = { home: [420, 104, 104, 104, 104], shop: [340, 340, 340, 340, 340, 340, 340, 340], bio: [350, 500], gifts: [360, 170, 170, 170, 170, 170, 170] };
const HS = { home: [420, 104, 104, 104, 104], shop: [340, 340, 340, 340, 340, 340, 340, 340], bio: [350, 500], gifts: [360, 150, 150, 150, 150, 150, 150] };

function navItems(Rg, f, m) {
  const it = [], s = v => v * f, cy = Rg.y + Rg.h / 2, ms = Math.round(s(36));
  it.push({ k: 'a', draw: (c, x, y) => drawMark(c, x, y, ms), x: Rg.x, y: cy - ms / 2, w: ms, h: ms });
  it.push({ k: 't', lines: ['Din'], x: Rg.x + ms + s(12), y: cy - s(16), sz: s(22), wt: 700, col: TXT, lh: Math.round(s(32)) });
  it.push({ k: 'l', href: 'index.html', x: Rg.x, y: cy - 22, w: ms + s(64), h: 44, label: 'Din — на главную' });
  if (m) {
    const bs = 44, bx = Rg.x + Rg.w - bs;
    it.push({ k: 'a', draw: c => { c.strokeStyle = TXT; c.lineWidth = 2; c.lineCap = 'round'; [-6, 0, 6].forEach(d => { c.beginPath(); c.moveTo(bx + 12, cy + d); c.lineTo(bx + 32, cy + d); c.stroke(); }); }, x: bx, y: cy - 22, w: bs, h: bs });
    it.push({ k: 'g', x: bx, y: cy - 22, w: bs, h: bs });
    return it;
  }
  let rx = Rg.x + Rg.w; const sz = s(16), ph = s(38);
  [...C.nav].reverse().forEach(([href, label]) => {
    mc.font = FONT(500, sz); const w = Math.ceil(mc.measureText(label).width) + s(36); rx -= w; const act = href === CUR;
    if (act) it.push({ k: 'a', draw: (c, x, y, aw, ah) => { rr(c, x + .5, y + .5, aw - 1, ah - 1, ah / 2); c.fillStyle = 'rgba(255,255,255,.12)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.34)'; c.stroke(); }, x: rx, y: cy - ph / 2, w, h: ph });
    it.push({ k: 't', lines: [label], x: rx + s(18), y: cy - ph / 2, sz, wt: act ? 600 : 500, col: act ? TXT : MUT, lh: Math.round(ph) });
    it.push({ k: 'l', href, x: rx, y: cy - Math.max(44, ph) / 2, w, h: Math.max(44, ph), label });
    rx -= s(4);
  });
  return it;
}

function contentFor(pg, i, Rg, f, m) {
  const it = [], { x, y, w, h } = Rg, s = v => v * f;
  const T = (str, tx, ty, tw, sz, wt = 500, col = TXT, lh = 1.3) => {
    const L2 = Math.round(lh > 5 ? lh : sz * lh), lines = wrap(str || '', FONT(wt, sz), tw);
    it.push({ k: 't', lines, x: tx, y: ty, sz, wt, col, lh: L2 }); return ty + lines.length * L2;
  };
  const bh = Math.max(44, s(46));
  const B = (label, href, bx, by, bw, prim) => { let sz = s(15); mc.font = FONT(600, sz); const tw = mc.measureText(label).width; if (tw > bw - 18) sz *= (bw - 18) / tw; it.push({ k: 'b', label, href, x: bx, y: by, w: bw, h: bh, prim, sz }); };
  const M = (src, mx, my, mw, mh, fb) => it.push({ k: 'm', src, x: mx, y: my, w: mw, h: mh, fb });
  const fit = (fn, ks = [1, .9, .8, .7, .6]) => { const n = it.length; for (const k of ks) { it.length = n; if (fn(k) <= y + h + 1 || k === ks[ks.length - 1]) return; } };
  const A = (draw, ax, ay, aw, ah) => it.push({ k: 'a', draw, x: ax, y: ay, w: aw, h: ah });
  const LK = (href, lx, ly, lw, lh, label) => it.push({ k: 'l', href, x: lx, y: ly, w: lw, h: lh, label });
  const pill = (str, px, py) => {
    mc.font = FONT(500, s(12)); const pw = Math.ceil(mc.measureText(str).width) + s(20), ph = s(24);
    A((c, ax, ay, aw, ah) => { rr(c, ax + .5, ay + .5, aw - 1, ah - 1, ah / 2); c.fillStyle = 'rgba(255,255,255,.06)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.22)'; c.stroke(); }, px, py, pw, ph);
    T(str, px + s(10), py, pw, s(12), 500, MUT, ph); return py + ph;
  };
  const rowb = (btns, rx, yBottom, rw) => {
    const gap = s(10), rows = [[]]; let cx = 0;
    btns.forEach(b => {
      mc.font = FONT(600, s(15)); const bw = Math.min(rw, Math.ceil(mc.measureText(b[0]).width) + Math.round(s(40)));
      if (cx + bw > rw && rows[rows.length - 1].length) { rows.push([]); cx = 0; }
      rows[rows.length - 1].push({ b, w: bw, x: cx }); cx += bw + gap;
    });
    let yy = yBottom - (rows.length * bh + (rows.length - 1) * gap); const top0 = yy;
    rows.forEach(r => { r.forEach(o => B(o.b[0], o.b[1], rx + o.x, yy, o.w, o.b[2])); yy += bh + gap; });
    return top0;
  };

  if (pg === 'home') {
    const H0 = C.hero || {};
    if (i === 0) {
      const sz = clamp(w * .27, 72, 170);
      const yy = T(H0.title || 'Din.', x, y + s(2), w, sz, 700, TXT, .95);
      mc.font = FONT(700, sz); const tw0 = mc.measureText(H0.title || 'Din.').width;
      const subB = T(H0.sub, x, yy + s(12), Math.min(w, s(500)), s(m ? 17 : 19), 400, MUT, 1.45);
      const bt = (H0.btns || []).map(b => [b[0], b[1], 0]); bt.push([H0.channel, C.tg, 1]);
      const top = rowb(bt, x, y + h, w);
      if (m) {
        const bsz = Math.min(sz * 1.05, w - tw0 - 16);
        if (bsz >= 70) M('bear', x + w - bsz, y, bsz, bsz);
        const gap = top - subB - s(14), gs = Math.min(gap, s(92));
        if (gs >= 54) ['g9', 'g10', 'g5'].forEach((g, j) => M(g, x + j * (gs + s(14)), subB + (gap - gs) / 2 + s(4), gs, gs));
      } else {
        const cx0 = x + Math.max(tw0, s(500)) + 24, cw = x + w - cx0;
        if (cw >= 150) {
          const cs = Math.min(cw, (h - s(10)) * .98), b0 = cs * .62;
          M('g9', cx0 + (cw - cs), y + s(4), cs * .36, cs * .36);
          M('bear', cx0 + (cw - cs) + cs * .3, y + cs * .12, b0, b0);
          M('g10', cx0 + (cw - cs) + cs * .58, y + cs * .6, cs * .4, cs * .4);
        }
      }
    } else {
      const t = (C.tiles || [])[i - 1]; if (!t) return it;
      const [ti, hd, ds, hr] = t, ic = ['shop', 'bio', 'gift', 'plane'][i - 1];
      LK(hr, x - s(6), y - s(6), w + s(12), h + s(12), ti);
      const isz = Math.round(s(54));
      if (h < s(150)) {
        M('g' + i, x, y + h / 2 - isz / 2, isz, isz, (c, fw) => ICON[ic](c, 0, 0, fw));
        const tx = x + isz + s(16), tw = w - isz - s(16);
        T(ti, tx, y + h / 2 - s(26), tw, s(20), 650); T(hd, tx, y + h / 2 + s(2), tw, s(14), 400, MUT);
      } else {
        M('g' + i, x, y, isz, isz, (c, fw) => ICON[ic](c, 0, 0, fw));
        let yy = T(ti, x, y + isz + s(18), w, s(22), 650); yy = T(hd, x, yy + s(2), w, s(15), 500, ACC); T(ds, x, yy + s(8), w, s(14), 400, MUT, 1.4);
      }
    }
  } else if (pg === 'shop') {
    const cd = (C.cards || [])[i]; if (!cd) return it;
    fit(k => {
      const u = v => v * k, bhk = bh;
      const yy = pill(C.tag, x, y), tl = wrap(cd.title, FONT(650, u(s(20))), w).length * Math.round(u(s(20)) * 1.3);
      const noDesc = k <= .6;
      const dl = noDesc ? 0 : wrap(cd.desc, FONT(400, u(s(14))), w).length * Math.round(u(s(14)) * 1.4);
      const ah = h - s(24) - s(10) - s(12) - tl - s(4) - dl - s(14) - bhk;
      if (ah < 80 && k > .6) return 1e9;
      const aH = clamp(ah, 56, 170);
      A(ART[cd.type](cd), x, yy + s(10), w, aH);
      if (cd.type === 'nft') {
        const ay = yy + s(10), gs = Math.min(aH * .95, w * .5), g2 = gs * .56;
        M('g5', x + (w - gs) / 2, ay + (aH - gs) / 2, gs, gs);
        M('g6', x + (w - gs) / 2 - g2 * .5, ay + aH - g2, g2, g2);
        M('g7', x + (w + gs) / 2 - g2 * .5, ay + aH - g2 * 1.05, g2, g2);
      }
      const ty = T(cd.title, x, yy + s(10) + aH + s(12), w, u(s(20)), 650);
      const by = noDesc ? ty : T(cd.desc, x, ty + s(4), w, u(s(14)), 400, MUT, 1.4);
      B(C.btn, C.link, x, y + h - bhk, w, 1);
      return Math.max(by, y + h);
    });
  } else if (pg === 'bio') {
    if (i === 0) {
      fit(k => {
        const u = v => v * f * k, as = Math.round(u(m ? 112 : 132));
        M('bear', x, y, as, as);
        let yy = T(C.handle, x, y + as + u(16), w, u(30), 700);
        yy = T(C.about, x, yy + u(4), w, u(16), 400, MUT, 1.45);
        yy = T(C.linkText, x, yy + u(10), w, u(15), 500, ACC);
        B(C.btn, C.link, x, y + h - bh, w, 1);
        return Math.max(yy + u(14) + bh, y + h);
      });
    } else {
      fit(k => {
        const u = v => v * f * k, P = C.post;
        const free = w - Math.min(w, s(620)); mc.font = FONT(700, u(m ? 28 : 36)); const twt = mc.measureText(P.title).width;
        if (free >= u(110)) { const gs = Math.min(free - u(16), u(240)); M('g8', x + w - gs, y, gs, gs); const g2 = gs * .72; M('g9', x + w - g2 - gs * .12, y + gs * .8, g2, g2); }
        else { const gs = Math.min(u(76), w - twt - u(20)); if (gs >= 48) M('g8', x + w - gs, y, gs, gs); }
        let yy = pill(P.label, x, y);
        yy = T(P.title, x, yy + u(16), w, u(m ? 28 : 36), 700, TXT, 1.15);
        P.text.forEach(p => { yy = T(p, x, yy + u(12), Math.min(w, s(620)), u(16), 400, MUT, 1.5); });
        // service chips
        let cx = 0, cy = yy + u(18); const ch = Math.round(u(34)), g = Math.round(u(8)), cw = Math.min(w, s(620));
        (C.services || []).forEach(([ic, label]) => {
          mc.font = FONT(500, u(13)); const tw = Math.ceil(mc.measureText(label).width), wd = Math.round(u(12) + u(15) + u(8) + tw + u(16));
          if (cx > 0 && cx + wd > cw) { cx = 0; cy += ch + g; }
          const px = x + cx, py = cy, fs = u(15), pd = u(12);
          A((c, ax, ay, aw, ah) => { rr(c, ax + .5, ay + .5, aw - 1, ah - 1, ah / 2); c.fillStyle = 'rgba(255,255,255,.07)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.22)'; c.lineWidth = 1; c.stroke(); svgIcon(c, ic, ax + pd, ay + (ah - fs) / 2, fs, ACC, 2); }, px, py, wd, ch);
          T(label, px + pd + fs + u(8), py, tw + 6, u(13), 500, TXT, ch);
          cx += wd + g;
        });
        const bottom = cy + ch;
        T(P.time, x, y + h - u(20), w, u(13), 500, MUT);
        return bottom + u(36);
      });
    }
  } else if (pg === 'gifts') {
    if (i === 0) {
      fit(k => {
        const bs = Math.round((m ? s(108) : Math.min(w * .62, s(220))) * k);
        const tsz = (m ? s(36) : clamp(w * .17, s(30), s(54))) * k, xs = s(16) * k;
        M('bear', x, y, bs, bs);
        const rw = w - bs - s(8);
        if (m) { const gs = Math.min((rw - s(8)) / 2, bs); if (gs >= 40) { M('g10', x + bs + s(8), y + (bs - gs) / 2, gs, gs); M('g1', x + bs + s(16) + gs, y + (bs - gs) / 2, gs, gs); } }
        else { const gs = Math.min(rw, bs * .5); if (gs >= 48) { M('g10', x + bs + s(8), y, gs, gs); M('g1', x + bs + s(8), y + bs - gs, gs, gs); } }
        const yy = T(C.title, x, y + bs + s(10), w, tsz, 700, TXT, 1.05);
        const by = T(C.text, x, yy + s(10), w, xs, 400, MUT, 1.45);
        B(C.btn, C.link, x, y + h - bh, w, 1);
        return by + s(14) + bh;
      });
    } else {
      const cd = (C.cards || [])[i - 1]; if (!cd) return it;
      fit(k => {
        const u = v => v * k, isz = Math.round(s(56) * k), horiz = h < s(215);
        if (horiz) {
          const tx = x + isz + s(14), tw = w - isz - s(14), ts = s(17) * k, ds = s(13.5) * k;
          const tl = wrap(cd.title, FONT(650, ts), tw).length * Math.round(ts * 1.25), dl = wrap(cd.text, FONT(400, ds), tw).length * Math.round(ds * 1.4);
          const bl = tl + s(4) + dl, top = y + Math.max(0, (h - bl) / 2);
          M('g' + (i + 1), x, y + (h - isz) / 2, isz, isz, (c, fw) => iconTile(cd.ic)(c, 0, 0, fw));
          const yy = T(cd.title, tx, top, tw, ts, 650, TXT, 1.25);
          return T(cd.text, tx, yy + s(4), tw, ds, 400, MUT, 1.4);
        }
        M('g' + (i + 1), x, y, isz, isz, (c, fw) => iconTile(cd.ic)(c, 0, 0, fw));
        const ts = s(19) * k, ds = s(14) * k;
        const yy = T(cd.title, x, y + isz + s(16), w, ts, 650, TXT, 1.25);
        return T(cd.text, x, yy + s(6), w, ds, 400, MUT, 1.45);
      });
    }
  }
  return it;
}

/* ---------- geometry plans ---------- */
function grid(cols, rows, pw, rh, cw, o = {}) {
  const R = rng(o.seed || 11), xs = [0], ys = [0];
  cw.forEach(v => xs.push(xs[xs.length - 1] + v * pw)); rh.forEach(v => ys.push(ys[ys.length - 1] + v));
  const ax = .1 * Math.min(...cw) * pw, ay = .16 * Math.min(...rh), at = (c, r) => r * (cols + 1) + c, V = [];
  for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
    const ex = c === 0 || c === cols, ey = r === 0 || r === rows;
    V.push({ x: xs[c] + (ex ? 0 : (R() - .5) * ax), y: ys[r] + (ey ? 0 : (R() - .5) * ay), fx: !ex, fy: !ey });
  }
  const mer = o.merge || [], cov = new Set(), cells = [];
  const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  mer.forEach(([c0, r0, c1, r1]) => {
    for (let r = r0; r < r1; r++) for (let c = c0; c < c1; c++) cov.add(r * cols + c);
    const set = (i, p) => { V[i].x = p.x; V[i].y = p.y; };
    for (let c = c0 + 1; c < c1; c++) { const t = (xs[c] - xs[c0]) / (xs[c1] - xs[c0]); set(at(c, r0), lerp(V[at(c0, r0)], V[at(c1, r0)], t)); set(at(c, r1), lerp(V[at(c0, r1)], V[at(c1, r1)], t)); }
    for (let r = r0 + 1; r < r1; r++) { const t = (ys[r] - ys[r0]) / (ys[r1] - ys[r0]); set(at(c0, r), lerp(V[at(c0, r0)], V[at(c0, r1)], t)); set(at(c1, r), lerp(V[at(c1, r0)], V[at(c1, r1)], t)); }
  });
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const mm = mer.find(q => q[0] === c && q[1] === r);
    if (mm) { cells.push([at(mm[0], mm[1]), at(mm[2], mm[1]), at(mm[2], mm[3]), at(mm[0], mm[3])]); continue; }
    if (cov.has(r * cols + c)) continue;
    cells.push([at(c, r), at(c + 1, r), at(c + 1, r + 1), at(c, r + 1)]);
  }
  return { V, cells, ph: ys[rows] };
}
function makePlan(pg, m, pw, ph) {
  if (pg === 'home') {
    if (m) return { ...grid(1, 5, pw, HM.home, [1]), morph: 1 };
    const q = (a, b, fx, fy) => ({ x: a * pw, y: b * ph, fx: !!fx, fy: !!fy });
    return {
      morph: 1, ph,
      V: [q(0, 0), q(.6, 0, 1, 0), q(.8, 0, 1, 0), q(1, 0), q(0, 1), q(.53, 1, 1, 0), q(.76, 1, 1, 0), q(1, 1), q(.565, .5, 1, 1), q(.785, .46, 1, 1), q(1, .43, 0, 1)],
      cells: [[0, 1, 5, 4], [1, 2, 9, 8], [2, 3, 10, 9], [8, 9, 6, 5], [9, 10, 7, 6]]
    };
  }
  if (pg === 'shop') return m ? grid(1, 8, pw, HM.shop, [1]) : grid(4, 2, pw, [ph / 2, ph / 2], [.25, .25, .25, .25]);
  if (pg === 'bio') return m ? grid(1, 2, pw, HM.bio, [1]) : grid(2, 1, pw, [ph], [.4, .6]);
  return m ? grid(1, 7, pw, HM.gifts, [1]) : grid(4, 2, pw, [ph / 2, ph / 2], [.28, .24, .24, .24], { merge: [[0, 0, 1, 2]] });
}
function expand(plan, pw, ph, G) {
  plan.V.forEach(v => {
    if (v.x < 1e-6) v.x -= G / 2; else if (v.x > pw - 1e-6) v.x += G / 2;
    if (v.y < 1e-6) v.y -= G / 2; else if (v.y > ph - 1e-6) v.y += G / 2;
  });
}
function region(pts) {
  const cx = pts.reduce((a, p) => a + p.x, 0) / pts.length, cy = pts.reduce((a, p) => a + p.y, 0) / pts.length;
  const mx = (arr, k) => Math.max(...arr.map(p => p[k])), mn = (arr, k) => Math.min(...arr.map(p => p[k]));
  const x0 = mx(pts.filter(p => p.x < cx), 'x'), x1 = mn(pts.filter(p => p.x >= cx), 'x');
  const y0 = mx(pts.filter(p => p.y < cy), 'y'), y1 = mn(pts.filter(p => p.y >= cy), 'y');
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}
function layoutFor(W, H) {
  const m = W < 720, mx = m ? 16 : W * .055, my = m ? 16 : H * .085, bw = W - 2 * mx;
  const S = m ? Math.max(.55, bw / 640) : Math.max(.42, bw / 1730), f = m ? 1 : clamp(bw / 1400, .85, 1.15);
  const G = 14 * S, bev = 2.6 * S, bh0 = H - 2 * my, navH = m ? 58 : Math.round(bh0 * .108), oy = navH + 14;
  const plan = makePlan(C.page, m, bw, bh0 - oy), ph = m ? plan.ph : bh0 - oy;
  expand(plan, bw, ph, G);
  const bh = m ? oy + ph : bh0, pad = Math.round(G / 2 + bev + 20 * f), pieces = [];
  pieces.push({
    nav: 1, poly: [{ x: -G / 2, y: -G / 2 }, { x: bw + G / 2, y: -G / 2 }, { x: bw + G / 2, y: navH + G / 2 }, { x: -G / 2, y: navH + G / 2 }],
    items: navItems({ x: pad - G / 2, y: 0, w: bw + G - 2 * pad, h: navH }, f, m)
  });
  plan.cells.forEach((ci, i) => {
    const poly = ci.map(j => ({ x: plan.V[j].x, y: plan.V[j].y + oy })), r = region(poly);
    pieces.push({ vidx: ci, poly, items: contentFor(C.page, i, { x: r.x + pad, y: r.y + pad, w: r.w - 2 * pad, h: r.h - 2 * pad }, f, m) });
  });
  pieces.forEach(p => p.items.forEach(it => { it.layer = p.nav ? 'n' : 'p'; }));
  return { m, mx, my, bw, bh, S, f, G, bev, navH, oy, ph, plan, pieces };
}

/* ---------- animated stickers (.tgs = gzipped Lottie), one shared 24-30 fps driver ---------- */
const MOFILE = { bear: 'bear.tgs' }; for (let i = 1; i <= 10; i++) MOFILE['g' + i] = 'g' + i + '.tgs';
const MOS = [], MOFPS = COARSE ? 24 : 30; let moRaf = 0, moLast = 0, moAcc = 0, LIBP = null; const MODATA = {};
function loadLib() {
  return LIBP || (LIBP = new Promise((res, rej) => {
    if (window.lottie) return res(window.lottie);
    const sc = $('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    sc.onload = () => res(window.lottie); sc.onerror = () => { LIBP = null; rej(new Error('lottie')); }; doc.head.append(sc);
  }));
}
function loadData(src) {
  return MODATA[src] || (MODATA[src] = (async () => {
    const r = await fetch(new URL(MOFILE[src], import.meta.url)); if (!r.ok) throw new Error('tgs ' + r.status);
    const buf = new Uint8Array(await r.arrayBuffer());
    if (buf[0] === 0x1f && buf[1] === 0x8b) return JSON.parse(await new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
    return JSON.parse(new TextDecoder().decode(buf));
  })().catch(e => { delete MODATA[src]; throw e; }));
}
const moIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.target._mo) e.target._mo.vis = e.isIntersecting; }), { rootMargin: '60px' }) : null;
function moTick(now) {
  moRaf = requestAnimationFrame(moTick);
  if (doc.hidden) { moLast = now; return; }
  moAcc += Math.min(.1, (now - moLast) / 1000); moLast = now;
  if (moAcc < 1 / MOFPS) return; const st = moAcc; moAcc = 0;
  for (const m of MOS) { if (!m.vis || !m.a) continue; m.t += st; try { m.a.goToAndStop((m.t * m.a.frameRate) % m.a.totalFrames, true); } catch (e) { } }
}
function mountMo(box, w, h, src, fb) {
  const m = { a: null, vis: true, t: Math.random() * 2, box }; box._mo = m; MOS.push(m); moIO && moIO.observe(box);
  const drawFb = () => {
    const f = $('canvas'), d = 2; f.width = w * d; f.height = h * d; f.style.cssText = 'width:100%;height:100%'; const c = f.getContext('2d'); c.scale(d, d);
    if (fb) fb(c, w, h); else if (src === 'bear') bear(c, w / 2, h * .56, Math.min(w, h) * .32, BEAR[0]); else svgIcon(c, 'gift', w * .2, h * .2, w * .6, ACC, 1.6);
    box.append(f);
  };
  Promise.all([loadLib(), loadData(src)]).then(([l, d]) => {
    if (!box.isConnected) return;
    m.a = l.loadAnimation({ container: box, renderer: 'canvas', loop: false, autoplay: false, animationData: structuredClone(d), rendererSettings: { preserveAspectRatio: 'xMidYMid meet', clearCanvas: true, dpr: Math.min(devicePixelRatio || 1, COARSE ? 1.5 : 2) } });
    m.a.goToAndStop(Math.floor(m.t * 20) % m.a.totalFrames, true);
    if (!REDUCED && !moRaf) { moLast = performance.now(); moRaf = requestAnimationFrame(moTick); }
  }).catch(() => { if (box.isConnected) drawFb(); });
}
const killMos = () => { MOS.splice(0).forEach(m => { moIO && moIO.unobserve(m.box); try { m.a && m.a.destroy(); } catch (e) { } }); cancelAnimationFrame(moRaf); moRaf = 0; };

/* ---------- DOM (text layer / static cards) ---------- */
function domItem(it, par, ox, oy, st) {
  let e;
  const pos = () => Object.assign(e.style, { left: (it.x - ox) + 'px', top: (it.y - oy) + 'px', width: it.w ? it.w + 'px' : '', height: it.h ? it.h + 'px' : '' });
  if (it.k === 't') {
    e = $('div', 't'); it.lines.forEach((ln, i) => { if (i) e.append($('br')); e.append(doc.createTextNode(ln)); });
    Object.assign(e.style, { left: (it.x - ox) + 'px', top: (it.y - oy) + 'px', font: FONT(it.wt, it.sz), lineHeight: it.lh + 'px' }); e.style.setProperty('--c', it.col);
  } else if (it.k === 'b' || it.k === 'l') {
    e = $('a', it.k === 'b' ? 'btn' + (it.prim ? ' prim' : '') : 'lk'); e.href = it.href; if (it.k === 'b') { e.textContent = it.label; e.style.font = FONT(600, it.sz); } else e.setAttribute('aria-label', it.label);
    if (isExt(it.href)) { e.target = '_blank'; e.rel = 'noopener noreferrer'; } else if (it.href !== CUR) e.dataset.go = '1';
    pos();
  } else if (it.k === 'm') {
    e = $('div', 'mo'); pos(); e.style.setProperty('--dl', (-Math.random() * 5).toFixed(2) + 's'); e.style.setProperty('--bd', (5 + Math.random() * 3).toFixed(2) + 's'); mountMo(e, it.w, it.h, it.src, it.fb);
  } else if (it.k === 'g') {
    e = $('button', 'bg'); e.type = 'button'; e.setAttribute('aria-label', 'Меню'); pos();
  } else if (it.k === 'a' && st) {
    e = $('canvas'); const d = 2; e.width = it.w * d; e.height = it.h * d; const c = e.getContext('2d'); c.scale(d, d); it.draw(c, 0, 0, it.w, it.h); pos();
    e.style.pointerEvents = 'none';
  }
  if (e) par.append(e);
  return e;
}
function navLinks(par) {
  par.textContent = '';
  C.nav.forEach(([h, l]) => { const a = $('a'); a.href = h; a.textContent = l; if (h === CUR) a.setAttribute('aria-current', 'page'); else a.dataset.go = '1'; par.append(a); });
}
function staticNav(url, pop) {
  const key = routeOf(new URL(url, location.href).pathname);
  if (key === C.page) { scrollTo(0, 0); return; }
  C = PAGES[key]; CUR = HREF[key]; doc.title = TITLES[key];
  if (!pop) { try { history.pushState(null, '', HREF[key]); } catch (e) { } }
  scrollTo(0, 0); renderStatic();
}
function renderStatic() {
  NAV = staticNav; killMos();
  doc.body.classList.remove('gl', 'fix'); doc.body.classList.add('static');
  const app = doc.getElementById('app') || doc.body; app.innerHTML = '';
  const nav = $('header', 'snav'), b = $('a', 'brand'); b.href = 'index.html'; b.innerHTML = '<i class="mk"></i><span>Din</span>';
  const links = $('nav', 'links'); navLinks(links);
  const bg = $('button', 'bg'); bg.type = 'button'; bg.setAttribute('aria-label', 'Меню'); bg.innerHTML = '<i></i><i></i><i></i>';
  bg.onclick = () => nav.classList.toggle('open'); nav.append(b, links, bg);
  const cards = $('main', 'cards'), pad = 22;
  (HS[C.page] || []).forEach((h, i) => {
    const card = $('section', 'card'); card.style.height = h + 'px';
    contentFor(C.page, i, { x: pad, y: pad, w: 340 - 2 * pad, h: h - 2 * pad }, 1, true).forEach(it => domItem(it, card, 0, 0, true));
    cards.append(card);
  });
  app.append(nav, cards);
}

/* ---------- homography for the DOM layer ---------- */
function homog(w, h, q) {
  const s = [[0, 0], [w, 0], [w, h], [0, h]], A = [], b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = s[i], [u, v] = q[i];
    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]); b.push(u); A.push([0, 0, 0, x, y, 1, -x * v, -y * v]); b.push(v);
  }
  const n = 8;
  for (let i = 0; i < n; i++) {
    let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
    [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
    for (let r = i + 1; r < n; r++) { const k = A[r][i] / A[i][i]; for (let c = i; c < n; c++) A[r][c] -= k * A[i][c]; b[r] -= k * b[i]; }
  }
  const x = Array(n);
  for (let i = n - 1; i >= 0; i--) { let t = b[i]; for (let c = i + 1; c < n; c++) t -= A[i][c] * x[c]; x[i] = t / A[i][i]; }
  const [a, bb, c, d, e, f, g, hh] = x;
  return `matrix3d(${a},${d},0,${g},${bb},${e},0,${hh},0,0,1,0,${c},${f},0,1)`;
}

/* ---------- WebGL ---------- */
function inset(pts, d) {
  const n = pts.length; let a = 0;
  for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; a += p.x * q.y - q.x * p.y; }
  const sg = a > 0 ? 1 : -1, Ln = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n]; let dx = q.x - p.x, dy = q.y - p.y; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    Ln.push({ px: p.x - dy * sg * d, py: p.y + dx * sg * d, dx, dy });
  }
  return pts.map((_, i) => {
    const A = Ln[(i - 1 + n) % n], B = Ln[i], cr = A.dx * B.dy - A.dy * B.dx;
    if (Math.abs(cr) < 1e-6) return { x: B.px, y: B.py };
    const t = ((B.px - A.px) * B.dy - (B.py - A.py) * B.dx) / cr; return { x: A.px + A.dx * t, y: A.py + A.dy * t };
  });
}
const easeOutBack = x => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);
const fontsReady = () => Promise.race([Promise.all(['400', '500', '600', '700'].map(w => doc.fonts.load(`${w} 16px Inter`))), new Promise(r => setTimeout(r, 700))]).catch(() => { });

async function startGL() {
  const lim = (p, ms) => Promise.race([p, new Promise((_, rj) => setTimeout(() => rj(new Error('timeout')), ms))]);
  const THREE = await lim(import('three'), 7000);
  const { RoomEnvironment } = await lim(import('three/addons/environments/RoomEnvironment.js'), 7000);
  const R = new THREE.WebGLRenderer({ antialias: (devicePixelRatio || 1) < 2, alpha: true, powerPreference: 'high-performance' });
  let W = innerWidth, H = innerHeight, L, raf, dead = false, last = performance.now(), T = 0;
  const maxTex = Math.min(4096, R.capabilities.maxTextureSize);
  R.toneMapping = THREE.ACESFilmicToneMapping; R.outputColorSpace = THREE.SRGBColorSpace; R.setClearColor(0x050507, 0);
  R.domElement.className = 'gl-canvas'; R.domElement.setAttribute('aria-hidden', 'true');
  doc.body.classList.add('gl'); const app = doc.getElementById('app') || doc.body; app.innerHTML = ''; doc.body.prepend(R.domElement);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, 10, 8000), root = new THREE.Group(); scene.add(root);
  const pm = new THREE.PMREMGenerator(R), env = pm.fromScene(new RoomEnvironment(), .04).texture;
  const key = new THREE.DirectionalLight(0xdfe8ff, 2.6); key.position.set(-700, 900, 1000); scene.add(key, new THREE.HemisphereLight(0x8d94ff, 0x050507, .35));
  const U = { uM: { value: new THREE.Vector2(1e5, 1e5) }, uS: { value: 1 } };
  const spacer = $('div'); spacer.id = 'spacer'; doc.body.append(spacer);
  const menu = $('nav', 'menu'); navLinks(menu); doc.body.append(menu);

  function mat() {
    const m = new THREE.MeshPhysicalMaterial({ color: 0x17171b, roughness: .36, clearcoat: .7, clearcoatRoughness: .12, specularIntensity: .7, iridescence: COARSE ? 0 : .55, iridescenceIOR: 1.3, iridescenceThicknessRange: [250, 650], envMap: env, envMapIntensity: .42 });
    m.onBeforeCompile = sh => {
      sh.uniforms.uM = U.uM; sh.uniforms.uS = U.uS; sh.uniforms.uG = { value: 1 }; m.userData.sh = sh;
      sh.vertexShader = 'varying vec3 vWP;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvWP=(modelMatrix*vec4(transformed,1.0)).xyz;');
      sh.fragmentShader = 'uniform vec2 uM;uniform float uS;uniform float uG;varying vec3 vWP;\n' + sh.fragmentShader.replace('#include <opaque_fragment>', 'outgoingLight+=vec3(.42,.37,.62)*.16*uG*exp(-1.6*pow(length(vWP.xy-uM)/(300.*uS),2.));\n#include <opaque_fragment>');
    };
    m.customProgramCacheKey = () => 'din-glass'; return m;
  }
  function roundShape(pts, r) {
    const s = new THREE.Shape(), n = pts.length;
    for (let i = 0; i < n; i++) {
      const p = pts[i], a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n], da = Math.hypot(a.x - p.x, a.y - p.y) || 1, db = Math.hypot(b.x - p.x, b.y - p.y) || 1;
      const ra = Math.min(r, da * .45), rb = Math.min(r, db * .45);
      const pa = { x: p.x + (a.x - p.x) * ra / da, y: p.y + (a.y - p.y) * ra / da }, pb = { x: p.x + (b.x - p.x) * rb / db, y: p.y + (b.y - p.y) * rb / db };
      if (i) s.lineTo(pa.x, pa.y); else s.moveTo(pa.x, pa.y); s.quadraticCurveTo(p.x, p.y, pb.x, pb.y);
    }
    s.closePath(); return s;
  }
  let tex, faceMat, navL, panL, introDone = false, intro0 = null, introEnd = 0, lv = null, tap = null, hoverP = null;
  const ptr = { x: -1e4, y: -1e4, on: false, down: false, touch: false }, tilt = { x: -.8, y: -1.2 }, rc = new THREE.Raycaster(), v3 = new THREE.Vector3();

  function setShape(p, pts) {
    const ip = inset(pts, L.G / 2 + L.bev); let cx = 0, cy = 0; ip.forEach(q => { cx += q.x; cy += q.y; }); cx /= ip.length; cy /= ip.length;
    const loc = ip.map(q => ({ x: q.x - cx, y: -(q.y - cy) })), sh = roundShape(loc, 20 * L.S);
    const eg = new THREE.ExtrudeGeometry(sh, { depth: 13 * L.S, bevelEnabled: true, bevelThickness: 2.6 * L.S, bevelSize: 2.6 * L.S, bevelSegments: 3, curveSegments: 3 });
    eg.translate(0, 0, -6.5 * L.S);
    const fg = new THREE.ShapeGeometry(sh, 3); if (p.rx === undefined) { p.rx = cx; p.ry = cy; }
    const ps = fg.attributes.position, uv = fg.attributes.uv;
    for (let i = 0; i < ps.count; i++) uv.setXY(i, (p.rx + ps.getX(i)) / L.bw, 1 - (p.ry - ps.getY(i)) / L.bh);
    fg.translate(0, 0, 9.1 * L.S + .4);
    p.mesh.geometry.dispose(); p.face.geometry.dispose(); p.mesh.geometry = eg; p.face.geometry = fg;
    p.cx = cx; p.cy = cy; p.hw = Math.max(...loc.map(q => Math.abs(q.x))); p.hh = Math.max(...loc.map(q => Math.abs(q.y)));
  }
  function teardown() {
    killMos(); if (!L) return;
    L.pieces.forEach(p => { root.remove(p.g); p.mesh.geometry.dispose(); p.face.geometry.dispose(); p.m.dispose(); });
    tex && tex.dispose(); faceMat && faceMat.dispose(); navL && navL.remove(); panL && panL.remove();
  }
  function build() {
    teardown(); L = layoutFor(W, H);
    const dpr = Math.max(1, Math.min(Math.max(1.5, Math.min(devicePixelRatio || 1, L.m ? 2 : 2.5)), maxTex / Math.max(L.bw, L.bh)));
    const cv = $('canvas'); cv.width = Math.ceil(L.bw * dpr); cv.height = Math.ceil(L.bh * dpr);
    const c = cv.getContext('2d'); c.scale(dpr, dpr);
    L.pieces.forEach(p => p.items.forEach(it => {
      if (it.k === 'a') it.draw(c, it.x, it.y, it.w, it.h);
      else if (it.k === 't') { c.font = FONT(it.wt, it.sz); c.fillStyle = it.col; c.textBaseline = 'middle'; c.textAlign = 'left'; it.lines.forEach((ln, i) => c.fillText(ln, it.x, it.y + it.lh * (i + .5))); }
      else if (it.k === 'b') {
        rr(c, it.x + .5, it.y + .5, it.w - 1, it.h - 1, it.h / 2);
        if (it.prim) { c.fillStyle = '#f4f3ff'; c.fill(); } else { c.fillStyle = 'rgba(255,255,255,.08)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.3)'; c.lineWidth = 1; c.stroke(); }
        c.font = FONT(600, it.sz); c.fillStyle = it.prim ? '#0b0b10' : TXT; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(it.label, it.x + it.w / 2, it.y + it.h / 2 + 1);
      }
    }));
    tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = COARSE ? 4 : 8;
    faceMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false });
    navL = $('div', 'layer'); panL = $('div', 'layer'); doc.body.append(navL, panL);
    navL.style.width = L.bw + 'px'; navL.style.height = L.navH + 'px'; panL.style.width = L.bw + 'px'; panL.style.height = L.ph + 'px';
    L.meshes = [];
    L.pieces.forEach((p, i) => {
      p.idx = i; p.ph = i * 1.7; p.m = mat(); p.mesh = new THREE.Mesh(new THREE.BufferGeometry(), p.m); p.face = new THREE.Mesh(new THREE.BufferGeometry(), faceMat);
      p.g = new THREE.Group(); p.g.add(p.mesh, p.face); root.add(p.g); p.mesh.userData.p = p; L.meshes.push(p.mesh);
      p.s = { z: [0, 0], rx: [0, 0], ry: [0, 0] }; p.h = 0; setShape(p, p.poly);
      const r = rng(31 + i * 7), S = L.S, dx = (p.cx - L.bw / 2) / L.bw;
      p.sx = (dx * 450 + (r() - .5) * 150) * S; p.sy = -(130 + r() * 170) * S; p.sz = (220 + r() * 200) * S; p.gv = 300 * S; p.dl = p.nav ? 0 : .05 + i * .025;
      p.tr = [0, 0, 0].map(() => (r() < .5 ? -1 : 1) * (.5 + r() * .6));
      p.items.forEach(it => { const n = it.layer === 'n'; const e = domItem(it, n ? navL : panL, 0, n ? 0 : L.oy, false); if (e && it.k === 'g') e.onclick = () => menu.classList.toggle('open'); });
    });
    navLinks(menu); U.uS.value = L.S; menu.style.top = (L.my + L.navH + 8) + 'px'; menu.classList.remove('open');
    doc.body.classList.toggle('fix', !L.m); spacer.style.height = L.m ? (L.bh + 2 * L.my) + 'px' : '0px';
  }
  function size() {
    W = innerWidth; H = innerHeight; R.setPixelRatio(Math.min(devicePixelRatio || 1, COARSE ? 1.5 : 2)); R.setSize(W, H);
    cam.aspect = W / H; cam.position.set(0, 0, (H / 2) / Math.tan(15 * D2R)); cam.updateProjectionMatrix();
  }
  function place(el, x, y, w, h, sy, z) {
    const X = L.mx - W / 2, Y = H / 2 - L.my + sy;
    el.style.transform = homog(w, h, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]].map(([a, b]) => { v3.set(X + a, Y - b, z); root.localToWorld(v3); v3.project(cam); return [(v3.x * .5 + .5) * W, (-v3.y * .5 + .5) * H]; }));
  }
  let reveal = 0;
  function swap(url, pop) {
    const key = routeOf(new URL(url, location.href).pathname);
    if (lv) return;
    if (key === C.page) { scrollTo(0, 0); return; }
    lv = { t0: T }; doc.body.classList.add('leaving'); menu.classList.remove('open'); hoverP = null;
    setTimeout(() => {
      try {
        C = PAGES[key]; CUR = HREF[key]; doc.title = TITLES[key];
        if (!pop) { try { history.pushState(null, '', HREF[key]); } catch (e) { } }
        scrollTo(0, 0); lv = null; introDone = false; intro0 = null; doc.body.classList.remove('ready');
        build(); reveal = 2;
      } catch (err) { console.error(err); location.href = url; }
    }, 210);
  }
  NAV = swap;
  const K = 170, CC = 19;
  const spr = (a, tg, dt) => { const n = Math.ceil(dt / .008), h = dt / n; for (let i = 0; i < n; i++) { a[1] += (K * (tg - a[0]) - CC * a[1]) * h; a[0] += a[1] * h; } };
  let lastBuild = 0;
  function step(now) {
    if (dead) return;
    const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; T += dt; if (intro0 === null) { intro0 = T; introEnd = T + .65 + L.pieces.length * .02; }
    const S = L.S, sy = L.m ? scrollY : 0;
    let tx = -1.2, ty = -.8;
    if (ptr.on || ptr.down) { const k = ptr.touch ? .5 : 1; tx = (ptr.x / W - .5) * 2 * 7 * k - 1.2; ty = (ptr.y / H - .5) * 2 * 5.5 * k - .8; }
    const a = 1 - Math.exp(-dt / .3); tilt.y += (tx - tilt.y) * a; tilt.x += (ty - tilt.x) * a; root.rotation.set(tilt.x * D2R, tilt.y * D2R, 0);
    const hp = tap && tap.until > T ? tap : (ptr.on ? { x: ptr.x, y: ptr.y } : null), pw = hp ? { x: hp.x - W / 2, y: H / 2 - hp.y } : { x: 1e5, y: 1e5 };
    U.uM.value.set(ptr.on ? ptr.x - W / 2 : 1e5, H / 2 - ptr.y);
    if (L.plan.morph && MORPH && T - lastBuild > 1 / 22) {
      lastBuild = T; const bx = ptr.x - L.mx, by = ptr.y - L.my + sy - L.oy;
      const cur = L.plan.V.map((v, i) => {
        let x = v.x, y = v.y;
        if (v.fx) x += Math.sin(T * .31 + i * 1.9) * 9 * S; if (v.fy) y += Math.cos(T * .27 + i * 2.7) * 7 * S;
        if (ptr.on) { const dx = x - bx, dy = y - by, d = Math.hypot(dx, dy) || 1, f = Math.exp(-Math.pow(d / (200 * S), 2)) * 16 * S; if (v.fx) x += dx / d * f; if (v.fy) y += dy / d * f; }
        return { x, y };
      });
      L.pieces.forEach(p => { if (p.vidx) setShape(p, p.vidx.map(j => ({ x: cur[j].x, y: cur[j].y + L.oy }))); });
    }
    for (const p of L.pieces) {
      let wx = L.mx + p.cx - W / 2, wy = H / 2 - L.my - p.cy + (p.nav ? 0 : sy), z = p.nav && L.m ? 30 * S : 0, rz = 0;
      if (!p.nav && !(L.plan.morph && MORPH)) {
        wx += Math.sin(T * .33 + p.ph) * 5 * S; wy += Math.cos(T * .27 + p.ph * 1.7) * 4 * S; rz = Math.sin(T * .21 + p.ph) * .004;
        if (ptr.on) { const dx = wx - pw.x, dy = wy - pw.y, d = Math.hypot(dx, dy) || 1, f = Math.exp(-Math.pow(d / (240 * S), 2)) * 14 * S; wx += dx / d * f; wy += dy / d * f; }
      }
      const hov = !lv && hoverP === p; p.h += ((hov ? 1 : 0) - p.h) * (1 - Math.exp(-dt / .12));
      let ry = 0, rx = 0; if (hov) { ry = clamp((pw.x - wx) / p.hw, -1, 1) * .24; rx = -clamp((pw.y - wy) / p.hh, -1, 1) * .24; }
      spr(p.s.z, hov ? (p.nav ? 32 : 50) * S : 0, dt); spr(p.s.rx, rx, dt); spr(p.s.ry, ry, dt);
      let e = 0;
      if (lv) { const u = clamp((T - lv.t0) / .22, 0, 1); p.g.scale.setScalar(1 - .06 * u); }
      else if (T < introEnd) e = 1 - easeOutBack(clamp((T - intro0 - p.idx * .02) / .6, 0, 1));
      p.g.position.set(wx + p.sx * e, wy + p.sy * e - p.gv * e * e, z + p.s.z[0] + p.sz * e);
      p.g.rotation.set(p.s.rx[0] + p.tr[0] * e, p.s.ry[0] + p.tr[1] * e, rz + p.tr[2] * e);
      if (!COARSE) p.m.iridescence = .55 + .45 * p.h; p.m.envMapIntensity = .42 * (1 + .9 * p.h); if (p.m.userData.sh) p.m.userData.sh.uniforms.uG.value = 1 + 1.2 * p.h;
    }
    if (!introDone && T >= introEnd) { introDone = true; doc.body.classList.add('ready'); }
    root.updateMatrixWorld(true);
    if (!lv && introDone && hp) { rc.setFromCamera({ x: hp.x / W * 2 - 1, y: -(hp.y / H) * 2 + 1 }, cam); const h = rc.intersectObjects(L.meshes, false)[0]; hoverP = h ? h.object.userData.p : null; } else if (!hp) hoverP = null;
    if (reveal && --reveal === 0) doc.body.classList.remove('leaving');
    place(navL, 0, 0, L.bw, L.navH, 0, L.m ? 30 * S : 0); place(panL, 0, L.oy, L.bw, L.ph, sy, 0);
    R.render(scene, cam);
  }
  let hidden = false;
  function fail() { dead = true; cancelAnimationFrame(raf); teardown(); R.domElement.remove(); menu.remove(); spacer.remove(); navL && navL.remove(); panL && panL.remove(); renderStatic(); }
  function tick(now) { if (dead || hidden) return; raf = requestAnimationFrame(tick); try { step(now); } catch (err) { console.error(err); fail(); } }
  function kick() { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(tick); }

  // pointer + events
  addEventListener('pointermove', e => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.touch = e.pointerType === 'touch'; ptr.on = !ptr.touch; });
  addEventListener('pointerdown', e => {
    ptr.x = e.clientX; ptr.y = e.clientY;
    if (e.pointerType === 'touch') { ptr.touch = true; ptr.down = true; ptr.on = false; tap = { x: e.clientX, y: e.clientY, until: T + 1.3 }; }
  });
  const up = () => { ptr.down = false; };
  addEventListener('pointerup', up); addEventListener('pointercancel', up);
  doc.documentElement.addEventListener('pointerleave', () => { ptr.on = false; });
  addEventListener('blur', () => { ptr.on = false; });
  doc.addEventListener('click', e => {
    if (!e.target.closest('a[data-go],.bg,.menu')) menu.classList.remove('open');
  });
  let rt, lastW = innerWidth; const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { const wc = Math.abs(innerWidth - lastW) > 1; lastW = innerWidth; size(); if (!L.m || wc) build(); }, 150); };
  addEventListener('resize', onResize); addEventListener('orientationchange', onResize);
  doc.addEventListener('visibilitychange', () => { if (doc.hidden) { hidden = true; cancelAnimationFrame(raf); } else { hidden = false; kick(); } });
  R.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); fail(); });
  size(); build(); kick();
}

let NAV = u => { location.href = u; };
doc.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[data-go]');
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
  e.preventDefault(); NAV(a.href);
});
addEventListener('popstate', () => NAV(location.href, true));
addEventListener('pageshow', e => { if (e.persisted) location.reload(); });
(async () => {
  if (REDUCED) { renderStatic(); return; }
  try { await fontsReady(); await startGL(); } catch (err) { console.warn('Din: static fallback', err && err.message); renderStatic(); }
})();
