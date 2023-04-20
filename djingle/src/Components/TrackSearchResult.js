import React, { useState, useEffect } from "react";
import "./TrackSearchResult.css";
import addSong from "../add-icon.png";
import PlaylistCreation from "../api/playlistServices";
import PlaylistOptions from "./PlaylistOptions";
import jwtDecode from "jwt-decode";

export default function TrackSearchResult({ track, chooseTrack }) {
  var decoded = jwtDecode(localStorage.getItem("login_access_token"));
  const [isShown, setIsShown] = useState(false);
  const [playlistId, setPlaylistId] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [addSongState, setAddSongState] = useState({
    songUri: "",
    artist: "",
    title: "",
    imageUrl: ""
  });

  function handlePlay() {
    chooseTrack(track);
  }

//   const handleAddSong =  () => {
//     setAddSongState(
//         (addSongState.songUri = track.uri),
//         (addSongState.artist = track.artist),
//         (addSongState.title = track.title),
//         (addSongState.imageUrl = track.albumUrl)
//       );
//     (async () => {
//           console.log("SAVING INFO: ", playlistId, addSongState.songUri);
//           const response = await PlaylistCreation.addSong(
//             playlistId,
//             addSongState.songUri
//           );
//           console.log("Response" + response.data.added);
//     })();
//   }

  const handleShowOptions = (e) => {
    setIsShown((current) => !current);
  };

  const handlePlaylistChoice = (playlist) => {
    setPlaylistTitle({ playlist });
    setIsShown((current) => !current);
    (async () => {
      const response = await PlaylistCreation.findPlaylistByTitleAndUserId(
        playlist,
        decoded.userId
      );
    //   setPlaylistId(response.data.playlist.id);
      console.log("PLAYLIST ID BEFORE HANDLE SONG ", response.data.playlist.id);
      setAddSongState(addSongState.songUri = track.uri, addSongState.artist= track.artist, addSongState.title= track.title, addSongState.imageUrl= track.albumUrl);
    console.log(addSongState);
    (async () => {
          console.log("SAVING INFO: ", response.data.playlist.id, addSongState.songUri);
          const response2 = await PlaylistCreation.addSong(
            response.data.playlist.id,
            addSongState.songUri,
            addSongState.artist,
            addSongState.title,
            addSongState.imageUrl
          );
          console.log("Response" + response2.data.added);
    })();
    })();
    // handleAddSong();
  };

  return (
    <>
    <div id="search-row" className="background-search">
      <div className="track-container" style={{ cursor: "pointer" }}>
        <img src={track.albumUrl} alt="song-img" onClick={handlePlay}/>
        <div className="track-details" onClick={handlePlay}>
          <div className="track-title">{track.title}</div>
          <div className="track-artist">{track.artist}</div>
        </div>
        <div className="add-button">
          <button type="input" onClick={handleShowOptions}>
            <img src={addSong}></img>
          </button>
        </div>
        {isShown && (
          <PlaylistOptions id={decoded.userId} handlePlaylistChoice={handlePlaylistChoice} />
        )}
      </div>
      </div>
    </>
  );
}
