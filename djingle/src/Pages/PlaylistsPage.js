import "./PlaylistsPage.css";
import Playlist from "../Components/Playlist";
import recent from "../rec.png";
import SearchBar from "../Components/SearchBar";
import CreatePlaylist from "../add-playlist-icon.png";
import PlaylistView from "../Components/PlaylistView";
import { useState, useEffect } from "react";
import PlaylistCreation from "../api/playlistServices";
import GeneralPlaylist from "../Components/GeneralPlaylist";
import newPlaylist from "../newPlaylistImg.png";
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

export default function Playlists() {
  var decoded = jwtDecode(localStorage.getItem("login_access_token"));
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState("");
  const [userIdState, setUserIdState] = useState({
    userId: decoded.userId,
  });
  const [playlistsToDislay, setPlaylistsToDisplay] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [playlistToShowInfo, setPlaylistToShowInfo] = useState([]);

  const handleCreationRequest = async (e) => {
    e.preventDefault();
    setOverlay(true);
    setPlaylist("created");
  };

  function isCreated() {
    if (playlist !== "") {
      return <PlaylistView />;
    }
  }

  const playlistViewURL = "/artist/playlist";
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

  const [newPlaylistState, setNewPlaylistState] = useState({
    playlistName: "",
    userId: 2,
  });

  const onInputChange = (e) => {
    setNewPlaylistState({
      ...newPlaylistState,
      [e.target.name]: e.target.value,
    });
    console.log("plName after input change: " + newPlaylistState.playlistName);
  };

  const handleCreation = () => {
    (async () => {
      const response = await PlaylistCreation.newPlaylist(
        newPlaylistState.userId,
        newPlaylistState.playlistName
      );
      console.log("Back-end returned: ", response);
    })();
  };

  function showOverlay() {
    return (
      <>
        <input type="checkbox" id="toggle-1"></input>
        <div className="page-overlay"></div>

        <div className="new-playlist-info">
          <img src={newPlaylist} alt="decoration"></img>
          <div className="pl-title">
            <label>Playlist Title</label>
          </div>
          <div>
            {" "}
            <input
              name="playlistName"
              id="playlistName"
              type="text"
              placeholder="Give your playlist a title"
              onChange={onInputChange}
            ></input>
          </div>
          <div className="pl-create-btn">
            <label onClick={handleCreation} type="submit">
              Create
            </label>
          </div>
        </div>
      </>
    );
  }

  function normalState() {
    if (overlay) {
      setOverlay(false);
      return showOverlay();
    }
  }

  useEffect(() => {
    normalState();
  }, [overlay]);

  return (
    <>
      {/* <div>{code}</div> */}
      <div className="menu-grid">
        <div className="menu">
          {/* <ul>    
        <CustomLink to="/"><img src={logo} className="logo" alt="logo"/></CustomLink>
      </ul>  */}
          <NavBar />
        </div>
        <div className="content">
          {isCreated()}
          {normalState()}
          <div className="search-bar">
            <SearchBar />
          </div>
          <div className="page-title">
            <h1>My Playlists</h1>
            <span className="nr-playlists">12 playlists</span>
            {/* <div className='create-playlist'> */}

            <button
              className="create-playlist-btn"
              type="submit"
              onClick={handleCreationRequest}
            >
              <img src={CreatePlaylist} alt="create Playlist button"></img>
              <span>Create Playlist</span>
            </button>
            {/* <Link to={handleCreation}><img src={CreatePlaylist} alt='create playlist button'></img>Create Playlist</Link> */}
            {/* </div> */}
          </div>
          <div className="page-content">
            <div className="symbols">
              <div className="nr-symbol">
                <p>#</p>
              </div>
              <div className="title-symbol">
                <p>Title</p>
              </div>

              <div className="DJ-symbol">
                <p>Date added</p>
              </div>
              <div className="duration-symbol">
                <img src={recent} alt="duration"></img>
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
                      userId={element.userId}
                      img={element.imageUrl}
                    />
                  </div>
                  <div
                    className="pl-dj-played"
                    onClick={(e) => handlePlaylistClick(e, element.title)}
                  >
                    1,326
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
