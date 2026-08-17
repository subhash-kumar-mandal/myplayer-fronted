import { ChevronDown, Clock3 } from "lucide-react";
import React from "react";

const StickyTableHeader = ({ scrollTop }) => {
  
  const opacity = Math.min(scrollTop / 300, 2);
  
  return (
    <div
      className="
      sticky
      top-16
      z-30
      
     
      h-[36px]

     
   
     

      flex
      items-center

      px-3
      
      mb-[14px]
      "
      style={{
        backgroundColor: `rgba(31,31,31,${opacity>1?opacity:0})`
      }}
    >



      <div
        className="
        grid
        w-full
        grid-cols-[20px_1fr_80px]
      pb-2
      gap-1
        text-sm
        text-(--text-secondary)
         border-b
      border-(--border-color)
      px-7
        
        "
      >
        <p
          className="
        "
        >#</p>

        <p>Title</p>

        <div className="flex items-center justify-around gap-3 ">


          <Clock3 size={16} className=" shrink-0" />
          <ChevronDown size={18} />
        </div>
      </div>

    </div>
  );
};

export default StickyTableHeader;