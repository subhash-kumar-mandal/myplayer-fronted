import { CirclePlus, Download, Ellipse, Ellipsis, Logs, Play, Shuffle } from "lucide-react";
import React from "react";
import { toast } from "sonner";
const Action = ({ scrollTop }) => {


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





        >

            {/* Left */}
            <div className="flex items-center gap-3">

                <div className="h-14 w-14 rounded-full bg-(--background3)  flex items-center justify-center animate-pulse"

                >

                </div>







                <div className="flex gap-5 items-center">
                   

                    <div
                        className="w-40
                h-14
             rounded-[5px]
             bg-(--background3)
            animate-pulse"
                    >

                    </div>
                </div>

            </div>

            {/* Right */}
            <div
                className="flex  items-center gap-2
                w-20
                h-8
             rounded-[5px]
             bg-(--background3)
            animate-pulse
            
             "
            >

            </div>

        </div>
    );
};

export default Action;