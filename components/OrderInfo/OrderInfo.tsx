import {Order} from "@/types/order";
import styles from './styles.module.scss'
import {faClose, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {useTranslation} from "next-i18next";
import ProductElement from "@/components/OrderInfo/ProductElement/ProductElement";

type OrderInfoProps = {
    order: Order,
    close: () => void
}
const OrderInfo = ({order, close}: OrderInfoProps) => {
    const {t} = useTranslation('common');
    const dropProduct = (id: string | number) => {
        console.log(id)
    }
    return (
        <div className={styles.order_info}>
            <div className={styles.head}>
                <div className={styles.head__title}>{order.title}</div>
                <div className="action">
                    <button onClick={close} className={styles.head__action__add}>
                        <FontAwesomeIcon icon={faPlus} width={15} height={15} color={'white'}/>
                        <span>{t('addProduct')}</span>
                    </button>
                </div>
                <button onClick={close} className={`shadow ${styles.head__close}`}>
                    <FontAwesomeIcon icon={faClose} color={'darkgray'}/>
                </button>
            </div>
            <div className={'border-top'}>
                {order.products?.map(el => <ProductElement dropProduct={dropProduct} key={`product-${el.id}`} product={el} />)}
            </div>

        </div>
    )
}

export default OrderInfo
