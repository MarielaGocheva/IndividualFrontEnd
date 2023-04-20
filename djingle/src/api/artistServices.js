import React from "react";
import URL from "./apiConstant";

const artistURL = "/users/artist";
const findArtist = (id) => {
    console.log("SENDING", id)
    return URL.get(artistURL + `/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('login_access_token')}`}})
}

const libraryURL = "/users/library";
const getLibrary = (userId) => {
    return URL.get(libraryURL + `/${userId}`);
}

const ArtistService = {
    findArtist,
    getLibrary
}    

export default ArtistService;