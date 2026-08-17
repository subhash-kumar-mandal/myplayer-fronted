import React from 'react'
import { useNavigate } from "react-router-dom";
import { Pause, Play } from 'lucide-react'
import { apifetch, URL_OBJECT } from '@/services/fetchHandleAll';
import { useDispatch } from 'react-redux';
import { AlbumAdd_Song, isPlaytoggle } from '@/utils/playerSlice';
import { motion } from 'motion/react'

const ArtistCard = ({ object, isPlaying, releaseId, loader, setLoader, accessToken }) => {

    const navi = useNavigate()

    const dispatch = useDispatch()

    async function fetchArtistsSongs() {




        if (loader) return;
        setLoader(true)
        try {
            const res = await apifetch(URL_OBJECT.BASE_URL + '/artist/home/' + object._id, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (!res) throw new Error("Something is wrong");

            if (!res.success) throw new Error(res.message);

            console.log(res)
            const artist = res?.ArtistInfo ?? {};
            const songs = res?.songs ?? [];

            dispatch(AlbumAdd_Song({ id: artist._id, songs: songs }))


        } catch (err) {
            console.log(err)
        } finally {

            setLoader(false)


        }
    }
    return (
        <div className="group relative h-[231px] w-[178px] rounded-[5px] cursor-pointer"
            onClick={(e) => {
                navi(`/artist/${object._id}`)
                e.stopPropagation()
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

            <motion.button

                disabled={loader}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.08, background: '#05df72' }}

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
            scale-100
            translate-y-4
    
            hover:bg-[#3AE176]
            cursor-pointer
            group-hover:opacity-100
            group-hover:translate-y-0
            "

                onClick={(e) => {
                    e.stopPropagation()
                    if (releaseId === object._id) {
                        dispatch(isPlaytoggle())
                        return;
                    }


                    fetchArtistsSongs()

                }}

            >
                {
                    (isPlaying && releaseId === object._id)
                        ? <Pause color="#000000" size={20} className='fill-black ' />
                        : <Play color="#000000" size={20} className='fill-black ' />
                }
            </motion.button>

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
                    <img src={object.image.url} className='w-full h-full object-cover' alt="" />
                </div>

                <div className="flex flex-col">
                    <p className="text-[16px]  capitalize hover:underline cursor-pointer"
                        style={{
                            color: (releaseId === object._id) ? "#3AE176" : ''
                        }}
                    >
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