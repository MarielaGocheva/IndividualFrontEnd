import logo from './logoDark.png';
import girl from './girlCropped.png';
import record from './record.png';
import NavBar from './Components/NavBar';
import './styles.css';
import HomePage from './Pages/HomePage';
import Playlists from './Pages/PlaylistsPage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import {redirect, Route, Routes, useResolvedPath, useMatch, Link} from "react-router-dom";
import LoginSpotify from './LoginSpotify';
import PlaylistView from './Components/PlaylistView';
import { useEffect, useState } from 'react';
import RoutePath from './routes/RoutePath';
import useAuth from './useAuth';

const code = new URLSearchParams(window.location.search).get('code')

export default function App() {

  return (
    // code ? 
    <>  
    <div className="menu-grid">
    <div className="menu"> 
    <ul>    
        <CustomLink to="/"><img src={logo} className="logo" alt="logo"/></CustomLink>
      </ul>
    <NavBar />

      </div>
      <div className="content"> 
        <RoutePath />
      {/* <Routes>
        <Route path='/' element={<HomePage code = {code}/>} />
        <Route path='/login/:email' element={<LoginPage />} />
        <Route path='/playlists/:userId' element={<Playlists />} />
        <Route path='/login' element={<LoginSpotify />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route psth='/playlists/playlist-view' element={<PlaylistView />} />
      
      </Routes> */}
      </div>
     
</div>  
    <div className="App">
                
    </div>
    </>
    // : <div>
    //   <Routes>
    //   <Route path='/login/:email' element={<LoginPage />} />
    //   <Route path='/register' element={<RegisterPage />} />
    //   </Routes>
    //   <LoginPage /> 
    //   <h1>UNLUCKY</h1>
    //   <h1>{console.log("logged out")}</h1>
    //   </div>
  );
}

function CustomLink({to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true})
return (
  <li className={isActive? "active" : ""}>
      <Link to ={to} {...props}>{children}</Link>
  </li>
)
}

// export default App


{/* <header className="App-header">
        <img src={logo} className="logo" alt="logo" />

      </header> */}
      {/* <body>
        <div className="record-contains">
          <span className="circle">
            <img src={record} className="App-logo" alt='record'/>
          </span>
          </div>
        
        <img src={girl} className="img-girl" alt="girl"/>
        
      </body> */}
      {/* <HomePage /> */}
      {/* <script>{window.location.href="http://localhost:3000/home"}</script> */}
