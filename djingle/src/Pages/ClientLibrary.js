import React, { useEffect, useState } from "react";
import GeneralPlaylist from "../Components/GeneralPlaylist";
import ArtistService from "../api/artistServices";
import jwtDecode from "jwt-decode";
import NavBarClient from "../Components/NavBarClient";

export default function ClientLibrary() {
    const decoded = jwtDecode(localStorage.getItem("login_access_token"));
    const [library, setLibrary] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await ArtistService.getLibrary(
              decoded.userId
            );
            setLibrary(response.data.playlists);
          })();
    }, [])

    useEffect(() => {

    }, [library])

  return (
    <>
      <div className="menu-grid">
        <div className="menu">
          <NavBarClient />
        </div>
        <div className="content">
            {library? library.map((element, index) => (
                <GeneralPlaylist title={element.title} id={element.id} img={element.imageUrl}/>
            )) : []}
        </div>
      </div>
    </>
  );
}
