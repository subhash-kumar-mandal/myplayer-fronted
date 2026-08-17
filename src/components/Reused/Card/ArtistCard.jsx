import React from 'react'
import { Play } from 'lucide-react'
const ArtistCard = ({object}) => {
    
  return (
    <div className="group relative h-[231px] w-[178px] rounded-[5px] cursor-pointer">

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
                <div className="h-[153.725px] w-[153.725px]  rounded-full overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,.35c)]">
                    <img src={object.image.url} className='object-cove h-full w-full' alt="" />
                </div>

                <div className="flex flex-col">
                    <p className="text-[16px]  capitalize hover:underline cursor-pointer">
                        {
                            object.name
                        }
                    </p>

                    <p className="text-[14px] text-(--text-secondary) hover:underline cursor-pointer">
                        Artist
                    </p>
                </div>
            </div>

        </div>
  )
}

export default ArtistCard