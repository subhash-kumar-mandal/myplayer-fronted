import { useEffect, useRef } from 'react'
import {


    ListPlus,
    Ban,
    Radio,
    UserRound,
    BadgeInfo,
    Share2,
    MonitorSpeaker,
    ChevronRight,
    Plus,
    CirclePlus,
    CircleCheck,
    Disc,
} from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { clearhandleContextMenu } from '../../utils/contextmenu';
import { setUserQueue } from '../../utils/playerSlice';

import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';

const menus = [
    { icon: <Plus size={18} />, text: "Add to playlist", arrow: true },
    { icon: <CirclePlus size={18} />, text: "Save to your Liked Songs" },
    { icon: <ListPlus size={18} />, text: "Add to queue", action: 'AddQueue' },
    { icon: <Ban size={18} />, text: "Exclude from your taste profile" },
    "divider",
    { icon: <Radio size={18} />, text: "Go to song radio" },
    { icon: <UserRound size={18} />, text: "Go to artist", arrow: true, action: "GoArtist" },
    { icon: <Disc size={18} />, text: "Go to album", arrow: true, action: 'GoAlbum' },
    { icon: <BadgeInfo size={18} />, text: "View credits" },
    { icon: <Share2 size={18} />, text: "Share", arrow: true },
    "divider",
    { icon: <MonitorSpeaker size={18} />, text: "Open in Desktop app" },
];


const GlobalContext = ({ y, x, song }) => {

    const location = useLocation();

    const currentPath = location.pathname;
    const isCurrentAlbum =
        currentPath === `/album/${song.release._id}`;

    const isCurrentArtist =
        currentPath === `/artist/${song.artists[0]._id}`;

    const { afterPlay } = useSelector(val => val.player);

    const navi = useNavigate()
    const result = (afterPlay.some(val => {
        return (val._id === song._id && val.userQueue === true)
    }))


    const trackOpenRef = useRef(null);
    const dispatch = useDispatch()






    function handleMenuClick(actionName) {

        switch (actionName) {
            case "AddQueue":
                
                toast(<div className="flex items-center w-full  px-2  py-2 gap-3">
                    <img
                        src={song?.release?.image?.url}
                        alt=""
                        className="w-10 h-10 rounded-xs object-cover "
                        style={{ border: '0.5px solid ' + song.release.themeColor.primary }}
                    />

                    <div className="flex flex-col">
                        <span className="font-semibold capitalize text-white">
                            {
                                result?"romove to queue":'add to queue'
                            }
                        </span>

                        <span className="text-xs capitalize text-(--text-secondary)">
                            {song?.name}
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
                dispatch(setUserQueue(song))
                return;

            case "GoAlbum":
                navi(`/album/${song.release._id}`);
                return

        }

    }



    useEffect(() => {

        function OutSideClickHandle(e) {


            if (trackOpenRef.current && !trackOpenRef.current.contains(e.target)) {
                dispatch(clearhandleContextMenu());
            }

        }

        document.addEventListener('click', OutSideClickHandle);

        return () => {
            document.removeEventListener('click', OutSideClickHandle)
        }


    }, [dispatch])



    return (
        <div ref={trackOpenRef} className="w-[270px] left-[-300px]  z-40 top-[100px] absolute  rounded-md bg-[#282828] p-1 shadow-2xl text-white"
            style={{
                left: x,
                top: y
            }}
        >
            {menus.map((item, index) => {
                if (item === "divider") {
                    return <div
                        key={index}
                        className="my-1 h-px bg-white/10"
                    />
                } else if (item.action === "GoAlbum" && isCurrentAlbum) {
                    return null;

                } else if (item.action === "GoArtist" && isCurrentArtist) {
                    return null;
                } else {

                    return <motion.button
                        whileTap={{ scale: 0.98 }}


                        onClick={(e) => {
                            handleMenuClick(item.action)
                            e.stopPropagation()
                        }}
                        key={index}
                        className="flex w-full items-center justify-between group cursor-pointer rounded-[4px] px-3 py-[10px] hover:bg-[#3e3e3e] transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-[#d9d9d9]">{item.icon}</span>

                            <span className="text-[14px] font-medium">
                                {item.text}
                            </span>
                        </div>
                        {
                            (result) &&
                                (item.action == 'AddQueue')
                                ? (item.action == 'AddQueue') && <CircleCheck size={20} className='text-[#282828] group-hover:text-[#3e3e3e] fill-green-400' />
                                : (item.action == 'AddQueue') && <CirclePlus size={18} className='text-(--text-secondary) ' />
                        }

                        {item.arrow && (
                            <ChevronRight size={16} className="text-[#b3b3b3]" />
                        )}
                    </motion.button>
                }
            }
            )}
        </div>
    )
}

export default GlobalContext