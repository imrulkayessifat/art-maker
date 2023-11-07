"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageSlider = () => {
    const images = [
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider1.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider32.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider26.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider34.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider18.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider10.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider27.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider4.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider16.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider5.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider35.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider8.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider11.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider31.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider36.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider20.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider23.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider17.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider30.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider40.webp",
    ];

    const secondImages = [
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider22.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider21.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider13.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider28.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider41.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider24.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider14.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider3.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider12.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider29.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider15.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider25.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider39.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider2.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider6.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider7.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider33.webp",
        'https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider38.webp',
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider37.webp",
        "https://cdn1.imagine.art/imagine-frontend/assets/images/RowImageSlider19.webp",
    ];

    const [scrollPosition, setScrollPosition] = useState(0);
  
    const handleScroll = () => {
        if (window.scrollY - 3400 < -200) {
            setScrollPosition(window.scrollY - 3400);
        } else {
            setScrollPosition(window.scrollY - 4300);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const sliderStyle = {
        transform: `translate3d(${scrollPosition-100}px,0px,0px)`,
        transition: 'transform 0.5s ease-in-out',
        position: 'relative', // Add this line
    };

    const secondSliderStyle = {
        transform: `translate3d(${-scrollPosition-1000}px,0px,0px)`, // Opposite direction
        transition: 'transform 0.5s ease-in-out',
        position: 'relative',
    };
    return (
        <div className='flex flex-col gap-6 '>
            <div className='flex flex-col gap-1 m-8'>
                <p className='font-sans text-base'>
                    DIVE INTO THE WORLD OF
                </p>
                <h1 className='font-sans text-6xl'>
                    AI-Generated Art
                </h1>
                <p className='font-sans text-2xl'>
                    See Imagine's potential unfold and create captivating art on our Text-to-Art Generator
                </p>
            </div>
            {/* firstimageslide */}
            <div className='flex flex-col gap-2 overflow-hidden'>
                <div style={sliderStyle} className='flex gap-2 items-center justify-between'>
                    {images.map((image, i) => (
                        <Image
                            src={image}
                            alt={''}
                            width={"250"}
                            height={"250"}
                            className='rounded-md'
                        />
                    ))}
                </div>
                {/* secondimageslide */}
                <div style={secondSliderStyle} className='flex gap-2 items-center justify-between'>
                    {secondImages.map((image, i) => (
                        <Image
                            src={image}
                            alt={''}
                            width={"250"}
                            height={"250"}
                            className='rounded-md'
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageSlider