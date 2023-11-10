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

const aiCalculatedData = [
  {
    text: 'brown elk in a forest meadow minimal ink doodle art'
  },
  {
    text: 'Detailed portrait of a noble feline warrior in armor, kneeling pose, elaborate craftsmanship, silver-toned, luxurious fabric, cinematic illumination, 4K resolution'
  },
  {
    text: 'Detailed portrayal of a malevolent werewolf in Vampire: The Masquerade setting; sinister aura, mystical, crimson shade, ominous sorcery splatter, Gothic, pastel tetradic hues, 3D vector artwork, endearing and peculiar, fantastical depiction, watercolor-style effects, bokeh, Adobe Illustrator, hand-drawn aesthetic, digital painting, low-poly design, gentle illumination, top-down perspective, isometric visual style, retro-inspired atmosphere, emphasizes character, 4K resolution, photorealistic rendering, crafted using Unreal Engine 5'
  },
  {
    text: 'Regal monarch strolling opulent courtyard, encircled by blossoming blooms and accompanied by devoted aides. Showcase artistic prowess, capturing elegance and poise of this majestic persona'
  },
  {
    text: 'Detailed illustration, protagonist, sunrise, vibrant colors, journey, hidden wonders, magical land, sun painted sky, orange and pink hues'
  }
]


export function TextareaForm() {


  const [textAreaValue, setTextAreaValue] = useState<string>(aiCalculatedData[0].text);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: textAreaValue
    }
  })
  const isLoading = form.formState.isSubmitting;

  const ref = useRef(null);

  const isInViewPort = useIsInViewport({ ref });
  const setInViewport = useViewportStore((state) => state.setInViewport);

  useEffect(() => {
    setInViewport(isInViewPort);
  }, [isInViewPort]);

  const generateText = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const randomValue = Math.random();
    const scaledValue = Math.floor(randomValue * 5);
    setTextAreaValue(aiCalculatedData[scaledValue].text);
    console.log(textAreaValue)
  }

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
        relative 
        `}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Textarea
                  placeholder="brown elk in a forest meadow minimal ink doodle art"
                  className="
                    resize-none 
                    w-full 
                    hidden 
                    md:block 
                    pr-44
                  "
                  {...field}
                  value={textAreaValue}
                  onChange={(e) => {
                    field.onChange(e);
                    setTextAreaValue(e.target.value);
                  }}

                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
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
            onClick={generateText}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28" className="text-neutral-900"><path d="m13.998 9.688-1.147 1.952c-.258.43-.043.787.46.787h1.362c.515 0 .719.357.461.788l-1.136 1.952M10.246 24.5a14.012 14.012 0 0 1 7.504 0m-7.719-4.157v-1.218c-2.466-1.46-4.492-4.304-4.492-7.327 0-5.197 4.878-9.27 10.389-8.094 2.423.525 4.546 2.1 5.65 4.272 2.24 4.41-.118 9.091-3.581 11.139v1.217c0 .305.118 1.008-1.03 1.008H11.06c-1.179.01-1.029-.44-1.029-.997Z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </Button>
          <Button variant="sky" type="submit"
            className="
            absolute 
            hidden 
            md:block
          hover:bg-sky-600 
            right-0 
            top-0 
            mr-4 
            mt-2"
            disabled={!textAreaValue || isLoading}
          >
            Generate
          </Button>
        </div>
      </form>
    </Form >
  )
}

