import React from 'react'

import QuickAccessCard from './QuickAccessCard'
import ScrollDiv from '../Globalloaders/ScrollDiv'
import ScrollArtist from '../Globalloaders/ScrollArtits'
import ReusedLoaderShimmer from '../Globalloaders/ReusedLoaderShimmer'
import JumpBackLoader from './JumpBackLoader'
const LoaderHome = () => {
    return (
        <div className='h-full overflow-y-auto bg-(--background-primary) spotify-scroll  scrollbar-none'>

            <div className='relative z-10 grid grid-cols-4 grid-rows-2  pt-18 pb-6 gap-2 px-8 '>


                {
                    new Array(8).fill(0).map((val, index) => {

                        return <QuickAccessCard key={val + index} />
                    })
                }

            </div>

            <div className='pl-8 pr-1 pt-10  flex gap-7'>


                <div className=' h-[312.29px] w-[412.32px] flex items-center'>
                    <ReusedLoaderShimmer className='h-[220px] w-full rounded-[5px] ' />
                </div>



                <JumpBackLoader CardsNum={10} />



            </div>


            <ScrollDiv CardsNum={10} />
            <ScrollArtist CardsNum={10} />

        </div>
    )
}

export default LoaderHome