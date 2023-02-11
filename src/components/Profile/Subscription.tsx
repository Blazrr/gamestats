import { checkout } from "hooks/useCheckout";
import React from "react";

type Props = {};

const Subscription = (props: Props) => {
  return (
    <div className="flex space-x-10">
      <div className="card p-8 bg-purple-300 rounded-md">
        <h1>article 1</h1>
        <button
        className="btn"
        onClick={() => {
          checkout({
            lineItems: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_KEY, quantity: 1 }],
          });
        }}
      >
        buy
      </button>
      </div>


    </div>
  );
};

export default Subscription;
