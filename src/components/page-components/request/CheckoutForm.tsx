import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCheckoutForm } from "@/hooks/payment/use-checkout-form";

interface CheckoutFormProps {
  requestId: string;
  clientSecret: string; // clientSecret is still needed by StripeProvider
}

export function CheckoutForm({ requestId }: CheckoutFormProps) {
  const { stripe, elements, message, isLoading, handleSubmit } = useCheckoutForm(requestId);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Completa tu Pago</h3>
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="my-4">
          <PaymentElement id="payment-element" />
        </div>
        <Button disabled={isLoading || !stripe || !elements} id="submit" className="w-full" variant="hero">
          <span id="button-text">
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Pagar ahora"}
          </span>
        </Button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className="text-center mt-2 text-sm text-destructive">{message}</div>}
      </form>
    </div>
  );
}
