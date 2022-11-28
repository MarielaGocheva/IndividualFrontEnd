import React, { useState } from "react";
import "./TrackSearchResult.css";
import addSong from "../add-icon.png";
import PlaylistCreation from "../api/playlistServices";

export default function TrackSearchResult({track, chooseTrack}) {
    const [addSongState, setAddSongState] = useState({
        songUri: "",
        artist: "",
        title: "",
        imageUrl: ""
    })

    const [playlistId, setPlaylistId] = useState(2);

    function handlePlay(){
        chooseTrack(track)
    }

    const handleAddSong = async (e) => {
        setAddSongState(addSongState.songUri = track.uri, addSongState.artist = track.artist, addSongState.title = track.title, addSongState.imageUrl = track.albumUrl);
        (async() => {
            const response = await PlaylistCreation.addSong(playlistId, addSongState.songUri);
            console.log("Response" + response.data.added);
        })();
    }

    return (
        <>
        <div className="track-container" style={{cursor: 'pointer'}} onClick={handlePlay}>
            <img src={track.albumUrl} alt="song-img" />
            <div className="track-details">
                <div className="track-title">{track.title}</div>
                <div className="track-artist">{track.artist}</div>
            </div>
            <div className="add-button">
                <button type="input" onClick={handleAddSong}><img src={addSong}></img></button>
            </div>
        </div>
        </>
    )
}