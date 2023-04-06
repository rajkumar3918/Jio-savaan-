
import "../styles/sidebar.scss";
import {GrHistory} from "react-icons/gr";
import {RxDisc} from "react-icons/rx";
import {BsMusicNote} from "react-icons/bs";
import {BiPodcast} from "react-icons/bi";
import {GiMicrophone} from "react-icons/gi";
import {AiOutlinePlus} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist, deletePlaylist } from "../redux/slice/playlistSlice";
const Sidebar = ()=>{
    const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const playlists = useSelector((state) => state.Playlists.value);
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(addPlaylist(value));
    setShow(false);
    setValue("");
  };
  useEffect(()=>{
    localStorage.setItem("playlists",JSON.stringify(playlists))
  },[playlists])
    return (<div className="sidebar-container">
        <div className="browse">
            <p>BROWSE</p>
            <ul>
                <li>New Release</li>
                <li>Top Chart</li>
                <li>Top Playlist</li>
                <li>Podcasts</li>
                <li>Top Artist</li>
                <li>Radio</li>
            </ul>
        </div>
        
        <div className="library">
        <p>LIBRARY</p>
        <ul>
                <li><GrHistory/> History</li>
                <li><BsMusicNote/> Songs</li>
                <li><RxDisc/> Albums</li>
                <li><BiPodcast/> Podcasts</li>
                <li><GiMicrophone/> Artist</li>
                
            </ul>
        </div>
        <button className="playlist-button" onClick={() => setShow(!show)}><AiOutlinePlus/> New Playlist</button>
        {show && (
        <div style={{ display: "flex", alignItems: "center",marginTop:"0.5rem" }}>
          <input
            style={{ maxWidth: "7rem",marginRight:"0.2rem" }}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button  onClick={handleAdd}>Add</button>
        </div>
      )}
      {playlists.map((e) => (
        <>
          <p className="sideBar-subTitle" key={e.id}>
            {e.name}
            <span onClick={() => dispatch(deletePlaylist(e.id))}>
              <IoMdCloseCircleOutline />
            </span>
          </p>
        </>
      ))}
      <ul className="sideBar-list">
        <li className="sideBar-list-item">Liked Songs</li>
      </ul>
    </div>)
}

export default Sidebar;