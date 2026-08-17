import React from 'react'
import PropTypes from 'prop-types'
import { Play } from 'lucide-react'
import ReusedLoaderShimmer from '../Globalloaders/ReusedLoaderShimmer'

const QuickAccessCard = () => {

    const [seeHover, setSeeHover] = React.useState(false)
    return (

        <div className="  w-full h-[48px] 
                     relative bg-(--background1) items-center
                       gap-2 
                      flex 
                      overflow-hidden
                       rounded-[5px]
                       hover:bg-(--background3)
                       transition-colors
                       duration-200
                       cursor-pointer
                       pr-2
                     "

            onMouseEnter={() => {

                setSeeHover(true)
            }}
            onMouseLeave={() => {

                setSeeHover(false)

            }}

        >

            


            <ReusedLoaderShimmer

                className="h-[48px] shrink-0 w-[48px]"
                alt=""
            />

            <ReusedLoaderShimmer className='rounded-xs h-6 w-full font-semibold' />



        </div>
    )
}

QuickAccessCard.propTypes = {}

export default QuickAccessCard