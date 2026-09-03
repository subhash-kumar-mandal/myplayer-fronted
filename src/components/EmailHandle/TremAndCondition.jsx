
import { ChevronLeft, Info } from 'lucide-react';
import { motion } from 'motion/react';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../UX/Spinner'
import { setUserObject } from '../../utils/userSlice';
import { ClearAllFrom } from '../../utils/Eamil.Slice';
import VinylIcon from '../ui/vinyl-icon';
import { URL_OBJECT } from '@/services/fetchHandleAll';


const TremAndCondition = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const [loading, setLoading] = React.useState(false);
    const {
        name,
        gender,
        DOB,
        password,
        email
    } = user;


    const navi = useNavigate()



    async function sign_up() {
        try {
             
            setLoading(true)
            const res = await fetch(URL_OBJECT.BASE_URL+`/user/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials:'include',
                body: JSON.stringify({
                    name,
                    gender,
                    DOB,
                    password,
                    email
                })
            })

            
           
            
            const result = await res.json();

            if(!res.ok || !result.success) throw new Error('Something went worng ')
            const user  =  result.user
            const  accessToken = result.accessToken;
                
            dispatch(setUserObject({user,accessToken}))
            dispatch(ClearAllFrom())

             navi('/')

        } catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div
            className='
    bg-(--background-primary) 
    w-screen h-screen 
    scrollbar-none 
    overflow-y-scroll  
    flex 
    justify-center'
        >


            <div
                className=' 
        flex  
        flex-col 
        w-90      
        gap-6 
        items-center  
        pt-20 '>


                {/* image logo */}
                <VinylIcon  className="h-18 w-18 shrink-0 hover:text-green-400 transition-colors duration-300"  />

                <div className='h-[2px] w-125 shrink-0 rounded-3xl bg-(--text-secondary)'>

                    <div

                        className='h-full bg-green-400 transition-all duration-500  '
                        style={{
                            width: "100%"
                        }}
                    />

                </div>



                <div className='w-full flex items-center'>

                    <motion.div className=' w-10 cursor-pointer'
                        whileTap={{ scale: 0.90 }}
                        whileHover={{ scale: 1.09 }}
                        onClick={() => {
                            navi('/signup/email/step-2')
                        }}
                    >
                        <ChevronLeft size={30} className='text-(--text-secondary)' />
                    </motion.div>
                    <div>
                        <p className='text-(--text-secondary)'>Steps 3 to 3</p>
                        <p className='font-bold'>Terms & Conditions</p>
                    </div>
                </div>



                <div className=' bg-[#2A2A2A] w-[95%] flex gap-6 py-4  px-4  items-center  rounded-[6px]'>

                    <input type='checkbox'
                        className='

                         appearance-none
        w-5
        h-5
        shrink-0
        rounded-[4px]
        border-2
        border-gray-400
        cursor-pointer
        transition-all

        checked:bg-green-500
        checked:border-green-500
                     
                     '
                    />
                    <p className=' text-[14px]'>

                        I would prefer not to receive marketing messages from Spotify
                    </p>

                </div>


                <div className=' bg-[#2A2A2A] w-[95%] flex gap-6 py-4  px-3 items-center  rounded-[6px]'>

                    <input type='checkbox'
                        className='
                         appearance-none
        w-5
        h-5
        shrink-0
        rounded-[4px]
        border-2
        border-gray-400
        cursor-pointer
        transition-all

        checked:bg-green-500
        checked:border-green-500
                     
                     '
                    />
                    <p className=' text-[14px]'>

                        Share my registration data with Spotify’s content providers for marketing purposes.
                    </p>

                </div>




                <motion.button
                    disabled={loading}
                    className='shrink-0
                                rounded-3xl
                                font-bold
                                text-black
                                w-full h-12
                                bg-green-500 
                                cursor-pointer
                                flex items-center justify-center
                                
                                '
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02, background: '#05df72' }}

                    onClick={() => {



                        

                        sign_up()

                    }}
                > {
                    loading 
                    ?<Spinner />
                    : 'Sign up'
                    }
                </motion.button>


            </div>

        </div>
    )
}

export default TremAndCondition