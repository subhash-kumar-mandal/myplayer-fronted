import { Ellipsis, Logs, Play, Shuffle } from "lucide-react";
import React from "react";
import { URL_OBJECT } from "../../services/fetchHandleAll";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { apifetch } from "../../services/fetchHandleAll";
import { isSet_Follow_Artist } from "../../utils/userDateSlice";
import Spinner from "../UX/Spinner";
import { AlbumAdd_Song } from "@/utils/playerSlice";
import { toast } from "sonner";
const StickyActionBar = ({ artist, songs }) => {

    const dispatch = useDispatch()

    const [loader, setloader] = React.useState(false);
    const { accessToken } = useSelector(val => val.userContext);

    const { artistFollow } = useSelector(val => val.userData);

    const isArtist = artistFollow.some(val => val._id === artist._id);

    async function folllowTogglefetch() {

        try {
            
            dispatch(isSet_Follow_Artist(artist))
            const res = await apifetch(URL_OBJECT.BASE_URL + '/user/artist-follow/' + artist._id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const result = res;
            if (!result) throw new Error("something is wrong");
            if (!result.success) throw new Error(result.message);

            
        } catch (err) {
            

            toast.message(<div className="flex items-center w-full  px-2  py-2 gap-3">
                <img
                    src={artist?.image?.url}
                    alt=""
                    className="w-10 h-10 rounded-xs object-cover "

                />

                <div className="flex flex-col">
                    <span className="font-semibold capitalize text-white">
                        <span className="text-red-500">error</span>
                        <span> fallback </span>
                    </span>

                    <span className="text-xs capitalize text-(--text-secondary)">
                        {artist?.name}
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
            dispatch(isSet_Follow_Artist(artist))
            
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





        >

            {/* Left */}
            <div className="flex items-center gap-3">

                <motion.div

                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05, background: '#05df72' }}
                    className="h-14 w-14 rounded-full bg-green-500 cursor-pointer flex items-center outline-none justify-center"

                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(AlbumAdd_Song({ id: artist._id, songs: songs }))
                    }}
                >

                    <Play className="text-black fill-black" />


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
                    
                    <Shuffle size={30} className="
                    text-(--text-secondary) 
                     hover:text-white
                     cursor-pointer
             duration-200
             trantion-
             hover:scale-[1.05]  " />



                    <motion.button className=" 
                    text-[14px] 
                    capitalize 
                    border
                    border-(--background3) 
                    w-26
                    h-8
                    flex justify-center
                    items-center 
                    cursor-pointer
                    rounded-2xl
                    hover:border-white
                   
                    
                    

                    "
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}

                        disabled={loader}
                        onClick={() => {
                            folllowTogglefetch()
                        }}
                    >
                        {
                            isArtist
                                    ? 'Unfollow'
                                    : 'follow'
                        }
                    </motion.button>




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