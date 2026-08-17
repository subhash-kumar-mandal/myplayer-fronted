import { Outlet } from "react-router-dom"
import Sidebar from "../components/admin/Sidebar" // side ka bar handle
import NavBar from "../components/admin/NavBar"


const AdminLayout = () => {
  return (
    <div className="flex h-screen">

      <div className="relative w-18 shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1   ">

        <NavBar />

        <main className="flex-1 bg-(--background-Three) overflow-hidden overflow-y-scroll spotify-scroll  ">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default AdminLayout