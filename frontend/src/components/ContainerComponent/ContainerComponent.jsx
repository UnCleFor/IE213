import { theme, Grid } from "antd";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function ContainerComponent({ children }) {
  const { token } = useToken(); // Lấy token của theme (Ant Design)
  const screens = useBreakpoint(); // Hook để xác định breakpoint hiện tại (responsive)

  // Giá trị padding ngang theo kích thước màn hình
  let horizontalPadding = 24; // Giá trị mặc định

  if (screens.xl) {
    horizontalPadding = token.paddingLG; // Màn hình rất lớn (desktop)
  } else if (screens.lg) {
    horizontalPadding = 24; // Laptop, máy tính bảng xoay ngang
  } else if (screens.md) {
    horizontalPadding = 20; // Máy tính bảng xoay dọc
  } else if (screens.sm) {
    horizontalPadding = 16; // Điện thoại trung bình (iPhone 12, XS)
  } else {
    horizontalPadding = 12; // Thiết bị rất nhỏ (iPhone SE)
  }

  // Style container responsive
  const styles = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0 auto",
    maxWidth: token.screenXL, // Giới hạn chiều rộng tối đa theo token
    padding: `0 ${horizontalPadding}px`, // Padding trái/phải động
    boxSizing: "border-box",
    flexDirection: "column", // Nội dung xếp dọc để tránh tràn ngang
  };

  return <div style={styles}>{children}</div>; // Trả về container bao quanh children
}

