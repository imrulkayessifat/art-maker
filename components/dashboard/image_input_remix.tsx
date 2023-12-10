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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
    image: z.string()
})
const ImageInputRemix = () => {
    const [fileError, setFileError] = useState<string | null>(null);
    const [fileName,setFileName] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const setInImageRemix = useImageRemixStore((state) => state.setInImageRemix);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues:{
            image:''
        }
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        validateFile(file);
        setSelectedFile(file);
    }

    const onSubmit = async () => {
        if(!selectedFile) return

        try {
            const data = new FormData()
            data.append(`image`,selectedFile)
            const res = await axios.post('/api/image',data);
            console.log(res);
            setInImageRemix(selectedFile)
        } catch (e:any) {
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
                                <Input id="picture" type="file" {...field} onChange={handleFileChange} />
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