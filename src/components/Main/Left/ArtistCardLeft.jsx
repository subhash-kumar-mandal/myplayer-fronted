import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArtistCardLeft = ({ val }) => {
    const navi = useNavigate()
    return (
        <div
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
                e.stopPropagation();
                navi('/artist/' + val._id)
            }}
        >
            <div className='shrink-0
            w-[54px]
            h-[54px]
            rounded-[8px]
            overflow-hidden'>
                <img src={val.image.url}
                    className='w-full h-full  p-0.5 object-cover  rounded-full '
                    alt="" />
            </div>

            <div className='min-w-0 flex-1'>
               
               <h1 className='min-w-0
                truncate
                text-[15px]
                capitalize'>
                    {val.name}
                </h1>
                <p className='text-[14px] text-(--text-secondary)'>Artist</p>
            </div>
        </div>
    )
}

export default ArtistCardLeft