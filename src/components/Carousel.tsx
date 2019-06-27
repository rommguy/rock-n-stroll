import React, { FunctionComponent } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.scss'
import 'slick-carousel/slick/slick.scss'
import './Carousel.scss'

const settings: Settings = {
    dots: true,
    speed: 500,
    infinite: false,
    autoplay: false,
    easing: 'ease-in-out',
    focusOnSelect: true,
    initialSlide: 2,
}

export const Carousel: FunctionComponent<{}> = props => {
    return (
        <div className="carousel-wrapper carousel-wrapper-dots height-as-parent">
            <Slider {...settings}>{props.children}</Slider>
        </div>
    )
}
