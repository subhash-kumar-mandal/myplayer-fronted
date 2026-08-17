import { Pause, Play } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AlbumAdd_Song } from '../../../utils/playerSlice'

const Card = ({ info,releaseId,isPlaying }) => {

    const navi = useNavigate()
    const dispatch = useDispatch();
    const date = info.releaseDate || new Date().toISOString();

    

    const dateReal = new Date(date).getFullYear()
    
    return (
        <div className="group relative h-full w-[178px] rounded-[5px] cursor-pointer"

            onClick={() => {
                navi(`/album/${info._id}`)
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
             e.stopPropagation()
             dispatch(AlbumAdd_Song({ id: info._id, songs: [] }))
            }}
            >
                
                {(releaseId === info._id && isPlaying)
                        ? <Pause className="text-black fill-black" />
                        : <Play className="text-black fill-black" />
                    }
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
                <div className="h-[153.725px] w-[153.725px] bg-amber-100 rounded-[5px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,.35c)]">
                    <img src={info.image.url} alt="" />
                </div>

                <div className="flex flex-col">
                    <p className="text-[16px] hover:underline capitalize cursor-pointer"
                        onClick={(e) => {
                            navi(`/album/${info._id}`)
                            e.stopPropagation()
                        }}
                    >
                         {
                            info.name.length > 15 ? info.name.slice(0, 14) + "..." : info.name
                        } 
                        
                    </p>

                    <p className="text-[14px] text-(--text-secondary) font-medium ">

                        
                        {
                            dateReal
                        }

                    </p>
                </div>
            </div>

        </div>
    )
}

export default Card