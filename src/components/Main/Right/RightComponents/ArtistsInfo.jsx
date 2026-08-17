import { BadgeCheck } from 'lucide-react'
import React from 'react'

const ArtistsInfo = ({ currentPlay }) => {
    return (
        <div className='w-full  px-2 overflow-hidden  mt-4 mb-2 '>

            <div className='bg-[#1F1F1F] h-full w-full rounded-[5px] px-3  py-3 flex flex-col gap-4 '>
                <p className='font-bold'>About the Artist</p>
                <div 
                    className='w-20 h-20  rounded-full overflow-hidden'
                >
                    <img src={currentPlay.artists[0].image.url} alt=""
                        className='w-full w-full  rounded-full'
                    />
                </div>

                <h2 className=' capitalize font-bold flex items-center gap-1'>
                    {currentPlay.artists[0].name}
                    {
                        currentPlay.artists[0].isVerified &&
                        <BadgeCheck size={25} className='fill-green-300 text-[#1F1F1F]' />
                    }
                </h2>

                <div className='flex items-center justify-between'>
                    <span className='text-(--text-secondary) text-[14px]'>
                        {currentPlay.artists[0].monthlyListeners} monthly listeners
                    </span>
                    <button className=' 
                font-bold
                 px-3
                 text-[14px]
                 hover:scale-[1.05]
                 hover:border-white
                 py-0.5
                 border-[0.5px]
                 border-(--text-secondary) 
                 rounded-2xl
                 cursor-pointer
                 duration-300
                 transition-all
                 '>
                        follow
                    </button>
                </div>

                <div className='text-(--text-secondary) text-[14px]'>
                    {
                        currentPlay.artists[0].bio.length > 80 ? currentPlay.artists[0].bio.slice(0, 80) + ' ...' : currentPlay.artists[0].bio
                    }
                </div>

            </div>


        </div>
    )
}

export default ArtistsInfo