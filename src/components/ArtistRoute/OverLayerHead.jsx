import { Pause, Play } from "lucide-react";

const OverLayerArtist = ({ scrollTop, artist }) => {


    const opacity = Math.min(scrollTop / 300, 1);
    const showTitle = scrollTop > 230;
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
    ${artist?.themeColor?.primary} ${opacity * 100}%,
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
                    }}
                >

                    <Play className="text-black fill-black" />

                </div>

                <h2 className="text-3xl font-bold uppercase">
                    {
                        artist?.name ? artist.name : "loading"
                    }
                </h2>


            </div>

        </div>
    );
};

export default OverLayerArtist;