"use client";

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import HoverIcon from '@/components/dashboard/hover_icon'

const FormSchema = z.object({
    slider: z.array(z.number().min(3).max(30))
})


const Cfg = () => {
    const [sliderValue, setSliderValue] = useState(7.5);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            slider: [sliderValue]
        }
    })

    return (
        <div className="flex flex-col my-3 border-b-2">
            <div className="flex justify-between">
                <div className='flex gap-2'>
                    <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">CFG Scale</span>
                    <HoverIcon content="demo text" />
                </div>
                <span className='bg-slate-300 p-1 text-sm rounded-md text-slate-600'>{sliderValue.toFixed(1)}</span>
            </div>

            <Form {...form}>
                <form className="w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="slider"
                        render={({ field }) => (
                            <FormItem>
                                <Slider
                                    className='my-3'
                                    onValueChange={value => {
                                        setSliderValue(value[0]);
                                        field.onChange(value[0]);
                                    }}
                                    min={3}
                                    max={30}
                                    step={0.5}
                                    defaultValue={[sliderValue]}
                                />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}

export default Cfg