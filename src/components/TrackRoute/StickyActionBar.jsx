import { CirclePlus, Download, Ellipse, Ellipsis, Logs, Pause, Play, Shuffle } from "lucide-react";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { SongAdd } from "../../utils/playerSlice";
import { motion } from "motion/react";
const StickyActionBar = ({ song, scrollTop }) => {

    

    const isPlaying = useSelector(val => val.player.isPlaying);

    const id = useSelector(val => val.player.releaseId);

    const dispatch = useDispatch()

    const opacity = Math.min(scrollTop / 220, 1);
    return (
        <div className="

    h-[100px]

    p-[22px]
   
    flex
    items-center
    justify-between

   z-10 relative
   bg-

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
                      
                      whileTap={{scale:0.95}}
                      whileHover={{scale:1.05,background:'#05df72'}}

                    onClick={() => {
                        dispatch(SongAdd({ id: song._id, song: song }))
                    }}
                    className="h-14 w-14 rounded-full  bg-green-500 cursor-pointer flex items-center justify-center"

                >
                    {
                      (id===song._id&&  isPlaying)
                        ?<Pause className="text-black fill-black" />
                        :<Play className="text-black fill-black" />
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


                    <CirclePlus size={30} className="
                    text-(--text-secondary) 
                     hover:text-white
                     cursor-pointer
             duration-200
             trantion-
             hover:scale-[1.05]  " />
                    <Download size={30} className="
                    text-(--text-secondary) 
                     hover:text-white
                     cursor-pointer
             duration-200
             trantion-
             hover:scale-[1.05]  " />
                    <Ellipsis size={30} className="
                    text-(--text-secondary) 
                     hover:text-white
                     cursor-pointer
             duration-200
             trantion-
             hover:scale-[1.05]  " />
                </div>

            </div>



        </div>
    );
};

export default StickyActionBar;