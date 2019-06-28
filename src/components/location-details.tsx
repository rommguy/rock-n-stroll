import React from 'react'
import { Location } from '../types'
import lightningIconSvg from '../icons/lightning-icon.svg'
import playgroundThumb from '../icons/playground-thumb.png'
import pharmecyThumb from '../icons/pharmecy-thumb.png'
import beachThumb from '../icons/beach-thumb.png'
import emptyPng from '../icons/empty.png'
import css from './location-details.module.css'

interface LocationDetailsProps {
    data: Location
}

export const LocationDetails = ({ data }: LocationDetailsProps) => {
    return (
        <div className={css.root}>
            <img
                key={getThumb(data.thumbUrl, data.subtype)}
                className={css.img}
                src={getThumb(data.thumbUrl, data.subtype)}
                alt={data.name || 'אירוע'}
            />
            <div className={css.info}>
                <div className={css.name}>{data.name}</div>
                <div className={css.type}>
                    {translateLocationType(data.subtype)}
                </div>
            </div>
            {/* <div className={css.details}>
                <div className={css.address}>
                    איפה: <b>קינג ג'ורג 1</b>
                </div>
            </div> */}
            <div className={css.actions}>
                <button className={css.reportBtn}>
                    <img src={lightningIconSvg} alt="דווח על מפגע" />
                    דווח על מפגע
                </button>
            </div>
        </div>
    )
}

const getThumb = (thumbUrl: string, subtype: string): string => {
    if (thumbUrl) {
        return thumbUrl
    }
    switch (subtype) {
        case 'playground':
            return playgroundThumb
        case 'beach':
            return beachThumb
        case 'pharmecy':
            return pharmecyThumb
        default:
            return emptyPng
    }
}
const translateLocationType = (subtype: string): string => {
    switch (subtype) {
        case 'playground':
            return 'גן משחקים'
        case 'beach':
            return 'חוף'
        case 'pharmecy':
            return 'בית מרקחת'
        default:
            return ' '
    }
}
