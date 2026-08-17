import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react'

import ArtistCard from './ArtistCard';
import { useSelector } from 'react-redux';
const ScrollerArtits = ({  artists ,headingText }) => {

    const { isPlaying,releaseId } = useSelector(val => val.player)
    const [loader,setLoader]= React.useState(false)
    const { accessToken } = useSelector(val => val.userContext);
    const scrollRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [hoverLeft, setHoverLeft] = React.useState(false);


    const [canScrollRight, setCanScrollRight] = React.useState(true);
    const [hoverRight, setHoverRight] = React.useState(false);


    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        setCanScrollLeft(el.scrollLeft > 0);

        setCanScrollRight(
            el.scrollLeft + el.clientWidth < el.scrollWidth - 1
        );
    };


    return (
        <div
            className='px-2 -mt-10 space-y-10   flex'
        >

            {/*  heading */}

            <div
                className='
   flex-1 h-82 overflow-hidden
   '
            >

                <div className='
    w-full h-12 
    flex 
    justify-between
    px-8
    '>
                    <p
                        className='
                    text-[22px] 
                    font-bold 
                    flex 
                    items-end
                    '>
                        {
                            headingText
                        }
                    </p>

                    <div className='
                    flex 
                    gap-3 
                    items-baseline-last 
                    text-xs 
                    font-bold 
                    text-(--text-secondary)  
                    hover:underline 
                    cursor-pointer'>
                        Show All

                    </div>

                </div>



                <div
                    className='overflow-hidden relative '

                    onMouseEnter={() => {
                        setHoverLeft(true);
                        setHoverRight(true);
                    }}
                    onMouseLeave={() => {
                        setHoverLeft(false);
                        setHoverRight(false);
                    }}
                >
                    {/* left side se dark */}
                    <div className="absolute -left-1 z-30 top-0 h-full w-16 bg-gradient-to-r from-[#121212]/80 to-transparent pointer-events-none" />

                    {/* left side se dark */}
                    <div className="absolute -right-1 z-30 top-0 h-full w-16 bg-gradient-to-l from-[#121212]/80 to-transparent pointer-events-none" />


                    {/*  scroll handle buttons */}

                    <button
                        className='  flex  justify-center left-3 items-center absolute bottom-[45%] z-50 h-8 w-8 bg-(--bg-hover1)  rounded-full
                                 hover:scale-[1.09]
                                cursor-pointer
                                transition-all
                                duration-300
                                '
                        style={{
                            opacity: (canScrollLeft && hoverLeft) ? 1 : 0,
                            transform: (canScrollLeft && hoverLeft) ? "translate(0px,0px)" : "translate(0px,20px)"
                        }}
                        onClick={() => {
                            scrollRef.current.scrollBy({
                                left: -scrollRef.current.clientWidth * 0.8,
                                behavior: "smooth"
                            });

                           


                        }}
                    >
                        <ChevronLeft className='text-(--background4)' />
                    </button>




                    <button
                        className=' absolute flex justify-center items-center right-3 bottom-[45%] z-50 h-8 w-8  bg-(--bg-hover1)  rounded-full transition-all
                                duration-300
                                hover:scale-[1.09]
                                cursor-pointer
                                '

                        style={{
                            opacity: (canScrollRight && hoverRight) ? 1 : 0,
                            transform: (canScrollRight && hoverRight) ? "translate(0px,0px)" : "translate(0px,20px)"
                        }}

                        onClick={() => {
                            scrollRef.current.scrollBy({
                                left: scrollRef.current.clientWidth * 0.8,
                                behavior: "smooth"
                            });


                        }}
                    >
                        <ChevronRight className='text-(--background4)' />
                    </button>





                    <div className='h-full flex pl-5   flex-nowrap overflow-hidden overflow-x-scroll scrollbar-none   '
                        ref={scrollRef}
                        onScroll={handleScroll}


                    >


                        {
                            artists.map((val, index) => <ArtistCard 
                            object={val} 
                            key={val._id} 
                            isPlaying={isPlaying}
                            releaseId={releaseId}
                            setLoader={setLoader}
                            loader={loader}
                            accessToken={accessToken}
                            />)
                        }

                    </div>


                </div>



            </div>



        </div>
    )
}

export default ScrollerArtits