import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'
import BackToJumpCard from './BackToJumpCard';
import { useSelector } from 'react-redux';

const BackToJump = ({ headingText, tracks }) => {

    const {releaseId ,isPlaying} = useSelector(val => val.player);
    
    const scrollRef = React.useRef(null)

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
            className='
         h-[340px]
         flex-1
         overflow-hidden
        '>


            <div className='w-full h-[48px] flex justify-between px-3 '>
                <p className='text-[22px] font-bold flex items-end'>
                    {
                        headingText
                    }
                </p>
                <div className='flex gap-3 items-baseline-last text-xs font-bold text-(--text-secondary)  hover:underline cursor-pointer'>
                    Show All

                </div>
            </div>



            <div className=' overflow-hidden relative '

                onMouseEnter={() => {
                    setHoverLeft(true);
                    setHoverRight(true);
                }}
                onMouseLeave={() => {
                    setHoverLeft(false);
                    setHoverRight(false);
                }}
            >
                <div className="absolute -left-1 z-30 top-0 h-full w-16 bg-gradient-to-r from-[#121212]/80 to-transparent pointer-events-none" />

                <div className="absolute -right-1 z-30 top-0 h-full w-16 bg-gradient-to-l from-[#121212]/80 to-transparent pointer-events-none" />
                <button
                    className='  flex  justify-center items-center absolute bottom-[45%] z-20 h-8 w-8 bg-(--bg-hover1)  rounded-full
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
                    <ChevronLeft />
                </button>
                <button
                    className=' absolute flex justify-center items-center right-0 bottom-[45%] z-20 h-8 w-8  bg-(--bg-hover1)  rounded-full
                    hover:scale-[1.09]
                                cursor-pointer
                                transition-all
                                duration-300
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

                <div className='h-full flex   flex-nowrap overflow-hidden overflow-x-scroll  scrollbar-none  '
                    ref={scrollRef}
                    onScroll={handleScroll}
                >





                    {/* cards */}






                    {
                        tracks.map((val, index) => <BackToJumpCard
                            key={`${val._id}-${index}`}
                            val={val}
                            releaseId={releaseId}
                            isPlaying={isPlaying}
                            
                        />)
                    }








                </div>

            </div>




        </div>
    )
}

export default BackToJump