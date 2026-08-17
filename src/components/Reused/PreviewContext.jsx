import { ArrowDown, ChevronDown, ChevronsUpDown, ChevronUp, CirclePlus, Ellipsis, LayersPlus, SquareArrowOutUpRight, Volume1, VolumeOff, VolumeX, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { indexNext, indexPre, setPreviewClear } from '../../utils/PreviewContex'
import { isPlayingPlay, setUserQueue } from '../../utils/playerSlice'
import { motion } from 'motion/react'
import PlayingAnimation from '../UX/PlayingAnimation'
import { toast } from 'sonner'
import { s } from 'motion/react-client'

const PreviewContext = ({ previewArray }) => {

    const disptach = useDispatch()

    const { afterPlay } = useSelector(val => val.player);


    const { index, isGlobal } = useSelector(val => val.preview);
    const direction = React.useRef(1);
    const [value, setValue] = React.useState(0)

    const [progress, setProgress] = React.useState({
        min: 0,
        sec: 0,
        visible: '',
        progressVisible: 0,
        fullduration: ""
    });

    const AudioRef = React.useRef(null)
    const currentPlay = previewArray[index];
    const length = currentPlay.name.length > 15
    const [volume, setVolume] = useState(1);
    const is_Next = previewArray.length === 1;

    const result = (afterPlay.some(val => {
        return (currentPlay._id === currentPlay._id && val.userQueue === true)
    }));


    function handleTime(e) {
        if (Object.is(NaN, e.target.currentTime)) return
        const pro = (e.target.currentTime / e.target.duration) * 100;
        const minutes = Math.floor(e.target.currentTime / 60);
        const seconds = Math.floor(e.target.currentTime % 60);

        const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

        const min = Math.floor(AudioRef.current.duration / 60);
        const sec = Math.floor(AudioRef.current.duration % 60);
        const fullduration = `${min}:${sec.toString().padStart(2, "0")}`;




        setProgress(p => {
            return {
                ...p,
                progressVisible: pro,
                visible: duration,
                min: minutes,
                sec: seconds,
                fullduration: fullduration
            }
        });
    }

    function setQueue() {
        toast(<div className="flex items-center w-full  px-2  py-2 gap-3">
            <img
                src={currentPlay?.release?.image?.url}
                alt=""
                className="w-10 h-10 rounded-xs object-cover "
                style={{ border: '0.5px solid ' + currentPlay.release.themeColor.primary }}
            />

            <div className="flex flex-col">
                <span className="font-semibold capitalize text-white">
                    {
                        result ? "romove to queue" : 'add to queue'
                    }
                </span>

                <span className="text-xs capitalize text-(--text-secondary)">
                    {currentPlay?.name}
                </span>
            </div>
        </div>, {
            closeButton: true,
            position: "bottom-center",
            style: {

                background: " #121212",
                border: "1px solid #ffffff4d",
                padding: 0,
                margin: 0
            },
            duration: 2000
        });
        disptach(setUserQueue(currentPlay))
    }



    useEffect(() => {
        if (!AudioRef.current) return
        AudioRef.current.load();
        AudioRef.current.play().catch(console.error);



    }, [index])

    useEffect(() => {
        if (!AudioRef.current) return
        AudioRef.current.volume = volume


    }, [volume])




    const nums = React.useCallback(() => {

        setValue(prev => {
            const next = prev + direction.current;

            if (next >= 80) {
                direction.current = -1;
            }

            if (next <= 0) {
                direction.current = 1;
            }

            return next;
        });

    }, []);

    useEffect(() => {

        const interval = setInterval(() => {
            nums();
        }, 500);

        return () => clearInterval(interval);

    }, [nums]);




    return (
        <div className=' absolute top-0 bg-black/85 flex  inset-0 z-50 justify-center items-center '

            onClick={() => {
                if (isGlobal) {
                    disptach(isPlayingPlay())
                }
                disptach(setPreviewClear())
            }}

        >
            <audio
                ref={AudioRef}
                src={currentPlay.previewAudio.url}
                onTimeUpdate={handleTime}
                onEnded={() => {
                    AudioRef.current.current = 0;
                    AudioRef.current.play()
                }}
            >

            </audio>

            <div className='bg-(--background-primary) relative h-150 w-250 rounded-2xl overflow-hidden  border border-(--background3) shadow-2xl '
                onClick={(e) => e.stopPropagation()}
            >

                <div

                    style={{
                        background: `radial-gradient(circle, ${currentPlay.release.themeColor.primary} 0%, transparent 70%)`,
                        filter: `blur(${100 + value}px)`
                    }}
                    className={` 
                   absolute
                     
                    h-140 w-140 
                    right-0 
                    bottom-10 
                    rounded-full
                    translate-x-70
                     bg-radial
                     
                    `}

                >

                </div>

                <div className=' h-16 w-full px-6 flex items-center justify-between '>

                    <h1 className='
                text-[16px] font-bold
                 capitalize
                '>
                        {
                            currentPlay.release.name
                        }
                    </h1>

                    <div className='
                    flex items-center gap-4
                     relative z-20
                    '>
                        {
                            volume > 0
                                ? (
                                    <motion.div

                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}

                                        className='flex items-center gap-1 cursor-pointer'

                                    >
                                        <Volume1
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log("clicked");
                                                setVolume(0);
                                            }}
                                        />
                                        <PlayingAnimation />
                                    </motion.div>
                                )
                                :
                                <VolumeX
                                    onClick={() => {
                                        setVolume(1)
                                    }}
                                    className='cursor-pointer'
                                />
                        }
                        <motion.div

                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className='cursor-pointer'
                        >
                            <X size={28}
                                onClick={(e) => {

                                    if (isGlobal) {
                                        disptach(isPlayingPlay())
                                    }
                                    disptach(setPreviewClear())
                                    e.stopPropagation()

                                }}
                            />
                        </motion.div>

                    </div>

                </div>


                {/* Infos */}
                <div className='
                     h-100 w-full mt-10
                    grid grid-cols-[2fr_2fr_100px]
                     relative z-100
                    '>

                    <div className=' flex    flex-col pl-10 gap-5 pt-30 '>

                        <h1 className={` hover:underline  uppercase cursor-pointer`}

                            style={{
                                fontSize: length ? "1.5rem" : "2rem"
                            }}
                        >
                            {
                                currentPlay.name
                            }
                        </h1>
                        <p className='text-wrap max-w-[80%] capitalize'>


                            {currentPlay.artists.map((val, index) => (
                                <React.Fragment key={val._id}>
                                    <span className="font-bold text-[14px] capitalize hover:underline cursor-pointer">
                                        {val.name}
                                    </span>

                                    {index < currentPlay.artists.length - 1 && (
                                        <span> &bull; </span>
                                    )}
                                </React.Fragment>
                            ))}


                        </p>

                        <div className='flex items-center relative  gap-3'>
                            <div className='text-[12px]'>
                                {
                                    progress.visible <= 0 ? "0:00" : progress.visible
                                }
                            </div>
                            <div className=' bg-(--background3)  h-1 rounded-xl w-[60%] overflow-hidden'>

                                <div className='bg-white rounded-2xl  h-full transition-all duration-300'
                                    style={{
                                        width: `${progress.progressVisible}%`
                                    }}
                                ></div>
                            </div>
                            <div className='text-[12px]'>
                                {
                                    progress.fullduration.length <= 0 ? "0:00" : progress.fullduration
                                }
                            </div>
                        </div>

                    </div>
                    {/* image */}
                    <div className='flex justify-center items-center'>

                        {
                            currentPlay.canvasVideo.url
                                ? <video
                                    src={currentPlay.canvasVideo.url}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className='
                              aspect-9/16 w-[50%]   rounded-[5px] 
                             ' />
                                : <div className='cursor-pointer h-[250px]  w-[250px] bg-amber-200 rounded-xl overflow-hidden'>
                                    <img src={currentPlay.release.image.url} className='w-full h-full object-cover' alt="" />
                                </div>
                        }



                        {/* <div className='cursor-pointer h-[250px]  w-[250px] bg-amber-200 rounded-xl overflow-hidden'>
                            <img src={currentPlay.release.image.url} className='w-full h-full object-cover' alt="" />
                        </div> */}
                    </div>

                    {/* Actions */}
                    <div className=' flex justify-center items-center  '>


                        <div className='flex flex-col gap-5 items-center '>
                            <Ellipsis size={30} className='' />

                            <SquareArrowOutUpRight size={30} />
                            <LayersPlus size={30} />
                            <CirclePlus size={30}
                                onClick={(e) => {
                                    setQueue()
                                    e.stopPropagation()
                                }}
                            />
                        </div>


                    </div>


                </div>

                <div className=' w-full  flex justify-between items-center px-5  h-20'>

                    <div className=' flex  items-center w-40 gap-3 '>
                        <div className=' w-10 h-10 rounded-full overflow-hidden'>
                            <img src={currentPlay.artists[0].image.url} alt="" />
                        </div>
                        <p className=' capitalize text-(--text-secondary) text-[14px]'>
                            {
                                currentPlay.artists[0].name
                            }
                        </p>
                    </div>

                    <div className=' relative z-20 h-full w-30 flex justify-center items-center '>
                        {
                            (index === 0 && !is_Next) && (<motion.button
                                disabled={is_Next}
                                animate={{
                                    y: [0, -8, 0], // upar niche move
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                onClick={() => {
                                    disptach(indexNext())
                                }}



                                className=' bg-white font-bold cursor-pointer px-6 py-2 rounded-3xl text-black flex items-center gap-2'
                            >
                                Next <ArrowDown />
                            </motion.button>)
                        }

                        {
                            (index > 0) && (
                                <div className='flex flex-col pb-4 gap-2'>

                                    <motion.div
                                        className='cursor-pointer'
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}

                                    >

                                        <ChevronUp size={40}
                                            onClick={() => {
                                                disptach(indexPre())
                                            }}
                                        />
                                    </motion.div>


                                    <motion.div
                                        className='cursor-pointer'
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        <ChevronDown size={40}



                                            onClick={() => {
                                                disptach(indexNext())
                                            }}
                                        />

                                    </motion.div>



                                </div>
                            )
                        }

                    </div>
                </div>



            </div>


        </div >
    )
}

export default PreviewContext