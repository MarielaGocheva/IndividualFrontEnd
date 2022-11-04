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
        </div>
        </>
    )
}