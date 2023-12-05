"use client";

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { useViewportStore } from '@/hooks/store';

const Info = () => {
    const {isInViewport} = useViewportStore()
    
    return (
        <div className={`block md:hidden bottom-10 w-full fixed z-10 ${isInViewport ? 'opacity-0' : ''}`}>
            <div className='flex items-center justify-center'>
                <div className='rounded-lg min-w-[230px] flex justify-evenly w-1/2 bg-neutral-800 items-center m-2 py-3'>
                    <div className='mx-2 pr-4 border-r-2 '>
                        <Link href={'/'}>
                            <p className='text-white'>
                                Discord
                            </p>
                        </Link>
                    </div>
                    <div className='mx-2 pr-4 border-r-2'>
                        <Link href={'/'}>
                            <p className='text-white'>
                                Blog
                            </p>
                        </Link>
                    </div>
                    <div className='mx-2 '>
                        <Link href={'/'}>
                            <p className='text-white'>
                                Affiliate
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info