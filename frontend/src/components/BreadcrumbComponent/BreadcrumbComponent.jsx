import { Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BreadcrumbWrapper } from './style';

const BreadcrumbComponent = ({ breadcrumbs }) => {
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng trang khi click

  // Hàm handleClick xử lý việc click vào các item breadcrumb
  const handleClick = (item, e) => {
    // Nếu item có preventNavigation, ngừng hành động mặc định và xử lý logic khác nếu cần
    if (item.preventNavigation) {
      e.preventDefault();
      return;
    }

    // Nếu item có navigateOptions, ngừng hành động mặc định và điều hướng với các tùy chọn navigateOptions
    if (item.navigateOptions) {
      e.preventDefault();
      navigate(item.link, item.navigateOptions); // Điều hướng với link và navigateOptions
    }
    // Nếu không có navigateOptions, Link sẽ xử lý navigation bình thường
  };

  return (
    <BreadcrumbWrapper>
      {/* Dùng Breadcrumb của Ant Design để hiển thị các breadcrumb */}
      <Breadcrumb>
        {/* Duyệt qua mảng breadcrumbs để hiển thị các item */}
        {breadcrumbs.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {/* Nếu item là trang hiện tại, chỉ hiển thị tên mà không có link */}
            {item.isCurrent ? (
              <span>{item.name}</span>
            ) : (
              // Nếu có link, hiển thị Link để điều hướng
              item.link ? (
                <Link
                  to={item.link} // Đặt link tới item.link
                  onClick={(e) => handleClick(item, e)} // Gọi handleClick khi click vào link
                >
                  {item.name} {/* Hiển thị tên breadcrumb */}
                </Link>
              ) : (
                <span>{item.name}</span> // Nếu không có link, chỉ hiển thị tên
              )
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </BreadcrumbWrapper>
  );
};

export default BreadcrumbComponent;
