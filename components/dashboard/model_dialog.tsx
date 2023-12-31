"use client";
import Image from 'next/image'
import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Dialog from '@/components/dashboard/dialog';
import HoverIcon from '@/components/dashboard/hover_icon';
import { useDataStore } from '@/hooks/useModalDialog';

const ModelDialog = () => {
    const [open, setOpen] = useState(false)
    const model = useDataStore((state) => state.model);
    const handleModel = () => {
        setOpen(!open);
    }
    return (
        <div className="flex flex-shrink-0 flex-col my-3 border-b-2">
            <div className="flex flex-shrink-0 gap-2">
                <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Models</span>
                <HoverIcon content="demo text" />
            </div>
            <Button onClick={handleModel} className='flex w-full flex-shrink-0 justify-between my-2 pr-1' variant={"model"}>
                <div className='flex flex-shrink-0 justify-between gap-2'>
                    <Image
                        src={model.img}
                        alt={''}
                        width={25}
                        height={25}
                        className='rounded-md'
                    />
                    <span className='text-sm'>{model.txt}</span>
                </div>
                <div>
                    {
                        !open ? (
                            <ChevronRight className='w-3/4 h-3/4' />
                        ) : (
                            <ChevronDown className='w-3/4 h-3/4' />
                        )
                    }
                </div>
            </Button>
            <Dialog open={open} handleModel={handleModel} />
        </div>
    )
}

export default ModelDialog