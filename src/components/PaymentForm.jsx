import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

const PaymentForm = ({ onSuccess, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  console.log("Rendering PaymentForm...");
  console.log("Stripe:", stripe, "Elements:", elements, "Client Secret:", clientSecret);

  if (!stripe || !elements) {
    return <p>Loading payment form...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    setIsProcessing(false);

    if (error) {
      setError(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
      <label className="block mb-2 font-semibold">Card Details</label>
      <div className="p-3 border rounded-md">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <Button type="submit" className="w-full mt-4" disabled={isProcessing || !stripe}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default PaymentForm;
