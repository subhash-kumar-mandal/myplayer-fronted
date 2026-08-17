import { apifetch, URL_OBJECT } from '@/services/fetchHandleAll'
import { AlbumAdd_Song, isPlaytoggle } from '@/utils/playerSlice'
import { Pause, Play } from 'lucide-react'
import { motion } from 'motion/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AlbumCard = ({ info, accessToken, setClickLoader, clickLoader, releaseId, isPlaying }) => {

    const navi = useNavigate()
    const dispatch = useDispatch()


    // console.log(currentSongPlay?._id,info._id)

    async function fetchsongs() {




        if (clickLoader) return;
        setClickLoader(true)
        try {
            const res = await apifetch(URL_OBJECT.BASE_URL + '/album/home/' + info._id, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (!res) throw new Error("Something is wrong");

            if (!res.success) throw new Error(res.message);

            const album = res?.Album ?? {};
            const songs = res?.songs ?? [];
            console.log(album)
            console.log(info)

            dispatch(AlbumAdd_Song({ id: info._id, songs: songs }))


        } catch (err) {
            console.log(err)
        } finally {

            setClickLoader(false)


        }
    }

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

            <motion.button
                disabled={clickLoader}
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
            z-30
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
                    if (releaseId === info._id) {
                        dispatch(isPlaytoggle());
                        return;
                    }

                    fetchsongs()

                }}
            >
                {
                    (isPlaying && releaseId === info._id)
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
                <div className="h-[153.725px] w-[153.725px]  rounded-[5px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,.35c)]">
                    <img src={info.image.url} className='w-full h-full object-cover' alt="" />
                </div>

                <div className="flex flex-col">
                    <p className="text-[16px] hover:underline capitalize cursor-pointer"
                        onClick={(e) => {
                            navi(`/album/${info._id}`)
                            e.stopPropagation()
                        }}
                        style={{
                            color: ( releaseId === info._id) ? "#3AE176" : ''
                        }}
                    >
                        {
                            info.name.length > 15 ? info.name.slice(0, 14) + "..." : info.name
                        }
                    </p>

                    <p className="text-[14px] text-(--text-secondary) ">

                        {
                            info.artists.map((artist, index) => {

                                return <span
                                    onClick={(e) => {
                                        navi(`/artist/${artist._id}`)
                                        e.stopPropagation()
                                    }}
                                    key={artist._id}
                                    className="hover:underline  capitalize cursor-pointer"
                                >
                                    {artist.name}
                                    {index < info.artists.length - 1 && ", "}
                                </span>
                            })
                        }

                    </p>
                </div>
            </div>

        </div>
    )
}

export default AlbumCard