import React from 'react'
import ReusedLoaderShimmer from '@/Shimmers/Globalloaders/ReusedLoaderShimmer'

export const Hero = () => {
    return (

        <div
            className='
    @container
                h-64
                w-full
                flex
                items-end
                gap-4
                @[500px]:gap-5
                @[700px]:gap-6
                px-4
                @[500px]:px-5
                @[700px]:px-6
                pb-6
                @[700px]:pb-8
                overflow-hidden
    
     
     '


        >



            {/* Left */}
            <div className='
            w-32
                    h-32
                    @[500px]:w-40
                    @[500px]:h-40
                    @[700px]:w-48
                    @[700px]:h-48
                    rounded-md
                    overflow-hidden
                    cursor-pointer
                    hover:scale-[1.02]
                    transition-transform
                    duration-300
                    border
                    border-(--background3)
                    shadow-2xl
                    '>
                {/* IMage Cover */}
                <ReusedLoaderShimmer className='h-full w-full rounded-[5px]  border-[#111716]' />




            </div>

            {/* Right */}
            <div className='min-w-0 flex-1'>
                <div className='flex flex-col gap-2 min-w-0'>
                    <ReusedLoaderShimmer className='  h-8 
                            text-xs
                            w-50
                            @[500px]:w-30
                            @[500px]:h-6
                            font-medium
                            capitalize' />

                    <ReusedLoaderShimmer className=' h-26  rounded-xs 
                           
                            max-w-full
                            @[500px]:w-80
                            @[500px]:h-18
                            @[700px]:w-100
                            @[700px]:h-20
                    ' />

                     <ReusedLoaderShimmer className=' 
                           
                            min-w-0
                            max-w-full
                            @[500px]:w-100
                            @[500px]:h-6
                            @[700px]:w-130
                            @[700px]:h-8
                
                    ' /> 
                </div>
            </div>



        </div>
    )
}


export default Hero