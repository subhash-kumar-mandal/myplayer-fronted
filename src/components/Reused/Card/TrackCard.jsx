
import { Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TrackCard = ({ track, token }) => {

    const navi = useNavigate()

    const playHomeHandle = async () => {
       
    }

    return (
        <div className="group relative h-full w-[178px] rounded-[5px] cursor-pointer"

            onClick={() => {
                navi(`/track/${track._id}`)
            }}
        >

            {/* Background */}
            <div
                className="
          absolute
          inset-0
          rounded-[5px]
          bg-(--bg-hover1)
          scale-90
          opacity-0
          transition-all
          duration-300
          group-hover:scale-100
          group-hover:opacity-100
        "
            />

            <div
                className="
                      shadow-[0_12px_330px_rgba(0,0,0,0.45)]
            absolute
            right-4
            bottom-18
            flex
            justify-center
            items-center
            opacity-0
            z-20
            bg-(--spotify-green)
            h-12
            w-12
            rounded-full
            scale-80
            translate-y-4
    
            transition-all
            
            hover:bg-[#3AE176]
            hover:scale-[1.04]
            cursor-pointer
            group-hover:scale-100
            group-hover:opacity-100
            group-hover:translate-y-0
            "

            onClick={(e)=>{
                console.log('click')
                e.stopPropagation()
                playHomeHandle()
            }}
            >
                <Play color="#000000" size={20} className='fill-black ' />
            </div>

            {/* Content */}
            <div
                className="
          relative
          z-10
          p-3
          flex
          flex-col
          gap-3
          
        "
            >
                <div className="h-[153.725px] w-[153.725px]  rounded-[5px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,.35c)]">
                    <img src={track.release.image.url} className='w-full h-full object-cover' alt="" />
                </div>

                <div className="flex flex-col">
                    <p className="text-[16px] hover:underline capitalize cursor-pointer"
                        onClick={(e) => {
                            navi(`/track/${track._id}`)
                            e.stopPropagation()
                        }}
                    >
                        {
                            track.name.length > 15 ? track.name.slice(0, 14) + "..." : track.name
                        }
                    </p>

                    <p className="text-[14px] text-(--text-secondary) ">

                        {
                            track.artists.map((artist, index) => (
                                <span
                                    onClick={(e) => {
                                        navi(`/artist/${artist._id}`)
                                        e.stopPropagation()
                                    }}
                                    key={artist._id}
                                    className="hover:underline  capitalize cursor-pointer"
                                >
                                    {artist.name}
                                    {index < track.artists.length - 1 && ", "}
                                </span>
                            ))
                        }

                    </p>
                </div>
            </div>

        </div>
    )
}

export default TrackCard