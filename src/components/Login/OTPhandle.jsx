import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import { ShieldAlert } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../UX/Spinner';
import { setUserObject } from '../../utils/userSlice';
import { setClear } from '../../utils/login.Slice';
import { URL_OBJECT } from '@/services/fetchHandleAll';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OTPhandle = () => {
    const dispatch = useDispatch()
    const email = useSelector(val => val.email.email);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const InputRef = React.useRef([])
    const [otp, setOtp] = React.useState(new Array(6).fill(''));
    const navi = useNavigate()



    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

        if (value && index < 5) {
            InputRef.current[index + 1]?.focus();
        }
    };


    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            InputRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        const otpArray = pastedData.split("");

        const newOtp = [...otp];

        otpArray.forEach((digit, index) => {
            newOtp[index] = digit;
        });

        setOtp(newOtp);

        const lastIndex =
            Math.min(otpArray.length, 5);

        InputRef.current[lastIndex]?.focus();
    };

    useEffect(() => {

        const flag = !emailRegex.test(email)

        if (flag) {
            return navi('/login')
        }

    }, [email]);



    async function LoginOTP() {

        try {
            setLoading(true)
            const res = await fetch(URL_OBJECT.BASE_URL+'/user/email/otp-verify', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
                ,
                body: JSON.stringify({ email, otp: otp.join('') })
            });

            const result = await res.json();

            if (!result.success || !res.ok) throw new Error('Invalid email');
            console.log(result)
            const user = result.user
            const accessToken = result.accessToken;
            
            dispatch(setUserObject({user,accessToken}))
            
            navi('/')
            
        }
        catch (err) {
            setError(true)

        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        InputRef.current[0]?.focus();
    }, []);

    useEffect(() => {

        if (otp.every(val => val !== "")) {
            LoginOTP();
        }

    }, [otp]);



    return (

        <div className='flex justify-center'>
            <div className='flex  flex-col w-90 bg    items-center pt-20'>

                <div className=' my-3 text-[25px]  font-bold text-cente '>
                    Enter the 6-digit code sent to you at {email}
                </div>

                <div
                    onPaste={handlePaste}
                    className="my-3    flex justify-center gap-3"
                >
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) =>
                                (InputRef.current[index] = el)
                            }
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                                if (error) setError(false)
                                handleChange(e, index)
                            }}
                            onKeyDown={(e) =>
                                handleKeyDown(e, index)
                            }
                            className="
                h-14
                w-12
                rounded-[5px]
                border-2
                border-(--text-secondary)
                
                text-center
                text-2xl
                font-semibold
                text-white
                outline-none
                transition
                focus:border-white
                focus:border-2
              "
                        />
                    ))}
                </div>
                {
                    error && (

                        <div className='text-red-500 flex items-center gap-2'>
                            <ShieldAlert />
                            <p>
                                This code is invalid. Check the code and try again
                            </p>
                        </div>
                    )
                }

                <motion.button
                    className='shrink-0
                rounded-3xl
                font-bold
                my-2
                text-[14px]
                border-2

                px-4
                py-1
                text-(--text-primary)
                cursor-pointer
                '
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.04 }}
                >Resend code
                </motion.button>

                <motion.button
                    disabled={loading}

                    onClick={() => {

                        if (otp.join('').length < 6) {
                            setError(true)
                            return
                        }
                        LoginOTP()

                    }}

                    className='shrink-0
                rounded-3xl
                font-bold
                my-2
                flex justify-center items-center
                text-black
                w-full h-12
                bg-green-500 
                cursor-pointer
                '
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.04 }}
                >{
                        loading ? <Spinner /> : 'Verify'
                    }
                </motion.button>


            </div>
        </div>
    )
}

export default OTPhandle