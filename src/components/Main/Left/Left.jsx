import React, { useEffect, useState } from 'react'
import LeftTop from './LeftTop'
import LeftBottom from './LeftBottom'
import { useDispatch, useSelector } from 'react-redux'
import { isleft, isLeftMiddleSet, isLeftSmallSet } from '../../../utils/PanelState'

const Left = () => {

  const dispatch = useDispatch()
  const { left,right } = useSelector(val => val.state)
  const { albumfollow, artistFollow } = useSelector(val => val.userData)
  const [Exit, setExit] = useState(false)
  const [leftWidth, setLeftWidth] = React.useState(280)

  
  const handleMouseDown = (e) => {
    e.preventDefault()

    // where did the drag state?

    const startX = e.clientX;

    // where was the left panel width when drag started
    const startWidth = leftWidth;




    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;

      const size = startWidth + deltaX

      if (size <= 100) {
        setLeftWidth(72);


        dispatch(isLeftSmallSet());

        return;

      };



      if (size >= 280 && size <= 420) {


        setLeftWidth(size);


        dispatch(isLeftMiddleSet());


        return;

      };

      console.log("startX", startX, "startWidth", startWidth);

    };


    //  mouse release hone par reisize stop karega 
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp)
    };


    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp)


  };






  return (
    <aside

      onMouseEnter={() => {
        setExit(true)
      }}
      onMouseLeave={() => {
        setExit(false)
      }}

      className={
        `
        
        h-full  
        bg-(--background-primary) 
        rounded-sm
        transition-all
         relative
        
        duration-300
        `
      }
      style={{
        width: leftWidth
      }}
    >
      <div className=' 
      absolute 
      right-0 
      translate-x-1.25 
      rounded-2xl 
      top-2 
      h-[98%] 
      hover:bg-(--background4)
      shrink-0
      w-0.5
      cursor-col-resize
      
      duration-700
      transition-colors'
        onMouseDown={(e) => {

          handleMouseDown(e)
          e.stopPropagation()
        }}
      >


      </div>
      <LeftTop right={right} Exit={Exit} IsLeftOpen={left} leftWidth={leftWidth} setLeftWidth={setLeftWidth} />
      <LeftBottom left={left} albums={albumfollow} artists={artistFollow} />
    </aside>
  )
}

export default Left


