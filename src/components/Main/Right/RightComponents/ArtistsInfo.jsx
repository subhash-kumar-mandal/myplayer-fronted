import { apifetch, URL_OBJECT } from '@/services/fetchHandleAll';
import { isSet_Follow_Artist } from '@/utils/userDateSlice';
import { BadgeCheck } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const ArtistsInfo = ({ currentPlay, artistFollow }) => {
    const { accessToken } = useSelector(val => val.userContext);
    const dispatch = useDispatch()
    const flag = artistFollow.some(val => val._id === currentPlay.artists[0]._id);

    async function folllowTogglefetch(artist) {

        try {

            dispatch(isSet_Follow_Artist(artist))
            const res = await apifetch(URL_OBJECT.BASE_URL + '/user/artist-follow/' + artist._id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const result = res;
            if (!result) throw new Error("something is wrong");
            if (!result.success) throw new Error(result.message);


        } catch (err) {


            toast.message(<div className="flex items-center w-full  px-2  py-2 gap-3">
                <img
                    src={artist?.image?.url}
                    alt=""
                    className="w-10 h-10 rounded-xs object-cover "

                />

                <div className="flex flex-col">
                    <span className="font-semibold capitalize text-white">
                        <span className="text-red-500">error</span>
                        <span> fallback </span>
                    </span>

                    <span className="text-xs capitalize text-(--text-secondary)">
                        {artist?.name}
                    </span>
                </div>
            </div>, {
                closeButton: true,
                position: "bottom-center",
                style: {
                    transform: "translateY(-80px)",
                    background: " #121212",
                    border: "1px solid #ffffff4d",
                    padding: 0,
                    margin: 0
                },
                duration: 4000
            });
            dispatch(isSet_Follow_Artist(artist))

        }

    }


    return (
        <div className='w-full  px-2 overflow-hidden  mt-4 mb-2 '>

            <div className='bg-[#1F1F1F] w-full rounded-[5px] px-3  py-3 flex flex-col gap-4 '>
                <p className='font-bold'>About the Artist</p>
                <div
                    className='w-20 h-20  rounded-full overflow-hidden'
                >
                    <img src={currentPlay.artists[0].image.url} alt=""
                        className='w-full w-full  rounded-full'
                    />
                </div>

                <h2 className=' capitalize font-bold flex items-center gap-1'>
                    {currentPlay.artists[0].name}
                    {
                        currentPlay.artists[0].isVerified &&
                        <BadgeCheck size={25} className='fill-green-300 text-[#1F1F1F]' />
                    }
                </h2>

                <div className='flex items-center justify-between'>
                    <span className='text-(--text-secondary) text-[14px]'>
                        {currentPlay.artists[0].monthlyListeners} monthly listeners
                    </span>
                    {
                        !flag && (
                            <button className=' 
                font-bold
                 px-3
                 text-[14px]
                 hover:scale-[1.05]
                 hover:border-white
                 py-0.5
                 border-[0.5px]
                 border-(--text-secondary) 
                 rounded-2xl
                 cursor-pointer
                 duration-300
                 transition-all
                 '
                 onClick={()=>{
                    folllowTogglefetch( currentPlay.artists[0])
                 }}
                 >
                                follow
                            </button>
                        )
                    }
                </div>

                <div className='text-(--text-secondary) text-[14px]'>
                    {
                        currentPlay.artists[0].bio.length > 80 ? currentPlay.artists[0].bio.slice(0, 80) + ' ...' : currentPlay.artists[0].bio
                    }
                </div>

            </div>


        </div>
    )
}

export default ArtistsInfo