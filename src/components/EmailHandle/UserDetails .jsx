import { ChevronLeft, Info } from 'lucide-react';
import { motion } from 'motion/react';
import React, { use } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNameUser, setUserDOB, setUserGender } from '../../utils/Eamil.Slice';
import { useNavigate } from 'react-router-dom';
import VinylIcon from '../ui/vinyl-icon';


const months = [
    "Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const UserDetails = () => {

    const dispatch = useDispatch()
    const navi = useNavigate()

    const user = useSelector(state => state.user);

    const {
        name,
        gender,
        DOB
    } = user;

    const {
        dd,
        yyyy,
        month
    } = DOB;


    const [booleanDOB, setBooleanDOB] = React.useState({
        yyyy: false,
        dd: false,
        month: false,
        gender: false,
        name: false
    });

    const genders = [
        "Male",
        "Female",
        "Non-binary",
        "Something else",
        "Prefer not to say"
    ];

    // const [DivHover, setDivHover] = React.useState(false)
    
    const currentYear = new Date().getFullYear();




    return (



        <div
            className='bg-(--background-primary) w-screen h-screen scrollbar-none overflow-y-scroll  
    flex justify-center
    '
        >


            <div className=' flex  flex-col w-90      gap-6 items-center  pt-20 '>

                <VinylIcon  className="h-18 w-18 shrink-0 hover:text-green-400 transition-colors duration-300"  />
                <div className='h-[2px] w-125 shrink-0 rounded-3xl bg-(--text-secondary)'>

                    <div

                        className='h-full bg-green-400 transition-all duration-500  '
                        style={{
                            width: "70%"
                        }}
                    />

                </div>



                <div className='w-full flex items-center'>

                    <motion.div className=' w-10 cursor-pointer'
                        whileTap={{ scale: 0.90 }}
                        whileHover={{ scale: 1.09 }}
                        onClick={() => {
                            navi('/signup/email/step-1')
                        }}
                    >
                        <ChevronLeft size={30} className='text-(--text-secondary)' />
                    </motion.div>
                    <div>
                        <p className='text-(--text-secondary)'>Steps 2 to 3</p>
                        <p className='font-bold'>Tell us about yourself</p>
                    </div>
                </div>

                <div className='w-full flex-col shrink-0 gap-1 flex '>

                    <label htmlFor="name" className='font-bold'>Name</label>
                    <p className='text-[14px] text-(--text-secondary)'>This name will appear on your profile</p>
                    <input type="text"
                        id='name'
                        placeholder=''
                        value={name}
                        // onFocus={() => setDivHover(true)}
                        className='
                px-2
                rounded-[5px]
                border-(--text-secondary)
                border-2
                transition-all
                text-[16px]
                outline-none
                duration-500
                focus:border-2
                focus:border-white
                 h-12
                '
                        onChange={(e) => {
                            if (booleanDOB.name) {
                                setBooleanDOB(p => {
                                    return {
                                        ...p,
                                        name: false
                                    }
                                })
                            }
                            dispatch(setNameUser(e.target.value))
                        }}
                    />





                </div>
                {
                    booleanDOB.name && (
                        <div className=' w-full flex gap-2  text-red-500 items-center  rounded-[6px]'>

                            <Info size={16} className=' shrink-0' />
                            <p className=' text-[13px]'>

                                Enter a name for your profile.
                            </p>

                        </div>
                    )
                }





                <div className='w-full flex-col shrink-0 gap-1 flex '>

                    <label htmlFor="" className='font-bold'>Date of birth</label>
                    <p className='text-[14px] text-(--text-secondary)'>Why do we need your date of birth?<span className=' underline cursor-pointer'> Learn more</span>.</p>


                    <div className='w-full h-12 gap-2 flex'>
                        <input type="text"
                            id='yyyy'
                            placeholder="yyyy"
                            maxLength={4}

                            value={yyyy}
                            className='
                px-4
                w-22
                rounded-[5px]
                border-(--text-secondary)
                border-2
                transition-all
                text-[16px]
                outline-none
                duration-500
                focus:border-2
                focus:border-white
                 h-full
                '
                            onChange={(e) => {
                                const value = e.target.value;


                                if (booleanDOB.yyyy) {
                                    setBooleanDOB(p => {
                                        return {
                                            ...p,
                                            yyyy: false
                                        }
                                    })
                                }

                                if (/^\d{0,4}$/.test(value)) {
                                    dispatch(setUserDOB({ key: 'yyyy', value: value }))
                                }


                            }}

                        />



                        <select type="text"





                            className='
                px-2
                w-full
                rounded-[5px]
                border-(--text-secondary)
                border-2
                transition-all
                text-[16px]
                outline-none
                duration-500
                focus:border-2
                focus:border-white
                 h-full
                '
                            onChange={(e) => {
                                if (booleanDOB.month) {
                                    setBooleanDOB(p => {
                                        return {
                                            ...p,
                                            month: false
                                        }
                                    })
                                }
                            
                                dispatch(setUserDOB({key: 'month', value: e.target.value }))
                            }}
                        >
                        {
                            months.map(val => {
                                return <option key={val} className='bg-[#121212] text-white' > {val}</option>
                            })
                        }

                    </select>






                    <input type="text"
                        id='dd'
                        placeholder="dd"
                        maxLength={2}

                        value={dd}
                        className='
                px-4
                w-18
                rounded-[5px]
                border-(--text-secondary)
                border-2
                transition-all
                text-[16px]
                outline-none
                duration-500
                focus:border-2
                focus:border-white
                 h-full
                '
                        onChange={(e) => {
                            const value = e.target.value;



                            if (booleanDOB.dd) {
                                setBooleanDOB(p => {
                                    return {
                                        ...p,
                                        dd: false
                                    }
                                })
                            }

                            if (/^\d{0,2}$/.test(value)) {
                                dispatch(setUserDOB({ key: 'dd', value: value }))
                            }
                        }}
                    />





                </div>





            </div>

            <div className=' flex flex-col gap-2 w-full'>
                {
                    booleanDOB.dd && (
                        <div className=' w-full flex gap-2 px-2  text-red-500 items-center  rounded-[6px]'>

                            <Info size={16} className=' shrink-0' />
                            <p className=' text-[13px]'>
                                Please enter the day of your birth date (dd) by entering a number between 01 and 31.
                            </p>

                        </div>
                    )
                }
                {
                    booleanDOB.month && (
                        <div className=' w-full flex gap-2 px-2 py- text-red-500 items-center  rounded-[6px]'>

                            <Info size={16} className=' shrink-0' />
                            <p className=' text-[13px]'>
                                Select your birth month.
                            </p>

                        </div>
                    )
                }
                {
                    booleanDOB.yyyy && (
                        <div className=' w-full flex gap-2 px-2 py- text-red-500 items-center  rounded-[6px]'>

                            <Info size={16} className=' shrink-0' />
                            <p className=' text-[13px]'>

                                Please enter a birth year (yyyy) from 1900 onwards.
                            </p>

                        </div>
                    )
                }
            </div>



            <div className='w-full flex-col shrink-0 gap-1 flex '>

                <label htmlFor="" className='font-bold'>Gender</label>
                <p className='text-[14px] text-(--text-secondary)'>We use your gender to help personalise our content recommendations and ads for you.</p>



                <div className="flex flex-wrap gap-5 w-full">
                    {genders.map((item) => (
                        <label
                            key={item}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="gender"
                                value={item}
                                checked={gender === item}
                                onChange={(e) =>{ 
                                    
                                    if(booleanDOB.gender){
                                        setBooleanDOB(p=>{
                                            return{
                                                ...p,
                                                gender:false
                                            }
                                        })
                                    }

                                    dispatch(setUserGender(e.target.value))
                                
                                }}
                                className="
                            appearance-none
    w-4
    h-4
    rounded-full
    border
    border-gray-400
    cursor-pointer

    checked:border-[4px]
    checked:border-green-500
                            "
                            />

                            <span>{item}</span>
                        </label>
                    ))}
                </div>

            </div>
            {
                booleanDOB.gender && (
                    <div className=' w-full flex gap-2  text-red-500 items-center  rounded-[6px]'>

                        <Info size={16} className=' shrink-0' />
                        <p className=' text-[13px]'>

                            Select your gender.
                        </p>

                    </div>
                )
            }


            <motion.button
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

                onClick={() => {
                    const year = Number(yyyy);
                    const day = Number(dd);


                    const FlagYear = yyyy.length !== 4 || year < 1900 || year > currentYear;
                    const Flag_dd = dd.length !== 2 || day < 1 || day > 31
                    const Flag_Month = month === "Month";
                    const flag_Name = name.length < 3 || name.length > 60
                    const gender_flag = gender?.trim() === '' || !genders.some(val => val === gender);

                    if (FlagYear || Flag_dd || Flag_Month || flag_Name || gender_flag) {



                        setBooleanDOB({
                            yyyy: FlagYear,
                            dd: Flag_dd,
                            month: Flag_Month,
                            gender: gender_flag,
                            name: flag_Name
                        })

                        return
                    };



                    navi('/signup/email/step-3')

                }}
            >Next
            </motion.button>




        </div>



        </div >
    )
}

export default UserDetails 