import { Pause, Play } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AlbumAdd_Song } from "../../utils/playerSlice";

const OverLayerAlbum = ({ scrollTop, album, songs }) => {

    const isPlaying = useSelector(val => val.player.isPlaying);
    const id = useSelector(val => val.player.releaseId)
    const dispatch = useDispatch()
    const opacity = Math.min(scrollTop / 300, 1);
    const showTitle = scrollTop > 220;
    return (
        <div
            className={`

                 
                 absolute top-0
        
                
        
       
               
                
                z-30
                h-16
                flex
                items-center
                px-6
                transition-all
                duration-300
            
                w-full
                 
            `}
            style={{
                backgroundColor: `color-mix(
    in srgb,
    ${album?.themeColor?.primary} ${opacity * 100}%,
    transparent
  )`
            }}
        >


            {/* ${showTitle ? "opacity-100" : "opacity-0"} */}
            <div
                className={`
                 ${showTitle ? "opacity-100" : "opacity-0"}
                flex items-center gap-3
                duration-300
                transition-opacity
                `}
            >
                <div className="
                h-12 w-12 
                rounded-full 
                bg-green-500 
                flex items-center 
                justify-center cursor-pointer"

                    onClick={(e) => {
                        dispatch(AlbumAdd_Song({ id: album._id, songs: songs }))
                        e.stopPropagation()
                    }}
                >
                    {(id === album._id && isPlaying)
                        ? <Pause className="text-black fill-black" />
                        : <Play className="text-black fill-black" />
                    }
                </div>

                <h2 className="text-3xl font-bold uppercase">
                    {
                        album?.name ? album.name : "loading"
                    }
                </h2>


            </div>

        </div>
    );
};

export default OverLayerAlbum;