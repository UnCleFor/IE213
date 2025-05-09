import React from 'react';
import Slider from "react-slick";
import { Image } from 'antd';

/**
 * SliderComponent - Component hiển thị một slider (carousel) hình ảnh.
 * Dùng để hiển thị một danh sách hình ảnh theo dạng slideshow.
 * @param {Array} arrImages - Mảng chứa các đường dẫn tới hình ảnh cần hiển thị trong slider.
 */

const SliderComponent = ({ arrImages }) => {
  // Cấu hình cho Slider, các tham số điều chỉnh hiệu ứng hiển thị
  var settings = {
    dots: false,          // Tắt các dấu chấm chỉ số slide
    infinite: true,       // Cho phép lặp lại slider khi đi hết
    speed: 1000,          // Thời gian chuyển đổi giữa các slide (ms)
    slidesToShow: 1,      // Số lượng slide hiển thị tại một thời điểm
    slidesToScroll: 1,    // Số lượng slide cuộn mỗi lần
    autoplay: true,       // Tự động chuyển slide
    autoplaySpeed: 4000,  // Thời gian giữa mỗi lần chuyển slide (ms)
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Slider {...settings} style={{ width: "100%" }}>
        {arrImages.map((image, index) => (
          <div key={index} style={{ width: "100%", height: "500px", overflow: "hidden" }}>
            <Image
              key={image}
              src={image}
              alt="Slider"
              preview={false}
              width="100%"
              height="527px"
              style={{ objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
