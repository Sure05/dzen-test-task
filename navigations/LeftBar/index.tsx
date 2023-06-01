'use client';

import React from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import user from '@/public/user.jpeg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {usePathname} from "next/navigation";

const MenuLinks = [
    {
        title: 'Приходы',
        active: true,
        href: '/orders'
    },
    {
        title: 'Группы',
        active: false
    },
    {
        title: 'Продукты',
        active: false,
        href: '/products'
    },
    {
        title: 'Пользователи',
        active: false
    },
    {
        title: 'Настройки',
        active: false
    },
]

const Index: React.FC = () => {
    const pathname = usePathname();
    return (
        <div className={`d-flex flex-column flex-shrink-0 p-3 bg-light ${styles.leftBar}`} style={{width: 200}}>
            <div className={styles.userPhoto}>
                <Image width={100} height={100} src={user} alt={'user'} className={styles.photo}/>
                <button className={`shadow bg-white ${styles.settingsButton}`}>
                    <FontAwesomeIcon icon={faGear} width={15} height={15}/>
                </button>
            </div>
            <ul className={`nav nav-pills flex-column mb-auto ${styles.menu}`}>
                {MenuLinks.map((el, index) => {
                    const isActive = pathname ? pathname.startsWith(el.href ? el.href : '') : '';
                    return (
                        <li key={index} className={`nav-item ${styles.link}`}>
                            {el.href ? <Link href={el.href} className={isActive ? styles.active : ''}>{el.title}</Link> :
                                <a href="#" className={''} aria-current="page">
                                    {el.title}
                                </a>}
                        </li>
                    )
                })}

            </ul>
        </div>
    )
};

export default Index
