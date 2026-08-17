import React from 'react'
import image from '../../assets/kyabaathai.png'
import ArtistCard from './ArtistCard'
const SongArtists = ({song}) => {
    return (
        <div className='px-8 grid grid-cols-[1fr_1fr]  relative  z-20 gap-3 mt-8 mb-8'>


            {/* <div className='bg-red-10 h-22 hover:hover:bg-(--background1) w-full px-4 rounded-[5px] py-2 flex items-center gap-5 transition-all duration-300 cursor-pointer'>
                <div className='h-full w-18 rounded-full overflow-hidden flex items-center justify-center '>
                    <img src={image} className='object-' alt="" />
                </div>
                <div>
                    <h2 className='text-(--text-secondary) font-medium'>Artist</h2>
                    <h3 className='font-bold'>Name</h3>
                </div>
            </div> */}

            {
                song.artists.map(val=>(
                    <ArtistCard key={val._id}  artist={val} />
                ))
            }


            
            
        </div>
    )
}

export default SongArtists