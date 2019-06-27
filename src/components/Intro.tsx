import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteProps } from '../types'
import { Carousel } from './Carousel'
import landingIcon from '../icons/intro/landing-icon.svg'
import icon2 from '../icons/intro/Icons-02.svg'
import icon3 from '../icons/intro/Icons-03.svg'
import icon4 from '../icons/intro/Icons-04.svg'
import './Intro.scss'

// ffd0d0

const introSlides: IntroSlideProps[] = [
    {
        icon: icon4,
        backgroundColor: '#c5d7d1',
        text: 'היו חלק מקהילה אורבנית צומחת וגדלה',
    },
    {
        icon: icon2,
        backgroundColor: '#ffb0aa',
        text: 'מצאו מקומות ואטרקציות לבלות עם ילדכם',
    },
    {
        icon: icon3,
        backgroundColor: '#fcd65e',
        text: 'חפשו שותפים באזור להעביר איתם את הזמן',
    },
]

interface IntroSlideProps {
    icon: any
    backgroundColor: string
    title?: string
    text: string
}

const IntroSlide: FunctionComponent<IntroSlideProps> = props => (
    <div
        className="intro-slide"
        style={{ backgroundColor: props.backgroundColor }}
    >
        <img src={props.icon} className="slide-icon" alt="slide-icon" />
        {props.title && <div className="slide-title">{props.title}</div>}
        <div className="slide-text">{props.text}</div>
    </div>
)

export const Intro: FunctionComponent<RouteProps> = () => {
    const [showSlide, setShowSlide] = useState<boolean>(false)
    useEffect(() => {
        setTimeout(() => {
            setShowSlide(true)
        }, 5000)
    }, [])

    return (
        <div className="intro-root">
            {showSlide ? (
                <Carousel>
                    {introSlides.map((slideDef, i) => (
                        <IntroSlide {...slideDef} key={i} />
                    ))}
                </Carousel>
            ) : (
                <div className="intro-landing">
                    <img src={landingIcon} alt="our-icon" />
                </div>
            )}
        </div>
    )
}
