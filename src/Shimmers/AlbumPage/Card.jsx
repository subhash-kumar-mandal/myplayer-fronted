import React, { memo, useState } from 'react'
import { CirclePlus, Ellipse, Ellipsis, Play, Plus } from "lucide-react"
import ReusedLoaderShimmer from '../Globalloaders/ReusedLoaderShimmer'
const Card = () => {

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
    grid-cols-[20px_1fr_150px]
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

            <ReusedLoaderShimmer className='
              h-8 w-8 rounded-[5px]
              animate-pulse
              bg-(--background3)

            '/>




            <div className="flex flex-col capitalize gap-1 leading-[20px] ">

                <ReusedLoaderShimmer className='  h-5 w-42 rounded-[5px]' />
                <ReusedLoaderShimmer className="h-4.5 w-24 rounded-[5px]" />


            </div>




            <div className="flex items-center gap-3  justify-around ">

                <ReusedLoaderShimmer size={16} className={`
                   rounded-full
                   w-6 h-6
                   shrink-0
                   hover:scale-[1.2]
                   transition-all
                     duration-300
                    
                    ${hover ? "opacity-100" : "opacity-0"}
                `} />



                <ReusedLoaderShimmer
                    className="h-6 w-12 rounded-[5px]
              animate-pulse
              bg-(--background3)"
                />


                <ReusedLoaderShimmer size={16} className=
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

export default memo(Card)