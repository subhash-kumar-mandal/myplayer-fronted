import React from 'react'

const ImageRight = ({ song }) => {
    return (
        <div className='w-ful mt-16 px-2 overflow-hidde  '>

            <div className=' w-full      rounded-[5px] bg-amber-200 overflow-hidden'>
                <img src={song.release.image.url} className='h-full w-full' alt="" />
            </div>
           
        </div>
    )
}

export default ImageRight