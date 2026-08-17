import React from 'react'
import { useParams } from 'react-router-dom'
import Hero from '../../components/TrackRoute/Hero';
import StickyActionBar from '../../components/TrackRoute/StickyActionBar';


import { TrackMap } from '../../services/CacheAPI';
import Lyrics from '../../components/TrackRoute/Lyrics';
import SongArtists from '../../components/TrackRoute/SongArtists';
import Footer from '../../components/UX/Footer';
import DotLoader from '../../components/UX/DotLoader'

import ScrollDiv from '../../components/UserHome/ScrollAlbums';
import ScrollerArtits from '../../components/UserHome/ScrollerArtists';
import { useSelector } from 'react-redux';
import { apifetch, URL_OBJECT } from '@/services/fetchHandleAll';

const Track = () => {

  const { accessToken } = useSelector(val => val.userContext);

  const [scrollTop, setScrollTop] = React.useState(0)

  const { id } = useParams();



  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);


  const [songsDeteils, setSongsDeteils] = React.useState({
    song: {},
    sections: []
  })



  React.useEffect(() => {

    async function fetchTrack() {

      try {


        const result = await apifetch(URL_OBJECT.BASE_URL + URL_OBJECT.TRACK_URL + id, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,

          },
          credentials:"include"
        });

        if(!result) throw new Error("Something is wrong");

        if(!result.success) throw new Error("Api response is Bad 500");

        const song = result?.song ?? {}
        const sections = result.sections ?? [];
 
        setSongsDeteils(p => {
          return {
            ...p,
            song: song,
            sections: sections
          }
        })


      } catch (err) {
        console.error(err)
        setError(true)

      } finally {
        setLoading(false)
      }
    }
    fetchTrack()

  }, [])



  if (error) {
    return (
      <div className='flex h-full bg-(--background-primary) w-full items-center justify-center'>
        <p className='text-4xl'>APi faild ho gya</p>
      </div>
    )
  }

  return loading ? (
    <div className='
      h-full 
      bg-(--background-primary) 
      flex items-center 
      justify-center'>
      <DotLoader />
    </div>)
    : (
      <div
        className='
        h-full 
        overflow-y-auto   
        bg-(--background-primary) 
        spotify-scroll  
        scrollbar-none
         '
      >

        <Hero song={songsDeteils.song} />

        <div
          className="
        relative 
        "
        >



          {/* Gradient Layer */}
          <div
            className="absolute inset-x-0 top-0 h-[200px] "
            style={{
              background: `linear-gradient(
        180deg,
        color-mix(in srgb, ${songsDeteils.song.release?.themeColor?.primary} 40%, #121212) 0%,
        color-mix(in srgb, ${songsDeteils.song.release?.themeColor?.primary} 10%, #121212) 40%,
        #121212 100%
      )`
            }}
          />

          <StickyActionBar song={songsDeteils.song} scrollTop={scrollTop} />

        </div>

        <Lyrics />
        <SongArtists song={songsDeteils.song} />


        {
          songsDeteils.sections.length > 0 && songsDeteils.sections.map(val => {
            return RenderAllSection(val)
          })
        }


        <Footer />




      </div>
    )
}

export default Track


const hasData = (section) =>
  section &&
  section.data &&
  section.data.length > 0;


function RenderAllSection(object) {
  switch (object.type) {
    case 'album':
      return hasData(object) && <ScrollDiv headingText={object.title} album={object.data} />
    case "artists":
      return hasData(object) && <ScrollerArtits headingText={object.title} artists={object.data} />
    default:
      return null
  }
}