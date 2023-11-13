"use client";

import { useState, useRef, useEffect } from 'react';
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
import useIsInViewport from '@/hooks/useIsInViewport';
import { useViewportStore } from '@/hooks/store';
import { useImageStore } from '@/hooks/image';
import { useTextBoxModal } from '@/hooks/useTextBoxModal';

const FormSchema = z.object({
    text: z
        .string()
        .min(5, {
            message: "text must be at least 5 characters.",
        })
        .max(160, {
            message: "text must not be longer than 160 characters.",
        }),
})

export function TextBox() {

    const [isHovered, setIsHovered] = useState(false);
    const [image, setImage] = useState('/tea-leaf.png');
    const setInImage = useImageStore((state) => state.setInImage);
    const textBoxModal = useTextBoxModal();

    useEffect(()=>{
        setInImage(image);
    },[image])

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const isLoading = form.formState.isSubmitting;

    const ref = useRef(null);

    const isInViewPort = useIsInViewport({ ref });
    const setInViewport = useViewportStore((state) => state.setInViewport);

    useEffect(() => {
        setInViewport(isInViewPort);
    }, [isInViewPort]);


    function onSubmit(data: z.infer<typeof FormSchema>) {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                resolve(
                    setImage('/tea-leaf.png')
                );
            }, 2000);
        });
    }
    console.log(image)
    return (
        <>
            <Form {...form}>
                <form
                    ref={ref}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={`
                    w-2/3  
                    space-y-6 
                    mt-9 
                    relative 
                `}
                >
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormControl>
                                    <Textarea
                                        placeholder="brown elk in a forest meadow minimal ink doodle art"
                                        className={`
                                        resize-none 
                                        w-full 
                                        ${isHovered ? 'h-[100px]' : ''}
                                        hover:border-sky-400
                                        hidden 
                                        md:block 
                                        pr-44
                                    `}
                                        {...field}
                                        value={field.value}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        {
                            !isHovered ? (
                                <Button
                                    type="button"
                                    variant={"ghost"}
                                    disabled={isLoading}
                                    className="
                                    absolute 
                                    hidden 
                                    md:block
                                    top-0
                                    mt-2
                                    right-28
                                "
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-0 text-neutral-900 dark:text-white" xmlns="http://www.w3.org/2000/svg"><path d="M5.88333 10.5498H7.47222C9.0611 10.5498 9.85555 9.76626 9.85555 8.19911V6.63197C9.85555 5.06482 9.0611 4.28125 7.47222 4.28125H5.88333C4.29444 4.28125 3.5 5.06482 3.5 6.63197V8.19911C3.5 9.76626 4.29444 10.5498 5.88333 10.5498Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"></path><path d="M5.88333 20.999H7.47222C9.0611 20.999 9.85555 20.2155 9.85555 18.6483V17.0812C9.85555 15.514 9.0611 14.7305 7.47222 14.7305H5.88333C4.29444 14.7305 3.5 15.514 3.5 17.0812V18.6483C3.5 20.2155 4.29444 20.999 5.88333 20.999Z" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"></path><path d="M16.4771 20.999H18.066C19.6549 20.999 20.4493 20.2155 20.4493 18.6483V17.0812C20.4493 15.514 19.6549 14.7305 18.066 14.7305H16.4771C14.8882 14.7305 14.0938 15.514 14.0938 17.0812V18.6483C14.0938 20.2155 14.8882 20.999 16.4771 20.999Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"></path><path d="M18.6966 9.84082L19.7265 8.82502C20.7564 7.80923 20.7564 6.79343 19.7265 5.77764L18.6966 4.76185C17.6668 3.74605 16.6369 3.74605 15.607 4.76185L14.5771 5.77764C13.5472 6.79343 13.5472 7.80923 14.5771 8.82502L15.607 9.84082C16.6369 10.8566 17.6668 10.8566 18.6966 9.84082Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"></path></svg>
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    variant={"ghost"}
                                    disabled={isLoading}
                                    className="
                                    absolute 
                                    hidden 
                                    md:block
                                    top-0
                                    mt-2
                                    right-28
                                "
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => textBoxModal.onOpen()}
                                >
                                    <svg className="h-6 w-6 text-neutral-900 dark:text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="tag"><path id="Vector" d="M4.36903 15.2199L4.89962 14.6899H4.89962L4.36903 15.2199ZM8.78381 19.6391L8.25322 20.1692L8.78381 19.6391ZM15.3621 19.6391L15.8913 20.1706L15.8927 20.1692L15.3621 19.6391ZM19.6405 8.77164L20.1725 8.24299L20.1699 8.2404L19.6405 8.77164ZM15.2159 4.36221L14.6854 4.89228L14.6865 4.89344L15.2159 4.36221ZM11.7075 3.00621L11.7435 3.75535L11.7467 3.75519L11.7075 3.00621ZM6.83468 3.24034L6.86843 3.98958L6.87067 3.98948L6.83468 3.24034ZM3.23853 6.82056L2.48947 6.78296L2.48939 6.78464L3.23853 6.82056ZM3.00464 11.6982L2.25549 11.6623L2.25537 11.665L3.00464 11.6982ZM3.83843 15.75L8.25322 20.1692L9.31441 19.1091L4.89962 14.6899L3.83843 15.75ZM8.25322 20.1692C10.3596 22.2777 13.777 22.2757 15.8913 20.1706L14.833 19.1076C13.3024 20.6316 10.8334 20.6295 9.31441 19.1091L8.25322 20.1692ZM15.8927 20.1692L20.1711 15.8866L19.1099 14.8264L14.8315 19.1091L15.8927 20.1692ZM20.1711 15.8866C22.2771 13.7785 22.2751 10.359 20.1725 8.243L19.1085 9.30028C20.6313 10.8328 20.6293 13.3056 19.1099 14.8264L20.1711 15.8866ZM20.1699 8.2404L15.7454 3.83097L14.6865 4.89344L19.1111 9.30287L20.1699 8.2404ZM15.7465 3.83214C14.6725 2.75706 13.1896 2.17769 11.6683 2.25723L11.7467 3.75519C12.8373 3.69816 13.9077 4.11384 14.6854 4.89227L15.7465 3.83214ZM11.6715 2.25708L6.79869 2.4912L6.87067 3.98948L11.7435 3.75535L11.6715 2.25708ZM6.80093 2.4911C4.464 2.59637 2.60623 4.45711 2.48947 6.78296L3.98759 6.85817C4.06574 5.30138 5.30709 4.05991 6.86843 3.98958L6.80093 2.4911ZM2.48939 6.78464L2.2555 11.6623L3.75377 11.7342L3.98767 6.85649L2.48939 6.78464ZM2.25537 11.665C2.18758 13.1918 2.76371 14.6742 3.83843 15.75L4.89962 14.6899C4.12267 13.9122 3.70474 12.8387 3.7539 11.7315L2.25537 11.665ZM11.2499 9.56182C11.2499 10.4952 10.4941 11.2507 9.56347 11.2507V12.7507C11.324 12.7507 12.7499 11.3223 12.7499 9.56182H11.2499ZM9.56347 11.2507C8.63279 11.2507 7.87705 10.4952 7.87705 9.56182H6.37705C6.37705 11.3223 7.80295 12.7507 9.56347 12.7507V11.2507ZM7.87705 9.56182C7.87705 8.6284 8.63279 7.87298 9.56347 7.87298V6.37298C7.80295 6.37298 6.37705 7.80138 6.37705 9.56182H7.87705ZM9.56347 7.87298C10.4941 7.87298 11.2499 8.6284 11.2499 9.56182H12.7499C12.7499 7.80138 11.324 6.37298 9.56347 6.37298V7.87298Z" fill="currentColor"></path></g></svg>
                                </Button>
                            )
                        }

                        <Button
                            variant="sky"
                            type="submit"
                            className="
                            absolute 
                            hidden 
                            md:block
                          hover:bg-sky-600 
                            right-0 
                            top-0 
                            mr-4 
                            mt-2
                        "
                            disabled={isLoading}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {
                                isLoading ? (
                                    <svg
                                        viewBox="0 0 1024 1024"
                                        fill="currentColor"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z" />
                                    </svg>
                                ) : (
                                    <p>Generate</p>
                                )
                            }
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}

