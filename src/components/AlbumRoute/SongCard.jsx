import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlayingAnimation from './../../components/UX/PlayingAnimation'
import { CirclePlus, Ellipse, Ellipsis, Pause, Play, Plus } from "lucide-react"
import { motion } from 'motion/react'
import { isCardPlayBackHandle, SongRowClickHandle } from '../../utils/playerSlice'
import { useDispatch, useSelector } from 'react-redux'



import { sethandleContextMenu, clearhandleContextMenu } from '../../utils/contextmenu'


const SongCard = ({ id, number, name, artists, isPlaying, currentSongPlay, songs, song }) => {


    const val = useSelector(val => val.contextMenu);
    




    // const currentPlay = useSelector(val => val.player.currentPlay);
    const [hover, setHover] = useState(false)
    const minutes = Math.floor(song.duration / 60);
    const seconds = Math.floor(song.duration % 60);


    const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    const navi = useNavigate();
    const dispatch = useDispatch();




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
    w-ful
    z-10
    gap-2
    px-4
    hover:bg-[#1f1f1f] 
    rounded-[5px]
    cursor-pointer
    relative
    '
        >



            <div className='
              relative
              flex
              items-center
              justify-center
              h-full  w-full 
              
              
            '

            >
                {
                    hover
                        ? (isPlaying && currentSongPlay?._id === id)
                            ? <Pause
                                size={18}
                                className={`text-white fill-white `}
                                onClick={(e) => {

                                    dispatch(isCardPlayBackHandle({ song: song, songs: songs }))
                                    e.stopPropagation()


                                }}
                            />
                            : <Play
                                size={18}
                                className={`text-white fill-white  `}
                                onClick={(e) => {

                                    dispatch(isCardPlayBackHandle({ Index: number, songs: songs, id: song.release._id, song: song }))
                                    e.stopPropagation()
                                }}
                            />
                        : (isPlaying && currentSongPlay?._id === id) ?
                            <div className={` transition-opacity duration-300 ${hover ? "opacity-0" : "opacity-100"}`}>
                                <PlayingAnimation />
                            </div> :
                            <span
                                className={
                                    `
                        
                     transition-opacity
                     duration-300
                    ${hover ? "opacity-0" : "opacity-100"}
                    `
                                }
                            >
                                {
                                    number + 1
                                }
                            </span>
                }



            </div>

            <div className=" capitalize leading-[20px] ">
                <span
                    className="hover:underline cursor-pointer  bg-gre "
                    onClick={(e) => {
                        navi(`/track/${id}`)
                        e.stopPropagation()

                    }}

                    style={{
                        color: currentSongPlay._id === id
                            ? "#05df72 "
                            : "#fff"
                    }}
                >
                    {
                        name
                    }
                </span>
                <p className="text-[14px] text-(--text-secondary) ">
                    {
                        artists.map((artist, index) => (
                            <span
                                key={artist._id}
                                onClick={(e) => {
                                    navi(`/artist/${artist._id}`)
                                    e.stopPropagation()
                                }}

                                className="hover:underline cursor-pointer"
                            >
                                {artist.name}
                                {index < artists.length - 1 && ", "}
                            </span>
                        ))
                    }
                </p>
            </div>




            <div className="flex items-center gap-3  justify-around ">

                <CirclePlus size={16} className={`
                 shrink-0 text-(--text-secondary) 
                 hover:text-white
                   hover:scale-[1.2]
                   transition-all
                     duration-300
                    ${hover ? "opacity-100" : "opacity-0"}
                `} />
                <div className="flex items-center justify-around gap-4 ">


                    <p
                        className="text-[14px] text-(--text-secondary)"
                    >{
                            duration
                        }</p>
                    <motion.div className='h-8 w-8'
                        whileTap={{
                            scale: 0.95
                        }}
                        whileHover={{
                            scale: 1.05
                        }}
                    >
                        <Ellipsis

                            onClick={(e) => {


                                if (val.open) {
                                    dispatch(clearhandleContextMenu())
                                } else {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    dispatch(sethandleContextMenu({
                                        song: song,
                                        x: rect.right - 270,
                                        y: rect.bottom,
                                    }))
                                }
                                e.stopPropagation()
                            }}
                            className=
                            {`
                      shrink-0 text-(--text-secondary) 
                      
                     hover:text-white
                     w-full h-full
                    ${hover ? "opacity-100" : "opacity-0"}
                `} />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default memo(SongCard)