import React, { useEffect } from 'react';
import styled from 'styled-components';

const LikeButtonContainer = styled.div`
  .fb-like {
    max-width: 100%;
    overflow: hidden;
    
    span {
      max-width: 100% !important;
    }
    
    iframe {
      max-width: 100% !important;
      min-width: 200px !important;
    }
  }
`;

const LikeButtonComponent = ({ dataHref, layout = "standard", action = "like", size = "small", showShare = true }) => {
  useEffect(() => {
    // Tải lại SDK Facebook khi component mount
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [dataHref, layout, action, size, showShare]);

  return (
    <LikeButtonContainer>
      <div
        className="fb-like"
        data-href={dataHref}
        data-width="100%"
        data-layout={layout}
        data-action={action}
        data-size={size}
        data-share={showShare}
        data-lazy="true"
      ></div>
    </LikeButtonContainer>
  );
};

export default LikeButtonComponent;