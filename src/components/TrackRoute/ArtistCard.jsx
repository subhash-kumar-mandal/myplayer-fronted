import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
const ArtistCard = ({ artist }) => {
    const navi = useNavigate()
    return (
        <motion.div className='bg-red-10 h-22 hover:hover:bg-(--background1) w-full px-4 rounded-[5px] py-2 flex items-center gap-5 transition-all duration-300 cursor-pointer'
            onClick={(e) => {
                navi(`/artist/${artist._id}`);
                e.stopPropagation();
            }}

            whileHover={{scale:1.01}}
            whileTap={{scale:0.98}}
        >
            <div className='h-full w-18 rounded-full overflow-hidden flex items-center justify-center '>
                <img src={artist.image.url} className='object-' alt="" />
            </div>
            <div>
                <h2 className='text-(--text-secondary) font-medium'>Artist</h2>
                <h3 className='font-bold hover:underline'>
                    {
                        artist.name
                    }
                </h3>
            </div>
        </motion.div>
    )
}

export default ArtistCard