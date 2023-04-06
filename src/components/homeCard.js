import { useDispatch } from "react-redux";
import React from "react";
import "../styles/homeCard.scss";
import { fetchDetails } from "../redux/slice/queueSlice";
export default function HomeCard ({data}){
    const dispatch = useDispatch();
    const handleClick = ()=>{
        const songUrl = "https://saavn.me/songs?id="+data.id;
        const albumUrl = "https://saavn.me/albums?id="+data.id;
        const playlisturl = "https://saavn.me/playlists?id="+data.id;
        let url = "";
        if(data.type === "playlist") url = playlisturl;
        if(data.type === "album") url = albumUrl;
        if(data.type === "song") url = songUrl;
        dispatch(fetchDetails({url,dispatch}));

    }
    return(
    
        <div className="card" onClick={handleClick}>
            <img className="card-img" src={data.image[2].link}></img>
            <p className="card-title">{data.title}</p>
            <p className="card-subtitle">{data.subtitle}</p>
        </div>
    )
}
