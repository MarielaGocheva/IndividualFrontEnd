<<<<<<< HEAD
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

    const [playlistId, setPlaylistId] = useState(5);

    function handlePlay(){
        chooseTrack(track)
    }

    const handleAddSong = async (e) => {
        setAddSongState(addSongState.songUri = track.uri, addSongState.artist = track.artist, addSongState.title = track.title, addSongState.imageUrl = track.albumUrl);
        (async() => {
            console.log("SAVING INFO: ", playlistId, addSongState.songUri)
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
=======
import React from "react";

export default function TrackSearchResult({track, chooseTrack}) {
    function handlePlay(){
        chooseTrack(track)
    }
    return (
        <>
        <div className="track-container" style={{cursor: 'pointer'}} onClick={handlePlay}>
            <img src={track.albumUrl} style={{height: '64px', width: '64px'}} />
            <div className="track-title">{track.title}</div>
            <div className="track-artist">{track.artist}</div>
>>>>>>> 853325d4435a0915e0e5eaecc25e6a655a03ebf6
        </div>
        </>
    )
}