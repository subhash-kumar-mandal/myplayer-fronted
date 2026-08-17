

import { SongAdd } from '@/utils/playerSlice'
import { Pause, Play } from 'lucide-react'

import { useDispatch } from 'react-redux'

import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom'


const BackToJumpCard = ({ val, releaseId, isPlaying }) => {

 
    const dispatch = useDispatch();
    const navi = useNavigate()
    const playHomeHandle = async () => {

        dispatch(SongAdd({ id: val._id, song: val }))

    }

    return (
        <div className="group relative h-full w-44.5 rounded-[5px] cursor-pointer">

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

            <motion.div

                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.08, background: '#05df72' }}

                className="
                         shadow-[0_12px_330px_rgba(0,0,0,0.45)]
               absolute
               right-4
               bottom-12
               flex
               justify-center
               items-center
               opacity-0
               z-20
               bg-(--spotify-green)
               h-12
               w-12
               rounded-full
               scale-80
               translate-y-4
       
               transition-all
               
               duration-100
               cursor-pointer
               group-hover:scale-100
               group-hover:opacity-100
               group-hover:translate-y-0
               "
                onClick={(e) => {
                    playHomeHandle()
                    e.stopPropagation()
                }}

            >
                {
                    (releaseId === val._id && isPlaying)
                        ? <Pause className="text-black fill-black" />
                        : <Play className="text-black fill-black" />
                }
            </motion.div>

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
                <div className="h-[153.725px] w-[153.725px] bg-amber-100 rounded-[5px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,.35c)]">
                    <img src={val.release.image.url} alt="" />
                </div>

                <div className="flex flex-col">
                    <p className="text-[16px] hover:underline capitalize cursor-pointer"
                        onClick={(e) => {
                             navi('/track/'+val._id)
                            e.stopPropagation()
                        }}
                        style={{
                            color: ( releaseId === val._id) ? "#3AE176" : ''
                        }}
                    >
                        {
                            val.name.length > 15 ? val.name.slice(0, 14) + "..." : val.name
                        }
                    </p>

                    <p className="text-[14px] w-full text-(--text-secondary) ">
                        {
                            val.artists.map((artist, index) => {

                                return <span
                                    onClick={(e) => {
                                        navi(`/artist/${artist._id}`)
                                        e.stopPropagation()
                                    }}
                                    key={artist._id}
                                    className="hover:underline  capitalize cursor-pointer"
                                >
                                    {artist.name}
                                    {index < val.artists.length - 1 && ", "}
                                </span>
                            })
                        }

                    </p>
                </div>
            </div>

        </div>
    )
}

export default BackToJumpCard