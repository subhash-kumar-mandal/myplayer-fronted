import { Music2 } from 'lucide-react'
import React from 'react'

const EmptyRight = () => {
    return (
        <div className='h-full w-full '>
            <div className="flex h-full flex-col items-center justify-center text-center px-6">
                <Music2 className="w-12 h-12 text-neutral-500" />
                <h2 className="mt-4 text-lg font-semibold text-white">
                    Nothing Playing
                </h2>
                <p className="mt-2 text-sm text-neutral-400">
                    Play a song to see artist details,
                    credits and queue.
                </p>
            </div>

        </div>
    )
}

export default EmptyRight