import URL from "./apiConstant";

const playlistsURL = "/playlists";
const newPlaylist = (userId, name, playlistGenres) => {
  var formatted = "";
  playlistGenres.map((element) => (formatted += element + ","));
  console.log("FORMATTED", formatted);
  console.log("I'm in the api class", formatted);
  return URL.post(playlistsURL, {
    userId: userId,
    name: name,
    genres: formatted,
  });
};

const findPlaylistURL = "/playlists/findPlaylist";
const findPlaylistByTitleAndUserId = (title, userId) => {
  return URL.get(findPlaylistURL + `/${title}` + `/${userId}`);
};

const getUserPlaylists = (userId) => {
  return URL.get(playlistsURL + `/${userId}`);
};

const getSongsURL = "/playlists/playlistsSongs";
const getPlaylistSongs = (playlistId) => {
  return URL.get(getSongsURL + `/${playlistId}`);
};

const addSongURL = "/songs";
const addSong = (playlistId, songUri, artist, title, img) => {
  return URL.post(addSongURL, {
    playlistId: playlistId,
    songUri: songUri,
    artist: artist,
    title: title,
    img: img,
  });
};

const deletePlaylistURL = "/playlists";
const deletePlaylist = (playlistId) => {
  return URL.delete(deletePlaylistURL + `/${playlistId}`);
};

const genresURL = "/playlists/genres";
const getGenres = () => {
  return URL.get(genresURL);
};

const getPlaylistGenres = (playlistId) => {
    return URL.get(genresURL + `/${playlistId}`);
}

const searchURL = "/playlists/search";
const search = (searchItem) => {
    console.log("SEARCH ITEM ", searchItem);
  return URL.get(searchURL + `/${searchItem}`);
};

const recentlyPlayedURL = "/playlists/recentlyPlayed";
const setRecentlyPlayed = (userId, songUri, playlistTitle, artist) =>{
  return URL.post(recentlyPlayedURL, {
    userId: userId,
    songUri: songUri,
    playlistTitle: playlistTitle,
    artist: artist
  })
}

const getRecentlyPlayed = (userId) => {
  console.log("GET RECENT ID ", userId);
  return URL.get(recentlyPlayedURL + `/${userId}`);
}

const historyURL = "/playlists/history";
const getHistory = (userId) => {
  return URL.get(historyURL + `/${userId}`);
}

const setPlayedURL = "/playlists/played";
const setPlayed = (playlistId) => {
  return URL.put(setPlayedURL, {
    playlistId: playlistId
  })
}

const mostPlayedURL = "/playlists/mostPlayed";
const getMostPlayedPlaylists = () => {
  return URL.get(mostPlayedURL);
}

const likePlaylistURL ="/playlists/likePlaylist";
const likePlaylist = (userId, playlistId) => {
  return URL.post(likePlaylistURL, {
    userId: userId,
    playlistId: playlistId
  })
}

const dislikePlaylistURL = "/playlists/dislikePlaylist";
const dislikePlaylist = (userId, playlistId) => {
  return URL.delete(dislikePlaylistURL + `/${userId}` + `/${playlistId}`);
}

const checkIfLikedURL = "/playlists/isLiked";
const checkIfLiked = (userId, playlistId) => {
  return URL.get(checkIfLikedURL + `/${userId}` + `/${playlistId}`);
}

const PlaylistCreation = {
  newPlaylist,
  getUserPlaylists,
  addSong,
  findPlaylistByTitleAndUserId,
  getPlaylistSongs,
  deletePlaylist,
  getGenres,
  getPlaylistGenres,
  search,
  setRecentlyPlayed,
  getRecentlyPlayed,
  getHistory,
  setPlayed,
  getMostPlayedPlaylists,
  likePlaylist,
  dislikePlaylist,
  checkIfLiked
};
export default PlaylistCreation;
