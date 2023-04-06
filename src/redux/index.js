import { configureStore } from "@reduxjs/toolkit";
import currentPlayingSlice from "./slice/currentPlayingSlice";
import homePageSlice from "./slice/homePageSlice";
import queueSlice from "./slice/queueSlice";
import playlistSlice from "./slice/playlistSlice";
import likedSongsSlice from "./slice/likedSongs";
import searchResult from "./slice/searchResultSlice";

const store = configureStore({
    reducer:{
        HomePage: homePageSlice.reducer,
        Queue: queueSlice.reducer,
        CurrentPlaying: currentPlayingSlice.reducer,
        Playlists: playlistSlice.reducer,
        LikedSongs : likedSongsSlice.reducer,
        Search: searchResult.reducer

    }
})


export default store;