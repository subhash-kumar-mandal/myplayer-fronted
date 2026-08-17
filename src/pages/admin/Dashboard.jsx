import { Layers, MicVocal, Music, Users } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
    <div className=' bg-(--background-Three) h-full px-2 py-5 '>

      <div className='bg-(--background-primary) rounded-xl  flex items-center px-4 gap-5 py-3  '>

        <div className=' cursor-pointer hover:bg-(--bg-hover1)
            transition-all
            duration-700
            w-48.75 h-62.25 rounded-sm p-5
            flex items-center flex-col
            ' >
          <Music className='h-40 w-40  flex justify-center items-center transition-all duration-500 hover:rotate-6 hover:scale-90 hover:text-(--spotify-green)' />
          <div className='w-full'>
            <p className='text-3xl text-(--text-primary) font-bold '>0</p>
            <p className='text-(--text-secondary) text-[14px]'>Songs</p>
          </div>
        </div>


        {/*  */}
        <div className=' cursor-pointer hover:bg-(--bg-hover1)
            transition-colors
            duration-200
            w-48.75 h-62.25 rounded-sm p-5 
             flex items-center flex-col
            ' >
          <Layers className='h-40 w-40  flex justify-center items-center transition-all duration-500 hover:rotate-6 hover:scale-90 hover:text-(--spotify-green)' />
          <div className='w-full'>
            <p className='text-3xl text-(--text-primary) font-bold '>0</p>
            <p className='text-(--text-secondary) text-[14px]'>Albums</p>
          </div>
        </div>



        {/*  */}
        <div className=' cursor-pointer hover:bg-(--bg-hover1)
            transition-colors
            duration-200
            w-48.75 h-62.25 rounded-sm p-5
            flex items-center flex-col
            ' >
          <MicVocal className='h-40 w-40  flex justify-center items-center transition-all duration-500 hover:rotate-6 hover:scale-90 hover:text-(--spotify-green)' />
          <div className='w-full'>
            <p className='text-3xl text-(--text-primary) font-bold '>0</p>
            <p className='text-(--text-secondary)  text-[14px]'>Artists</p>
          </div>
        </div>

       

       {/*  */}
        <div className=' cursor-pointer hover:bg-(--bg-hover1)
            transition-colors
            duration-200
            w-48.75 h-62.25 rounded-sm p-5 flex items-center flex-col ' >
          <Users className='h-40 w-40  flex justify-center items-center transition-all duration-500 hover:rotate-6 hover:scale-90 hover:text-(--spotify-green)' />
          <div className='w-full'>
            <p className='text-3xl text-(--text-primary) font-bold '>0</p>
            <p className='text-(--text-secondary) text-[14px]'>Users</p>
          </div>
        </div>



      </div>

    </div>
  )
}

export default Dashboard