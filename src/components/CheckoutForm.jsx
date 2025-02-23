import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCreateCheckoutSessionMutation } from "../lib/api";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ cartItems }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [sessionUrl, setSessionUrl] = useState(null);
  const location = useLocation();
  const shippingAddress = location.state?.shippingAddress;

  const [createCheckoutSession, { isLoading, error }] =
    useCreateCheckoutSessionMutation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered - cartItems:", cartItems, "shippingAddress:", shippingAddress);
    if (cartItems.length > 0 && shippingAddress.line_1) {
      handleCheckout();
    }
  }, [cartItems, shippingAddress]);

  const handleCheckout = async () => {
    console.log("Initiating Checkout...");
    try {
      const { data, error } = await createCheckoutSession({
        items: cartItems,
        shippingAddress,
      });

      console.log("API Response:", data, "Error:", error);

      if (error) {
        console.error("Checkout session error:", error);
        return;
      }

      if (data?.clientSecret) {
        setClientSecret(data.clientSecret);
        console.log("Client Secret received:", data.clientSecret);
      } else if (data?.url) {
        setSessionUrl(data.url);
        console.log("Session URL received:", data.url);
      }
    } catch (err) {
      console.error("Error initiating checkout:", err);
    }
  };

  return (
    <div id="checkout" className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : clientSecret ? (
        <>
          <p>Client Secret Found! Rendering Payment Form...</p>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm
              onSuccess={() => navigate("/shop/complete")}
              clientSecret={clientSecret}
            />
          </Elements>
        </>
      ) : sessionUrl ? (
        <a href={sessionUrl} className="text-blue-500 underline">
          Proceed to Checkout
        </a>
      ) : (
        error && (
          <p className="text-red-500">
            Error: {error.data?.message || "Failed to create checkout session."}
          </p>
        )
      )}
    </div>
  );
};

export default CheckoutForm;
