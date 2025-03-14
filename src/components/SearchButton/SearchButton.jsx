import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchButton = (props) => {
  const {
    size,
    placeholder,
    textButton,
    backgroundColorInput = "white",
    backgroundColorButton = "brown",
    colorButton = "white",
  } = props;

  return (
    <div style={{ display: "flex"}}>
      <Input
        size={size}
        placeholder={placeholder}
        style={{
            backgroundColor: backgroundColorInput,
            border: "1px solid gray", // ✅ Màu viền xám
            borderRadius: "0px",
            outline: "none", // ✅ Tắt hiệu ứng focus mặc định
            boxShadow: "none", // ✅ Xóa viền sáng khi click vào
          }}
      />
      <Button
        size={size}
        icon={<SearchOutlined style={{ color: colorButton }} />} // ✅ Đúng cách đổi màu icon
        style={{
          background: backgroundColorButton,
          borderRadius: "0px", // Bỏ bo góc
          border: "none", //Xóa border nếu cần
        }}
      >
        <span style={{ color: colorButton }}>{textButton}</span>
      </Button>
    </div>
  );
};

export default SearchButton;
