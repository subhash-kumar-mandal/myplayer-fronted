import React from 'react'
import FaceBookIcon from './FaceBookIcon'
import X_Icon from './X_Icon'
import InstagramIcon from './InstagramIcon'

// const Footer = () => {
//   return (
//     <div className=' flex flex-col   h-[340px] pt-[30px] pb-[40px] px-[30px] border-t 
//       border-(--border-color)'
// //     style={{
// //         background:
// // "linear-gradient(to bottom,rgba(255,255,255,.03),transparent 80%)"
// //     }}

//     >
    
    
//                     <div className=' flex gap-3  w-full border-b-(--background3) border-b'>
    
//                         <div
//                             className='h-[214px] gap-1 grid grid-cols-[148px_148px_155px_155px_1fr]  '
//                         >
    
//                             <div
//                                 className='flex gap-2 flex-col '
//                             >
    
//                                 <h2 className='font-bold ' >
//                                     Company
//                                 </h2>
    
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]'>About</p>
//                                 <p className="text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]">Jobs</p>
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]' >For the Record</p>
    
    
//                             </div>
    
//                             <div
//                                 className='flex gap-2 flex-col '
//                             >
    
//                                 <h2 className='font-bold ' >
//                                     Communities
//                                 </h2>
    
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]'>For Artists</p>
//                                 <p className="text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]">Developers</p>
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]' >Advertising</p>
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]'>Investors</p>
//                                 <p className="text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]">Vendors</p>
    
    
//                             </div>
    
    
//                             <div
//                                 className='flex gap-2 flex-col '
//                             >
    
//                                 <h2 className='font-bold ' >
//                                     Useful links
//                                 </h2>
    
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]'>Support</p>
//                                 <p className="text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]">Free Mobile App</p>
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]' >Popular by Country</p>
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]'>Top Song Lyrics</p>
//                                 <p className="text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]">Import your music</p>
    
    
//                             </div>
    
    
//                             <div
//                                 className='flex gap-2 flex-col '
//                             >
    
//                                 <h2 className='font-bold ' >
//                                     Spotify Plans
//                                 </h2>
    
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]'>Premium Standard</p>
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]' >Premium Platinum</p>
//                                 <p className='text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]'>Premium Student</p>
//                                 <p className="text-(--text-secondary) cursor-pointer   hover:text-(--text) text-[15px]">Spotify Free</p>
    
    
//                             </div>
    
    
//                         </div>
    
    
//                         <div className=' flex gap-5 w-full h-full  justify-end '>
    
//                             <div
//                                 className='bg-(--background3) rounded-full h-10 w-10 hover:bg-(--text-secondary) hover:scale-[1.08] transition-all duration-150 flex items-center justify-center'
//                             >
//                                 <InstagramIcon className='' />
//                             </div>
    
//                             <div
//                                 className='bg-(--background3) rounded-full h-10 w-10 hover:scale-[1.08] hover:bg-(--text-secondary) transition-all duration-150 flex items-center justify-center'
//                             >
//                                 <X_Icon className='' />
//                             </div>
//                             <div
//                                 className='bg-(--background3) rounded-full h-10 w-10 hover:scale-[1.08] hover:bg-(--text-secondary) transition-all duration-150 flex items-center justify-center'
//                             >
//                                 <FaceBookIcon className='' />
//                             </div>
    
    
//                         </div>
    
//                     </div>
    
    
    
//                     <div 
//                      className='flex justify-between pt-[30px] '
//                     >
//                         <div
//                             className='flex gap-4 '
//                         >
//                             <p>Legal</p>
//                             <p> Safety & Privacy Center</p>
//                             <p> Privacy Policy</p>
//                             <p>Cookies</p>
//                             <p>About Ads</p>
//                             <p>Accessibility</p>
//                         </div>
    
//                         <div>© 2026 Spotify AB</div>
//                     </div>
    
//                 </div>
//   )
// }

// export default Footer








const Footer = () => {
    const linkClass = `
        text-[14px]
        text-(--text-secondary)
        cursor-pointer
        hover:text-(--text)
        transition-colors
        duration-200
    `;

    const socialClass = `
        shrink-0
        h-10
        w-10
        rounded-full
        bg-(--background3)
        flex
        items-center
        justify-center
        hover:bg-(--text-secondary)
        hover:scale-[1.08]
        transition-all
        duration-150
    `;

    return (
        <footer
            className="
                @container
                w-full
                min-w-0
                overflow-hidden
                border-t
                border-(--border-color)
                px-5
                py-8
                text-(--text)
            "
        >

            {/* ================= TOP ================= */}

            <div
                className="
                    w-full
                    min-w-0
                    flex
                    flex-col
                    gap-8
                    border-b
                    border-(--background3)
                    pb-8

                    @[700px]:flex-row
                    @[700px]:justify-between
                    @[700px]:items-start
                "
            >

                {/* ================= LINKS ================= */}

                <div
                    className="
                        min-w-0
                        w-full
                        grid
                        grid-cols-2
                        gap-x-6
                        gap-y-8
                        @[500px]:px-3
                        @[500px]:grid-cols-2
                        @[700px]:grid-cols-4
                    "
                >

                    {/* Company */}
                    <div className="min-w-0 flex flex-col gap-2">
                        <h2 className="font-bold">
                            Company
                        </h2>

                        <p className={linkClass}>About</p>
                        <p className={linkClass}>Jobs</p>
                        <p className={linkClass}>For the Record</p>
                    </div>


                    {/* Communities */}
                    <div className="min-w-0 flex flex-col gap-2">
                        <h2 className="font-bold">
                            Communities
                        </h2>

                        <p className={linkClass}>For Artists</p>
                        <p className={linkClass}>Developers</p>
                        <p className={linkClass}>Advertising</p>
                        <p className={linkClass}>Investors</p>
                        <p className={linkClass}>Vendors</p>
                    </div>


                    {/* Useful links */}
                    <div className="min-w-0 flex flex-col gap-2">
                        <h2 className="font-bold">
                            Useful links
                        </h2>

                        <p className={linkClass}>Support</p>
                        <p className={linkClass}>Free Mobile App</p>
                        <p className={linkClass}>Popular by Country</p>
                        <p className={linkClass}>Top Song Lyrics</p>
                        <p className={linkClass}>Import your music</p>
                    </div>


                    {/* Plans */}
                    <div className="min-w-0 flex flex-col gap-2">
                        <h2 className="font-bold">
                            Spotify Plans
                        </h2>

                        <p className={linkClass}>Premium Standard</p>
                        <p className={linkClass}>Premium Platinum</p>
                        <p className={linkClass}>Premium Student</p>
                        <p className={linkClass}>Spotify Free</p>
                    </div>

                </div>


                {/* ================= SOCIAL ================= */}

                <div
                    className="
                        shrink-0
                        flex
                        gap-4
                        
                        @[700px]:pt-0
                    "
                >

                    <div className={socialClass}>
                        <InstagramIcon />
                    </div>

                    <div className={socialClass}>
                        <X_Icon />
                    </div>

                    <div className={socialClass}>
                        <FaceBookIcon />
                    </div>

                </div>

            </div>


            {/* ================= BOTTOM ================= */}

            <div
                className="
                    w-full
                    min-w-0
                    flex
                    flex-col
                    gap-5
                    pt-6

                    @[800px]:flex-row
                    @[800px]:items-center
                    @[800px]:justify-between
                "
            >

                <div
                    className="
                        min-w-0
                        flex
                        flex-wrap
                        gap-x-4
                        gap-y-2
                    "
                >
                    <p className={linkClass}>Legal</p>
                    <p className={linkClass}>Safety & Privacy Center</p>
                    <p className={linkClass}>Privacy Policy</p>
                    <p className={linkClass}>Cookies</p>
                    <p className={linkClass}>About Ads</p>
                    <p className={linkClass}>Accessibility</p>
                </div>

                <p className="
                    shrink-0
                    text-sm
                    text-(--text-secondary)
                ">
                    © 2026 Spotify AB
                </p>

            </div>

        </footer>
    );
};

export default Footer;