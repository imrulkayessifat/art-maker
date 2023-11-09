"use client";

import { useState } from 'react'
import { AlertCircle, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/dashboard/dialog';
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label';


const ArtDialog = () => {
    const [open, setOpen] = useState(false)
    const handleModel = () => {
        setOpen(!open);
    }
    return (
        <div className="flex flex-col mt-3 border-b-2">
            <div className="flex gap-2">
                <h1 className="text-base">Art Styles</h1>
                <AlertCircle />
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
            <div className="flex items-center justify-between mb-2 space-x-2 space-y-2">
                <Label htmlFor="airplane-mode">High Resolution</Label>
                <Switch id="airplane-mode" />
            </div>
            <Dialog open={open} handleModel={handleModel} />
        </div>
    )
}

export default ArtDialog