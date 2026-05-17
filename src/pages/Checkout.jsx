import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const field = (hasError) => ({
  width: "100%", border: "none", padding: "14px 0", fontFamily: "inherit",
  fontSize: "17px", fontWeight: 300, background: "transparent", outline: "none",
  borderBottom: hasError ? "1px solid #CC3300" : "none",
});

// Inner form that has access to Stripe hooks
function PaymentForm({ form, items, totalPrice, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    // Payment succeeded — save order to Supabase
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id:    user?.id ?? null,
        first_name: form.firstName,
        last_name:  form.lastName,
        address:    form.address,
        city:       form.city,
        zip:        form.zip,
        total:      totalPrice,
        status:     "paid",
      })
      .select()
      .single();

    if (!orderError) {
      await supabase.from("order_items").insert(
        items.map(item => ({
          order_id:  order.id,
          lamp_id:   item.id,
          lamp_name: item.name,
          price:     item.price,
          quantity:  item.quantity,
        }))
      );
    }

    clearCart();
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "28px" }}>
        <PaymentElement />
      </div>
      {error && <p style={{ color: "#CC3300", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{ width: "50%", backgroundColor: "#000", color: "#fff", border: "none", padding: "16px", fontFamily: "inherit", fontSize: "12px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "#8B4513"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#000"; }}>
          {loading ? "Processing…" : "Place Order"}
        </button>
      </div>
    </form>
  );
}

export default function Checkout() {
  const { items, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ firstName: "", lastName: "", address: "", city: "", zip: "" });
  const [errors, setErrors] = useState({});
  const [clientSecret, setClientSecret] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login", { state: { from: "/checkout" } });
  }, [user]);

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: false }));
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = true;
    if (!form.lastName.trim())  e.lastName  = true;
    if (!form.address.trim())   e.address   = true;
    if (!form.city.trim())      e.city      = true;
    if (!form.zip.trim())       e.zip       = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleContinueToPayment() {
    if (!validate()) return;

    const { data, error } = await supabase.functions.invoke("create-payment-intent", {
      body: { amount: totalPrice },
    });

    if (error || !data?.clientSecret) {
      console.error("Payment init error:", error, "data:", data);
      alert(`Payment error: ${error?.message || error?.context?.message || JSON.stringify(error) || "no clientSecret returned"}`);
      return;
    }

    setClientSecret(data.clientSecret);
  }

  if (success) return (
    <main style={{ flex: 1, paddingTop: "80px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 80px)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "clamp(32px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "16px" }}>Order Placed.</div>
        <div style={{ fontSize: "14px", fontWeight: 300, opacity: 0.5, marginBottom: "40px" }}>Thank you — your lamp is on its way.</div>
        <button onClick={() => navigate("/")}
          style={{ backgroundColor: "#000", color: "#fff", border: "none", padding: "16px 40px", fontFamily: "inherit", fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
          Back to Shop
        </button>
      </div>
    </main>
  );

  return (
    <main style={{ flex: 1, paddingTop: "80px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 80px)" }}>
      <div style={{ width: "100%", maxWidth: "600px", padding: "60px 40px" }}>

        {/* Shipping */}
        {!clientSecret && <>
          <div style={{ fontSize: "13px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "28px", textAlign: "center" }}>Shipping</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 28px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", opacity: errors.firstName ? 1 : 0.4, color: errors.firstName ? "#CC3300" : "inherit", display: "block", marginBottom: "4px" }}>First Name{errors.firstName && " — required"}</label>
              <input style={field(errors.firstName)} value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="—" />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", opacity: errors.lastName ? 1 : 0.4, color: errors.lastName ? "#CC3300" : "inherit", display: "block", marginBottom: "4px" }}>Last Name{errors.lastName && " — required"}</label>
              <input style={field(errors.lastName)} value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="—" />
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", opacity: errors.address ? 1 : 0.4, color: errors.address ? "#CC3300" : "inherit", display: "block", marginBottom: "4px" }}>Address{errors.address && " — required"}</label>
              <input style={field(errors.address)} value={form.address} onChange={e => set("address", e.target.value)} placeholder="—" />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", opacity: errors.city ? 1 : 0.4, color: errors.city ? "#CC3300" : "inherit", display: "block", marginBottom: "4px" }}>City{errors.city && " — required"}</label>
              <input style={field(errors.city)} value={form.city} onChange={e => set("city", e.target.value)} placeholder="—" />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", opacity: errors.zip ? 1 : 0.4, color: errors.zip ? "#CC3300" : "inherit", display: "block", marginBottom: "4px" }}>ZIP{errors.zip && " — required"}</label>
              <input style={field(errors.zip)} value={form.zip} onChange={e => set("zip", e.target.value)} placeholder="—" />
            </div>
          </div>

          <div style={{ borderTop: "1px solid #2C1810", margin: "32px 0", opacity: 0.15 }} />

          <div style={{ fontSize: "13px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}>Order Summary</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {items.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 300 }}>
                <span>{item.name}{item.quantity > 1 && <span style={{ opacity: 0.5 }}> ×{item.quantity}</span>}</span>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: "14px", marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4 }}>Order Total</div>
            <div style={{ fontSize: "clamp(14px, 2vw, 24px)", fontWeight: 900, letterSpacing: "-0.03em" }}>${totalPrice.toLocaleString()}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleContinueToPayment}
              style={{ width: "50%", backgroundColor: "#000", color: "#fff", border: "none", padding: "16px", fontFamily: "inherit", fontSize: "12px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#8B4513"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#000"}>
              Continue to Payment
            </button>
          </div>
        </>}

        {/* Payment */}
        {clientSecret && <>
          <div style={{ fontSize: "13px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "28px", textAlign: "center" }}>Payment</div>
          <div style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between", fontSize: "13px", opacity: 0.5 }}>
            <span>Order Total</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <div style={{ borderTop: "1px solid #2C1810", margin: "16px 0 28px", opacity: 0.15 }} />
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm
              form={form}
              items={items}
              totalPrice={totalPrice}
              onSuccess={() => setSuccess(true)}
            />
          </Elements>
          <button onClick={() => setClientSecret(null)}
            style={{ marginTop: "16px", background: "none", border: "none", fontFamily: "inherit", fontSize: "11px", opacity: 0.4, cursor: "pointer", textDecoration: "underline" }}>
            ← Back to shipping
          </button>
        </>}

      </div>
    </main>
  );
}
