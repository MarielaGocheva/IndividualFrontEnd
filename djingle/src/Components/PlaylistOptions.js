import React, { useState } from "react";
import "./PlaylistOptions.css";
import { useEffect } from "react";
import PlaylistCreation from "../api/playlistServices";

export default function PlaylistOptions({ id, handlePlaylistChoice }) {
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
      (async () => {
        const response = await PlaylistCreation.getUserPlaylists(id);
        setOptions(response.data.playlists);
      })();
    }, []);

    const handleAdding = (event, title) => {
        handlePlaylistChoice(title);
    }

    return (
      <>
        <div className="options-container">
          {options.map((element, index) => (
            <div className="pl-option" onClick={(event) => handleAdding(event, element.title)}>
              {element.title}
            </div>
          ))}
        </div>
      </>
    );
  }
