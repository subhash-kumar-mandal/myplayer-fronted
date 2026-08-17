import { Verified } from "lucide-react";
import React from "react";

const Hero = ({ artist }) => {
    return (
        <div
            className="
                @container
                h-64
                w-full
                z-0

                flex
                items-end
                gap-5
                @[700px]:gap-6

                px-4
                @[500px]:px-5
                @[700px]:px-6

                pb-6
                @[700px]:pb-8

                overflow-hidden
            "
            style={{
                background: `linear-gradient(
                    180deg,
                    ${artist.themeColor?.primary} 0%,
                    color-mix(
                        in srgb,
                        ${artist.themeColor?.primary} 40%,
                        black
                    ) 100%
                )`,
            }}
        >

            {/* ================= IMAGE ================= */}

            <div
                className="
                    shrink-0
                    w-32
                    h-32

                    @[500px]:w-40
                    @[500px]:h-40

                    @[700px]:w-48
                    @[700px]:h-48

                    rounded-full
                    overflow-hidden

                    border
                    border-(--background3)
                    shadow-2xl

                    cursor-pointer
                    hover:scale-[1.02]
                    transition-transform
                    duration-300
                "
            >
                <img
                    src={artist.image?.url}
                    alt={artist.name}
                    className="
                        h-full
                        w-full
                        object-cover
                    "
                />
            </div>


            {/* ================= CONTENT ================= */}

            <div
                className="
                    min-w-0
                    flex-1
                    -translate-y-6
                "
            >

                <div
                    className="
                        min-w-0
                        flex
                        flex-col
                        justify-end
                        gap-2
                    "
                >

                    {/* Artist name */}

                    <h2
                        className="
                            min-w-0
                            max-w-full

                            font-extrabold
                            uppercase

                            leading-[1.05]
                            break-words

                            text-3xl
                            @[500px]:text-4xl
                            @[700px]:text-5xl
                        "
                    >
                        {artist.name}
                    </h2>


                    {/* Verified */}

                    {artist.isVerified && (
                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                shrink-0

                                text-xs
                                @[500px]:text-sm
                                font-medium
                            "
                        >
                            <Verified
                                size={24}
                                className="
                                    shrink-0
                                    fill-green-500
                                    text-black
                                "
                            />

                            <span className="whitespace-nowrap">
                                Verified by Spotify
                            </span>
                        </div>
                    )}


                    {/* Stats */}

                    <div
                        className="
                            min-w-0
                            flex
                            flex-wrap
                            items-center

                            gap-x-1
                            gap-y-1

                            text-xs
                            @[500px]:text-sm

                            text-(--text-secondary)
                        "
                    >
                        <span>
                            {artist.followers} followers
                        </span>

                        <span>•</span>

                        <span>
                            {artist.monthlyListeners} monthly listeners
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Hero;