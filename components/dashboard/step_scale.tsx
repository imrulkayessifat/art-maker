import { Slider } from "@/components/ui/slider"
import HoverIcon from '@/components/dashboard/hover_icon'

const StepScale = () => {
    return (
        <div className="flex flex-col my-3  border-b-2">
            <div className="flex justify-between">
                <div className='flex gap-2'>
                    <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Step Scale</span>
                    <HoverIcon content="demo text" />
                </div>
                <span className='bg-slate-300 p-1 text-sm rounded-md text-slate-600'>8.0</span>
            </div>
            <Slider className='my-3' defaultValue={[33]} max={100} step={1} />
        </div>
    )
}

export default StepScale