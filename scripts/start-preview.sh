#!/usr/bin/env sh
# Private PREVIEW start. Unlike scripts/start.sh this NEVER runs `prisma db push`, seed or migrations.
# It refuses to start unless the site is behind the full-site password gate and no outbound
# integrations (email, payment, AI, lead webhooks) are configured.
PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"

fail() { echo "REFUSING TO START: $1" >&2; exit 1; }

[ -n "$APP_GATE_PASSWORD" ] || fail "APP_GATE_PASSWORD is not set (the preview must be password protected)"
[ "$APP_GATE_FULL_SITE" = "true" ] || fail "APP_GATE_FULL_SITE must be true so every route is gated"
[ "$RUWAQ_PRIVATE_PREVIEW" = "1" ] || fail "RUWAQ_PRIVATE_PREVIEW must be 1"
[ "$BILLING_ENABLED" != "true" ] || fail "BILLING_ENABLED must not be true in a preview"
for v in RESEND_API_KEY PAYPAL_CLIENT_ID PAYPAL_CLIENT_SECRET OPENAI_API_KEY GEMINI_API_KEY \
         TURRIVA_LEAD_WEBHOOK_URL PARTNER_LEAD_WEBHOOK_URL GRAPHICS_HOUSE_LEAD_WEBHOOK_URL CRON_SECRET; do
  eval "val=\${$v:-}"
  [ -z "$val" ] || fail "$v must be unset in a preview"
done

echo "Ruwaq private preview on $HOST:$PORT (password gate on, no migrations, no seed)"
exec ./node_modules/.bin/next start -H "$HOST" -p "$PORT"
