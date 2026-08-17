import { ChevronDown, Clock3 } from "lucide-react";
import React from "react";

const Table = () => {


    return (
        <div
            className="
      
      
      
     
      h-[36px]

     
   
     

      flex
      items-center

      px-1
      
      mb-[14px]
      "

        >



            <div
                className="
        grid
        w-full
        grid-cols-[40px_1fr_140px_230px_100px]
        pb-2
        gap-4
        text-sm
        text-(--text-secondary)
        border-b
        border-(--border-color)
        px-7
        
        "
            >
                <p
                    className="
          rounded-[5px]
          h-6
          w-10
             bg-(--background3)
            animate-pulse
        "
                ></p>

                <p
                className=" h-6
                w-20
             bg-(--background3)
             rounded-[5px]
            animate-pulse"
                ></p>


                <div
                className="h-6 w-[80px] rounded-[5px] bg-(--background3) animate-pulse"
                />
                <div
                className="h-6 w-[140px] rounded-[5px] bg-(--background3) animate-pulse"
                />

                <div className="flex items-center justify-around gap-3 ">


                    <div 
                    className="h-6 w-6 rounded-full bg-(--background3) animate-pulse"
                    >

                    </div>
                   <div
                   className="h-6 w-10 rounded-[5px] bg-(--background3) animate-pulse"
                   >

                   </div>
                </div>
          

            </div>

        </div>
    );
};

export default Table;