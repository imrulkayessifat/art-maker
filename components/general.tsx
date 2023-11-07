"use client";

import { TextareaForm } from "@/components/textareaform"
import { FixedTextareaForm } from "@/components/fixedtextareaform";
import { Button } from "@/components/ui/button"
import { useViewportStore } from "@/hooks/store";
import { AiOutlineArrowRight } from 'react-icons/ai';

const General = () => {
    const { isInViewport } = useViewportStore();
    console.log(isInViewport)
    return (
        <div className='flex mt-16 flex-col items-center w-full'>
            <h1 className='text-4xl mr-6 md:text-5xl lg:text-6xl'>
                Text to image with AI Art
            </h1>
            <h1 className='text-4xl md:text-5xl lg:text-6xl'>
                Generator
            </h1>
            <div className='hidden md:block  mt-9'>
                <p className='font-sans text-lg mx-5'>
                    Create awe-inspiring masterpieces effortlessly and explore the endless possibilities of AI
                </p>
                <p className='font-sans text-lg '>
                    generated art. Enter a prompt, choose a style, and watch Imagine - AI art generator bring your
                </p>
                <p className='font-sans text-lg text-center'>
                    ideas to life!
                </p>
            </div>
            <div className='block md:hidden  mt-7'>
                <p className='font-sans text-lg mx-4'>
                    Bring your artistic visions to life with Imagine AI art generator, effortlessly
                </p>
                <p className='font-sans text-lg text-center'>
                    creating stunning AI-generated art.
                </p>
            </div>
            <div className='block md:hidden  mt-7'>
                <Button variant="sky">
                    <p className="font-sans text-base">Sign up for FREE</p>
                    <AiOutlineArrowRight className="bg-sky-400 ml-2" />
                </Button>
            </div>
            <TextareaForm />
            {
                !isInViewport && (
                    <FixedTextareaForm />
                )
            }
            <div className="hidden md:block mx-8 mt-9">
                <div className="flex items-center justify-between flex-wrap w-full gap-2">
                    <p className="font-sans text-lg">
                        No inspiration? Try these:
                    </p>
                    <Button variant="outline">A mechanical cyberpunk woman,looking into the camera</Button>
                    <Button variant="outline">Mechanical Modifier</Button>
                    <Button variant="outline">A cyberpunk woman with glasses</Button>
                    <Button variant="outline">Robert Patterson in exoskeleton armor</Button>
                    <Button variant="outline">A motorcycle in the city of ruins</Button>
                    <Button variant="outline">A beautiful woman in a leather jacket</Button>
                    <Button variant="outline">Women in Epic Fantasy</Button>
                </div>
            </div>
        </div>
    )
}

export default General