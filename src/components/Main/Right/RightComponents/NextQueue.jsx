import React from 'react'
import { useSelector } from 'react-redux'

const NextQueue = () => {

    const Queue = useSelector(val => val.player.afterPlay);

    const song = Queue[0];

    return (
        Queue.length >= 2 ?
            <div className='w-full  px-2 overflow-hidden  mt-4 mb-2 '>

                <div className='bg-[#1F1F1F] h-full w-full rounded-[5px] px-2 py-2 flex  gap-2   flex-col '>

                    <div className='flex justify-between px-2 mt-1 items-center   font-bold capitalize'>
                        <h1>
                            Next in queue
                        </h1>
                        <p className='text-[13px] hover:underline cursor-pointer text-(--text-secondary)'>
                            open queue
                        </p>
                    </div>
                    <div className=' px-2 rounded-[4px] h-14 flex items-center  w-full
                        hover:bg-[#3F3F3F]
                        gap-2
                        cursor-pointer
                        '>


                        <div className='h-12 w-12 rounded-[4px] overflow-hidden bg-amber-200 my-2'>
                            <img src={song.release.image.url} alt="" />
                        </div>

                        <div className='flex flex-col'>
                            <h2 className='font-medium  uppercase'>
                                {
                                    song.name.length > 20 ? song.name.slice(0, 14)+'...' : song.name
                                }
                            </h2>
                            <p className='text-[14px] text-(--text-secondary) capitalize'>
                                {song.release.name}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
            : <div>
                nhi hi kuch bhi bhasi

            </div>
    )
}

export default NextQueue