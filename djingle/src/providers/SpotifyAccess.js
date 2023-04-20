import React from "react";
import useAuth from "../useAuth";
import SpotifyURL from "../api/SpotifyURL"

export default function SpotifyAccess({code}){
    const accessToken = useAuth(code);
    localStorage.setItem('spotify_access_token', accessToken);
   
    return (
        <>
        </>
    )
}