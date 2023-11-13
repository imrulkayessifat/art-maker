"use client";

import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import Dialog from '@/components/dashboard/dialog';
import { Switch } from "@/components/ui/switch"
import HoverIcon from '@/components/dashboard/hover_icon';

const FormSchema = z.object({
    high_resolution: z.boolean().default(false).optional(),
})

const ArtDialog = () => {
    const [open, setOpen] = useState(false)
    const handleModel = () => {
        setOpen(!open);
    }
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            high_resolution: false,
        },
    })
    
    return (
        <div className="flex flex-col my-3 border-b-2">
            <div className="flex gap-2">
                <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Art Styles</span>
                <HoverIcon content="demo text" />
            </div>
            <Button onClick={handleModel} className='flex relative w-full items-center justify-between my-2 pr-1' variant={"model"}>
                <div>
                    <p>
                        Add Style
                    </p>
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
            <div className="flex items-center justify-between my-3 space-x-2 space-y-2">
                <Form {...form}>
                    <form className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="high_resolution"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>High Resolution</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <Dialog open={open} handleModel={handleModel} />
        </div>
    )
}

export default ArtDialog