// Cloudflare Worker: Jalaquduq ovozi ilovasi (rasm AI, statistika, reyting, a‘zolik tekshiruvi).
// Maxfiy sozlama: REPLICATE_TOKEN (Settings -> Variables and Secrets, turi "Secret").
// Ixtiyoriy: ALLOWED_ORIGIN (masalan https://FOYDALANUVCHI.github.io)
const MODELS = {
  // rasm sifatini yaxshilash (kattalashtirish; face=true bo‘lsa yuz ham tiklanadi)
  k4: { list: [{ model: "nightmareai/real-esrgan" }], input: (m, b) => ({ image: b.image, scale: b.scale === 2 ? 2 : 4, face_enhance: b.face === true }) },
  // orqa fonni olib tashlash: avval BRIA, ishlamasa zaxira model
  bg: { list: [{ model: "bria/remove-background", official: true }, { model: "codeplugtech/background_remover" }], input: (m, b) => ({ image: b.image }) },
};


async function verifyInit(raw, token, maxAge) {
  if (!raw || !token) return null;
  const params = new URLSearchParams(raw);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");
  const dcs = [...params.entries()].map(([k, v]) => k + "=" + v).sort().join("\n");
  const enc = new TextEncoder();
  const hm = async (key, data) => {
    const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(data)));
  };
  const secret = await hm(enc.encode("WebAppData"), token);
  const calc = [...(await hm(secret, dcs))].map((x) => x.toString(16).padStart(2, "0")).join("");
  if (calc !== hash) return null;
  if (!(Date.now() / 1000 - Number(params.get("auth_date") || 0) < (maxAge || 86400))) return null;
  try { const u = JSON.parse(params.get("user") || "{}"); return u && u.id ? u : null; } catch (e) { return null; }
}
function weekStart(ms) {
  const d = new Date(ms + 5 * 3600e3);
  const back = (d.getUTCDay() + 6) % 7;
  return new Date(d.getTime() - back * 86400e3).toISOString().slice(0, 10);
}


/* ===================== YANGILIKLAR ===================== */
const GN = (q, lang) => "https://news.google.com/rss/search?q=" + encodeURIComponent(q + " when:3d") + (lang === "ru" ? "&hl=ru&gl=UZ&ceid=UZ:ru" : "&hl=uz&gl=UZ&ceid=UZ:uz");
const GNW = (lang) => "https://news.google.com/rss/headlines/section/topic/WORLD" + (lang === "ru" ? "?hl=ru&gl=UZ&ceid=UZ:ru" : "?hl=uz&gl=UZ&ceid=UZ:uz");
const REGIONS = {
  toshkent: "Toshkent", samarqand: "Samarqand", fargona: "Farg'ona", namangan: "Namangan", buxoro: "Buxoro", xorazm: "Xorazm",
  qashqadaryo: "Qashqadaryo", surxondaryo: "Surxondaryo", jizzax: "Jizzax", sirdaryo: "Sirdaryo", navoiy: "Navoiy", qoraqalpogiston: "Qoraqalpog'iston"
};
const REGIONS_RU = { toshkent: "Ташкент", samarqand: "Самарканд", fargona: "Фергана", namangan: "Наманган", buxoro: "Бухара", xorazm: "Хорезм", qashqadaryo: "Кашкадарья", surxondaryo: "Сурхандарья", jizzax: "Джизак", sirdaryo: "Сырдарья", navoiy: "Навои", qoraqalpogiston: "Каракалпакстан" };
// Manbalarni shu yerda o'zgartirish mumkin
function newsFeeds(cat, lang, reg) {
  if (cat === "uz") return [
    ["Kun.uz", "https://kun.uz/news/rss"], ["Daryo", "https://daryo.uz/rss"], ["UzA", "https://uza.uz/uz/rss"], ["Nuz.uz", "https://nuz.uz/feed/"],
    ["Google", GN(lang === "ru" ? "Узбекистан" : "O'zbekiston", lang)]];
  if (cat === "world") return [
    ["BBC", lang === "ru" ? "https://feeds.bbci.co.uk/russian/rss.xml" : "https://feeds.bbci.co.uk/uzbek/rss.xml"], ["Google", GNW(lang)]];
  if (cat === "andijon") return [
    ["Google", GN(lang === "ru" ? "Андижан" : "Andijon", lang)], ["Google", GN("Andijon viloyati hokimligi", "uz")]];
  if (cat === "region") return [
    ["Google", GN('Jalaquduq OR Jalolquduq OR "Jalaquduq tumani"', "uz")], ["Google", GN("Жалакудук OR Джалакудук", "ru")]];
  return [];
}
function ent(s) {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (m, n) => { try { return String.fromCodePoint(parseInt(n, 16)); } catch (e) { return ""; } })
    .replace(/&#(\d+);/g, (m, n) => { try { return String.fromCodePoint(+n); } catch (e) { return ""; } }).replace(/&amp;/g, "&");
}
function xdec(s) {
  s = s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  s = ent(s).replace(/<[^>]+>/g, " ");
  return ent(s).replace(/\s+/g, " ").trim();
}
function tag(b, n) { const m = b.match(new RegExp("<" + n + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + n + ">", "i")); return m ? m[1] : ""; }
function parseFeed(xml, name) {
  const out = [], blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  for (const b of blocks) {
    let title = xdec(tag(b, "title")), link = xdec(tag(b, "link"));
    if (!link) { const m = b.match(/<link[^>]+href=["']([^"']+)["']/i); if (m) link = m[1]; }
    if (!title || !/^https?:\/\//.test(link)) continue;
    const ds = xdec(tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "dc:date")), t = Date.parse(ds) || 0;
    let src = name, sm = b.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
    if (name === "Google") {
      src = sm ? xdec(sm[1]) : "";
      const i = title.lastIndexOf(" - "); if (i > 10 && !sm) { src = title.slice(i + 3); }
      if (i > 10 && src && title.endsWith(" - " + src)) title = title.slice(0, i);
    }
    let desc = xdec(tag(b, "description") || tag(b, "summary") || tag(b, "content:encoded"));
    if (name === "Google" || desc === title || desc.indexOf(title) === 0) desc = "";
    if (desc.length > 220) desc = desc.slice(0, 217).replace(/\s+\S*$/, "") + "…";
    let img = "";
    const im = b.match(/<(?:media:thumbnail|media:content|enclosure)[^>]+(?:url)=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)["']/i) || b.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (im && /^https:\/\//.test(im[1])) img = im[1];
    out.push({ t: title, u: link, s: src, d: desc, i: img, ts: t });
  }
  return out;
}
async function sha(s) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 48);
}
function chanItems(list) {
  return list.map((x) => {
    const lines = x.t.split(/\n+/).map((s) => s.trim()).filter(Boolean), t = lines[0].slice(0, 140);
    return { t, u: x.u, s: "Jalaquduq ovozi", d: (lines.slice(1).join(" ") || (lines[0].length > 140 ? lines[0].slice(140) : "")).slice(0, 200), i: "", ts: x.ts, ch: 1 };
  });
}
async function getNews(cat, lang, reg, env) {
  const feeds = newsFeeds(cat, lang, reg), diag = [];
  const res = await Promise.all(feeds.map(async ([name, u]) => {
    try {
      const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0 (compatible; JalaquduqBot/1.0)", "Accept": "application/rss+xml, application/xml, text/xml, */*" }, cf: { cacheTtl: 300, cacheEverything: true }, signal: AbortSignal.timeout(7000) });
      if (!r.ok) { diag.push({ u, st: r.status }); return []; }
      const items = parseFeed(await r.text(), name); diag.push({ u, st: 200, n: items.length }); return items;
    } catch (e) { diag.push({ u, st: String(e && e.message || e).slice(0, 60) }); return []; }
  }));
  const seen = new Set(), all = [], now = Date.now();
  for (const it of res.flat().sort((a, b) => b.ts - a.ts)) {
    const k = it.t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "").slice(0, 60);
    if (seen.has(k) || (it.ts && it.ts > now + 36e5)) continue; seen.add(k); all.push(it);
  }
  let ch = [];
  if (cat === "region" && env && env.STATS) { try { ch = chanItems(JSON.parse(await env.STATS.get("cp:list") || "[]")); diag.push({ u: "kanal postlari", st: 200, n: ch.length }); } catch (e) {} }
  return { items: ch.concat(all).slice(0, 40), diag };
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const allow = env.ALLOWED_ORIGIN || "*";
    const cors = {
      "Access-Control-Allow-Origin": allow === "*" ? "*" : allow,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Key",
      "Access-Control-Expose-Headers": "X-Model",
    };
    const fail = (m, s) => new Response(JSON.stringify({ error: m }), { status: s || 500, headers: { ...cors, "Content-Type": "application/json" } });
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const url0 = new URL(req.url);
    if (req.method === "GET" && url0.pathname.startsWith("/f/")) {
      const buf = env.STATS ? await env.STATS.get("f:" + url0.pathname.slice(3), "arrayBuffer") : null;
      if (!buf) return new Response("Topilmadi", { status: 404 });
      const isPng = /\.png$/.test(url0.pathname);
      const nm = (url0.searchParams.get("n") || "rasm").replace(/[^a-z0-9_-]/gi, "").slice(0, 30) || "rasm";
      return new Response(buf, { headers: { "Content-Type": isPng ? "image/png" : "image/jpeg", "Content-Disposition": "attachment; filename=\"" + nm + (isPng ? ".png" : ".jpg") + "\"", "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" } });
    }
    if (req.method === "POST" && url0.pathname === "/up") {
      if (!env.STATS) return fail("Sozlanmagan", 500);
      const buf = await req.arrayBuffer();
      if (!buf.byteLength || buf.byteLength > 5000000) return fail("Hajm noto‘g‘ri", 413);
      const id = crypto.randomUUID().replace(/-/g, "") + (url0.searchParams.get("e") === "png" ? ".png" : ".jpg");
      await env.STATS.put("f:" + id, buf, { expirationTtl: 3600 });
      return new Response(JSON.stringify({ url: url0.origin + "/f/" + id }), { headers: { ...cors, "Content-Type": "application/json" } });
    }
    // ---- Statistika (KV: STATS, maxfiy: ADMIN_KEY) ----
    const jres = (o, st) => new Response(JSON.stringify(o), { status: st || 200, headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" } });
    const dayOf = (ms) => new Date(ms + 5 * 3600e3).toISOString().slice(0, 10);
    // ---- Viktorina reytingi ----
    // ---- Kanal postlari (webhook) ----
    if (url0.pathname === "/tg" && req.method === "POST") {
      if (!env.STATS || !env.ADMIN_KEY) return new Response("no", { status: 500 });
      const want = await sha(env.ADMIN_KEY + ":tg");
      if (req.headers.get("X-Telegram-Bot-Api-Secret-Token") !== want) return new Response("no", { status: 403 });
      let up; try { up = await req.json(); } catch (e) { return new Response("ok"); }
      if (up.message && up.message.chat && up.message.chat.type === "private" && env.BOT_TOKEN) {
        const t = String(up.message.text || "");
        const app = env.APP_URL || "https://muhammadaminergashev96-lab.github.io/Jalaquduq-app/";
        const ch = String(env.CHANNEL || "").startsWith("@") ? "https://t.me/" + String(env.CHANNEL).slice(1) : (env.CHANNEL_LINK || "");
        const kb = [[{ text: "📱 Ilovani ochish", web_app: { url: app } }]];
        if (ch) kb.push([{ text: "📢 Kanalimiz", url: ch }]);
        const name = (up.message.from && up.message.from.first_name) ? ", " + String(up.message.from.first_name).slice(0, 40) : "";
        const txt = /^\/start/.test(t)
          ? "Assalomu alaykum" + name + "! 👋\n\n<b>Jalaquduq ovozi</b> ilovasiga xush kelibsiz.\n\n🕌 Namoz vaqtlari · 🌤 Ob-havo · 💱 Valyuta va konvertor\n🚗 Prava testlari · 💰 Xarajatlar · 🎯 Maqsadlar\n📰 Yangiliklar · 🖼 Rasm vositalari · 🎮 O‘yinlar va boshqalar\n\nBoshlash uchun pastdagi tugmani bosing 👇"
          : "Ilovani ochish uchun pastdagi tugmani bosing 👇";
        await fetch("https://api.telegram.org/bot" + env.BOT_TOKEN + "/sendMessage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: up.message.chat.id, text: txt, parse_mode: "HTML", reply_markup: { inline_keyboard: kb } }) }).catch(() => {});
        return new Response("ok");
      }
      const m = up.channel_post || up.edited_channel_post;
      if (m && m.chat && m.chat.username && String(env.CHANNEL || "").replace(/^@/, "").toLowerCase() === m.chat.username.toLowerCase()) {
        const text = String(m.text || m.caption || "").trim();
        if (text) {
          let list = []; try { list = JSON.parse(await env.STATS.get("cp:list") || "[]"); } catch (e) {}
          list = list.filter((x) => x.id !== m.message_id);
          list.push({ id: m.message_id, ts: (m.date || 0) * 1000, t: text.slice(0, 600), u: "https://t.me/" + m.chat.username + "/" + m.message_id });
          list.sort((a, b) => b.ts - a.ts);
          await env.STATS.put("cp:list", JSON.stringify(list.slice(0, 40)));
        }
      }
      return new Response("ok");
    }
    if (url0.pathname === "/setup" && req.method === "GET") {
      if (!env.ADMIN_KEY || !env.BOT_TOKEN) return jres({ error: "Sozlanmagan" }, 500);
      if (url0.searchParams.get("key") !== env.ADMIN_KEY) return jres({ error: "Kalit noto‘g‘ri" }, 403);
      const api = "https://api.telegram.org/bot" + env.BOT_TOKEN + "/";
      const wi = await (await fetch(api + "getWebhookInfo")).json();
      const mine = url0.origin + "/tg";
      if (wi.result && wi.result.url && wi.result.url !== mine && url0.searchParams.get("force") !== "1")
        return jres({ ok: false, msg: "Botda boshqa webhook bor: " + wi.result.url + " . Almashtirish uchun &force=1 qo'shing", current: wi.result.url });
      const r = await (await fetch(api + "setWebhook", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: mine, secret_token: await sha(env.ADMIN_KEY + ":tg"), allowed_updates: ["message", "channel_post", "edited_channel_post"], drop_pending_updates: true }) })).json();
      return jres({ ok: !!r.ok, tg: r });
    }
    if (req.method === "GET" && url0.pathname === "/news") {
      const cat = url0.searchParams.get("c") || "uz", lang = url0.searchParams.get("l") === "ru" ? "ru" : "uz", reg = url0.searchParams.get("r") || "";
      if (!["uz", "world", "andijon", "region"].includes(cat)) return fail("bad", 400);
      const dbg = url0.searchParams.get("debug") === "1";
      const ck = new Request(url0.origin + "/__news/" + cat + "/" + lang + "/" + reg + (dbg ? "/d" : ""));
      const cache = caches.default;
      if (!dbg) { const hit = await cache.match(ck); if (hit) return new Response(hit.body, { headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" } }); }
      const nw = await getNews(cat, lang, reg, env);
      const body = JSON.stringify(dbg ? nw : { items: nw.items, at: Date.now() });
      const resp = new Response(body, { headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=600" } });
      if (!dbg && nw.items.length) await cache.put(ck, resp.clone());
      return new Response(body, { headers: { ...cors, "Content-Type": "application/json", "Cache-Control": dbg ? "no-store" : "public, max-age=300" } });
    }
    if (req.method === "POST" && url0.pathname === "/score") {
      if (!env.STATS || !env.BOT_TOKEN) return fail("Sozlanmagan", 500);
      let b; try { b = JSON.parse(await req.text()); } catch (e) { return fail("Noto‘g‘ri so‘rov", 400); }
      const u = await verifyInit(String(b.init || ""), env.BOT_TOKEN, 7 * 86400);
      if (!u) return fail("Imzo noto‘g‘ri", 403);
      const sc = b.score, co = b.correct;
      if (!Number.isInteger(sc) || !Number.isInteger(co) || co < 0 || co > 10 || sc < 0 || sc > co * 150 || (co > 0 && sc < co * 100)) return fail("Noto‘g‘ri natija", 400);
      const key = "w:" + weekStart(Date.now()) + ":" + u.id;
      const old = await env.STATS.getWithMetadata(key);
      const best = old && old.metadata && old.metadata.s ? old.metadata.s : 0;
      let improved = false;
      if (sc > best) {
        const n = (String(u.first_name || "") + (u.last_name ? " " + String(u.last_name).slice(0, 1) + "." : "")).slice(0, 24) || "—";
        await env.STATS.put(key, "1", { expirationTtl: 21 * 86400, metadata: { n, s: sc, t: Date.now() } });
        improved = true;
      }
      return jres({ ok: true, best: Math.max(best, sc), improved });
    }
    if (req.method === "POST" && url0.pathname === "/top") {
      if (!env.STATS) return fail("Sozlanmagan", 500);
      const raw = await req.text();
      const u = env.BOT_TOKEN ? await verifyInit(raw, env.BOT_TOKEN, 7 * 86400) : null;
      const wk = weekStart(Date.now()), prefix = "w:" + wk + ":";
      let keys = [], cursor;
      for (let i = 0; i < 10; i++) {
        const r = await env.STATS.list({ prefix, cursor, limit: 1000 });
        keys = keys.concat(r.keys);
        if (r.list_complete) break;
        cursor = r.cursor;
      }
      const rows = keys.filter((k) => k.metadata && k.metadata.s).map((k) => ({ id: k.name.slice(prefix.length), n: k.metadata.n, s: k.metadata.s, t: k.metadata.t || 0 }))
        .sort((a, b) => b.s - a.s || a.t - b.t);
      let me = null;
      if (u) { const ix = rows.findIndex((r) => r.id === String(u.id)); if (ix >= 0) me = { rank: ix + 1, s: rows[ix].s }; }
      return jres({ week: wk, total: rows.length, rows: rows.slice(0, 20).map((r) => ({ n: r.n, s: r.s })), me });
    }
    // ---- Kanal a'zoligini tekshirish (BOT_TOKEN, CHANNEL, ixtiyoriy CHANNEL_LINK) ----
    if (req.method === "POST" && url0.pathname === "/member") {
      if (!env.BOT_TOKEN || !env.CHANNEL) return jres({ error: "Sozlanmagan" }, 500);
      const raw = await req.text();
      const params = new URLSearchParams(raw);
      const hash = params.get("hash");
      if (!hash) return jres({ error: "initData yo‘q" }, 400);
      params.delete("hash");
      const dcs = [...params.entries()].map(([k, v]) => k + "=" + v).sort().join("\n");
      const enc = new TextEncoder();
      const hm = async (key, data) => {
        const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
        return new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(data)));
      };
      const secret = await hm(enc.encode("WebAppData"), env.BOT_TOKEN);
      const calc = [...(await hm(secret, dcs))].map((x) => x.toString(16).padStart(2, "0")).join("");
      if (calc !== hash) return jres({ error: "Imzo noto‘g‘ri" }, 403);
      const age = Date.now() / 1000 - Number(params.get("auth_date") || 0);
      if (!(age < 86400)) return jres({ error: "Muddati o‘tgan" }, 403);
      let uid;
      try { uid = JSON.parse(params.get("user") || "{}").id; } catch (e) {}
      if (!uid) return jres({ error: "Foydalanuvchi yo‘q" }, 400);
      let link = env.CHANNEL_LINK || (String(env.CHANNEL).startsWith("@") ? "https://t.me/" + String(env.CHANNEL).slice(1) : "");
      try {
        const r = await fetch("https://api.telegram.org/bot" + env.BOT_TOKEN + "/getChatMember?chat_id=" + encodeURIComponent(env.CHANNEL) + "&user_id=" + uid);
        const j = await r.json();
        if (!j.ok) return jres({ error: "Telegram: " + (j.description || "xato") }, 502);
        const st = j.result && j.result.status;
        const member = st === "member" || st === "administrator" || st === "creator" || (st === "restricted" && j.result.is_member === true);
        return jres({ ok: true, member, link });
      } catch (e) { return jres({ error: "Ulanib bo‘lmadi" }, 502); }
    }
    if (req.method === "POST" && url0.pathname === "/hit") {
      if (!env.STATS) return jres({ ok: false });
      let b; try { b = JSON.parse(await req.text()); } catch (e) { return jres({ ok: false }, 400); }
      const id = String(b.id || "");
      if (!/^\d{3,15}$/.test(id)) return jres({ ok: false }, 400);
      const meta = { n: String(b.n || "").slice(0, 40), u: String(b.u || "").slice(0, 40), l: String(b.l || "").slice(0, 8) };
      const today = dayOf(Date.now());
      const ak = "a:" + today + ":" + id;
      if (!(await env.STATS.get(ak))) {
        await env.STATS.put(ak, "1", { expirationTtl: 60 * 86400, metadata: meta });
        const uk = "u:" + id;
        if (!(await env.STATS.get(uk))) await env.STATS.put(uk, "1", { metadata: { ...meta, f: today } });
      }
      return jres({ ok: true });
    }
    if (req.method === "GET" && url0.pathname === "/stats") {
      if (!env.STATS || !env.ADMIN_KEY) return jres({ error: "Sozlanmagan" }, 500);
      if ((req.headers.get("X-Key") || "") !== env.ADMIN_KEY) return jres({ error: "Kalit noto‘g‘ri" }, 403);
      const listAll = async (prefix) => {
        let out = [], cursor;
        for (let i = 0; i < 30; i++) {
          const r = await env.STATS.list({ prefix, cursor, limit: 1000 });
          out = out.concat(r.keys);
          if (r.list_complete) break;
          cursor = r.cursor;
        }
        return out;
      };
      const now = Date.now(), today = dayOf(now);
      const users = await listAll("u:");
      const days = [], week = new Set();
      let todayKeys = [];
      for (let i = 0; i < 14; i++) {
        const d = dayOf(now - i * 86400e3);
        const ks = await listAll("a:" + d + ":");
        days.push({ d, n: ks.length });
        if (i === 0) todayKeys = ks;
        if (i < 7) ks.forEach((k) => week.add(k.name.split(":")[2]));
      }
      const langs = {};
      users.forEach((k) => { const l = (k.metadata && k.metadata.l) || "?"; langs[l] = (langs[l] || 0) + 1; });
      const who = (k) => ({ n: (k.metadata && k.metadata.n) || "", u: (k.metadata && k.metadata.u) || "" });
      const newToday = users.filter((k) => k.metadata && k.metadata.f === today).length;
      const newest = users.slice().sort((a, b) => ((b.metadata && b.metadata.f) || "").localeCompare((a.metadata && a.metadata.f) || "")).slice(0, 20).map((k) => ({ ...who(k), f: (k.metadata && k.metadata.f) || "" }));
      return jres({ total: users.length, newToday, today: todayKeys.length, week: week.size, days: days.reverse(), langs, activeToday: todayKeys.slice(0, 50).map(who), newest });
    }
    if (req.method !== "POST") return fail("POST kerak", 405);
    if (allow !== "*" && origin !== allow) return fail("Ruxsat yo‘q", 403);
    if (!env.REPLICATE_TOKEN || !env.BOT_TOKEN || !env.STATS) return fail("Token sozlanmagan", 500);

    let body;
    try { body = await req.json(); } catch (e) { return fail("Noto‘g‘ri so‘rov", 400); }
    const cfg = MODELS[body.task];
    if (!cfg) return fail("Noto‘g‘ri so‘rov", 400);
    if (typeof body.image !== "string" || body.image.indexOf("data:image/") !== 0) return fail("Noto‘g‘ri so‘rov", 400);
    if (body.image.length > 6e6) return fail("Rasm juda katta", 413);

    // Faqat Telegram ilovasidan, tekshirilgan foydalanuvchiga va kuniga cheklangan marta
    const user = await verifyInit(String(body.init || ""), env.BOT_TOKEN, 86400 * 3);
    if (!user) return fail("Telegram ilovasi orqali kiring", 403);
    const LIMIT = Number(env.AI_DAILY_LIMIT) || 12;
    const lk = "ai:" + dayOf(Date.now()) + ":" + user.id;
    const used = Number(await env.STATS.get(lk)) || 0;
    if (used >= LIMIT) return fail("Kunlik limit tugadi (" + LIMIT + " ta). Ertaga urinib ko‘ring.", 429);
    await env.STATS.put(lk, String(used + 1), { expirationTtl: 2 * 86400 });

    const H = { Authorization: "Bearer " + env.REPLICATE_TOKEN, "Content-Type": "application/json" };
    let lastErr = "Ishlov bajarilmadi";
    for (const m of cfg.list) {
      try {
        let endpoint, payload;
        if (m.official) {
          endpoint = "https://api.replicate.com/v1/models/" + m.model + "/predictions";
          payload = { input: cfg.input(m, body) };
        } else {
          const mr = await fetch("https://api.replicate.com/v1/models/" + m.model, { headers: H });
          if (!mr.ok) { lastErr = "Model topilmadi " + mr.status; continue; }
          const ver = (await mr.json()).latest_version;
          if (!ver || !ver.id) { lastErr = "Model versiyasi yo‘q"; continue; }
          endpoint = "https://api.replicate.com/v1/predictions";
          payload = { version: ver.id, input: cfg.input(m, body) };
        }
        const pr = await fetch(endpoint, { method: "POST", headers: { ...H, Prefer: "wait=55" }, body: JSON.stringify(payload) });
        if (!pr.ok) {
          let d = ""; try { d = (await pr.text()).slice(0, 160); } catch (e) {}
          lastErr = "Replicate " + pr.status + " " + d;
          if (pr.status === 402 || pr.status === 429) break;
          continue;
        }
        let p = await pr.json();
        for (let i = 0; i < 20 && p.status !== "succeeded" && p.status !== "failed" && p.status !== "canceled"; i++) {
          await new Promise((r) => setTimeout(r, 2000));
          const g = await fetch(p.urls.get, { headers: H });
          p = await g.json();
        }
        if (p.status !== "succeeded") { lastErr = "Ishlov bajarilmadi: " + String(p.error || p.status).slice(0, 160); continue; }
        const url = Array.isArray(p.output) ? p.output[0] : p.output;
        if (typeof url !== "string") { lastErr = "Natija yo‘q"; continue; }
        const img = await fetch(url);
        if (!img.ok) { lastErr = "Natijani olib bo‘lmadi"; continue; }
        return new Response(img.body, { headers: { ...cors, "Content-Type": img.headers.get("Content-Type") || "image/png", "X-Model": m.model } });
      } catch (e) { lastErr = "Server xatosi"; }
    }
    return fail(lastErr, 502);
  },
};
