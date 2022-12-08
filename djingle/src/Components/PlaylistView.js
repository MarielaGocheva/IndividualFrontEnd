import defaultPlaylistImg from "../plCover.png"
import "./PlaylistView.css"
import newPlaylist from "../newPlaylistImg.png"
import { useState } from "react";
import PlaylistCreation from "../api/playlistServices";

export default function PlaylistView(){
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

    return (
        <>
        <input type="checkbox" id="toggle-1"></input>
        <div className="page-overlay"></div>
        
        <div className="new-playlist-info">
            <img src={newPlaylist} alt="decoration"></img>
            <div className="pl-title">
            <label>Playlist Title</label>
            </div>
            <div> <input name="playlistName" id="playlistName" type="text" placeholder="Give your playlist a title" onChange={onInputChange}></input></div>
           <div className="pl-create-btn"><label onClick={handleCreation} for="toggle-1" type="submit">Create</label>
          </div>   
        </div>
        {/* CREATED PLAYLIST!!!!!!!!!!! */}
        <div className="created-playlist">
            <div className="playlist-head">
                <div className="playlist-picture">
                    <img src={defaultPlaylistImg} alt="pl-img"></img>
                </div>
                <div className="playlist-details">
                    <span className="playlist-type">Playlist</span>
                    <div className="playlist-name">
                        <h1>{newPlaylistState.playlistName}</h1>
                    </div>
                    <div className="playlist-author">
                        <h2>Mariela Gocheva</h2>
                    </div>
                </div>
            </div>
                <div className="playlist-content"></div>
            </div>
        </>
    );
}