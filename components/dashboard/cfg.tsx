import { AlertCircle } from 'lucide-react'

import { Slider } from "@/components/ui/slider"

const Cfg = () => {
    return (
        <div className="flex flex-col my-3 border-b-2">
            <div className="flex justify-between">
                <div className='flex gap-2'>
                    <h1 className="text-base">Cfg Scale</h1>
                    <AlertCircle />
                </div>
                <span className='bg-slate-300 p-1 rounded-md text-slate-600'>8.0</span>
            </div>
            <Slider className='my-3' defaultValue={[33]} max={100} step={1} />
        </div>
    )
}

export default Cfg