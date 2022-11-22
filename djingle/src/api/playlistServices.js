import URL from "./apiConstant";

const playlistsURL = "/playlists";

const newPlaylist = (userId, name) => {
    console.log("I'm in the api class");
    return URL.post(playlistsURL, {
        userId: userId,
        name: name
    })
}

const PlaylistCreation = {
    newPlaylist
}     
export default PlaylistCreation;