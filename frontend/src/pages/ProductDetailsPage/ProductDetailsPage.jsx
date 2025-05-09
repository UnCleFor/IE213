import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <div>
            <ContainerComponent>
                <ProductDetailsComponent idProduct={id} />
            </ContainerComponent>
        </div>
    );
};

export default ProductDetailsPage;