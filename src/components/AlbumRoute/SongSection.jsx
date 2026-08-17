
import { useSelector } from "react-redux"
import SongCard from "./SongCard"

const SongSection = ({ songs }) => {
    const { isPlaying,currentSongPlay } =useSelector(val=>val.player);
    return (

        <div
            className="px-3
            flex flex-col gap-0.5
      mx-3
      mb-10
       relative
      
      z-20
      "
        >

            {
                songs.map((val, index) => {

                    return <SongCard
                        key={val._id}
                        id={val._id}
                        number={index}
                        name={val.name}
                        image={val.release.image.url}
                        length={val.duration}
                        release={val.release}
                        artists={val.artists}
                        songs={songs}
                        song={val}
                        isPlaying={isPlaying}
                        currentSongPlay={currentSongPlay}

                    />
                })
            }

        </div>
    )
}

export default SongSection