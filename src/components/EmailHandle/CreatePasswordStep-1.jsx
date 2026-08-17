import { ChevronLeft, Circle, CircleCheck, Eye, EyeOff } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isPWSet, setPasswordUser } from '../../utils/Eamil.Slice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import VinylIcon from '../ui/vinyl-icon';


const letters = new Set(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);

const CreatePasswordStep_1 = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const password = useSelector(val => val.user.password);
    const { letter, length, speicalChar } = useSelector(val => val.user.pwCheck)


    const DivRef = useRef(null);
    const [DivHover, setDivHover] = React.useState(false)

    const [TogglePassword, settogglePassword] = React.useState(false)

    const [passWordCheckObject, setPassWordCheckObject] = React.useState({
        speicalChar: false,
        letter: false,
        length: false
    });

  
 
   

    const CheckPoint = (e) => {
        const value = e.target.value;
        dispatch(setPasswordUser(value));
        const hasLetter = [...value].some(char => letters.has(char));
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);


        dispatch(isPWSet({ letter: hasLetter, length: value.length >= 10, speicalChar: hasSpecialChar }))



    }



    React.useEffect(() => {

        function HandleOutSideClick(e) {

            if (DivRef.current && !DivRef.current.contains(e.target)) {
                setDivHover(false);
            }

        }

        document.addEventListener('click', HandleOutSideClick);

        return () => {
            document.removeEventListener('click', HandleOutSideClick)
        }

    }, [])

    return (

        <div
            className='bg-(--background-primary) w-screen h-screen scrollbar-none overflow-y-scroll  
    flex justify-center
    '
        >
            <div className=' flex  flex-col w-90       gap-6 items-center  pt-20 '>

                <VinylIcon className="h-18 w-18 shrink-0 hover:text-green-400 transition-colors duration-300" />

                
                <div className='h-[2px] w-125 shrink-0 rounded-3xl bg-(--text-secondary)'>

                    <div

                        className='h-full bg-green-400 transition-all duration-500  '
                        style={{
                            width: "30%"
                        }}
                    />

                </div>



                <div className='w-full flex items-center shrink-0'>

                    <motion.div className=' w-10 cursor-pointer'
                        whileTap={{ scale: 0.90 }}
                        whileHover={{ scale: 1.09 }}
                        onClick={() => {
                            navi('/signup')
                        }}
                    >
                        <ChevronLeft size={30} className='text-(--text-secondary)' />
                    </motion.div>
                    <div>
                        <p className='text-(--text-secondary)'>Steps 1 to 3</p>
                        <p className='font-bold'>Create password</p>
                    </div>
                </div>


                <div className='w-full flex-col shrink-0 gap-2 flex '>

                    <label htmlFor="password" className='font-bold'>Password</label>
                    <div
                        ref={DivRef}
                        className={
                            `
               flex
                items-center
                gap-1
                px-2
                rounded-[5px]
                border-(--text-secondary)
                border-2
                transition-all
                h-12
                text-[16px]
                outline-none
                duration-500
                ${DivHover ? ' border-white border-2' : 'border-(--text-secondary) border-2 '}
                
                `
                        }
                    >
                        <input type={TogglePassword ? 'text' : 'password'}
                            placeholder=''
                            value={password}
                            onFocus={() => setDivHover(true)}
                            className='
                
                     rounded-[5px]
                       outline-none
                      transition-all
                px-1
                text-[16px]
               w-full
                h-full
                '
                            onChange={(e) => {
                                CheckPoint(e)
                            }}
                        />

                        {
                            TogglePassword
                                ? <Eye size={30}
                                    onClick={() => {
                                        settogglePassword(false)
                                    }}
                                />
                                : <EyeOff size={30}
                                    onClick={() => {
                                        settogglePassword(true)
                                    }}
                                />
                        }

                    </div>

                </div>


                <div className='w-full  py-4'>

                    <span className=''>Your password must contain at least</span>
                    <div className='flex  items-center gap-2 text-[14px]'>
                        {
                            letter ? <CircleCheck size={16} className='bg-green-400 rounded-full fill-green-400 text-black' /> : <Circle size={16} />
                        }
                        <p>1 letter</p>
                    </div>
                    <div className='flex  items-center gap-2 text-[14px]'>
                        {speicalChar ? <CircleCheck size={16} className='bg-green-400 rounded-full fill-green-400 text-black' /> : <Circle size={16} />}
                        <p>1 number or special character (example: # ? ! &)</p>
                    </div>
                    <div className='flex  items-center gap-2 text-[14px]'>
                        {length ? <CircleCheck size={16} className='bg-green-400 rounded-full fill-green-400 text-black' /> : <Circle size={16} />}
                        <p>10 characters</p>
                    </div>


                </div>



                <motion.button

                    onClick={() => {
                        const flag = length && letter && speicalChar;
                       
                        if (!flag) {
                            return toast.error('Please enter Strong password', {
                                duration: 1500,
                                closeButton: true
                            })
                        }


                        navi('/signup/email/step-2')

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
            </div>


        </div>
    )
}

export default CreatePasswordStep_1