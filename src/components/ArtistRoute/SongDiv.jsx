import React from 'react'
import SongCard from './SongCard'
import { useSelector } from 'react-redux';
const SongDiv = ({ songs }) => {

  const {currentSongPlay,isPlaying} = useSelector(val => val.player);

  return (
    <div className=' 
            @container
                w-full
                min-w-0
                px-3
                flex
                flex-col
                gap-0.5
                pt-4
                mb-10
                relative
                z-20'>

      {
        songs.map((val, _) => {

          return <SongCard key={val._id}

            name={val.name}
            indx={_}
            id={val._id}
            image={val.release.image.url}
            listean={val.playCount}
            duration={val.duration}
            isPlaying={isPlaying}
            currentplay={currentSongPlay}
            song={val}
          />
        })
      }
    </div>
  )
}

export default SongDiv