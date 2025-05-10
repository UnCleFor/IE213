import { Button } from 'antd'

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
  return (
    <div>
      <Button
        disabled={disabled}
        // Gộp style của người dùng truyền vào với style mặc định
        style={{
          ...styleButton,
          backgroundColor: disabled ? '#ccc' : (styleButton.backgroundColor || 'brown'), // Nếu không disabled, dùng màu truyền vào hoặc mặc định là 'brown'
          color: disabled ? '#666' : (styleTextButton.color || 'white'), // Màu chữ khi disabled hoặc theo styleTextButton
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer' // Đổi con trỏ khi hover
        }}
        size={size}
        {...rests} // Truyền các props còn lại vào nút
      >
        <span
          style={{
            fontSize: styleTextButton.fontSize || '16px', // Font size mặc định nếu không truyền
            color: disabled ? '#666' : (styleTextButton.color || 'white') // Màu chữ được đồng bộ với phần button
          }}
        >
          {textButton} {/* Hiển thị nội dung nút */}
        </span>
      </Button>
    </div>
  )
}

export default ButtonComponent
