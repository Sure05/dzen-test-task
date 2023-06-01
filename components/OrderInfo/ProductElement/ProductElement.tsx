import styles from './styles.module.scss';
import {Product} from "@/types/products";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import React from "react";

type ProductElementProps = {
    product: Product,
    dropProduct: (id: string|number) => void
}
const ProductElement = ({product, dropProduct}: ProductElementProps) => {
    const {t} = useTranslation('common')
    return (
        <div className={'container-fluid'}>
            <div className={`row border-bottom ${styles.product_element}`}>
                <div className="col col-1">
                    <Image src={product.photo} alt={product.title} width={55} height={45} />
                </div>
                <div className={`col col-8 ${styles.title_container}`}>
                    <span className={`border-bottom ${styles.title_container__title}`}>{product.title}</span>
                    <div className={styles.title_container__subtitle}>{product.serialNumber}</div>
                </div>
                <div className={`col col-2 d-flex align-items-center ${styles.product_element__exist} ${!product.exist ? styles.not : ''}`}>{product.exist ? t('available') : t('not_available')}</div>

                <div className={`col col-1 d-flex align-items-center`}>
                    <button onClick={() => dropProduct(product.id)} className={styles.action_button}>
                        <FontAwesomeIcon icon={faTrashCan} color={"gray"} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductElement
