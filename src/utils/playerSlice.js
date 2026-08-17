import { createSlice } from "@reduxjs/toolkit"



const SongSlice = createSlice({
    name: "SongsHandle",
    initialState: {
        volume: 0.5,
        releaseId: '',
        isIndex: false,
        currentSongPlay: {},
        playRequest: 0,
        requestTime_Zero: 0,
        beforePlay: [],
        middlePlay: [],
        afterPlay: [],
        isPlaying: false,
        RealPlayBack: [],
        shuffle_Queue_handle: []

    },

    reducers: {
        // handle track page
        SongAdd: (state, action) => {





            const flag = state.currentSongPlay
            const { id, song } = action.payload;

            if (state.releaseId === id) {
                state.isPlaying = !state.isPlaying;
            } else {
                state.releaseId = id;
                state.beforePlay.push({ ...song, userQueue: false });
                state.afterPlay = [];
                state.currentSongPlay = { ...song, userQueue: false };
                state.isIndex = 0;
                state.RealPlayBack = [{ ...song, userQueue: false }];
                state.isPlaying = true

                if (flag?._id === state.currentSongPlay._id) {
                    state.playRequest++
                }
            }

        },

        // handle Release page
        AlbumAdd_Song: (state, action) => {

            const { id, songs } = action.payload;



            if (state.releaseId === id) {

                state.isPlaying = !state.isPlaying;

            } else {

                if (songs.length < 1) return
                if (state.currentSongPlay?._id === songs[0]._id) {
                    // songs[0]._id === state.currentSongPlay._id
                    state.playRequest++

                }
                state.releaseId = id;

                state.afterPlay = songs.map(val => {
                    return {
                        ...val,
                        userQueue: false,
                    }
                }).slice(1, songs.length);



                state.beforePlay = [{ ...songs[0], userQueue: false }]
                state.currentSongPlay = { ...songs[0], userQueue: false };
                state.isIndex = 0;
                state.RealPlayBack = [...state.beforePlay, ...state.afterPlay];

                state.isPlaying = true

            }


        },

        isPlayingPlay: (state) => {


            state.isPlaying = true;
        },
        isPlayingPause: (state) => {
            state.isPlaying = false;
        },

        isCardPlayBackHandle: (state, action) => {

            const { song } = action.payload;

            if ((state.releaseId === song._id) || (song._id === state.currentSongPlay._id)) {
                console.log("yes its macth");
                state.isPlaying = !state.isPlaying; // toggle karo bass yadi row song match par 

            } else {
                const { Index, songs } = action.payload;
                const current = songs[Index];
                state.releaseId = current.release._id
                state.isIndex = Index;
                state.currentSongPlay = { ...current, userQueue: false }
                state.beforePlay = songs.slice(0, Index + 1).map(val => {
                    return {
                        ...val,
                        userQueue: false,
                    }
                })
                state.afterPlay = songs.slice(Index + 1, songs.length).map(val => {
                    return {
                        ...val,
                        userQueue: false,
                    }
                });
                state.isPlaying = true
                state.RealPlayBack = [...state.beforePlay, ...state.afterPlay]

            }


        },

        isNextSongHandle: (state) => {



            if (state.isIndex === (state.RealPlayBack.length - 1)) {
                console.log('helo')
                const current = state.currentSongPlay;

                // state.releaseId = ""
                // state.isIndex = 0
                // state.currentSongPlay = {}

                state.isPlaying = false;
                state.requestTime_Zero++;
            } else {



                // const current = { ...state.RealPlayBack[state.isIndex] }

                const backOne = state.RealPlayBack[state.isIndex + 1];

                const popSong = state.afterPlay.shift();
                if (popSong._id === backOne._id) {
                    state.playRequest++;
                    console.log('yes hai ')
                }
                state.beforePlay.push(popSong);


                state.currentSongPlay = state.RealPlayBack[state.isIndex + 1]
                state.isIndex = state.isIndex + 1;
                state.isPlaying = true;





            }
        },


        //
        isPrevSongHandle: (state) => {

            if (state.isIndex === false) return


            if (state.isIndex === 0) return;
            const popSong = state.beforePlay.pop()
            const backOne = state.RealPlayBack[state.isIndex - 1];
            if (popSong._id === backOne._id) {
                state.playRequest++;
            }
            state.currentSongPlay = state.RealPlayBack[state.isIndex - 1];
            state.afterPlay.unshift(popSong)

            state.isIndex = state.isIndex - 1;
            state.isPlaying = true;


        },
        SongRowClickHandle: (state, action) => {
            const { id, Index, songs } = action.payload;
            console.log(id, Index, songs)
        },


        setUserQueue: (state, action) => {
            const song = action.payload;
            if (!song) return;
            const UserQueue = { ...song, userQueue: true };
            const isSong = state.afterPlay.some(val => {
                return (val._id === UserQueue._id && val.userQueue === true)
            });

            if (isSong) {

                const userQueueArray = state.afterPlay.filter(val => {
                    return (val._id !== UserQueue._id && val.userQueue === true)
                });


                const normalArray = state.afterPlay.filter(val => val.userQueue === false);

                state.afterPlay = [...userQueueArray, ...normalArray]
                state.RealPlayBack = [...state.beforePlay, ...userQueueArray, ...normalArray]


            } else {


                const userQueueArray = state.afterPlay.filter(val => val.userQueue === true);
                const normalArray = state.afterPlay.filter(val => val.userQueue === false);
                userQueueArray.push(UserQueue);

                state.afterPlay = [...userQueueArray, ...normalArray]
                state.RealPlayBack = [...state.beforePlay, ...userQueueArray, ...normalArray]
            }
        },
        isVolumeSet: (state, action) => {
            const volume = Number(action.payload);

            state.volume = volume;

        },
        isPlayerClear: (state) => {
            state.volume = 0.5,
                state.releaseId = '',
                state.isIndex = false,
                state.currentSongPlay = {},
                state.playRequest = 0,
                state.requestTime_Zero = 0,
                state.beforePlay = [],
                state.middlePlay = [],
                state.afterPlay = [],
                state.isPlaying = false,
                state.RealPlayBack = [],
                state.shuffle_Queue_handle = []
        },

        isPlaytoggle:(state)=>{
            state.isPlaying = !state.isPlaying;
        }

    }
});

export const {isPlaytoggle,isPlayerClear, isVolumeSet, setUserQueue, SongRowClickHandle, isPrevSongHandle, isNextSongHandle, isCardPlayBackHandle, isPlayingPause, isPlayingPlay, SongAdd, AlbumAdd_Song } = SongSlice.actions;
export default SongSlice.reducer;


