/* Din — обычный DOM + CSS (чёткий текст и настоящее стекло). Стикеры: .tgs → lottie-web, играют только когда видны. */
const ROOT = new URL('./', import.meta.url).pathname;
const H = { home: ROOT, shop: ROOT + 'shop', bio: ROOT + 'bio', gifts: ROOT + 'gifts' };
const NAV = [['home', 'Главная'], ['shop', 'Магазин'], ['bio', 'Био'], ['gifts', 'Подарки']];
const TITLES = { home: 'Din — Главная', shop: 'Din — Магазин', bio: 'Din — Био', gifts: 'Din — Подарки' };
const routeOf = p => { const k = p.slice(ROOT.length).replace(/\.html$/, '').replace(/\/+$/, ''); return ['shop', 'bio', 'gifts'].includes(k) ? k : 'home'; };
const TG = 'https://t.me/Din_Tag';

/* ВСЕ ТЕКСТЫ И ССЫЛКИ — ЗДЕСЬ */
const SELL = 'https://t.me/DinSells', BIO = 'https://t.me/DinsBio', PROOF = 'https://t.me/DinPodarok';
const D = {
  home: {
    sub: 'Аккаунты, аренда, подарки, сайты и плагины. Покупки и постоянные розыгрыши — в канале @DinSells.',
    btns: [['Магазин', 'shop'], ['Био', 'bio'], ['Раздачи', 'gifts']], channel: ['Канал @DinSells', SELL], profile: ['Профиль @Din_Tag', TG],
    tiles: [
      ['Магазин', '@DinSells', 'Аккаунты, аренда, накрутка, сайты и плагины. Покупки и розыгрыши в канале.', H.shop],
      ['Био', '@DinsBio', 'Коротко обо мне и о том, чем занимаюсь.', H.bio],
      ['Раздачи', '@DinPodarok', 'Скрины прошлых раздач: видно, что всё по-настоящему.', H.gifts],
      ['Профиль', '@Din_Tag', 'Написать мне напрямую.', TG]
    ]
  },
  shop: {
    tag: 'Часть выбора', btn: 'Купить в @DinSells', btn2: 'Написать @Din_Tag',
    cards: [
      ['Аккаунт США +1', 'Аккаунт Telegram с номером США.', 'num', 'us', '+1 ••• ••• ••••', 'номер США'],
      ['Аккаунт Япония', 'Аккаунт Telegram с номером Японии.', 'num', 'jp', '+81 ••• ••• ••••', 'номер Японии'],
      ['Аренда NFT', 'Подарки и NFT в аренду на нужный срок.', 'nft'],
      ['Аренда юзов', 'Красивые юзернеймы в аренду.', 'user'],
      ['Накрутка подписчиков', 'Для всех популярных соцсетей: Telegram, Instagram, TikTok, YouTube и других.', 'fol'],
      ['Накрутка реакций', 'Реакции и лайки в популярных соцсетях: Telegram, Instagram, TikTok и других.', 'rea'],
      ['Разработка сайтов', 'Лендинги, визитки и магазины под ключ: дизайн, анимации, адаптив.', 'web'],
      ['Плагины для AyuGram и ExteraGram', 'Пишу плагины и расширения под клиенты AyuGram и ExteraGram.', 'plg']
    ]
  },
  bio: {
    linkText: 't.me/DinsBio', handle: '@DinsBio', btn: 'Открыть @DinsBio',
    about: 'Продаю аккаунты, сдаю в аренду NFT и юзы, раздаю подарки.',
    services: ['Аккаунты', 'Аренда NFT', 'Аренда юзов', 'Подписчики', 'Реакции', 'Сайты', 'Плагины', 'Раздачи'],
    title: 'Привет, я Din',
    text: ['Продаю аккаунты Telegram с номерами разных стран, сдаю в аренду NFT, подарки и красивые юзернеймы.', 'Делаю сайты и плагины для AyuGram и ExteraGram, помогаю каналам расти и постоянно устраиваю розыгрыши.'],
    time: 'Покупки и розыгрыши — @DinSells · Профиль — @Din_Tag'
  },
  gifts: {
    title: 'Раздачи', btn: 'Розыгрыши в @DinSells', btn2: 'Скрины в @DinPodarok',
    text: 'Постоянные розыгрыши для подписчиков. Как это работает — ниже. В @DinPodarok лежат скрины прошлых раздач, чтобы было видно, что они настоящие.',
    cards: [
      ['Подпишись на канал', 'Розыгрыши выходят в @DinSells. Включи уведомления, чтобы не пропустить.'],
      ['Нажми «Участвую»', 'Один клик под постом. Никаких заданий и репостов.'],
      ['Честный розыгрыш', 'Победителей выбирает случайный выбор, без договорных мест.'],
      ['Мишки и NFT-подарки', 'В призах плюшевые мишки, редкие подарки и NFT.'],
      ['Звёзды и бонусы', 'Иногда добавляю Telegram Stars для участников.'],
      ['Итоги в канале', 'Победителей объявляю постом в @DinSells и пишу им лично.']
    ],
    proof: ['Скрины раздач', 'Сколько подарков уже роздано — смотри в @DinPodarok: там только скриншоты выдач.']
  }
};

/* ---------- контурный фон (как внизу баннера), рисуется кодом ---------- */
(() => {
  let s = 7, p = ''; const R = () => (s = s * 16807 % 2147483647) / 2147483647;
  for (const [cx, cy, n] of [[110, 230, 11], [340, 70, 8]]) {
    const a = R() * 6, b = R() * 6;
    for (let k = 1; k <= n; k++) {
      let d = '';
      for (let i = 0; i <= 72; i++) { const t = i / 72 * 6.2832, r = k * 17 * (1 + .16 * Math.sin(3 * t + a + k * .07) + .09 * Math.sin(5 * t + b) + .05 * Math.sin(2 * t + k * .2)); d += (i ? 'L' : 'M') + (cx + r * 1.35 * Math.cos(t)).toFixed(1) + ' ' + (cy + r * .8 * Math.sin(t)).toFixed(1); }
      p += `<path d="${d}Z"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 300" fill="none" stroke="#fff" stroke-width="1.1">${p}</svg>`;
  document.documentElement.style.setProperty('--ct', `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
})();

/* ---------- стикеры ---------- */
let LP; const lib = () => LP || (LP = new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js'; s.onload = () => ok(window.lottie); s.onerror = no; document.head.append(s); }));
const DC = {};
const tgs = n => DC[n] || (DC[n] = fetch(new URL(n + '.tgs', import.meta.url)).then(async r => { if (!r.ok) throw 0; const b = new Uint8Array(await r.arrayBuffer()); return b[0] === 0x1f ? JSON.parse(await new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).text()) : JSON.parse(new TextDecoder().decode(b)); }).catch(e => { delete DC[n]; throw e; }));
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
const kill = el => { el._t = (el._t || 0) + 1; if (el._a) { el._a.destroy(); el._a = null; el.innerHTML = ''; } };
const io = new IntersectionObserver(es => es.forEach(async en => {
  const el = en.target;
  if (!en.isIntersecting) return kill(el);
  if (el._a) return;
  const t = el._t = (el._t || 0) + 1;
  try {
    const [L, d] = await Promise.all([lib(), tgs(el.dataset.s)]);
    if (el._t !== t || !el.isConnected) return;
    el._a = L.loadAnimation({ container: el, renderer: 'canvas', loop: true, autoplay: !RM, animationData: structuredClone(d), rendererSettings: { clearCanvas: true, preserveAspectRatio: 'xMidYMid meet', dpr: Math.min(devicePixelRatio || 1, 2) } });
    if (RM) el._a.goToAndStop(0, true);
  } catch (e) { }
}), { rootMargin: '150px' });

/* ---------- разметка ---------- */
const ext = h => /^https?:/.test(h);
const A = h => ext(h) ? `href="${h}" target="_blank" rel="noopener"` : `href="${h}" data-r`;
const hr = h => H[h] || h;
const st = (n, c = '') => `<div class="st ${c}" data-s="${n}" aria-hidden="true"></div>`;
const btn = (t, h, p) => `<a class="btn${p ? ' p' : ''}" ${A(hr(h))}>${t}</a>`;
const DOTS = '<span class="dots"><i></i><i></i><i></i></span>';
const card = (u, b, c = '', h, x = '') => { const t = h ? 'a' : 'article'; return `<${t} class="cd ${c}"${h ? ' ' + A(h) : ''}><div class="ch">${DOTS}<b></b><span>${u}</span>${x ? `<em>${x}</em>` : ''}</div><div class="cb">${b}</div></${t}>`; };
const n2 = i => String(i + 1).padStart(2, '0');

const FL = { us: '<i class="fl us"></i>', jp: '<i class="fl jp"></i>' };
const row = (t, r, av) => `<div class="rw">${av ? '<i class="av"></i>' : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b9b9c4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>'}<b>${t}</b><small>${r}</small></div>`;
const ART = {
  num: d => `<div class="art">${FL[d[3]]}<div class="nm"><b>${d[4]}</b><small>${d[5]}</small></div><span class="sig"><i></i><i></i><i></i><i></i></span></div>`,
  nft: () => `<div class="art mid">${st('g5')}${st('g7')}</div>`,
  user: () => `<div class="art col">${row('@din', 'в аренду', 1)}${row('@din_shop', 'в аренду', 1)}</div>`,
  fol: () => `<div class="art"><div class="nm"><b class="xl">+12 480</b><small>подписчиков</small></div><div class="bars">${[18, 28, 38, 48, 58, 70, 82, 96].map(h => `<i style="height:${h}%"></i>`).join('')}</div></div>`,
  rea: () => `<div class="art col"><div class="pl"><span>♥ 248</span><span>★ 1,2K</span></div><svg viewBox="0 0 200 44" preserveAspectRatio="none"><polyline points="0,40 25,32 50,35 75,24 100,26 125,16 150,12 175,6 200,3" fill="none" stroke="#f2f2f7" stroke-width="2.4" stroke-linejoin="round"/></svg></div>`,
  web: () => `<div class="art web"><div class="wb">${DOTS}</div><div class="wl"><span style="width:44%"></span><span style="width:30%;opacity:.5"></span><span style="width:52%;opacity:.3"></span></div><code class="cg">&lt;/&gt;</code></div>`,
  plg: () => `<div class="art col">${row('AyuGram', 'плагин')}${row('ExteraGram', 'плагин')}</div>`
};
const PG = {
  home() {
    const c = D.home;
    return card('t.me/DinSells', `${st('bear', 'bear')}<h1>Din.</h1><p class="sub">${c.sub}</p><div class="srow">${st('g9')}${st('g10')}${st('g5')}</div><div class="acts">${btn(c.channel[0], c.channel[1], 1)}${c.btns.map(b => btn(b[0], b[1])).join('')}${btn(c.profile[0], c.profile[1])}</div>`, 'span')
      + c.tiles.map((t, i) => card(t[1], `<span class="idx">№ ${n2(i)}</span><h3>${t[0]}</h3><p>${t[2]}</p><span class="go">${ext(t[3]) ? 'Открыть в Telegram ↗' : 'Открыть →'}</span>`, 'tile', t[3])).join('');
  },
  shop() {
    const c = D.shop;
    return c.cards.map((d, i) => card('t.me/DinSells', `<span class="idx">№ ${n2(i)}</span>${ART[d[2]](d)}<h3>${d[0]}</h3><p>${d[1]}</p><div class="acts">${btn(c.btn, SELL, 1)}${btn(c.btn2, TG)}</div>`, '', '', c.tag)).join('');
  },
  bio() {
    const c = D.bio;
    return card(c.linkText, `<div class="me"><i class="mk lg">D</i><div><h2>${c.title}</h2><code class="spec" style="margin:8px 0 0;display:inline-block">${c.handle}</code></div></div><p>${c.about}</p><div class="chips">${c.services.map(s => `<span>${s}</span>`).join('')}</div>`, 'span')
      + card('чем занимаюсь', c.text.map(t => `<p>${t}</p>`).join('') + `<span class="bar-code"></span><p class="lab" style="margin-top:12px">${c.time}</p><div class="acts">${btn('Канал @DinSells', SELL, 1)}${btn(c.btn, BIO)}${btn('Профиль @Din_Tag', TG)}</div>`, 'span');
  },
  gifts() {
    const c = D.gifts;
    return card('t.me/DinSells', `${st('bear', 'bear')}<h1 style="font-size:clamp(34px,9.5vw,96px)">${c.title}</h1><p class="sub">${c.text}</p><div class="acts">${btn(c.btn, SELL, 1)}${btn(c.btn2, PROOF)}</div>`, 'span')
      + c.cards.map((d, i) => card('шаг ' + n2(i), `${st('g' + (i + 1))}<span class="idx">№ ${n2(i)}</span><h3>${d[0]}</h3><p>${d[1]}</p>`)).join('')
      + card('t.me/DinPodarok', `<h3>${c.proof[0]}</h3><p>${c.proof[1]}</p><div class="srow">${[7, 8, 9, 10].map(n => st('g' + n)).join('')}</div><div class="acts">${btn(c.btn2, PROOF, 1)}</div>`, 'span', '', 'доказательства');
  }
};

/* ---------- каркас и роутер ---------- */
const app = document.getElementById('app');
app.innerHTML = `<div id="bgc"></div><header class="bar"><a class="logo" ${A(H.home)} aria-label="Din — на главную"><i class="mk">D</i><b>Din</b></a><i class="sep"></i><span class="url">t.me/DinSells</span>
<button class="bg" aria-label="Меню" aria-expanded="false"><i></i><i></i></button><nav>${NAV.map(([k, l]) => `<a ${A(H[k])} data-k="${k}">${l}</a>`).join('')}</nav></header>
<main id="m" class="w"></main><footer class="ft"><a href="https://t.me/DinSells" target="_blank" rel="noopener">Канал @DinSells</a><a href="https://t.me/Din_Tag" target="_blank" rel="noopener">Профиль @Din_Tag</a><a href="https://t.me/DinsBio" target="_blank" rel="noopener">Био @DinsBio</a><a href="https://t.me/DinPodarok" target="_blank" rel="noopener">Раздачи @DinPodarok</a></footer>`;
const bar = app.querySelector('.bar'), burger = bar.querySelector('.bg'), M = document.getElementById('m');
const setMenu = o => { bar.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); };

function render(k) {
  M.querySelectorAll('.st').forEach(el => { io.unobserve(el); kill(el); });
  M.className = 'w'; M.innerHTML = `<div class="pg${k === 'shop' ? ' s3' : ''}">${PG[k]()}</div>`; void M.offsetWidth; M.className = 'w in';
  bar.querySelectorAll('nav a').forEach(a => a.dataset.k === k ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  document.title = TITLES[k]; setMenu(false);
  M.querySelectorAll('.st').forEach(el => io.observe(el));
}
function go(href) {
  const k = routeOf(new URL(href, location.href).pathname);
  try { history.pushState(null, '', H[k]); } catch (e) { }
  render(k); scrollTo(0, 0);
}
burger.onclick = () => setMenu(!bar.classList.contains('open'));
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-r]');
  if (a) { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); return go(a.getAttribute('href')); }
  if (!e.target.closest('.bar')) setMenu(false);
});
addEventListener('popstate', () => render(routeOf(location.pathname)));
render(routeOf(location.pathname));
