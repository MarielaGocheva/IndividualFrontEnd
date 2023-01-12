import React, { useEffect, useState } from "react";
import ArtistService from "../api/artistServices";
import NavBarClient from "../Components/NavBarClient";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import musician from "../musician.webp";
import "./ArtistPage.css";
import play from "../play.png";
import { useNavigate, useLocation } from "react-router-dom";

const ENDPOINT = "http://localhost:8080/ws";

export default function ArtistPage() {
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();
  const [messageToSend, setSendMessage] = useState("Enter your message here!");
  const [stompClient, setStompClient] = useState(null);
  const [artistState, setArtistState] = useState({
    firstName: "",
    lastName: "",
    artistImg: "",
    playlists: [],
  });

  useEffect(() => {
    const socket = new SockJS(ENDPOINT);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/update", (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    });
    setStompClient(stompClient);
  }, []);

  const [receivedWsUpdate, setReceivedWsUpdate] = useState(null);
  function onMessageReceived(data) {
    const result = JSON.parse(data.body);
    console.log(result.content.id)
    setReceivedWsUpdate(result.content.id);
  }

  useEffect(() => {
   if(receivedWsUpdate){
    (async () => {
      const response = await ArtistService.findArtist(id);
      console.log("Back-end returned for artist: ", response);
      setArtistState({
        firstName: response.data.fname,
        lastName: response.data.lname,
        artistImg: response.data.img,
        playlists: response.data.playlists,
      });
    })();
    setReceivedWsUpdate(null);
   } 
  }, [receivedWsUpdate]);

  function disconnect() {
    if (stompClient != null) {
      stompClient.disconnect();
      alert("disconnected");
    }
  }

  useEffect(() => {
    (async () => {
      const response = await ArtistService.findArtist(id);
      console.log("Back-end returned for artist: ", response);
      setArtistState({
        firstName: response.data.fname,
        lastName: response.data.lname,
        artistImg: response.data.img,
        playlists: response.data.playlists,
      });
    })();
  }, []);

  const playlistViewURL = "/artist/playlist";
  const handleShowPlaylist = (e, title) => {
    navigate(playlistViewURL, { state: { title: title, userId: id } });
  };

  return (
    <>
      <div className="menu-grid">
        <div className="menu">
          <NavBarClient />
        </div>
        <div className="content">
          <h1>ARTIST PAGE</h1>
          <div className="artist-body">
            <div className="artist-info">
              <img className="artist-img" src={musician} alt="musician"></img>
              <div className="artist-details">
                <h1>{artistState.firstName + " " + artistState.lastName}</h1>
                <h1>DJ from Deventer</h1>
              </div>
            </div>
            <div className="artist-playlists">
              {artistState.playlists.map((element, index) => (
                <div className="playlist-container">
                  <img
                    className="playlist-img"
                    src={element.imageUrl}
                    alt="pl-img"
                  ></img>
                  <div className="playlist-details">
                    <h1>{element.title}</h1>
                    <h3>Funk, Groove</h3>
                    <button
                      className="play"
                      id="play"
                      onClick={(e) => handleShowPlaylist(e, element.title)}
                    >
                      <img
                        src={play}
                        alt="play"
                        onClick={(e) => handleShowPlaylist(e, element.title)}
                      ></img>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
