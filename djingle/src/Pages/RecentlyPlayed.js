import jwtDecode from "jwt-decode";
import "./RecentlyPlayed.css";
import React from "react";
import { useEffect, useState } from "react";
import PlaylistCreation from "../api/playlistServices";
import NavBar from "../Components/NavBar";
import Player from "../Components/Player";
import SongServies from "../api/songServices";

export default function RecentlyPlayed() {
  const decoded = jwtDecode(localStorage.getItem("login_access_token"));
  const accessToken = localStorage.getItem("spotify_access_token");
  const [history, setHistory] = useState([]);
  const [trackToPlay, setTrackToPlay] = useState("");

  useEffect(() => {
    (async () => {
      const response = await PlaylistCreation.getHistory(decoded.userId);
      console.log("Back-end returned: ", response.data);
      setHistory(response.data.recentlyPlayed);
    })();
  }, []);

  const handleSongClick = (e, song) => {
    (async () => {
      const response = await SongServies.setPlayed(song);
      console.log("PLAYED SONG ", response);
    })();
    //Starts the song
    setTrackToPlay(song);
  };

  return (
    <>
      <div className="menu-grid">
        <div className="menu">
          <NavBar />
        </div>
        <div className="content">
          <div className="recently-played-body">
            <h1>History</h1>
            <div className="history-container">
              {history.map((element, index) => (
                <div
                  className="history-row"
                  onClick={(e) => handleSongClick(e, element.songUri)}
                >
                  <div className="history-row-nr">{index + 1}</div>
                  <div className="history-song-img">
                    <img src={element.imageUrl} alt="song-img"></img>
                  </div>
                  <div className="history-song-title">
                    <span>{element.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="player">
            <Player accessToken={accessToken} trackUri={trackToPlay} />
          </div>
        </div>
      </div>
    </>
  );
}
