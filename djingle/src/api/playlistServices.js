import URL from "./apiConstant";

const playlistsURL = "/playlists";

const newPlaylist = (userId, name) => {
    console.log("I'm in the api class");
    return URL.post(playlistsURL, {
        userId: userId,
        name: name
    })
}

// const getPlaylistsURL = "/playlists/byUser";
const getUserPlaylists = (userId) => {
    console.log("Id to send", userId)
    return URL.get(playlistsURL + `/${userId}`)
}

const addSongURL = "";
const addSong = (playlistId, songUri) => {
    // alert("sending request")
    console.log("add song call info: ", playlistId, songUri)
    return URL.post("/", {
        playlistId: playlistId,
        songUri: songUri
        
            // res.setHeader("Access-Control-Allow-Origin", "*")
            // res.setHeader("Access-Control-Allow-Credentials", "true");
            // res.setHeader("Access-Control-Max-Age", "1800");
            // res.setHeader("Access-Control-Allow-Headers", "content-type");
            // res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
            // req.setHeader("Access-Control-Allow-Origin", "*")
             
        // artist: artist,
        // title: title,
        // imageUrl: imageUrl
        // headers: {
        //     'Content-type': 'application/json; charset=UTF-8'
        //   }
    })
}

const PlaylistCreation = {
    newPlaylist,
    getUserPlaylists,
    addSong
}     
export default PlaylistCreation;