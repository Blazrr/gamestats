import { loadStripe } from "@stripe/stripe-js";

interface Props {
  lineItems: any;
}

export async function checkout({ lineItems }: Props) {
  let stripePromise: any = null;

  const getStripe = () => {
    if (!stripePromise) {
      //@ts-ignore

      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
    }

    return stripePromise;
  };
  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
    
  });
}
