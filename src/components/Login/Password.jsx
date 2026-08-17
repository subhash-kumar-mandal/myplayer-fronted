import React, { useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { URL_OBJECT } from "@/services/fetchHandleAll";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../UX/Spinner";
import { setUserObject } from "@/utils/userSlice";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordFill = () => {

    const navigate = useNavigate();
    const email = useSelector(val => val.email.email);
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const [error, setError] = useState(false);

    const handleSubmit = () => {

        setError("");

        if (!password) {
            setError("Please fill in both fields");
            return;
        }





        // API yahan call karna
        login()

    };


    React.useEffect(() => {

        const flag = !emailRegex.test(email)

        if (flag) {
            return navigate('/login')
        }

    }, []);




    async function sentOTP() {

        try {
            setLoading(true)
            const res = await fetch(URL_OBJECT.BASE_URL + '/user/email/otp-sent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
                ,
                body: JSON.stringify({ email })
            });

            const result = await res.json();

            if (result.message == "You can only send testing emails to your own email address (pm817405@gmail.com). To send emails to other recipients, please verify a domain at resend.com/domains, and change the `from` address to an email using this domain.") {
                toast.message(
                    <div className="flex items-center w-full  px-2  py-2 gap-3">

                        <ShieldAlert size={28} className='text-red-500' />
                        <div className="flex flex-col">
                            <span className="font-semibold capitalize text-white">
                                <span className='text-red-500'>Error</span> this services currently busy
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
                });
            }

            if (!result.success || !res.ok) throw new Error('Invalid email');

            navigate('/login/otp')
        }
        catch (err) {
            console.error(err.message)

        } finally {
            setLoading(false)
        }
    };


    async function login() {
        try {
            setLoading(true)
            const res = await fetch(URL_OBJECT.BASE_URL + '/user/password/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:'include'
                ,
                body: JSON.stringify({ email, password })
            });

            const result = await res.json();
            

            if (!res.ok || !result.success) throw new (result.message)
               
                const user = result?.user??{};
                const token = result?.accessToken??"";
      
         

                dispatch(setUserObject({user:user,accessToken:token}))

                navigate('/')
            
        } catch (err) {
            setError(true)


        } finally {
            setLoading(false)
        }
    }




    return (
        <div className="min-h-screen flex justify-center bg-(--background-primary)">

            <div className="
                w-[360px]
                flex
                flex-col
                items-center
                pt-14
                px-5
            ">

                {/* Logo */}

                <div className="
                    h-14
                    w-14
                    rounded-full
                    bg-green-500
                    flex
                    items-center
                    justify-center
                    mb-8
                ">
                    <LockKeyhole
                        size={28}
                        className="text-black"
                    />
                </div>


                {/* Heading */}

                <h1 className="
                    text-[25px]
                    font-bold
                    text-center
                    mb-2
                ">
                    Enter your Password
                </h1>




                {/* Password */}

                <div className="w-full mb-4">

                    <label className="
                        text-sm
                        font-medium
                        mb-2
                        block
                    ">
                        Password
                    </label>

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter password"
                            className="
                                w-full
                                h-12
                                rounded-md
                                bg-(--background1)
                                border-2
                                border-(--text-secondary)
                                px-4
                                pr-12
                                text-white
                                outline-none
                                focus:border-white
                                transition-colors
                            "
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                text-(--text-secondary)
                                hover:text-white
                                cursor-pointer
                            "
                        >
                            {showPassword
                                ? <EyeOff size={20} />
                                : <Eye size={20} />
                            }
                        </button>

                    </div>

                </div>
                {/* Error */}

                {error && (
                    <p className="
                        w-full
                        text-red-500
                        text-sm
                        mb-2
                    ">
                        Invaild credential

                    </p>
                )}


                {/* Confirm Password */}

                <div className="w-full  flex justify-center
                
                
                ">
                    <motion.span
                        onClick={sentOTP}
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02 }}
                        className="
              shrink-0
                rounded-3xl
                font-
                my-2
                text-[14px]
                border-2

                px-3
                py-1
                text-(--text-primary)
                cursor-pointer"
                    >
                        Sent OTP
                    </motion.span>

                </div>





                {/* Continue */}

                <motion.button
                    disabled={loading}
                    type="button"
                    onClick={handleSubmit}
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.02 }}
                    className="
                        w-full
                        h-12
                        mt-3
                        flex justify-center
                        items-center
                        rounded-3xl
                        bg-green-500
                        text-black
                        font-bold
                        cursor-pointer
                    "
                >
                    {
                        loading ? <Spinner /> : "Login"
                    }
                </motion.button>


                {/* Back */}

                <button
                    onClick={() => navigate("/signup")}
                    className="
                        mt-5
                        text-sm
                        text-(--text-secondary)
                        hover:text-white
                        hover:underline
                        cursor-pointer
                    "
                >
                    Back to sign up
                </button>

            </div>

        </div>
    );
};

export default PasswordFill;