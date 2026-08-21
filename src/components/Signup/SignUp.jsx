

import { Info, Regex, Smartphone, Timer } from 'lucide-react'
import React, { useRef } from 'react'
import { motion } from 'motion/react'
import AppleIcon from '../../components/UX/AppleIcon'
import FB from '../../assets/FB.png'
import GOOGLE from '../../assets/Google.png'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { isServerFlagSet, setUserEmail } from '../../utils/Eamil.Slice'
import VinylIcon from '../ui/vinyl-icon'
import { URL_OBJECT } from '@/services/fetchHandleAll'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp = () => {

    const TimerRef = useRef(null);

    const navi = useNavigate()
    const dispatch = useDispatch()
    const email = useSelector(val => val.user.email);
    const { RegexFlag, ServerFlag } = useSelector(val => val.user.serverFlag);

   
    //This address is already linked to an existing account. To continue, log in.

    React.useEffect(() => {




        clearTimeout(TimerRef.current);

        TimerRef.current = setTimeout(() => {
            const test = emailRegex.test(email);
          
            async function fetchEmail() {


                try {

                    const res = await fetch(URL_OBJECT.BASE_URL+"/user/email/${email}")
                    const result = await res.json()
                    console.log(result)


                    if (result.success && res.ok) {


                        dispatch(isServerFlagSet({ ServerFlag: false, RegexFlag: test }))

                        return
                    }

                    throw new Error(result.message);

                } catch (err) {
                    const test = emailRegex.test(email);
                    dispatch(isServerFlagSet({ ServerFlag: true, RegexFlag: test }))
                }
            }
            if (!email.trim()) return
            if (!test){
                dispatch(isServerFlagSet({ ServerFlag: false, RegexFlag: test }))
                return
            }
            fetchEmail()

        }, 500)

        return () => {
            clearTimeout(TimerRef.current);
        }



    }, [email])






    return (

        <div
            className='bg-(--background-primary) w-screen h-screen scrollbar-none overflow-y-scroll  
    flex justify-center
    '
        >
            <div className='flex  flex-col w-80     gap-4 items-center pt-20'>



                <VinylIcon className="h-18 w-20 shrink-0 hover:text-green-400 transition-colors duration-300" />

                
                <h1 className='text-[45px] font-bold text-center ' >Sign up to start listening</h1>


                <div className='w-full flex-col shrink-0 gap-2 flex '>

                    <label htmlFor="email">Email</label>
                    <input type="text"
                        placeholder='name@domain.com'
                        spellCheck="false"
                        value={email}
                        className='
                
                rounded-[5px]
                border-(--text-secondary)
                border-2
                transition-all
                px-4
                text-[16px]
                outline-none
                duration-500
                focus:border-2
                focus:border-white
                h-12
                '
                        onChange={(e) => dispatch(setUserEmail(e.target.value))}
                    />

                </div>
                {
                    ServerFlag && <div className='bg-amber-400 w-full flex gap-2 px-2 py-4 items-center  rounded-[6px]'>

                        <Info className='text-black shrink-0' />
                        <p className='text-black text-[14px]'>
                            This address is already linked to an existing account. To continue, log in.
                        </p>

                    </div>
                }


                <motion.button
                    onClick={() => {
                       if(!ServerFlag && RegexFlag){
                        navi('/signup/email/step-1')
                       }
                    }}
                    className='shrink-0
                rounded-3xl
                font-bold
                text-black
                w-full h-12
                bg-green-500 
                cursor-pointer
                '
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.04 }}
                >Next
                </motion.button>



                <div>
                    or
                </div>





                <motion.div

                    // onClick={() => navi('/signup/phone')}



                    className='shrink-0
                rounded-3xl
                flex items-center
                px-4
                gap-5
                border
                border-(--text-secondary)
                w-full h-12
                cursor-pointer
                '
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.06 }}
                >
                    <Smartphone />
                    <p className='font-bold'>
                        Sign up with phone number
                    </p>
                </motion.div>





                <motion.div
                    className='shrink-0
                rounded-3xl
                flex items-center
                
                px-4
                gap-5
                border
                border-(--text-secondary)
                w-full h-12
                cursor-pointer
                '
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.06 }}
                >
                    <img src={GOOGLE} alt="" />
                    <p className='font-bold '>
                        Sign up with Google
                    </p>
                </motion.div>



                <motion.div
                    className='shrink-0
                rounded-3xl
                flex items-center
                
                px-4
                gap-5
                border
                border-(--text-secondary)
                w-full h-12
                cursor-pointer
                '
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.06 }}
                >
                    <AppleIcon />
                    <p className='font-bold'>
                        Sign up with Apple
                    </p>
                </motion.div>


                <div className='flex flex-col h-40 gap-3 py-10 items-center  shrink-0'>
                    <p className='text-(--text-secondary)'>Already have an account?</p>
                    <motion.p
                        onClick={() => navi('/login')}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.09 }}
                        className='text-[18px] 
                     cursor-pointer
                   
                    '>Log in</motion.p>
                </div>


                {/* {
                    Shiftlayout >0 && (
                        <>
                            <div className='h-14 rounded-full w-14  shrink-0 bg-amber-200'>

                            </div>
                            <div className='h-[2px] w-125 shrink-0 rounded-3xl bg-(--text-secondary)'>

                                <div

                                    className='h-full bg-green-400 transition-all duration-500  '
                                    style={{
                                        width: Shiftlayout === 1 ? "30%" : Shiftlayout === 2 ? "60%" : "100%"
                                    }}
                                />

                            </div>
                        </>
                    )
                } */}





            </div>








        </div>





    )
}

export default SignUp