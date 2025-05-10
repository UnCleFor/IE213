import { useEffect } from 'react';

const CommentComponent = ({ dataHref }) => {
  useEffect(() => {
    // Nếu SDK Facebook đã được tải, gọi lại phương thức parse để render phần comment
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    // Thẻ chứa khối bình luận Facebook
    <div
      className="fb-comments"
      data-href={dataHref} // URL bài viết để liên kết với bình luận
      data-width="100%" // Chiều rộng khối bình luận (100% của phần tử cha)
      data-numposts="5" // Số lượng bình luận hiển thị mặc định
    ></div>
  );
};

export default CommentComponent;
