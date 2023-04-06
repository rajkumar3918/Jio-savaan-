import React from 'react';
 import {Route, Routes} from "react-router-dom";
 import Home from './pages/home';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Player from './components/player';
import Queue from './components/queue';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route index element={<Home/>} />
      </Routes>
      <Sidebar/>
      <Player/>
      <Queue/>
     
    </div>
  );
}

export default App;

