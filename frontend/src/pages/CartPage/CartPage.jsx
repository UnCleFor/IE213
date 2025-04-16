import React, { useState } from "react";
import {
  Container,
  ProductList,
  ProductItem,
  ProductInfo,
  ProductName,
  ProductSKU,
  ProductPrice,
  QuantityControl,
  OrderSummary,
  OrderRow,
  TotalPrice,
  OrderButton,
  InvoiceCheckbox,
  ProductImage,
  PriceQuantityWrapper,
  ProductContent
} from "./style";

import pic from "./pic.png";

const CartPage = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Ethan - Sofa đơn",
      brand: "BEAUTEHOME",
      sku: "SFD-20-B-01",
      size: "800x750x750mm / Taupe Canvas",
      price: 4600000,
      quantity: 1,
      checked: false
    },
    {
      id: 2,
      name: "Ethan - Sofa đơn",
      brand: "BEAUTEHOME",
      sku: "SFD-20-B-01",
      size: "800x750x750mm / Taupe Canvas",
      price: 4600000,
      quantity: 1,
      checked: false
    }
  ];

  const [products, setProducts] = useState(initialProducts);

  const handleCheckboxChange = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const selectedProducts = products.filter((p) => p.checked);
  const total = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return (
    <Container>
      <ProductList>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <input
              type="checkbox"
              checked={product.checked}
              onChange={() => handleCheckboxChange(product.id)}
              style={{ marginRight: "8px", marginTop: "10px" }}
            />
            <ProductImage src={pic} alt={product.name} />
            <ProductContent>
              <ProductInfo>
                <p>{product.brand}</p>
                <ProductName>{product.name}</ProductName>
                <ProductSKU>
                  SKU: {product.sku}
                  <br />
                  {product.size}
                </ProductSKU>
                <a href="#">Xoá</a>
              </ProductInfo>

              <PriceQuantityWrapper>
                <QuantityControl>
                  <button>-</button>
                  <input type="text" value={product.quantity} readOnly />
                  <button>+</button>
                </QuantityControl>
                <ProductPrice>
                  {product.price.toLocaleString("vi-VN")}₫
                </ProductPrice>
              </PriceQuantityWrapper>
            </ProductContent>
          </ProductItem>
        ))}
      </ProductList>

      <OrderSummary>
        <h3>Thông tin đơn hàng</h3>
        {selectedProducts.length > 0 ? (
          <>
            <OrderRow>
              <span>Tạm tính ({selectedProducts.length} sản phẩm)</span>
              <span>{total.toLocaleString("vi-VN")}₫</span>
            </OrderRow>
            <p>
              Phí vận chuyển được tính ở trang thanh toán và bạn có thể nhập mã
              khuyến mãi ở trang thanh toán
            </p>
            <TotalPrice>
              <span>Tổng cộng</span>
              <span>{total.toLocaleString("vi-VN")}₫</span>
            </TotalPrice>
            <OrderButton>ĐẶT HÀNG</OrderButton>
          </>
        ) : (
          <p>Vui lòng chọn sản phẩm để xem thông tin đơn hàng.</p>
        )}
        <InvoiceCheckbox>
          <input type="checkbox" id="invoice" />
          <label htmlFor="invoice">Xuất Hóa Đơn</label>
        </InvoiceCheckbox>
      </OrderSummary>
    </Container>
  );
};

export default CartPage;
