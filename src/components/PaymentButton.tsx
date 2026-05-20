import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler?: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
    hide_topbar?: boolean;
  };
  modal?: {
    confirm_close?: boolean;
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open(): void;
  close(): void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface PaymentButtonProps {
  amount: number;
  planName: string;
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  onSuccess?: (paymentId: string, orderId: string) => void;
  onFailure?: (error: string) => void;
}

// Replace with your Razorpay Key ID
const RAZORPAY_KEY_ID = "rzp_live_Srdw366RmtUhU";

export function PaymentButton({ amount, planName, userData, onSuccess, onFailure }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const razorpayLoaded = useRef(false);

  const loadRazorpay = () => {
    return new Promise<void>((resolve) => {
      if (window.Razorpay) {
        razorpayLoaded.current = true;
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        razorpayLoaded.current = true;
        resolve();
      };
      script.onerror = () => {
        setError("Failed to load Razorpay. Please try again.");
        resolve();
      };
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    // Create order via Razorpay API
    // In production, call your server endpoint that creates order securely
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${RAZORPAY_KEY_ID}:${import.meta.env.VITE_RAZORPAY_KEY_SECRET || "your_secret"}`)}`,
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          plan: planName,
          customer: userData.name,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    const data = await response.json();
    return data.id;
  };

  const initiatePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      await loadRazorpay();

      // Create order
      const orderId = await createOrder();

      // Open Razorpay checkout
      const razorpayOptions: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Reflect",
        description: `${planName} Plan - Monthly`,
        order_id: orderId,
        handler: (response) => {
          onSuccess?.(response.razorpay_payment_id, response.razorpay_order_id);
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },
        theme: {
          color: "#5B4BFF",
        },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <motion.button
        onClick={initiatePayment}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? "none" : "0 0 40px -10px oklch(0.68 0.16 162/0.5)" }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className={`w-full rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-medium text-background shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed ${
          loading ? "cursor-wait" : ""
        }`}
      >
        {loading ? (
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Processing...
          </motion.span>
        ) : (
          <>Pay ₹{amount.toLocaleString("en-IN")}/month →</>
        )}
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-muted-foreground">
        🔒 Secure payment powered by Razorpay
      </p>
    </div>
  );
}

// Success Page Component
export function PaymentSuccess({ paymentId, planName }: { paymentId: string; planName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100 text-4xl dark:bg-green-900"
      >
        ✓
      </motion.div>
      <h2 className="mb-2 text-2xl font-bold">Payment Successful!</h2>
      <p className="mb-4 text-muted-foreground">
        Thank you for subscribing to the {planName} plan.
      </p>
      <div className="glass rounded-xl p-4 text-sm">
        <p className="text-muted-foreground">Transaction ID</p>
        <p className="font-mono text-foreground">{paymentId}</p>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        We'll contact you within 24 hours to start your onboarding.
      </p>
    </motion.div>
  );
}

// Failure Page Component
export function PaymentFailure({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-red-100 text-4xl dark:bg-red-900"
      >
        ✕
      </motion.div>
      <h2 className="mb-2 text-2xl font-bold">Payment Failed</h2>
      <p className="mb-4 text-muted-foreground">{error}</p>
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
      >
        Try Again
      </motion.button>
    </motion.div>
  );
}

// Payment Modal Component
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    monthly: number;
    yearly: number;
  };
  userData: {
    name: string;
    email: string;
    phone: string;
  };
}

export function PaymentModal({ isOpen, onClose, plan, userData }: PaymentModalProps) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const handleSuccess = (id: string) => {
    setPaymentId(id);
    setPaymentSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong m-4 max-w-md rounded-3xl p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>

            {paymentSuccess ? (
              <PaymentSuccess paymentId={paymentId} planName={plan.name} />
            ) : (
              <>
                <h3 className="mb-2 text-xl font-semibold">Subscribe to {plan.name}</h3>
                <p className="mb-6 text-muted-foreground">
                  Pay ₹{plan.monthly.toLocaleString("en-IN")}/month to get started
                </p>
                <PaymentButton
                  amount={plan.monthly}
                  planName={plan.name}
                  userData={userData}
                  onSuccess={handleSuccess}
                  onFailure={(err) => console.error(err)}
                />
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}