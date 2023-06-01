import {Product} from "@/types/products";
import React from "react";
import Image from "next/image";
import styles from './styles.module.scss'

type ProductInfo = {
    product: Product
}

const ProductInfo: React.FC<ProductInfo> = ({product}) => {
    return (
        <div className={`row ${styles.product}`}>
            <div className={`col col-1 ${styles.product__exist} ${!product.exist ? styles.not : ''}`}>
                <div></div>
            </div>
            <div className={`col col-2 d-flex align-items-center ${styles.product_image}`}>
                <Image src={product.photo} alt={product.title} width={55} height={45}/>
            </div>
            <div className={`col col-9 align-items-center ${styles.product_title_container}`}>
                <span className={`border-bottom ${styles.product_title_container__title}`}>{product.title}</span>
                <div className={styles.product_title_container__subtitle}>{product.serialNumber}</div>
            </div>
        </div>
    )
}

export default ProductInfo
