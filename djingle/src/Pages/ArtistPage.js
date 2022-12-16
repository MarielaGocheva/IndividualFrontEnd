import React, { useEffect, useState } from "react";
import ArtistService from "../api/artistServices";
import NavBar from "../Components/NavBar";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const ENDPOINT = "http://localhost:8080/ws";

export default function ArtistPage({ id }) {
  const [messageToSend, setSendMessage] = useState("Enter your message here!");
  const [stompClient, setStompClient] = useState(null);

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
    stompClient.send("/app/update", {}, JSON.stringify({ name: messageToSend }));
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

stompClient.onClose = function (event) {
    alert('Client connection closed: ' + event.code);
};

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
        alert("disconnected")
    }
 }


  id = 2;
  useEffect(() => {
    (async () => {
      const response = await ArtistService.findArtist(id);
      console.log("Back-end returned for artist: ", response);
    })();
  }, []);
  return (
    <>
      <div className="menu-grid">
        <div className="menu">
          <NavBar />
        </div>
        <div className="content">
          <h1>ARTIST PAGE</h1>
          <div className="artist-body">
            <input
              onChange={(event) => setSendMessage(event.target.value)}
            ></input>
            <button onClick={sendMessage}>Send Message</button>
            <button onClick={disconnect}>Disconnect</button>
          </div>
        </div>
      </div>
    </>
  );
}
