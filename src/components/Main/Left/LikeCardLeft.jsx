import React from 'react'
import LIKE  from '../../../assets/like.png'
const LikeCardLeft = ({ Image,val }) => {
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
                <img src={LIKE}
                    className='h-[55px] w-[55px] p-1  rounded-sm '
                    alt="" />
            </div>

            <div>
                <h1 className='text-[16px]'>Liked Songs</h1>
                <p className='text-[14px] text-(--text-secondary)'>Songs {val.songs.length}</p>
            </div>
        </div>
    )
}

export default LikeCardLeft