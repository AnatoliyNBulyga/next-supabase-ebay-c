"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const bannerUrls = [
    '/images/banner/1.png',
    '/images/banner/2.png',
    '/images/banner/3.png',
]

export default function CarouselComp() {
    return (
        <div className="max-w-[1300px] mx-auto">
            <Carousel showArrows={true} autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false}>
                {
                    bannerUrls.map(ban => (
                        <div
                            key={ban}
                            className="relative overflow-hidden w-full h-[310px]"
                        >
                            <Image
                                fill
                                src={ban}
                                alt="Banner image"
                                className="object-cover object-center"
                                sizes="(max-width: 768px)"
                            />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}