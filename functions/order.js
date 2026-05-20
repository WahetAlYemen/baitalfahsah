const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const { name, phone, address, notes, lang, items, subtotal, freeDelivery } = body;

  if (!name || !phone || !address) {
    return json({ ok: false, error: 'الاسم والهاتف والعنوان مطلوبة' }, 400);
  }
  if (!Array.isArray(items) || items.length === 0) {
    return json({ ok: false, error: 'السلة فارغة' }, 400);
  }

  const isEn  = lang === 'en';
  const lines = items.map(i => {
    const label = (isEn && i.nameEn) ? `${i.name} (${i.nameEn})` : i.name;
    return `  • ${label} × ${i.qty}  —  ${(i.price * i.qty).toFixed(0)} ر.س`;
  }).join('\n');

  const parts = [
    `🏠 <b>بيت الفحسة — طلب جديد</b>${isEn ? ' 🌐' : ''}`,
    '━━━━━━━━━━━━━━',
    `👤 <b>الاسم:</b> ${name}`,
    `📱 <b>الهاتف:</b> ${phone}`,
    `📍 <b>العنوان:</b> ${address}`,
  ];
  if (notes) parts.push(`📝 <b>ملاحظات:</b> ${notes}`);
  parts.push(
    '',
    `🍽 <b>الطلب:</b>`,
    lines,
    '━━━━━━━━━━━━━━',
    `💰 <b>المجموع:</b> ${Number(subtotal).toFixed(0)} ر.س`,
    `🚗 <b>التوصيل:</b> ${freeDelivery ? 'مجاني ✅' : 'يُحدد لاحقاً'}`,
    `💵 <b>الدفع:</b> عند الاستلام`,
  );
  const msg = parts.join('\n');

  let tgData;
  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ chat_id: env.CHAT_ID, text: msg, parse_mode: 'HTML' }),
      }
    );
    tgData = await tgRes.json();
  } catch (err) {
    return json({ ok: false, error: err.message || 'Network error' }, 502);
  }

  if (!tgData.ok) {
    return json({ ok: false, error: tgData.description || 'Telegram error' }, 502);
  }

  return json({ ok: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
