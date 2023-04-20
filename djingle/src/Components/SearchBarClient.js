import React, { useState, useEffect } from "react";
import icon from "../search-i.png";
import PlaylistCreation from "../api/playlistServices";
import "./SearchBarClient.css";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

export default function SearchBarClient() {
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();
  const [playlistResults, setPlaylistResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

    const artistURL = "/artist"
    const playlistURL = "/artist/playlist";
  function chooseResult(result) {
    console.log(result);
    if(result.fname){
        navigate(artistURL, { state: { id: result.id } });
    }
    if(result.title){
        navigate(playlistURL, { state: { title: result.title, userId: result.userId } });
    }
    setSearch("");
  }

  useEffect(() => {
    if (!search) return setPlaylistResults([]), setUserResults([]);
    let cancel = false;
    PlaylistCreation.search(search).then((res) => {
      console.log(res.data.playlistResults);
      setPlaylistResults(
        res.data.playlistResults.map((result) => {
          return {
            userId: result.userId,
            title: result.title,
            imageUrl: result.imageUrl,
          };
        })
      );
      setUserResults(
        res.data.userResults.map((result) => {
          return {
            id: result.id,
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
          <SearchResult result={result} chooseResult={chooseResult} />
        ))}
        {userResults?.map((result) => (
          <SearchResult result={result} chooseResult={chooseResult} />
        ))}
      </div>
    </>
  );
}
