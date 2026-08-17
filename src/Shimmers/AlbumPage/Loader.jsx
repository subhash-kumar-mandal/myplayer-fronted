import React from 'react'
import Hero from './Hero'
import Action from './Action'
import Card from './Card'
import Table from './Table'
import Footer from '../../components/UX/Footer'
import ScrollLoader from './ScrollLoader'

const Loader = () => {
    return (
        <div
        className='h-full overflow-y-auto bg-(--background-primary) spotify-scroll   scrollbar-none'
        >

            <Hero />
            <Action />
            <Table />
            <div className='flex flex-col gap-0.5
              mx-3
              mb-10'>
                {
                    new Array(6).fill(1).map((val,ind) => <Card key={ind}  />)
                }
            </div>

           <ScrollLoader heading={"artsits"} CardsNum={8} />

            <Footer />
        </div>
    )
}

export default Loader