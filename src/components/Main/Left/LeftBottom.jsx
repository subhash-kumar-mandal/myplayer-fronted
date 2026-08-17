import React, { useState } from 'react'
import { Menu, Search } from 'lucide-react'

import AlbumCardLeft from './AlbumCardLeft'
import ArtistCardLeft from './ArtistCardLeft'
import { useNavigate } from 'react-router-dom'


import ArtistCardBigLeft from './ArtistCardBigLeft'
import AlbumCardBigLeft from './AlbumCardBigLeft'

const LeftBottom = ({ left, albums, artists }) => {

    const navi = useNavigate()
    const [search, setSearch] = useState(false);

    return (
        //     yadi Isleftclose ho jye tab

        <React.Fragment >

            {left === 'small' && <div className='pr-[4px] pl-[4px] pb-[4px] '>




                {
                    albums.map(val => {
                        return <div key={val._id} className=' hover:bg-(--background1) rounded-[4px] overflow-hidden'
                            onClick={() => {
                                navi(`/album/${val._id}`)
                            }}
                        >
                            <img src={val.image.url}
                                className='h-[64px] w-[64px] p-2 rounded-[12px] '
                                alt="" />
                        </div>
                    })
                }

                {
                    artists.map(val => {
                        return <div key={val._id} className=' hover:bg-(--background1) rounded-[8px]'>
                            <img src={val.image.url}
                                className='h-[64px] w-[64px] p-2 rounded-full '
                                alt="" />
                        </div>
                    })
                }

            </div>
            }


            <div
                className='pr-2 pl-2 pb-2'
            >

                {
                    (left === 'middle' || left === 'big') && (
                        <div
                            className='h-[34px]  flex items-center px-3 mb-2 justify-between

                     
                    '
                        >

                            <Search size={26} className='
                        p-1 rounded-full 
                        
                        hover:bg-(--background1)
                        ' />

                            <div className='flex gap-1 items-center
                        
                        text-(--text-secondary)
                        hover:text-(--text-primary)
                         hover:scale-104 
                           
                         transition-all
                         duration-200

                        '>
                                <p
                                    className='
                        text-[14px]
                        '
                                >
                                    Recents
                                </p>
                                <Menu size={20} className='' />
                            </div>

                        </div>


                    )
                }


                {left === "middle" && (<div className='overflow-hidden overflow-y-scroll h-[400px] scrollbar-none scroll-smooth '>



                    {/*  Render here full card left side  */}

                    {
                        albums.map(val => {

                            return <React.Fragment key={val._id} >
                                {
                                    <AlbumCardLeft key={val._id} data={val} image={val.image.url} />
                                }
                            </React.Fragment>
                        })
                    }

                    {
                        artists.map(val => {

                            return <React.Fragment key={val._id} >
                                {
                                    <ArtistCardLeft key={val._id} val={val} image={val.image.url} />
                                }
                            </React.Fragment>
                        })
                    }

                </div>)

                }

                {left === 'big' && (<div className={
                    `overflow-hidden 
                overflow-y-scroll 
                h-[400px] scrollbar-none 
                scroll-smooth
                flex flex-wrap
                `}>

                    {
                        left === 'big' && albums.map(val => {
                            return <AlbumCardBigLeft key={val._id} info={val} />
                        })
                    }


                    {
                        left === 'big' && artists.map(val => {
                            return <ArtistCardBigLeft key={val._id} object={val} />
                        })
                    }

                </div>
                )
                }

            </div>




        </React.Fragment>

    )
}

export default LeftBottom










