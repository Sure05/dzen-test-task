'use client'
import React, {useEffect, useState} from "react";
import {faClockFour} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './styles.module.scss'
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const DateTime = () => {
    const [language, setLanguage] = useState<string>()
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const { t, i18n } = useTranslation('datetime')
    const renderDay = () => {
        const day = currentDate.getDay();
        let names: string[] = t('week.wide', { returnObjects: true })
        return names[day]
    }

    const renderDate = () => {
        let day: number|string = currentDate.getDay();
        let month = currentDate.getMonth()
        if (day < 10) {
            day = `0${day}`;
        }
        let monthTranslation: string = t(`monthFormatting.abbreviated.${month}`);
        return (`${day} ${monthTranslation}, ${currentDate.getFullYear()}`)
    }

    useEffect(() => {
        setInterval(() => setCurrentDate(new Date()), 15000);
        setLanguage(navigator.language);
    }, []);

    if(!language) return null;
    return (
        <div className={styles.date_time}>
            <div className={styles.date_time__day}>{renderDay()}</div>
            <div className={`d-flex align-items-center`}>
                <p className={styles.date_time__date}>{renderDate()}</p>
                <FontAwesomeIcon className={styles.date_time__icon} icon={faClockFour} width={15} height={15} color={'green'}/>
                <p>
                    {currentDate.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                    })}
                </p>
            </div>
        </div>
    )
}

export default DateTime
