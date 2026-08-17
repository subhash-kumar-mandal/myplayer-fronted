import { NavLink } from 'react-router-dom'

import { Disc3, LayoutDashboard, LogOut, MicVocal, Music, User } from "lucide-react"
import { useState } from 'react';
import LOGO from '../../assets/LOGO.svg'

const menus = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
    },
    {
        name: "Artists",
        path: "/admin/artists",
    },
    {
        name: "Albums",
        path: "/admin/albums",
    },
    {
        name: "Songs",
        path: "/admin/songs",
    },
    {
        name: "Users",
        path: "/admin/users",
    },
];



const Sidebar = () => {


    const [open, setOpen] = useState(false);

    return (
        //  open 282px(70.5) and close 72px(18)



        <aside
            onMouseEnter={() => {
                setOpen(true)
            }}
            onMouseLeave={() => {
                setOpen(false)
            }}
            className={
                 ` relative overflow-hidden border-r border-(--border-color) z-50   absolute flex flex-col left-0 top-0 h-screen py-5 px-1 transtion-width duration-300  shrink-0 h-screen bg-[var(--background-Three)] gap-10   ${open ? "w-[200px]" : "w-[72px]"} `
            }>


            {/* {menus.map((item) => (
        <NavLink key={item.path} to={item.path}>
          {item.name}
        </NavLink>
      ))} */}


            <div className='flex items-center gap-2 pl-1 h-13 mx-2  rounded-[5px]'>
                <img src={LOGO} alt="" className='bg-green-500 h-10 w-10 rounded-full hover:scale-110 transiton-scale duration-300 cursor-pointer' />
                <span className={`whitespace-nowrap transition-all duration-200 ${open ? "opacity-100 ml-1" : "opacity-0 ml-1"}`}>Spotify</span>
            </div>


            <div className='flex flex-col gap-2'>
                <NavLink
                    to="/admin/dashboard"
                    // style={{margin:""}}
                    className={({ isActive }) =>
                        `flex items-center gap-2 pl-1 h-13 mx-1  rounded-[5px]   transition-all ${isActive
                            ? "bg-(--background2) text-(--spotify-green)"
                            : "text-[var(--text-secondary)] hover:bg-[var(--background1)]"
                        }`
                    }
                >
                    <LayoutDashboard size={38} className="shrink-0 text-[64px] " />

                    <span className={`whitespace-nowrap transition-all duration-200 ${open ? "opacity-100 ml-1" : "opacity-0 ml-1"}`}>Dashboard</span>

                </NavLink>



                <NavLink
                    to="/admin/artists"
                    className={({ isActive }) =>
                        `flex items-center gap-2 pl-1 h-13 mx-1  rounded-[5px]  transition-all ${isActive
                            ? "bg-(--background2) text-(--spotify-green)"
                            : "text-[var(--text-secondary)] hover:bg-[var(--background1)]"
                        }`
                    }
                >
                    <MicVocal size={38} className='shrink-0' />
                    <span className={`whitespace-nowrap transition-all duration-200 ${open ? "opacity-100 ml-1" : "opacity-0 ml-1"}`}>Artists</span>

                </NavLink>


                <NavLink
                    to="/admin/albums"
                    className={({ isActive }) =>
                        `flex items-center gap-2 pl-1 h-13 mx-1  rounded-[5px]  transition-all ${isActive
                            ? "bg-(--background2) text-(--spotify-green)"
                            : "text-[var(--text-secondary)] hover:bg-[var(--background1)]"
                        }`
                    }
                >
                    <Disc3 size={38} className='shrink-0' />

                    <span className={`whitespace-nowrap transition-all duration-200 ${open ? "opacity-100 ml-1" : "opacity-0 ml-1"}`}>Albums</span>

                </NavLink>




                <NavLink
                    to="/admin/songs"
                    className={({ isActive }) =>
                        `flex items-center gap-2 pl-1 h-13 mx-1  rounded-[5px]   transition-all ${isActive
                            ? "bg-(--background2) text-(--spotify-green)"
                            : "text-[var(--text-secondary)] hover:bg-[var(--background1)]"
                        }`
                    }
                >
                    <Music size={38} className='shrink-0' />

                    <span className={`whitespace-nowrap transition-all duration-200 ${open ? "opacity-100 ml-1" : "opacity-0 ml-1"}`}>Songs</span>

                </NavLink>


                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `flex items-center gap-2 pl-1 h-13 mx-1  rounded-[5px]  transition-all            
                ${isActive
                            ? "bg-(--background2) text-(--spotify-green)"
                            : "text-[var(--text-secondary)] hover:bg-[var(--background1)]"
                        }`
                    }
                >
                    <User size={38} className='shrink-0' />

                    <span className={`whitespace-nowrap transition-all duration-200 ${open ? "opacity-100 ml-1" : "opacity-0 ml-1"}`}> users</span>

                </NavLink>

            </div>
            <div className=' absolute text-green-500  bottom-3 flex items-center gap-3 pl-1 h-13 mx-2 w-43 duration-300 transition-all  rounded-[5px] hover:bg-red-500 hover:text-black '>
                <LogOut size={38} className='shrink-0' />
                <span className={`whitespace-nowrap transition-all duration-200 ${open ? "opacity-100 ml-1" : "opacity-0 ml-1"}`}>Logout</span>
            </div>


        </aside>
    )
}

export default Sidebar