import React from 'react'

const PlaylistCardLeft = ({ Image,val }) => {
    return (

        <div
            className={
                `
                        h-[64px] w-full flex gap-2 items-center hover:bg-(--background1) p-2 rounded-sm cursor-pointer 
                 duration-200 transition-all
                 
                        }
                        `
            }

        >
            <div className='  rounded-[8px] '>
                <img src={Image}
                    className='h-[55px] w-[55px] p-1  rounded-sm '
                    alt="" />
            </div>

            <div>
                <h1 className='text-[16px]'>Pritam</h1>
                <p className='text-[14px] text-(--text-secondary)'>{val.type}</p>
            </div>
        </div>
    )
}

export default PlaylistCardLeft