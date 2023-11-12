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
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import HoverIcon from "@/components/dashboard/hover_icon"

const FormSchema = z.object({
    negative_prompt: z
        .string()
        .min(3, {
            message: "Negative Prompt must be at least 3 characters.",
        })
        .max(20, {
            message: "Negative Prompt must not be longer than 20 characters.",
        }),
})

const NegativePromt = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    console.log(form.getValues('negative_prompt'))
    return (
        <Accordion type="single" collapsible className="w-full my-3">
            <AccordionItem value="item-1">
                <div className="w-full my-3 flex justify-between">
                    <div className="flex gap-2">
                        <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Negative Prompt</span>
                        <HoverIcon content="demo text" />
                    </div>
                    <AccordionTrigger className="flex justify-between py-0">

                    </AccordionTrigger>
                </div>
                <AccordionContent className="">
                    <Form {...form}>
                        <form className="w-full space-y-6">
                            <FormField
                                control={form.control}
                                name="negative_prompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter Text Here..."
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default NegativePromt