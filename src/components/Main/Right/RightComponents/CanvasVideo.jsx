import React from 'react'

const CanvasVideo = ({ url ,isPlaying }) => {

    const VideoRef = React.useRef(null);



    if (!url) return null
    
    React.useEffect(()=>{
         
        if(!VideoRef.current) return;

        if(isPlaying){
            VideoRef.current.play();
        }else{
            VideoRef.current.pause()
        }

    },[isPlaying])

    return (
        <div className="w-full   overflow-hidden">

            <div className="
                w-full
                aspect-9/16
                rounded-[3px]
                overflow-hidden
                bg-black
            ">

                <video
 
                      ref={VideoRef}

                    src={url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="
                        h-full
                        w-full
                        object-cover
                        opacity-50
                        hover:opacity-105
                        transition-opacity
                        duration-500
                        cursor-pointer
                    "
                />

            </div>

        </div>
    )
}

export default CanvasVideo