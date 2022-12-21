import { useState } from "react";
import album_photo from "../audioslave.jpeg";
import "./Playlist.css";


export default function GeneralPlaylist({title, userId}){
    console.log("TITLE" + title)
    return (
        <>
        <div className="playlist_container">
            <div className="photo">
                <img className="playlist_img" src={album_photo} alt="album_photo"></img>
            </div>
            <div className="description">
                <p className="title">Playlist</p>
                {console.log("element title and id: ", title, userId)}
                <div className="playlist_name">{title}</div>
                <span className="playlist_creator">{userId}</span>
            </div>
        </div>
        </> 
       
    );
}
