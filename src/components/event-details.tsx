import React from 'react'
import { Event } from '../types'
import emptyPng from '../icons/empty.png'
import css from './event-details.module.css'

interface EventDetailsProps {
    data: Event
}

export const EventDetails = ({ data }: EventDetailsProps) => {
    return (
        <div className={css.root}>
            <img
                className={css.img}
                src={data.thumbUrl || emptyPng}
                alt={data.name}
            />
            <div className={css.info}>
                <div className={css.name}>{data.name}</div>
            </div>
            <div className={css.details}>
                {data.address ? (
                    <div className={css.address}>
                        איפה: <b>{data.address}</b>
                    </div>
                ) : null}
                {data.time ? (
                    <div className={css.time}>
                        מתי: <b>{data.time}</b>
                    </div>
                ) : null}
            </div>
            <div className={css.actions}>
                <button className={css.orderBtn}>הזמן!</button>
            </div>
        </div>
    )
}
