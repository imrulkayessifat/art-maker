import AspectRatio from "@/components/dashboard/aspect_ratio"
import ModelDialog from "@/components/dashboard/model_dialog"
import ArtDialog from "@/components/dashboard/art_dialog"
import NegativePromt from "@/components/dashboard/negative_promt"
import Cfg from "@/components/dashboard/cfg"
import StepScale from "@/components/dashboard/step_scale"
import Seed from "@/components/dashboard/seed"
import { TextBox } from "@/components/dashboard/textbox"
import RenderImage from "@/components/dashboard/render_image"

const Hero = () => {
    return (
        <div className='grid grid-cols-6'>
            {/* left */}
            <div className="col-span-5 h-full border-r-2">
                <div className='
                    flex 
                    flex-col 
                    flex-shrink-1
                    items-center 
                    justify-end 
                    max-h-[550px]
                '>
                    <RenderImage />
                    <TextBox />
                </div>
            </div>
            <div className='col-span-1 overflow-auto'>
                <div className="flex flex-col flex-shrink-0 max-w-[210px] w-[210px] min-w-[210px]  p-3">
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