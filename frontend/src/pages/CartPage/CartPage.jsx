import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TableWrapper,
  OrderSummary,
  OrderRow,
  TotalPrice,
  OrderButton,
  InvoiceCheckbox,
  QuantityWrapper,
  QuantityButton,
  QuantityInput,
  ScrollHint,
  EmptyCartWrapper,
  ContinueButton,
  DeleteText
} from "./style";
import pic from "./pic.png";
import TableComponent from "../../components/TableComponent/TableComponent";

const CartPage = () => {
  const navigate = useNavigate();

  const initialProducts = [
    {
      id: 1,
      name: "Ethan - Sofa đơn",
      brand: "BEAUTEHOME",
      sku: "SFD-20-B-01",
      size: "800x750x750mm / Taupe Canvas",
      price: 4600000,
      quantity: 1,
    },
    {
      id: 2,
      name: "Ethan - Sofa đơn",
      brand: "BEAUTEHOME",
      sku: "SFD-20-B-01",
      size: "800x750x750mm / Taupe Canvas",
      price: 4600000,
      quantity: 1,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [quantityInput, setQuantityInput] = useState({});

  const handleQuantityChange = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(1, p.quantity + delta) }
          : p
      )
    );
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedRowKeys((prev) => prev.filter((key) => key !== id));
    setQuantityInput((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (products.length === 0) {
    return (
      <EmptyCartWrapper>
        <h2>🛒 Giỏ hàng của bạn đang trống</h2>
        <p style={{ marginTop: "12px", color: "#888" }}>
          Hãy thêm sản phẩm để bắt đầu mua sắm!
        </p>
        <ContinueButton onClick={handleContinueShopping}>
          Tiếp tục mua sắm
        </ContinueButton>
      </EmptyCartWrapper>
    );
  }

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      align: "center",
      render: (_, record) => (
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", gap: "16px" }}>
            <img
              src={pic}
              alt={record.name}
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>{record.brand}</p>
              <div>{record.name}</div>
              <div style={{ fontSize: "13px", color: "#666" }}>
                SKU: {record.sku}
                <br />
                {record.size}
              </div>
              <DeleteText onClick={() => handleDelete(record.id)}>
                  Xoá
              </DeleteText>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      align: "center",
      render: (_, record) => (
        <QuantityWrapper>
          <QuantityButton
            onClick={() => handleQuantityChange(record.id, -1)}
            disabled={record.quantity <= 1}
          >
            −
          </QuantityButton>
          <QuantityInput
            type="number"
            value={
              quantityInput[record.id] !== undefined
                ? quantityInput[record.id]
                : record.quantity
            }
            onChange={(e) => {
              const value = e.target.value;
              // Allow empty string for typing
              setQuantityInput((prev) => ({ ...prev, [record.id]: value }));
            }}
            onBlur={() => {
              const raw = quantityInput[record.id];
              const parsed = parseInt(raw, 10);

              if (!isNaN(parsed) && parsed > 0) {
                setProducts((prev) =>
                  prev.map((p) =>
                    p.id === record.id ? { ...p, quantity: parsed } : p
                  )
                );
              } else if (parsed === 0) {
                handleDelete(record.id);
              }

              setQuantityInput((prev) => {
                const updated = { ...prev };
                delete updated[record.id];
                return updated;
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
              }
            }}
          />
          <QuantityButton onClick={() => handleQuantityChange(record.id, 1)}>
            +
          </QuantityButton>
        </QuantityWrapper>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      align: "center",
      render: (price) => `${price.toLocaleString("vi-VN")}₫`,
    },
  ];

  const selectedProducts = products.filter((p) =>
    selectedRowKeys.includes(p.id)
  );

  const total = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return (
    <Container>
      <TableWrapper>
        <TableComponent
          columns={columns}
          data={products.map((p) => ({ ...p, key: p.id }))}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys,
            onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
          }}
          pagination={false}
        />
        <ScrollHint>Vuốt sang trái/phải để xem →</ScrollHint>
      </TableWrapper>

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
              khuyến mãi ở trang thanh toán.
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
