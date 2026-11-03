# Deploying Ruwaq (website)

## What starting the app does
`npm start` → `scripts/start.sh` only starts the web server. It does **not** run `prisma db push`,
migrations or the seed. (Before 2026-11-03 it ran `db push` and the marketplace seed on every start;
the seed deletes listings and leads that are not in its lists and adds demonstration providers, so
it must not run by itself.) Clause packs are created on demand by the app.

## Changing the database (deliberate, separate step)
This project has no `prisma/migrations` history; it has always used `db push`. Until a migrations
history is adopted (needs its own plan and a baseline of the live database), use:

```
sh scripts/db-setup.sh check                      # read-only: what would change? exit 0 = nothing
CONFIRM_DB_PUSH=yes sh scripts/db-setup.sh push   # applies it; never uses --accept-data-loss
```
Run them in the application's terminal in Coolify, with the live `DATABASE_URL`, only when
`prisma/schema.prisma` changed and `check` shows what you expect. Take a database backup first.

The schema in `main` equals the schema of the version deployed on 2026-11-03, so the next deploy needs no database step.

## Seed
`prisma/seed.ts` refuses to run against a non-local or production database unless
`ALLOW_PRODUCTION_SEED=yes` is set. Do not set it on the live database.

## Radar link
`RADAR_APP_URL` (https address of the Radar app) is read at runtime. «دخول المشتركين» (`/subscribers`)
redirects to `${RADAR_APP_URL}/sign-in`; unset or unsafe addresses show an explanatory page instead.
