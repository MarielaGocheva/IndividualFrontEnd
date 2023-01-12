import axios from "axios";
import { useEffect, useState } from "react";
import "../HomePage.css";
import Playlist from "../Components/Playlist";
import SearchBar from "../Components/SearchBar";
import Song from "../Components/Song";
import useAuth from "../useAuth";
import SpotifyURL from "../api/SpotifyURL";
import NavBar from "../Components/NavBar";
import PlaylistCreation from "../api/playlistServices";
import jwtDecode from "jwt-decode";

// import NavBar from "../Components/NavBar";

// import Playlists from './PlaylistsPage';
// import RegisterPage from './RegisterPage';
// import LoginPage from './LoginPage';
// import {Route, Routes} from "react-router-dom";
// import LoginSpotify from '../LoginSpotify';
// import logo from '../logoDark.png';

function HomePage() {
  const accessToken = localStorage.getItem("spotify_access_token");
  const decoded = jwtDecode(localStorage.getItem("login_access_token"));
  const [recentlyPlayed, setRecentlyPlayed] = useState({
    song: null,
    playlist: null
  })

  useEffect(() => {
    (async () => {
      const response = await PlaylistCreation.getRecentlyPlayed(
        decoded.userId
      );
      console.log("Back-end returned: ", response.data);
      setRecentlyPlayed({song: response.data.song, playlist: response.data.playlist});
      console.log("AFTER API ", recentlyPlayed.song, recentlyPlayed.playlist);
    })();
  }, []);

  return (
    <>
      <div className="menu-grid">
        <div className="menu">
          <NavBar />
        </div>
        <div className="content">
          <div className="home">
            <div className="last_grid">
              <h1>Last played</h1>
              <div className="last_work">
                <Playlist song={recentlyPlayed.song} playlist={recentlyPlayed.playlist} />
              </div>
            </div>

            <div className="top_playlists_grid">
              <h2>Top trending playlists now</h2>
              <div className="symbols">
                <div className="nr-symbol">
                  <p>#</p>
                </div>
                <div className="title-symbol">
                  <p>Title</p>
                </div>

                <div className="DJ-symbol">
                  <p>DJ</p>
                </div>
                <div className="Date-symbol">
                  <p>Date</p>
                </div>
              </div>
              <hr></hr>
              <div className="trending">
                <div className="trending-row">
                  <div className="nr">1</div>
                  <div className="pl">
                    {/* <Playlist /> */}
                  </div>
                  <div className="pl_creator">DJ Stamat</div>
                  <div className="free">10/10/2022</div>
                </div>
                <div className="trending-row">
                  <div className="nr">2</div>
                  <div className="pl">
                    {/* <Playlist /> */}
                  </div>
                  <div className="pl_creator">DJ Spitnoise</div>
                  <div className="free">10/10/2022</div>
                </div>
                <div className="trending-row">
                  <div className="nr">3</div>
                  <div className="pl">
                    {/* <Playlist /> */}
                  </div>
                  <div className="pl_creator">DJ Qvor</div>
                  <div className="free">10/10/2022</div>
                </div>
                <div className="trending-row">
                  <div className="nr">4</div>
                  <div className="pl">
                    {/* <Playlist /> */}
                  </div>
                  <div className="pl_creator">DJ Desov</div>
                  <div className="free">10/10/2022</div>
                </div>
              </div>
            </div>
            <div className="search_songs_grid">
              <div className="search">
                <SearchBar accessToken={accessToken} />
              </div>
              <div className="top-songs">
                <h1>Trending songs</h1>
              </div>
              <div className="song-containers">
                <Song />
                <Song />
                <Song />
                <Song />
                <Song />
                <Song />
                <Song />
                <Song />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
