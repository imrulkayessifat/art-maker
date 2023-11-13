"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import HoverIcon from '@/components/dashboard/hover_icon'

const FormSchema = z.object({
    seed: z.number().min(1, {
        message: "seed must be at least 1.",
    }).max(5, {
        message: "seed must be at most 5.",
    }),
})

const Seed = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            seed: 1
        },
    })
   
    return (
        <div className="flex flex-col my-3">
            <div className="flex gap-2">
                <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Seed</span>
                <HoverIcon content="demo text" />
            </div>
            <Form {...form}>
                <form className="w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="seed"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className='my-2' type="text" placeholder="Enter a seed" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}

export default Seed