import * as H from 'history'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteProps } from '../types'
import { Carousel } from './Carousel'
import landingIcon from '../icons/intro/landing-icon.svg'
import icon2 from '../icons/intro/Icons-02.svg'
import icon3 from '../icons/intro/Icons-03.svg'
import icon4 from '../icons/intro/Icons-04.svg'
import Button from '@material-ui/core/Button'
import './Intro.scss'

// ffd0d0

const introSlides: IntroSlideDef[] = [
    {
        icon: icon4,
        backgroundColor: '#c5d7d1',
        text: 'היו חלק מקהילה אורבנית צומחת וגדלה',
        buttonText: 'יאללה!',
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

interface IntroSlideDef {
    icon: any
    backgroundColor: string
    text: string
    buttonText?: string
}

interface IntroSlideProps extends IntroSlideDef {
    history: H.History
    location: H.Location
}

const IntroSlide: FunctionComponent<IntroSlideProps> = props => (
    <div
        className="intro-slide"
        style={{ backgroundColor: props.backgroundColor }}
    >
        <img src={props.icon} className="slide-icon" alt="slide-icon" />
        <div className="slide-text">{props.text}</div>
        {props.buttonText && (
            <Button
                className="go-button"
                variant="contained"
                color="primary"
                onClick={() =>
                    props.history.push({
                        pathname: '/map',
                        search: props.location.search,
                    })
                }
            >
                {props.buttonText}
            </Button>
        )}
    </div>
)

export const Intro: FunctionComponent<RouteProps> = props => {
    const [showSlide, setShowSlide] = useState<boolean>(false)
    useEffect(() => {
        setTimeout(() => {
            setShowSlide(true)
        }, 3000)
    }, [])

    return (
        <div className="intro-root">
            {showSlide ? (
                <Carousel>
                    {introSlides.map((slideDef, i) => (
                        <IntroSlide
                            {...slideDef}
                            history={props.history}
                            location={props.location}
                            key={i}
                        />
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
