import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { BreadcrumbWrapper } from './style';  // Import style

const BreadcrumbComponent = ({ breadcrumbs }) => {
  return (
    <BreadcrumbWrapper>
      <Breadcrumb>
        {breadcrumbs.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.isCurrent ? (
              // Nếu là breadcrumb hiện tại, hiển thị như một span
              <span>{item.name}</span>
            ) : (
              // Nếu có link, hiển thị như một Link
              item.link ? (
                <Link to={item.link}>{item.name}</Link>
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
