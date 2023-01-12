import jwtDecode from "jwt-decode";
import "./RecentlyPlayed.css";
import React from "react";
import { useEffect, useState } from "react";
import PlaylistCreation from "../api/playlistServices";
import NavBar from "../Components/NavBar";

export default function RecentlyPlayed() {
  const decoded = jwtDecode(localStorage.getItem("login_access_token"));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await PlaylistCreation.getHistory(decoded.userId);
      console.log("Back-end returned: ", response.data);
      setHistory(response.data.recentlyPlayed);
      // setRecentlyPlayed({song: response.data.song, playlist: response.data.playlist});
      // console.log("AFTER API ", recentlyPlayed.song, recentlyPlayed.playlist);
    })();
  }, []);

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
                    <div className="history-row">
                        <div className="history-row-nr">{index+1}</div>
                        <div className="history-song-img">
                            <img src={element.imageUrl} alt="song-img"></img>
                        </div>
                        <div className="history-song-title">{element.title}</div>

                        </div>
                ))}
                </div>
                
            </div>
        </div>
      </div>
    </>
  );
}
