import React, { useEffect, useState } from 'react'

import Hero from '../../Shimmers/AlbumPage/Hero'
import Action from '../../Shimmers/PlayListPage/Action'
import Table from '../../Shimmers/PlayListPage/Table'
// import SongCard from '../../Shimmers/PlayListPage/SongCard'
import Footer from "../../components/UX/Footer"

import SongCard from '../../components/PlayListRoute/SongCard'

const PlayList = () => {

    return (
        <div
            className=' h-full overflow-y-auto bg-(--background-primary) spotify-scroll   scrollbar-none'
        >

            <Hero />
            <Action />
            <Table />

            <div
                className='flex flex-col gap-0.5
              mx-3
              mb-10'
            >

                {/* {
                    new Array(6).fill(1).map((val,ind) => <SongCard key={ind}  />)
         } */}
            
            

            </div>

            <Footer />


        </div>
    )

}

export default PlayList