

import React from 'react'
import HeadOverLayer from './HeadOverLayer'


import QuickAccessCard from '../../components/UserHome/QuickAccessCard'
import GettingStarted from '../../components/UserHome/GettingStarted'
import BackToJump from '../../components/UserHome/BackToJump'

import Scroll from '../../components/UserHome/ScrollAlbums'
import ScrollerArtits from '../../components/UserHome/ScrollerArtists'



import { useSelector } from 'react-redux'


import LoaderHome from '../../Shimmers/UserHome/LoaderHome'
import TrackScroll from '../../components/Reused/TrackScroll'

const UserHome = () => {


  const { userAllData, loader, jumpBack, topCards } = useSelector(val => val.userData)

  const [scrollTop, setScrollTop] = React.useState(0)
  const [color, setColor] = React.useState('#7860E8')

  const { isPlaying, currentSongPlay } = useSelector(val => val.player);


  return loader ? <LoaderHome /> : (
    <div
      className="h-full overflow-y-auto bg-(--background-primary) spotify-scroll  scrollbar-none"
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >

      <HeadOverLayer scrollTop={scrollTop} />

      {/* Hero */}
      <div
        className="relative overflow-hidden"
      // onMouseLeave={() => setColor("lightblue")}
      >

        {/* Animated Color Layer */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            backgroundColor: color,
            opacity: 0.6
          }}
        />

        {/* Gradient Layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent -20%, rgba(18,18,18,.45) 10%, #121212 100%)"
          }}
        />




        {/* Cards */}

        <div
          className="relative z-10 grid  grid-cols-[repeat(auto-fit,minmax(220px,1fr))] grid-rows-2  pt-18 pb-5 gap-2 px-8 "
        >

          {/* quick access cards */}

          {
            topCards.length > 0 && topCards.map((song, index) => {
              return <QuickAccessCard 
              key={song._id || index} 
              val={song} 
              setColor={setColor} 
              isPlaying={isPlaying}
              currentSongPlay={currentSongPlay}
             
              />
            })
          }

        </div>




        <div className='h-10' />
      </div>



      <div className='pl-8 
      pr-1 
      space-y-10 
      flex gap-7
      
      '>

        {/* <GettingStarted text={'Getting started'} /> */}


        {
          hasData(jumpBack) && <BackToJump headingText={jumpBack.title} tracks={jumpBack.data} />
        }


      </div>


      {
        userAllData.length > 0 && userAllData.map((val, index) => (
          RenderAllSection(val, index)
        ))
      }






    </div>
  )
}

export default UserHome



const hasData = (section) =>
  section &&
  section.data &&
  section.data.length > 0;



function RenderAllSection(object, index = 0) {
  switch (object.type) {
    case 'albums':
      return hasData(object) && <Scroll key={index} headingText={object.title} album={object.data} />
    case "artists":
      return hasData(object) && <ScrollerArtits key={index} headingText={object.title} artists={object.data} />
    case "tracks":
      return hasData(object) && <TrackScroll key={index} headingText={object.title} tracks={object.data} />
    default:
      return null
  }
}