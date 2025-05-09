import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

/**
 * SearchButton component kết hợp ô input và nút tìm kiếm.
 * Cho phép người dùng nhập và nhấn nút để kích hoạt tìm kiếm.
 */

const SearchButton = (props) => {
  const {
    size,                             // Kích thước của input và button (small, middle, large)
    placeholder,                      // Placeholder hiển thị trong input
    textButton,                       // Nội dung hiển thị trên nút button
    backgroundColorInput = "white",   // Màu nền mặc định cho input
    backgroundColorButton = "brown",  // Màu nền mặc định cho button
    colorButton = "white",            // Màu chữ mặc định cho button
    value,                            // Giá trị hiện tại của ô input
    onChange,                         // Hàm xử lý khi input thay đổi
    onClick                           // Hàm xử lý khi click vào button
  } = props;

  return (
    <div style={{ display: "flex" }}>
      {/* Ô input nhập nội dung tìm kiếm */}
      <InputComponent
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: backgroundColorInput,
          border: "1px solid gainsboro",
          borderRadius: "0px",
          outline: "none",
          boxShadow: "none",
        }}
      />

      {/* Nút tìm kiếm có icon và text */}
      <ButtonComponent
        size={size}
        styleButton={{
          background: backgroundColorButton,
          borderRadius: "0px",
          border: "none",
        }}
        styleTextButton={{ color: colorButton }}
        textButton={textButton}
        icon={<SearchOutlined style={{ color: colorButton }} />}
        onClick={onClick}
      >
      </ButtonComponent>
    </div>
  );
};

export default SearchButton;
