import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react'
import CardCricle from './CardCricle';
import ReusedLoaderShimmer from './ReusedLoaderShimmer';


const ScrollArtist = ({ CardsNum }) => {

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
            className='px-2 -mt-4 space-y-10   flex '
        >

            {/*  heading */}

            <div
                className='
   flex-1 h-82 overflow-hidden
   
   '
            >

                <div className='
    w-full  
    flex 
    justify-between
    px-8
    items-center
    
    '>
                    <ReusedLoaderShimmer
                        className='
                   
                    h-10 w-50 
                    rounded-xs
                   
                    '/>



                    <ReusedLoaderShimmer className='
                    
                    cursor-pointer
                    
                    h-6 w-30
                    rounded-xs
                    '/>




                </div>



                <div
                    className='overflow-hidden relative mt-2 '

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

                            // const el = scrollRef.current;


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


                        {/*  card */}


                        {
                            new Array(CardsNum).fill(8).map((num, index) => {
                                return <CardCricle key={`${num}-${index}`} />
                            })
                        }

                    </div>


                </div>



            </div>



        </div>
    )
}

export default ScrollArtist