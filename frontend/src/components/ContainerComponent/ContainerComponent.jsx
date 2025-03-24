import React from "react";
import { theme, Grid } from "antd";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function ContainerComponent({ children }) {
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
    maxWidth: token.screenXL,
    padding: screens.md ? `0 ${token.paddingLG}px` : `0 ${token.padding}px`,
  };

  return <div style={styles}>{children}</div>;
}
