import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
const SearchButton = (props) => {
  const {
    size,
    placeholder,
    textButton,
    backgroundColorInput = "white",
    backgroundColorButton = "brown",
    colorButton = "white",
    value,
    onChange,
    onClick
  } = props;

  return (
    <div style={{ display: "flex"}}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
            backgroundColor: backgroundColorInput,
            border: "1px solid gainsboro", // ✅ Màu viền xám
            borderRadius: "0px",
            outline: "none", // ✅ Tắt hiệu ứng focus mặc định
            boxShadow: "none", // ✅ Xóa viền sáng khi click vào
          }}
        //{...props}
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
        onClick={onClick}
      >
      </ButtonComponent>
    </div>
  );
};

export default SearchButton;
