import React from 'react'

const SongInfoRight = ({song}) => {
    return (

         <div className='w-full mt-2 px-2 overflow-hidden '>
        <div className='h-16 mt-2 px-1 '>
            <p className='text-2xl capitalize font-bold'>{song.name.length > 15 ? song.name.slice(0, 14) + '...' : song.name}</p>
            <div className=' overflow-hidden w-[80%]'>
                <div className='song-name '>
                    {
                        song.artists.map((artist, index) => (
                            <span
                                key={artist._id}
                                className="hover:underline cursor-pointer"
                            >
                                {artist.name}
                                {index < song.artists.length - 1 && ", "}
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
        </div>
    )
}

export default SongInfoRight