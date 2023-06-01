import 'bootstrap/dist/css/bootstrap.css';

import type {AppProps} from 'next/app'
import {appWithTranslation} from 'next-i18next'
import TopBar from "@/navigations/TopBar";
import appStyles from "./app.module.scss";
import LeftBar from "@/navigations/LeftBar";
import React from "react";
import {Provider} from "react-redux";
import store from "@/store";

const MyApp = ({Component, pageProps}: AppProps) => (
    <>
        <Provider store={store}>
            <TopBar/>
            <main className={appStyles.main}>
                <LeftBar/>
                <div className={appStyles.content}>
                    <div className={`container-fluid ${appStyles.container}`}>
                        <Component {...pageProps} />
                    </div>
                </div>
            </main>
        </Provider>
    </>
)

export default appWithTranslation(MyApp /*, nextI18NextConfig */)
