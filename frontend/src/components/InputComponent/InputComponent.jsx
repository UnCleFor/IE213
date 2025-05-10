import React from "react";
import { Input } from "antd";

// Tạo Input riêng để tái sử dụng nhiều lần
const InputComponent = ({ size, placeholder, style, ...rests }) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      style={style}
      {...rests}
    />
  );
};

export default InputComponent;