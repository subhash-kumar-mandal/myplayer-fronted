
import React, { useEffect, useRef, useState } from 'react'

import LOGO from '../../../assets/LOGO.svg'
import { Bell, Globe, House, Search, X } from 'lucide-react'
import DownloadIcon from '../../UX/DownloadIcon'
import GroupIcon from '../../UX/GroupIcon';
import HomeIcon from '../../ui/home-icon'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Vinyl_icon from '../../ui/vinyl-icon'
import { isClearUser } from '@/utils/userSlice';
import { isPlayerClear } from '@/utils/playerSlice';
import { browser } from 'globals';
import { URL_OBJECT } from '@/services/fetchHandleAll';
const NavBar = () => {



  const navi = useNavigate()


  const dispatch = useDispatch()
  const { email } = useSelector(val => val.userContext.user);
  const { user, accessToken } = useSelector(val => val.userContext);

  const isAuthenticated = !!accessToken;
  const isAdmin = isAuthenticated && user?.role === "ADMIN";

  const [divClick, setDivClick] = useState(false)
  const [hover, setHover] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const InputDivRef = useRef(null)
  const InputRef = useRef(null)
  const ProfileRef = useRef(null)
  const TimerRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState(false)
  const [HomeHover, setHomeHover] = useState(false)




  useEffect(() => {




    clearTimeout(TimerRef.current);



    TimerRef.current = setTimeout(() => {

      console.log(searchInput)

    }, 500)

    return () => clearTimeout(TimerRef.current);

  }, [searchInput])



  useEffect(() => {

    function handleKeyDown(e) {

      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault()

        if (!InputDivRef.current) return;

        InputRef.current.focus();
        setDivClick(true)

      }
    };


    function OutSideClickHandle(e) {

      if (InputDivRef.current && !InputDivRef.current.contains(e.target)) {
        setDivClick(false)
      }

      if (ProfileRef?.current && !ProfileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }


    }
    document.addEventListener('mousedown', OutSideClickHandle);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', OutSideClickHandle)
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, [])

  return (
    <div
      className='grid grid-cols-3   w-full h-[64px]   items-center  p-2'
    >





      <div className='flex items-center'>


        <div
          className=' rounded-full h-full w-[72px] flex items-center justify-center'
        >

          <Vinyl_icon className='h-10 w-10 text-(--text-secondary)' />

        </div>

        {
          (isAuthenticated && isAdmin) && (

            <div
              className='
        flex
        justify-center
        items-center
         bg-(--text)
         text-black
         font-bold
          px-3
         rounded-2xl
         text-[14px]
         h-[32px]
         w-[100px]
          
         cursor-pointer
         transition-transform
         duration-300
         hover:scale-[1.05]
        '
              onClick={() => {
                navi('/admin')
              }}
            >
              Admin
            </div>
          )
        }
      </div>





      <div
        className='flex items-center justify-center gap-6 w-[534px]'
      >

        <div
          onMouseEnter={() => {
            setHomeHover(true);
          }}
          onMouseLeave={() => {
            setHomeHover(false)
          }}

          onClick={() => {
            navi('/')
          }}

          className={`
       bg-[#1f1f1f]
       h-12  
       w-12 
       rounded-full
       flex 
       justify-center
       items-center cursor-pointer
       
        transition-all
             duration-500
  
      
       ${HomeHover
              ? "scale-[1.05] hover:bg-(--hover-secondary)"
              : "scale-[1]"

            }
      
      `}
        >
          <House  className={''} />
        </div>


        <div
          ref={InputDivRef}


          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false)
          }}


          className={`
          bg-[#1f1f1f] 
            w-[474px]  h-[48px] 
            rounded-3xl
            px-2
            flex
            gap-3
            relative
            items-center


            ${divClick ?
              " border-2 border-white "
              :
              "  border-2 border-transparent"
            }

           

            

            border-2 border-transparent
             transition-colors
             duration-500
             hover:bg-(--hover-secondary)
             
             

          `}
        >
          <span
            className={` gap-1  h-10 w-40 right-10 flex items-center
            absolute
             pointer-events-none
               opacity-0
               duration-500
               transition-opacity
             ${((divClick || hover) && (searchInput.trim().length === 0)) ?
                `
              opacity-100
               
              `
                : "invisible  opacity-0"
              }
            `}
          >
            <p
              className='border-[1px]   border-(--text-secondary)  px-[3px] py-[2px] rounded-[4px] text-sm  text-(--text-secondary)  '
            >Ctrl</p>
            <p
              className='  border-[1px]  border-(--text-secondary)  px-[3px] py-[2px] rounded-[4px] text-sm  text-(--text-secondary)  '
            >Shift</p>
            <p
              className='border-[1px]  border-(--text-secondary)  px-[3px] py-[2px] rounded-[4px] text-sm  text-(--text-secondary)  '
            >L</p>

          </span>


          <span

            onClick={() => {
              setSearchInput('')
            }}
            className={` gap-1  h-10 w-10 right-10 flex items-center justify-center
            absolute
               opacity-0
               z-20
              
               
               duration-300
               transition-opacity
             ${((searchInput.trim().length > 0)) ?
                `
              opacity-100
               
              `
                : "invisible  opacity-0"
              }
            `}
          >
            <X className='h-8 w-8 text text-(--text-secondary)  hover:text-(--text) hover:scale-[1.05] duration-300
               transition-all  '/>


          </span>

          <Search size={30} className={
            `
            transition-transform
            duration-300
            cursor-pointer
            text-(--text-secondary)
            
          hover:scale-[1.08]

            ${((divClick || hover)) ?
              `
              text-white
               
              `
              : ""
            }
            `
          } >

          </Search>
          <input
            ref={InputRef}
            type="text"
            spellCheck='false'
            value={searchInput}
            placeholder='What do you want to play?'
            onFocus={() => {
              setDivClick(true)
            }}
            onChange={(e) => {
              setSearchInput(e.target.value)
            }}

            className='
             h-full
            w-full
             outline-none
            '

          />
          <Globe size={32}
            className='
            shrink-0
            text-(--text-secondary) 
            cursor-pointer
             border-l
             pl-1.5
             
            transition-all
            duration-200
            hover:text-(--text)
            hover:scale-[1.04]
            ' />

        </div>

      </div>


      <div
        className='
      flex items-center
      justify-end
      gap-4
      pr-2
      
      '
      >

        <div
          className='
        flex
        justify-center
        items-center
         bg-(--text)
         text-black
         font-bold
          px-3
         rounded-2xl
         text-[14px]
         h-[32px]
         w-[150px]
          
         cursor-pointer
         transition-transform
         duration-300
         hover:scale-[1.05]
        '
          onClick={() => {
            navi('/premium')
          }}
        >
          Expolore Premium
        </div>




        <div
          className='
        flex
        gap-1
        justify-center
        items-center
         
        text-(--text-secondary) 
        
         font-bold
          px-1
         rounded-2xl
         text-[12px]
         h-[32px]
         w-[100px]
          
         cursor-pointer
         transition-all
         duration-300
         hover:scale-[1.05]
         hover:text-(--text)
        '
        >

          <DownloadIcon className='h-6 h-6 fill-(--text-secondary)' />
          Install App

        </div>





        <Bell size={18} className='
      text-(--text-secondary)
      cursor-pointer
         transition-all
         duration-300
         hover:scale-[1.05]
         hover:text-(--text)
      '/>


        <GroupIcon
          className='
        h-6 w-6
        text-(--text-secondary)
      cursor-pointer
         transition-all
         duration-300
         hover:scale-[1.05]
         hover:text-(--text)

        '
        />





        <div
          ref={ProfileRef}
          className='
        bg-(--background3)
        flex 
        justify-center
        items-center
         relative
        h-12
        w-12
       
        rounded-full

         transition-all
         duration-300
       '

          onClick={(e) => {
            e.stopPropagation()
            setProfileOpen(pre => !pre)
          }}
        >
          <p
            className='
        flex 
        
        justify-center
        items-center
        text-black
        font-bold
         cursor-pointer
        h-8 
        w-8
        bg-orange-300
        rounded-full
        '

          >
            {
              email[0].toUpperCase()
            }




          </p>

          <div

            className={
              `bg-[#282828]  absolute
            h-80 w-76 rounded-[5px]
            right-2 top-14
            z-60
            transition-all
            duration-300
           
            px-1
            py-1
            ${profileOpen ? "visible opacity-100" : "invisible opacity-0"}
            `
            }
            onClick={(e) => {
              e.stopPropagation()
            }}

          >

            <div className='
            font-medium 
            text-[16px] 
            px-2 py-2 
            cursor-pointer 
            hover:bg-(--background3) 
            rounded-xs 
            hover:text-red-500 
            duration-300
            transition-all
            '
              onClick={async () => {
                       

                const res = await fetch(URL_OBJECT.BASE_URL+'/user/logout',{
                  method:"POST",
                  credentials:'include'
                });

                const resu = await res.json();
                console.log(res)

                
                
                dispatch(isClearUser())
                dispatch(isPlayerClear())
                
              }}
            >
              logout
            </div>

          </div>



        </div>


      </div>






    </div>
  )
}

export default NavBar