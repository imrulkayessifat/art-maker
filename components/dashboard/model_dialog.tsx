"use client";
import Image from 'next/image'
import { useState } from 'react'
import { AlertCircle, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Dialog from './dialog';
import HoverIcon from '@/components/dashboard/hover_icon';

const ModelDialog = () => {
    const [open, setOpen] = useState(false)
    const handleModel = () => {
        setOpen(!open);
    }
    return (
        <div className="flex flex-col my-3 border-b-2">
            <div className="flex gap-2">
                <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Models</span>
                <HoverIcon content="demo text" />
            </div>
            <Button onClick={handleModel} className='flex justify-between gap-2 my-2' variant={"model"}>
                <Image
                    src={'https://1966211409.rsc.cdn77.org/appStuff/imagine-fncisndcubnsduigfuds/assets/styles_v1/Imagine_V3.5.webp'}
                    alt={''}
                    width={25}
                    height={25}
                    className='rounded-md'
                />
                <p>Imagine V4</p>
                {
                    !open ? (
                        <ChevronRight className='w-3/4 h-3/4' />
                    ) : (
                        <ChevronDown className='w-3/4 h-3/4' />
                    )
                }
            </Button>
            <Dialog open={open} handleModel={handleModel} />
        </div>
    )
}

export default ModelDialog