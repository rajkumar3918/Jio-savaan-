import {createSlice} from "@reduxjs/toolkit";

const currentPlayingSlice = createSlice({
    name: "Current Playing",
    initialState: {
        song:{},
        index:0
    },
    reducers:{
        selectCurrent: (state,action) =>{
            state.song = action.payload.song;
            state.index = action.payload.index;
        }
    }
})

export const {selectCurrent} = currentPlayingSlice.actions;
export default currentPlayingSlice;