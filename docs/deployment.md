# Deployment

DevFolio เป็น **static Vue SPA** — build แล้วได้ไฟล์ HTML/JS/CSS ธรรมดา deploy ได้ที่ Vercel หรือ Netlify โดยไม่ต้องมี server PHP

---

## Table of Contents

- [1. Build](#1-build)
- [2. Hosting Recommendation](#2-hosting-recommendation)
- [3. Vercel (แนะนำ)](#3-vercel-แนะนำ)
- [4. Netlify](#4-netlify)
- [5. Environment Variables](#5-environment-variables)
- [6. Custom Domain](#6-custom-domain)
- [7. Post-Deploy Checklist](#7-post-deploy-checklist)
- [8. Monitoring](#8-monitoring)

---

## 1. Build

```bash
npm run build
# output: dist/
```

`dist/` มีเฉพาะ static files — ไม่มี PHP, ไม่มี Node server

**ตรวจสอบ build:**
```bash
npm run preview  # รัน local HTTP server เสิร์ฟ dist/
```

---

## 2. Hosting Recommendation

| Option | Pros | Cons | เหมาะสำหรับ |
|--------|------|------|------------|
| **Vercel** | Auto-detect Vite, preview per PR, Edge Network, free tier ดี | Function execution limit บน free | ⭐ แนะนำ — DX ดีที่สุด |
| **Netlify** | Branch deploys, form handling (ไม่ได้ใช้), free tier | Deploy time ช้ากว่า Vercel เล็กน้อย | ⭐ ทางเลือกที่ดี |
| **Cloudflare Pages** | Free, global CDN, Workers integration | Setup ซับซ้อนกว่าเล็กน้อย | ☆ ถ้าใช้ Cloudflare อยู่แล้ว |
| **GitHub Pages** | ฟรี ง่ายมาก | ไม่รองรับ History mode โดยตรง (ต้องใช้ hash mode) | ☆ สำหรับ demo เท่านั้น |

---

## 3. Vercel (แนะนำ)

### 3.1 Deploy ครั้งแรก

```bash
npm i -g vercel
vercel
# ตอบคำถาม: framework = Vite, build command = npm run build, output = dist
```

หรือ connect GitHub repo ผ่าน vercel.com dashboard → auto-deploy ทุก push

### 3.2 `vercel.json`

ต้องสร้างไฟล์นี้เพื่อ SPA fallback (History mode):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 3.3 Environment Variables

ไปที่ Vercel Dashboard → Project → Settings → Environment Variables:

```
VITE_SUPABASE_URL         = https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY    = eyJ…
VITE_SUPABASE_PUBLIC_BUCKET = devfolio-public
```

> ⚠️ ค่าที่ prefix `VITE_` จะถูก bundle เข้า JS — **ห้ามใส่ secret key** (service_role)

---

## 4. Netlify

### 4.1 `public/_redirects`

```
/*  /index.html  200
```

### 4.2 `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

### 4.3 Environment Variables

Netlify Dashboard → Site Settings → Environment Variables → เพิ่มเหมือน Vercel

---

## 5. Environment Variables

### 5.1 `.env` (local dev)

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
VITE_SUPABASE_PUBLIC_BUCKET=devfolio-public
```

### 5.2 ห้ามใส่ใน `.env`

| Key | เหตุผล |
|-----|-------|
| `SUPABASE_SERVICE_ROLE_KEY` | ต้องอยู่ใน Edge Function เท่านั้น |
| API keys อื่น (Resend, etc.) | ต้องอยู่ใน Edge Function เท่านั้น |

### 5.3 `.env.example`

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_PUBLIC_BUCKET=devfolio-public
```

---

## 6. Custom Domain

### 6.1 Vercel

1. Vercel Dashboard → Project → Domains → Add Domain
2. เพิ่ม DNS record ตามที่ Vercel แนะนำ (CNAME หรือ A record)
3. SSL จัดการให้อัตโนมัติ

### 6.2 Cloudflare DNS (ถ้าใช้)

```
Type   Name    Value                Proxy
CNAME  @       cname.vercel-dns.com  ✅ (หรือ A ตาม IP)
CNAME  www     cname.vercel-dns.com  ✅
```

### 6.3 หมายเหตุ Supabase CORS

เมื่อใช้ custom domain ต้องเพิ่ม domain ใน Supabase Dashboard → Authentication → URL Configuration → **Allowed URLs**:

```
https://yourdomain.com
https://www.yourdomain.com
```

---

## 7. Post-Deploy Checklist

- [ ] `https://yourdomain.com/` โหลดหน้า Portfolio ได้
- [ ] `https://yourdomain.com/freelance` โหลดหน้า Freelance ได้
- [ ] `/projects/some-slug` ไม่ 404 (SPA fallback ทำงาน)
- [ ] ข้อมูลดึงจาก Supabase ได้ — ไม่มี CORS error ใน console
- [ ] รูปภาพโหลดจาก Supabase Storage ได้
- [ ] Language toggle TH/EN ทำงาน + persist ข้าม reload
- [ ] Contact form ส่งได้ (ถ้ามี Edge Function — ตรวจสอบ email ด้วย)
- [ ] SSL A+ rating (ใช้ Let's Encrypt อัตโนมัติบน Vercel/Netlify)
- [ ] `robots.txt` ถูกต้อง
- [ ] Lighthouse ≥ 90 ทุกหมวด
- [ ] Mobile responsive ครบทุก section
- [ ] Three.js ไม่กิน CPU/Battery ผิดปกติบนมือถือ
- [ ] Google Search Console verify + submit sitemap

### `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /contact/thank-you

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 8. Monitoring

### 8.1 Uptime

- **UptimeRobot** (ฟรี) — monitor `https://yourdomain.com/`
- Vercel/Netlify มี built-in status ด้วย

### 8.2 Error Tracking

```bash
npm install @sentry/vue
```

```ts
// main.ts
import * as Sentry from '@sentry/vue';
Sentry.init({ app, dsn: import.meta.env.VITE_SENTRY_DSN });
```

> `VITE_SENTRY_DSN` ปลอดภัยที่จะ expose บน browser (ไม่ใช่ secret)

### 8.3 Supabase Monitoring

Supabase Dashboard → Reports:
- **API Usage** — request count, latency
- **Database** — query performance, DB size
- ตั้ง **Budget Alert** ถ้า storage ใกล้ quota

### 8.4 Key Metrics

| Metric | Target |
|--------|--------|
| Uptime | ≥ 99.9% |
| Lighthouse Performance (mobile) | ≥ 90 |
| Supabase API p95 | < 500ms |
| Bundle size (initial) | < 200KB gzip |
