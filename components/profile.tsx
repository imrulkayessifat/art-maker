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
            <div className='m-8 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'>
                {
                    data.map((data, i) => (
                        <Card key={i} className='pl-10 flex flex-col justify-between max-w-[350px] h-[200px]'>
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
            <div className='m-8 flex justify-center flex-col'>
                <p className='font-sans text-7xl md:text-8xl lg:text-9xl '>Endless</p>
                <p className='font-sans text-7xl md:text-8xl lg:text-9xl '>Possibilities,</p>
                <h1 className='font-sans text-7xl md:text-8xl lg:text-9xl '>Just <span className='font-sans text-7xl md:text-8xl lg:text-9xl  text-sky-600'>imagine.</span></h1>
            </div>
        </>
    )
}

export default Profile