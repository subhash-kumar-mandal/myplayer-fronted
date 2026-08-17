import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import PlusIcon from '../../UX/PlusIcon'
import OpenInNewIcon from '../../UX/OpenInNewIcon'
import BackIcon from '../../UX/BackIcon'
import LibraryListIcon from '../../UX/LibraryListIcon'

import LOGO from '../../../assets/DEMO.png'
import { useDispatch } from 'react-redux'
import { isleft, isLeftBig } from '../../../utils/PanelState'
const LeftTop = ({ Exit, IsLeftOpen, setLeftWidth ,leftWidth,right }) => {

    const dispatch = useDispatch()
    return (
        <div
            className='    w-full  h-[107px] sticky top-0'

        >
            {
                IsLeftOpen === "small" ?
                    <div>
                        <div
                            className='w-[72px] h-full pl-[16px] pr-[16px]  pb-[8px] pt-[16px] flex flex-col gap-3 justify-center items-center  '
                            onClick={() => {
                                 
                                leftWidth>=270?setLeftWidth(72):setLeftWidth(280)

                                dispatch(isleft())

                            }}
                        >
                            <LibraryListIcon className={`
                            h-6 w-6 text-(--text-secondary)
                            hover:text-(--text)
                            transition-all
                            duration-200
                            hover:scale-105
                            cursor-pointer
                            `} />

                            <PlusIcon className=" 
                    text-(--text-secondary)
                      h-8 w-8 bg-(--background1) 
                      rounded-full p-1 
                       hover:bg-(--background3)
                       hover:text-(--text)
                       transition-all
                       duration-300
                       cursor-pointer
                      "/>
                        </div>



                    </div>
                    :

                    <>
                        <div className={` flex justify-between  items-center pl-[16px] pr-[16px] pt-[16px] pb-[8px]
                       
                                `}>


                            <div className={`flex items-center gap-1 `}>


                                <div
                                    onClick={() => {
                                       leftWidth>=270?setLeftWidth(72):setLeftWidth(280)
                                        dispatch(isleft())
                                    }}
                                >
                                    <BackIcon


                                        className={
                                            `
                            text-(--text-secondary)
                            h-6 w-6
                        overflow-hidden  
                        ${Exit ? "opacity-100 translate-x-0  " : "opacity-0 -translate-x-5"}
                        transition-all
                    duration-100
                    hover:text-(--text)
                    hover:scale-105
                        `
                                        }


                                    />
                                </div>


                                <div className='text-[14px] font-bold
                    transition-all
                    duration-100
                    '

                                    style={{
                                        transform: `${Exit ? " translate(0px, 0px)" : "translate(-25px, 0px)"}`
                                    }}
                                >  Your Library</div>

                            </div>


                            <div className='flex items-center gap-3 '

                            >
                                <PlusIcon className=" 
                    text-(--text-secondary)
                      h-8 w-8 bg-(--background1) 
                      rounded-full p-1 
                       hover:bg-(--background3)
                       hover:text-(--text)
                       transition-all
                       duration-100
                       cursor-pointer
                      "/>
                                <div className=' shrink-0'
                                    onClick={(e) => {
                                        if(right==='small'){
                                            console.log('hello')
                                            return
                                        }
                                        if (IsLeftOpen === 'big') {

                                            setLeftWidth(280);
                                        } else {

                                            setLeftWidth(1224);
                                        }

                                        dispatch(isLeftBig())

                                        e.stopPropagation()
                                    }}
                                >
                                    <OpenInNewIcon


                                        className={
                                            `
                        cursor-pointer 
                        h-8 w-8 
                        p-2
                        
                        text-(--text-secondary)
                        hover:text-(--text)
                        hover:bg-(--background3)
                        transition-all
                       duration-100
                       rounded-full 
                        `
                                        } />
                                </div>
                            </div>
                        </div>

                        <div
                            className='pr-2 pl-4 pb-4 flex gap-1 mt-2'
                        >
                            <button
                                className='
                             pr-3 pl-3 pt-1 pb-1  bg-(--background1) rounded-2xl 
                             hover:bg-(--background2)
                             hover:text-(--text)
                             text-[13px]
                             '
                            >
                                Playlists
                            </button>
                            <button
                                className='pr-3 pl-3 pt-1 pb-1  bg-(--background1) rounded-2xl 
                             hover:bg-(--background3)
                             hover:text-(--text)
                             text-[13px]
                            '
                            >
                                Artists
                            </button>

                        </div>

                    </>

            }


        </div>
    )
}

export default LeftTop