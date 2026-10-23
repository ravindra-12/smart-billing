"use client";

import { useEffect, useRef } from "react";

const PAYMENT_BUTTON_ID = "pl_TrFyxdi0X5wg40";

type RazorpayPaymentButtonProps = {
  className?: string;
};

/** Razorpay's hosted payment button. */
export default function RazorpayPaymentButton({ className }: RazorpayPaymentButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.dataset.payment_button_id = PAYMENT_BUTTON_ID;
    form.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <form ref={formRef} className={className} />;
}
