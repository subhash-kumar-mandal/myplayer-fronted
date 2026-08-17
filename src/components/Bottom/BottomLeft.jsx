import React from 'react'
import KYEBAATHAI from '../../assets/kyabaathai.png'
import { useNavigate } from 'react-router-dom'
const BottomLeft = ({ currentPlay }) => {

    const navi = useNavigate()
    return (

        <React.Fragment >

            <div
                className=' h-[56px] rounded-[2px] overflow-hidden  w-[56px]'
            >

                <img src={currentPlay.release.image.url} className='' alt={currentPlay.name} />

            </div>



            <div className='
           leading-5
          '>
                <h2 className='text-[15px] capitalize hover:underline cursor-pointer'
                onClick={()=>{
                    navi('/track/'+currentPlay._id)
                }}
                >
                    {currentPlay.name}
                </h2>
                <p className='text-[12px] text-(--text-secondary)  cursor-pointer'>
                     {
                            currentPlay.artists.map((artist, index) => (
                                <span
                                    onClick={(e) => {
                                        navi(`/artist/${artist._id}`)
                                        e.stopPropagation()
                                    }}
                                    key={artist._id}
                                    className="hover:underline  capitalize cursor-pointer"
                                >
                                    {artist.name}
                                    {index < currentPlay.artists.length - 1 && ", "}
                                </span>
                            ))
                        }
                </p>
            </div>

        </React.Fragment >


    )
}

export default BottomLeft