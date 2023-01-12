import React, { useEffect, useState } from "react";
import "./CreatePlaylistBox.css";
import PlaylistCreation from "../api/playlistServices";
import jwtDecode from "jwt-decode";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const ENDPOINT = "http://localhost:8080/ws";

export default function CreatePlaylistBox() {
  var decoded = jwtDecode(localStorage.getItem("login_access_token"));
  const genreColours = [
    "#e695ba",
    "#e14434",
    "#3e4050",
    "#976e4e",
    "#8845cc",
    "#1935b3",
    "#7bce49",
    "#fdbb2e",
    "#3e58a2",
    "#00c6b8",
    "#ea75f7",
    "#2524b3",
    "#a759d9",
    "#cacaca",
    "#c1a166",
    "#6736a7",
    "#eb7a4e",
    "#b6cf54",
    "#03a0cf",
    "#cb2828",
    "#e834c1",
  ];
  const [genres, setGenres] = useState([]);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [newPlaylistGenres, setNewPlaylistGenres] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await PlaylistCreation.getGenres();
      setGenres(response.data.genres);
      console.log("GENRES, ", response.data);
    })();
    const socket = new SockJS(ENDPOINT);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/update", (data) => {
        // console.log(data);
        // onMessageReceived(data);
      });
    });
    setStompClient(stompClient);
  }, []);

  const [isActive, setActive] = useState("active");
  const [chosenGenres, setChosenGenres] = useState([]);

  const toggleClass = (e, id) => {
    if (chosenGenres.includes(id)) {
      let filteredGenres = chosenGenres.filter((item) => item !== id);
      setChosenGenres(filteredGenres);
      setNewPlaylistGenres(filteredGenres);
    }
    else if (!chosenGenres.includes(id)){
        setChosenGenres((oldArray) => [...oldArray, id]);
    }
    console.log(newPlaylistGenres);
  };

  const [updateWs, setUpdateWs] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  function updatePlaylistsWs() {
    stompClient.send(
      "/app/update",
      {},
      JSON.stringify({ name: updateWs })
    );
  }

  useEffect(() => {
        setNewPlaylistGenres(chosenGenres);
  }, [chosenGenres])

  const onInputChange = (e) => {
    setNewPlaylistTitle(e.target.value);
  };

  useEffect(() => {
    if(updateWs)
    updatePlaylistsWs();
    setUpdateWs(null);
  }, [updateWs])

  const handleCreatePlaylist = (e) => {
    (async () => {
      const response = await PlaylistCreation.newPlaylist(
        2,
        newPlaylistTitle,
        newPlaylistGenres
      );
      setUpdateWs(response.data.playlist.id);
      console.log("Back-end returned: ", response);
    })();
  };

  return (
    <>
      <div className="create-playlist-box">
        <div className="create-playlist-container">
          <div className="new-playlist-name">
            <h3>Playlist Title</h3>
            <input
              type="text"
              placeholder="Give your playlist a name"
              value={newPlaylistTitle}
              name="title"
              onChange={onInputChange}
            ></input>
            <h3>Choose Main Genres</h3>
          </div>
          <div className="new-playlist-genres">
            {genres.map((element, index) => (
              <button
                className={`choose-genre-button ${
                  chosenGenres.includes(element.id) && isActive
                }`}
                onClick={(e) => toggleClass(e, element.id)}
                type="submit"
                style={{ backgroundColor: genreColours[index++] }}
              >
                {element.name}
              </button>
            ))}
          </div>
          <div className="new-playlist-button">
            <button type="submit" onClick={handleCreatePlaylist}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
