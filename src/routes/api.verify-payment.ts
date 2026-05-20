import { createApiRoute } from "@tanstack/react-start/api";

// Razorpay payment verification
// In production, use environment variable: RAZORPAY_KEY_SECRET

async function verifyRazorpayPayment(
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
) {
  const keySecret = "razorpay_key_secret"; // Replace with env.RAZORPAY_KEY_SECRET in production

  const payload = {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  };

  const response = await fetch("https://api.razorpay.com/v1/payments/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`:${keySecret}`)}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.description || "Failed to verify payment");
  }

  const data = await response.json();
  return data.payment; // Contains payment status
}

export const Route = createApiRoute(async ({ request }) => {
  try {
    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, planName, userData } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: "Missing payment verification details" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify payment with Razorpay
    const paymentResult = await verifyRazorpayPayment(
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );

    if (paymentResult.status === "authorized") {
      // In production: Store successful payment in your database
      // Send confirmation email to user
      // Start onboarding process

      console.log("Payment verified successfully:", {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        planName,
        userData,
        status: paymentResult.status,
      });

      return new Response(
        JSON.stringify({
          success: true,
          paymentId: razorpay_payment_id,
          status: paymentResult.status,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Payment verification failed", status: paymentResult.status }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Payment verification failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});