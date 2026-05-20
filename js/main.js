'use strict';

const CART_KEY        = 'baf_cart';
const CART_BRANCH_KEY = 'baf_cart_branch';
const BRANCH_KEY      = 'baf_selected_branch';
const FREE_DELIVERY_THRESHOLD = 100;
const WHATSAPP_NUMBER = '966530463965';
const WORKER_URL      = 'https://baitalfahsah-orders.sharif-alsahbool.workers.dev';

const BRANCHES = {
  nasim: {
    name:      'بيت الفحسة — النسيم',
    nameEn:    'Bayt Al-Fahsah — Al Nasim',
    area:      'حي النسيم الغربي · الرياض',
    areaEn:    'Al Nasim Al Gharbi · Riyadh',
    phone:     '+966 53 046 3965',
    address:   'شارع سعد بن أبي وقاص، حي النسيم الغربي، الرياض 14231',
    addressEn: 'Saad Ibn Abi Waqqas St, Al Nasim Al Gharbi, Riyadh 14231',
    mapUrl:    'https://maps.app.goo.gl/jj8QfuRpyf8awKri7',
    hours:     '12:00 م – 2:00 ص',
    hoursEn:   '12:00 PM – 2:00 AM',
    hasPrices: true,
  }
};

const DISHES_DATA = [
  // الفحسة
  { id: 'fahsah-lahm',   ar: 'فحسة لحم',        en: 'Lamb Fahsah',       price: 30,  cat: 'fahsah',    badge: 'popular' },
  { id: 'fahsah-kabab',  ar: 'فحسة كباب بلدي',  en: 'Kebab Fahsah',      price: 30,  cat: 'fahsah' },
  { id: 'brama-lahm',    ar: 'برمة لحم بلدي',   en: 'Local Lamb Pot',    price: 65,  cat: 'fahsah' },
  { id: 'haneed',        ar: 'حنيد',             en: 'Haneed',            price: 85,  cat: 'fahsah',    badge: 'new' },
  { id: 'bram-haneed',   ar: 'برم حنيد',         en: 'Double Haneed Pot', price: 170, cat: 'fahsah' },
  { id: 'maqsout',       ar: 'مكسوت لحم',        en: 'Maqsouh Lamb',      price: 68,  cat: 'fahsah' },
  // السلتة
  { id: 'saltah-sanani', ar: 'سلتة صنعاني',     en: "Sana'a Saltah",     price: 15,  cat: 'saltah',    badge: 'popular' },
  { id: 'saltah-fahsah', ar: 'سلتة وفحسة',      en: 'Saltah & Fahsah',   price: 15,  cat: 'saltah' },
  { id: 'saltah-daily',  ar: 'سلتة يومية',      en: 'Daily Saltah',      price: 15,  cat: 'saltah' },
  // المضغوط والرز
  { id: 'maghout-lahm',  ar: 'مضغوط لحم',       en: 'Lamb Maqhouh',      price: 40,  cat: 'maqhouh',   badge: 'popular' },
  { id: 'maghout-hashi', ar: 'مضغوط حاشي',      en: 'Stuffed Maqhouh',   price: 65,  cat: 'maqhouh' },
  { id: 'djaj-ruz',      ar: 'دجاج مع الرز',    en: 'Chicken with Rice', price: 40,  cat: 'maqhouh' },
  { id: 'djaj-zarbyan',  ar: 'دجاج زربيان',     en: 'Chicken Zarbyan',   price: 44,  cat: 'maqhouh' },
  { id: 'ruz-sanani',    ar: 'رز صنعاني',        en: "Sana'a Rice",       price: 10,  cat: 'maqhouh' },
  // الكباب
  { id: 'kabab-baladi',  ar: 'كباب بلدي',        en: 'Local Kebab',       price: 22,  cat: 'kabab',     badge: 'popular' },
  { id: 'kabab-khas',    ar: 'كباب بلدي خاص',   en: 'Special Kebab',     price: 25,  cat: 'kabab' },
  // المشروبات
  { id: 'shai',          ar: 'شاي',              en: 'Tea',               price: 5,   cat: 'beverages' },
  { id: 'shai-nanaa',    ar: 'شاي بالنعناع',    en: 'Mint Tea',          price: 7,   cat: 'beverages' },
  { id: 'limoon-nanaa',  ar: 'ليمون بالنعناع',  en: 'Lemon Mint',        price: 8,   cat: 'beverages' },
  { id: 'aseer',         ar: 'عصير طازج',        en: 'Fresh Juice',       price: 10,  cat: 'beverages' },
];

const DISH_PHOTOS = {
  'fahsah-lahm':   'photos/%D9%81%D8%AD%D8%B3%D8%A9.jpg',
  'fahsah-kabab':  'photos/%D9%81%D8%AD%D8%B3%D8%A9.jpg',
  'brama-lahm':    'photos/%D9%81%D8%AD%D8%B3%D8%A9.jpg',
  'haneed':        'photos/ttt.jpg',
  'bram-haneed':   'photos/ttt.jpg',
  'maqsout':       'photos/t.jpg',
  'saltah-sanani': 'photos/ttt.jpg',
  'saltah-fahsah': 'photos/ttt.jpg',
  'saltah-daily':  'photos/ttt.jpg',
  'maghout-lahm':  'photos/t.jpg',
  'maghout-hashi': 'photos/t.jpg',
  'djaj-ruz':      'photos/t.jpg',
  'djaj-zarbyan':  'photos/ttt.jpg',
  'ruz-sanani':    'photos/t.jpg',
  'kabab-baladi':  'photos/t.jpg',
  'kabab-khas':    'photos/t.jpg',
  'shai':          'photos/ttt.jpg',
  'shai-nanaa':    'photos/ttt.jpg',
  'limoon-nanaa':  'photos/ttt.jpg',
  'aseer':         'photos/ttt.jpg',
};

// ── State ──────────────────────────────────────────────────────────
let cart           = JSON.parse(sessionStorage.getItem(CART_KEY) || '[]');
let cartBranch     = sessionStorage.getItem(CART_BRANCH_KEY) || null;
let selectedBranch = sessionStorage.getItem(BRANCH_KEY) || 'nasim';

function saveCart() {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  if (cartBranch) sessionStorage.setItem(CART_BRANCH_KEY, cartBranch);
  else sessionStorage.removeItem(CART_BRANCH_KEY);
}

// ── Cart Count Badge ───────────────────────────────────────────────
function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.classList.toggle('visible', total > 0);
  });
  renderCartItems();
}

// ── Add to Cart ────────────────────────────────────────────────────
window.addToCart = function(btn) {
  const card   = btn.closest('.dish-card');
  if (!card) return;
  const id     = card.dataset.id;
  const name   = card.dataset.name;
  const price  = parseFloat(card.dataset.price);
  const branch = card.dataset.branch || selectedBranch;

  if (cart.length > 0 && cartBranch && cartBranch !== branch) {
    showBranchConflict(branch, () => {
      cart = []; cartBranch = null; saveCart();
      doAdd(id, name, price, branch, btn);
    });
    return;
  }
  doAdd(id, name, price, branch, btn);
};

function doAdd(id, name, price, branch, btn) {
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, name, price, qty: 1 });
  if (!cartBranch) cartBranch = branch;
  saveCart();
  updateCartUI();

  // Flash button
  btn.textContent = '✓';
  btn.classList.add('success');
  setTimeout(() => { btn.textContent = '+'; btn.classList.remove('success'); }, 900);

  // Wiggle cart icons
  document.querySelectorAll('.cart-btn').forEach(c => {
    c.classList.remove('bump');
    void c.offsetWidth;
    c.classList.add('bump');
    c.addEventListener('animationend', () => c.classList.remove('bump'), { once: true });
  });

  showAddToast();
}

function showAddToast() {
  let toast = document.getElementById('addToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'addToast';
    toast.className = 'add-toast';
    document.body.appendChild(toast);
  }
  const lang = document.documentElement.lang || 'ar';
  toast.textContent = lang === 'en' ? '✓ Added to cart' : '✓ أُضيف إلى السلة';
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 1800);
}

// ── Cart Drawer ────────────────────────────────────────────────────
window.openCart = function() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
};

window.closeCart = function() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
};

function renderCartItems() {
  const body = document.getElementById('cartBody');
  if (!body) return;
  const lang    = document.documentElement.lang || 'ar';
  const sar     = lang === 'en' ? 'SAR' : 'ر.س';
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;opacity:0.4;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
        </div>
        <p>${lang === 'en' ? 'Your cart is empty' : 'سلتك فارغة'}</p>
        <span>${lang === 'en' ? 'Add some delicious dishes!' : 'أضف بعض الأطباق اللذيذة!'}</span>
      </div>`;
  } else {
    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-name">${item.name}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty('${item.id}',-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}',1)">+</button>
        </div>
        <div class="cart-item-price">${(item.price * item.qty).toFixed(0)} ${sar}</div>
        <button class="remove-item-btn" onclick="removeItem('${item.id}')">✕</button>
      </div>`).join('');
  }

  const cartTotal = document.getElementById('cartTotal');
  if (cartTotal) cartTotal.textContent = `${subtotal.toFixed(0)} ${sar}`;

  const deliveryNote = document.getElementById('deliveryNote');
  if (deliveryNote) {
    deliveryNote.className = 'delivery-note';
    deliveryNote.textContent = lang === 'en'
      ? 'Delivery fee determined upon contact'
      : 'رسوم التوصيل تُحدد عند التواصل';
  }

  const proceedBtn = document.getElementById('proceedBtn');
  if (proceedBtn) proceedBtn.disabled = cart.length === 0;
}

window.changeQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
    if (cart.length === 0) cartBranch = null;
  }
  saveCart();
  updateCartUI();
};

window.removeItem = function(id) {
  cart = cart.filter(i => i.id !== id);
  if (cart.length === 0) cartBranch = null;
  saveCart();
  updateCartUI();
};

// ── Checkout ───────────────────────────────────────────────────────
window.openCheckout = function() {
  document.getElementById('checkoutModal').classList.add('open');
  renderOrderSummary();
};

window.closeCheckout = function() {
  document.getElementById('checkoutModal').classList.remove('open');
};

function renderOrderSummary() {
  const container = document.getElementById('coSummary');
  if (!container) return;
  const lang    = document.documentElement.lang || 'ar';
  const sar     = lang === 'en' ? 'SAR' : 'ر.س';
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  container.innerHTML = cart.map(item => `
    <div class="co-item-row">
      <span class="co-item-name">${item.name} × ${item.qty}</span>
      <span class="co-item-price">${(item.price * item.qty).toFixed(0)} ${sar}</span>
    </div>`).join('');

  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const delivRow = document.getElementById('coDeliveryRow');
  if (delivRow) delivRow.innerHTML = `
    <span>${lang === 'en' ? 'Delivery' : 'التوصيل'}</span>
    <span>${lang === 'en' ? 'TBD' : 'يُحدد لاحقاً'}</span>`;

  const grandRow = document.getElementById('coGrandTotal');
  if (grandRow) grandRow.innerHTML = `
    <span>${lang === 'en' ? 'Total' : 'الإجمالي'}</span>
    <span>${subtotal.toFixed(0)} ${sar}</span>`;
}

window.submitOrder = async function() {
  const lang    = document.documentElement.lang || 'ar';
  const name    = (document.getElementById('coName')?.value    || '').trim();
  const phone   = (document.getElementById('coPhone')?.value   || '').trim();
  const address = (document.getElementById('coAddress')?.value || '').trim();
  const notes   = (document.getElementById('coNotes')?.value   || '').trim();

  let valid = true;
  [['coName', name], ['coPhone', phone], ['coAddress', address]].forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!val) {
      el.classList.add('field-error');
      el.addEventListener('input', () => el.classList.remove('field-error'), { once: true });
      valid = false;
    } else {
      el.classList.remove('field-error');
    }
  });
  if (!valid) return;

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = lang === 'en' ? 'Sending…' : 'جاري الإرسال…';

  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const freeDeliv = subtotal >= FREE_DELIVERY_THRESHOLD;

  const payload = {
    name, phone, address, notes, lang,
    subtotal,
    freeDelivery: freeDeliv,
    items: cart.map(i => ({
      id:     i.id,
      name:   i.name,
      nameEn: DISH_EN[i.id] || '',
      qty:    i.qty,
      price:  i.price,
    })),
  };

  try {
    const res  = await fetch(WORKER_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Worker error');

    btn.textContent = lang === 'en' ? '✓ Order Sent!' : '✓ تم إرسال الطلب!';
    btn.style.background = '#4caf50';
    setTimeout(() => {
      cart = []; cartBranch = null; saveCart(); updateCartUI(); closeCart();
      btn.disabled = false;
      btn.textContent = lang === 'en' ? 'Place Order' : 'تأكيد الطلب';
      btn.style.background = '';
      ['coName','coPhone','coAddress','coNotes'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
      });
    }, 2200);
  } catch (_) {
    // Worker failed — fall back to WhatsApp
    const lines = cart.map(i => `• ${i.name} × ${i.qty} — ${(i.price * i.qty).toFixed(0)} ر.س`).join('\n');
    const waText = `بيت الفحسة — طلب جديد\n${name}\n${phone}\n${address}${notes ? '\n' + notes : ''}\n\n${lines}\n\nالمجموع: ${subtotal.toFixed(0)} ر.س`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener');
    btn.disabled = false;
    btn.textContent = lang === 'en' ? 'Place Order' : 'تأكيد الطلب';
  }
};

// ── Branch Conflict Modal ──────────────────────────────────────────
function showBranchConflict(newBranch, onConfirm) {
  const lang   = document.documentElement.lang || 'ar';
  const oldName = BRANCHES[cartBranch]?.[lang === 'en' ? 'nameEn' : 'name'] || cartBranch;
  const newName = BRANCHES[newBranch]?.[lang === 'en' ? 'nameEn' : 'name'] || newBranch;

  const overlay = document.createElement('div');
  overlay.className = 'conflict-overlay';
  overlay.innerHTML = `
    <div class="conflict-modal">
      <div class="conflict-icon">⚠️</div>
      <div class="conflict-title">${lang === 'en' ? 'Change Branch?' : 'تغيير الفرع؟'}</div>
      <div class="conflict-msg">
        ${lang === 'en'
          ? `Your cart has items from <strong>${oldName}</strong>.<br>Switching to <strong>${newName}</strong> will clear your cart.`
          : `سلتك تحتوي أصنافاً من <strong>${oldName}</strong>.<br>التبديل إلى <strong>${newName}</strong> سيُفرّغ السلة.`}
      </div>
      <div class="conflict-btns">
        <button class="btn btn-outline" id="cxCancel">${lang === 'en' ? 'Cancel' : 'إلغاء'}</button>
        <button class="btn btn-primary" id="cxConfirm">${lang === 'en' ? 'Clear & Switch' : 'تفريغ والتبديل'}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#cxCancel').onclick  = () => overlay.remove();
  overlay.querySelector('#cxConfirm').onclick = () => { overlay.remove(); onConfirm(); };
  overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
}

// ── Branch Selection (menu page) ───────────────────────────────────
window.selectBranch = function(branchId) {
  selectedBranch = branchId;
  sessionStorage.setItem(BRANCH_KEY, branchId);
  document.querySelectorAll('.branch-pill').forEach(p =>
    p.classList.toggle('active', p.dataset.branch === branchId));
  document.querySelectorAll('.dish-card').forEach(c => c.dataset.branch = branchId);
};

// ── Header Scroll ──────────────────────────────────────────────────
function initHeader() {
  const h = document.querySelector('.site-header');
  if (!h) return;
  const tick = () => h.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

// ── Mobile Nav ─────────────────────────────────────────────────────
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
  });
  mobileNav.querySelectorAll('.mobile-nav-link').forEach(l =>
    l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    }));
}

// ── Scroll Reveal ──────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries =>
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── Branch Photo Slideshows ────────────────────────────────────────
function initSlideshows() {
  document.querySelectorAll('.branch-slideshow').forEach((ss, idx) => {
    const slides = ss.querySelectorAll('.slide');
    if (slides.length < 2) return;
    let cur = 0;
    setInterval(() => {
      slides[cur].classList.remove('active');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('active');
    }, 3500 + idx * 800);
  });
}

// ── Category Tabs ──────────────────────────────────────────────────
function initCatTabs() {
  const tabs = document.querySelectorAll('.cat-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    let firstVisible = null;
    document.querySelectorAll('.menu-section').forEach(s => {
      const show = cat === 'all' || s.dataset.cat === cat;
      s.style.display = show ? '' : 'none';
      if (show && !firstVisible) firstVisible = s;
    });
    if (firstVisible && cat !== 'all') {
      setTimeout(() => firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
    }
  }));
}

// ── URL Params ────────────────────────────────────────────────────
function getParam(k) { return new URLSearchParams(window.location.search).get(k); }

// ── Init ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initReveal();
  initSlideshows();
  initCatTabs();
  updateCartUI();

  document.querySelectorAll('.cart-btn').forEach(btn => btn.addEventListener('click', window.openCart));
  document.getElementById('cartOverlay')?.addEventListener('click', window.closeCart);

  // Scroll to dish from URL
  const dishParam = getParam('dish');
  if (dishParam) {
    setTimeout(() => {
      document.querySelector(`.dish-card[data-id="${dishParam}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
  }

  // Set branch from URL or session
  const branchParam = getParam('branch');
  const saved = sessionStorage.getItem(BRANCH_KEY);
  const initial = (branchParam && BRANCHES[branchParam]) ? branchParam
                : (saved && BRANCHES[saved]) ? saved : 'nasim';
  window.selectBranch(initial);
});
