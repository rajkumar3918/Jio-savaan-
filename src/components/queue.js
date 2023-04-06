import React from "react";
import { useSelector , useDispatch} from "react-redux";
import "../styles/queue.scss"
import { selectCurrent } from "../redux/slice/currentPlayingSlice";
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai";
import { likeSong, dislikeSong } from "../redux/slice/likedSongs";
import {v4 as uuid} from "uuid";
export default function Queue(){
    const likedSongs = useSelector((state) => state.LikedSongs.songs);
    const queue = useSelector((state) => state.Queue.value);
    
    const dispatch = useDispatch();
    let data = [];
    if (queue && queue.length) {
      data = queue;
    }
    if (queue && queue.songs) {
      data = queue.songs;
    }
    return(
        <div className="queue-container">
            <div className="header">
                <p className="title">Queue</p>
                <button className="save-btn">Save</button>
                <button className="clear-btn">Clear</button>
            </div>
            <div className="queue-body">
               
                    {data && data.map((e,index)=>{
                         const liked = likedSongs.filter((ls) => ls === e.id);
                        return(
                            <div className="song-containet" key={uuid()}>
                            <div className="queue-song"  onClick={()=>dispatch(selectCurrent({song:e,index}))}>
                            <img src={e.image[2].link}></img>
                            <div className="desc"><p className="title"  >{e.name}</p>
                            <p>{e.primaryArtists}</p></div>
                            <p>{!liked.length && (
                    <AiOutlineHeart
                      onClick={() => dispatch(likeSong({ songId: e.id }))}
                      className="music-icon"
                    />
                  )}
                  {liked.length !==0 && (
                    <AiFillHeart
                    style={{color:"red"}}
                      onClick={() => dispatch(dislikeSong({ songId: e.id }))}
                      className="music-icon"
                    />
                  )}</p>
                            <p className="play-length">{Math.floor(e.duration / 60)}:
                  {
                    (e.duration - Math.floor(e.duration / 60) * 60) > 10 ?(e.duration - Math.floor(e.duration / 60) * 60) : "0"+(e.duration - Math.floor(e.duration / 60) * 60)
                  }</p>
                            </div>
                            </div>
                        )
                    })}
                
            </div>
        </div>
    )
}