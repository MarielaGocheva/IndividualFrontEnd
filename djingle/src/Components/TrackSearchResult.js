import React, { useState } from "react";
import "./TrackSearchResult.css";
import addSong from "../add-icon.png";

export default function TrackSearchResult({track, chooseTrack}) {
    const [addSongState, setAddSongState] = useState({
        songUri: "",
        artist: "",
        title: "",
        imageUrl: ""
    })

    function handlePlay(){
        chooseTrack(track)
    }

    function handleAddSong(){
        setAddSongState(addSongState.songUri = track.uri, addSongState.artist = track.artist, addSongState.title = track, addSongState.imageUrl = track.albumUrl);
        console.log("Track to add: ", addSongState.songUri, addSongState.artist, addSongState.duration, addSongState.imageUrl)
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