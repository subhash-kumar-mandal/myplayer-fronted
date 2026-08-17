import { Play } from 'lucide-react'
import React from 'react'
import ReusedLoaderShimmer from '../Globalloaders/ReusedLoaderShimmer'

const JumpbackCardLoader = () => {
    return (
        <div className="group relative h-full w-[178px] rounded-[5px] cursor-pointer">

            {/* Background */}
            <div
                className="
             absolute
             inset-0
             rounded-[5px]
             bg-(--bg-hover1)
             scale-90
             opacity-0
             transition-all
             duration-300
             group-hover:scale-100
             group-hover:opacity-100
           "
            />

          

            {/* Content */}
            <div
                className="
             relative
             z-10
             p-3
             flex
             flex-col
             gap-3
             
           "
            >
                <ReusedLoaderShimmer className="h-[153.725px] w-[153.725px] rounded-[5px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,.35c)]" />
                    
               

                <div className="flex flex-col gap-2">
                    <ReusedLoaderShimmer className="h-6 w-20 rounded-[3px]"
                       
                    />
                       

                    <ReusedLoaderShimmer className=" h-4 w-36 rounded-[4px]" />

                    
                </div>
            </div>

        </div>
    )
}

export default JumpbackCardLoader