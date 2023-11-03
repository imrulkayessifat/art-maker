import Link from 'next/link'
import React from 'react'

const Info = () => {
    return (
        <div className='block md:hidden bottom-10 w-full fixed z-10'>
            <div className='flex items-center justify-center'>
                <div className='rounded flex justify-between w-1/2 bg-slate-900 items-center border-2 m-2 p-2'>
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