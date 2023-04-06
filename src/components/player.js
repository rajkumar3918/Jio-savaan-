import React, { useEffect, useRef, useState } from "react";
import "../styles/player.scss"
import {TbArrowsShuffle} from "react-icons/tb";
import {BiSkipPrevious,BiSkipNext,BiPlay,BiRepeat} from "react-icons/bi";
import {BsThreeDots} from "react-icons/bs";
import {GrExpand} from "react-icons/gr";
import {RiVolumeUpFill} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrent } from "../redux/slice/currentPlayingSlice";
import { IoMdAdd } from "react-icons/io";
import {FaPlay} from "react-icons/fa"
import {GiPauseButton} from "react-icons/gi"
import { IoMdCloseCircleOutline } from "react-icons/io";
import { addPlaylist, addSongToPlaylist, deletePlaylist } from "../redux/slice/playlistSlice"
import Modal from "./model";
function Player(){
    const [openModal, setOpenModal] = useState(false);
    const song = useSelector(state => state.CurrentPlaying.song);
    console.log(song)
    let currentIndex = useSelector((state)=> state.CurrentPlaying.index);
    const queue = useSelector((state)=> state.Queue.value);
    // console.log(queue);
    const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [playing, setPlaying] = useState(song.downloadUrl ? true : false);
  const [currTime, setCurrTime] = useState();
  const playlists = useSelector((state) => state.Playlists.value);
  const handleAdd = () => {
    dispatch(addPlaylist(value));
    setShow(false);
    setValue("");
  };
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);
    
    const dispatch = useDispatch();
    let temp;
    if(queue && queue.length){
        temp = queue;  
      }
      if(queue && queue.songs){
        temp = queue.songs;
      } 
    const handleNext = () => {
        let nextIndex = currentIndex +1;
        if(currentIndex === temp.length-1) {
          nextIndex = 0;
        }
        dispatch(selectCurrent({
          song: temp[nextIndex],
          index: nextIndex
        }))
      }

    const handlePrev = () => {
        let nextIndex = currentIndex -1;
        if(currentIndex === 0) {
          nextIndex = temp.length-1;
        }
        dispatch(selectCurrent({
          song: temp[nextIndex],
          index: nextIndex
        }))
      }
      let url = "";
      if (song && song.downloadUrl) {
        url = song.downloadUrl[song.downloadUrl.length - 1].link;
      }
    
      const audioRef = useRef();
    
      useEffect(() => {
        if (audioRef.current && url) {
          audioRef.current.play();
    
          setTimeout(() => {
            handleNext();
          }, song.duration * 1000);
        }
      }, [url]);

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrTime(audioRef.current.currentTime);
        }, 100);
        return () => clearInterval(interval);
      }, [currTime]);
    
      const formatTime = (arg) => {
        let mins, secs;
        mins = Math.floor(arg / 60);
        if (mins < 10) mins = "0" + mins;
        secs = (arg % 60).toFixed(0);
        if (parseFloat(secs) < 10) secs = "0" + secs;
        return mins + ":" + secs;
      };
      const [hover, setHover] = useState({
        currentTime: 0,
        clientX:0,
        show: false
      })

      const coordinates = (e)=>{
        const clientX = e.clientX;
        const clientWidth = e.target.clientWidth;
        const currentTime = ((clientX/clientWidth)*song.duration);
        setHover({clientX,currentTime,show:true});
      }
      const handleSkip = ()=>{
        audioRef.current.currentTime = hover.currentTime;
        setCurrTime(hover.currentTime);
      }
      
    
    return(
        <div className="player-container">
          <div className="player-progress-container" onMouseLeave={()=>setHover({...hover,show:false})}
           onMouseEnter={coordinates} onClick={handleSkip}>
            {hover.show && <p className="player-tooltip" style={{left:hover.clientX}}>
              {formatTime(hover.currentTime)}</p>}
            <div className="player-progress"  style={{width: ((currTime/song.duration)*100)+"%"}}></div>
          </div>
            <div className="leftplayer">
                <img src={song && song.image && song.image[2].link} alt=""/>
                <audio ref={audioRef} src={url}></audio>
                <div>
                    <p className="song">{song && song.name}</p>
                    <p className="artists">{song && song.primaryArtists}</p>
                </div>
            </div>
            <div className="centerplayer">
            <BiRepeat className="pplayericons"/>
            <BiSkipPrevious className="playericons" onClick={handlePrev}/>
            {!playing && url && (
          <FaPlay
            className="player-icon"
            onClick={() => {
              audioRef.current.play();
              setPlaying(true);
            }}
          />
        )}
        {playing && url && (
          <GiPauseButton
            className="player-icon"
            onClick={() => {
              audioRef.current.pause();
              setPlaying(false);
            }}
          />
        )}
            <BiSkipNext className="playericons"  onClick={handleNext}/>
            <TbArrowsShuffle className="pplayericons"/>
            </div>
            <div className="rightplayer">
            {!url && <p>00:00/00:00</p>}
        {url && (
          <p>
            {formatTime(currTime)}/{formatTime(song.duration)}
          </p>
        )}
                <BsThreeDots className="lplayericons"/>
                <RiVolumeUpFill className="lplayericons"/>
                <IoMdAdd
          className="player-icon"
          onClick={() => setOpenModal(!openModal)}
        />
                <GrExpand className="lplayericons"/>
               
            </div>
            <Modal
        open={openModal}
        setOpen={setOpenModal}
        style={{ transform: "translateY(-90%)" }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "2rem",
            zIndex: 2,
            minHeight: "30rem",
            minWidth: "30rem",
            textAlign: "center",
          }}
        >
          <button className="sideBar-add-btn" onClick={() => setShow(!show)}>
            <IoMdAdd />
            <span>New Playlist</span>
          </button>
          {show && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <input
                style={{ maxWidth: "7rem", marginRight: "0.2rem" }}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button onClick={handleAdd}>Add</button>
            </div>
          )}
          {playlists.map((e) => (
            <>
              <p className="sideBar-subTitle" key={e.id} onClick={()=>dispatch(addSongToPlaylist({playlistId:e.id, songId: song.id}))}>
                {e.name}
              </p>
                <span onClick={() => dispatch(deletePlaylist(e.id))}>
                  <IoMdCloseCircleOutline />
                </span>
            </>
          ))}
        </div>
      </Modal>
        </div>
    )
}
export default Player;