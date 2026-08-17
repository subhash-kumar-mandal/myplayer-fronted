import React from 'react'
import KYABAAT from '../../../assets/kyabaathai.png'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useDispatch } from 'react-redux'
import { isQueue } from '../../../utils/PanelState'
import { useNavigate } from 'react-router-dom'

const SwitchDiv = ({ currentPlay, afterPlay }) => {

    const navigation = useNavigate()

    const dispatch = useDispatch()
    const userQueue = afterPlay.filter(val => val.userQueue);
    const nextPlay = afterPlay.filter(val => val.userQueue === false);
    console.log(afterPlay)



    return (


        <AnimatePresence>
            <motion.div
                className=' w-full z-20 bg-(--background-primary) 
                      absolute     
                      pb-2  
                      overflow-y-scroll 
                      scrollbar-none h-full 
                       mb-3
                      '

                initial={{
                    opacity: 0,

                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                exit={{
                    opacity: 0,

                }}
                transition={{
                    duration: 0.8
                }}
            >
                {currentPlay?._id && <div className=' sticky top-0 bg-(--background-primary) z-10 flex   shadow-2xs   w-full  h-16 px-3 py-5 justify-between'>

                    <div className='text-[16px] font-bold' >Queue</div>
                    <motion.div className='rotate-44 cursor-pointer  '

                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            dispatch(isQueue());
                        }}

                    >
                        <Plus />
                    </motion.div>
                </div>}


                <AnimatePresence>
                    {
                        currentPlay?._id && (
                            <motion.div className=' relative'

                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            >



                                <div className='bg-[#1F1F1F h-full w-full rounded-xl px-2 py-2 flex  gap-2   flex-col '>

                                    <div className='flex justify-between px-2 mt-1 items-center   font-bold '>
                                        <h1>
                                            Now playing
                                        </h1>

                                    </div>


                                    <motion.div className=' px-2  rounded-[4px]  h-14 flex items-center  w-full
                        hover:bg-[#1F1F1F]
                        gap-2
                        cursor-pointer
                        '

                                        initial={{
                                            opacity: 0,
                                            y: 10
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 10
                                        }}
                                        transition={{
                                            duration: 0.2
                                        }}
                                    >


                                        <div className='h-12 w-12 rounded-xs overflow-hidden bg-amber-200 my-2'>
                                            <img src={currentPlay.release.image.url} alt="" />
                                        </div>

                                        <div className='flex flex-col min-w-0 flex-1'>
                                            <h2 className='font-medium  text-green-300  truncate capitalize'>
                                                {
                                                    currentPlay.name
                                                }
                                            </h2>
                                            <p className='text-[14px] text-(--text-secondary) truncate  capitalize'>
                                                {currentPlay.artists.map((val, index) => (
                                                    <React.Fragment key={val._id}>
                                                        <span className="font-medium text-[14px] capitalize hover:underline cursor-pointer"
                                                            onClick={(e) => {

                                                                e.stopPropagation();
                                                                navigation('/artist/' + val._id)
                                                            }}
                                                        >
                                                            {val.name}
                                                        </span>

                                                        {index < currentPlay.artists.length - 1 && (
                                                            <span> &bull; </span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </p>
                                        </div>

                                    </motion.div>
                                </div>

                            </ motion.div>
                        )
                    }

                </AnimatePresence>

                <AnimatePresence>


                    {
                        userQueue.length > 0 &&
                        (
                            <motion.div className='  w-full rounded-xl px-2 py-2 flex  gap-2  flex-col '

                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >

                                <div className='flex justify-between px-2 mt-1 items-center   font-bold '>
                                    <h1>
                                        User queue
                                    </h1>

                                </div>

                                {
                                    userQueue.map((val, index) => {

                                        return <motion.div key={`${val._id}-${index}`} className=' px-2  rounded-[4px] h-14 flex items-center  w-full
                        hover:bg-[#1F1F1F]
                      
                        gap-2
                        cursor-pointer
                        '
                                            initial={{
                                                opacity: 0,
                                                y: 2
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 2
                                            }}
                                            transition={{
                                                duration: 0.4
                                            }}

                                        >


                                            <div className='h-12 w-12 rounded-[4px] overflow-hidden  my-2'>
                                                <img src={val.release.image.url} alt="" />
                                            </div>

                                            <div className='flex flex-col min-w-0 flex-1'>
                                                <h2 className='font-medium capitalize truncate'>
                                                    {
                                                        val.name
                                                    }
                                                </h2>
                                                <p className='text-[14px] truncate text-(--text-secondary)  capitalize'>
                                                    {val.artists.map((artist, index) => (
                                                        <React.Fragment key={artist._id}>
                                                            <span className="font-medium text-[14px] capitalize hover:underline cursor-pointer"
                                                                onClick={(e) => {

                                                                    e.stopPropagation();
                                                                    navigation('/artist/' + artist._id)
                                                                }}
                                                            >
                                                                {artist.name}
                                                            </span>

                                                            {index < val.artists.length - 1 && (
                                                                <span> &bull; </span>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </p>
                                            </div>

                                        </motion.div>
                                    })
                                }



                            </motion.div>
                        )
                    }
                </AnimatePresence>

                <AnimatePresence>



                    {
                        nextPlay.length > 0 &&
                        (
                            <motion.div className='  w-full rounded-xl px-2 py-2 flex  gap-2   flex-col '

                                initial={{
                                    opacity: 0,
                                    y: 10
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10
                                }}
                                transition={{
                                    duration: 0.6
                                }}

                            >

                                <div className='flex justify-between px-2 mt-1 items-center   font-bold '>
                                    <h1>
                                        Next up
                                    </h1>

                                </div>

                                {
                                    nextPlay.map((val, index) => {

                                        return <motion.div key={`${val._id}-${index}`} className=' px-2  rounded-[4px] h-14 flex items-center  w-full
                                             hover:bg-[#1F1F1F]
                                             gap-2
                                             cursor-pointer
                                             '
                                            initial={{
                                                opacity: 0,
                                                y: 2
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 2
                                            }}
                                            transition={{
                                                duration: 0.6
                                            }}

                                        >


                                            <div className='h-12 w-12 rounded-xs overflow-hidden  my-2'>
                                                <img src={val.release.image.url} alt="" />
                                            </div>

                                            <div className='flex flex-col min-w-0 flex-1'>
                                                <h2 className='font-medium truncate    capitalize'>
                                                    {
                                                        val.name
                                                    }
                                                </h2>
                                                <p className='text-[14px] truncate text-(--text-secondary) hover: capitalize'>
                                                    {val.artists.map((artist, index) => (
                                                        <React.Fragment key={artist._id}>
                                                            <span className="font-medium text-[14px] capitalize hover:underline cursor-pointer"
                                                                onClick={(e) => {

                                                                    e.stopPropagation();
                                                                    navigation('/artist/' + artist._id)
                                                                }}
                                                            >
                                                                {artist.name}
                                                            </span>

                                                            {index < val.artists.length - 1 && (
                                                                <span> &bull; </span>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </p>
                                            </div>

                                        </motion.div>
                                    })
                                }



                            </motion.div>
                        )
                    }
                </AnimatePresence>

            </motion.div>
        </AnimatePresence>

    )
}

export default SwitchDiv