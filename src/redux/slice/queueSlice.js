import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { selectCurrent } from "./currentPlayingSlice";

const queueSlice = createSlice({
    name: "Queue",
    initialState: {
        value: {},
        status: "pending",
        error: null
    },
    reducers: {
        addPlaylistToQueue: (state, action) => {
          state.value = action.payload;
        }
    },
    extraReducers: builder => builder.addCase(fetchDetails.pending,(state, action)=>{
        state.status = "pending";
    })
    .addCase(fetchDetails.rejected,(state, action)=>{
        state.status = "rejected";
        state.error = action.error;
    })
    .addCase(fetchDetails.fulfilled,(state, action)=>{
        state.status = "fulfilled";
        state.value = action.payload;
      
    })
})

export const fetchDetails = createAsyncThunk("Queue/fetch",async({url,dispatch})=>{
    try{
        const {data} = await axios.get(url);
        const queue = data.data;
        let temp = [];
        if(queue.length){
            temp = queue;
        }
        if(queue.songs){
            temp = queue.songs;
        }
          dispatch(selectCurrent({song: temp[0], index:0}))
          return queue;
    }catch (error){
        return error.message
    }
})
export const {addPlaylistToQueue} = queueSlice.actions;

export default queueSlice;