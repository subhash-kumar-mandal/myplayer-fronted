import { CirclePlus, Download, Ellipse, Ellipsis, Logs, Play, Shuffle } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import ReusedLoaderShimmer from "../Globalloaders/ReusedLoaderShimmer";
const Action = ({ scrollTop }) => {


    const opacity = Math.min(scrollTop / 220, 1);
    return (
        <div className="

    h-[100px]

    p-[22px]
   
    flex
    items-center
    justify-between

   
   
        "





        >

            {/* Left */}
            <div className="flex items-center gap-3">

                <ReusedLoaderShimmer className="h-14 w-14 rounded-full "

                />



                <div className="flex gap-5 items-center">

                    <ReusedLoaderShimmer className="h-12 w-[34px]    rounded-[2px]" />
                    <ReusedLoaderShimmer className="w-60 h-12 rounded-xs" />

                    
                </div>

            </div>

            {/* Right */}
            <ReusedLoaderShimmer
                className="flex  items-center gap-2
                w-20
                h-10
             rounded-xs
            
            
             "
            />



        </div>
    );
};

export default Action;