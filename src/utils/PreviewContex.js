import { createSlice } from "@reduxjs/toolkit";






const PreviewContex = createSlice({
    name: 'previewContex',
    initialState: {
        isOpen: false,
        index: 0,
        preViewArray: [],
        isGlobal: false,
    },

    reducers: {
        setPreView: (state, action) => {
            const { previewArray, global } = action.payload;

            if (!previewArray || previewArray.length === 0) return;

            state.isOpen = true;
            state.index = 0;
            state.preViewArray = previewArray;
            state.isGlobal = global
        },
        setPreviewClear: (state) => {

            state.isOpen = false;
            state.index = 0;
            state.preViewArray = [];
            state.isGlobal =false
        },

        indexNext:(state)=>{
            if((state.preViewArray.length-1)===state.index) return;

            state.index++;
        },
        indexPre:(state)=>{
            if(state.index===0) return;

            state.index--;
        }
    },

})

export const {indexNext,indexPre, setPreviewClear, setPreView } = PreviewContex.actions;

export default PreviewContex.reducer