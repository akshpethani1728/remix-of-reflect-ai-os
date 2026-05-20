import { createApiRoute } from "@tanstack/react-start/api";
import { getRouter } from "../router";

// Razorpay API integration
// In production, use environment variables: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET

async function createRazorpayOrder(amount: number, currency: string, planName: string) {
  const keyId = "razorpay_key_id"; // Replace with env.RAZORPAY_KEY_ID in production
  const keySecret = "razorpay_key_secret"; // Replace with env.RAZORPAY_KEY_SECRET in production

  const payload = {
    amount,
    currency,
    receipt: `receipt_${Date.now()}`,
    notes: {
      plan: planName,
    },
  };

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.description || "Failed to create order");
  }

  const data = await response.json();
  return {
    orderId: data.id,
    keyId: keyId,
    amount: data.amount,
    currency: data.currency,
  };
}

export const Route = createApiRoute(async ({ request }) => {
  try {
    const body = await request.json();
    const { amount, currency, planName, userData } = body;

    if (!amount || !planName) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const orderData = await createRazorpayOrder(amount, currency || "INR", planName);

    // In production, store order with userData in your database
    console.log("Order created:", {
      orderId: orderData.orderId,
      planName,
      userData,
      amount,
    });

    return new Response(JSON.stringify(orderData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to create order" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});