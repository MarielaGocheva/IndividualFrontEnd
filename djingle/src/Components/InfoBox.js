import React from "react";
import "./InfoBox.css"

export default function InfoBox({playlist}){
    console.log("info box, ");
    return (
        <>
            <div className="info-box-container">
                <div className="pl-info-img">
                    <img src={playlist.imageUrl} alt="playlist-img"></img>
                </div>
                <div className="pl-info-title-details">
                    <h4>{playlist.title}</h4>
                </div>
                <div className="pl-info-genres">
                    <h4>Rock, Metal</h4>
                </div>
                <div className="pl-info-nr-songs">
                    <h4>Number of songs: {2}</h4>
                </div>
                <div className="pl-info-date-added">24.02.2020</div>
                <div className="pl-info-status">Published</div>
            </div>
        </>
    )
}