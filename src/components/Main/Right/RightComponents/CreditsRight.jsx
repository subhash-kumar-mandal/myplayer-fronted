import { apifetch, URL_OBJECT } from '@/services/fetchHandleAll';
import { isSet_Follow_Artist } from '@/utils/userDateSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CreditsRight = ({ currentPlay, artistFollow }) => {

    const dispatch = useDispatch();
    
    const { accessToken } = useSelector(val => val.userContext);




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



            <div className='bg-[#1F1F1F] h-full w-full rounded-[5px] py-2   flex flex-col gap-1 '>

                <div className='flex justify-between px-3 mt-2 items-center   font-bold capitalize'>
                    <h1>
                        credits
                    </h1>
                    <p className='text-[13px] hover:underline cursor-pointer text-(--text-secondary)'>
                        show all
                    </p>
                </div>
                {
                    currentPlay.artists.map((artist, index) => {

                        const flag = artistFollow.some(val => val._id === artist._id);
                        return <div key={artist._id} className=' px-2 rounded-[4px] h-14 flex items-center justify-between
                        hover:bg-[#3F3F3F]
                        cursor-pointer
                        '
                            onClick={(e) => {
                                e.stopPropagation();
                                folllowTogglefetch(artist)
                            }}
                        >

                            <div className='flex flex-col'>
                                <h2 className='font-medium capitalize'>
                                    {
                                        artist.name.length > 15 ? artist.name.slice(0, 13) + ' ...' : artist.name
                                    }
                                </h2>
                                <p className='text-[14px] text-(--text-secondary)'>
                                    Main Artist
                                </p>
                            </div>
                            {
                                !flag &&
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

                 '>
                                    follow
                                </button>
                            }
                        </div>
                    })
                }

            </div>





        </div>
    )
}

export default CreditsRight