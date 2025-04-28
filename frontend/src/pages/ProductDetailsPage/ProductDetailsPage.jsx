import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { WrapperTypeProduct } from "../HomePage/style";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";

const ProductDetailsPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    // Chuẩn bị dữ liệu cho breadcrumb
    const breadcrumbs = [
        { name: "Trang chủ", link: "/", isCurrent: false },
        { name: "Chi tiết sản phẩm", link: "#", isCurrent: true },
    ];
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
                <BreadcrumbComponent breadcrumbs={breadcrumbs} />
                <ProductDetailsComponent idProduct={id}/>
            </ContainerComponent>
               
            
        </div>

    );
};

export default ProductDetailsPage;