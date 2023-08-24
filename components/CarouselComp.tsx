"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselComp() {
    return (
        <div className="max-w-[1300px] mx-auto">
            <Carousel showArrows={true} autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src="/images/banner/1.png" alt="Banner image"/>
                </div>
                <div>
                    <img src="/images/banner/2.png" alt="Banner image"/>
                </div>
                <div>
                    <img src="/images/banner/3.png" alt="Banner image"/>
                </div>
            </Carousel>
        </div>
    )
}