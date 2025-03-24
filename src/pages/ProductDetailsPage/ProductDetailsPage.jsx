import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { WrapperTypeProduct } from "../HomePage/style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";

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

            <ContainerComponent>
            <ProductDetailsComponent />
            </ContainerComponent>
               
            
        </div>

    );
};

export default ProductDetailsPage;