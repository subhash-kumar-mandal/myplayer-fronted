import React, { useEffect, useState } from 'react'
import Loader from "../../Shimmers/AlbumPage/Loader"

import Footer from '../../components/UX/Footer'
import OverLayerAlbum from '@/components/AlbumRoute/OverLayerAlbum'
import Hero from '@/components/AlbumRoute/Hero'
import StickyActionBar from '@/components/AlbumRoute/StickyActionBar'
import StickyTableHeader from '../../components/AlbumRoute/StickyTableHeader'
import SongSection from '@/components/AlbumRoute/SongSection'

import ScrollDiv from '../../components/AlbumRoute/ScrollDivHori/ScrollDiv'

import { useParams } from 'react-router-dom'

import { AlbumMap } from '../../services/CacheAPI'
import Label from '../../components/AlbumRoute/Label'
import { useSelector } from 'react-redux'
import { apifetch, URL_OBJECT } from '../../services/fetchHandleAll'

const Album = () => {

  const { accessToken } = useSelector(val => val.userContext);
  const val = useSelector(val => val.contextMenu);
  

  const { id } = useParams()

  const [scrollTop, setScrollTop] = useState(0)

  const [loading, setLoading] = useState(true)
  const [fetchSongs, setFetchSongs] = useState([]);
  const [objectalbum, setObjectAlbum] = useState({});
  const [suggeation, setSuggection] = React.useState([]);
  const [error, setError] = useState(false)
  const ScrolControll = React.useRef(null)



  useEffect(() => {

    async function fetchAlbum() {
      setLoading(true)
      try {

        ScrolControll.current?.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        if (AlbumMap.has(id)) {
          const cacheFind = AlbumMap.get(id);
         
          setObjectAlbum(cacheFind.album);
          setFetchSongs(cacheFind.songs);
          setSuggection(cacheFind.sugg);
          setLoading(false)
          setScrollTop(0)
          return
        }

        const res = await apifetch(URL_OBJECT.BASE_URL+`/album/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,

          },
          credentials: 'include'

        });

        if (!res) throw new Error(res.message);

        if (!res.success) throw new Error(res.message);


        const sugg = res.SuggeationAlbum;
        const album = res.Album;
        const songsAlbum = res.songs;
        setObjectAlbum(album);
        setFetchSongs(songsAlbum);
        setSuggection(sugg)
        setScrollTop(0)
        AlbumMap.set(id, { album: album, songs: songsAlbum, sugg: sugg });

      } catch (e) {
        setError(true)
        console.error(e);

      } finally {
        setLoading(false)
      }



    }

    fetchAlbum()

  }, [id])



  if (error) {
    return <div className='flex h-full overflow-hidden bg-(--background-primary) w-full items-center justify-center'>
      <p className='text-4xl'>APi faild ho gya</p>
    </div>
  }



  return loading ? <Loader /> :
    (
      <div
        ref={ScrolControll}
        className={
          `h-full 
           overflow-hidden 
           bg-(--background-primary) 
           spotify-scroll     
           scrollbar-none
           ${val.open
            ? ''
            : 'overflow-y-scroll'
          }
           `
        }

        onScroll={(e) => {
          setScrollTop(e.target.scrollTop);
        }}
      >

        <OverLayerAlbum scrollTop={scrollTop} album={objectalbum} songs={fetchSongs} />
        <Hero album={objectalbum} />

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
        color-mix(in srgb, ${objectalbum?.themeColor?.primary} 40%, #121212) 0%,
        color-mix(in srgb, ${objectalbum?.themeColor?.primary} 10%, #121212) 40%,
        #121212 100%
      )`
            }}
          />

          <StickyActionBar songs={fetchSongs} album={objectalbum} />

        </div>

        <StickyTableHeader scrollTop={scrollTop} scroll={scrollTop} />

        <SongSection songs={fetchSongs} />



        <Label album={objectalbum} />

        <ScrollDiv album={suggeation} artist={objectalbum} />






        <Footer />







      </div>

    )
}

export default Album