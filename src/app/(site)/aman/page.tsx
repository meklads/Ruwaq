import { redirect } from "next/navigation";

// Ruwaq Aman (technical inspection and payment oversight) is paused.
// The site now offers commercial owner advice only; technical work is
// handed to a licensed office outside the website.
export default function AmanPage() {
  redirect("/check");
}
