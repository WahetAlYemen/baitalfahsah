'use strict';

const LANG_KEY = 'baf_lang';

const T = {
  'nav.home':     { ar: 'الرئيسية',      en: 'Home' },
  'nav.menu':     { ar: 'قائمة الطعام',  en: 'Menu' },
  'nav.branches': { ar: 'الفروع',        en: 'Branches' },
  'nav.about':    { ar: 'من نحن',        en: 'About Us' },
  'nav.contact':  { ar: 'تواصل معنا',    en: 'Contact' },

  'hero.title1':   { ar: 'بيت الفحسة',                    en: 'Bayt Al-Fahsah' },
  'hero.title2':   { ar: 'عبق النكهة من قلب صنعاء',        en: "The Essence of Flavor from Sana'a" },
  'hero.subtitle': { ar: 'فحسة، سلتة، مضغوط — أصيل المطبخ اليمني في الرياض',
                     en: 'Fahsah, Saltah, Maqhouh — Authentic Yemeni cuisine in Riyadh' },
  'hero.cta1':     { ar: 'اطلب الآن',    en: 'Order Now' },
  'hero.cta2':     { ar: 'شاهد القائمة', en: 'View Menu' },

  'stat.branch':  { ar: 'فرع',         en: 'Branch' },
  'stat.years':   { ar: 'سنوات خبرة',  en: "Years' Experience" },
  'stat.orders':  { ar: 'طبق يومياً',  en: 'Daily Dishes' },
  'stat.flavor':  { ar: 'نكهة أصيلة',  en: 'Authentic Flavor' },

  'feat.badge': { ar: 'أبرز أطباقنا',         en: 'Featured Dishes' },
  'feat.title': { ar: 'تجربة النكهات الأصيلة', en: 'Experience Authentic Flavors' },
  'feat.desc':  { ar: 'اختر من أشهر أطباقنا اليمنية المحضّرة بوصفات تقليدية توارثناها جيلاً بعد جيل',
                  en: 'Choose from our most popular Yemeni dishes prepared with traditional recipes passed down through generations' },
  'feat.popular': { ar: 'الأكثر طلباً', en: 'Most Popular' },
  'feat.order':   { ar: 'اطلب الآن ←',  en: 'Order Now →' },

  'branch.badge':    { ar: 'فروعنا',             en: 'Our Branches' },
  'branch.title':    { ar: 'زُر أقرب فرع',       en: 'Visit the Nearest Branch' },
  'branch.map':      { ar: 'الموقع على الخريطة', en: 'View on Map' },
  'branch.order':    { ar: 'اطلب من هنا',        en: 'Order from Here' },
  'branch.hours':    { ar: 'ساعات العمل: ',      en: 'Hours: ' },
  'branch.delivery': { ar: 'توصيل متاح',         en: 'Delivery Available' },

  'vibe.badge':     { ar: 'أجواء المطعم',          en: 'Our Atmosphere' },
  'vibe.title':     { ar: 'استمتع بتجربة مميزة',  en: 'A Unique Experience Awaits' },
  'vibe.desc':      { ar: 'جلسات أنيقة وأجواء يمنية أصيلة تأخذك إلى قلب صنعاء', en: 'Elegant seating and authentic Yemeni atmosphere that takes you to the heart of Sanaa' },

  'social.badge':   { ar: 'تابعنا',              en: 'Follow Us' },
  'social.title':   { ar: 'كن جزءاً من عائلتنا', en: 'Be Part of Our Family' },
  'social.fb.cta':  { ar: 'تابعنا على فيسبوك',   en: 'Follow on Facebook' },
  'social.tik.cta': { ar: 'شاهد مقاطعنا',         en: 'Watch Our Videos' },
  'social.ig.cta':  { ar: 'تابعنا على انستقرام',  en: 'Follow on Instagram' },
  'social.wa.cta':  { ar: 'تواصل عبر واتساب',     en: 'Chat on WhatsApp' },

  'cta.title': { ar: 'جاهز لتجربة طعم صنعاء؟',  en: "Ready to Taste Sana'a?" },
  'cta.desc':  { ar: 'اطلب الآن واستمتع بأصيل المطبخ اليمني يصلك أينما كنت',
                  en: 'Order now and enjoy authentic Yemeni cuisine delivered right to you' },
  'cta.btn1':  { ar: 'اطلب الآن',    en: 'Order Now' },
  'cta.btn2':  { ar: 'شاهد القائمة', en: 'View Menu' },

  'footer.links':    { ar: 'روابط سريعة', en: 'Quick Links' },
  'footer.branches': { ar: 'فروعنا',      en: 'Our Branches' },
  'footer.contact':  { ar: 'تواصل معنا',  en: 'Contact Us' },
  'footer.copy':     { ar: '© 2025 بيت الفحسة. جميع الحقوق محفوظة.',
                       en: '© 2025 Bayt Al-Fahsah. All rights reserved.' },

  'cart.title':    { ar: 'سلة الطلبات',              en: 'Your Cart' },
  'cart.total':    { ar: 'المجموع',                   en: 'Total' },
  'cart.proceed':  { ar: 'تأكيد الطلب',              en: 'Proceed to Order' },
  'cart.cod':      { ar: 'الدفع عند الاستلام',     en: 'Cash on Delivery' },

  'co.title':    { ar: 'إتمام الطلب',        en: 'Complete Order' },
  'co.info':     { ar: 'بيانات التوصيل',     en: 'Delivery Details' },
  'co.name.lbl': { ar: 'الاسم الكامل',       en: 'Full Name' },
  'co.ph.lbl':   { ar: 'رقم الهاتف',         en: 'Phone Number' },
  'co.addr.lbl': { ar: 'عنوان التوصيل',      en: 'Delivery Address' },
  'co.note.lbl': { ar: 'ملاحظات (اختياري)',  en: 'Notes (optional)' },
  'co.name.ph':  { ar: 'أدخل اسمك الكامل',   en: 'Enter your full name' },
  'co.ph.ph':    { ar: '05xxxxxxxx',          en: '05xxxxxxxx' },
  'co.addr.ph':  { ar: 'حي، شارع، رقم المبنى…', en: 'Neighbourhood, street, building…' },
  'co.note.ph':  { ar: 'أي تعليمات إضافية…', en: 'Any additional instructions…' },
  'co.summary':  { ar: 'ملخص الطلب',         en: 'Order Summary' },
  'co.submit':   { ar: 'تأكيد الطلب',        en: 'Place Order' },
  'co.cod':      { ar: 'الدفع عند الاستلام', en: 'Cash on Delivery' },

  'menu.cat.all':       { ar: 'الكل',            en: 'All' },
  'menu.cat.fahsah':    { ar: 'الفحسة',           en: 'Fahsah' },
  'menu.cat.saltah':    { ar: 'السلتة',           en: 'Saltah' },
  'menu.cat.maqhouh':   { ar: 'المضغوط والرز',    en: 'Maqhouh & Rice' },
  'menu.cat.kabab':     { ar: 'الكباب',            en: 'Kebab' },
  'menu.cat.beverages': { ar: 'المشروبات',         en: 'Beverages' },
  'menu.sar':           { ar: 'ر.س',              en: 'SAR' },
  'menu.popular':       { ar: 'الأكثر طلباً',     en: 'Popular' },
  'menu.special':       { ar: 'مميز',              en: 'Special' },

  'about.title':      { ar: 'قصتنا',                        en: 'Our Story' },
  'about.sub':        { ar: 'النكهة الأصيلة من قلب صنعاء',  en: "Authentic Flavor from the Heart of Sana'a" },
  'about.story1':     { ar: 'بيت الفحسة وجهة يمنية أصيلة في قلب الرياض، نقدم أشهى الأطباق اليمنية التقليدية بوصفات توارثناها عبر الأجيال.',
                        en: 'Bayt Al-Fahsah is an authentic Yemeni destination in the heart of Riyadh, offering the finest traditional Yemeni dishes with recipes passed down through generations.' },
  'about.story2':     { ar: 'نؤمن أن الطعام الجيد يجمع الناس ويروي الحكايات. كل طبق يحمل لمسة من دفء صنعاء وأصالة مطبخها العريق.',
                        en: "We believe good food brings people together and tells stories. Every dish carries a touch of the warmth of Sana'a and the authenticity of its ancient cuisine." },
  'about.val.title':  { ar: 'قيمنا',       en: 'Our Values' },
  'about.v1.title':   { ar: 'الأصالة',     en: 'Authenticity' },
  'about.v1.desc':    { ar: 'وصفات تقليدية يمنية أصيلة لم تتغير عبر الزمن',
                        en: 'Traditional Yemeni recipes unchanged through time' },
  'about.v2.title':   { ar: 'الجودة',      en: 'Quality' },
  'about.v2.desc':    { ar: 'مكونات طازجة مختارة بعناية لضمان أفضل تجربة',
                        en: 'Carefully selected fresh ingredients for the best experience' },
  'about.v3.title':   { ar: 'الضيافة',     en: 'Hospitality' },
  'about.v3.desc':    { ar: 'خدمة متميزة بروح الضيافة اليمنية الأصيلة',
                        en: 'Distinguished service with the spirit of authentic Yemeni hospitality' },

  'branches.title': { ar: 'فروعنا',      en: 'Our Branches' },
  'branches.sub':   { ar: 'جد أقرب فرع إليك واطلب منه مباشرة',
                      en: 'Find your nearest branch and order directly' },
};

function t(key, lang) {
  const e = T[key];
  if (!e) return key;
  return e[lang] || e.ar || key;
}

function qs(s)  { return document.querySelector(s); }
function qsa(s) { return document.querySelectorAll(s); }

function setText(sel, val) {
  const el = qs(sel);
  if (el) el.textContent = val;
}

window.applyLang = function(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir  = lang === 'en' ? 'ltr' : 'rtl';

  qsa('.lang-toggle, #langToggle').forEach(b => b.textContent = lang === 'en' ? 'عر' : 'EN');

  applyCommon(lang);

  if (qs('#heroSection'))    applyHome(lang);
  if (qs('#menuSections'))   applyMenu(lang);
  if (qs('#branchesFull'))   applyBranches(lang);
  if (qs('#aboutSection'))   applyAbout(lang);

  if (typeof renderCartItems === 'function') renderCartItems();
};

function applyCommon(lang) {
  setText('#navHome',     t('nav.home', lang));
  setText('#navMenu',     t('nav.menu', lang));
  setText('#navBranches', t('nav.branches', lang));
  setText('#navAbout',    t('nav.about', lang));
  setText('#navContact',  t('nav.contact', lang));
  setText('#mnavHome',     t('nav.home', lang));
  setText('#mnavMenu',     t('nav.menu', lang));
  setText('#mnavBranches', t('nav.branches', lang));
  setText('#mnavAbout',    t('nav.about', lang));
  setText('#mnavContact',  t('nav.contact', lang));
  setText('#headerOrderBtn', t('hero.cta1', lang));

  setText('#footerLinksTitle',    t('footer.links', lang));
  setText('#footerBranchesTitle', t('footer.branches', lang));
  setText('#footerContactTitle',  t('footer.contact', lang));
  setText('#footerCopy',          t('footer.copy', lang));
  setText('#fNavHome',     t('nav.home', lang));
  setText('#fNavMenu',     t('nav.menu', lang));
  setText('#fNavBranches', t('nav.branches', lang));
  setText('#fNavAbout',    t('nav.about', lang));

  setText('#cartTitle',      t('cart.title', lang));
  setText('#cartTotalLabel', t('cart.total', lang));
  setText('#proceedBtn',     t('cart.proceed', lang));
  setText('#cartCodBadge',   t('cart.cod', lang));
  setText('#checkoutTitle',  t('co.title', lang));
  setText('#coInfoTitle',    t('co.info', lang));
  setText('#coSummaryTitle', t('co.summary', lang));
  setText('#submitBtn',      t('co.submit', lang));
  setText('#coCodBadge',     t('co.cod', lang));

  // Labels & placeholders
  qsa('[data-i18n-label]').forEach(el => el.textContent = t(el.dataset.i18nLabel, lang));
  qsa('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh, lang));
}

function applyHome(lang) {
  setText('#heroTitle1',  t('hero.title1', lang));
  setText('#heroTitle2',  t('hero.title2', lang));
  setText('#heroSubtitle', t('hero.subtitle', lang));
  setText('#heroCta1',    t('hero.cta1', lang));
  setText('#heroCta2',    t('hero.cta2', lang));

  setText('#statBranchLabel', t('stat.branch', lang));
  setText('#statYearsLabel',  t('stat.years', lang));
  setText('#statOrdersLabel', t('stat.orders', lang));
  setText('#statFlavorLabel', t('stat.flavor', lang));

  setText('#featBadge', t('feat.badge', lang));
  setText('#featTitle', t('feat.title', lang));
  setText('#featDesc',  t('feat.desc', lang));
  qsa('.feat-badge-text').forEach(el => el.textContent = t('feat.popular', lang));
  qsa('.feat-cta-text').forEach(el => el.textContent   = t('feat.order', lang));

  setText('#vibeBadge', t('vibe.badge', lang));
  setText('#vibeTitle', t('vibe.title', lang));
  setText('#vibeDesc',  t('vibe.desc',  lang));

  setText('#branchBadge', t('branch.badge', lang));
  setText('#branchTitle', t('branch.title', lang));
  qsa('.btn-map').forEach(b   => b.textContent = t('branch.map', lang));
  qsa('.btn-order-branch').forEach(b => b.textContent = t('branch.order', lang));

  setText('#socialBadge', t('social.badge', lang));
  setText('#socialTitle', t('social.title', lang));
  setText('#socialFbCta',  t('social.fb.cta', lang));
  setText('#socialTikCta', t('social.tik.cta', lang));
  setText('#socialIgCta',  t('social.ig.cta', lang));
  setText('#socialWaCta',  t('social.wa.cta', lang));

  setText('#ctaTitle', t('cta.title', lang));
  setText('#ctaDesc',  t('cta.desc', lang));
  setText('#ctaBtn1',  t('cta.btn1', lang));
  setText('#ctaBtn2',  t('cta.btn2', lang));
}

function applyMenu(lang) {
  setText('#catAll',       t('menu.cat.all', lang));
  setText('#catFahsah',    t('menu.cat.fahsah', lang));
  setText('#catSaltah',    t('menu.cat.saltah', lang));
  setText('#catMaqhouh',   t('menu.cat.maqhouh', lang));
  setText('#catKabab',     t('menu.cat.kabab', lang));
  setText('#catBeverages', t('menu.cat.beverages', lang));

  setText('#secFahsahTitle',    t('menu.cat.fahsah', lang));
  setText('#secSaltahTitle',    t('menu.cat.saltah', lang));
  setText('#secMaqhouhTitle',   t('menu.cat.maqhouh', lang));
  setText('#secKababTitle',     t('menu.cat.kabab', lang));
  setText('#secBeveragesTitle', t('menu.cat.beverages', lang));

  qsa('.badge-popular').forEach(b => b.textContent = t('menu.popular', lang));
  qsa('.badge-new').forEach(b     => b.textContent = t('menu.special', lang));
  qsa('.dish-price small').forEach(el => el.textContent = t('menu.sar', lang));
  applyDishNames(lang);
}

// Build DISH_EN map from DISHES_DATA defined in main.js
const DISH_EN = {};
if (typeof DISHES_DATA !== 'undefined') {
  DISHES_DATA.forEach(d => { DISH_EN[d.id] = d.en; });
}

function applyDishNames(lang) {
  document.querySelectorAll('.dish-card[data-id]').forEach(card => {
    const nameEl = card.querySelector('.dish-name');
    if (!nameEl) return;
    nameEl.textContent = (lang === 'en' && DISH_EN[card.dataset.id])
      ? DISH_EN[card.dataset.id]
      : card.dataset.name;
  });
}

function applyBranches(lang) {
  qsa('.branch-name-text').forEach(el =>
    el.textContent = lang === 'en' ? 'Bayt Al-Fahsah — Al Nasim' : 'بيت الفحسة — النسيم');
  qsa('.branch-area-text').forEach(el =>
    el.textContent = lang === 'en' ? 'Al Nasim Al Gharbi · Riyadh' : 'حي النسيم الغربي · الرياض');
  qsa('.branch-addr-text').forEach(el =>
    el.textContent = lang === 'en'
      ? 'Saad Ibn Abi Waqqas St, Al Nasim Al Gharbi, Riyadh 14231'
      : 'شارع سعد بن أبي وقاص، حي النسيم الغربي، الرياض 14231');
  qsa('.branch-hours-text').forEach(el =>
    el.textContent = lang === 'en' ? '12:00 PM – 2:00 AM' : '12:00 م – 2:00 ص');
  qsa('.branch-title-h').forEach(el =>
    el.textContent = lang === 'en' ? 'Our Branches' : 'فروعنا');
  qsa('.branch-sub-p').forEach(el =>
    el.textContent = lang === 'en'
      ? 'Find your nearest branch and order directly'
      : 'جد أقرب فرع إليك واطلب منه مباشرة');
  qsa('.btn-map').forEach(b   => b.textContent = t('branch.map', lang));
  qsa('.btn-order-branch').forEach(b => b.textContent = t('branch.order', lang));
}

function applyAbout(lang) {
  setText('#aboutTitle',  t('about.title', lang));
  setText('#aboutSub',    t('about.sub', lang));
  setText('#aboutStory1', t('about.story1', lang));
  setText('#aboutStory2', t('about.story2', lang));
  setText('#valuesTitle', t('about.val.title', lang));
  setText('#val1Title',   t('about.v1.title', lang));
  setText('#val1Desc',    t('about.v1.desc', lang));
  setText('#val2Title',   t('about.v2.title', lang));
  setText('#val2Desc',    t('about.v2.desc', lang));
  setText('#val3Title',   t('about.v3.title', lang));
  setText('#val3Desc',    t('about.v3.desc', lang));
}

window.toggleLang = function() {
  const next = (document.documentElement.lang || 'ar') === 'ar' ? 'en' : 'ar';
  localStorage.setItem(LANG_KEY, next);
  window.applyLang(next);
};

document.addEventListener('DOMContentLoaded', () => {
  window.applyLang(localStorage.getItem(LANG_KEY) || 'ar');
});
