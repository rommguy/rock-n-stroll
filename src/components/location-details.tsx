import React from 'react'
import { Location } from '../types'
import lightningIconSvg from '../icons/lightning-icon.svg'
import emptyPng from '../icons/empty.png'
import css from './location-details.module.css'

interface LocationDetailsProps {
    data: Location
}

export const LocationDetails = ({ data }: LocationDetailsProps) => {
    return (
        <div className={css.root}>
            <img
                className={css.img}
                src={data.thumbUrl || emptyPng}
                alt={data.name}
            />
            <div className={css.info}>
                <div className={css.name}>{data.name}</div>
                <div className={css.type}>
                    {translateLocationType(data.subtype)}
                </div>
            </div>
            <div className={css.details}>
                <div className={css.address}>
                    איפה: <b>קינג ג'ורג 1</b>
                </div>
            </div>
            <div className={css.actions}>
                <button className={css.reportBtn}>
                    <img src={lightningIconSvg} />
                    דווח על מפגע
                </button>
            </div>
        </div>
    )
}

const translateLocationType = (subtype: string): string => {
    switch (subtype) {
        case 'playground':
            return 'גן משחקים'
        default:
            return ' '
    }
}
