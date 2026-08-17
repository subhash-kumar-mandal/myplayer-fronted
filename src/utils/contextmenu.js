import { createSlice } from "@reduxjs/toolkit";




const contextMenu = createSlice({
    name: "globalContex",
    initialState: {
        open: false,
        x: 0,
        y: 0,
        song: null,
    },
    reducers: {
        sethandleContextMenu: (state, action) => {
            const { x,y, song } = action.payload
            // const rect = e.currentTarget.getBoundingClientRect();

            state.open = true;
            state.song = song;
            state.x = x;
            state.y = y;
        },
        clearhandleContextMenu: (state) => {


            state.open = false;
            state.song = null;
            state.x = 0;
            state.y = 0;
        },

    }
});

export const {sethandleContextMenu,clearhandleContextMenu} = contextMenu.actions;
export default contextMenu.reducer