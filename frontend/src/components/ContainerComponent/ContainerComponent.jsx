import React from "react";
import { theme, Grid } from "antd";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function ContainerComponent({ children }) {
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles = {
    width: "100%", // ✅ fix tràn bên phải
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
    maxWidth: token.screenXL,
    padding: screens.md ? `0 ${token.paddingLG}px` : `0 ${token.padding}px`,
    boxSizing: "border-box", // ✅ tránh tràn do padding
  };
  

  return <div style={styles}>{children}</div>;
}
