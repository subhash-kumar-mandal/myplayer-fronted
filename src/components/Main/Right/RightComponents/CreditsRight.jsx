import React from 'react'

const CreditsRight = ({ currentPlay }) => {
    return (
        <div className='w-full  px-2 overflow-hidden  mt-4 mb-2 '>



            <div className='bg-[#1F1F1F] h-full w-full rounded-[5px] py-2   flex flex-col gap-1 '>

                <div className='flex justify-between px-3 mt-2 items-center   font-bold capitalize'>
                    <h1>
                        credits
                    </h1>
                    <p className='text-[13px] hover:underline cursor-pointer text-(--text-secondary)'>
                        show all
                    </p>
                </div>
                {
                    currentPlay.artists.map((artist, index) => (
                        <div key={artist._id} className=' px-2 rounded-[4px] h-14 flex items-center justify-between
                        hover:bg-[#3F3F3F]
                        cursor-pointer
                        '>

                            <div className='flex flex-col'>
                                <h2 className='font-medium capitalize'>
                                    {
                                        artist.name.length > 15 ? artist.name.slice(0, 13) + ' ...' : artist.name
                                    }
                                </h2>
                                <p className='text-[14px] text-(--text-secondary)'>
                                    Main Artist
                                </p>
                            </div>
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
                    ))
                }

            </div>





        </div>
    )
}

export default CreditsRight