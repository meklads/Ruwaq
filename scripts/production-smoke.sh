#!/usr/bin/env sh
# Production smoke test — no secrets required.
# Usage: ./scripts/production-smoke.sh [base_url]

BASE="${1:-https://ruwaq.co}"
PASS=0
FAIL=0

check() {
  name="$1"
  url="$2"
  expect="$3"
  code=$(curl -sS -o /tmp/ruwaq-smoke-body.txt -w "%{http_code}" "$url")
  if [ "$code" = "$expect" ]; then
    echo "✓ $name — HTTP $code"
    PASS=$((PASS + 1))
  else
    echo "✗ $name — HTTP $code (expected $expect)"
    FAIL=$((FAIL + 1))
  fi
}

echo "Ruwaq production smoke — $BASE"
echo "================================"

check "Homepage" "$BASE/" "200"
check "Login" "$BASE/login" "200"
check "Request quote" "$BASE/request-quote" "200"
check "Join" "$BASE/join" "200"
check "Pro directory" "$BASE/pro" "200"
check "Sample PDF API" "$BASE/api/templates/ruwaq/sample/pdf?locale=ar&lines=5" "200"

echo ""
echo "Health / integrations:"
curl -sS "$BASE/api/health" | npx --yes json_pp 2>/dev/null || curl -sS "$BASE/api/health"
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo "FAILED: $FAIL check(s), passed $PASS"
  exit 1
fi

echo "PASSED: $PASS checks"
exit 0
