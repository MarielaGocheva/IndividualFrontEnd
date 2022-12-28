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

const getSongsURL = "/playlists/playlistsSongs"
const getPlaylistSongs = (playlistId) => {
    return URL.get(getSongsURL + `/${playlistId}`)
}

const addSongURL = "/songs";
const addSong = (playlistId, songUri, artist, title, img) => {
    return URL.post(addSongURL, {
        playlistId: playlistId,
        songUri: songUri,
        artist: artist,
        title: title,
        img: img
    })
}

const deletePlaylistURL = "/playlists";
const deletePlaylist = (playlistId) => {
    return URL.delete(deletePlaylistURL + `/${playlistId}`)
}

const PlaylistCreation = {
    newPlaylist,
    getUserPlaylists,
    addSong,
    findPlaylistByTitleAndUserId,
    getPlaylistSongs,
    deletePlaylist
}     
export default PlaylistCreation;