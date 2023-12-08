import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { tools } from "@/lib/tools"

const Tools = () => {
    return (
        <div className='flex flex-col m-8 gap-6'>
            <div className='flex flex-col gap-1'>
                <p className='font-sans text-base'>
                    DISCOVER THE POTENTIAL OF
                </p>
                <h1 className='font-sans text-6xl'>
                    Our AI Tools
                </h1>
                <p className='font-sans text-2xl'>
                    Explore Our AI Image Generator Tools for Creating Captivating AI Generated Art. Explore a world of infinite
                </p>
                <p className='font-sans text-2xl'>
                    inspiration and take your artworks to new heights with our AI image generator tools.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center w-full gap-5'>
                {
                    tools.map((tool, i) => (
                        <Card key={i} className="pb-2 max-h-[450px] max-w-[458px]">
                            <CardContent className="p-2">
                                <Image
                                    src={tool.img}
                                    alt={""}
                                    layout='responsive'
                                    width={240}
                                    height={281}
                                    objectFit='cover'
                                    className="rounded-md"
                                />
                            </CardContent>
                            <CardFooter className="flex py-2 rounded-md bg-gray-800 mx-2 justify-between">
                                <div>
                                    <p className="font-sans text-white text-base md:text-xl">
                                        {tool.p1}
                                    </p>
                                    <p className="font-sans text-white text-sm md:text-base">
                                        {tool.p2}
                                    </p>
                                </div>
                                <Button variant={"sky"}>Generate</Button>
                            </CardFooter>
                        </Card>
                    ))
                }

            </div>
        </div>
    )
}

export default Tools