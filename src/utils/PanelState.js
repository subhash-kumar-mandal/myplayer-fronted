import { createSlice } from "@reduxjs/toolkit";



const StateSlice = createSlice({
    name: "rightState",
    initialState: {
        rightSwitch: "info",
        left: "middle",
        // middle: "open",
        right: 'middle'

    },
    reducers: {
        isQueue: (state) => {

            if (state.rightSwitch === 'queue') {
                state.rightSwitch = "info";
            } else {
                state.rightSwitch = "queue";
            }
        },

        isleft: (state) => {

            state.left = state.left === "small" ? "middle" : "small";
        },
        isLeftBig: (state) => {

                state.left = state.left === "big" ? "middle" : "big";
           

        },
        isLeftMiddleSet: (state) => {
            state.left = 'middle'
        },
        isLeftSmallSet: (state) => {
            state.left = 'small'
        },

        isRight: (state) => {
            state.right = state.right === "small" ? "middle" : "small";
        }
    }
});


export const { isRight, isLeftMiddleSet, isLeftSmallSet, isleft, isQueue, isLeftBig } = StateSlice.actions;
export default StateSlice.reducer;