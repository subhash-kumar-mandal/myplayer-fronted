import React from 'react'

const HeadOverLayer = ({ scrollTop }) => {

    const opacity = Math.min(scrollTop / 100, 1);
    const showTitle = scrollTop > 150;
    
    return (
        <div
            className={`
          absolute
        
        left-0
        right-0
        
         
        
               
                top-0
                z-40
                h-16
                
                flex
                items-center
                px-8
                
                transition-all
                duration-300
                 flex gap-2
                w-full`}

            // style={{
            //     backgroundColor: `rgba(150,0.5,0.5,${opacity})`
            // }}
            style={{
                backgroundColor: `rgba(48, 38, 93, ${opacity})`
            }}

        >
            {/* ${showTitle ? "opacity-100" : "opacity-0"} */}



            <button
                className='
                             pr-3 pl-3 pt-1 pb-1
                             text-sm
                               bg-(--background3) rounded-2xl 
                             hover:bg-(--background2)
                             hover:text-(--text)
                             '
            >
                All
            </button>
            <button
                className='
                             pr-3 pl-3 pt-1 pb-1
                             text-sm
                               bg-(--background3) rounded-2xl 
                             hover:bg-(--background2)
                             hover:text-(--text)
                             '
            >
                Music
            </button>

            <button
                className='
                             pr-3 pl-3 pt-1 pb-1
                             text-sm
                               bg-(--background3) rounded-2xl 
                             hover:bg-(--background2)
                             hover:text-(--text)
                             '
            >
                Podcasts
            </button>


        </div>
    )
}

export default HeadOverLayer