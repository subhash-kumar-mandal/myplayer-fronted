import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import Hero from '../../components/ArtistRoute/Hero';
import { useSelector } from 'react-redux';
import StickyActionBar from '../../components/ArtistRoute/StickyActionBar';

import SongDiv from '../../components/ArtistRoute/SongDiv';
import OverLayerArtist from '../../components/ArtistRoute/OverLayerHead';

import DotLoader from '../../components/UX/DotLoader'

import ScrollerArtits from '../../components/UserHome/ScrollerArtists';
import ScrollDiv from '../../components/UserHome/ScrollAlbums';
import Footer from '../../components/UX/Footer';
import { apifetch } from '@/services/fetchHandleAll';

const Artist = () => {

  const { id } = useParams();

  const { accessToken } = useSelector(val => val.userContext);
  const val = useSelector(val => val.contextMenu);

  const [scrollTop, setScrollTop] = React.useState(0);


  const [fetchData, setFetchData] = React.useState({
    loading: true,
    artistDT: {},
    songs: [],
    sections: []
  });

  const [error, setError] = React.useState(false)


  React.useEffect(() => {
    const data_fetch = async () => {
      try {

        setFetchData(pre => {
          return {
            ...pre,
            loading: true
          }
        })

        const responce = await apifetch(import.meta.env.VITE_BASE_URL + `/artist/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,

          },
          credentials: 'include'

        })

        if ( !responce.success) throw new Error('Something is wrong')

        const art = responce?.ArtistInfo??{};
        const sections = responce?.sections ?? []
        const song = responce?.Songs ?? []


        setFetchData(p => {
          return {
            ...p,
            artistDT: art,
            songs: song,
            sections: sections
          }
        })



      } catch (err) {
        setError(true)
        console.log(err)
      }
      finally {
        setFetchData(pre => {
          return {
            ...pre,
            loading: false
          }
        })
      }
    };
    data_fetch()

  }, [id])


  if (error) {
    return <div className='flex h-full overflow-hidden bg-(--background-primary) w-full items-center justify-center'>
      <p className='text-4xl'>APi faild ho gya</p>
    </div>
  }



  return fetchData.loading
    ? (<div className='
    h-full 
    w-full 
    bg-(--background-primary) 
    flex 
    justify-center 
    items-center'
    >
      <DotLoader />
    </div>) : (
      <div

        className='h-full overflow-y-auto bg-(--background-primary) spotify-scroll   scrollbar-none'
        onScroll={(e) => setScrollTop(e.target.scrollTop)}
      >
        <OverLayerArtist artist={fetchData.artistDT} scrollTop={scrollTop} />
        <Hero artist={fetchData.artistDT} />


        <div
          className="
        relative 
       "
        >

          <div
            className="absolute  inset-x-0 top-0 h-[250px]"
            style={{
              background: `linear-gradient(
        180deg,
        color-mix(in srgb, ${fetchData.artistDT?.themeColor?.primary} 40%, #121212) 0%,
        color-mix(in srgb, ${fetchData.artistDT?.themeColor?.primary} 10%, #121212) 40%,
        #121212 100%
      )`
            }}
          />

          <StickyActionBar scrollTop={scrollTop} artist={fetchData.artistDT} songs={fetchData.songs} />

        </div>



        <div className='z-20 relative p-5'>
          <h1 className='text-2xl font-bold'>
            Popular
          </h1>


          <SongDiv songs={fetchData.songs} />

        </div>


        {
          fetchData.sections.length > 0 && fetchData.sections.map(val => {
            return RenderAllSection(val)
          })
        }

        <Footer />



      </div>
    )
}

export default Artist



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