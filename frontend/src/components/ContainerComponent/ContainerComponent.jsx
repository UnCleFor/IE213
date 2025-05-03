import React from "react";
import { theme, Grid } from "antd";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function ContainerComponent({ children }) {
  const { token } = useToken();
  const screens = useBreakpoint();

  let horizontalPadding = 24; // mặc định

  if (screens.xl) {
    horizontalPadding = token.paddingLG; // Desktop lớn
  } else if (screens.lg) {
    horizontalPadding = 24; // Laptop, iPad landscape
  } else if (screens.md) {
    horizontalPadding = 20; // iPad portrait
  } else if (screens.sm) {
    horizontalPadding = 16; // iPhone 12, XS
  } else {
    horizontalPadding = 12; // Thiết bị rất nhỏ
  }

  const styles = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    //alignItems: "center",
    margin: "0 auto",
    maxWidth: token.screenXL,
    padding: `0 ${horizontalPadding}px`,
    boxSizing: "border-box",
    flexDirection: "column", // đảm bảo nội dung không bị hàng ngang trên màn nhỏ
  };

  return <div style={styles}>{children}</div>;
}
