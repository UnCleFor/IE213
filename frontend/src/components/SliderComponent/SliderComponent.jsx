import React from 'react';
import Slider from "react-slick";
import { Image } from 'antd';

const SliderComponent = ({ arrImages }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}> {/* ✅ Ngăn tràn ngoài */}
      <Slider {...settings} style={{ width: "100%" }}> {/* ✅ Đảm bảo full width */}
        {arrImages.map((image, index) => (
          <div key={index} style={{ width: "100%", height: "500px", overflow: "hidden" }}>
            <Image
              src={image}
              alt="Slider"
              preview={false}
              width="100%"
              height="527px"
              style={{ objectFit: "cover", display: "block" }} // ✅ Hiển thị chuẩn
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
