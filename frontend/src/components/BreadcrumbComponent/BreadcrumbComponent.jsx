import { Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BreadcrumbWrapper } from './style';

const BreadcrumbComponent = ({ breadcrumbs }) => {
  const navigate = useNavigate();

  const handleClick = (item, e) => {
    if (item.preventNavigation) {
      e.preventDefault();
      // Xử lý logic khác nếu cần
      return;
    }

    if (item.navigateOptions) {
      e.preventDefault();
      navigate(item.link, item.navigateOptions);
    }
    // Nếu không có navigateOptions, Link sẽ xử lý navigation bình thường
  };

  return (
    <BreadcrumbWrapper>
      <Breadcrumb>
        {breadcrumbs.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.isCurrent ? (
              <span>{item.name}</span>
            ) : (
              item.link ? (
                <Link 
                  to={item.link}
                  onClick={(e) => handleClick(item, e)}
                >
                  {item.name}
                </Link>
              ) : (
                <span>{item.name}</span>
              )
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </BreadcrumbWrapper>
  );
};

export default BreadcrumbComponent;
