import React from 'react'
import { Person } from '../types'
import handIconSvg from '../icons/hand-icon.svg'
import css from './person-details.module.css'

interface PersonDetailsProps {
    data: Person
}

export const PersonDetails = ({ data }: PersonDetailsProps) => {
    return (
        <div className={css.root}>
            <img className={css.img} src={data.thumbUrl} alt={data.name} />
            <div className={css.info}>
                <div className={css.name}>{data.name}</div>
                <div className={css.age}>בן 1.5</div>
            </div>
            <div className={css.details}>
                <div className={css.status}>{data.status || 'נהנים!'}</div>
                <div className={css.time}>
                    מתי: <b>16:00-18:00</b>
                </div>
            </div>
            <div className={css.actions}>
                <button className={css.joinBtn}>
                    <img src={handIconSvg} alt="בקש להצטרף" />
                    בקש להצטרף
                </button>
            </div>
        </div>
    )
}
