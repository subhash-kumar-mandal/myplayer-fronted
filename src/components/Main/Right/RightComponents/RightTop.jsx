import { BackpackIcon, ChevronRight, Ellipsis, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import OpenInNewIcon from '../../../UX/OpenInNewIcon'
import BackIcon from '../../../UX/BackIcon'
import { useDispatch } from 'react-redux'
import { isRight } from '../../../../utils/PanelState'

const RightTop = ({ left, hover, currentPlay, onScroll }) => {

    const dispatch = useDispatch()
    const opacity = Math.min(onScroll / 300, 2);
    
    return (
        <div
            className='absolute top-0   z-10     w-full  h-16'
            style={{
                backgroundColor: `rgba(18, 18, 18, ${Math.min(Math.max(opacity, 0), 1)})`,
                boxShadow: opacity >= 1
                    ?
                    `0 15px 40px rgba(18, 18, 18, 0.65),
        0 5px 15px rgba(18, 18, 18, 0.45)`
                    : ''
            }}
        >

            <div className={` flex justify-between  items-center pl-[16px] pr-[16px] pt-[16px] pb-[8px]
                       
                                `}>


                <div className={`flex items-center min-w-0 flex-1 `}>


                    <div
                        className=' shrink-0
                                    cursor-pointer'
                        onClick={() => {
                            if (left === "big") {
                                console.log('big');
                                return
                            }
                            dispatch(isRight())

                        }}
                    >
                        <ChevronRight


                            className={
                                `
                            text-(--text-secondary)
                            h-6 w-6
                        overflow-hidden  
                        ${hover ? "opacity-100 -translate-x-1  " : "opacity-0 -translate-x-5"}
                        transition-all
                        duration-300
                        hover:text-(--text)
                         hover:scale-105
                        `
                            }


                        />
                    </div>


                    <div className='
                    
                    min-w-0 flex-1 
                    '>
                        <div className='

                        min-w-0
                truncate
                whitespace-nowrap
                overflow-hidden
                font-bold
                
                uppercase
                 @[200px]:text-sm
                 @[281px]:text-base
                 @[380px]:text-lg
                    '

                            style={{
                                transform: `${hover ? " translate(0px, 0px)" : "translate(0px, 0px)"}`
                            }}
                        >
                            {
                                currentPlay.release.name ?? 'Notihing is Playing'
                            }
                        </div>
                    </div>

                </div>


                <div className={
                    `flex items-center gap-3
                            transition-all
                    duration-300
                              ${hover ? "opacity-100 " : "opacity-0 "}
                            `
                }

                >
                    <Ellipsis className=" 
                    
                      h-8 w-8 
                      rounded-full p-1 
                       hover:bg-(--background3)
                       hover:text-(--text)
                       transition-all
                       duration-300
                       cursor-pointer
                      "/>
                    <OpenInNewIcon className={
                        `
                        cursor-pointer 
                        h-8 w-8 
                        p-2
                        
                        
                        hover:text-(--text)
                        hover:bg-(--background3)
                        transition-all
                       duration-300
                       rounded-full 
                        `
                    } />
                </div>
            </div>



        </div>
    )
}

export default RightTop