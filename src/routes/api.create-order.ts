import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/create-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const keyId = process.env.RAZORPAY_KEY_ID;
          const keySecret = process.env.RAZORPAY_KEY_SECRET;
          if (!keyId || !keySecret) {
            return Response.json({ error: "Payment gateway not configured" }, { status: 500 });
          }

          const body = await request.json();
          const { amount, currency, planName } = body;
          if (!amount || !planName) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
          }

          const res = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
            },
            body: JSON.stringify({
              amount,
              currency: currency || "INR",
              receipt: `receipt_${Date.now()}`,
              notes: { plan: planName },
            }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return Response.json(
              { error: err.error?.description || "Failed to create order" },
              { status: 500 }
            );
          }

          const data = await res.json();
          return Response.json({
            orderId: data.id,
            keyId,
            amount: data.amount,
            currency: data.currency,
          });
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
