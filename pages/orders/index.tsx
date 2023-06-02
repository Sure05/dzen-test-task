'use client'
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import styles from './styles.module.scss'
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import OrderElementList from "@/components/OrdersElementsList/OrderElementList";
import {Order} from "@/types/order";
import OrderInfo from "@/components/OrderInfo/OrderInfo";
import {useRouter} from "next/router";
import Modal from "@/components/Modal/Modal";
import {useTranslation} from "next-i18next";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fetchOrders} from "@/store/slice/OrderSlice";

type RouterQuery = {
    order_id?: string
}

const Bar = () => {
    const router = useRouter();
    const {t} = useTranslation('common')
    const query: RouterQuery = router.query as RouterQuery;
    const [selectedOrder, setSelectedOrder] = useState<number | string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [deletingOrderInfo, setDeletingOrderInfo] = useState<Order | null>(null);
    const {loading, data: orders} = useAppSelector(state => state.orders);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSelectedOrder(query.order_id ? query.order_id : null)
    }, [query])

    useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    if(loading) {
        return null
    }

    const AddOrder = (
        <button className={`shadow ${styles.button}`} onClick={() => {
            console.log('click')
        }}>
            <FontAwesomeIcon icon={faPlus} color={'white'}/>
        </button>
    )
    const selectRow = (id: number) => {
        if (selectedOrder === id) {
            setSelectedOrder(null)
        } else {
            setSelectedOrder(id)
        }
    }

    const closeOrder = () => {
        console.log(1)
        setSelectedOrder(null)
    }

    const deleteOrder = (id: number) => {
        const order = orders.find((el: Order) => el.id === id);
        if(order) {
            setDeletingOrderInfo(order)
            setShowModal(true)
        }
    }
    const closeModal = () => {
        setDeletingOrderInfo(null)
        setShowModal(false)
    }

    return (
        <div>
            <title>Orders</title>
            <Breadcrumbs
                list={['Приходы', 25]}
                before={AddOrder}
            />
            <div className="d-flex">
                <div className={`${styles.orders_list} ${selectedOrder ? styles.active : ''}`}>
                    {orders.map((el: Order) => <OrderElementList dropOrder={deleteOrder} key={`${el.id}-123144`} el={el}
                                                          selected={el.id === selectedOrder}
                                                          selectRow={selectRow}/>)}
                </div>
                {selectedOrder ? <div className={styles.container}>
                    <OrderInfo close={closeOrder}
                               order={orders.filter((el: Order) => el.id.toString() === selectedOrder.toString())[0]}/>
                </div> : null}

            </div>
            <Modal open={showModal} close={closeModal} title={t('remove_order')}>
                {deletingOrderInfo ? <h5 style={{padding: '0 35px'}}>{deletingOrderInfo.title}</h5>: null}
            </Modal>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (data) => {
    return ({
        props: {
            ...(await serverSideTranslations(data.locale ?? 'en', [
                'datetime',
                'common'
            ])),
        },
    })
}

export default Bar
