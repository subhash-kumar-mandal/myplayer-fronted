import React, { useState } from 'react'
import LogoutHome from '../pages/logout/logoutHome'
import { Outlet, useNavigate } from 'react-router-dom'

import { motion } from 'motion/react'
import { PlusIcon, Blend, Folder } from 'lucide-react'
import MusicIcon from '../components/UX/MusicIcon'
import CardPlus from '../components/Logout/Reused/CardPlus'
import { useDispatch } from 'react-redux'
import { setUserObject } from '../utils/userSlice'
const PlusObject = [
  {
    id: 0,
    icon: MusicIcon,
    heading: "playlist",
    text: "create a playlist with songs or episodes"
  },
  {
    id: 1,
    icon: Blend,
    heading: "Blend",
    text: "combine your friends' tastes into a playlist"
  },
  {
    id: 3,
    icon: Folder,
    heading: "Folder",
    text: "Organise your playlists"
  }
]

const LogoutLayout = () => {
   
  
  const navi = useNavigate()

  const [Click, setClick] = useState(false);




  return (
    <div
      className='
    flex flex-col w-screen
    h-screen
    '
    >
      <div
        className='h-[64px]  w-full '
      >
        NavBar
      </div>



      <div
        className='flex px-2  overflow-hidden gap-2 h-[calc(100vh-64px-88px)] text-white'
      >
        <div
          className='h-full  
        bg-(--background-primary) 
        rounded-sm
        w-[280px]
        '

        >


          <div className={` flex justify-between  relative items-center pl-[16px] pr-[16px] pt-[16px] pb-[8px]
                       
                                `}>

            <div className={`
                                  absolute  bg-[#282828] 
                                  h-52 
                                  flex
                                  gap-1
                                  flex-col
                                  w-91 
                                  bottom-0 
                                  top-14 
                                  p-1 
                                  -right-78 
                                  z-10
                                  rounded-sm
                                  duration-500
                                  transition-all
                                  ${Click ? " visible translate-y-0 opacity-100 scale-100 " : " translate-y-5 invisible opacity-0 scale-98"}
                                  `}>



              {
                PlusObject.map(val => (
                  <CardPlus key={val.id} icon={val.icon} heading={val.heading} text={val.text} />
                ))
              }



            </div>

            <div className='text-[16px] font-bold
                   
                    '


            >  Your Library</div>







            <PlusIcon
              onClick={() => setClick(!Click)}
              className={`
            
                             text-(--text-secondary)
                             h-8 w-8 bg-(--background1) 
                             rounded-full p-1 
                            hover:bg-(--background3)
                             hover:text-(--text)
                            transition-all
                            duration-300
                            cursor-pointer

                            ${Click ?
                  " rotate-45  text-green-400"
                  : ""
                }
            `} />

          </div>








        </div>

        <div
          className=' bg-(--background-primary) flex-1 h-full relative min-h-0   rounded-sm  overflow-hidden'
        >
          <Outlet />
        </div>




      </div>


      <div
        className='
  
  h-[84px] p-2 w-full

 px-[10px]
  pt-[11px]
  pb-[7px]
     '
      >

        <div
          className=' w-full h-full rounded-[8px] flex justify-between items-center px-4'
          style={{
            background: "#AF2997",
            background: "linear-gradient(100deg, rgba(175, 41, 151, 1) 0%, rgba(81, 155, 245, 1) 100%)"
          }}
        >

          <div className='flex flex-col'>
            <p className='text-[14px] font-bold'>Preview of Spotify</p>
            <p className='text-[14px]'>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
          </div>


          <motion.button
            onClick={() => navi('/signup')}
            whileTap={{ scale: 0.95, background: '#F0F0F0' }}
            whileHover={{ scale: 1.01, background: '#F0F0F0' }}
            className=' bg-(--text-primary) cursor-pointer  px-10  py-[12px] font-bold text-black rounded-3xl'
          >Sign up for free</motion.button>

        </div>

      </div>


    </div>
  )
}

export default LogoutLayout