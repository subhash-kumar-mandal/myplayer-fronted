

import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const Artists = () => {

  const navi = useNavigate()



  const [artists, setArtists] = useState([]);

  useEffect(() => {


    async function fetchArtists() {
      try {


        const responce = await fetch('http://localhost:2000/artist/admin/get-all', {
          method: "GET",
        });

        const res = await responce.json();

        console.log(res)
        if (responce.ok) {
          setArtists(res.data)
        }

      } catch (err) {
        console.log("CATCH BLOCK", err)
      }
    }

    fetchArtists()
    // 

  }, [])


  return (
    <div className="bg-(--background-Three) h-full px-2 py-5 ">


      <div className='h-20  justify-between  px-10 flex items-center'

      >
        <div className='text-4xl font-semibold tracking-wider  '>Artists</div>
        <button

          onClick={() => {
            navi('/admin/artists/add')
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-sm
          cursor-pointer
  hover:bg-(--hover-primary)
  transition-all duration-300
  hover:text-(--spotify-green)"
        >
          <CirclePlus size={25} />
          <span className="text-lg font-medium">Add Artist</span>
        </button>

      </div>


      <div className=" px-5 sticky top-0 bg-(--background-secondary) rounded-xl ">
        {/* Headings */}
        <div className="grid grid-cols-[200px_500px_120px_120px_160px] items-center px-5 gap-5 r py-4">
          <h2 className="text-2xl text-(--text-secondary) font-(--font-medium)">Image</h2>
          <h2 className="text-2xl text-(--text-secondary) font-(--font-medium)">Name</h2>
          <h2 className="text-2xl text-(--text-secondary) font-(--font-medium)">Albums</h2>
          <h2 className="text-2xl text-(--text-secondary) font-(--font-medium)">Songs</h2>
          <h2 className="text-2xl text-(--text-secondary) font-(--font-medium)">Action</h2>
        </div>

      </div>


      <div className='' >

        <div className="max-h-150  scroll-smooth  rounded-sm "
        
        >
          {
            artists.length > 0 && artists.map((ArtistObject) => {
              
              
              return <div key={ArtistObject._id} className={`grid grid-cols-[200px_500px_120px_120px_160px]  cursor-pointer items-center-5 px-5 rounded-xl gap-10 items-center py-1 border-b border-(--border-color)  my-3 
               transition-all
               duration-300
              hover:bg-(--bg-hover1) hover:text-(--spotify-green)`}>

                <div className="flex items-center">
                  <div className="h-15 w-15 rounded-full overflow-hidden">
                    <img
                      src={ArtistObject.image.url}
                      alt="artist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h2>{ArtistObject.name}</h2>

                <div>{ArtistObject.albumCount}</div>

                <div>{ArtistObject.songCount}</div>

                <div className='flex gap-3 items-center'>
                  <Pencil />| <Trash2 />
                </div>

              </div>
            })
          }
        </div>


      </div>

    </div>
  )
}

export default Artists