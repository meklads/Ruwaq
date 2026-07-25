"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/shared/i18n/context";

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => {
        render: (selector: HTMLElement) => void;
      };
    };
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PAYPAL_SCRIPT_ID = "paypal-sdk-script";

export function UpgradeModal({ open, onClose, onSuccess }: Props) {
  const t = useT();
  const router = useRouter();
  const buttonsHostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  useEffect(() => {
    if (!open || !clientId) return;

    let cancelled = false;

    function renderButtons() {
      if (cancelled || !window.paypal || !buttonsHostRef.current) return;
      buttonsHostRef.current.innerHTML = "";
      window.paypal
        .Buttons({
          style: { layout: "vertical", label: "pay" },
          createOrder: async () => {
            setStatus("loading");
            const res = await fetch("/api/billing/paypal/create-order", {
              method: "POST",
            });
            const data = await res.json();
            if (!res.ok) {
              setStatus("error");
              throw new Error(data.error ?? "create-order failed");
            }
            setStatus("idle");
            return data.id;
          },
          onApprove: async (data: { orderID: string }) => {
            setStatus("loading");
            const res = await fetch("/api/billing/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });
            if (!res.ok) {
              setStatus("error");
              return;
            }
            setStatus("idle");
            onSuccess();
            router.refresh();
          },
          onError: () => setStatus("error"),
        })
        .render(buttonsHostRef.current);
    }

    const existing = document.getElementById(
      PAYPAL_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existing && window.paypal) {
      renderButtons();
    } else if (existing) {
      existing.addEventListener("load", renderButtons);
    } else {
      const script = document.createElement("script");
      script.id = PAYPAL_SCRIPT_ID;
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD`;
      script.addEventListener("load", renderButtons);
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
    };
  }, [open, clientId, onSuccess, router]);

  if (!open) return null;

  return (
    <div className="ruwaq-modal-overlay" role="dialog" aria-modal="true">
      <div className="ruwaq-modal-panel">
        <button
          type="button"
          onClick={onClose}
          className="ruwaq-modal-close"
          aria-label={t.upgrade.close}
        >
          ×
        </button>
        <h3 className="text-base font-semibold text-ruwaq-ink">
          {t.upgrade.title}
        </h3>
        <p className="mt-1 text-sm text-ruwaq-ink-muted">{t.upgrade.subtitle}</p>
        <p className="mt-3 text-2xl font-bold text-ruwaq-ink">
          {t.upgrade.price}
        </p>
        <p className="mt-1 text-xs text-ruwaq-ink-muted">{t.upgrade.priceNote}</p>

        {clientId ? (
          <div className="mt-4" ref={buttonsHostRef} />
        ) : (
          <p className="mt-4 text-sm text-amber-700">{t.upgrade.notConfigured}</p>
        )}

        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">{t.upgrade.error}</p>
        )}
      </div>
    </div>
  );
}
