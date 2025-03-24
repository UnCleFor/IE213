import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { WrapperTypeProduct } from "../HomePage/style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";

const ProductDetailsPage = () => {
    const arr = ['Bàn', 'Ghế', 'Tủ']

    return (
        <div>
            {/* Phân loại sản phẩm
            <WrapperTypeProduct>
                {arr.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })}
            </WrapperTypeProduct> */}

            <div style={{ padding: '0px  120px', height: '1000px' }}>
                <ProductDetailsComponent />
            </div>
        </div>

    );
};

export default ProductDetailsPage;