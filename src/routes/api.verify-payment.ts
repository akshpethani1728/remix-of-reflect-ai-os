import { createFileRoute } from "@tanstack/react-router";
import { createHmac } from "crypto";

export const Route = createFileRoute("/api/verify-payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature, planName } = body;

          if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return Response.json({ error: "Missing payment verification details" }, { status: 400 });
          }

          const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
          const expected = createHmac("sha256", keySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

          if (expected !== razorpay_signature) {
            return Response.json({ error: "Invalid signature" }, { status: 400 });
          }

          console.log("Payment verified:", { razorpay_payment_id, planName });
          return Response.json({ success: true, paymentId: razorpay_payment_id });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Payment verification failed" },
            { status: 500 }
          );
        }
      },
    },
  },
});
