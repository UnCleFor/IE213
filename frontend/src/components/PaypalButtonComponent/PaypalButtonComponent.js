import { useEffect, useRef, useState } from "react";

const PayPalButtonComponent = ({ amount, onSuccess }) => {
  const paypalRef = useRef();
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPaypalScript = async () => {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AdvdqocMkMapIW_CU5xdbNgZTWKjBS0RV7huQb_vqhed1RPUT6dNffLxv0GwdPkoUiZKw4pTfR69JdJv&currency=USD";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  useEffect(() => {
    if (sdkReady) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount,
                },
              }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              console.log("Transaction completed by " + details.payer.name.given_name);
              onSuccess(details);
            });
          },
          onError: err => {
            console.error("PayPal Checkout onError", err);
          },
        })
        .render(paypalRef.current);
    }
  }, [sdkReady, amount, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButtonComponent;
