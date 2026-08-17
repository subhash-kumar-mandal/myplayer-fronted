import { useState } from 'react'
import { CirclePlus, Ellipse, Ellipsis, Play, Plus } from "lucide-react"
const SongCard = () => {

    const [hover, setHover] = useState(false)

    return (

        <div

            onMouseEnter={() => {
                setHover(true)
            }}
            onMouseLeave={() => {
                setHover(false)
            }}

            className='
                grid
                grid-cols-[40px_1fr_140px_170px_150px]
                h-14
                items-center
                w-full
                gap-5
                px-4
              hover:bg-[#1f1f1f] 
                rounded-[5px]
                cursor-pointer
                '
        >


            <div className='
                flex justify-center items-center'>
                1
            </div>


            <div
                className='
                    flex 
                    gap-4
                    items-center
                    '
            >
                <div className='
                        bg-red-100
                          h-11 w-11
                          rounded-[5px]
                          overflow-hidden
                '>

                </div>

                <div className='
                flex flex-col justify-center
                          leading-[20px]
                          h-10 
                        '>

                    <p className='
                            text-[17px]
                            '>
                        dhu
                    </p>
                    <p
                        className='
                            text-[14px]
                            '
                    >
                        hardday sandhu
                    </p>

                </div>



            </div>



            <div
                className='text-(--text-secondary) text-[14px] flex items-center '
            >
                Gal gaal
            </div>

            <div
                className='text-(--text-secondary) text-[14px] flex items-center '
            >
                2 Weeks ago
            </div>




            <div className="flex items-center gap-3  justify-around ">

                <CirclePlus size={16} className={`
                 shrink-0 text-(--text-secondary) 
                 hover:text-white
                   hover:scale-[1.2]
                   transition-all
                     duration-300
                    ${hover ? "opacity-100" : "opacity-0"}
                `} />
                <div className="flex items-center justify-around gap-4 ">


                    <p
                        className="text-[14px] text-(--text-secondary)"
                    >

                       5:00  
                    </p>
                    <Ellipsis size={16} className=
                        {`
                      shrink-0 text-(--text-secondary) 
                      transition-all
                     duration-300
                     hover:text-white
                     hover:scale-[1.3]
                    ${hover ? "opacity-100" : "opacity-0"}
                `} />
                </div>
            </div>






        </div>
    )
}

export default SongCard