import React, { useState } from 'react'
import LIKE from '../../assets/like.png'
import { Pause, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlayingAnimation from '../UX/PlayingAnimation';
import { useDispatch } from 'react-redux';
import { SongAdd } from '@/utils/playerSlice';
const QuickAccessCard = ({ val, setColor, isPlaying, currentSongPlay }) => {
 

    const navi = useNavigate()
    const dispatch = useDispatch()
    const [seeHover, setSeeHover] = useState(false)

    return (


        <div className="  w-full h-[48px] 
          relative bg-(--background1) items-center
           capitalize gap-2 
           flex 
           overflow-hidden
            rounded-[3px]
            hover:bg-(--background3)
            transition-colors
            duration-200
            cursor-pointer
          "
            onMouseEnter={() => {
                setColor(val.release.themeColor.primary)
                setSeeHover(true)
            }}
            onMouseLeave={() => {
                setColor('#7860E8')
                setSeeHover(false)

            }}
            onClick={() => {
                navi('/album/' + val.release._id)
            }}
        >



            <button className={`
                   
                  h-8 
                  cursor-pointer 
                  w-8 absolute 
                  rounded-full 
                  flex 
                  justify-center 
                  items-center  
                   right-2
                  transition-all
                  duration-300
                  outline-none
                  
                 
                   
                    `}

                onClick={(e) => e.stopPropagation()}

            >


                {
                    seeHover
                        ? (isPlaying && currentSongPlay?._id === val._id)
                            ? (
                                <div className='bg-green-400 h-full w-full rounded-full
                                flex 
                  justify-center 
                  items-center 
                                '
                                    onClick={() => {
                                        dispatch(SongAdd({
                                            id:val._id,
                                            song:val
                                        }))
                                    }}
                                >
                                    <Pause
                                        size={18}
                                        className={`
                                    text-black
                                   
                                    fill-black `}

                                    />
                                </div>
                            )
                            :
                            (<div className='bg-green-400 h-full w-full rounded-full
                                flex 
                                justify-center 
                                items-center 
                                '
                               onClick={() => {
                                        dispatch(SongAdd({
                                            id:val._id,
                                            song:val
                                        }))
                                    }}
                            >
                                <Play
                                    size={18}
                                    className={`text-black fill-black  `}

                                />
                            </div>)
                        : (isPlaying && currentSongPlay?._id === val._id) ?



                            <PlayingAnimation />


                            :

                            (<div
                                className={`
                            bg-green-400 
                            h-full w-full 
                            rounded-full
                            flex 
                            justify-center 
                            items-center 
                            ${seeHover ? "opacity-100" : "opacity-0"}
                            `}
                               onClick={() => {
                                        dispatch(SongAdd({
                                            id:val._id,
                                            song:val
                                        }))
                                    }}
                            >

                                <Play
                                    size={18}
                                    className={
                                        `
                                
                            transition-opacity
                            duration-300
                            text-black fill-black 
                          
                    `
                                    }
                                />

                            </div>)


                }



            </button>


            <img
                src={val.release.image.url}
                className="h-[48px] w-[48px] rounded-[3px]"
                alt=""
            />

            <p className='text-[14px] font-semibold hover:underline'>
                {
                    val.name.length > 15 ? val.name.slice(0, 15) : val.name
                }
            </p>

        </div>

    )
}

export default QuickAccessCard;