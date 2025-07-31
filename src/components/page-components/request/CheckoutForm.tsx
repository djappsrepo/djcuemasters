import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CheckoutFormProps {
  requestId: string;
}

export function CheckoutForm({ requestId }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("¡Pago exitoso!");
          break;
        case "processing":
          setMessage("Tu pago se está procesando.");
          break;
        case "requires_payment_method":
          setMessage("El pago falló. Por favor, intenta con otro método de pago.");
          break;
        default:
          setMessage("Algo salió mal.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to the an absolute URL of your app
        return_url: `${window.location.origin}/payment-success?requestId=${requestId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Ocurrió un error inesperado.");
    } else {
      setMessage("Ocurrió un error inesperado.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button disabled={isLoading || !stripe || !elements} id="submit" className="w-full mt-4" variant="hero">
        <span id="button-text">
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Pagar ahora"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="text-center mt-2 text-sm text-destructive">{message}</div>}
    </form>
  );
}
