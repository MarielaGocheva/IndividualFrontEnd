import React, { useState, useEffect } from "react";
import icon from "../search-i.png";
import PlaylistCreation from "../api/playlistServices";
import "./SearchBarClient.css";
import SearchResult from "./SearchResult";

export default function SearchBarClient() {
  const [search, setSearch] = useState("");
  //   const [searchResults, setSearchResults] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

  function chooseResult(result) {
    // setPlayingTrack(track)
    setSearch("");
  }

  useEffect(() => {
    if (!search) return setPlaylistResults([]);
    if (!search) return setUserResults([]);
    let cancel = false;
    PlaylistCreation.search(search).then((res) => {
      console.log(res.data.playlistResults);
      setPlaylistResults(
        res.data.playlistResults.map((result) => {
          return {
            title: result.title,
            imageUrl: result.imageUrl
          };
        })
      );
      setUserResults(
        res.data.userResults.map((result) => {
          return {
            fname: result.fname,
            lname: result.lname
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search]);

  return (
    <>
      <div className="search-bar-client">
        <input
          className="search-container-client"
          placeholder="Search playlists, artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <div className="search-icon">
          <img className="search-img" src={icon} alt="search-icon"></img>
        </div>
      </div>
      <div className="search-results">
        {playlistResults?.map((result) => (
          <SearchResult result={result} />
        ))}
        {userResults?.map((result) => (
            <SearchResult result={result} />
        ))}
      </div>
    </>
  );
}
