import URL from "./apiConstant";

const playlistsURL = "/playlists";

const newPlaylist = (userId, name) => {
    console.log("I'm in the api class");
    return URL.post(playlistsURL, {
        userId: userId,
        name: name
    })
}

const findPlaylistURL = "/playlists/findPlaylist"
const findPlaylistByTitleAndUserId = (title, userId) => {
    return URL.get(findPlaylistURL + `/${title}` + `/${userId}`)
}

// const getPlaylistsURL = "/playlists/byUser";
const getUserPlaylists = (userId) => {
    return URL.get(playlistsURL + `/${userId}`)
}

const addSongURL = "";
const addSong = (playlistId, songUri) => {
    return URL.post("/", {
        playlistId: playlistId,
        songUri: songUri
    })
}

const PlaylistCreation = {
    newPlaylist,
    getUserPlaylists,
    addSong,
    findPlaylistByTitleAndUserId
}     
export default PlaylistCreation;