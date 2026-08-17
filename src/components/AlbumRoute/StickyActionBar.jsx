import { CheckCircle2, CirclePlus, Download, Ellipse, Ellipsis, Logs, Pause, Play, Shuffle } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { AlbumAdd_Song, isPlayingPause } from "../../utils/playerSlice";

import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { apifetch, URL_OBJECT } from "../../services/fetchHandleAll";
import { isSet_Follow_Album } from "../../utils/userDateSlice";
import Spinner from '../UX/Spinner'
import { setPreView } from "../../utils/PreviewContex";
const StickyActionBar = ({ scrollTop, songs, album }) => {

    const isPlaying = useSelector(val => val.player.isPlaying);
    const { albumfollow } = useSelector(val => val.userData);
    const { accessToken } = useSelector(val => val.userContext);

    const [loader, setloader] = React.useState(false);
    const id = useSelector(val => val.player.releaseId);
    const dispatch = useDispatch()

    const opacity = Math.min(scrollTop / 220, 1);


    const isAlbum = albumfollow.some(val => val._id === album._id);


    async function fetchAlbumToggle() {

        try {
            dispatch(isSet_Follow_Album(album))

            
            const res = await apifetch(URL_OBJECT.BASE_URL + '/user/album-follow/' + album._id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (!res) throw new Error("Something is wrong");

            if(!res.success) throw new Error(res.message);
            
          

        } catch (err) {
            
            toast.message(<div className="flex items-center w-full  px-2  py-2 gap-3">
                            <img
                                src={album?.image?.url}
                                alt=""
                                className="w-10 h-10 rounded-xs object-cover "
            
                            />
            
                            <div className="flex flex-col">
                                <span className="font-semibold capitalize text-white">
                                    <span className="text-red-500">error</span>
                                    <span> fallback </span>
                                </span>
            
                                <span className="text-xs capitalize text-(--text-secondary)">
                                    {album?.name}
                                </span>
                            </div>
                        </div>, {
                            closeButton: true,
                            position: "bottom-center",
                            style: {
                                transform: "translateY(-80px)",
                                background: " #121212",
                                border: "1px solid #ffffff4d",
                                padding: 0,
                                margin: 0
                            },
                            duration: 4000
                        });

            dispatch(isSet_Follow_Album(album))
            console.log(err)
        } finally {
            setloader(false)
        }

    }


    return (
        <div className="
     h-[100px]
     p-[22px]
     flex
     items-center
     justify-between
     z-10 relative
     transition-all
     duration-300
    "
            style={{
                backgroundColor: `rgba(21,24,24,${opacity})`
            }}




        >

            {/* Left */}
            <div className="flex items-center gap-3">

                <motion.div

                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05, background: '#05df72' }}
                    onClick={() => {
                        dispatch(AlbumAdd_Song({ id: album._id, songs: songs }))
                    }}

                    className="h-14 w-14 rounded-full bg-green-500 cursor-pointer flex items-center outline-none justify-center"

                >
                    {(id === album._id && isPlaying)
                        ? <Pause className="text-black fill-black" />
                        : <Play className="text-black fill-black" />
                    }

                </motion.div>

                {/* Ye wahi h2 hai */}
                <h2
                    className={`
                text-3xl
                font-bold
                transition-all
                duration-300
               
            `}
                >

                </h2>





                <div className="flex gap-5 items-center">
                    <motion.div className="h-10  w-[36px] cursor-pointer rounded-[5px] overflow-hidden
                    border border-(--background4)
                    shadow-2xl
                    "

                   whileHover={{scale:1.02}}
                    whileTap={{scale:0.96}}
                     
                     onClick={(e)=>{
                        
                        dispatch(setPreView({previewArray:songs,global:isPlaying}))
                        if(isPlaying)dispatch(isPlayingPause())
                        e.stopPropagation()
                     }}

                    >
                        <img src={songs[0].release.image.url} className="h-full w-full  " alt="" />

                    </motion.div>
                    <Shuffle size={30} className="
                    text-(--text-secondary) 
                     hover:text-white
                     cursor-pointer
             duration-200
             trantion-
             hover:scale-[1.05]  " />

                    <motion.div

                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 1.05 }}

                        onClick={(e) => {
                            fetchAlbumToggle()
                            e.stopPropagation()
                        }}
                        className=" w-8 h-8 flex justify-center items-center "
                    >


                        {loader ?
                            <Spinner   />

                            : isAlbum ?
                                <CheckCircle2 size={30} className="
                    text-(--text-secondary) 
                    
                     text-green-500
                     cursor-pointer
             duration-200
             trantion-
             hover:scale-[1.05]  " />
                                :
                                <CirclePlus size={30} className="
                    text-(--text-secondary) 
                     hover:text-white
                     cursor-pointer
             duration-200
             trantion-
             hover:scale-[1.05]  "



                                />


                        }
                    </motion.div>
                    {/* <Download size={30} className="
                    text-(--text-secondary) 
                     hover:text-white
                     cursor-pointer
             duration-200
             trantion-
             hover:scale-[1.05]  " /> */}
                    <Ellipsis size={30} className="
                    text-(--text-secondary) 
                     hover:text-white
                     cursor-pointer
             duration-200
             trantion-
             hover:scale-[1.05]  " />
                </div>

            </div>

            {/* Right */}
            <div
                className="flex  items-center gap-2
             text-(--text-secondary)  hover:text-white
             
             duration-200
             trantion-
             hover:scale-[1.05]
            
             "
            >
                <span>
                    List
                </span>
                <Logs size={18} />
            </div>

        </div>
    );
};

export default StickyActionBar;