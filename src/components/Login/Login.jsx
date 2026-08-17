import { Info, ShieldAlert, Smartphone } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'
import AppleIcon from '../../components/UX/AppleIcon'
import FB from '../../assets/FB.png'
import GOOGLE from '../../assets/Google.png'
import Spinner from '../UX/Spinner'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_Email } from '../../utils/login.Slice'
import { URL_OBJECT } from '@/services/fetchHandleAll'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Login = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const email = useSelector(val => val.email.email);
    const [checkEmailError, setCheckEmailError] = React.useState(false);

    const navi = useNavigate()

    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [ChangeLogin, setChangeLogin] = React.useState('email');




    async function sentOTP() {

        try {
            setLoading(true)
            const res = await fetch(URL_OBJECT.BASE_URL + '/user/password/' + email, {
                method: 'GET',

            });

            const result = await res.json();



            if (!result.success || !res.ok) throw new Error(result.message);

            navi('/password/fill')
        }
        catch (err) {

            if (err.message === 'user not found') {
                toast.message(
                    <div className="flex items-center w-full  px-2  py-2 gap-3">

                        <ShieldAlert size={28} className='text-red-500' />
                        <div className="flex flex-col">
                            <span className="font-semibold capitalize text-white">
                                <span className='text-red-500'>Error</span> user not found
                            </span>

                            <span className="text-xs capitalize text-(--text-secondary)">
                                Thanks for Visiting
                            </span>
                        </div>
                    </div>, {
                    closeButton: true,
                    position: "bottom-center",
                    style: {
                        background: " #121212",
                        border: "1px solid #ffffff4d",
                        padding: 0,
                        margin: 0
                    },
                    duration: 2000
                })
            }
            setCheckEmailError(true);

        } finally {
            setLoading(false)
        }
    };


    return (
        <div
            className='bg-(--background-primary) w-screen h-screen scrollbar-none overflow-y-scroll  
    flex justify-center
    
    '
        >
            <div className='flex  flex-col w-80    gap-4 items-center pt-20'>

                <div className='h-14 rounded-full w-14  shrink-0 bg-amber-200'>

                </div>
                <h1 className='text-[45px] font-bold '>Welcome Back</h1>


                {ChangeLogin === "email" ? <div className='w-full flex-col shrink-0 gap-2 flex mt-6'>

                    <label htmlFor="email">Email</label>
                    <input type="text"
                        placeholder='Email...'
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
                        onChange={(e) => {
                            if (checkEmailError) setCheckEmailError(false)
                            dispatch(set_Email(e.target.value))
                        }}
                    />

                </div> :


                    <div className='w-full flex-col shrink-0 gap-2 flex mt-6'>

                        <label htmlFor="phone">Phone</label>


                        <div className='flex gap-2'>
                            <select name="" id=""
                                className='w-18  h-12
                        border-2
                transition-all
                 border-(--text-secondary)
                text-[16px]
                px-1
                rounded-[5px]
                outline-none
                duration-500
                focus:border-2
                focus:border-white
                        '
                            >
                                <option className=' bg-black text-black'>
                                    +91
                                </option>

                            </select>


                            <input type="text"
                                placeholder='10 digit number...'
                                id='phone'
                                value={phoneNumber}
                                onChange={(e) => {
                                    const Check = e.target.value


                                    if (!Number.isNaN(Number(Check)) && Check.toLowerCase() !== "e" && typeof Number(Check) === 'number') {
                                        setPhoneNumber(e.target.value)
                                        return
                                    };

                                    toast.error("Accept Only Numbers", {
                                        style: {
                                            background: "#000000",
                                            border: "1px solid red",
                                            fontFamily: "font",
                                            fontWeight: "bolder",
                                            color: 'red'
                                        },
                                        closeButton: true
                                    })

                                }}
                                className='
                
                rounded-[5px]
                w-full
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

                            />
                        </div>



                    </div>
                }

                {
                    checkEmailError && (
                        <div className='bg-amber-400 w-full flex gap-2 px-2 py-4 items-center  rounded-[6px]'>

                            <Info className='text-black shrink-0' />
                            <p className='text-black text-[14px]'>
                                This address is not valid. To continue, log in valid email.
                            </p>

                        </div>
                    )
                }


                <motion.button
                    disabled={loading}
                    className='shrink-0
                    flex justify-center items-center
                rounded-3xl
                font-bold
                text-black
                w-full h-12
                bg-green-500 
                cursor-pointer
                '
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.04 }}

                    onClick={() => {
                        if (ChangeLogin === 'email') {

                            const flag = !emailRegex.test(email);

                            if (flag) {
                                setCheckEmailError(true)
                                return
                            };


                            sentOTP()

                        }
                    }}

                >
                    {loading ? <Spinner /> : 'Continue'}
                </motion.button>



                <div>
                    or
                </div>




                {
                    ChangeLogin === "email" ?
                        <motion.div

                            onClick={() => setChangeLogin('phone')}

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
                                Contiune with phone number
                            </p>
                        </motion.div>
                        : <motion.div

                            onClick={() => setChangeLogin('email')}

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
                                Contiune with Email
                            </p>
                        </motion.div>
                }



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
                        Contiune with Google
                    </p>
                </motion.div>

                <motion.div
                    className='
                rounded-3xl
                flex items-center
                shrink-0
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
                    <img src={FB} className='h-6 w-6 rounded-full' alt="" />
                    <p className='font-bold text-center'>
                        Contiune with FaceBook
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
                        Contiune with Apple
                    </p>
                </motion.div>



                <div className='flex flex-col h-40 gap-3 py-10 items-center  shrink-0'>
                    <p className='text-(--text-secondary)'> Don t have an account?</p>
                    <motion.p
                        onClick={() => navi('/signup')}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.09 }}
                        className='text-[18px] 
                     cursor-pointer
                   
                    '> Sign up</motion.p>
                </div>









            </div>




        </div>
    )
}

export default Login