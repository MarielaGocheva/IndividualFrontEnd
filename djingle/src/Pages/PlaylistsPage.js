import './PlaylistsPage.css';
import Playlist from '../Components/Playlist';
import recent from '../rec.png';
import SearchBar from '../Components/SearchBar';
import CreatePlaylist from "../add-playlist-icon.png";
import useAuth from '../useAuth';
import PlaylistView from '../Components/PlaylistView';
import { useState, useEffect } from 'react';
import PlaylistCreation from '../api/playlistServices';
import GeneralPlaylist from '../Components/GeneralPlaylist';
import newPlaylist from "../newPlaylistImg.png"
import NavBar from '../Components/NavBar';
import { useResolvedPath, useMatch, Link } from 'react-router-dom';
import logo from '../'

export default function Playlists(){
    // const accessToken = useAuth(code)
    const [playlist, setPlaylist] = useState("");
    const [userIdState, setUserIdState] = useState({
        userId: "2"
    });
    const [playlistsToDislay, setPlaylistsToDisplay] = useState([]);
    const [overlay, setOverlay] = useState(false);

    const handleCreationRequest = async (e) => {
        e.preventDefault();
        setOverlay(true);
        setPlaylist("created");
      };

    function isCreated(){
        if(playlist !== ""){
            return <PlaylistView />;
        }
    }

    const handlePlaylistClick = (e) => {
        return <PlaylistView />
    }

    useEffect(()=>{
        (async() => {
            const response = await PlaylistCreation.getUserPlaylists(userIdState.userId);
            setPlaylistsToDisplay(response.data.playlists);
            
        })();
    },[]);

    const [newPlaylistState, setNewPlaylistState] = useState({
        playlistName: "",
        userId: 2
    });

    const onInputChange = (e) => {
        setNewPlaylistState({ ...newPlaylistState, [e.target.name]: e.target.value });
        console.log("plName after input change: " + newPlaylistState.playlistName)
    };

    const handleCreation = () => {
        (async() => {
            const response = await PlaylistCreation.newPlaylist(newPlaylistState.userId, newPlaylistState.playlistName);
            console.log("Back-end returned: ", response);
        })();
        }

    function showOverlay(){
        return  <><input type="checkbox" id="toggle-1"></input>
        <div className="page-overlay"></div>
        
        <div className="new-playlist-info">
            <img src={newPlaylist} alt="decoration"></img>
            <div className="pl-title">
            <label>Playlist Title</label>
            </div>
            <div> <input name="playlistName" id="playlistName" type="text" placeholder="Give your playlist a title" onChange={onInputChange}></input></div>
           <div className="pl-create-btn"><label onClick={handleCreation} type="submit">Create</label>
          </div>   
        </div></>
    }

    function normalState(){
        if(overlay){
            setOverlay(false)
            return showOverlay()
        }
    }

    useEffect(() => {
        normalState()
    }, [overlay])
    


    return (
        <>
        {/* <div>{code}</div> */}
        <div className="menu-grid">
    <div className="menu"> 
    {/* <ul>    
        <CustomLink to="/"><img src={logo} className="logo" alt="logo"/></CustomLink>
      </ul>  */}
    <NavBar />
       </div>
      <div className="content"> 
      {isCreated()}
        {normalState()}
        <div className='search-bar'>
            <SearchBar />
        </div>
          <div className="page-title">
            <h1>My Playlists</h1>
            <span className="nr-playlists">12 playlists</span>
            {/* <div className='create-playlist'> */}
            
                <button className="create-playlist-btn" type='submit' onClick={handleCreationRequest}>
                    <img src={CreatePlaylist} alt="create Playlist button"></img>
                    <span>Create Playlist</span>
                </button>
                {/* <Link to={handleCreation}><img src={CreatePlaylist} alt='create playlist button'></img>Create Playlist</Link> */}
            {/* </div> */}
          </div>
          <div className='page-content'>
          <div className="symbols">
                    <div className="nr-symbol"><p>#</p></div>
                    <div className="title-symbol"><p>Title</p></div>
                    
                    <div className="DJ-symbol"><p>Date added</p></div>
                    <div className="duration-symbol"><img src={recent} alt='duration'></img></div>
                </div>
                <hr id='pl-hr'></hr>
                <div className='playlist-containers'>

                    {playlistsToDislay.map((element, index) => ( 
                        
                        <div className='playlist-row' onClick={handlePlaylistClick}>
                            <div className='playlist-nr'>{index+1}</div>
                            <div className='pl'><GeneralPlaylist title={element.title} userId = {element.userId} /></div>
                            <div className='date-added'>Feb 3, 2022</div>
                            <div className='pl-duration'>4:12</div>
                    </div>))}
                </div>
                </div>
        </div>
        </div>
        </>
    );
}