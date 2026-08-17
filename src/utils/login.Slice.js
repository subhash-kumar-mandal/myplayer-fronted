import { createSlice } from "@reduxjs/toolkit";





const LoginSlice = createSlice({
    name: "login",
    initialState: {
        email: ''
    },
    reducers: {
        set_Email: function (state, action) {
            const val = action.payload;
            state.email = val;
        },
        setClear :(state)=>{
            state.email ='';
        }
    }
});

export const {setClear,set_Email} = LoginSlice.actions;

export default LoginSlice.reducer;