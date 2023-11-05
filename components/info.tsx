import Link from 'next/link'
import React from 'react'

const Info = () => {
    return (
        <div className='block md:hidden bottom-10 w-full fixed z-10'>
            <div className='flex items-center justify-center'>
                <div className='rounded-lg flex justify-between w-1/2 bg-neutral-800 items-center m-2 p-2'>
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