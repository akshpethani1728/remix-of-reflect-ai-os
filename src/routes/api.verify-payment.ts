import { createFileRoute } from "@tanstack/react-router";

// Razorpay credentials - replace with your actual keys
const RAZORPAY_KEY_SECRET = "OSCYg0k3sshgGAQ38H20F08P";

async function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): Promise<boolean> {
  const payload = `${orderId}|${paymentId}`;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(RAZORPAY_KEY_SECRET);
  const messageData = encoder.encode(payload);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  return expectedSignature === signature;
}

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

          const isValid = await verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

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