import React from 'react'
import { Location } from '../types'
import css from './event-details.module.css'

interface LocationDetailsProps {
    data: Location
}

export const LocationDetails = ({ data }: LocationDetailsProps) => {
    return (
        <div className={css.root}>
            <img className={css.img} src={data.thumbUrl} alt={data.name} />
            <div className={css.details}>
                <div>{data.name}</div>
            </div>
            <div className={css.actions}></div>
        </div>
    )
}
