import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card'
import Image from 'next/image'

const data = [
    {
        name: "User Base",
        count: "6M"
    },
    {
        name: "Discord Community",
        count: "38K"
    },
    {
        name: "Images Processed",
        count: "70M"
    }
]

const Profile = () => {
    return (
        <>
            <div className='m-8 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    data.map((data, i) => (
                        <Card className='pl-10 max-w-[400px]'>
                            <CardHeader>
                                <CardTitle>{data.name}</CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <p className='font-sans text-5xl'>{data.count}</p>
                            </CardFooter>
                        </Card>

                    ))
                }
            </div>
            <div className='m-8'>
                <p className='font-sans text-4xl md:text-6xl lg:text-9xl '>Endless</p>
                <p className='font-sans text-4xl md:text-6xl lg:text-9xl '>Possibilities,</p>
                <h1 className='font-sans text-4xl md:text-6xl lg:text-9xl '>Just <span className='font-sans text-4xl md:text-6xl lg:text-9xl  text-sky-600'>imagine.</span></h1>
            </div>
        </>
    )
}

export default Profile