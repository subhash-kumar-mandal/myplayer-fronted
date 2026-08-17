import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Hero = ({ song }) => {


    
    const artists = song?.artists ?? [];
    const navi = useNavigate()
    const date = song.release?.releaseDate || song.release?.createdAt || new Date().toISOString();
    const dateReal = new Date(date).getFullYear()
    const minutes = Math.floor(song.duration / 60);
    const seconds = Math.floor(song.duration % 60);
    const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    return (
        <div
            className='

     z-10
    
    
     
    
     
                @container
                h-64
                w-full
                flex
                items-end
                gap-3
                @[500px]:gap-5
                @[700px]:gap-6
                px-4
                @[500px]:px-5
                @[700px]:px-6
                pb-6
                @[700px]:pb-8
                overflow-hidden
     shadow-black
     '
            style={{
                background: `linear-gradient(
    180deg,
    ${song.release?.themeColor?.primary} 0%,
    color-mix(in srgb, ${song.release?.themeColor?.primary} 40%, black) 100%
  )`

            }}
        >



            {/* Left */}
            <div className='
                    shrink-0
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



                <img src={song.release?.image?.url} className='h-full w-full object-cover' alt="" />




            </div>

            {/* Right */}
            <div className='min-w-0 flex-1'>
                <div className='flex flex-col min-w-0  gap-1     '>

                    <p className='text-xs
                            @[500px]:text-sm
                            font-medium
                            capitalize
                            '>
                        {song.type}
                    </p>

                    <span className={`
                
                            min-w-0
                            max-w-full
                            font-extrabold
                            uppercase
                            leading-[1.05]
                            break-words
                            text-3xl
                            @[500px]:text-3xl
                            @[700px]:text-5xl
                      `}>

                        {
                            song?.name

                        }
                    </span>



                    <div className=' 
                    flex gap-2 
                    items-center
                    flex-wrap
                    gap-x-2
                    gap-y-1
                    min-w-0
                    '>


                        <div className="flex items-center shrink-0">

                            <div
                                className="relative h-5 shrink-0"
                                style={{
                                    width: `${20 + (artists.length - 1) * 12}px`,
                                }}
                            >
                                {artists.map((artist, index) => (
                                    <img
                                        key={artist._id}
                                        src={artist?.image?.url}
                                        alt={artist.name}
                                        className="
                                            absolute
                                            top-1/2
                                            -translate-y-1/2
                                            h-5
                                            w-6
                                            rounded-full
                                            object-cover
                                            ring-2
                                            ring-black/40
                                            cursor-pointer
                                            transition-transform
                                            duration-200
                                            hover:scale-110
                                        "
                                        style={{
                                            left: `${index * 12}px`,
                                            zIndex: artists.length - index,
                                        }}
                                    />
                                ))}
                            </div>


                            <div className="pl-2 flex flex-wrap gap-x-1">

                                {artists.map((artist, index) => (
                                    <React.Fragment key={artist._id}>

                                        <span
                                            className="
                                                font-bold
                                                text-xs
                                                @[500px]:text-sm
                                                capitalize
                                                hover:underline
                                                cursor-pointer
                                                whitespace-nowrap
                                            "
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navi(`/artist/${artist._id}`);
                                            }}
                                        >
                                            {artist.name}
                                        </span>

                                        {index < artists.length - 1 && (
                                            <span>•</span>
                                        )}

                                    </React.Fragment>
                                ))}

                            </div>


                        </div>



                        <div className='flex gap-1 items-center'>

                            <Link to={`/album/${song.release._id}`}

                                className='
                             text-[14px]
                             font-thin
                             capitalize 
                             hover:underline
                             transition-all 
                             duration-500
                             '
                            >
                                {
                                    song.release?.name
                                }

                            </Link>

                            <span className="pl-1">
                                &bull;
                            </span>
                        </div>




                        <div className='
                                flex
                                flex-wrap
                                items-center
                                gap-x-1
                                text-xs
                                @[500px]:text-sm
                                text-(--text-secondary)
                        '>

                            <span>{duration}</span>
                            <span> &bull; </span>

                            <span>{ dateReal}</span>
                            <span>&bull;</span>
                            <span> { song.playCoun }</span>
                        </div>

                    </div>

                </div>
            </div>



        </div>
    )
}

export default Hero