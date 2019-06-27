import React from 'react'
import { Person } from '../types'
import css from './person-details.module.css'

interface PersonDetailsProps {
    data: Person
}

export const PersonDetails = ({ data }: PersonDetailsProps) => {
    return (
        <div className={css.root}>
            <img className={css.img} src={data.thumbUrl} alt={data.name} />
            <div className={css.details}>
                <div>{data.name}</div>
                <div>{data.status}</div>
            </div>
            <div className={css.actions}></div>
        </div>
    )
}
