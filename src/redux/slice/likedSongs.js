import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addPlaylistToQueue } from "./queueSlice";

const likedSongs = localStorage.getItem("likedSongs");

const likedSongsSlice = createSlice({
  name: "Liked Songs",
  initialState: {
    songs: likedSongs || [],
  },
  reducers: {
    likeSong: (state, action) => {
      state.songs.push(action.payload.songId);
    },
    dislikeSong: (state, action) => {
      state.songs = state.songs.filter((e) => e !== action.payload.songId);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchLikedSongs.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchLikedSongs.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      .addCase(fetchLikedSongs.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tempSongs = action.payload;
      }),
});

export const fetchLikedSongs = createAsyncThunk(
  "LikedSongs/fetch",
  async ({ likedSongs, dispatch }) => {
    try {
      const likedSongsPromise = likedSongs.map((e) =>
        axios.get("https://saavn.me/songs?id=" + e)
      );
      const data = await Promise.allSettled(likedSongsPromise);
      dispatch(addPlaylistToQueue(data.map((e) => e.value.data.data[0])));
      return data.map((e) => e.value.data.data[0]);
    } catch (error) {
      return error;
    }
  }
);

export const { likeSong, dislikeSong } = likedSongsSlice.actions;
export default likedSongsSlice;