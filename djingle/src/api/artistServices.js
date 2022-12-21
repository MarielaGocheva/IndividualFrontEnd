import React from "react";
import URL from "./apiConstant";

const artistURL = "/users/artist";
const findArtist = (id) => {
    console.log("SENDING", id)
    return URL.get(artistURL + `/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('login_access_token')}`}})
}

const ArtistService = {
    findArtist
}    

export default ArtistService;