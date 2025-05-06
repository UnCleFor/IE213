import { error } from "./components/Message/Message";

export const isJsonString = (data) => {
  try {
    console.log("📌 isJsonString - dữ liệu truyền vào:", data)
    JSON.parse(data)
  } catch (error) {
    console.error("❌ JSON.parse lỗi với:", data)
    return false
  }
  return true
}

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID, // You App ID
      cookie: true, // enable cookies to allow the server to access
      // the session
      xfbml: true,  // parse social plugins on this page
      version: "v8.0" // use version 2.1
    });
  };

  // Load the SDK asynchronously
  (function (d, s, id) {
    console.log(s);
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
    return `${result} VNĐ`
  } catch (error) {
    return null
  }
}

export const convertVNDToUSD = (vnd) => {
  const exchangeRate = 25000; // hoặc dùng tỷ giá thực nếu bạn có API
  return (vnd / exchangeRate).toFixed(2); // làm tròn 2 chữ số thập phân
};