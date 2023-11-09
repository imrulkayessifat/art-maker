import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"

const NegativePromt = () => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    Negative Promt
                    <AlertCircle />
                </AccordionTrigger>
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