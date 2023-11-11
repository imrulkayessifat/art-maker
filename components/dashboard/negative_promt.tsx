import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import HoverIcon from "@/components/dashboard/hover_icon"

const NegativePromt = () => {
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
                    <Textarea
                        placeholder="Enter Text Here..."
                        className="hover:border-sky-500"
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default NegativePromt