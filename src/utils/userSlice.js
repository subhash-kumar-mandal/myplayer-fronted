import { createSlice } from "@reduxjs/toolkit"





const userSlice = createSlice({
    name: "user",
    initialState: {
        user:{},
        accessToken:null
    },
    reducers: {
        setUserObject: (state, action) => {

            const {user,accessToken} = action.payload;

            if (!user || !accessToken) return;

            state.user = user;
            state.accessToken = accessToken;

        },

        setAccessToken :(state,action)=>{
            const val = action.payload;
            state.accessToken = val
        },
        isClearUser :(state)=>{
            state.user={}
            state.accessToken=null
        }
    }
});

export const {isClearUser,setAccessToken,setUserObject} = userSlice.actions;

export default userSlice.reducer;