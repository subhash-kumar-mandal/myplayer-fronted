import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = ({ album }) => {
    const navigate = useNavigate();

    const date = album?.releaseDate || new Date().toISOString();
    const releaseYear = new Date(date).getFullYear();

    const minutes = Math.floor(album.fullDuration / 60);
    const seconds = Math.floor(album.fullDuration % 60);

    const duration = `${minutes} mins ${seconds
        .toString()
        .padStart(2, "0")} sec`;

    return (
        <div
            className="
                @container
                h-64
                w-full
                flex
                items-end
                gap-4
                @[500px]:gap-5
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
                    ${album.themeColor?.primary} 0%,
                    color-mix(
                        in srgb,
                        ${album.themeColor?.primary} 40%,
                        black
                    ) 100%
                )`,
            }}
        >

            {/* Cover */}
            <div
                className="
                    shrink-0
                    w-32
                    h-32
                    @[500px]:w-40
                    @[500px]:h-40
                    @[700px]:w-48
                    @[700px]:h-48
                    @[800px]:w-54
                    @[800px]:h-54
                    rounded-[5px]
                    overflow-hidden
                    cursor-pointer
                    hover:scale-[1.02]
                    transition-transform
                    duration-300
                    border
                    border-(--background3)
                    shadow-2xl
                "
            >
                <img
                    src={album.image.url}
                    alt={album.name}
                    className="h-full w-full object-cover"
                />
            </div>


            {/* Album information */}
            <div className="min-w-0 flex-1">

                <div className="flex flex-col gap-2 min-w-0">

                    {/* Album type */}
                    <p
                        className="
                            text-xs
                            @[500px]:text-sm
                            font-medium
                            capitalize
                        "
                    >
                        {album.type}
                    </p>


                    {/* Album name */}
                    <h1
                        className="
                            min-w-0
                            max-w-full
                            font-[800]
                            uppercase
                            leading-[1.05]
                            break-words
                            text-3xl
                            @[500px]:text-3xl
                            @[700px]:text-5xl
                        "
                    >
                        {album.name}
                    </h1>


                    {/* Metadata */}
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-x-2
                            gap-y-1
                            min-w-0
                        "
                    >

                        {/* Artists */}
                        <div className="flex items-center shrink-0">

                            {/* Artist images */}
                            <div
                                className="relative h-5 shrink-0"
                                style={{
                                    width: `${20 + (album.artists.length - 1) * 12}px`,
                                }}
                            >
                                {album.artists.map((artist, index) => (
                                    <img
                                        key={artist._id}
                                        src={artist?.image?.url}
                                        alt={artist.name}
                                        className="
                                            absolute
                                            top-1/2
                                            -translate-y-1/2
                                            h-5
                                            w-6
                                            rounded-full
                                            object-cover
                                            ring-2
                                            ring-black/40
                                            cursor-pointer
                                            transition-transform
                                            duration-200
                                            hover:scale-110
                                        "
                                        style={{
                                            left: `${index * 12}px`,
                                            zIndex: album.artists.length - index,
                                        }}
                                    />
                                ))}
                            </div>


                            {/* Artist names */}
                            <div className="pl-2 flex flex-wrap gap-x-1">

                                {album.artists.map((artist, index) => (
                                    <React.Fragment key={artist._id}>

                                        <span
                                            className="
                                                font-bold
                                                text-xs
                                                @[500px]:text-sm
                                                capitalize
                                                hover:underline
                                                cursor-pointer
                                                whitespace-nowrap
                                            "
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/artist/${artist._id}`);
                                            }}
                                        >
                                            {artist.name}
                                        </span>

                                        {index < album.artists.length - 1 && (
                                            <span>•</span>
                                        )}

                                    </React.Fragment>
                                ))}

                            </div>
                        </div>


                        {/* Release metadata */}
                        <div
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-x-1
                                text-xs
                                @[500px]:text-sm
                                text-(--text-secondary)
                            "
                        >
                            <span>{releaseYear}</span>
                            <span>•</span>
                            <span>{album.countSongs} Songs</span>
                            <span>•</span>
                            <span>{duration}</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Hero;