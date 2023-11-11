"use client";

import { useState } from 'react'
import { AlertCircle, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/dashboard/dialog';
import { Switch } from "@/components/ui/switch"
import HoverIcon from '@/components/dashboard/hover_icon';


const ArtDialog = () => {
    const [open, setOpen] = useState(false)
    const handleModel = () => {
        setOpen(!open);
    }
    return (
        <div className="flex flex-col my-3 border-b-2">
            <div className="flex gap-2">
                <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Art Styles</span>
                <HoverIcon content="demo text" />
            </div>
            <Button onClick={handleModel} className='flex w-full items-center justify-between gap-2 my-2' variant={"model"}>
                <p>Add Style</p>
                {
                    !open ? (
                        <ChevronRight className='w-3/4 h-3/4' />
                    ) : (
                        <ChevronDown className='w-3/4 h-3/4' />
                    )
                }
            </Button>
            <div className="flex items-center justify-between my-3 space-x-2 space-y-2">
                <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">
                    High Resolution
                </span>
                <Switch id="airplane-mode" />
            </div>
            <Dialog open={open} handleModel={handleModel} />
        </div>
    )
}

export default ArtDialog