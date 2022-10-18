import logo from './logoDark.png';
import girl from './girlCropped.png';
import record from './record.png';
//import './App.css';
import NavBar from './Components/NavBar';
import './styles.css';
import HomePage from './Pages/HomePage';
import Playlists from './Pages/PlaylistsPage';
import RegisterPage from './Pages/RegisterPage';
import {Route, Routes} from "react-router-dom";

export default function App() {
  return (
    <>
    {/* <header className="App-header">
        <img src={logo} className="logo" alt="logo" />

      </header> */}
    <div className="menu-grid">
<div className="menu"> 
<img src={logo} className="logo" alt="logo" />

<NavBar />
      
      </div>
<div className="content"> <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<RegisterPage />} />
        <Route path='/playlists' element={<Playlists />} />
      </Routes></div>
</div>
    <div className="App">
      
      
      {/* <body>
        <div className="record-contains">
          <span className="circle">
            <img src={record} className="App-logo" alt='record'/>
          </span>
          </div>
        
        <img src={girl} className="img-girl" alt="girl"/>
        
      </body> */}
    </div>
    </>
  );
}

// export default App
