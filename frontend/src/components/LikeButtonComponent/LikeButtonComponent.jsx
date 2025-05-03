import React, { useEffect } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  margin: 2px 0 5px 0; /* Giảm mạnh margin */
  min-width: 150px;
  height: 20px; /* Giảm chiều cao */
  overflow: visible;
  
  /* Loại bỏ class fb-share-wrapper không cần thiết */
  .fb-share-button {
    vertical-align: top; /* Căn chỉnh tốt hơn */
  }
  
  @media (max-width: 768px) {
    min-width: 150px;
    margin: 1px 0 4px 0; /* Khoảng cách cực sát */
  }
`;

const LikeButtonComponent = ({ dataHref }) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const interval = setInterval(() => {
        if (window.FB) {
          window.FB.XFBML.parse();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [dataHref]);

  return (
    <ButtonContainer>
      <div
        className="fb-share-button"
        data-href={dataHref}
        data-layout="button_count"
        data-size="small"
        style={{ 
          display: 'inline-block',
          lineHeight: '1' /* Thêm dòng này để căn chỉnh */
        }}
      />
    </ButtonContainer>
  );
};

export default LikeButtonComponent;