import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const GettingStarted = ({text}) => {
    return (


        <div className='h-[312.29px] w-[412.32px] flex flex-col gap-3'>

            <div className='w-full h-[48px] flex justify-between '>
                <p className='text-[24px] font-bold flex items-end'>
                    {text}
                </p>
                <div className='flex gap-3 items-end text-(--background3) cursor-not-allowed '>
                    <ChevronLeft size={30} />
                    <ChevronRight size={30} />

                </div>
            </div>

            <div className='h-[220px] w-full rounded-md grid grid-cols-[1fr_100px] gap-2 p-4 '
                style={{
                    backgroundColor: `#B4647C`,
                    backgroundImage: "linear-gradient(180deg,#BF738B 0%,#A85B77 20%,#7B2E52 80%,#5B1736 100%)"
                }}
            >
                <div className=' h-full flex flex-col gap-6'>

                    <div>
                        <p className='text-[28px] font-black  h-[48px]'>
                            4. Queue it up
                        </p>
                        <p className='font-[200] h-[44px] leading-7 font-medium max-w-[340px] text-[#E6D1D5]'>
                            Add to your queue, drag and drop, and control what plays next.
                        </p>
                    </div>

                    <div
                        className='
              flex flex-col gap-2'
                    >
                        <button
                            className='w-[114.34px] h-[32px] text-sm rounded-2xl font-bold  text-(--background-Three)   py-1 bg-(--spotify-green)
                   hover:bg-[rgb(59, 228, 119)]
                   hover:scale-[1.04]
                   
                   cursor-pointer
                   transition-transform
                   duration-300
                  '
                        >
                            Open Queue
                        </button>
                        <button
                            className='
                  h-[32px]
                  w-[132px]
                  py-1
                  px-4
                 text-[#EDA6B4]
                 text-[13px]
                 font-bold
                transition-transform
                hover:scale-105
                hover:text-white
                cursor-pointer
                   duration-300

                '
                        >
                            Show more tips
                        </button>
                    </div>

                </div>
                <div>

                </div>

            </div>

        </div>
    )
}

export default GettingStarted