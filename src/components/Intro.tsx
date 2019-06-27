import React, { FunctionComponent } from 'react'
import { RouteProps } from '../types'
import { Carousel } from './Carousel'
import StrollerIcon from '../icons/stroller-icon.svg'
import './Intro.scss'

const introSlides: IntroSlideProps[] = [
    {
        icon: StrollerIcon,
        backgroundColor: 'red',
        text: 'אני השקופית הראשונה',
    },
    {
        icon: StrollerIcon,
        backgroundColor: 'blue',
        text: 'אני השקופית השניה',
    },
    {
        icon: StrollerIcon,
        backgroundColor: 'green',
        text: 'אני השקופית השלישית',
    },
]

interface IntroSlideProps {
    icon: any
    backgroundColor: string
    text: string
}

const IntroSlide: FunctionComponent<IntroSlideProps> = props => (
    <div
        className="intro-slide"
        style={{ backgroundColor: props.backgroundColor }}
    >
        <img src={props.icon} className="slide-icon" alt="slide-icon" />
        <div className="slide-text">{props.text}</div>
    </div>
)

export const Intro: FunctionComponent<RouteProps> = () => {
    return (
        <div className="intro-root">
            <Carousel>
                {introSlides.map(slideDef => (
                    <IntroSlide {...slideDef} />
                ))}
            </Carousel>
        </div>
    )
}
