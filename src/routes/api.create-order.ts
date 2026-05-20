import { createFileRoute } from "@tanstack/react-router";

async function createRazorpayOrder(amount: number, currency: string, planName: string) {
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
    },
    body: JSON.stringify({
      amount,
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: { plan: planName },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.description || "Failed to create order");
  }

  const data = await response.json();
  return { orderId: data.id, keyId, amount: data.amount, currency: data.currency };
}

export const Route = createFileRoute("/api/create-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { amount, currency, planName } = body;
          if (!amount || !planName) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
          }
          const orderData = await createRazorpayOrder(amount, currency || "INR", planName);
          return Response.json(orderData);
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Failed to create order" },
            { status: 500 }
          );
        }
      },
    },
  },
});
