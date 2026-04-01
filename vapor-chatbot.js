// VAPOR Chatbot (English) — upgraded, site-aware, no backend.
(() => {
  const STORAGE_KEY = 'vapor_chat_history_v4';
  const UI_KEY = 'vapor_chat_ui_v4';
  const isTouch = matchMedia('(pointer: coarse)').matches;

  const money = (n) => {
    const v = Number(n);
    return Number.isFinite(v) ? `$${v.toFixed(2)}` : '';
  };
  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const normalize = (input) =>
    String(input || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const safeParse = (raw, fallback) => {
    try {
      const v = JSON.parse(raw);
      return v ?? fallback;
    } catch {
      return fallback;
    }
  };

  const uniqueSorted = (list) =>
    Array.from(new Set(list.filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b)));

  const getCatalog = () => (Array.isArray(window.VAPOR_PRODUCTS) ? window.VAPOR_PRODUCTS : []);
  const getShared = () => window.VaporShared || null;
  const getCart = () => {
    const shared = getShared();
    if (!shared || typeof shared.getCart !== 'function') return null;
    try {
      return shared.getCart();
    } catch {
      return null;
    }
  };

  const stats = () => {
    const products = getCatalog();
    return {
      count: products.length,
      categories: uniqueSorted(products.map((p) => p.category)),
      brands: uniqueSorted(products.map((p) => p.brand)),
    };
  };

  const scoreProducts = (query) => {
    const products = getCatalog();
    const q = normalize(query);
    if (!q || q.length < 2) return [];
    const tokens = q.split(' ').filter(Boolean);

    const scored = [];
    for (const p of products) {
      const hay = normalize(`${p.name} ${p.brand} ${p.category} ${p.description || ''} ${(p.features || []).join(' ')}`);
      let s = 0;
      for (const t of tokens) {
        if (!t) continue;
        if (hay.includes(t)) s += t.length >= 5 ? 4 : 2;
      }
      if (p.brand && normalize(p.brand) === q) s += 6;
      if (p.category && normalize(p.category) === q) s += 6;
      if (s > 0) scored.push({ p, s });
    }
    scored.sort((a, b) => b.s - a.s);
    return scored;
  };

  const findProducts = (query, limit = 4) => scoreProducts(query).slice(0, limit).map((x) => x.p);

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (v === true) node.setAttribute(k, k);
      else if (v !== false && v != null) node.setAttribute(k, String(v));
    }
    for (const c of children) node.append(c);
    return node;
  };

  /** Small stroke icons for header / send (avoids clipped text glyphs). */
  const svgIcon = (paths) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    for (const d of paths) {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d);
      svg.appendChild(p);
    }
    return svg;
  };

  /** Gold FAB: filled chat bubble with message lines (messagerie). */
  const svgMessengerFab = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'vaporChat__fabSvg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('aria-hidden', 'true');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute(
      'd',
      'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'
    );
    svg.appendChild(p);
    return svg;
  };

  const svgBotAvatar = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.75');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    const spark = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    spark.setAttribute('d', 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1');
    const face = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    face.setAttribute('cx', '12');
    face.setAttribute('cy', '12');
    face.setAttribute('r', '3.5');
    svg.append(spark, face);
    return svg;
  };

  /** Delivery ticks: single (sent) or double (delivered / read). */
  const svgTickSingle = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'vaporChat__tickSvg');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', 'M5 13l4 4L19 7');
    svg.appendChild(p);
    return svg;
  };

  const svgTickDouble = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'vaporChat__tickSvg vaporChat__tickSvg--double');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const a = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    a.setAttribute('d', 'M3 12l4 4L17 6');
    const b = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    b.setAttribute('d', 'M7 12l4 4L21 6');
    svg.append(a, b);
    return svg;
  };

  const setTickStatus = (tickEl, status) => {
    if (!tickEl) return;
    tickEl.setAttribute('data-status', status);
    tickEl.replaceChildren();
    if (status === 'sent') tickEl.appendChild(svgTickSingle());
    else tickEl.appendChild(svgTickDouble());
  };

  const ensureStyles = () => {
    if (document.getElementById('vapor-chatbot-style')) return;
    const style = el('style', { id: 'vapor-chatbot-style' });
    style.textContent = `
      .vaporChat__fab{
        position:fixed;right:20px;bottom:20px;z-index:100002;
        width:58px;height:58px;border-radius:999px;
        display:grid;place-items:center;
        color:rgba(255,252,245,.98);
        background:linear-gradient(155deg,#f0d78c 0%,#c9a227 38%,#8a6a12 100%);
        border:1px solid rgba(255,255,255,.42);
        box-shadow:
          0 10px 28px rgba(138,106,18,.42),
          inset 0 1px 0 rgba(255,255,255,.35),
          inset 0 -1px 0 rgba(0,0,0,.12);
        cursor:pointer;
        transition:opacity .2s ease, transform .2s ease, filter .2s ease, box-shadow .2s ease;
      }
      .vaporChat__fab:hover{
        transform:translateY(-2px);
        filter:brightness(1.06);
        box-shadow:0 14px 36px rgba(138,106,18,.5), inset 0 1px 0 rgba(255,255,255,.4);
      }
      .vaporChat__fabSvg{width:28px;height:28px;display:block;filter:drop-shadow(0 1px 1px rgba(0,0,0,.2))}
      .vaporChat__fab[data-hidden="true"]{opacity:0;pointer-events:none;transform:scale(.9)}
      .vaporChat__panel{
        position:fixed;right:20px;bottom:calc(20px + 58px + 12px);z-index:100001;
        width:min(400px,calc(100vw - 40px));
        height:min(520px,calc(100vh - 120px));
        max-height:calc(100vh - 120px);
        border-radius:18px;
        display:flex;flex-direction:column;
        overflow:hidden;
        background:rgba(12,14,22,.96);
        border:1px solid rgba(139,92,246,.28);
        box-shadow:0 24px 64px rgba(0,0,0,.55);
        backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
        transform-origin:100% 100%;
        transform:translateY(10px) scale(.98);
        opacity:0;pointer-events:none;
        transition:opacity .2s ease, transform .2s ease;
      }
      .vaporChat__panel[data-open="true"]{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
      .vaporChat__header{
        flex:0 0 auto;
        display:grid;
        grid-template-columns:40px minmax(0,1fr) 40px;
        align-items:center;
        gap:8px;
        padding:12px 10px;
        min-height:56px;
        box-sizing:border-box;
        background:linear-gradient(135deg,rgba(155,107,255,.18),rgba(45,212,191,.12));
        border-bottom:1px solid rgba(148,163,184,.2);
      }
      .vaporChat__iconBtn{
        width:40px;height:40px;flex:0 0 40px;
        border-radius:12px;
        display:grid;place-items:center;
        color:rgba(237,242,255,.95);
        background:rgba(255,255,255,.08);
        border:1px solid rgba(255,255,255,.14);
        cursor:pointer;
        transition:background .15s ease;
      }
      .vaporChat__iconBtn:hover{background:rgba(255,255,255,.14)}
      .vaporChat__iconBtn svg{width:18px;height:18px;display:block}
      .vaporChat__title{
        min-width:0;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        text-align:center;gap:2px;
      }
      .vaporChat__title strong{
        font-size:14px;font-weight:800;letter-spacing:.02em;
        color:rgba(239,246,255,.98);
        line-height:1.2;
        max-width:100%;
        overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
      }
      .vaporChat__title span{
        font-size:11px;font-weight:600;
        color:rgba(199,210,254,.85);
        line-height:1.2;
        max-width:100%;
        overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
      }
      .vaporChat__main{
        flex:1 1 auto;
        min-height:0;
        display:flex;
        flex-direction:column;
      }
      .vaporChat__body{
        flex:1 1 auto;
        min-height:0;
        overflow-y:auto;
        overflow-x:hidden;
        padding:12px 12px;
        display:flex;
        flex-direction:column;
        gap:12px;
        -webkit-overflow-scrolling:touch;
      }
      .vaporChat__msgWrap{display:flex;align-items:flex-end;gap:8px;max-width:100%}
      .vaporChat__msgWrap--bot{align-self:flex-start;justify-content:flex-start}
      .vaporChat__msgWrap--user{align-self:flex-end;justify-content:flex-end;margin-left:14%}
      .vaporChat__avatar{
        flex:0 0 34px;width:34px;height:34px;border-radius:12px;
        display:grid;place-items:center;
        color:rgba(212,230,255,.95);
        background:linear-gradient(145deg,rgba(155,107,255,.35),rgba(45,212,191,.22));
        border:1px solid rgba(255,255,255,.16);
        box-shadow:0 4px 12px rgba(0,0,0,.2);
      }
      .vaporChat__avatar svg{width:18px;height:18px}
      .vaporChat__msg{
        max-width:min(92%,280px);
        padding:10px 13px 8px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.1);
        line-height:1.45;
        font-size:13px;
        color:rgba(239,246,255,.96);
        background:rgba(255,255,255,.06);
      }
      .vaporChat__msg--bot{
        border-color:rgba(139,92,246,.22);
        background:linear-gradient(165deg,rgba(255,255,255,.08),rgba(155,107,255,.06));
        box-shadow:0 6px 18px rgba(0,0,0,.15);
      }
      .vaporChat__msg--products{
        max-width:min(98%,340px);
        padding:11px 12px 8px;
      }
      .vaporChat__msg--user{
        background:linear-gradient(135deg,rgba(155,107,255,.28),rgba(45,212,191,.2));
        border-color:rgba(45,212,191,.28);
        box-shadow:0 6px 18px rgba(0,0,0,.12);
      }
      .vaporChat__msgText{white-space:pre-wrap;word-break:break-word}
      .vaporChat__msgText--products{
        font-size:12.5px;
        line-height:1.62;
        letter-spacing:0.01em;
        font-variant-numeric:tabular-nums;
      }
      .vaporChat__msgFooter{
        display:flex;align-items:center;gap:6px;
        margin-top:6px;padding-top:4px;
        border-top:1px solid rgba(255,255,255,.08);
      }
      .vaporChat__msgFooter--user{justify-content:space-between}
      .vaporChat__msgFooter--bot{justify-content:space-between;border-top-color:rgba(139,92,246,.15)}
      .vaporChat__botTag{
        font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
        color:rgba(196,181,253,.9);
      }
      .vaporChat__time{font-size:11px;color:rgba(148,163,184,.88);font-variant-numeric:tabular-nums}
      .vaporChat__ticks{
        display:inline-flex;align-items:center;justify-content:center;
        min-width:18px;height:14px;color:rgba(148,163,184,.92);
      }
      .vaporChat__ticks[data-status="sent"]{color:rgba(148,163,184,.75)}
      .vaporChat__ticks[data-status="delivered"]{color:rgba(163,180,200,.95)}
      .vaporChat__ticks[data-status="read"]{color:#5eead4}
      .vaporChat__tickSvg{width:15px;height:12px;display:block}
      .vaporChat__tickSvg--double{width:20px;height:12px}
      .vaporChat__chips{
        flex:0 0 auto;
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        padding:10px 14px 12px;
        border-top:1px solid rgba(148,163,184,.12);
        background:rgba(8,10,18,.55);
      }
      .vaporChat__chip{
        display:inline-flex;align-items:center;gap:6px;
        border-radius:999px;
        padding:8px 12px 8px 10px;
        font-size:12px;font-weight:600;
        color:rgba(239,246,255,.94);
        background:rgba(255,255,255,.07);
        border:1px solid rgba(255,255,255,.12);
        cursor:pointer;
        transition:background .15s ease, border-color .15s ease, transform .1s ease;
      }
      .vaporChat__chipIcon{display:flex;color:rgba(212,196,255,.95)}
      .vaporChat__chipIcon svg{width:14px;height:14px}
      .vaporChat__chip:hover{background:rgba(255,255,255,.11);border-color:rgba(103,232,249,.25);transform:translateY(-1px)}
      .vaporChat__footer{
        flex:0 0 auto;
        padding:12px 14px 14px;
        border-top:1px solid rgba(148,163,184,.18);
        display:flex;
        align-items:center;
        gap:10px;
        background:rgba(7,9,16,.75);
      }
      .vaporChat__input{
        flex:1 1 auto;
        min-width:0;
        border-radius:14px;
        padding:11px 14px;
        outline:none;
        border:1px solid rgba(130,145,180,.35);
        background:rgba(22,28,46,.95) !important;
        color:rgba(239,246,255,.98) !important;
        font-size:14px;
        color-scheme:dark;
        box-shadow:inset 0 1px 2px rgba(0,0,0,.2);
      }
      .vaporChat__input::placeholder{color:rgba(148,163,184,.75)}
      .vaporChat__send{
        flex:0 0 48px;
        width:48px;height:48px;
        border-radius:14px;
        display:grid;place-items:center;
        color:#fff;
        background:linear-gradient(135deg,var(--secondary,#9b6bff),#d4a574);
        border:1px solid rgba(255,255,255,.15);
        cursor:pointer;
        transition:transform .12s ease, filter .12s ease;
      }
      .vaporChat__send:hover{transform:translateY(-1px);filter:brightness(1.05)}
      .vaporChat__send svg{width:18px;height:18px;display:block}
      @media (max-width:480px){
        .vaporChat__panel{right:12px;left:12px;width:auto;bottom:calc(16px + 58px + 10px)}
        .vaporChat__fab{right:12px;bottom:12px}
      }
    `;
    document.head.appendChild(style);
  };

  const NUM_EMOJI = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];

  /** Readable multi-line product list (plain text + emoji, pre-wrap friendly). */
  const formatProductList = (hits, query) => {
    const q = String(query || '').trim();
    const header = q
      ? `🔍 Top matches for “${q}”\n${'─'.repeat(22)}`
      : `🔍 Top matches\n${'─'.repeat(22)}`;
    const blocks = hits.map((p, i) => {
      const badge = NUM_EMOJI[i] || `${i + 1}.`;
      const title = `${badge} ${p.name}`;
      const bits = [`🏷 ${p.brand}`, `💵 ${money(p.price)}`];
      if (p.puffs) bits.push(`✨ ${p.puffs} puffs`);
      if (p.nicotine) bits.push(`🧪 ${p.nicotine}`);
      const detailLine = `    ${bits.join(' · ')}`;
      return `${title}\n${detailLine}`;
    });
    return `${header}\n\n${blocks.join('\n\n')}\n\n📎 Use “Open search” below for the full catalog page.`;
  };

  const reply = (userText) => {
    const t = normalize(userText);

    if (t === '/clear') {
      return {
        text: '🧹 Chat cleared — fresh start!\n\n✨ Ask me anything about products, shipping, or your cart.',
        chips: [{ label: 'Browse Products', href: 'products.html' }],
      };
    }
    if (/^(\/help|\?|help)$/.test(t)) {
      const s = stats();
      return {
        text: `📋 Commands\n   /help  — this list\n   /clear — reset the chat\n\n📦 Catalog — ${s.count} products\n\n🏷 Categories\n   ${s.categories.join(' · ') || '—'}\n\n✨ Brands\n   ${s.brands.join(' · ') || '—'}`,
        chips: [
          { label: 'All Products', href: 'products.html' },
          { label: 'Vozol', href: 'products.html?category=vozol' },
          { label: 'Crown Bar', href: 'products.html?category=crownbar' },
        ],
      };
    }

    if (/\b(shipping|delivery)\b/.test(t)) {
      return {
        text: '🚚 Shipping (same rules as checkout)\n\n   ✓ Free on orders over $50\n   ✓ Otherwise $5.99 flat rate\n\n🧾 Estimated tax — 8%\n\n💡 Add items in the cart to see your live total.',
        chips: [{ label: 'Open Cart', href: 'cart.html' }],
      };
    }

    if (/\b(cart|checkout)\b/.test(t)) {
      const c = getCart();
      const itemCount = c && Array.isArray(c.items) ? c.items.reduce((a, it) => a + (Number(it.quantity) || 0), 0) : 0;
      const subtotal = c ? Number(c.total) || 0 : 0;
      return {
        text: c
          ? `🛒 Your cart\n\n   📌 ${itemCount} item(s)\n   💵 Subtotal ${money(subtotal)}\n\n👉 Open the cart to review or checkout.`
          : '🛒 Your cart is empty.\n\n🛍️ Browse products and tap “Add to cart” on any item.',
        chips: [{ label: 'Open Cart', href: 'cart.html' }],
      };
    }

    if (t.length >= 2 && getCatalog().length) {
      const hits = findProducts(userText, 5);
      if (hits.length) {
        return {
          text: formatProductList(hits, userText),
          variant: 'products',
          chips: [{ label: 'Open search', href: `products.html?q=${encodeURIComponent(userText)}` }],
        };
      }
    }

    return {
      text: '💬 Search by product name or flavor.\n\n📝 Example: “vozol strawberry kiwi”\n\n❓ Type /help for commands.',
      chips: [{ label: 'All Products', href: 'products.html' }],
    };
  };

  const init = () => {
    ensureStyles();
    const ui = safeParse(localStorage.getItem(UI_KEY), { open: false });
    const state = { open: Boolean(ui && ui.open), history: safeParse(localStorage.getItem(STORAGE_KEY), []).slice(-60) };

    const panel = el('div', { class: 'vaporChat__panel', 'data-open': String(state.open) });
    const body = el('div', { class: 'vaporChat__body' });
    const chips = el('div', { class: 'vaporChat__chips' });
    const input = el('input', { class: 'vaporChat__input', type: 'text', placeholder: isTouch ? 'Type here…' : 'Type a message…' });

    const persist = () => {
      localStorage.setItem(UI_KEY, JSON.stringify({ open: state.open }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history.slice(-60)));
    };

    const setOpen = (v) => {
      state.open = Boolean(v);
      panel.setAttribute('data-open', String(state.open));
      fab.setAttribute('data-hidden', state.open ? 'true' : 'false');
      persist();
      if (state.open) setTimeout(() => input.focus(), 40);
    };

    const chipChevron = () => svgIcon(['M9 18l6-6-6-6']);

    const addMsg = (role, text, opts = {}) => {
      const restored = Boolean(opts.restored);
      const ts = typeof opts.ts === 'number' ? opts.ts : Date.now();
      const variant = opts.variant;
      const msg = { role: role === 'user' ? 'user' : 'bot', text: String(text || ''), ts };
      if (msg.role === 'bot' && variant) msg.variant = variant;
      state.history.push(msg);
      state.history = state.history.slice(-80);

      const timeStr = new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (msg.role === 'user') {
        const bubble = el('div', { class: 'vaporChat__msg vaporChat__msg--user' });
        const tickHost = el('span', { class: 'vaporChat__ticks' });
        if (restored) {
          setTickStatus(tickHost, 'read');
        } else {
          setTickStatus(tickHost, 'sent');
          requestAnimationFrame(() => requestAnimationFrame(() => setTickStatus(tickHost, 'delivered')));
        }
        const foot = el('div', { class: 'vaporChat__msgFooter vaporChat__msgFooter--user' });
        foot.append(el('span', { class: 'vaporChat__time', text: timeStr }), tickHost);
        bubble.append(el('div', { class: 'vaporChat__msgText', text: msg.text }), foot);
        const wrap = el('div', { class: 'vaporChat__msgWrap vaporChat__msgWrap--user' }, [bubble]);
        body.append(wrap);
        body.scrollTop = body.scrollHeight;
        persist();
        return {
          setRead: () => {
            if (!restored) setTickStatus(tickHost, 'read');
          },
        };
      }

      const av = el('div', { class: 'vaporChat__avatar' });
      av.appendChild(svgBotAvatar());
      const v = variant || msg.variant;
      const isProducts = v === 'products';
      const bubble = el('div', {
        class: `vaporChat__msg vaporChat__msg--bot${isProducts ? ' vaporChat__msg--products' : ''}`,
      });
      bubble.append(
        el('div', {
          class: `vaporChat__msgText${isProducts ? ' vaporChat__msgText--products' : ''}`,
          text: msg.text,
        }),
        el('div', { class: 'vaporChat__msgFooter vaporChat__msgFooter--bot' }, [
          el('span', { class: 'vaporChat__botTag', text: 'Assistant' }),
          el('span', { class: 'vaporChat__time', text: timeStr }),
        ])
      );
      const wrap = el('div', { class: 'vaporChat__msgWrap vaporChat__msgWrap--bot' }, [av, bubble]);
      body.append(wrap);
      body.scrollTop = body.scrollHeight;
      persist();
      return null;
    };

    const renderChips = (list) => {
      chips.innerHTML = '';
      (list || []).forEach((c) => {
        const btn = el('button', { type: 'button', class: 'vaporChat__chip', onclick: () => c.href && (location.href = c.href) });
        btn.append(el('span', { class: 'vaporChat__chipIcon', 'aria-hidden': 'true' }, [chipChevron()]), el('span', { text: c.label }));
        chips.append(btn);
      });
    };

    const handleUser = (text) => {
      const v = String(text || '').trim();
      if (!v) return;
      input.value = '';
      if (normalize(v) === '/clear') {
        addMsg('user', v);
        state.history = [];
        body.innerHTML = '';
        persist();
        const r = reply(v);
        addMsg('bot', r.text, { variant: r.variant });
        renderChips(r.chips);
        return;
      }
      const receipt = addMsg('user', v);
      const r = reply(v);
      addMsg('bot', r.text, { variant: r.variant });
      if (receipt && typeof receipt.setRead === 'function') receipt.setRead();
      renderChips(r.chips);
    };

    const header = el('div', { class: 'vaporChat__header' }, [
      el(
        'button',
        { type: 'button', class: 'vaporChat__iconBtn', 'aria-label': 'Clear chat', onclick: () => handleUser('/clear') },
        [svgIcon(['M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14M10 11v6M14 11v6'])]
      ),
      el('div', { class: 'vaporChat__title' }, [el('strong', { text: 'VAPOR Assistant' }), el('span', { text: 'FAQ • Product search • Cart' })]),
      el(
        'button',
        { type: 'button', class: 'vaporChat__iconBtn', 'aria-label': 'Close chat', onclick: () => setOpen(false) },
        [svgIcon(['M18 6L6 18M6 6l12 12'])]
      ),
    ]);

    const sendBtn = el(
      'button',
      { type: 'button', class: 'vaporChat__send', 'aria-label': 'Send', onclick: () => handleUser(input.value) },
      [svgIcon(['M5 12h14M12 5l7 7-7 7'])]
    );
    const footer = el('div', { class: 'vaporChat__footer' }, [input, sendBtn]);
    input.addEventListener('keydown', (e) => e.key === 'Enter' && handleUser(input.value));

    const main = el('div', { class: 'vaporChat__main' }, [body, chips]);
    panel.append(header, main, footer);

    const fab = el('button', { type: 'button', class: 'vaporChat__fab', 'aria-label': 'Open chat', onclick: () => setOpen(!state.open) }, [svgMessengerFab()]);
    document.body.append(panel, fab);

    if (state.history.length) {
      const restore = state.history.slice(-40);
      state.history = [];
      restore.forEach((m) =>
        addMsg(m.role, m.text, {
          restored: true,
          ts: typeof m.ts === 'number' ? m.ts : Date.now(),
          variant: m.variant,
        })
      );
    } else {
      const s = stats();
      addMsg(
        'bot',
        `👋 Hi! I’m your shop assistant.\n\n📦 Catalog ready — ${s.count} products\n\n💡 Try a product name or type /help for commands.`
      );
      renderChips([{ label: 'All Products', href: 'products.html' }, { label: 'Vozol', href: 'products.html?category=vozol' }, { label: 'Crown Bar', href: 'products.html?category=crownbar' }, { label: 'Shipping', href: 'cart.html' }]);
    }

    setOpen(state.open);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

