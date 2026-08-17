import { createSlice } from "@reduxjs/toolkit";




const EmailSlice = createSlice({
    name: "email",
    initialState: {
        name: '',
        email: '',
        password: '',
        DOB: {
            month: 'Month',
            dd: '',
            yyyy: ''
        },
        gender: "",

        pwCheck: {
            speicalChar: false,
            letter: false,
            length: false
        },
        serverFlag: {
            RegexFlag: false,
            ServerFlag: false
        }

    },
    reducers: {
        setPasswordUser: (state, action) => {

            state.password = action.payload;

        },
        setNameUser: (state, action) => {
            state.name = action.payload;
        },

        setUserDOB: (state, action) => {

            const { value, key } = action.payload


            state.DOB = {
                ...state.DOB,
                [key]: value

            }
        },

        setUserGender: (state, action) => {
            state.gender = action.payload;
        },
        setUserEmail: (state, action) => {
            state.email = action.payload;
        },

        isPWSet: (state, action) => {
            const { letter, speicalChar, length } = action.payload;

            state.pwCheck = {
                length, letter, speicalChar
            }
        },
        isServerFlagSet: (state, action) => {
            const { ServerFlag, RegexFlag } = action.payload;
            state.serverFlag = {
                ServerFlag,
                RegexFlag
            }
        },
        ClearAllFrom: (state) => {

            state.name = '',
                state.email = '',
                state.password = '';
            state.DOB = {
                month: 'Month',
                dd: '',
                yyyy: ''
            },
                state.gender = "",

                state.pwCheck = {
                    speicalChar: false,
                    letter: false,
                    length: false
                };
            state.serverFlag = {
                RegexFlag: false,
                ServerFlag: false
            }
        }
    }

});


export const { ClearAllFrom,isServerFlagSet, isPWSet, setUserEmail, setUserGender, setPasswordUser, setNameUser, setUserDOB } = EmailSlice.actions;


export default EmailSlice.reducer;