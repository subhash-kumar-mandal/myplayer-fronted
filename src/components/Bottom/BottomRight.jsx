import React from 'react'


import { Fullscreen, Layers, MicVocal, PictureInPictureIcon, VolumeOff, VolumeX } from 'lucide-react'
import { motion } from 'motion/react'
import VolumeIcon from "../UX/VolumeIcon"
import { useDispatch, useSelector } from 'react-redux'
import { isQueue } from '../../utils/PanelState.js'
import { isVolumeSet } from '../../utils/playerSlice.js'

const BottomRight = () => {
    const dispatch = useDispatch();
    const { rightSwitch } = useSelector(val => val.state)
    const volume = useSelector(val => val.player.volume)
    return (

        <div
            className='
                h-10 w-full 
             flex  justify-end gap-3 items-center px-3 '>
            <MicVocal size={20} />
            <motion.div
                className='cursor-pointer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Layers size={20}
                    className={`
                ${rightSwitch === 'queue' ? "text-green-500" : ""}
                `}
                    onClick={() => {
                        dispatch(isQueue())
                    }}

                />
            </motion.div>
            <div
            onClick={()=>{
                if(volume===0){
                    dispatch(isVolumeSet(0.5))
                }else{
                    dispatch(isVolumeSet(0))
                }
            }}
            >
                {
                    volume === 0 ?
                        <VolumeX className='h-6 w-6 text-(--text-secondary)'
                           
                        />
                        : <VolumeIcon className='h-6 w-6 text-green-400'/>
                }
            </div>
            <input type="range"
                value={volume}
                min={0} max={1}
                step={0.0001}

                className='h-0.75 w-30 outline-none cursor-pointer  '
                onChange={(e) => {

                    dispatch(isVolumeSet(e.target.value))
                }}
            />

            <Fullscreen size={20} />

            <PictureInPictureIcon size={20} />

        </div>

    )
}

export default BottomRight