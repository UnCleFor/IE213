// Hàm kiểm tra xem chuỗi có phải là JSON hợp lệ không
export const isJsonString = (data) => {
  try {
    JSON.parse(data)
  } catch (error) {
    console.error("❌ JSON.parse lỗi với:", data)
    return false
  }
  return true
}

// Hàm tạo item menu (thường dùng cho thư viện antd Menu)
export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// Hàm chuyển đổi file sang base64
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Hàm khởi tạo Facebook SDK để sử dụng các chức năng của Facebook
export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";

    // Hàm khởi tạo FB SDK
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID, 
      cookie: true,
      xfbml: true, 
      version: "v8.0"
    });
  };

  // Load SDK Facebook bất đồng bộ
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

// Hàm định dạng giá tiền VNĐ (thêm dấu chấm phân cách và đơn vị)
export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
    return `${result} VNĐ`
  } catch (error) {
    return null
  }
}

// Hàm chuyển đổi VNĐ sang USD (tỷ giá cố định)
export const convertVNDToUSD = (vnd) => {
  const exchangeRate = 25000; 
  return (vnd / exchangeRate).toFixed(2);
};