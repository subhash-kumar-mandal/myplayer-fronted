import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Middle = () => {
  const {left} = useSelector(val=>val.state)
  const [scrollTop,setScrollTop] = useState(0)
  return (
    <div
     className={
        ` flex-1 h-full  min-w-0   relative   rounded-sm  overflow-hidden  
        
        `
     }
    
    >
     
     
      <Outlet/>
     
     

    </div>
  )
}

export default Middle