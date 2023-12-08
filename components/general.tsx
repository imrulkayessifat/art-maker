"use client";

import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from 'framer-motion'

import { TextareaForm } from "@/components/textareaform";
import { FixedTextareaForm } from "@/components/fixedtextareaform";
import { Button } from "@/components/ui/button";
import { useViewportStore } from "@/hooks/store";

const searchText = [
  "A mechanical cyberpunk woman,looking into the camera",
  "Mechanical Modifier",
  "A cyberpunk woman with glasses",
  "Robert Patterson in exoskeleton armor",
  "A motorcycle in the city of ruins",
  "A beautiful woman in a leather jacket",
  "Women in Epic Fantasy"
]

const General = () => {
  const { isInViewport } = useViewportStore();
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100
    },
    animate: (key:number)=>({
      opacity: 1,
      y: 0,
      transition:{
        delay:0.1 * key
      }
    })
  }
  return (
    <>
      <div className="flex  pt-16 flex-col items-center w-full">
        <h1 className="text-3xl mr-6 mt-5 md:text-5xl lg:text-6xl">
          Text to image with AI Art
        </h1>
        <h1 className="text-3xl md:text-5xl lg:text-6xl">Generator</h1>
        <div className="hidden md:block  mt-10">
          <p className="font-sans text-lg mx-5">
            Create awe-inspiring masterpieces effortlessly and explore the
            endless possibilities of AI
          </p>
          <p className="font-sans text-lg ">
            generated art. Enter a prompt, choose a style, and watch Imagine -
            AI art generator bring your
          </p>
          <p className="font-sans text-lg text-center">ideas to life!</p>
        </div>
        <div className="block md:hidden  mt-10">
          <p className="font-sans text-lg mx-4">
            Bring your artistic visions to life with Imagine AI art generator,
            effortlessly
          </p>
          <p className="font-sans text-lg text-center">
            creating stunning AI-generated art.
          </p>
        </div>
        <div className="block md:hidden mt-10">
          <Button variant="sky">
            <p className="font-sans text-base">Sign up for FREE</p>
            <AiOutlineArrowRight className="bg-sky-400 ml-2" />
          </Button>
        </div>
        <TextareaForm />
        {!isInViewport && <FixedTextareaForm />}
        <div className="hidden md:block mx-8 mt-16">
          <div className="flex items-center justify-between flex-wrap w-full gap-2">
            <p className="font-sans text-lg">No inspiration? Try these:</p>
            {
              searchText.map((data, key) => (
                <motion.li
                  key={key}
                  className="list-none"
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once:true
                  }}
                  custom={key}
                >
                  <Button variant="outline">
                    {data}
                  </Button>
                </motion.li>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default General;
