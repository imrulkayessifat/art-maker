import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

const AspectRatio = () => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    Aspect Ratio
                    <AlertCircle />
                </AccordionTrigger>
                <AccordionContent className="">
                    <Button className="mr-2 mb-2 rounded-md" variant={"ratio"}>
                        1:1
                    </Button>
                    <Button className="mr-2 mb-2 rounded-md" variant={"ratio"}>
                        9:16
                    </Button>
                    <Button className="mr-2 mb-2 rounded-md" variant={"ratio"}>
                        16:9
                    </Button>
                    <Button className="mr-2 mb-2 rounded-md" variant={"ratio"}>
                        4:3
                    </Button>
                    <Button className="mr-2 mb-2 rounded-md" variant={"ratio"}>
                        3:2
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default AspectRatio