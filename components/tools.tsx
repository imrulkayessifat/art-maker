import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

import Image from "next/image"

const Tools = () => {
    return (
        <div className='flex flex-col gap-6 m-8'>
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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <Card className="pb-2">
                    <CardContent className="p-2">
                        <Image
                            src={"https://cdn1.imagine.art/imagine-frontend/assets/images/TexttoImage.webp"}
                            alt={""}
                            layout='responsive'
                            width={500}
                            height={281}
                            objectFit='cover'
                            className="rounded-md"
                        />
                    </CardContent>
                    <CardFooter className="flex rounded-md bg-gray-800 mx-2 justify-between">
                        <div>
                            <p className="font-sans text-white text-base md:text-xl">
                                Text to Image
                            </p>
                            <p className="font-sans text-white text-sm md:text-base">
                                Transform your words into stunning AI visuals with our text-to-image feature
                            </p>
                        </div>
                        <Button variant={"sky"}>Generate</Button>
                    </CardFooter>
                </Card>

                <Card className="pb-2">
                    <CardContent className="p-2">
                        <Image
                            src={"https://cdn1.imagine.art/imagine-frontend/assets/images/ImageRemix.webp"} alt={""}
                            layout='responsive'
                            width={500}
                            height={281}
                            objectFit='cover'
                            className="rounded-md"
                        />
                    </CardContent>
                    <CardFooter className="flex rounded-md bg-gray-800 mx-2 justify-between">
                        <div>
                            <p className="font-sans text-white text-base md:text-xl">
                                Image Remix
                            </p>
                            <p className="font-sans text-white text-sm md:text-base">
                                Add creativity to your photos and turn them into beautiful artworks.
                            </p>
                        </div>
                        <Button variant={"sky"}>Generate</Button>
                    </CardFooter>
                </Card>

                <Card className="pb-2">
                    <CardContent className="p-2">
                        <Image
                            src={"https://cdn1.imagine.art/imagine-frontend/assets/images/ImageRemix.webp"} alt={""}
                            layout='responsive'
                            width={500}
                            height={281}
                            objectFit='cover'
                            className="rounded-md"
                        />
                    </CardContent>
                    <CardFooter className="flex rounded-md bg-gray-800 mx-2 justify-between">
                        <div>
                            <p className="font-sans text-white text-base md:text-xl">
                                Inpainting
                            </p>
                            <p className="font-sans text-white text-sm md:text-base">
                                Say goodbye to unwanted objects with our AI Inpainting feature!
                            </p>
                        </div>
                        <Button variant={"sky"}>Generate</Button>
                    </CardFooter>
                </Card>

                <Card className="pb-2">
                    <CardContent className="p-2">
                        <Image
                            src="https://cdn1.imagine.art/imagine-frontend/assets/images/ExpandImage.webp" alt={""}
                            layout='responsive'
                            width={500}
                            height={281}
                            objectFit='cover'
                            className="rounded-md"
                        />
                    </CardContent>
                    <CardFooter className="flex rounded-md bg-gray-800 mx-2 justify-between">
                        <div>
                            <p className="font-sans text-white text-base md:text-xl">
                                Expand Image
                            </p>
                            <p className="font-sans text-white text-sm md:text-base">
                                Our AI Expand Image function will help you broaden your horizons.
                            </p>
                        </div>
                        <Button variant={"sky"}>Generate</Button>
                    </CardFooter>
                </Card>

                <Card className="pb-2">
                    <CardContent className="p-2">
                        <Image
                            src="https://cdn1.imagine.art/imagine-frontend/assets/images/BackgroundReplace.webp" alt={""}
                            layout='responsive'
                            width={500}
                            height={281}
                            objectFit='cover'
                            className="rounded-md"
                        />
                    </CardContent>
                    <CardFooter className="flex rounded-md bg-gray-800 mx-2 justify-between">
                        <div>
                            <p className="font-sans text-white text-base md:text-xl">
                                Background Replace
                            </p>
                            <p className="font-sans text-white text-sm md:text-base">
                                Transform your photos with our AI Background Replace feature to look charm!
                            </p>
                        </div>
                        <Button variant={"sky"}>Generate</Button>
                    </CardFooter>
                </Card>


            </div>
        </div>
    )
}

export default Tools