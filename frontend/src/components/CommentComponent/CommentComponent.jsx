import React, { useEffect } from 'react';

const CommentComponent = ({ dataHref }) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div
      className="fb-comments"
      data-href={dataHref}
      data-width="100%"
      data-numposts="5"
    ></div>
  );
};

export default CommentComponent;
