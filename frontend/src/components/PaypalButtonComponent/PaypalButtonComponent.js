import { useEffect, useRef, useState } from "react";

const PayPalButtonComponent = ({ amount, onSuccess }) => {
  // Tham chiếu tới DOM element nơi nút PayPal sẽ được render
  const paypalRef = useRef();
  // Trạng thái kiểm tra SDK của PayPal đã sẵn sàng hay chưa
  const [sdkReady, setSdkReady] = useState(false);
  // useEffect để thêm script SDK của PayPal vào trang nếu chưa có
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

  // useEffect để khởi tạo nút PayPal sau khi SDK sẵn sàng
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
          // Xử lý khi thanh toán thành công
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              console.log("Transaction completed by " + details.payer.name.given_name);
              onSuccess(details);
            });
          },
           // Xử lý khi có lỗi xảy ra trong quá trình thanh toán
          onError: err => {
            console.error("PayPal Checkout onError", err);
          },
        })
        // Render nút PayPal vào phần tử được tham chiếu
        .render(paypalRef.current);
    }
  }, [sdkReady, amount, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButtonComponent;
