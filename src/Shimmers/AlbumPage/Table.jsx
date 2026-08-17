import { ChevronDown, Clock3 } from "lucide-react";
import React from "react";
import ReusedLoaderShimmer from "../GlobalLoaders/ReusedLoaderShimmer";

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
        grid-cols-[40px_1fr_80px]
        pb-2
        gap-4
        border-b
        border-(--border-color)
        px-7
        
        "
            >
                <ReusedLoaderShimmer
                    className="
          rounded-[2px]
          h-6
          w-10
             
        "
                />

                <ReusedLoaderShimmer
                className=" h-6
                w-20
                rounded-xs "
                />

                <div className="flex items-center justify-around gap-3 ">


                    <ReusedLoaderShimmer
                    className="h-6 w-6 rounded-full "
                    />

                    
                   <ReusedLoaderShimmer
                   className="h-6 w-10 rounded-[5px] "
                   />

                   
                </div>
            </div>

        </div>
    );
};

export default Table;