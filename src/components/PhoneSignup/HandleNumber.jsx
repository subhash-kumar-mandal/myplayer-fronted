import { ChevronLeft, ShieldAlert } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'motion/react'
const HandleNumber = () => {

  const [phoneNumber, setPhoneNumber] = useState('')

  const [loader, setLoader] = useState(false)
  const [shiftLayoutOtp, setShiftLayoutOtp] = useState(true);
  const [fetchOTP, setFetchOTP] = React.useState(null);

  const InputRef = useRef([])
  const [otp, setOtp] = useState(new Array(6).fill(''))





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


  const OTPPROMISE = new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve({
        message: "OTP Fack",
        success: true,
        OTP: Math.floor(100000 + Math.random() * 900000)
      })
    }, 5000)

  })
  console.log(fetchOTP)

  async function FindOTP() {
    try {
      setLoader(true)
      const res = await OTPPROMISE;

      if (!res.success) {
        return
      }
      setFetchOTP(res.OTP);
      setShiftLayoutOtp(true)

    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false)
    }




  }




  return (


    <div className='flex  flex-col w-90 bg    items-center pt-20'>


      <div className='w-full'>

        <motion.div className=' w-10 cursor-pointer'
          whileTap={{ scale: 0.90 }}
          whileHover={{ scale: 1.09 }}
        >
          <ChevronLeft size={30} className='text-(--text-secondary)' />
        </motion.div>
      </div>

      {!shiftLayoutOtp &&
        <div className='w-full flex-col shrink-0 gap-2 flex mt-6'>

          <label htmlFor="phone">Phone Number</label>


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


            <input type="tel"
              placeholder='10 digit number...'
              id='phone'
              maxLength={10}
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value




                if (/^\d{0,10}$/.test(value)) {
                  setPhoneNumber(value);
                } else {
                  toast.error("Only numbers are allowed", {
                    closeButton: true,
                    position: "bottom-center",
                    duration: 1500
                  });
                }



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

          <motion.button
            disabled={loader}
            onClick={() => {


              if (phoneNumber.length !== 10) {
                return toast.error(
                  'Enter valid Number',
                  {
                    style: {
                      fontFamily: "font",
                      fontWeight: "900",
                      border: '2px solid red',
                      color: 'red',
                      background: '#000000'
                    },
                    position: 'top-center',
                    closeButton: true,
                    duration: 1500
                  }
                );
              }

              FindOTP()

            }}

            className={`shrink-0
                rounded-3xl
                font-bold
                mt-2
                text-black
                w-full h-12
                bg-green-500 
                ${loader ? "cursor-not-allowed" : 'cursor-pointer'}
            `}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
          >Next
          </motion.button>



        </div>}




      {
        shiftLayoutOtp && (
          <>
            <div className=' my-3 text-[25px]  font-bold text-cente '>
              Enter the 6-digit code sent to you at +91{phoneNumber}
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
                  onChange={(e) =>
                    handleChange(e, index)
                  }
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

            <div className='text-red-500 flex items-center gap-2'>
              <ShieldAlert />
              <p>
                This code is invalid. Check the code and try again
              </p>
            </div>

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
              className='shrink-0
                rounded-3xl
                font-bold
                my-2
                text-black
                w-full h-12
                bg-green-500 
                cursor-pointer
                '
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.04 }}
            >Log in
            </motion.button>

          </>
        )
      }

    </div>
  )
}

export default HandleNumber