import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useDispatch } from 'react-redux'
import { isLeftBig } from '../../../utils/PanelState'
const AlbumCardLeft = ({ data }) => {
    const navi = useNavigate()

    return (

        <motion.div

            className={
                `
                        
                  h-[60px]
        w-full
        min-w-0

        flex
        items-center
        gap-2

        p-2
        rounded-sm

        cursor-pointer
        hover:bg-(--background1)

        transition-all
        duration-200
                 
                        }
                        `
            }
            onClick={(e) => {
                e.stopPropagation()
                navi('/album/' + data._id);

            }}

        >
            <div className=' 
              shrink-0
            w-[54px]
            h-[54px]
            rounded-[8px]
            overflow-hidden'>
                <img src={data.image.url}
                    className=' w-full h-full p-0.5 rounded-[5px]   '
                    alt="" />
            </div>

            <div className='min-w-0 flex-1'>
                <h1 className='min-w-0
                truncate
                text-[15px]
                capitalize'>
                    {data.name} 
                </h1>
                <p className=' min-w-0
                truncate
                text-[14px]
                text-(--text-secondary)'
                >
                    {data.type}
                    <span className="mx-1">
                        •
                    </span>
                    <span className="capitalize">
                        {data.artists?.[0]?.name}
                    </span>
                </p>
            </div>
        </motion.div>
    )
}

export default AlbumCardLeft