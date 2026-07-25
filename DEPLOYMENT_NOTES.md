# Deployment Notes — Saudi Proposal OS

## Issue Fixed: Tailwind CSS v4 → v3 Downgrade

**Root Cause:** 
`package.json` had `"tailwindcss": "^4.3.1"` which required `@tailwindcss/postcss` as a separate package. 
The PostCSS config used `tailwindcss` plugin directly (v3 style), causing build failure.

**Fix Applied:**
- Pinned `tailwindcss` to `3.4.19` (exact version)
- Regenerated `package-lock.json` so `npm ci` installs correct version
- PostCSS config remains unchanged (correct for v3)

## Environment Variables Required

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `AUTH_SECRET` | ✅ | NextAuth secret |
| `AUTH_URL` | ✅ | Deployment URL |
| `OPENAI_API_KEY` | ✅ | OpenAI key (set empty for mock data) |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public URL |

## Build Command
```bash
npm ci
npx prisma generate
npx prisma db push
npm run build
```

## Start Command (Coolify / Docker)
```bash
npm start
```
This runs `prisma db push` automatically before starting the server.

## Health Check
After deploy, verify database is connected:
```
GET /api/health
```
Expected: `{ "ok": true, "db": true, "tables": true }`

## Coolify Settings

### Required: PostgreSQL database
1. In Coolify → add a **PostgreSQL** database resource
2. Link it to the `ruwaq` application (this injects `DATABASE_URL`)
3. Or paste `DATABASE_URL` manually in Environment Variables

### Application settings
| Setting | Value |
|---------|-------|
| **Port** | `3000` |
| **Start Command** | `npm start` |
| **Health Check Path** | `/api/health` |
| **Build Command** | `npm ci && npm run build` |

### Environment variables (runtime)
| Variable | Required | Example |
|----------|----------|---------|
| `DATABASE_URL` | ✅ | `postgresql://user:pass@postgres:5432/ruwaq` |
| `AUTH_SECRET` | ✅ | random 32+ char string |
| `AUTH_URL` | ✅ | `https://ruwaq.co` |
| `NEXT_PUBLIC_APP_URL` | ✅ | `https://ruwaq.co` |
| `AUTH_GOOGLE_ID` | ✅ for login | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | ✅ for login | Google OAuth Client Secret |
| `OPENAI_API_KEY` | optional | leave empty for mock AI |

### Google OAuth (required for sign-in)
1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Create **OAuth 2.0 Client ID** (Web application)
3. **Authorized JavaScript origins:** `https://ruwaq.co`
4. **Authorized redirect URIs:** `https://ruwaq.co/api/auth/callback/google`
5. In Coolify → Environment Variables, add:
   - `AUTH_GOOGLE_ID` = Client ID
   - `AUTH_GOOGLE_SECRET` = Client Secret
6. Redeploy, then verify: `https://ruwaq.co/api/health` → `"googleAuth": true`

If you see **Missing required parameter: client_id**, `AUTH_GOOGLE_ID` is empty or missing in Coolify.
502 means the container is **not running**. Common causes:
1. `DATABASE_URL` missing or wrong → container exited on old start script
2. Port mismatch → set Coolify port to **3000**
3. Check **Application Logs** (not Build Logs) for errors

After deploy, verify:
```
https://ruwaq.co/api/health
```
