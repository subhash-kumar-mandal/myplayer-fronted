import { createSlice } from "@reduxjs/toolkit";









const userDateSlice = createSlice({
    name: "dateuserBE",
    initialState: {
        fetchBoolean: false,
        loader: true,
        albumfollow: [],
        artistFollow: [],
        playListFollow: []
        ,
        likeSongs: {
            id: '',
            songs: []
        }
        ,
        userAllData: [],
        jumpBack:{},
        topCards:[]
    },
    reducers: {
        setUserAll: (state, action) => {
            const { albums = [], artists = [], playlists = [], user,jumpBack={} ,topCards=[] } = action.payload;
            state.albumfollow = albums;
            state.artistFollow = artists;
            state.playListFollow = playlists
            state.userAllData = user,
            state.fetchBoolean = true
            state.jumpBack=jumpBack,
            state.topCards =topCards
        },

        isSet_Follow_Album: (state, action) => {
            const album = action.payload;

            const flag = state.albumfollow.some(val => val._id === album._id);

            if (flag) {
                state.albumfollow = state.albumfollow.filter(val => val._id !== album._id);
            } else {
                state.albumfollow.unshift(album);
            }
        },
        isSet_Follow_Artist: (state, action) => {
            const artist = action.payload;

            const flag = state.artistFollow.some(val => val._id === artist._id);

            if (flag) {
                state.artistFollow = state.artistFollow.filter(val => val._id !== artist._id);
            } else {
                state.artistFollow.unshift(artist);
            }
        },
        isLoaderTrue: (state) => {
            state.loader = true
        },
        isLoaderfalse: (state) => {
            state.loader = false
        }
    }
});

export const { isLoaderTrue, isLoaderfalse, setUserAll, isSet_Follow_Album, isSet_Follow_Artist } = userDateSlice.actions;
export default userDateSlice.reducer