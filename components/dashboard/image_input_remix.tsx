"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
})
const ImageInputRemix = () => {
    const [fileError, setFileError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const setInImageRemix = useImageRemixStore((state) => state.setInImageRemix);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const validateFile = (file: File | null) => {
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setFileError('Max image size is 5MB.');
            } else if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                setFileError('Only .jpg, .jpeg, .png, and .webp formats are supported.');
            } else {
                setFileError(null);
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        validateFile(file);
        setSelectedFile(file);
        if(file) {
            setInImageRemix(file)
        }
    }

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-9 space-y-6">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input id="picture" type="file" {...field} onChange={handleFileChange} />
                            </FormControl>
                            {fileError && <FormMessage>{fileError}</FormMessage>}
                        </FormItem>
                    )}
                />
                {/* <Button type="submit">Send</Button> */}
            </form>
        </Form>
    )
}

export default ImageInputRemix