
import styles from './styles.module.scss'
import React, {JSX, ReactNode} from "react";

type BreadcrumbsProps = {
    before?: JSX.Element,
    list: (string|number)[]
}
const Breadcrumbs = ({before, list}: BreadcrumbsProps) => {
    const Before = before
    return (
        <div className={`d-flex align-items-center ${styles.breadcrumbs}`}>
            {before ? before: null}
            <ol className={`breadcrumb ${styles.breadcrumbContainer}`}>
                {list.map((el, key) => (
                    <li key={key} className="breadcrumb-item">{el}</li>
                ))}
            </ol>
        </div>
    )
}

export default Breadcrumbs
