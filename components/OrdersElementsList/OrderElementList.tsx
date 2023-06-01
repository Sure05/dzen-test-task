import styles from "@/pages/orders/styles.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faList, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Order} from '@/types/order'
import {useTranslation} from "next-i18next";
import {Price} from "@/types/products";

type OrderElementListProps = {
    el: Order,
    selected: boolean,
    selectRow: (id: number) => void,
    dropOrder: (id: number) => void
}
const OrderElementList = ({el, selected, selectRow, dropOrder}: OrderElementListProps) => {
    const {t} = useTranslation('datetime')
    const {t: a} = useTranslation('common')
    const renderFormatOne = (date: string) => {
        const elDate = new Date(date)
        let month: string|number = elDate.getMonth() + 1;
        let day: string|number = elDate.getDate();
        if(month < 10) {
            month = `0${month}`;
        }
        if(day < 10) {
            day = `0${day}`;
        }
        return `${day} / ${month}`
    }

    const renderFormatTwo = (date: string) => {
        const elDate = new Date(date)
        const month = elDate.getMonth();
        const year = elDate.getFullYear();
        let day: string|number = elDate.getDate();
        if(day < 10) {
            day = `0${day}`;
        }
        const monthNames: string = t(`month.abbreviated.${month}`, {returnObjects: true})
        return `${day} / ${monthNames} / ${year}`
    }

    const summPrice = (currency: string) => {
        if(el.products) {
            const prices = el.products.map(el => {
                return el.price.find(price => price.symbol === currency)
            });
            if(prices && prices.length > 0) {
                const total: number[] = prices.map((el: Price | undefined) => el && el.value ? el.value : 0);
                return total.reduce((a, curr) => a + curr).toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g, "$1 ");
            }
        }

        return 0
    }

    return (
        <div className={[styles.order_container, selected ? styles.show : ''].join(' ')}>
            <div className={styles.order_element}>
                <div onClick={() => selectRow(el.id)} className={styles.order_element__title}>
                    {el.title}
                </div>
                <div className={styles.order_element_count}>
                    <div className={styles.order_element_count__icon}>
                        <FontAwesomeIcon size={'lg'} icon={faList} />
                    </div>
                    <div>
                        <div className={styles.order_element_count__title}>{el.products?.length}</div>
                        <div className={styles.order_element_count__subtitle}>{a('product')}</div>
                    </div>
                </div>
                <div className={styles.order_element_date}>
                    <div className={styles.order_element_date__formatOne}>
                        {renderFormatOne(el.date)}
                    </div>
                    <div className={styles.order_element_date__formatTwo}>
                        {renderFormatTwo(el.date)}
                    </div>
                </div>
                <div className={styles.order_element_price}>
                    <div className={styles.order_element_price__usd}>
                        {summPrice('USD')} $
                    </div>
                    <div className={styles.order_element_price__uah}>
                        {summPrice('UAH')} грн
                    </div>
                </div>
                <div className={styles.order_element_action}>
                    <button onClick={() => dropOrder(el.id)} className={styles.order_element_action__button}>
                        <FontAwesomeIcon icon={faTrashCan} color={"lightgray"} />
                    </button>
                </div>
            </div>
            <div className={styles.order_container__arrow}>
                <FontAwesomeIcon icon={faAngleRight} color={"white"} />
            </div>
        </div>
    )
}

export default OrderElementList
