import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import HoverIcon from "@/components/dashboard/hover_icon"

const AspectRatio = () => {
    return (
        <Accordion type="single" collapsible className="w-full my-3">
            <AccordionItem value="item-1">
                <div className="w-full mb-3 flex justify-between">
                    <div className="flex gap-2">
                        <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Aspect Ratio</span>
                        <HoverIcon content="demo text" />
                    </div>
                    <AccordionTrigger className="flex justify-between py-0">

                    </AccordionTrigger>
                </div>
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