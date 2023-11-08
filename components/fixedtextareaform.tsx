"use client";

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    bio: z
        .string()
        .min(5, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
})

export function FixedTextareaForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const [textAreaValue, setTextAreaValue] = useState('This is the default text');

    const ref = useRef(null);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form
                ref={ref}
                onSubmit={form.handleSubmit(onSubmit)}
                className={`
                    w-2/3  
                    space-y-6 
                    mt-9 
                    bottom-10
                    hidden
                    md:fixed
                    md:block
                    z-50
                `}>
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none w-full  pr-20"
                                    {...field}
                                    value={textAreaValue}
                                    onChange={(e) => setTextAreaValue(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button variant="sky" type="submit" className="absolute hover:bg-sky-600 right-0 top-0 mr-3 mt-2" disabled={!textAreaValue}>Generate</Button>
            </form>
        </Form >
    )
}

