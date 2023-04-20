import React from "react";
import "./PlaylistViewClient.css";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavBarClient from "../Components/NavBarClient";
import PlaylistCreation from "../api/playlistServices";
import recent from "../rec.png";
import pl from "../pl.jpg";
import Player from "../Components/Player";
import jwtDecode from "jwt-decode";
import SongServies from "../api/songServices";
import likePlaylist from "../likePlaylist.png";
import likedPlaylist from "../likedPlaylsit.png";

export default function PlaylistViewClient() {
  const decoded = jwtDecode(localStorage.getItem("login_access_token"));
  const accessToken = localStorage.getItem("spotify_access_token");
  const { state } = useLocation();
  const { title, userId } = state;
  const [trackToPlay, setTrackToPlay] = useState("");
  const [liked, setLiked] = useState(false);
  const [playlistInfo, setPlaylistInfo] = useState({
    id: null,
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

  useEffect(() => {
    if (playlistInfo.id != null) {
      console.log("SENDING FOR PLAYED : ", playlistInfo.id);
      (async () => {
        const response = await PlaylistCreation.setPlayed(playlistInfo.id);
        console.log(response);
      })();
      (async () => {
        const response = await PlaylistCreation.checkIfLiked(
          decoded.userId,
          playlistInfo.id
        );
        setLiked(response.data.liked);
      })();
    }
  }, [playlistInfo.id]);

  const handleSongClik = (e, song) => {
    //Updates the number of times the song was played
    (async () => {
      const response = await SongServies.setPlayed(song);
      console.log("PLAYED SONG ", response);
    })();
    //Starts the song
    setTrackToPlay(song);
  };

  useEffect(() => {
    if (trackToPlay != "") {
      console.log("SETTING ", decoded.userId, trackToPlay, title, userId);
      (async () => {
        const response = await PlaylistCreation.setRecentlyPlayed(
          decoded.userId,
          trackToPlay,
          title,
          userId
        );
        console.log("Back-end returned: ", response);
      })();
    }
  }, [trackToPlay]);

  useEffect(() => {
    if (liked) {
      setBtnLikeImg(likedPlaylist);
    } else {
      setBtnLikeImg(likePlaylist);
    }
  }, [liked]);

  const [btnLikeImg, setBtnLikeImg] = useState(likePlaylist);
  const handleLike = () => {
    if (btnLikeImg == likePlaylist) {
      setBtnLikeImg(likedPlaylist);
      (async () => {
        const response = await PlaylistCreation.likePlaylist(
          decoded.userId,
          playlistInfo.id
        );
        console.log(response);
      })();
    } else {
      (async () => {
        const response = await PlaylistCreation.dislikePlaylist(
          decoded.userId,
          playlistInfo.id
        );
        console.log(response);
      })();
      setBtnLikeImg(likePlaylist);
    }
  };

  useEffect(() => {}, [btnLikeImg]);

  return (
    <>
      <div className="menu-grid">
        <div className="menu">
          <NavBarClient />
        </div>
        <div className="content">
          <div className="playlist-view-client">
            <div className="playlist-view-details">
              <div className="playlist-view-img">
                <img src={playlistInfo.imgUrl} alt="playlist-img"></img>
              </div>
              <div className="playlist-view-info">
                <div className="playlist-view-title">
                  <h1>{playlistInfo.title}</h1>
                </div>
                <div className="playlist-view-genres"></div>
              </div>
              <div className="like-playlist">
                <button type="submit">
                  <span>Add to library</span>
                  <img
                    src={btnLikeImg}
                    alt="like-pl"
                    onClick={handleLike}
                  ></img>
                </button>
              </div>
            </div>
            <div className="playlist-view-songs">
              <div className="symbols">
                <div className="nr-symbol">
                  <p>#</p>
                </div>
                <div className="title-symbol">
                  <p>Title</p>
                </div>

                <div className="album-symbol">
                  <p>Album</p>
                </div>
                <div className="duration-symbol">
                  <img src={recent} alt="duration"></img>
                </div>
              </div>
              <hr></hr>
              <div className="playlist-view-songs" id="pl-songs">
                {playlistInfo.songs &&
                  playlistInfo.songs.map((element, index) => (
                    <div
                      className="playlist-view-song-row"
                      onClick={(e) => handleSongClik(e, element.songUri)}
                    >
                      <div className="playlist-view-song-nr">{index + 1}</div>
                      <div className="playlist-view-song-img">
                        <img src={element.imageUrl} alt="album-img"></img>
                      </div>
                      <div className="playlist-view-song-title">
                        <h4>{element.title}</h4>
                        <p>{element.artist}</p>
                      </div>
                      <div className="playlist-view-song-album">
                        Out of Exale
                      </div>
                      <div className="playlist-view-song-duration">2:34</div>
                    </div>
                  ))}
              </div>
              <div className="player">
                <Player accessToken={accessToken} trackUri={trackToPlay} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
