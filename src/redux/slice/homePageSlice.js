import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const homePageSlice = createSlice({
    name: 'HomePage',
    initialState: {
        albums: [],
        playlists: [],
        charts: [],
        trending: {},
        status: "pending",
        error: null
    },
    reducers: {},
    extraReducers: builder => builder.addCase(fetchHomePageData.pending,(state, action)=>{
        state.status = "pending";
    })
    .addCase(fetchHomePageData.rejected,(state, action)=>{
        state.status = "rejected";
        state.error = action.error;
    })
    .addCase(fetchHomePageData.fulfilled,(state, action)=>{
        state.status = "fulfilled";
        state.albums = action.payload.albums;
        state.playlists = action.payload.playlists;
        state.trending = action.payload.trending;
        state.charts = action.payload.charts;
    })
});  

export const fetchHomePageData = createAsyncThunk("HomePage/fetch", async()=>{
   try{
    const {data} = await axios.get("https://saavn.me/modules?language=hindi,english");
    return data.data;
   }catch (error){
    return error.message;
   }
})

export default homePageSlice;