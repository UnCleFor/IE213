import React from 'react'
import { Button } from 'antd'
const ButtonComponent = ({size,styleButton,styleTextButton,textButton,disabled,...rests }) => {
  return (
    <div>
      <Button
        disabled={disabled}
        style={{
          ...styleButton,
          backgroundColor: disabled ? '#ccc' : (styleButton.backgroundColor || 'brown'),
          color: disabled ? '#666' : (styleTextButton.color || 'white'),
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        size={size}
        {...rests}
      >
        <span
          style={{
            fontSize: styleTextButton.fontSize || '16px',
            color: disabled ? '#666' : (styleTextButton.color || 'white'),
          }}
        >
          {textButton}
        </span>
      </Button>
    </div>
  )
}

export default ButtonComponent
