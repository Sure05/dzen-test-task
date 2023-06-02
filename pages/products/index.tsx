import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import React, {useEffect, useState} from "react";
import {fetchProducts} from "@/store/slice/ProductSlice";
import ProductsElementsList from "@/components/ProductsElementsList/ProductsElementsList";
import Modal from "@/components/Modal/Modal";
import {useTranslation} from "next-i18next";
import {Product} from "@/types/products";
import ProductInfo from "@/components/Modal/variants/ProductInfo/ProductInfo";
import Filters from "@/components/Filters/Filters";

const Products = () => {
    const products = useAppSelector(state => {
        const all = state.products.data;
        const selectedModel = state.filters.selected;
        if ( selectedModel === '' ) {
            return state.products;
        } else {
            return {
                ...state.products,
                data: all.filter( product => product.type === selectedModel )
            };
        }
    });
    const dispatch = useAppDispatch();
    const {t} = useTranslation('common');
    const [showModal, setShowModal] = useState(false);
    const [deletingProductInfo, setDeletingProductInfo] = useState<Product | null>(null);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const deleteProduct = (id: string|number) => {
        const product = products.data.find((el) => el.id === id);
        if(product) {
            setDeletingProductInfo(product)
            setShowModal(true)
        }
    }
    const closeModal = () => {
        setDeletingProductInfo(null)
        setShowModal(false)
    }

    return (
        <div>
            <title>Products</title>
            <div className={'d-flex'}>
                <Breadcrumbs list={['Продукты', 25]}/>
                <Filters label={'Model'} />
            </div>
            {products.data.map(el => <ProductsElementsList key={`prod`} product={el} dropProduct={deleteProduct} />)}
            <Modal open={showModal} close={closeModal} title={t('remove_product')}>
                {deletingProductInfo ? <ProductInfo product={deletingProductInfo} />: null}
            </Modal>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({
 locale,
}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', [
            'datetime',
            'common'
        ])),
    },
})

export default Products
