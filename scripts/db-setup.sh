#!/usr/bin/env sh
# Deliberate database preparation. Never runs at application start.
#
#   sh scripts/db-setup.sh check   read-only: shows what `db push` WOULD change (exit 0 = no drift)
#   CONFIRM_DB_PUSH=yes sh scripts/db-setup.sh push
#                                  applies prisma/schema.prisma with `prisma db push`.
#                                  It never passes --accept-data-loss: if the change could lose
#                                  data, Prisma stops and nothing is applied.
#
# There is no seed here. The marketplace seed (prisma/seed.ts) is destructive and refuses to run
# unless ALLOW_PRODUCTION_SEED=yes is set explicitly.
set -e
[ -n "$DATABASE_URL" ] || { echo "DATABASE_URL is not set" >&2; exit 1; }
PRISMA=./node_modules/.bin/prisma

case "$1" in
  check)
    echo "→ Comparing the live database with prisma/schema.prisma (read-only)…"
    if $PRISMA migrate diff --from-url "$DATABASE_URL" --to-schema-datamodel prisma/schema.prisma --exit-code --script; then
      echo "✓ No difference: nothing to apply."
    else
      code=$?
      [ "$code" = "2" ] && echo "⚠ The statements above would be applied by 'push'." || echo "✗ Could not compare (exit $code)." >&2
      exit "$code"
    fi
    ;;
  push)
    [ "$CONFIRM_DB_PUSH" = "yes" ] || { echo "Refusing: set CONFIRM_DB_PUSH=yes after reviewing 'check'." >&2; exit 1; }
    echo "→ Applying the schema (no --accept-data-loss)…"
    $PRISMA db push --skip-generate
    echo "✓ Schema applied."
    ;;
  *)
    echo "usage: sh scripts/db-setup.sh check | (CONFIRM_DB_PUSH=yes sh scripts/db-setup.sh push)" >&2
    exit 1
    ;;
esac
