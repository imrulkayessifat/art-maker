"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { images } from '@/lib/slider/images';
import { secondImages } from '@/lib/slider/secondImages';

const ImageSlider = () => {

    const [scrollPosition1, setScrollPosition1] = useState(-500);
    const [scrollPosition2, setScrollPosition2] = useState(-600);
    const [inViewRef1, inView1] = useInView({
        threshold: 0.2,
    });
    const [inViewRef2, inView2] = useInView({
        threshold: 0.2,
    });

    const [prevScrollValue1, setPrevScrollValue1] = useState(0);
    const [prevScrollValue2, setPrevScrollValue2] = useState(0);

    const handleScroll1 = useCallback(() => {
        if (typeof window !== 'undefined') {
            const currentScrollPos = window.scrollY;
            if (inView1) {
                if (currentScrollPos > prevScrollValue1) {
                    setScrollPosition1((prev) => prev + 3)
                } else {
                    setScrollPosition1((prev) => prev - 3)
                }
            }
            setPrevScrollValue1(currentScrollPos);
        }
    }, [ prevScrollValue1, inView1])


    const handleScroll2 = useCallback(() => {
        if (typeof window !== 'undefined') {
            const currentScrollPos = window.scrollY;
            if (inView2) {
                if (currentScrollPos > prevScrollValue2) {
                    setScrollPosition2((prev) => prev - 5)
                } else {
                    setScrollPosition2((prev) => prev + 5)
                }
            }
            setPrevScrollValue2(currentScrollPos);
        }
    }, [ prevScrollValue2, inView2])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll1);
            window.addEventListener('scroll', handleScroll2);
            return () => {
                window.removeEventListener('scroll', handleScroll1);
                window.removeEventListener('scroll', handleScroll2);
            };
        }
    }, [prevScrollValue1, prevScrollValue2, inView1, inView2]);

    const sliderStyle1: React.CSSProperties = {
        transform: `translate3d(${scrollPosition1}px,0px,0px)`,
        transition: 'transform 0.05s ease-in',
        position: 'relative',
    };

    const sliderStyle2: React.CSSProperties = {
        transform: `translate3d(${scrollPosition2}px,0px,0px)`,
        transition: 'transform 0.05s ease-in',
        position: 'relative',
    };
    return (
        <div className='hidden md:flex flex-col gap-6 '>
            <div className='flex flex-col gap-1 m-8'>
                <p className='font-sans text-base'>
                    DIVE INTO THE WORLD OF
                </p>
                <h1 className='font-sans text-6xl'>
                    AI-Generated Art
                </h1>
                <p className='font-sans text-2xl'>
                    {"See Imagine's potential unfold and create captivating art on our Text-to-Art Generator"}
                </p>
            </div>

            <div className='flex flex-col gap-2 overflow-hidden'>
                <div ref={inViewRef1} className='intersection-observer-target'>
                    <div style={sliderStyle1} className='flex gap-2 items-center justify-between'>
                        {images.map((image, i) => (
                            <Image
                                key={i}
                                src={image}
                                alt={''}
                                width={"250"}
                                height={"250"}
                                className='rounded-md'
                            />
                        ))}
                    </div>
                </div>
                <div ref={inViewRef2} className='intersection-observer-target'>
                    <div style={sliderStyle2} className='flex gap-2 items-center justify-between'>
                        {secondImages.map((image, i) => (
                            <Image
                                key={i}
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
        </div>
    )
}

export default ImageSlider