import React from 'react'

const CardPlus = ({
    icon:Icon, heading, text
}) => {
    const [hover, setHover] = React.useState(false)
    return (

        <div
            onMouseLeave={() => setHover(false)}
            onMouseEnter={() => setHover(true)}
            className='h-[64px] rounded-[4px]
                                     flex 
                                     items-center
                                     px-2
                                     gap-2
                                    transition-colors
                                    duration-500
                                    cursor-pointer
                                    hover:bg-[#3E3E3E]
                                    '
        >

            <Icon className={`
                                       bg-[#525252] h-12 w-12 rounded-full 

                                       transition-all

                                       duration-500
                                        ${hover ?
                    " rotate-6 p-[9px]  text-green-400"
                    : " p-2.5"
                }
                                       `} />


            <div>
                <p
                    className='font-bold'
                >
                    {
                        heading
                }
                </p>
                <p
                    className='
                                        text-[14px]
                                        text-(--text-secondary)
                                        '
                > {text}</p>
            </div>

        </div>
    )
}

export default CardPlus