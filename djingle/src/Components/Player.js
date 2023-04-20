import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import "./Player.css"

export default function Player({accessToken, trackUri}){
    if(!accessToken) return null
    return (
        <>
        <div className="track-player">
        <SpotifyPlayer 
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
        />
        </div>
        </>
    )
}