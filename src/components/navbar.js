import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../redux/slice/searchResultSlice";
import "../styles/navbar.scss"
// import{IoIosSearch} from 'react-icons/io'
const Navbar = ()=>{
    const dispatch = useDispatch();
    const searchres = useSelector((state)=> state.Search.value );
    console.log(searchres)
    const handleSearch = (e)=>{
        const searchTxt = e.target.value;
        if(searchTxt.length>3){
        dispatch(fetchSearch({searchTxt,dispatch}))
        }

    }
    const searchKeys = searchres.data;
    // console.log(searchKeys)
    return(
        <div className="navbar-container">
            <div className="navbar-logo">
                {/* <img alt="logo." src="https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/JioSaavn-900x0.png"></img> */}
                <h1 style={{color : "black"}}>JioSaavn</h1>
                <p>Music</p>
                <p>Podcast</p>
                <p>Go Pro</p>
            </div>
            <div className="searchbar-container">
                <input className="searchbar"  type="text" placeholder="Search.."  onChange={handleSearch}></input>
                <div className="search-results-box">
                {/* {searchres && (
              <div>
                {searchKeys.length &&
                  searchKeys.map((e) => {
                    return (
                      <div>
                        <h3>{e}</h3>
                        {searchres.data[e].results.map((e) => (
                          <div >
                            <img src={e.image[0].link}/>
                            <p >{e.title}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
              </div>
            )} */}
                </div>
            </div>
            <div className="login-signup">
                <p>Music Languages</p>
                <button>Log In</button>
                <button>Sign Up</button>    
            </div>
        </div>
    )
}
export default Navbar;