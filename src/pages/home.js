import React, { useEffect } from "react";
import {v4 as uuid} from "uuid";
import "../styles/home.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchHomePageData } from "../redux/slice/homePageSlice";
import HomeCard from "../components/homeCard";

export default function Home(){
    const dispatch = useDispatch();
    const trending = useSelector(state => state.HomePage.trending);
    const albums = useSelector(state => state.HomePage.albums);
    const playlists = useSelector(state => state.HomePage.playlists);
    const charts = useSelector(state => state.HomePage.charts);

    useEffect(()=>{
        dispatch(fetchHomePageData());
    },[])
    return(
        <div className="home-container">
            <h2 className="home-title">Trending</h2>
            <div className="home-module">
                
                {trending.albums && trending.albums.map(e=>{
                    let obj = {...e};
                    let title = obj.name;
                    delete obj.name;
                    obj.title = title;
                    return <HomeCard data={obj} key={uuid()}/>
                })}

            </div>
            <h2 className="home-title">Charts</h2>
            <div className="home-module">
              
                {charts.map(e=><HomeCard data={e} key={uuid()}/>)}
            </div>
            <h2 className="home-title">PlayLists</h2>
            <div className="home-module">
               
                {playlists.map(e=><HomeCard data={e} key={uuid()}/>)}
                
            </div>
            <h2 className="home-title">Albums</h2>
            <div className="home-module">
              
                {albums.map(e=>{
                    let obj = {...e};
                    let title = obj.name;
                    delete obj.name;
                    obj.title = title;
                    return <HomeCard data={obj} key={uuid()}/>
                })}
               
            </div>
        </div>
    )
}