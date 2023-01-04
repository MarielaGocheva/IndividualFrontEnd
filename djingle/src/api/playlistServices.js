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

const searchURL = "/playlists/search";
const search = (searchItem) => {
    console.log("SEARCH ITEM ", searchItem);
  return URL.get(searchURL + `/${searchItem}`);
};

const PlaylistCreation = {
  newPlaylist,
  getUserPlaylists,
  addSong,
  findPlaylistByTitleAndUserId,
  getPlaylistSongs,
  deletePlaylist,
  getGenres,
  search
};
export default PlaylistCreation;
