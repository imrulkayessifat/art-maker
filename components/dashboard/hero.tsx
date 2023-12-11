import AspectRatio from "@/components/dashboard/aspect_ratio"
import ModelDialog from "@/components/dashboard/model_dialog"
import ArtDialog from "@/components/dashboard/art_dialog"
import NegativePromt from "@/components/dashboard/negative_promt"
import Cfg from "@/components/dashboard/cfg"
import StepScale from "@/components/dashboard/step_scale"
import Seed from "@/components/dashboard/seed"
import { TextBox } from "@/components/dashboard/textbox"
import RenderImage from "@/components/dashboard/render_image"
import RenderImageRemix from "@/components/dashboard/render_image_remix"
import ImageInputRemix from "@/components/dashboard/image_input_remix"

const Hero = () => {
    return (
        <div className='grid grid-cols-6'>
            {/* left */}
            <div className="col-span-5 flex justify-around h-full border-r-2">
                <div className="flex justify-evenly max-h-[500px]  w-full">
                    <div className='
                    flex 
                    flex-col 
                    flex-shrink-1
                    items-center 
                    justify-end 
                    
                    '>
                        <RenderImageRemix />
                        <ImageInputRemix />
                    </div>
                    <div className='
                    flex 
                    flex-col 
                    flex-shrink-1
                    items-center 
                    justify-end 
                '>
                        <RenderImage />
                        <TextBox />
                    </div>
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