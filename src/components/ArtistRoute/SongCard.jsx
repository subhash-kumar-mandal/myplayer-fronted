import { CirclePlus, Ellipsis, Pause, Play } from 'lucide-react'
import React, { useState } from 'react'
import PlayingAnimation from '../UX/PlayingAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { SongAdd } from '@/utils/playerSlice';
import { clearhandleContextMenu, sethandleContextMenu } from '@/utils/contextmenu';

const SongCard = ({
  name,
  indx,
  image,
  listean,
  duration,
  isPlaying,
  currentplay,
  id,
  song
}) => {

  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  const dispatch = useDispatch()
  const val = useSelector(val => val.contextMenu);

  const time = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const [cardHover, setCardHover] = React.useState(false)
  return (
    <div className='
              @container
                w-full
                min-w-0
                h-14

                grid
                grid-cols-[32px_40px_minmax(0,1fr)_auto]
                
                @[500px]:grid-cols-[40px_45px_minmax(0,1fr)_70px_auto]

                @[700px]:grid-cols-[50px_60px_minmax(0,1fr)_100px_120px]

                hover:bg-(--background3)
                py-2
                rounded-[5px]

                transition-all
                duration-300
                cursor-pointer
             '
      onMouseEnter={() => {
        setCardHover(true)
      }}
      onMouseLeave={() => {
        setCardHover(false)
      }}
    >



      <div className=' 
                flex
                justify-center
                items-center
                text-sm'


        onClick={(e) => {
          e.stopPropagation()
          dispatch(SongAdd({ id: song._id, song: song }))
          console.log('row')
        }}

      >



        {
          cardHover
            ? (isPlaying && currentplay?._id === id)
              ? <Pause
                size={18}
                className={`text-white fill-white `}

              />
              : <Play
                size={18}
                className={`text-white fill-white  `}

              />
            : (isPlaying && currentplay?._id === id) ?
              <div className={` transition-opacity duration-300 ${cardHover ? "opacity-0" : "opacity-100"}`}>
                <PlayingAnimation />
              </div> :
              <span
                className={
                  `
                        
                     transition-opacity
                     duration-300
                    ${cardHover ? "opacity-0" : "opacity-100"}
                    `
                }
              >
                {
                  indx + 1
                }
              </span>
        }





      </div>

      <div className=' w-full h-full flex justify-center items-center'>
        <img src={image} className='w-full h-full max-w-[40px] max-h-[40px]      rounded-xs' alt="" />
      </div>
      <div
        className="
                    min-w-0
                    flex
                    items-center
                    pl-2
                    pr-2
                    capitalize
                "
      >
        <span
          className="
                        min-w-0
                        max-w-full
                        truncate
                    "
        >
          {name}
        </span>
      </div>
      {/* Listens */}
      <div
        className="
                    hidden
                    @[500px]:flex
                    justify-center
                    items-center
                    pr-2
                    text-sm
                    text-(--text-secondary)
                "
      >
        {listean}
      </div>

      <div
        className="
                    flex
                    justify-end
                    pr-3
                    items-center
                    gap-3
                    text-(--text-secondary)
                "
      >

        {/* Plus */}
        <CirclePlus
          size={18}
          className={`
                        hidden
                        @[700px]:block
                        ${cardHover ? "opacity-100" : "opacity-0"}
                        hover:scale-[1.08]
                        transition-all
                        duration-300
                    `}
        />


        {/* Time */}
        <div className="text-sm shrink-0">
          {time}
        </div>


        {/* More */}
        <div>
          <Ellipsis
            size={20}
            className={`
                        hidden
                        @[700px]:block
                        ${cardHover ? "opacity-100" : "opacity-0"}
                        hover:scale-[1.08]
                        transition-all
                        duration-300
                    `}


            onClick={(e) => {
              if (val?.open) {
                  dispatch(clearhandleContextMenu())
              }else{
                const rect = e.currentTarget.getBoundingClientRect();
                dispatch(sethandleContextMenu({
                  song:song,
                  x:rect.right-270,
                  y:rect.bottom
                }))
              }
              e.stopPropagation()
            }}

          />
        </div>
      </div>

    </div>
  )
}

export default SongCard