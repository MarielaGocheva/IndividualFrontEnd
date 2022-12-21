import React from "react";
import "./PlaylistViewClient.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import PlaylistCreation from "../api/playlistServices";

export default function PlaylistViewClient() {
  const { state } = useLocation();
  const { title, userId } = state;
  const [playlistInfo, setPlaylistInfo] = useState({
    id: "",
    userId: "",
    title: "",
    imgUrl: "",
    songs: [],
  });

  useEffect(() => {
    (async () => {
      const response = await PlaylistCreation.findPlaylistByTitleAndUserId(
        title,
        userId
      );
      setPlaylistInfo({
        id: response.data.playlist.id,
        userId: response.data.playlist.userId,
        title: response.data.playlist.title,
        imgUrl: response.data.playlist.imageUrl,
        songs: response.data.playlist.songs,
      });
      console.log("playlist backend: ", response.data);
    })();
  }, []);

  return (
    <>
      <div className="menu-grid">
        <div className="menu">
          <NavBar />
        </div>
        <div className="content">
          <div className="playlist-view-client">
            <div className="playlsit-view-details">
              <div className="playlist-view-img">
                <img src={playlistInfo.imgUrl} alt="playlist-img"></img>
              </div>
              <div className="playlist-view-info">
                <div className="playlist-view-title">
                    <h1>{playlistInfo.title}</h1>
                </div>
                <div className="playlist-view-genres"></div>
              </div>
            </div>
            <div className="playlist-view-songs">
              <h1>Song</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
