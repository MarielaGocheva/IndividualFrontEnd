import "./PlaylistsPage.css";
import recent from "../rec.png";
import SearchBar from "../Components/SearchBar";
import CreatePlaylist from "../add-playlist-icon.png";
import PlaylistView from "../Components/PlaylistView";
import { useState, useEffect } from "react";
import PlaylistCreation from "../api/playlistServices";
import GeneralPlaylist from "../Components/GeneralPlaylist";
import NavBar from "../Components/NavBar";
import jwtDecode from "jwt-decode";
import info from "../info.png";
import infoHover from "../info-hov.png";
import deleteIcon from "../delete.png";
import deleteHover from "../delete-hover.png";
import edit from "../edit.png";
import editHover from "../edit-hover.png";
import { useNavigate } from "react-router-dom";
import InfoBox from "../Components/InfoBox";
import Swal from "sweetalert2";
import CreatePlaylistBox from "../Components/CreatePlaylistBox";

export default function Playlists() {
  const accessToken = localStorage.getItem("spotify_access_token");
  var decoded = jwtDecode(localStorage.getItem("login_access_token"));
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const [showCreatePlaylistBox, setShowCreatePlaylistBox] = useState(false);
  const [playlist, setPlaylist] = useState("");
  const [userIdState, setUserIdState] = useState({
    userId: decoded.userId,
  });
  const [playlistsToDislay, setPlaylistsToDisplay] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [playlistToShowInfo, setPlaylistToShowInfo] = useState([]);
  const [overlayShown, setOverlayShown] = useState(false);

  const handleCreationRequest = async (e) => {
    e.preventDefault();
    setShowCreatePlaylistBox((current) => !current);
    setOverlayShown((current) => !current);
  };

  const playlistViewURL = "/playlist";
  const handlePlaylistClick = (e, title) => {
    navigate(playlistViewURL, { state: { title: title, userId: 2 } });
  };

  const handleInfoClick = (e, title) => {
    (async () => {
      const response = await PlaylistCreation.findPlaylistByTitleAndUserId(
        title,
        userIdState.userId
      );
      setPlaylistToShowInfo(response.data.playlist);
    })();
    (async () => {
      const response = await PlaylistCreation.getPlaylistGenres(
        playlistToShowInfo.id
      );
      console.log("GENRES, ", response);
    })();
    showInfoBox();
  };

  const handleDeleteClick = (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1ac843",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          const response = await PlaylistCreation.deletePlaylist(id);
          console.log("DELETE RESPONSE ", response.data);
        })();
        Swal.fire("Deleted!", "Your playlist has been deleted.", "success");
      }
    });
  };

  function showInfoBox() {
    console.log("changing function ", playlistToShowInfo);
    setIsShown((current) => !current);
  }



  useEffect(() => {
    (async () => {
      const response = await PlaylistCreation.getUserPlaylists(
        userIdState.userId
      );
      setPlaylistsToDisplay(response.data.playlists);
    })();
  }, []);

  const hideCreatePlaylist = (e) => {
    setOverlayShown((current) => !current);
    setShowCreatePlaylistBox((current) => !current);
  };

  return (
    <>
      <div className="menu-grid">
        {overlayShown && (
          <div className="playlist-overlay" onClick={hideCreatePlaylist}></div>
        )}
        <div className="menu">
          <NavBar />
        </div>
        <div className="content">
          {showCreatePlaylistBox && <CreatePlaylistBox />}
          <div className="pl-search-grid">
            <div className="search">
              <SearchBar accessToken={accessToken} />
            </div>
            <div className="page-title">
              <h1>My Playlists</h1>
              <span className="nr-playlists">
                {playlistsToDislay.length} playlists
              </span>
            </div>
          </div>
          <div className="create-playlist-container">
            <button
              className="create-playlist-btn"
              type="submit"
              onClick={handleCreationRequest}
            >
              <img src={CreatePlaylist} alt="create Playlist button"></img>
              <span>Create Playlist</span>
            </button>
          </div>
          <div className="page-content">
            <div className="symbols">
              <div className="nr-symbol">
                <p>#</p>
              </div>
              <div className="title-symbol">
                <p>Title</p>
              </div>
              <div className="DJ-symbol" id="dj-plays">
                <p>Plays</p>
              </div>
              <div className="duration-symbol" id="dj-status">
                <p>Status</p>
              </div>
            </div>
            <hr id="pl-hr"></hr>
            <div className="playlist-containers">
              {playlistsToDislay.map((element, index) => (
                <div className="playlist-row-dj">
                  <div
                    className="playlist-nr-dj"
                    onClick={(e) => handlePlaylistClick(e, element.title)}
                  >
                    {index + 1}
                  </div>
                  <div className="pl-dj">
                    <GeneralPlaylist
                      title={element.title}
                      id={element.id}
                      img={element.imageUrl}
                    />
                  </div>
                  <div
                    className="pl-dj-played"
                    onClick={(e) => handlePlaylistClick(e, element.title)}
                  >
                    {element.plays}
                  </div>
                  <div
                    className="pl-status-dj"
                    onClick={(e) => handlePlaylistClick(e, element.title)}
                  >
                    Published
                  </div>
                  <div className="pl-buttons-dj">
                    <div className="pl-info-btn">
                      <img
                        className="info"
                        src={info}
                        alt="info-icon"
                        onClick={(e) => handleInfoClick(e, element.title)}
                      ></img>
                      <img
                        className="info-hover"
                        src={infoHover}
                        alt="info-icon"
                        onClick={(e) => handleInfoClick(e, element.title)}
                      ></img>
                    </div>
                    <div className="pl-edit-btn">
                      <img
                        className="edit"
                        src={edit}
                        alt="edit-icon"
                        onClick={(e) => handlePlaylistClick(e, element.title)}
                      ></img>
                      <img
                        className="edit-hover"
                        src={editHover}
                        alt="edit-icon"
                        onClick={(e) => handlePlaylistClick(e, element.title)}
                      ></img>
                    </div>
                    <div className="pl-delete-btn">
                      <img
                        className="delete"
                        src={deleteIcon}
                        alt="delete-icon"
                      ></img>
                      <img
                        className="delete-hover"
                        src={deleteHover}
                        alt="delete-icon"
                        onClick={(e) => handleDeleteClick(e, element.id)}
                      ></img>
                    </div>
                  </div>
                </div>
              ))}
              {isShown && <InfoBox playlist={playlistToShowInfo} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
