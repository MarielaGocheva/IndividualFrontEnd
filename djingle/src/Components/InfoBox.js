import React from "react";
import "./InfoBox.css"

export default function InfoBox({playlist}){
    return (
        <>
            <div className="info-box-container">
                <div className="info-flex-header">
                <div className="pl-info-img">
                    <img src={playlist.imageUrl} alt="playlist-img"></img>
                </div>
                <div className="pl-info-title-details">
                    <h4>{playlist.title}</h4>
                </div>
                </div>
                
                <div className="pl-info-genres">
                    <h4>Rock, Metal</h4>
                </div>
                <div className="pl-info-nr-songs">
                    {/* <h4>Number of songs: {}</h4> */}
                </div>
                <div className="pl-nr-plays">Number of plays: {playlist.plays}</div>
                <div className="pl-info-date-added">24.02.2020</div>
                <div className="pl-info-status">Published</div>
            </div>
        </>
    )
}