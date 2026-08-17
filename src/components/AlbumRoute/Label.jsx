import React from 'react'

const Label = ({ album }) => {

    const date = album?.releaseDate || new Date().toISOString();
    const formatted = new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",   // January, February...
        year: "numeric",
    });

  
    const last = formatted.split(' ');
   



    return (
        <div className='w-full  text-(--text-secondary) mb-10  h-20 py-4 px-8'>
            <h1 className=' text-[14px]'>
                {
                    formatted 
                }
            </h1>
            <p className='text-[12px]'>
                © {last.at(-1)} {album.label}
            </p>

        </div>
    )
}

export default Label