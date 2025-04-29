import { Breadcrumb } from 'antd';
import { Link, useParams, useLocation } from 'react-router-dom';
import { BreadcrumbWrapper } from './style';
import { useEffect } from 'react';

const BreadCrumbForType = ({ onNavigate }) => {
  const { type } = useParams();
  const location = useLocation();
  const productTypesByRoom = {
    'phong-khach': ['sofa', 'ban-tra', 'ke-tivi', 'ghe-don', 'tu-trang-tri'],
    'phong-ngu': ['giuong', 'tu-quan-ao', 'tab-dau-giuong', 'ban-trang-diem', 'chan-ga-goi'],
    'phong-an': ['ban-an', 'ghe-an', 'tu-bep', 'tu-ruou', 'phu-kien-ban-an'],
    'phong-lam-viec': ['ban-lam-viec', 'ghe-lam-viec', 'ke-sach', 'tu-ho-so', 'den-ban'],
    'trang-tri-nha-cua': ['tranh-treo-tuong', 'den-trang-tri', 'tham', 'cay-gia', 'dong-ho-trang-tri']
  };

  const roomNames = {
    'phong-khach': 'Phòng khách',
    'phong-ngu': 'Phòng ngủ',
    'phong-an': 'Phòng ăn',
    'phong-lam-viec': 'Phòng làm việc',
    'trang-tri-nha-cua': 'Trang trí nhà cửa'
  };

  const productNames = {
    // Phòng khách
    'sofa': 'Sofa',
    'ban-tra': 'Bàn trà',
    'ke-tivi': 'Kệ tivi',
    'ghe-don': 'Ghế đơn',
    'tu-trang-tri': 'Tủ trang trí',
    
    // Phòng ngủ
    'giuong': 'Giường',
    'tu-quan-ao': 'Tủ quần áo',
    'tab-dau-giuong': 'Táp đầu giường',
    'ban-trang-diem': 'Bàn trang điểm',
    'chan-ga-goi': 'Chăn ga gối',
    
    // Phòng ăn
    'ban-an': 'Bàn ăn',
    'ghe-an': 'Ghế ăn',
    'tu-bep': 'Tủ bếp',
    'tu-ruou': 'Tủ rượu',
    'phu-kien-ban-an': 'Phụ kiện bàn ăn',
    
    // Phòng làm việc
    'ban-lam-viec': 'Bàn làm việc',
    'ghe-lam-viec': 'Ghế làm việc',
    'ke-sach': 'Kệ sách',
    'tu-ho-so': 'Tủ hồ sơ',
    'den-ban': 'Đèn bàn',
    
    // Trang trí nhà cửa
    'tranh-treo-tuong': 'Tranh treo tường',
    'den-trang-tri': 'Đèn trang trí',
    'tham': 'Thảm',
    'cay-gia': 'Cây giả',
    'dong-ho-trang-tri': 'Đồng hồ trang trí'
  };
  useEffect(() => {
    if (onNavigate) {
      onNavigate(type, location.pathname);
    }
  }, [type, location.pathname, onNavigate]);
  // Tìm phòng chứa sản phẩm
  const findRoomForProduct = (productSlug) => {
    for (const [roomSlug, products] of Object.entries(productTypesByRoom)) {
      if (products.includes(productSlug)) {
        return roomSlug;
      }
    }
    return null;
  };

  // Tạo breadcrumbs
  const generateBreadcrumbs = () => {
    const breadcrumbs = [{ name: 'Trang chủ', link: '/' }];

    // Kiểm tra xem type là phòng hay sản phẩm
    if (roomNames[type]) {
      // Nếu là trang phòng
      breadcrumbs.push({
        name: roomNames[type],
        isCurrent: true
      });
    } else {
      // Nếu là trang sản phẩm
      const roomSlug = findRoomForProduct(type);
      if (roomSlug) {
        breadcrumbs.push({
          name: roomNames[roomSlug],
          link: `/product/${roomSlug}`
        });
      }
      
      breadcrumbs.push({
        name: productNames[type] || type,
        isCurrent: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <BreadcrumbWrapper>
      <Breadcrumb>
        {generateBreadcrumbs().map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.isCurrent ? (
              <span>{item.name}</span>
            ) : (
              <Link to={item.link}>{item.name}</Link>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </BreadcrumbWrapper>
  );
};

export default BreadCrumbForType;