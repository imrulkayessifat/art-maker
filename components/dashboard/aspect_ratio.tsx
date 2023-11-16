"use client"

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
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import HoverIcon from "@/components/dashboard/hover_icon"

const FormSchema = z.object({
    data: z.string().min(1)
})


const buttons = ['1:1', '9:16', '16:9', '4:3', '3:2']

const AspectRatio = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            data: '1:1'
        }
    })

    console.log(form.watch("data"))
    return (
        <Accordion type="single" collapsible className="w-full my-3">
            <AccordionItem value="item-1">
                <div className="w-full mb-3 flex flex-shrink-0 justify-between">
                    <div className="flex flex-shrink-0 gap-2">
                        <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Aspect Ratio</span>
                        <HoverIcon content="demo text" />
                    </div>
                    <AccordionTrigger className="flex flex-shrink-0 justify-between py-0">
                    </AccordionTrigger>
                </div>
                <AccordionContent className="">
                    <Form {...form}>
                        <form className="w-full space-y-6">
                            <FormField
                                control={form.control}
                                name="data"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Ratio" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    buttons.map((button, i) => (
                                                        <SelectItem key={i} value={button}>{button}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>

                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>

                </AccordionContent>
            </AccordionItem>
        </Accordion >
    )
}

export default AspectRatio