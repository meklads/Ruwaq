# Coolify — إعداد قاعدة البيانات (خطوة بخطوة)

## المشكلة
```
Environment variable not found: DATABASE_URL
```
أو في الموقع:
```
Database is not connected. Add DATABASE_URL in Coolify Environment Variables, then Redeploy.
```
التطبيق شغّال لكن **PostgreSQL غير مربوط** أو **قاعدة جديدة فارغة** بعد حذف القديمة.

> **تنبيه:** قاعدة جديدة = **لا استرجاع** للعروض والحسابات القديمة إلا إذا عندك **نسخة احتياطية** (Coolify backup / dump). بعد الربط، `npm start` يشغّل `prisma db push` + seed للبنود تلقائياً.

### تحقق سريع (قبل وبعد)
```bash
curl -s https://ruwaq.co/api/health
```
- قبل الإصلاح: `"db": false`, `"error": "DATABASE_URL is not set"`
- بعد النجاح: `"db": true`, `"tables": true`, `"schemaReady": true`

---

## الحل (5 دقائق)

### الخطوة 1: أنشئ PostgreSQL
1. افتح **Coolify Dashboard**
2. اذهب لنفس الـ **Project** اللي فيه ruwaq
3. اضغط **+ New Resource** → **Database** → **PostgreSQL**
4. اختر نفس السيرفر (localhost)
5. اضغط **Deploy** وانتظر حتى يصير **Running**

### الخطوة 2: اربط القاعدة بالتطبيق
1. افتح تطبيق **ruwaq** (موقع ruwaq.co)
2. اذهب لتبويب **Environment Variables**
3. ابحث عن زر **Connect to Database** أو **Link Database**
4. اختر الـ PostgreSQL اللي أنشأته
5. Coolify يضيف `DATABASE_URL` تلقائياً

### الخطوة 3: أضف باقي المتغيرات
| Variable | Value |
|----------|-------|
| `AUTH_SECRET` | أي نص عشوائي 32 حرف (مثال: `openssl rand -base64 32`) |
| `AUTH_URL` | `https://ruwaq.co` |
| `NEXT_PUBLIC_APP_URL` | `https://ruwaq.co` |
| `OPENAI_API_KEY` | مفتاح OpenAI (مطلوب لتوليد العروض؛ بدونه قد يفشل التوليد) |

### الخطوة 4: Redeploy
1. اضغط **Redeploy** على تطبيق ruwaq
2. انتظر 2–3 دقائق

### الخطوة 5: تحقق
افتح: `https://ruwaq.co/api/health`

**المطلوب:**
```json
{
  "ok": true,
  "app": true,
  "db": true,
  "tables": true
}
```

إذا `"db": false` → `DATABASE_URL` ما زال غلط.

---

## إذا ما لقيت "Link Database"

أضف يدوياً في Environment Variables:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
```

خذ القيم من تطبيق PostgreSQL في Coolify → **Connection Details**.

---

## بعد النجاح
جرّب **Generate Proposal** مرة ثانية — يفترض يشتغل.
