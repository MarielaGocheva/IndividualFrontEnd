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

const PlaylistCreation = {
    newPlaylist,
    getUserPlaylists
}     
export default PlaylistCreation;