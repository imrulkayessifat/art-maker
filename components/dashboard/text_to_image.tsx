import React from 'react'
import RenderImage from '@/components/dashboard/render_image'
import { TextBox } from '@/components/dashboard/textbox'

const TextToImage = () => {
    return (
        <div className='
                    flex 
                    flex-col 
                    flex-shrink-1
                    items-center 
                    justify-end 
                    max-h-[500px]
                '>
            <RenderImage />
            <TextBox />
        </div>
    )
}

export default TextToImage