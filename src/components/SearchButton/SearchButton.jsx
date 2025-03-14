import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
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
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{
            backgroundColor: backgroundColorInput,
            border: "1px solid gainsboro", // ✅ Màu viền xám
            borderRadius: "0px",
            outline: "none", // ✅ Tắt hiệu ứng focus mặc định
            boxShadow: "none", // ✅ Xóa viền sáng khi click vào
          }}
      />
      <ButtonComponent
        size={size}
        styleButton={{
          background: backgroundColorButton,
          borderRadius: "0px", // Bỏ bo góc
          border: "none", //Xóa border nếu cần
        }}
        styleTextButton={{ color: colorButton }}
        textButton={textButton}
        icon={<SearchOutlined style={{ color: colorButton }} />} // ✅ Đúng cách đổi màu icon
      >
      </ButtonComponent>
    </div>
  );
};

export default SearchButton;
