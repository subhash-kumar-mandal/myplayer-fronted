import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header'
import { ImageUp, Send } from 'lucide-react';

import { Album_GENRES, ALL_MOODS } from '../../../services/AllGenres'
import { apifetch, fetchPOST, URL_OBJECT } from '@/services/fetchHandleAll';
import { useSelector } from 'react-redux';

export const ALL_GENRES = [
    "Pop",
    "Rock",
    "Hip-Hop",
    "Rap",
    "R&B",
    "Jazz",
    "Blues",
    "Classical",
    "Country",
    "Folk",
    "Electronic",
    "EDM",
    "House",
    "Techno",
    "Trance",
    "Dubstep",
    "Lo-fi",
    "Ambient",
    "Instrumental",
    "Acoustic",

    "Romantic",
    "Sad",
    "Emotional",
    "Dance",
    "Party",
    "Workout",
    "Motivational",
    "Chill",
    "Sleep",
    "Meditation",



    "Bollywood",
    "Sufi",
    "Qawwali",
    "Ghazal",
    "Bhajan",
    "Devotional",
    "Kirtan",

    "Funk",
    "Brazilian Funk",
    'Montagem Funk',
    "Funk Carioca",

    "Playback Singer",

    "Indie",
    "Alternative",
    "Metal",
    "Heavy Metal",
    "Punk",
    "Reggae",
    "Latin",
    "Afro",
    "K-Pop",
    "J-Pop"
];



const AlbumAdd = () => {

    const { accessToken } = useSelector(val => val.userContext);

    const [loading, setLoading] = useState(false);

    const [albumInfo, setAlbumInfo] = useState({
        name: "",
        type: "album",
        label: "",
        image: null,

    })
    const imageRef = useRef(null);
    const [coverPreview, setCoverPreview] = useState(null);


    function handleChange(key, value) {
        setAlbumInfo(prev => ({
            ...prev,
            [key]: value
        }))
    };


    const [releaseDate, setReleaseDate] = useState('')

    const genreContainerRef = useRef(null)
    const [searchGenre, setSearchGenre] = useState('')
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genreOpen, setGenreOpen] = useState(false);



    const containerRef = useRef(null)
    const [openToggle, setOpenToggle] = useState(false)
    const [searchArtist, setSearchArtist] = useState('');
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [artists, setArtists] = useState([]);

    const filterArtist = artists.filter(artist => (
        artist.name.toLowerCase().includes(searchArtist.toLowerCase())
    ))



    const ImageHandle = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Only images allowed");
            return;
        }

        if (coverPreview) {
            URL.revokeObjectURL(coverPreview);
        }

        setCoverPreview(URL.createObjectURL(file));

        handleChange("image", file);

    };





    const filterGenre = Album_GENRES.filter((genre) => {

        const match = genre
            .toLowerCase()
            .includes(searchGenre.toLowerCase());

        const alreadySelected = selectedGenres.includes(genre);

        return match && !alreadySelected;

    });

    const genreMoodContainerRef = useRef(null)
    const [searchGenreMood, setSearchGenreMood] = useState('')
    const [selectedGenreMoods, setSelectedGenreMoods] = useState([]);
    const [genreOpenMood, setGenreOpenMood] = useState(false);

    const filterMood = ALL_MOODS.filter((mood) => {

        const match = mood
            .toLowerCase()
            .includes(searchGenreMood.toLowerCase());

        const alreadySelected = selectedGenreMoods.includes(mood);

        return match && !alreadySelected;

    });





    async function UploadData() {

        const Send = new FormData();

        Send.append('name', albumInfo.name);
        Send.append('type', albumInfo.type)
        Send.append('image', albumInfo.image);
        Send.append('genreMoods', JSON.stringify(selectedGenreMoods));
        Send.append('artists', JSON.stringify(selectedArtists.map(val => val._id)));
        Send.append('genres', JSON.stringify(selectedGenres));
        Send.append('label', albumInfo.label);
        Send.append("releaseDate", releaseDate);



        setLoading(true)

        const res1 = await fetchPOST('http://localhost:2000/album/create', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include'
        }, Send);

        console.log(res1);
        setLoading(false)


    }





    useEffect(() => {

        async function artitsNameFetch() {
            try {






                const artistRes = await apifetch("http://localhost:2000/artist/admin/names", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    credentials: 'include'
                })


                const arts = artistRes


                setArtists(arts.artists)




            } catch (err) {
                console.log(err)
            }
        }
        artitsNameFetch()

    }, [])





    useEffect(() => {

        function handleClickOutSide(e) {

            if (
                genreContainerRef.current &&
                !genreContainerRef.current.contains(e.target)
            ) {
                setGenreOpen(false);
            }

            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpenToggle(false)
            }

            if (genreMoodContainerRef.current && !genreMoodContainerRef.current.contains(e.target)) {
                setGenreOpenMood(false);
            }

        };

        document.addEventListener('mousedown', handleClickOutSide);


        // remove every render for past event join mousedown free memory leak
        return () => document.removeEventListener('mousedown', handleClickOutSide)

    }, []);




    return (
        <div
            className='
    max-w-5xl
     mx-auto 
     py-10 
     px-26 
     space-y-10  
     h-165  
     overflow-y-scroll 
     spotify-scroll 
     bg-(--background1)
     rounded-xl'
        >
            <Header Route={'/admin/albums'} heading={"Add New Album"} subHeading={'Upload a new album to your music library'} />



            <div className='flex flex-col gap-2'>

                <label
                    htmlFor='albumName'
                    className='text-(--text-secondary) text-lg'
                >
                    Album Name
                </label>

                <input
                    type="text"
                    spellCheck='false'
                    placeholder='Enter album name'
                    id="albumName"
                    value={albumInfo.name}

                    onChange={(e) => {
                        handleChange('name', e.target.value)
                    }}

                    className='
                    h-12 
                    rounded-md
                    bg-(--background-secondary)
                    border
                    border-transparent
                    px-4
                    outline-none

                    transition-all
                    duration-300

                    focus:border-(--spotify-green)

                    '

                />

            </div>

            <div className='flex flex-col gap-2'>

                <label
                    htmlFor='label'
                    className='text-(--text-secondary) text-lg'
                >
                    label
                </label>

                <input
                    type="text"
                    spellCheck='false'
                    placeholder='copyright Patner..'
                    id="label"
                    value={albumInfo.label}

                    onChange={(e) => {
                        handleChange('label', e.target.value)
                    }}

                    className='
                    h-12 
                    rounded-md
                    bg-(--background-secondary)
                    border
                    border-transparent
                    px-4
                    outline-none

                    transition-all
                    duration-300

                    focus:border-(--spotify-green)

                    '

                />

            </div>

            <div className='flex flex-col gap-2'>

                <label
                    htmlFor='data'
                    className='text-(--text-secondary) text-lg'
                >
                    Date
                </label>

                <input
                    type="date"


                    id="date"
                    value={releaseDate}

                    onChange={(e) => {
                        setReleaseDate(e.target.value);
                    }}

                    className='
                    h-12 
                    rounded-md
                    bg-(--background-secondary)
                    border
                    border-transparent
                    px-4
                    outline-none

                    transition-all
                    duration-300

                    focus:border-(--spotify-green)

                    '

                />

            </div>




            <div className='flex flex-col gap-3 mt-6'>


                <label
                    htmlFor=''
                    className='text-(--text-secondary) text-lg'
                >
                    Song Type
                </label>

                <div className='flex gap-3'>


                    <button
                        type='button'
                        onClick={() => handleChange('type', "single")}

                        className={`
                     h-11
                     px-6 
                     rounded-full

                     transition-all
                     duration-300

                     ${albumInfo.type === 'single'
                                ? "bg-(--spotify-green) text-black"
                                : "bg-(--background-secondary)"
                            }
                     `}

                    >
                        Single
                    </button>

                    <button
                        type='button'
                        onClick={() => handleChange('type', "album")}

                        className={`
                     h-11
                     px-6 
                     rounded-full

                     transition-all
                     duration-300

                     ${albumInfo.type === 'album'
                                ? "bg-(--spotify-green) text-black"
                                : "bg-(--background-secondary)"
                            }
                     `}

                    >
                        album
                    </button>

                    <button
                        type='button'
                        onClick={() => handleChange('type', "ep")}

                        className={`
                     h-11
                     px-6 
                     rounded-full

                     transition-all
                     duration-300

                     ${albumInfo.type === 'ep'
                                ? "bg-(--spotify-green) text-black"
                                : "bg-(--background-secondary)"
                            }
                     `}

                    >
                        Ep
                    </button>


                </div>
            </div>





            <div
                ref={containerRef}
                className="flex flex-col gap-3 relative">

                <label
                    htmlFor="searchArtists"
                    className="text-(--text-secondary) text-lg"
                >
                    Search Artists
                </label>

                <input
                    id="searchArtists"
                    type="text"
                    placeholder="Search Artist..."
                    value={searchArtist}
                    onFocus={() => setOpenToggle(true)}
                    onChange={(e) => setSearchArtist(e.target.value)}
                    className="
            h-12
            rounded-md
            bg-(--background-secondary)
            border
            border-transparent
            px-4
            outline-none
            transition-all
            duration-300
            focus:border-(--spotify-green)
        "
                />

                {/* Search Result */}

                {

                    openToggle && (
                        <div

                            className="
                            absolute top-full  left-0 right-0 z-20
            max-h-48
            mt-2
            spotify-scroll
            overflow-y-auto
            rounded-md
            bg-(--background-secondary)
            border
            border-(--border-color)
        "
                        >
                            {
                                filterArtist.map((artist) => (

                                    <div
                                        key={artist._id}
                                        onClick={() => {

                                            const already = selectedArtists.find(
                                                item => item._id === artist._id
                                            );

                                            if (already) return;

                                            setSelectedArtists(prev => [
                                                ...prev,
                                                artist
                                            ]);

                                        }}

                                        className="
                                        flex items-center gap-5
                        px-4
                        py-3
                        cursor-pointer
                        border-b
                        border-(--border-color)
                        transition-all
                        duration-200
                        hover:bg-(--bg-hover1)
                        hover:text-(--spotify-green)
                    "
                                    >
                                        <img src={artist.image.url} className='h-12 rounded-sm  w-12' alt="" />
                                        <p>
                                            {artist.name}
                                        </p>
                                    </div>

                                ))
                            }
                        </div>

                    )

                }
                {/* Selected Artists */}

                <div className="flex flex-wrap gap-2">

                    {
                        selectedArtists.map((artist) => (

                            <div
                                key={artist._id}
                                className="
                        flex
                        items-center
                        gap-2
                        bg-(--spotify-green)
                        text-black
                        rounded-full
                        px-4
                        py-2
                    "
                            >

                                <span>{artist.name}</span>

                                <button
                                    onClick={() => {

                                        setSelectedArtists(prev =>
                                            prev.filter(
                                                item => item._id !== artist._id
                                            )
                                        );

                                    }}

                                    className="
                            h-5
                            w-5
                            rounded-full
                            bg-black/20
                            text-sm
                            cursor-pointer
                            hover:bg-black/40
                        "
                                >
                                    ✕
                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>






            <div
                ref={genreContainerRef}
                className="relative flex flex-col gap-3"
            >

                <label
                    htmlFor="searchGenre"
                    className="text-(--text-secondary) text-lg"
                >
                    Genres
                </label>

                <input
                    id="searchGenre"
                    type="text"
                    placeholder="Search Genre..."
                    value={searchGenre}
                    onFocus={() => setGenreOpen(true)}
                    onChange={(e) => setSearchGenre(e.target.value)}
                    className="
            h-12
            rounded-md
            bg-(--background-secondary)
            border
            border-transparent
            px-4
            outline-none
            transition-all
            duration-300
            focus:border-(--spotify-green)
        "
                />

                {
                    genreOpen && (

                        <div
                            className="
                    absolute
                    top-full
                    left-0
                    right-0
                    mt-2
                    max-h-48
                    overflow-y-auto
                    spotify-scroll
                    rounded-md
                    bg-(--background-secondary)
                    border
                    border-(--border-color)
                    z-20
                "
                        >

                            {
                                filterGenre.map((mood) => (

                                    <div
                                        key={mood}
                                        onClick={() => {

                                            setSelectedGenres(prev => [
                                                ...prev,
                                                mood
                                            ]);

                                            setSearchGenre("");

                                            setGenreOpen(false);

                                        }}
                                        className="
                                px-4
                                py-3
                                cursor-pointer
                                border-b
                                border-(--border-color)
                                transition-all
                                duration-200
                                hover:bg-(--bg-hover1)
                                hover:text-(--spotify-green)
                            "
                                    >
                                        {mood}
                                    </div>

                                ))
                            }

                        </div>

                    )
                }

                <div className="flex flex-wrap gap-2">

                    {
                        selectedGenres.map((mood) => (

                            <div
                                key={mood}
                                className="
                        flex
                        items-center
                        gap-2
                        bg-(--spotify-green)
                        text-black
                        rounded-full
                        px-4
                        py-2
                    "
                            >

                                <span>{mood}</span>

                                <button
                                    onClick={() => {

                                        setSelectedGenres(prev =>
                                            prev.filter(item => item !== mood)
                                        );

                                    }}
                                    className="
                            h-5
                            w-5
                            rounded-full
                            bg-black/20
                            text-sm
                            cursor-pointer
                            hover:bg-black/40
                        "
                                >
                                    ✕

                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>




            {/* Handle moods genres */}
            <div
                ref={genreMoodContainerRef}
                className="relative flex flex-col gap-3"
            >

                <label
                    htmlFor="searchGenreMood"
                    className="text-(--text-secondary) text-lg"
                >
                    Genres Moods
                </label>

                <input
                    id="searchGenreMood"
                    type="text"
                    placeholder="Search Genre Moods..."
                    value={searchGenreMood}
                    onFocus={() => setGenreOpenMood(true)}
                    onChange={(e) => setSearchGenreMood(e.target.value)}
                    className="
            h-12
            rounded-md
            bg-(--background-secondary)
            border
            border-transparent
            px-4
            outline-none
            transition-all
            duration-300
            focus:border-(--spotify-green)
        "
                />

                {
                    genreOpenMood && (

                        <div
                            className="
                    absolute
                    top-full
                    left-0
                    right-0
                    mt-2
                    max-h-48
                    overflow-y-auto
                    spotify-scroll
                    rounded-md
                    bg-(--background-secondary)
                    border
                    border-(--border-color)
                    z-20
                "
                        >

                            {
                                filterMood.map((mood) => (

                                    <div
                                        key={mood}
                                        onClick={() => {

                                            setSelectedGenreMoods(prev => [
                                                ...prev,
                                                mood
                                            ]);

                                            setSearchGenreMood("");

                                            setGenreOpenMood(false);

                                        }}
                                        className="
                                px-4
                                py-3
                                cursor-pointer
                                border-b
                                border-(--border-color)
                                transition-all
                                duration-200
                                hover:bg-(--bg-hover1)
                                hover:text-(--spotify-green)
                            "
                                    >
                                        {mood}
                                    </div>

                                ))
                            }

                        </div>

                    )
                }

                <div className="flex flex-wrap gap-2">

                    {
                        selectedGenreMoods.map((mood) => (

                            <div
                                key={mood}
                                className="
                        flex
                        items-center
                        gap-2
                        bg-(--spotify-green)
                        text-black
                        rounded-full
                        px-4
                        py-2
                    "
                            >

                                <span>{mood}</span>

                                <button
                                    onClick={() => {

                                        setSelectedGenreMoods(prev =>
                                            prev.filter(item => item !== mood)
                                        );

                                    }}
                                    className="
                            h-5
                            w-5
                            rounded-full
                            bg-black/20
                            text-sm
                            cursor-pointer
                            hover:bg-black/40
                        "
                                >
                                    ✕

                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>










            <div className="flex flex-col gap-3">


                <label className="text-(--text-secondary) text-lg">
                    Cover Image
                </label>

                <input
                    ref={imageRef}
                    type="file"
                    className="hidden"
                    onChange={ImageHandle}
                />

                <div
                    onClick={() => imageRef.current.click()}
                    className="
            group
            relative
            h-72
            rounded-xl

            border-2
            border-dashed
            border-(--border-color)

            bg-(--background-secondary)

            flex
            flex-col
            items-center
            justify-center
            gap-5

            cursor-pointer

            transition-all
            duration-300

            hover:border-(--spotify-green)
            hover:bg-(--bg-hover1)
        "
                >

                    {
                        coverPreview ?

                            <img
                                src={coverPreview}
                                className="
                        h-36
                        w-36
                        rounded-lg
                        object-cover

                        transition-all
                        duration-300

                        group-hover:scale-105
                    "
                            />

                            :

                            <ImageUp
                                size={65}
                                className="
                        text-(--text-secondary)

                        transition-all
                        duration-300

                        group-hover:text-(--spotify-green)
                        group-hover:-translate-y-1
                    "
                            />

                    }

                    <div className="text-center">

                        <h3 className="text-lg font-medium">

                            {
                                albumInfo.image
                                    ? albumInfo.image.name
                                    : "Upload Cover"
                            }

                        </h3>

                        <p className="text-sm text-(--text-secondary)">

                            JPG • PNG • WEBP

                        </p>

                    </div>

                </div>

            </div>






            <div className="flex justify-end gap-4 pt-8">

                {/* Cancel */}

                <button
                    type="button"
                    className="
            h-11
            px-8

            rounded-full

            border
            border-(--border-color)

            text-(--text-secondary)

            font-medium

            transition-all
            duration-300

            cursor-pointer

            hover:bg-(--bg-hover1)
            hover:text-white
        "
                    onClick={() => { }}
                >
                    Cancel
                </button>

                {/* Save */}

                <button
                    type="submit"
                    disabled={loading}
                    className={`
            h-11
            px-10

            rounded-full

            bg-(--spotify-green)

            text-black

            font-semibold

            transition-all
            duration-300

            ${loading
                            ? "opacity-60 cursor-not-allowed"
                            : "cursor-pointer hover:scale-105 active:scale-95"}
        `}
                    onClick={UploadData}
                >
                    {loading ? "Saving..." : "Save Song"}
                </button>

            </div>






        </div>
    )
}

export default AlbumAdd