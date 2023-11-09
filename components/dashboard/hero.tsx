import AspectRatio from "@/components/dashboard/aspect_ratio"
import ModelDialog from "@/components/dashboard/model_dialog"
import ArtDialog from "@/components/dashboard/art_dialog"
import NegativePromt from "@/components/dashboard/negative_promt"
import Cfg from "@/components/dashboard/cfg"
import StepScale from "@/components/dashboard/step_scale"
import Seed from "@/components/dashboard/seed"

const Hero = () => {
    return (
        <div className='grid grid-cols-6 mt-[65px] overflow-hidden'>
            <div className='col-span-5 border-r-2'>
                
            </div>
            <div className='col-span-1 overflow-y-scroll'>
                <div className="flex flex-col p-3">
                    <AspectRatio />
                    <ModelDialog />
                    <ArtDialog />
                    <NegativePromt />
                    <Cfg />
                    <StepScale />
                    <Seed />
                </div>
            </div>
        </div>
    )
}

export default Hero