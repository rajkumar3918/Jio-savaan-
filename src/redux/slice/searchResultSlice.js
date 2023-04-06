import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export default createSlice({
    name:"Search Results",
    initialState:{
        value:{}
    },
    reducers:{},
    extraReducers: builder => 
    builder.addCase(fetchSearch.pending, (state,action) =>{
        state.status = "pending";
    })
    .addCase(fetchSearch.rejected, (state,action) =>{
        state.status = "rejected";
        state.error = action.error;
    })
    .addCase(fetchSearch.fulfilled, (state,action) =>{
        state.status = "fulfilled";
        state.value = action.payload;
    })
})

export const fetchSearch = createAsyncThunk("Search/fetch", async({searchTxt,dispatch}) => {
    try {
        const searchTerm = searchTxt.split(" ").join("+");
        const {data} = await axios.get("https://saavn.me/search/all?query="+searchTerm);
        return data;
    } catch (error) {
        return error.message;
    }
})