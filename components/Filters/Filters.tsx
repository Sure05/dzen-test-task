import {useAppDispatch, useAppSelector} from "@/store/hooks";
import React, {useEffect} from "react";
import {fetchFilters, setSelectedFilter} from "@/store/slice/FiltersSlice";
import styles from './styles.module.scss'

type FiltersProps = {
    label: string
}
const Filters = ({label}: FiltersProps) => {
    const dispatch = useAppDispatch()
    const {selected, data} = useAppSelector(state => state.filters)
    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    const changeFilter = (e: React.FormEvent<HTMLSelectElement>) => {
        let value = e.currentTarget.value;
        dispatch(setSelectedFilter(value))
    }
    if (data.length === 0) return null

    return (
        <div className={`mb-3 row ${styles.filter}`}>
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">{label}</label>
            <div className={'col-sm-9'} style={{paddingLeft: 15}}>
                <select value={selected} onChange={(e) => changeFilter(e)} className="form-select form-select-sm">
                    <option selected value={''}></option>
                    {data.map((el: string, index: number) => (
                        <option key={index} value={el}>{el}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Filters
