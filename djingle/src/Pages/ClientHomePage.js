import React, { useEffect, useState } from "react";
import NavBarClient from "../Components/NavBarClient";
import SearchBarClient from "../Components/SearchBarClient";
import Playlist from "../Components/Playlist";
import PlaylistCreation from "../api/playlistServices";

export default function ClientHomePage(){
    const [trendingPlaylists, setTrendingPlaylists] = useState([]);

    const accessToken = localStorage.getItem("spotify_access_token");

   useEffect(() => {
    (async () => {
        const response = await PlaylistCreation.getMostPlayedPlaylists();
        setTrendingPlaylists(response.data.mostPlayed);
      })();
   }, [])

      useEffect(() => {
        console.log("TRENDING STATE ", trendingPlaylists);
      }, [trendingPlaylists]);

    return (
        <>
         <div className="menu-grid">
    <div className="menu"> 
    <NavBarClient />
       </div>
      <div className="content"> 
        <h1>CLIENT</h1>
        <SearchBarClient accessToken={accessToken} />
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
                  <p>Plays</p>
                </div>
              </div>
              <hr></hr>
              <div className="trending">
                {trendingPlaylists.map((element, index) => (
                  <div className="trending-row">
                    <div className="nr">{index + 1}</div>
                    <div className="pl">
                      <Playlist song={null} playlist={element}/>
                    </div>
                    <div className="pl_creator">DJ</div>
                    <div className="free">{element.plays}</div>
                  </div>
                ))}
              </div>
            </div>
        </div>

        </div>
        </>
    )
}