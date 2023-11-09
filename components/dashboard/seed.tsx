import { AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'

const Seed = () => {
    return (
        <div className="flex flex-col mt-3 border-b-2">
            <div className="flex gap-2">
                <h1 className="text-base">Seed</h1>
                <AlertCircle />
            </div>
            <Input className='my-2' type="text" placeholder="Enter a seed"  />
        </div>
    )
}

export default Seed