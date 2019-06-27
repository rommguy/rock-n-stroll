import React from 'react'
import { Event } from '../types'
import css from './event-details.module.css'

interface EventDetailsProps {
    data: Event
}

export const EventDetails = ({ data }: EventDetailsProps) => {
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
