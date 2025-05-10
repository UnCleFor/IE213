import { Breadcrumb } from 'antd';
import { Link, useParams, useLocation } from 'react-router-dom';
import { BreadcrumbWrapper } from './style';
import { useEffect } from 'react';

const BreadCrumbForType = ({ onNavigate }) => {
  // Lấy type (slug của phòng hoặc sản phẩm) từ URL
  const { type } = useParams();
  // Lấy thông tin về vị trí hiện tại trong URL
  const location = useLocation();

  // Danh sách các sản phẩm theo từng phòng
  const productTypesByRoom = {
    'phong-khach': ['sofa', 'ban-tra', 'ke-tivi', 'ghe-don', 'tu-trang-tri'],
    'phong-ngu': ['giuong', 'tu-quan-ao', 'tab-dau-giuong', 'ban-trang-diem', 'chan-ga-goi'],
    'phong-an': ['ban-an', 'ghe-an', 'tu-bep', 'tu-ruou', 'phu-kien-ban-an'],
    'phong-lam-viec': ['ban-lam-viec', 'ghe-lam-viec', 'ke-sach', 'tu-ho-so', 'den-ban'],
    'trang-tri-nha-cua': ['tranh-treo-tuong', 'den-trang-tri', 'tham', 'cay-gia', 'dong-ho-trang-tri']
  };

  // Danh sách tên các phòng
  const roomNames = {
    'phong-khach': 'Phòng khách',
    'phong-ngu': 'Phòng ngủ',
    'phong-an': 'Phòng ăn',
    'phong-lam-viec': 'Phòng làm việc',
    'trang-tri-nha-cua': 'Trang trí nhà cửa'
  };

  // Danh sách tên các sản phẩm
  const productNames = {
    // Các sản phẩm trong phòng khách
    'sofa': 'Sofa',
    'ban-tra': 'Bàn trà',
    'ke-tivi': 'Kệ tivi',
    'ghe-don': 'Ghế đơn',
    'tu-trang-tri': 'Tủ trang trí',

    // Các sản phẩm trong phòng ngủ
    'giuong': 'Giường',
    'tu-quan-ao': 'Tủ quần áo',
    'tab-dau-giuong': 'Táp đầu giường',
    'ban-trang-diem': 'Bàn trang điểm',
    'chan-ga-goi': 'Chăn ga gối',

    // Các sản phẩm trong phòng ăn
    'ban-an': 'Bàn ăn',
    'ghe-an': 'Ghế ăn',
    'tu-bep': 'Tủ bếp',
    'tu-ruou': 'Tủ rượu',
    'phu-kien-ban-an': 'Phụ kiện bàn ăn',

    // Các sản phẩm trong phòng làm việc
    'ban-lam-viec': 'Bàn làm việc',
    'ghe-lam-viec': 'Ghế làm việc',
    'ke-sach': 'Kệ sách',
    'tu-ho-so': 'Tủ hồ sơ',
    'den-ban': 'Đèn bàn',

    // Các sản phẩm trang trí nhà cửa
    'tranh-treo-tuong': 'Tranh treo tường',
    'den-trang-tri': 'Đèn trang trí',
    'tham': 'Thảm',
    'cay-gia': 'Cây giả',
    'dong-ho-trang-tri': 'Đồng hồ trang trí'
  };

  // Sử dụng useEffect để gọi hàm onNavigate khi type hoặc location thay đổi
  useEffect(() => {
    if (onNavigate) {
      onNavigate(type, location.pathname); // Gọi hàm onNavigate để xử lý khi thay đổi
    }
  }, [type, location.pathname, onNavigate]); // Đặt lại effect khi type hoặc pathname thay đổi

  // Hàm tìm phòng chứa sản phẩm dựa trên slug của sản phẩm
  const findRoomForProduct = (productSlug) => {
    // Duyệt qua các phòng để tìm slug của sản phẩm
    for (const [roomSlug, products] of Object.entries(productTypesByRoom)) {
      if (products.includes(productSlug)) {
        return roomSlug; // Trả về slug của phòng chứa sản phẩm
      }
    }
    return null; // Trả về null nếu không tìm thấy phòng
  };

  // Hàm tạo breadcrumbs (dẫn đường) tùy thuộc vào type
  const generateBreadcrumbs = () => {
    const breadcrumbs = [{ name: 'Trang chủ', link: '/' }]; // Khởi tạo breadcrumb mặc định với trang chủ

    // Kiểm tra xem type là phòng hay sản phẩm
    if (roomNames[type]) {
      // Nếu type là phòng, thêm breadcrumb cho phòng đó
      breadcrumbs.push({
        name: roomNames[type],
        isCurrent: true // Đánh dấu là trang hiện tại
      });
    } else {
      // Nếu type là sản phẩm, tìm phòng chứa sản phẩm
      const roomSlug = findRoomForProduct(type);
      if (roomSlug) {
        breadcrumbs.push({
          name: roomNames[roomSlug],
          link: `/product/${roomSlug}` // Thêm link đến trang của phòng chứa sản phẩm
        });
      }

      breadcrumbs.push({
        name: productNames[type] || type, // Nếu không có tên sản phẩm, sử dụng type làm tên
        isCurrent: true // Đánh dấu là trang hiện tại
      });
    }
    return breadcrumbs; // Trả về mảng breadcrumb
  };

  // Gọi hàm generateBreadcrumbs để lấy breadcrumbs
  const breadcrumbs = generateBreadcrumbs();

  return (
    <BreadcrumbWrapper>
      {/* Hiển thị breadcrumb */}
      <Breadcrumb>
        {generateBreadcrumbs().map((item, index) => (
          <Breadcrumb.Item key={index}>
            {/* Nếu là trang hiện tại, hiển thị tên như một phần tử span */}
            {item.isCurrent ? (
              <span>{item.name}</span>
            ) : (
              // Nếu không phải trang hiện tại, hiển thị link dẫn đến trang tương ứng
              <Link to={item.link}>{item.name}</Link>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </BreadcrumbWrapper>
  );
};

export default BreadCrumbForType;