import { createFileRoute } from "@tanstack/react-router";

async function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const payload = `${orderId}|${paymentId}`;
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(payload));
  const expected = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return expected === signature;
}

export const Route = createFileRoute("/api/verify-payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const secret = process.env.RAZORPAY_KEY_SECRET;
          if (!secret) {
            return Response.json({ error: "Payment gateway not configured" }, { status: 500 });
          }

          const body = await request.json();
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature, planName } = body;

          if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return Response.json({ error: "Missing payment verification details" }, { status: 400 });
          }

          const isValid = await verifyPaymentSignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            secret
          );

          if (!isValid) {
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
