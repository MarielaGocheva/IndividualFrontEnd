import { useEffect } from "react";
import { useState } from "react";
import album_photo from "../audioslave.jpeg";
import "./Playlist.css";
import PlaylistCreation from "../api/playlistServices";

export default function GeneralPlaylist({title, id, img}){
    const [playlistGenres, setPlaylistGenres]=useState([]);
    console.log("ID" + id);

      useEffect(() => {
        (async () => {
            const response = await PlaylistCreation.getPlaylistGenres(
              id
            );
            setPlaylistGenres(response.data.genres);
          })();
      }, [])

    return (
        <>
        <div className="playlist_container">
            <div className="photo">
                <img className="playlist_img" src={img} alt="album_photo"></img>
            </div>
            <div className="description">
                <p className="title">Playlist</p>
                <div className="playlist_name" id="general-pl">{title}</div>
                <span className="playlist_creator">
                {playlistGenres.map((element) => (
                     element.name + " "
                ))}
                </span>
            </div>
        </div>
        </> 
       
    );
}
