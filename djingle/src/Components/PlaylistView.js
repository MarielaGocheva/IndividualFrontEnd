import "./PlaylistView.css"
import PlaylistCreation from "../api/playlistServices";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import recent from "../rec.png"
import pl from "../pl.jpg"
import Player from "../Components/Player";

export default function PlaylistView(){
    const [newPlaylistState, setNewPlaylistState] = useState({
        playlistName: "",
        userId: 2
    });

    const dragItem = useRef();
    const dragOverItem = useRef();
  
    const dragStart = (e, position) => {
      dragItem.current = position;
      console.log(e.target.innerHTML);
    };
  
    const dragEnter = (e, position) => {
      e.preventDefault();
      dragOverItem.current = position;
      console.log(e.target.innerHTML);
    };
  
    const drop = (e) => {
      e.preventDefault();
  
      const copyListItems = [...playlistInfo.songs];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setPlaylistInfo({songs: copyListItems});
    };
  
    const accessToken = localStorage.getItem("spotify_access_token");
    const { state } = useLocation();
    const { title, userId } = state;
    const [trackToPlay, setTrackToPlay] = useState("");
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
      //   console.log("SONG URI ", playlistInfo.songs[0].songUri)
      })();
    }, []);
  
    const handleSongClik = (e, song) => {
      console.log(song);
      setTrackToPlay(song);
    };
  
    useEffect(() => {
  
    }, [trackToPlay])
  
    var songImg = [];
    const handleImageCheck = (e, img) => {
      if(img){
        console.log("there's image", img)
        songImg.push(<img src={img}></img>)
      }
      else {
        songImg.push(<img src={pl}></img>)
      }
    }
  

    // const onInputChange = (e) => {
    //     setNewPlaylistState({ ...newPlaylistState, [e.target.name]: e.target.value });
    //     console.log("plName after input change: " + newPlaylistState.playlistName)
    // };

    // const handleCreation = () => {
    //     (async() => {
    //         const response = await PlaylistCreation.newPlaylist(newPlaylistState.userId, newPlaylistState.playlistName);
    //         console.log("Back-end returned: ", response);
    //     })();
    //     }

    // const handleClose = (e) => {
    //     console.log("close")
    // }

    return (
        <>
       <div className="menu-grid">
        <div className="menu">
          <NavBar />
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
            </div>
            <div className="playlist-view-songs">
            <div className="symbols">
                    <div className="nr-symbol"><p>#</p></div>
                    <div className="title-symbol"><p>Title</p></div>
                    
                    <div className="album-symbol"><p>Album</p></div>
                    <div className="duration-symbol"><img src={recent} alt='duration'></img></div>
                </div>
              <hr></hr>
              <div className="playlist-view-songs" id="pl-songs">
              {playlistInfo.songs&&playlistInfo.songs.map((element, index) => (
                
                <div className="playlist-view-song-row" onClick={(e) => handleSongClik(e, element.songUri)} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop} key={index} draggable>
                    <div className="playlist-view-song-nr">{index+1}</div>
                    <div className="playlist-view-song-img" ><img src={element.imageUrl} alt="album-img"></img></div>
                  <div className="playlist-view-song-title">
                    <h4>{element.title}</h4>
                    <p>{element.artist}</p>
                  </div>
                  <div className="playlist-view-song-album">Out of Exale</div>
                  <div className="playlist-view-song-duration">2:34</div>
                </div>
              ))}
              </div>
              <div className='player'>
            <Player accessToken={accessToken} trackUri={trackToPlay}/>
        </div>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}