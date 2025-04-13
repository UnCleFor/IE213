import React from "react";
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

import pic from "./pic.png"

const CartPage = () => {
  return (
    <Container>
      <ProductList>
        <ProductItem>
          <ProductImage src={pic} alt="Sofa đơn" />
          <ProductContent>
            <ProductInfo>
              <p>BEAUTEHOME</p>
              <ProductName>Ethan - Sofa đơn</ProductName>
              <ProductSKU>
                SKU: SFD-20-B-01<br />
                800x750x750mm / Taupe Canvas
              </ProductSKU>
              <a href="#">Xoá</a>
            </ProductInfo>

            <PriceQuantityWrapper>
              <QuantityControl>
                <button>-</button>
                <input type="text" value="1" readOnly />
                <button>+</button>
              </QuantityControl>
              <ProductPrice>4,600,000₫</ProductPrice>
            </PriceQuantityWrapper>
          </ProductContent>
        </ProductItem>

        <ProductItem>
          <ProductImage src={pic} alt="Sofa đơn" />
          <ProductContent>
            <ProductInfo>
              <p>BEAUTEHOME</p>
              <ProductName>Ethan - Sofa đơn</ProductName>
              <ProductSKU>
                SKU: SFD-20-B-01<br />
                800x750x750mm / Taupe Canvas
              </ProductSKU>
              <a href="#">Xoá</a>
            </ProductInfo>

            <PriceQuantityWrapper>
              <QuantityControl>
                <button>-</button>
                <input type="text" value="1" readOnly />
                <button>+</button>
              </QuantityControl>
              <ProductPrice>4,600,000₫</ProductPrice>
            </PriceQuantityWrapper>
          </ProductContent>
        </ProductItem>
      </ProductList>

      <OrderSummary>
        <h3>Thông tin đơn hàng</h3>
        <OrderRow>
          <span>Tạm tính (2 sản phẩm)</span>
          <span>13,000,000₫</span>
        </OrderRow>
        <p>Phí vận chuyển được tính ở trang thanh toán và bạn có thể nhập mã khuyến mãi ở trang thanh toán</p>
        <TotalPrice>
          <span>Tổng cộng</span>
          <span>13,000,000₫</span>
        </TotalPrice>
        <OrderButton>ĐẶT HÀNG</OrderButton>
        <InvoiceCheckbox>
          <input type="checkbox" id="invoice" />
          <label htmlFor="invoice">Xuất Hóa Đơn</label>
        </InvoiceCheckbox>
      </OrderSummary>
    </Container>
  );
};

export default CartPage;
