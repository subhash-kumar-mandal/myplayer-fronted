import React, { useEffect, useRef, useState } from 'react'

import Header from '../Header'
import { ImageUp } from 'lucide-react';
import { fetchPOST, URL_OBJECT } from '@/services/fetchHandleAll';
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
    "Ambient",
    "Instrumental",
    "Acoustic",

    "Bollywood",
    "Punjabi",
    "Sufi",
    "Qawwali",
    "Ghazal",
    "Bhajan",
    "Devotional",

    "Indie",
    "Alternative",
    "Metal",
    "Heavy Metal",
    "Punk",
    "Reggae",
    "Latin",
    "Afrobeats",
    "Indian Pop",
    "Punjabi Pop",
    "Hindi Pop",
    "Film Soundtrack",
    "Dance Pop",
    'Trap',
    "Urban"
    ,

    "K-Pop",
    "J-Pop",
    "Funk",
    "Brazilian Funk",
    'Montagem Funk',
    "Funk Carioca",
    "Playback Singer",
    "Film Score",
    "Soundtrack",
    "Baile Funk",
    "Jersey Club",
    "Phonk"
];

const ArtistAdd = () => {
    const { accessToken } = useSelector(val => val.userContext);
    const genreContainerRef = useRef(null)
    const imageRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [artistInfo, setArtistInfo] = useState({
        name: '',
        bio: '',
        isVerified: false,
        image: null
    })

    const [coverPreview, setCoverPreview] = useState(null);

    const [searchGenre, setSearchGenre] = useState('')
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genreOpen, setGenreOpen] = useState(false);

    function handleChange(key, value) {
        setArtistInfo(prev => ({
            ...prev,
            [key]: value
        }))
    };



    const filterGenre = ALL_GENRES.filter((genre) => {

        const match = genre
            .toLowerCase()
            .includes(searchGenre.toLowerCase());

        const alreadySelected = selectedGenres.includes(genre);

        return match && !alreadySelected;

    });


    const ClearForm = () => {

        handleChange('name', '');
        handleChange('bio', '');
        handleChange('isVerified', false);
        handleChange('image', null);
        setCoverPreview(null);
        setSelectedGenres([]);
        setSearchGenre('');

    }




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


    async function UploadData() {

        const data = new FormData();

        data.append("name", artistInfo.name);
        data.append("bio", artistInfo.bio);
        data.append('isVerified', JSON.stringify(artistInfo.isVerified));
        data.append("image", artistInfo.image);
        data.append('genres', JSON.stringify(selectedGenres))





        try {

            setLoading(true)
            const res = await fetchPOST(URL_OBJECT.BASE_URL + "/artist/create", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include'
            }, data);

            if(!res.success) throw new Error(res.message)

            console.log(res)



        } catch (err) {
            console.log("CATCH BLOCK", err)
        }
        finally {

            setLoading(false)

            ClearForm()

        }


    }






    useEffect(() => {

        function handleClickOutSide(e) {

            if (
                genreContainerRef.current &&
                !genreContainerRef.current.contains(e.target)
            ) {
                setGenreOpen(false);
            }

        };

        document.addEventListener('mousedown', handleClickOutSide);


        // remove every render for past event join mousedown free memory leak
        return () => document.removeEventListener('mousedown', handleClickOutSide)

    }, [])



    return (
        <div
            className='max-w-5xl
     mx-auto 
     py-10 
     px-26 
     space-y-10  
     h-165  
     overflow-y-scroll 
     spotify-scroll 
     bg-(--background1)
     rounded-xl
     '
        >
            <Header Route={'/admin/artists'} heading={"Add New Artist"} subHeading={'Upload a new artist to your music library'} />


            <div className='flex flex-col gap-2'>

                <label
                    htmlFor='artistName'
                    className='text-(--text-secondary) text-lg'
                >
                    Artist Name
                </label>

                <input
                    type="text"
                    spellCheck='false'
                    placeholder='Enter song name'
                    id="artistName"
                    value={artistInfo.name}

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




            <div className='flex items-center justify-between mt-6'>

                <div>
                    <h3 className='text-lg'>
                        Artist isVerified
                    </h3>
                    <p className='text-sm text-(--text-secondary)'>
                        Mark <span className='text-blue-600'>this</span> Artist <span className='text-blue-600'>as</span> Verified
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        handleChange('isVerified', !artistInfo.isVerified)
                    }}

                    className={`
                      flex
                 relative
                 h-7 
                 w-14
                 rounded-full
                 transition-all
                 duration-300

                ${artistInfo.isVerified
                            ? "bg-(--spotify-green)"
                            : "bg-(--background4)"
                        }
                `}
                >

                    <span
                        className={`
                  absolute
                  top-[2px]
                  h-6
                  w-6
                  rounded-full
                  bg-(--text-primary)
                  transition-all
                  duration-300

                  ${artistInfo.isVerified
                                ? "translate-x-7"
                                : "translate-x-[2px]"
                            }

            `}
                    />



                </button>

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
                                filterGenre.map((genre) => (

                                    <div
                                        key={genre}
                                        onClick={() => {

                                            setSelectedGenres(prev => [
                                                ...prev,
                                                genre
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
                                        {genre}
                                    </div>

                                ))
                            }

                        </div>

                    )
                }

                <div className="flex flex-wrap gap-2">

                    {
                        selectedGenres.map((genre) => (

                            <div
                                key={genre}
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

                                <span>{genre}</span>

                                <button
                                    onClick={() => {

                                        setSelectedGenres(prev =>
                                            prev.filter(item => item !== genre)
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
                                artistInfo.image
                                    ? artistInfo.image.name
                                    : "Upload Cover"
                            }

                        </h3>

                        <p className="text-sm text-(--text-secondary)">

                            JPG • PNG • WEBP

                        </p>

                    </div>

                </div>

            </div>



            <div className="flex flex-col gap-3">

                <label
                    htmlFor="artistBio"
                    className="text-(--text-secondary) text-lg"
                >
                    Artist Bio
                </label>

                <textarea
                    id="artistBio"
                    spellCheck="false"
                    rows={6}
                    placeholder="Write something about the artist..."
                    value={artistInfo.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    className="
            min-h-40
            rounded-xl

            bg-(--background-secondary)

            border
            border-transparent

            px-4
            py-4

            outline-none

            resize-none

            transition-all
            duration-300

            focus:border-(--spotify-green)

            placeholder:text-(--text-secondary)
        "
                />

                <div className="flex justify-between text-sm text-(--text-secondary)">

                    <span>
                        Short introduction about the artist
                    </span>

                    <span>
                        {artistInfo.bio.length}/1000
                    </span>

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

export default ArtistAdd