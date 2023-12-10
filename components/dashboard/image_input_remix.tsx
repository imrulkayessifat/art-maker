"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from 'axios'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useImageRemixStore } from "@/hooks/image_remix"
import { toast } from "@/components/ui/use-toast"


const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
const FormSchema = z.object({
    image: z
        .any()
        .refine((files) => {
            return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
});

const ImageInputRemix = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const setInImageRemix = useImageRemixStore((state) => state.setInImageRemix);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            image: ''
        }
    });


    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (!selectedFile) return

        try {
            const data = new FormData()
            data.append(`image`, selectedFile)
            const res = await axios.post('/api/image', data);
            console.log(res);
            setInImageRemix(selectedFile)
        } catch (e: any) {
            console.error(e)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-9 space-y-6">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    id="picture"
                                    type="file"
                                    onChange={(e) => {
                                        field.onChange(e.target.files);
                                        setSelectedFile(e.target.files?.[0] || null);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Send</Button>
            </form>
        </Form>
    )
}

export default ImageInputRemix