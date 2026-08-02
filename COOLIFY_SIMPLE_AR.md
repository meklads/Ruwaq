# نشر رواق على Coolify — خطوات بسيطة

## ماذا حصل؟
النشر **فشل أثناء البناء** (Build). الموقع القديم قد يظل يعمل؛ التحديث الجديد لم يُرفع.

---

## الخطوة 1 — قاعدة البيانات (مرة واحدة)

1. افتح **Coolify** → مشروع **ruwaq**
2. **+ New Resource** → **Database** → **PostgreSQL** → **Deploy** حتى يصبح **Running**
3. افتح تطبيق **ruwaq** (الموقع) → **Environment Variables**
4. اضغط **Connect to Database** واختر PostgreSQL الجديد  
   (أو الصق `DATABASE_URL` من Connection Details)

---

## الخطوة 2 — متغيرات مهمة (Environment Variables)

| الاسم | مثال |
|--------|------|
| `DATABASE_URL` | يُضاف تلقائياً عند الربط |
| `AUTH_SECRET` | أي نص عشوائي طويل (32+ حرف) |
| `AUTH_URL` | `https://ruwaq.co` |
| `NEXT_PUBLIC_APP_URL` | `https://ruwaq.co` |
| `OPENAI_API_KEY` | مفتاح OpenAI (لتوليد العروض) |

---

## الخطوة 2ب — تسجيل Google (اختياري لكن مُستحسن)

1. افتح [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**
2. أنشئ **OAuth 2.0 Client ID** (نوع: Web application)
3. **Authorized JavaScript origins:** `https://ruwaq.co`
4. **Authorized redirect URIs:** `https://ruwaq.co/api/auth/callback/google`
5. في Coolify → **Environment Variables** أضف:

| الاسم | القيمة |
|--------|--------|
| `AUTH_GOOGLE_ID` | Client ID من Google |
| `AUTH_GOOGLE_SECRET` | Client Secret من Google |

6. **Redeploy** ثم تحقق: `https://ruwaq.co/api/health` → يجب `"googleAuth": true`

إذا ظهر **Missing required parameter: client_id** → المتغيران غير مضبوطين في Coolify.

---

## الخطوة 3 — إعدادات التطبيق في Coolify

| الإعداد | القيمة |
|---------|--------|
| **Port** | `3000` |
| **Start Command** | `npm start` |
| **Build Pack** | **Dockerfile** (مهم — لا تستخدم Nixpacks) |

إذا ظهر في السجل `nixpacks` أو `ghcr.io/railwayapp/nixpacks` والبناء فشل: غيّر **Build Pack** إلى **Dockerfile** واحفظ ثم **Redeploy**.

---

## الخطوة 4 — Redeploy

1. **Redeploy** للتطبيق (ليس للقاعدة فقط)
2. انتظر 3–5 دقائق
3. افتح: `https://ruwaq.co/api/health`  
   يجب أن ترى: `"db": true`

---

## إذا فشل البناء مرة أخرى

1. افتح **Deployment Logs** ومرّر للأسفل حتى **آخر سطر أحمر**
2. انسخ آخر 30 سطر وأرسلها — أو ابحث عن `npm ERR` أو `Error`

---

## بعد النجاح

- الصفحة الرئيسية: `https://ruwaq.co/`
- طلب عرض سعر: `https://ruwaq.co/request-quote`
