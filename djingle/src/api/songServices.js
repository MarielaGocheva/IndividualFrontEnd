import URL from "./apiConstant";

const setPlayedURL = "/songs/played";
const setPlayed = (songUri) => {
    return URL.put(setPlayedURL, {
        songUri: songUri
    })
}

const mostPlayedURL = "/songs/mostPlayed";
const getMostPlayed = () => {
    return URL.get(mostPlayedURL);
}

const SongServies = {
    setPlayed,
    getMostPlayed
}

export default SongServies;