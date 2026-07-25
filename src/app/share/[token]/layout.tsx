import type { ReactNode } from "react";

export default function ShareLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ruwaq-cream-bg via-white to-ruwaq-cream-bg/60">
      {children}
    </div>
  );
}
