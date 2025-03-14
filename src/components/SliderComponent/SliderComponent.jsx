import React from 'react'
import Slider from "react-slick";
import { Image } from 'antd';
const SliderComponent = ({ arrImages }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:4000,
  };

  return (
    <Slider {...settings}>
      {arrImages.map((image, index) => (
        <div key={index} style={{ height: "500px", overflow: "hidden" }}>
          <Image
            src={image}
            alt="Slider"
            preview={false}
            width="100%"
            height="527px" // ✅ Giới hạn chiều cao
            style={{ objectFit: "cover" }} // ✅ Cắt ảnh mà không méo
          />
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;