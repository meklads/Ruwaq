#!/usr/bin/env sh
# Production start. It ONLY starts the web server.
#
# It does not change the database: no `prisma db push`, no migrations and no seed. Preparing or
# changing the database is a separate, deliberate step: see scripts/db-setup.sh and docs/DEPLOY.md.
# (Clause packs are created on demand by the app itself the first time a proposal needs them.)
PORT="${PORT:-3000}"

echo "=========================================="
echo " Ruwaq"
echo " PORT=$PORT"
echo "=========================================="

if [ -z "$DATABASE_URL" ]; then
  echo "⚠ DATABASE_URL is not set — add it to the application environment"
fi

echo "→ Starting Next.js on 0.0.0.0:$PORT (database untouched)"
exec ./node_modules/.bin/next start -H 0.0.0.0 -p "$PORT"
