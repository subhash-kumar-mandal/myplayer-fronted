import { CirclePlus } from "lucide-react"
import { useNavigate } from "react-router-dom"
const Albums = () => {

  const navi  = useNavigate()
  return (
    <div className="bg-(--background-Three) h-full px-2 py-5 ">



      <div className='h-20  justify-between  px-10 flex items-center'

      >
        <div className='text-4xl font-semibold tracking-wider  '>Album</div>
        <button

          onClick={() => {
            navi('/admin/albums/add')
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-sm
          cursor-pointer
  hover:bg-(--hover-primary)
  transition-all duration-300
  hover:text-(--spotify-green)"
        >
          <CirclePlus size={25} />
          <span className="text-lg font-medium">Add Album</span>
        </button>

      </div>
    </div>
  )
}

export default Albums