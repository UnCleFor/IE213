import HeaderComponent from '../HeaderComponent/HeaderComponent'
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import FooterComponent from '../FooterComponent/FooterComponent';
import Chatbot from '../ChatBotComponent/ChatBotComponent';

// DefaultComponent là một layout bọc quanh nội dung chính của trang
// Bọc quanh phần nội dung chính và bao gồm Header, Navbar, Footer, Chatbot
const DefaultComponent = ({ children }) => {
  return (
    <div>
      {/* Hiển thị phần đầu trang */}
      <HeaderComponent />

      {/* Hiển thị thanh điều hướng chính */}
      <NavbarComponent />

      {/* Phần nội dung động của từng trang cụ thể */}
      {children}

      {/* Chatbot ảo hỗ trợ người dùng */}
      <Chatbot></Chatbot>

      {/* Hiển thị phần chân trang */}
      <FooterComponent />
    </div>
  );
};
export default DefaultComponent
