import { configureStore } from "@reduxjs/toolkit";


import EmailSlice from './Eamil.Slice';
import SongSlice from './playerSlice'
import contextMenu from './contextmenu'
import PanelState from './PanelState'
import userSlice from './userSlice'
import emailSlice from "./login.Slice"
import userDateSlice  from './userDateSlice'
import PreviewContext from "./PreviewContex";
const RootStore = configureStore({
    reducer:{
    user:EmailSlice,
    player:SongSlice,
    contextMenu:contextMenu,
    state:PanelState,
    userContext:userSlice,
    email:emailSlice,
    userData:userDateSlice,
    preview:PreviewContext
    },
    
});


export default RootStore;



