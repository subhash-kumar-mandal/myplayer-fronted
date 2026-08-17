import React, { memo, useState } from 'react'
import { CirclePlus, Ellipse, Ellipsis, Play, Plus } from "lucide-react"
const SongCard = () => {

    const [hover, setHover] = useState(false)

    return (

        <div

            onMouseEnter={() => {
                setHover(true)
            }}
            onMouseLeave={() => {
                setHover(false)
            }}

            className='
     grid
    grid-cols-[40px_1fr_140px_180px_150px]
    h-14
    items-center
    w-full
    gap-5
    px-4
    hover:bg-[#1f1f1f] 
    rounded-[5px]
    cursor-pointer
    '
        >

            <p className='
              h-8 w-8 rounded-[5px]
              animate-pulse
              bg-(--background3)

            '/>


           

            <div className="flex flex-col capitalize gap-1 leading-[20px] ">
                <p
                    className='
                    h-5 w-42 rounded-[5px]
                    animate-pulse
                    bg-(--background3)
                    '/>

                
                <p className="h-[18px] w-24 rounded-[5px]
              animate-pulse
              bg-(--background3)
               "/>

                
            </div>


            <div
            className='h-6 w-[100px] rounded-[5px]
              animate-pulse
              bg-(--background3)' 
            />
            <div
            className='h-6 w-[100px] rounded-[5px]
              animate-pulse
              bg-(--background3)'
            />




            <div className="flex items-center gap-3  justify-around ">

                <div size={16} className={`
                   rounded-full
                   w-6 h-6
                   shrink-0
                   hover:scale-[1.2]
                   transition-all
                     duration-300
                     animate-pulse
              bg-(--background3)
                    ${hover ? "opacity-100" : "opacity-0"}
                `} />

                

                <p
                    className="h-6 w-12 rounded-[5px]
              animate-pulse
              bg-(--background3)"
                >

                </p>
                <div size={16} className=
                    {`
                            rounded-[5px]
                   animate-pulse
                     bg-(--background3)
                      shrink-0 
                      h-2 w-6
                     duration-300
                     hover:text-white
                     hover:scale-[1.3]
                    ${hover ? "opacity-100" : "opacity-0"}
                `} />
              
            </div>
        </div>
    )
}

export default memo(SongCard)