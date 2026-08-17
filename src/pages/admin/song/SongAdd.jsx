
import { useEffect, useRef, useState } from 'react'
import SongAddHeader from './SongAddHeader';

import { toast } from 'sonner';
import { SONG_GENRES } from '../../../services/AllGenres';
import { Music2, Send } from 'lucide-react';
import Spinner from '@/components/UX/Spinner';
import { apifetch, fetchPOST, URL_OBJECT } from '@/services/fetchHandleAll';
import { useSelector } from 'react-redux';


const lang = [
    "Hindi",
    "Punjabi",
    "English",
    "Tamil",
    "telugu",
    "Brazilian"
];
const supportedFormats = [
    "audio/mpeg",
    "audio/wav",
    "audio/flac",
    "audio/mp4",
    "audio/x-m4a",
    "audio/ogg",
    "video/mpeg"
];

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
    "English",

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
    "Bhangra",
    "Indian Pop",
    "Dance Pop",

    "K-Pop",
    "J-Pop",

    "Funk",
    "Brazilian Funk",
    'Montagem Funk',
    "Funk Carioca",
];

const SongAdd = () => {
    const VideoProccessThread = useRef(null);

    const { accessToken } = useSelector(val => val.userContext);
    const canvasVideoRef = useRef(null);
    const [canvasVideo, setCanvasVideo] = useState(null);
    const [canvasPreview, setCanvasPreview] = useState(null);
    const [processedCanvasVideo, setProcessedCanvasVideo] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const [ProcessLoading, setProccessingLoader] = useState(false);



    const audioRef = useRef(null)
    const [song, setSong] = useState({
        name: "",
        language: "Hindi",
        explicit: false,
        audio: null
    });


    // handle artist state
    const [searchArtist, setSearchArtist] = useState('');
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [artists, setArtists] = useState([]);


    // handle album state
    const containerAlbumRef = useRef(null)
    const [albumScrollOpenToggle, setAlbumScrollOpenToggle] = useState(false)
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [searchAlbum, setSearchAlbum] = useState('');
    const [albums, setAlbums] = useState([]);

    //  handle genre state
    const [searchGenre, setSearchGenre] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genreOpen, setGenreOpen] = useState(false);
    const genreContainerRef = useRef(null);

    const [coverPreview, setCoverPreview] = useState(null);



    const containerRef = useRef(null)
    const [openToggle, setOpenToggle] = useState(false);





    const [searchCredits, setSearchCredits] = useState({
        searchSinger: "",
        searchWriter: "",
        searchComposer: "",
        searchProducer: ""

    });


    const [openCredits, setOpenCredits] = useState({
        openSinger: false,
        openWriter: false,
        openComposer: false,
        openProducer: false

    })

    const containerSingerRef = useRef(null);
    const containerWriterRef = useRef(null)
    const containerComoposerRef = useRef(null)
    const containerProducersRef = useRef(null)


    const filterSinger = artists.filter(artist => {

        return artist.name.toLowerCase().includes(searchCredits.searchSinger.toLowerCase())
    });

    const filterWriter = artists.filter(artist => {

        return artist.name.toLowerCase().includes(searchCredits.searchWriter.toLowerCase())
    })
    const filterComposers = artists.filter(artist => {

        return artist.name.toLowerCase().includes(searchCredits.searchComposer.toLowerCase())
    })

    const filterProducers = artists.filter(artist => {

        return artist.name.toLowerCase().includes(searchCredits.searchProducer.toLowerCase())
    })



    const [selectedSinger, setSelectedSinger] = useState([]);
    const [selectedWriter, setSelectedWriter] = useState([]);
    const [selectedComposers, setSelectedComposers] = useState([]);
    const [selectedProducer, setSelectedProducer] = useState([]);



    const [loading, setLoading] = useState(false)

    function handleCredits(key, value) {
        console.log(key, value)
        setSearchCredits(prev => ({
            ...prev,
            [key]: value
        }))
    };



    // --------------------------------------------------
    // Video select / change
    // --------------------------------------------------

    const CanvasVideoHandle = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("video/")) {
            alert("Please select a video file");
            return;
        }


        // Purane object URL ko memory se hatao
        if (canvasPreview) {
            URL.revokeObjectURL(canvasPreview);
        }


        const previewUrl = URL.createObjectURL(file);

        setCanvasVideo(file);
        setCanvasPreview(previewUrl);


        // Naye video ke liye reset
        setVideoDuration(0);
        setStartTime(0);
        setEndTime(0);


        // Same file dobara select karne ki permission
        e.target.value = "";
    };



    const formatTime = (seconds) => {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${minutes}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    // --------------------------------------------------
    // Video metadata loaded
    // --------------------------------------------------

    const handleLoadedMetadata = (e) => {

        const duration = e.currentTarget.duration;

        setVideoDuration(duration);

        // Start always 0
        setStartTime(0);

        // Maximum 30 seconds
        setEndTime(Math.min(duration, 30));
    };



    // --------------------------------------------------
    // Left trim
    // --------------------------------------------------

    const handleStartChange = (e) => {

        const value = Number(e.target.value);

        // Start end se aage nahi ja sakta
        if (value >= endTime) {
            return;
        }

        // Selected portion maximum 30 sec
        if (endTime - value > 30) {
            return;
        }

        setStartTime(value);
    };


    // --------------------------------------------------
    // Right trim
    // --------------------------------------------------

    const handleEndChange = (e) => {

        const value = Number(e.target.value);

        // End start se pehle nahi ja sakta
        if (value <= startTime) {
            return;
        }

        // Maximum 30 sec
        if (value - startTime > 30) {
            return;
        }

        setEndTime(value);
    };


    // --------------------------------------------------
    // Percent positions for timeline
    // --------------------------------------------------

    const startPercent =
        videoDuration > 0
            ? (startTime / videoDuration) * 100
            : 0;

    const endPercent =
        videoDuration > 0
            ? (endTime / videoDuration) * 100
            : 0;


    // --------------------------------------------------
    // Process Canvas
    // --------------------------------------------------

    const handleProcessCanvas = () => {

        if (!canvasVideo) {
            alert("Please select a video");
            return;
        }




        VideoProccessThread.current.postMessage({
            file: canvasVideo,
            startTime,
            endTime,
            duration: endTime - startTime
        })
        setProccessingLoader(true)
    };

    useEffect(() => {

        VideoProccessThread.current = new Worker(
            new URL("../../../services/VideoProccessingThread.js", import.meta.url),
            {
                type: "module"
            }
        )


        VideoProccessThread.current.onmessage = (e) => {

            const { type, data, error } = e.data;

            if (type === "complete") {
                console.log("Video mil gayi:", data);

                const blob = new Blob(
                    [data.buffer],
                    {
                        type: 'video/mp4'
                    }
                )
                const file = new File(
                    [blob],
                    "canvas.mp4",
                    {
                        type: "video/mp4"
                    }
                );

                const url = URL.createObjectURL(file);

                setProcessedCanvasVideo(file);
                setCanvasPreview(url);

            }

            if (type === "error") {
                console.error("Worker error:", error);
            };

            setProccessingLoader(false)
        };

        return () => {
            VideoProccessThread.current.terminate();
            VideoProccessThread.current = null;
        };

    }, []);

    // --------------------------------------------------
    // Cleanup object URL
    // --------------------------------------------------

    useEffect(() => {

        return () => {

            if (canvasPreview) {
                URL.revokeObjectURL(canvasPreview);
            }

        };

    }, [canvasPreview]);



    function handleChange(key, value) {
        setSong(prev => ({
            ...prev,
            [key]: value
        }))
    };


    const AudioHandle = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        // Sirf audio allow




        if (!supportedFormats.includes(file.type)) {
            alert("Unsupported audio format.");
            return;
        }

        // 50 MB limit (change kar sakte ho)
        if (file.size > 50 * 1024 * 1024) {
            alert("Audio size should be less than 50 MB.");
            return;
        }

        handleChange("audio", file);

    };




    const filterArtist = artists.filter(artist => (
        artist.name.toLowerCase().includes(searchArtist.toLowerCase())
    ))

    const filterAlbum = albums.filter((album) => {
        return album.name
            .toLowerCase()
            .includes(searchAlbum.toLowerCase());
    });



    const filterGenre = SONG_GENRES.filter((genre) => {

        const match = genre
            .toLowerCase()
            .includes(searchGenre.toLowerCase());

        const alreadySelected = selectedGenres.includes(genre);

        return match && !alreadySelected;

    });


    const handleCancel = () => {

        if (coverPreview) {
            URL.revokeObjectURL(coverPreview);
        }

        setCoverPreview(null);

        setSong({
            name: "",

            album: null,
            language: "Hindi",
            explicit: false,

            audio: null
        });

        setSelectedArtists([]);
        setSelectedAlbum([]);
        setSelectedGenres([]);

        setSelectedGenres([]);
        setSelectedSinger([])
        setSelectedWriter([])
        setSelectedComposers([])
        setSelectedProducer([])

        setSelectedArtists([])
        setSelectedAlbum([])

        setSearchArtist("");
        setSearchAlbum("");
        setSearchGenre("");

    };







    async function UploadData() {

        // if(!selectedAlbum){
        //     toast.error('Album is Required')
        //     return 
        // }

        const id = toast.loading("Song Uploading")

        try {

            const data = new FormData();

            data.append("name", song.name);
            data.append('language', song.language);
            data.append('explicit', song.explicit);
            data.append('audio', song.audio);
            data.append('artists', JSON.stringify(selectedArtists.map(val => val._id)));
            data.append('album', JSON.stringify(selectedAlbum));
            data.append('genres', JSON.stringify(selectedGenres));
            data.append('credits', JSON.stringify({
                singers: selectedSinger.map(val => val._id),
                writers: selectedWriter.map(val => val._id),
                composers: selectedComposers.map(val => val._id),
                producers: selectedProducer.map(val => val._id)
            }))
            if (processedCanvasVideo) {
                data.append("canvas", processedCanvasVideo);
            }

            setLoading(true)

            const res = await fetchPOST(URL_OBJECT.BASE_URL + "/song/create-album", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: 'include'
            }, data)

            console.log(res)
            if (!res.success) throw new Error(res.message || 'Uploading is Fields')

            toast.success('Song is uploaded successfully', {
                id,
                duration: 1000
            })

        } catch (err) {


            toast.error(" Song Upload Filed", {
                id,
                duration: 2000,
                style: {

                }
            })

        } finally {

            setLoading(false)
        }


    }





    useEffect(() => {

        async function artitsNameFetch() {
            try {
                const [artistRes, albumRes] = await Promise.all([
                    apifetch("http://localhost:2000/artist/admin/names", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        credentials: 'include'
                    }),
                    apifetch("http://localhost:2000/album/admin/names", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        credentials: 'include'
                    })
                ]);

                if(!artistRes.success || !albumRes.success)return;

                const arts = artistRes?.artists ?? [];
                const albm = await albumRes?.albums ?? []


                setArtists(arts)
                setAlbums(albm)



            } catch (err) {
                console.log(err)
            }
        }
        artitsNameFetch()

    }, [])




    useEffect(() => {

        function handleClickOutSide(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpenToggle(false);
            }

            if (containerAlbumRef.current && !containerAlbumRef.current.contains(e.target)) {
                setAlbumScrollOpenToggle(false);
            }
            if (
                genreContainerRef.current &&
                !genreContainerRef.current.contains(e.target)
            ) {
                setGenreOpen(false);
            }
            if (
                containerSingerRef.current &&
                !containerSingerRef.current.contains(e.target)
            ) {
                setOpenCredits(prev => {
                    return {
                        ...prev,
                        openSinger: false
                    }
                });
            }
            if (
                containerWriterRef.current &&
                !containerWriterRef.current.contains(e.target)
            ) {
                setOpenCredits(prev => {
                    return {
                        ...prev,
                        openWriter: false
                    }
                });
            }

            if (
                containerComoposerRef.current &&
                !containerComoposerRef.current.contains(e.target)
            ) {
                setOpenCredits(prev => {
                    return {
                        ...prev,
                        openComposer: false
                    }
                });
            }

            if (
                containerProducersRef.current &&
                !containerProducersRef.current.contains(e.target)
            ) {
                setOpenCredits(prev => {
                    return {
                        ...prev,
                        openProducer: false
                    }
                });
            }
        };

        document.addEventListener('mousedown', handleClickOutSide);


        // remove every render for past event join mousedown free memory leak
        return () => document.removeEventListener('mousedown', handleClickOutSide)

    }, [])






    return (
        <div
            className='
     max-w-5xl
     
     mx-auto 
     py-10 
     px-8 
     space-y-10  
   
     
     bg-(--background1)
     rounded-xl
     
     '
        >
            <SongAddHeader />

            {/* songName */}
            <div className='flex flex-col gap-2'>

                <label
                    htmlFor='songName'
                    className='text-(--text-secondary) text-lg'
                >
                    SongName
                </label>

                <input
                    type="text"
                    spellCheck='false'
                    placeholder='Enter song name'
                    id="songName"
                    value={song.name}

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




            {/*  Language choice */}

            <div
                className='flex flex-col gap-2 mt-6'
            >

                <label
                    htmlFor='language'
                    className='text-(--text-secondary) text-lg'
                >
                    language
                </label>


                <select
                    name="" id="language"
                    value={song.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className='
                 h-12
                 rounded-md
                 bg-(--background-secondary)
                 px-4
                 outline-none
                 border
                 border-transparent

                 focus:border-(--spotify-green)

                 transition-all
                 duration-300



                '
                >

                    {
                        lang.map(val => (
                            <option value={val} key={val}>
                                {
                                    val
                                }
                            </option>
                        ))
                    }


                </select>

            </div>


            {/*  E  badge explicit toggle  */}
            <div className='flex items-center justify-between mt-6'>

                <div>
                    <h3 className='text-lg'>
                        Explicit Content
                    </h3>
                    <p className='text-sm text-(--text-secondary)'>
                        Mark <span className='text-blue-600'>this</span> song <span className='text-blue-600'>as</span> explicit
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        handleChange('explicit', !song.explicit)
                    }}

                    className={`
                      flex
                 relative
                 h-7 
                 w-14
                 rounded-full
                 transition-all
                 duration-300

                ${song.explicit
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

                  ${song.explicit
                                ? "translate-x-7"
                                : "translate-x-[2px]"
                            }

            `}
                    />



                </button>

            </div>


            {/*  Search Artits handles here */}
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




            {/*  Search Album handles */}

            <div
                ref={containerAlbumRef}
                className="  relative flex flex-col gap-3">

                <label
                    htmlFor="searchAlbum"
                    className="text-(--text-secondary) text-lg"
                >
                    Search Album
                </label>

                <input
                    id="searchAlbum"
                    type="text"
                    placeholder="Search Album..."
                    value={searchAlbum}
                    onFocus={() => setAlbumScrollOpenToggle(true)}
                    onChange={(e) => setSearchAlbum(e.target.value)}
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
                    albumScrollOpenToggle &&
                    <div className="
                absolute top-full  left-0 right-0 z-10
                max-h-48
            mt-2
            spotify-scroll
            overflow-y-auto
            rounded-md
            bg-(--background-secondary)
            border
            border-(--border-color)
                
                ">

                        {
                            filterAlbum.map((album) => (

                                <div
                                    key={album._id}
                                    onClick={() => {

                                        setSelectedAlbum(album);

                                        setSearchAlbum('');
                                        setAlbumScrollOpenToggle(false)


                                    }}
                                    className="
                                px-4
                                flex
                                items-center
                                gap-4
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
                                    <img src={album.image.url} className='h-12 rounded-sm  w-12' alt="" />
                                    <p>
                                        {album.name}
                                    </p>
                                </div>

                            ))
                        }

                    </div>
                }

                {
                    selectedAlbum && (

                        <div
                            className="
                mt-3
                rounded-md
                bg-(--spotify-green)
                text-black
                px-4
                py-2
                inline-flex
                items-center
                gap-2
            "
                        >

                            {selectedAlbum.name}

                            <button
                                onClick={() => {

                                    setSelectedAlbum(null);

                                    setSearchAlbum("");

                                }}
                            >
                                ✕
                            </button>

                        </div>

                    )
                }

            </div>


            {/*  Genre actions Handles */}

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





            {/*  Search Singer handles here */}
            <div
                ref={containerSingerRef}
                className="flex flex-col gap-3 relative">

                <label
                    htmlFor="searchSinger"
                    className="text-(--text-secondary) text-lg"
                >
                    Search Singer
                </label>

                <input
                    id="searchSinger"
                    type="text"
                    placeholder="Search Singer..."
                    value={searchCredits.searchSinger}
                    onFocus={() => setOpenCredits(prev => {
                        return {
                            ...prev,
                            openSinger: true
                        }
                    })}
                    onChange={(e) => handleCredits('searchSinger', e.target.value)}
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

                {/* Singer Result */}

                {

                    openCredits.openSinger && (
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
                                filterSinger.map((artist) => (

                                    <div
                                        key={artist._id}
                                        onClick={() => {

                                            const already = selectedSinger.find(
                                                item => item._id === artist._id
                                            );

                                            if (already) return;

                                            setSelectedSinger(prev => [
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
                {/* Selected Singer */}

                <div className="flex flex-wrap gap-2">

                    {
                        selectedSinger.map((artist) => (

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

                                        setSelectedSinger(prev =>
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



            {/*  Search Writer handles here */}
            <div
                ref={containerWriterRef}
                className="flex flex-col gap-3 relative">

                <label
                    htmlFor="searchWriter"
                    className="text-(--text-secondary) text-lg"
                >
                    Search Writer
                </label>

                <input
                    id="searchWriter"
                    type="text"
                    placeholder="Search Writer..."
                    value={searchCredits.searchWriter}
                    onFocus={() => setOpenCredits(prev => {
                        return {
                            ...prev,
                            openWriter: true
                        }
                    })}
                    onChange={(e) => handleCredits('searchWriter', e.target.value)}
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

                {/* Singer Result */}

                {

                    openCredits.openWriter && (
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
                                filterWriter.map((artist) => (

                                    <div
                                        key={artist._id}
                                        onClick={() => {

                                            const already = selectedWriter.find(
                                                item => item._id === artist._id
                                            );

                                            if (already) return;

                                            setSelectedWriter(prev => [
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
                {/* Selected Writer */}

                <div className="flex flex-wrap gap-2">

                    {
                        selectedWriter.map((artist) => (

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

                                        setSelectedWriter(prev =>
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




            {/*  Search Writer handles here */}
            <div
                ref={containerComoposerRef}
                className="flex flex-col gap-3 relative">

                <label
                    htmlFor="searchComposer"
                    className="text-(--text-secondary) text-lg"
                >
                    Search Composer
                </label>

                <input
                    id="searchComposer"
                    type="text"
                    placeholder="Search Composer..."
                    value={searchCredits.searchComposer}
                    onFocus={() => setOpenCredits(prev => {
                        return {
                            ...prev,
                            openComposer: true
                        }
                    })}
                    onChange={(e) => handleCredits('searchComposer', e.target.value)}
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

                {/* Composer Result */}

                {

                    openCredits.openComposer && (
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
                                filterComposers.map((artist) => (

                                    <div
                                        key={artist._id}
                                        onClick={() => {

                                            const already = selectedComposers.find(
                                                item => item._id === artist._id
                                            );

                                            if (already) return;

                                            setSelectedComposers(prev => [
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
                {/* Selected Writer */}

                <div className="flex flex-wrap gap-2">

                    {
                        selectedComposers.map((artist) => (

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

                                        setSelectedComposers(prev =>
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





            {/*  Search Writer handles here */}
            <div
                ref={containerProducersRef}
                className="flex flex-col gap-3 relative">

                <label
                    htmlFor="searchProducer"
                    className="text-(--text-secondary) text-lg"
                >
                    Search Producer
                </label>

                <input
                    id="searchProducer"
                    type="text"
                    placeholder="Search Producer..."
                    value={searchCredits.searchProducer}
                    onFocus={() => setOpenCredits(prev => {
                        return {
                            ...prev,
                            openProducer: true
                        }
                    })}
                    onChange={(e) => handleCredits('searchProducer', e.target.value)}
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

                {/* Composer Result */}

                {

                    openCredits.openProducer && (
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
                                filterProducers.map((artist) => (

                                    <div
                                        key={artist._id}
                                        onClick={() => {

                                            const already = selectedProducer.find(
                                                item => item._id === artist._id
                                            );

                                            if (already) return;

                                            setSelectedProducer(prev => [
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
                {/* Selected Writer */}

                <div className="flex flex-wrap gap-2">

                    {
                        selectedProducer.map((artist) => (

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

                                        setSelectedProducer(prev =>
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

















            {/* Audio handle here */}


            <div className="flex flex-col gap-3">

                <label className="text-(--text-secondary) text-lg">
                    Audio
                </label>

                <input
                    ref={audioRef}
                    type="file"
                    className="hidden"
                    onChange={AudioHandle}
                />

                <div
                    onClick={() => audioRef.current.click()}
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

                    <Music2
                        size={65}
                        className="
                text-(--text-secondary)

                transition-all
                duration-300

                group-hover:text-(--spotify-green)
                group-hover:scale-110
            "
                    />

                    <div className="text-center">

                        <h3 className="text-lg font-medium">

                            {
                                song.audio
                                    ? song.audio.name
                                    : "Upload Audio"
                            }

                        </h3>

                        <p className="text-sm text-(--text-secondary)">

                            MP3 • WAV • FLAC

                        </p>

                    </div>

                </div>

            </div>


            <div className="flex flex-col gap-3">

                {/* Heading */}

                <label className="text-(--text-secondary) text-lg">
                    Canvas
                </label>


                {/* Hidden input */}

                <input
                    ref={canvasVideoRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={CanvasVideoHandle}
                />


                {/* Main Canvas Box */}

                <div
                    className="
                    w-full
                    min-h-[430px]
                    rounded-xl
                    border
                    border-(--border-color)
                    bg-(--background-secondary)
                    p-6
                    flex
                    gap-8
                "
                >

                    {/* ==========================================
                    LEFT : VIDEO
                ========================================== */}

                    <div
                        className="
                        flex-1
                        min-w-0
                        flex
                        items-center
                        justify-center
                        bg-black/20
                        rounded-lg
                        relative
                    "
                    >

                        {canvasPreview ? (

                            <video
                                src={canvasPreview}
                                controls
                                onLoadedMetadata={handleLoadedMetadata}
                                className="
                                h-[360px]
                                aspect-[9/16]
                                object-cover
                                rounded-lg
                                bg-black
                            "
                            />

                        ) : (

                            <button
                                type="button"
                                onClick={() =>
                                    canvasVideoRef.current?.click()
                                }
                                className="
                                px-6
                                py-2.5
                                rounded-full
                                bg-(--spotify-green)
                                text-black
                                font-semibold
                                hover:scale-105
                                active:scale-95
                                transition-all
                                duration-200
                                cursor-pointer
                            "
                            >
                                Choose Video
                            </button>

                        )}

                    </div>


                    {/* ==========================================
                    RIGHT : CONTROLS
                ========================================== */}

                    <div
                        className="
                        w-80
                        shrink-0
                        flex
                        flex-col
                        justify-center
                        gap-7
                    "
                    >

                        {/* Title */}

                        <div>

                            <h3 className="text-lg font-semibold">
                                Trim Canvas
                            </h3>

                            <p className="
                            text-sm
                            text-(--text-secondary)
                            mt-1
                        ">
                                Select up to 30 seconds
                            </p>

                        </div>


                        {/* ======================================
                        TIME INFO
                    ====================================== */}

                        <div className="
                        flex
                        justify-between
                        text-xs
                        text-(--text-secondary)
                    ">

                            <span>
                                {formatTime(startTime)}
                            </span>

                            <span>
                                Selected:{" "}
                                {formatTime(endTime - startTime)}
                            </span>

                            <span>
                                {formatTime(endTime)}
                            </span>

                        </div>


                        {/* ======================================
                        TRIM TIMELINE
                    ====================================== */}

                        <div className="relative w-full h-10">

                            {/* Full track */}

                            <div
                                className="
                                absolute
                                top-1/2
                                left-0
                                right-0
                                h-1
                                -translate-y-1/2
                                rounded-full
                                bg-(--background3)
                            "
                            />


                            {/* Selected area */}

                            <div
                                className="
                                absolute
                                top-1/2
                                h-1
                                -translate-y-1/2
                                rounded-full
                                bg-(--spotify-green)
                            "
                                style={{
                                    left: `${startPercent}%`,
                                    width: `${Math.max(
                                        endPercent - startPercent,
                                        0
                                    )}%`
                                }}
                            />


                            {/* LEFT RANGE */}

                            <input
                                type="range"
                                min="0"
                                max={videoDuration || 0}
                                step="0.1"
                                value={startTime}
                                disabled={!videoDuration}
                                onChange={handleStartChange}
                                className="
                                trim-range
                                absolute
                                inset-0
                                w-full
                                pointer-events-none
                                appearance-none
                                bg-transparent
                            "
                            />


                            {/* RIGHT RANGE */}

                            <input
                                type="range"
                                min="0"
                                max={videoDuration || 0}
                                step="0.1"
                                value={endTime}
                                disabled={!videoDuration}
                                onChange={handleEndChange}
                                className="
                                trim-range
                                absolute
                                inset-0
                                w-full
                                pointer-events-none
                                appearance-none
                                bg-transparent
                            "
                            />

                        </div>


                        {/* ======================================
                        DURATION
                    ====================================== */}

                        <div className="
                        flex
                        justify-between
                        text-xs
                        text-(--text-secondary)
                    ">

                            <span>0:00</span>

                            <span>
                                {formatTime(videoDuration)}
                            </span>

                        </div>


                        {/* ======================================
                        CHANGE VIDEO
                    ====================================== */}

                        {canvasPreview && (

                            <button
                                disabled={ProcessLoading}
                                type="button"
                                onClick={() =>
                                    canvasVideoRef.current?.click()
                                }
                                className="
                                w-full
                                h-10
                                flex
                                justify-center
                                items-center
                                rounded-full
                                bg-(--background3)
                                font-medium
                                hover:bg-(--background4)
                                transition-all
                                duration-200
                                cursor-pointer
                            "
                            >
                                {
                                    ProcessLoading ? <Spinner /> : 'Process Canvas'
                                }
                            </button>

                        )}


                        {/* ======================================
                        PROCESS
                    ====================================== */}

                        <button
                            type="button"
                            disabled={
                                !canvasVideo ||
                                endTime <= startTime
                                || ProcessLoading
                            }
                            onClick={handleProcessCanvas}
                            className="
                            w-full
                            h-11
                            rounded-full
                            flex
                                justify-center
                                items-center
                                
                            bg-(--spotify-green)
                            text-black
                            font-semibold
                            hover:scale-[1.02]
                            active:scale-[0.98]
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            transition-all
                            duration-200
                            cursor-pointer
                        "
                        >
                            {
                                ProcessLoading ? <Spinner /> : 'Process Canvas'
                            }
                        </button>

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
                    onClick={handleCancel}
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
                    onClick={() => {
                        UploadData()
                    }}
                >
                    {loading ? "Saving..." : "Save Song"}
                </button>

            </div>




        </div>
    )
}

export default SongAdd