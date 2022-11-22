import './PlaylistsPage.css';
import Playlist from '../Components/Playlist';
import recent from '../rec.png';
import SearchBar from '../Components/SearchBar';
import CreatePlaylist from "../add-playlist-icon.png";
import useAuth from '../useAuth';
import PlaylistView from '../Components/PlaylistView';
import { useState } from 'react';

export default function Playlists(){
    // const accessToken = useAuth(code)
    const [playlist, setPlaylist] = useState("");

    const handleCreation = async (e) => {
        e.preventDefault();
        setPlaylist("created");
      };

    function isCreated(){
        if(playlist !== ""){
            return <PlaylistView />;
        }
    }

    return (
        <>
        {/* <div>{code}</div> */}
        {isCreated()}
        <div className='search-bar'>
            <SearchBar />
        </div>
          <div className="page-title">
            <h1>My Playlists</h1>
            <span className="nr-playlists">12 playlists</span>
            <div className='create-playlist'>
                <button className="create-playlist-btn" type='submit' onClick={handleCreation}>
                    <img src={CreatePlaylist} alt="create Playlist button"></img>
                    <span>Create Playlist</span>
                </button>
                {/* <Link to={handleCreation}><img src={CreatePlaylist} alt='create playlist button'></img>Create Playlist</Link> */}
            </div>
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
                    <div className='playlist-row'>
                        <div className='playlist-nr'>1</div>
                        <div className='pl'><Playlist /></div>
                        <div className='date-added'>Feb 3, 2022</div>
                        <div className='pl-duration'>4:12</div>
                    </div>
                    <div className='playlist-row'>
                        <div className='playlist-nr'>1</div>
                        <div className='pl'><Playlist /></div>
                        <div className='date-added'>Feb 3, 2022</div>
                        <div className='pl-duration'>4:12</div>
                    </div>
                    <div className='playlist-row'>
                        <div className='playlist-nr'>1</div>
                        <div className='pl'><Playlist /></div>
                        <div className='date-added'>Feb 3, 2022</div>
                        <div className='pl-duration'>4:12</div>
                    </div>
                    <div className='playlist-row'>
                        <div className='playlist-nr'>1</div>
                        <div className='pl'><Playlist /></div>
                        <div className='date-added'>Feb 3, 2022</div>
                        <div className='pl-duration'>4:12</div>
                    </div>
                    <div className='playlist-row'>
                        <div className='playlist-nr'>1</div>
                        <div className='pl'><Playlist /></div>
                        <div className='date-added'>Feb 3, 2022</div>
                        <div className='pl-duration'>4:12</div>
                    </div>
                    <div className='playlist-row'>
                        <div className='playlist-nr'>1</div>
                        <div className='pl'><Playlist /></div>
                        <div className='date-added'>Feb 3, 2022</div>
                        <div className='pl-duration'>4:12</div>
                    </div>
                </div>
                </div>
        </>
    );
}
