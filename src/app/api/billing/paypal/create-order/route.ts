import { NextResponse } from "next/server";
import { getSession } from "@/modules/auth/server/session";
import { createPremiumTemplatesOrder, isPaypalConfigured } from "@/modules/billing/server/paypal.service";

export async function POST() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!isPaypalConfigured()) {
      return NextResponse.json(
        { error: "Payments are not configured yet. Contact hello@turriva.co." },
        { status: 503 }
      );
    }

    const orderId = await createPremiumTemplatesOrder(session.user.id);
    return NextResponse.json({ id: orderId });
  } catch (error) {
    console.error("[paypal] create-order error:", error);
    return NextResponse.json(
      { error: "Failed to start payment. Try again." },
      { status: 500 }
    );
  }
}
