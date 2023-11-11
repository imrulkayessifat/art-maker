import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AlertCircle } from "lucide-react";

interface HoverIconProp {
    content: string;
}
const HoverIcon: React.FC<HoverIconProp> = ({
    content
}) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <AlertCircle className="h-5 w-5 cursor-pointer text-neutral-700" />
            </HoverCardTrigger>
            <HoverCardContent className="w-30 mt-5 bg-slate-900">
                <div className="space-y-1 space-x-1">
                    <h4 className="text-sm text-white  font-semibold">{content}</h4>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default HoverIcon