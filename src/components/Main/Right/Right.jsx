import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IMAGE from './../../../assets/kyabaathai.png';
import RightTop from './RightComponents/RightTop';
import ImageRight from './RightComponents/ImageRight';
import { ChevronLeft } from 'lucide-react';
import ArtistsInfo from './RightComponents/ArtistsInfo';
import CreditsRight from './RightComponents/CreditsRight';
import EmptyRight from './RightComponents/EmptyRight';
import NextQueue from './RightComponents/NextQueue';
import SongInfoRight from './RightComponents/SongInfoRight';
import SwitchDiv from './SwitchDiv';


import { isRight } from '../../../utils/PanelState';

import CanvasVideo from './RightComponents/CanvasVideo';
const Right = () => {

  const dispatch = useDispatch()
  const { artistFollow } = useSelector(val => val.userData)
  const { rightSwitch, right, left } = useSelector(val => val.state);

  const [onScroll, setOnScroll] = useState(0);


  const { currentSongPlay: currentPlay, afterPlay, middlePlay: userQueue, isPlaying } = useSelector(val => val.player);

  const [mouseHover, setMouseHover] = React.useState(false);
  const [rightWidth, setRightWidth] = useState(280);



  function ChangeLayoutHandle(name) {
    switch (name) {
      case "queue":
        return <SwitchDiv currentPlay={currentPlay} afterPlay={afterPlay} userQueue={userQueue} />
      case "Connect":
        return <div>
          hekjj
        </div>;

      default:
        return null



    }
  }



  const handleMouseDown = (e) => {
    e.preventDefault()

    // where did the drag state?

    const startX = e.clientX;

    // where was the left panel width when drag started
    const startWidth = rightWidth;




    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;

      const size = startWidth - deltaX



      // setRightWidth(startWidth-deltaX)


      if (size <= 420 && size >= 280) {
        setRightWidth(startWidth - deltaX)
      }

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
        setMouseHover(true)
      }}
      onMouseLeave={() => {
        setMouseHover(false)

      }}

      className={
        `
          bg-(--background-primary)  
         h-full  rounded-sm
         transition-all
         duration-500
         relative 
         overflow-y-scrol
         scrollbar-none
         scroll-smooth
         
         `
      }
      style={{
        width: (right === 'middle') ? rightWidth : '30px',
        opacity: right === "middle" ? "1" : "0.8"
      }}
    >


      {
        <div
          className='w-40 h-full bg-(--background-primary)   
              absolute z-50 rounded-l-2xl  flex items-center
               justify-cente cursor-pointer 
                transition-all
                duration-700
                hover:opacity-0
                hover:bg-transparent
               '
          onClick={(e) => {
            e.stopPropagation()
            dispatch(isRight())
            console.log('hello')

          }}


          style={{

            opacity: right === "middle" ? "0" : "1",
            pointerEvents: right === "middle" ? 'none' : ""
          }}

        >

          <ChevronLeft size={30} className='z-30   h-10 w-10 opacity-100 text-2xl hover:scale-[1.04] relative '

          />


        </div>
      }




      {
        (right === 'middle') && <div
          className=' 
      absolute 
      left-1
      z-20
      translate-x-[-9px]
  
      rounded-2xl 
      top-2 
      h-[98%] 
      hover:bg-(--background4)
      bg-whit
      w-0.5
      cursor-col-resize
      duration-300
      transition-colors'

          onMouseDown={(e) => {
            e.preventDefault()
            handleMouseDown(e)
          }}
        />



      }


      {(Object.keys(currentPlay).length > 0)

        ? (
          rightSwitch === 'info' ?
            <div
              className={`
              overflow-y-auto
              h-full
              scrollbar-none
              w-full
              min-w-0

              transition-all
              duration-500
             
             `}
              onScroll={(e) => {
                setOnScroll(e.target.scrollTop);
              }}

              style={{
                width: right === "middle" ? rightWidth : '280px'
              }}

            >

              <RightTop left={left} currentPlay={currentPlay} hover={mouseHover} onScroll={onScroll} />
              {/* <ImageRight song={currentPlay} />
              <SongInfoRight song={currentPlay} /> */}
              {
                currentPlay.canvasVideo.url.length > 0
                  ? <CanvasVideo currentPlay={currentPlay} url={currentPlay.canvasVideo.url} isPlaying={isPlaying} />
                  :
                  <>
                    <ImageRight song={currentPlay} />

                  </>

              }
              <SongInfoRight song={currentPlay} />
              <ArtistsInfo artistFollow={artistFollow} currentPlay={currentPlay} />
              <CreditsRight artistFollow={artistFollow} currentPlay={currentPlay} />
              <NextQueue />





            </div>
            : ChangeLayoutHandle(rightSwitch)
        )

        : <EmptyRight />
      }



    </aside>
  )
}

export default Right