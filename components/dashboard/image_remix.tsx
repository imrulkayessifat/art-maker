import React from 'react'

import ImageInputRemix from '@/components/dashboard/image_input_remix'
import RenderImageRemix from '@/components/dashboard/render_image_remix'

const ImageRemix = () => {
    return (
        <div className='
                    flex 
                    flex-col 
                    flex-shrink-1
                    items-center 
                    justify-end 
                    max-h-[500px]
                '>
            <RenderImageRemix />
            <ImageInputRemix />
        </div>
    )
}

export default ImageRemix