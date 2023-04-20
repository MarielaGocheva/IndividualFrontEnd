import axios from 'axios';

const BASE_URL = "http://localhost:8080/playlists";

const PlaylistsAPI = {
    getAllPlaylists: () =>
    axios
    .get(BASE_URL)
    .then((response) => response.data)
}

export default PlaylistsAPI;