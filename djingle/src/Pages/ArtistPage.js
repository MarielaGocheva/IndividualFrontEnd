import React, { useEffect, useState } from "react";
import ArtistService from "../api/artistServices";
import NavBar from "../Components/NavBar";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import musician from "../musician.webp";
import PlaylistCreation from "../api/playlistServices";
import "./ArtistPage.css";
import pl from "../pl.jpg"
import pl3 from "../pl3.jpg"
import pl4 from "../pl4.jpg"
import pl5 from "../pl5.jpg"
import pl6 from "../pl6.jpg"
import pl7 from "../pl7.jpg"
import pl8 from "../pl8.jpg"
import play from "../play.png"
import { useNavigate } from "react-router-dom";

const ENDPOINT = "http://localhost:8080/ws";

export default function ArtistPage({ id }) {
  const navigate = useNavigate();
  const [messageToSend, setSendMessage] = useState("Enter your message here!");
  const [stompClient, setStompClient] = useState(null);
  const [artistState, setArtistState] = useState({
    firstName: "",
    lastName: "",
    artistImg: "",
    playlists: []
  })

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

  function sendMessage() {
    stompClient.send(
      "/app/update",
      {},
      JSON.stringify({ name: messageToSend })
    );
  }

  function onMessageReceived(data) {
    const result = JSON.parse(data.body);
    alert(result.content);
  }

  //   function onClose(){
  //     if(stompClient.readyState == WebSocket.OPEN){
  //         stompClient.close();
  //         alert("CLOSED")
  //     }
  //   }

  // stompClient.onClose = function (event) {
  //     alert('Client connection closed: ' + event.code);
  // };

  function disconnect() {
    if (stompClient != null) {
      stompClient.disconnect();
      alert("disconnected");
    }
  }

  id = 2;
  useEffect(() => {
    (async () => {
      const response = await ArtistService.findArtist(id);
      console.log("Back-end returned for artist: ", response);
      setArtistState({firstName: response.data.fname, lastName: response.data.lname, artistImg: response.data.img, playlists: response.data.playlists});
    })();
  }, []);

  const playlistViewURL = "/artist/playlist"
  const handleShowPlaylist = event => {
    console.log(event.target.value);
    // (async () => {
    //   const response = await PlaylistCreation.findPlaylistByTitleAndUserId(event.target.value, id);
    //   console.log("Back-end returned for playlist: ", response.data);
    // })();
    navigate(playlistViewURL, { state: { title: event.target.value, userId: 2 } });
  };


  return (
    <>
      <div className="menu-grid">
        <div className="menu">
          <NavBar />
        </div>
        <div className="content">
          <h1>ARTIST PAGE</h1>
          <input
            onChange={(event) => setSendMessage(event.target.value)}
          ></input>
          <button onClick={sendMessage}>Send Message</button>
          <button onClick={disconnect}>Disconnect</button>
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
                         <img className="playlist-img" src={element.imageUrl} alt="pl-img"></img>
                         <div className="playlist-details">
                           <h1>{element.title}</h1>
                           <h3>Funk, Groove</h3>
                           <button className="play" id="play" value={element.title} onClick={handleShowPlaylist}><img src={play} alt="play"></img></button>
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
