import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { WrapperTypeProduct } from "../HomePage/style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()

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
                {/*breadcrumb <h5><span style={{cursor: 'pointer'}} onClick={() => {navigate('/')}}>Trang chủ</span> - Chi tiết sản phẩm</h5> */}
                <ProductDetailsComponent idProduct={id}/>
            </ContainerComponent>
               
            
        </div>

    );
};

export default ProductDetailsPage;