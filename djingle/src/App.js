import logo from './logoDark.png';
import girl from './girlCropped.png';
import record from './record.png';
//import './App.css';
import NavBar from './Components/NavBar';
import './styles.css';
import HomePage from './Pages/HomePage';
import Playlists from './Pages/PlaylistsPage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import {Route, Routes} from "react-router-dom";
import LoginSpotify from './LoginSpotify';

const code = new URLSearchParams(window.location.search).get('code')

export default function App() {
  return (
    code ? 
    <>  
    <div className="menu-grid">
    <div className="menu"> 
      <img src={logo} className="logo" alt="logo" />
    <NavBar code = {code}/>

      </div>
      <div className="content"> <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/login://callback' element={<RegisterPage />} />
        <Route path='/playlists' element={<Playlists />} />
        <Route path='/login' element={<LoginSpotify />} />
        <Route path='/login://callback' element={<LoginPage />} />
      </Routes></div>
</div> 

    <div className="App">
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
      <HomePage code = {code}/>
    </div>
    </>
    : <div><LoginSpotify /> <h1>{console.log("logged out")}</h1></div>
  );
}

// export default App
