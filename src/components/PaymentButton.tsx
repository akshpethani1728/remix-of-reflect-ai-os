import { useState } from "react";
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
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string; hide_topbar?: boolean };
  modal?: { confirm_close?: boolean; ondismiss?: () => void };
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

interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface PaymentButtonProps {
  amount: number;
  planName: string;
  userData: UserData;
  onSuccess?: (paymentId: string, orderId: string) => void;
  onFailure?: (error: string) => void;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PaymentButton({ amount, planName, userData, onSuccess, onFailure }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const ok = await loadRazorpayScript();
      if (!ok) throw new Error("Could not load payment gateway. Check your connection.");

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100, currency: "INR", planName }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create order");
      }

      const { orderId, keyId } = await res.json();

      const rzp = new window.Razorpay({
        key: keyId,
        amount: amount * 100,
        currency: "INR",
        name: "Reflect",
        description: `${planName} Plan - Monthly`,
        order_id: orderId,
        handler: async (response) => {
          try {
            await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                planName,
              }),
            });
          } catch (e) {
            console.error("Verification failed:", e);
          }
          onSuccess?.(response.razorpay_payment_id, response.razorpay_order_id);
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },
        theme: { color: "#5B4BFF" },
        modal: {
          confirm_close: true,
          ondismiss: () => setLoading(false),
        },
      });

      rzp.open();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Payment failed. Please try again.";
      setError(msg);
      onFailure?.(msg);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <motion.button
        onClick={initiatePayment}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-medium text-background shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : <>Pay ₹{amount.toLocaleString("en-IN")} →</>}
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-red-500/10 p-3 text-sm text-red-500"
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

export function PaymentSuccess({ paymentId, planName }: { paymentId: string; planName: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-500/15 text-4xl text-green-500"
      >
        ✓
      </motion.div>
      <h2 className="mb-2 text-2xl font-bold">Payment Successful!</h2>
      <p className="mb-4 text-muted-foreground">Thank you for subscribing to the {planName} plan.</p>
      <div className="glass rounded-xl p-4 text-sm">
        <p className="text-muted-foreground">Transaction ID</p>
        <p className="font-mono text-foreground break-all">{paymentId}</p>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        We'll contact you within 24 hours to start your onboarding.
      </p>
    </motion.div>
  );
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: { name: string; monthly: number; yearly: number };
  yearly?: boolean;
}

export function PaymentModal({ isOpen, onClose, plan, yearly = false }: PaymentModalProps) {
  const [step, setStep] = useState<"details" | "pay" | "success">("details");
  const [userData, setUserData] = useState<UserData>({ name: "", email: "", phone: "" });
  const [paymentId, setPaymentId] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const amount = yearly ? plan.yearly : plan.monthly;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!userData.name.trim()) return setFormError("Please enter your name");
    if (!/^\S+@\S+\.\S+$/.test(userData.email)) return setFormError("Enter a valid email");
    if (!/^\d{10}$/.test(userData.phone.replace(/\D/g, "").slice(-10)))
      return setFormError("Enter a valid 10-digit phone number");
    setStep("pay");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("details");
      setUserData({ name: "", email: "", phone: "" });
      setPaymentId("");
      setFormError(null);
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative w-full max-w-md rounded-3xl p-8"
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>

            {step === "success" ? (
              <>
                <PaymentSuccess paymentId={paymentId} planName={plan.name} />
                <button
                  onClick={handleClose}
                  className="mt-6 w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
                >
                  Done
                </button>
              </>
            ) : step === "details" ? (
              <form onSubmit={handleContinue}>
                <h3 className="mb-1 text-xl font-semibold">Subscribe to {plan.name}</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  ₹{amount.toLocaleString("en-IN")} {yearly ? "/year" : "/month"}
                </p>

                <div className="space-y-4">
                  <Field
                    label="Full name"
                    type="text"
                    value={userData.name}
                    onChange={(v) => setUserData({ ...userData, name: v })}
                    placeholder="Your name"
                    autoFocus
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={userData.email}
                    onChange={(v) => setUserData({ ...userData, email: v })}
                    placeholder="you@example.com"
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={userData.phone}
                    onChange={(v) => setUserData({ ...userData, phone: v })}
                    placeholder="10-digit mobile number"
                  />
                </div>

                {formError && (
                  <p className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-500">{formError}</p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-medium text-background shadow-lg shadow-primary/25"
                >
                  Continue to Payment →
                </motion.button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  We'll only use this to set up your account.
                </p>
              </form>
            ) : (
              <>
                <h3 className="mb-1 text-xl font-semibold">Confirm payment</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  {plan.name} plan • ₹{amount.toLocaleString("en-IN")} {yearly ? "/year" : "/month"}
                </p>
                <div className="mb-6 space-y-1 rounded-2xl bg-foreground/5 p-4 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {userData.name}</p>
                  <p><span className="text-muted-foreground">Email:</span> {userData.email}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {userData.phone}</p>
                  <button
                    onClick={() => setStep("details")}
                    type="button"
                    className="mt-2 text-xs text-primary hover:underline"
                  >
                    Edit details
                  </button>
                </div>
                <PaymentButton
                  amount={amount}
                  planName={plan.name}
                  userData={userData}
                  onSuccess={(id) => {
                    setPaymentId(id);
                    setStep("success");
                  }}
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

function Field({
  label,
  value,
  onChange,
  type,
  placeholder,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required
        className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
