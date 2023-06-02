import {Product} from "@/types/products";
import styles from './styles.module.scss'
import Image from "next/image";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "next-i18next";
import Link from "next/link";

type ProductsElementsList = {
    product: Product,
    dropProduct: (id: string | number) => void
}
const ProductsElementsList = ({product, dropProduct}: ProductsElementsList) => {
    const {t} = useTranslation('common');
    const renderDate = (productDate: string) => {
        const date = new Date(productDate)
        const year = date.getUTCFullYear();
        let day: number|string = date.getDate();
        let month: number|string = date.getMonth() + 1;
        if(day < 10) {
            day = `0${day}`
        }
        if(month < 10) {
            month = `0${month}`
        }
        return `${day} / ${month} / ${year}`
    }
    const renderPrice = (currency: string) => {
        const price = product.price.find(price => price.symbol === currency);
        if(price) {
            return price.value.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g, "$1 ");
        } else {
            return 0
        }
    }

    return (
        <div className={styles.product}>
            <div className={`${styles.product__exist} ${!product.exist ? styles.not : ''}`}>
                <div></div>
            </div>
            <div className={`d-flex align-items-center ${styles.product_image}`}>
                <Image src={product.photo} alt={product.title} width={55} height={45}/>
            </div>
            <div className={` align-items-center ${styles.product_title_container}`}>
                <span className={`${styles.product_title_container__title}`}>{product.title}</span>
                <div className={styles.product_title_container__subtitle}>{product.serialNumber}</div>
            </div>
            <div
                className={`d-flex align-items-center ${styles.product__exist_text} ${!product.exist ? styles.not : ''}`}>
                {product.exist ? t('available') : t('not_available')}
            </div>
            <div className={`d-flex align-items-center ${styles.product_dates_container}`}>
                <div className={styles.product_dates_container__titles}>
                    <p>{t('from')}</p>
                    <p>{t('to')}</p>
                </div>
                <div className={styles.product_dates_container__date}>
                    <p>{renderDate(product.guarantee.start)}</p>
                    <p>{renderDate(product.guarantee.end)}</p>
                </div>
            </div>
            <div className={`${styles.product__isNew} d-flex align-items-center`}>
                <span>{product.isNew ? t('new') : t('used')}</span>
            </div>
            <div className={`justify-content-center d-flex flex-column ${styles.product_price}`}>
                <p className={styles.product_price__usd}>{renderPrice('USD')} $</p>
                <p className={styles.product_price__uah}>{renderPrice('UAH')} UAH</p>
            </div>
            <div className={`${styles.product__order_link} d-flex align-items-center`}>
                <Link href={{
                    pathname: '/orders',
                    query: {order_id: product.orderInfo?.id}
                }}>{product.orderInfo?.title}</Link>
            </div>
            <div className={`d-flex align-items-center`}>
                <button onClick={() => dropProduct(product.id)} className={styles.product_action}>
                    <FontAwesomeIcon icon={faTrashCan} color={"gray"}/>
                </button>
            </div>
        </div>
    )
}

export default ProductsElementsList
