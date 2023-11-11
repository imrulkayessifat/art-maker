import { Input } from '@/components/ui/input'
import HoverIcon from '@/components/dashboard/hover_icon'

const Seed = () => {
    return (
        <div className="flex flex-col my-3">
            <div className="flex gap-2">
                <span className="text-xs font-medium text-neutral-500 transition-all duration-500 dark:text-neutral-40">Seed</span>
                <HoverIcon content="demo text" />
            </div>
            <Input className='my-2' type="text" placeholder="Enter a seed" />
        </div>
    )
}

export default Seed