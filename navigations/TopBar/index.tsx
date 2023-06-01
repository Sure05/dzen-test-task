import React from "react";
import Image from "next/image";
import logo from "@/public/logo.svg"
import styles from './styles.module.scss';
import DateTime from "../../components/Wigets/DateTime/DateTime";
import OnlineUsers from "../../components/Wigets/OnlineUsers/OnlineUsers";
import Link from "next/link";

const Index = () => {
    return (
        <nav className={`shadow navbar navbar-light bg-light ${styles.topBar}`}>
            <div className={`container-fluid ${styles.topBarContainer}`}>
                <Link className={`navbar-brand d-flex align-items-center ${styles.topBarLogo}`} href="/">
                    <Image src={logo} width="35"
                           height="45" alt=""/>
                    <span className={styles.topBarLogoTitle}>INVENTORY</span>

                </Link>
                <div className="widgets d-flex align-bottom">
                    <DateTime />
                    <OnlineUsers />
                </div>
            </div>
        </nav>
    )
};

export default Index
