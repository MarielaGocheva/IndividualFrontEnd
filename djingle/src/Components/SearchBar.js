import icon from '../search-i.png';
import './SearchBar.css';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';


const spotifyApi = new SpotifyWebApi({
    clientId: 'dcffffc36bb0472dbefa128396323bdd',
})



 const SearchBar = (props) => {
    const accessToken = props.accessToken;
    const [search, setSearch] = useState("");
    const[searchResults, setSearchResults] = useState([]);
    const[playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track){
        setPlayingTrack(track)
        setSearch('')
    }

    console.log(searchResults);
    useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
        setSearchResults(res.body.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0]
            )
            return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url
            }
        }))
    })
    return () => cancel = true
    }, [search, accessToken])

    return(
        <>
        <div className="search-bar">
            <input className="search-container" placeholder="Search playlists, songs"  value={search} onChange={e => setSearch(e.target.value)}>
            </input>
            <div className="search-icon">
            <img className="search-img" src={icon} alt='search-icon'></img>
             </div>
        </div>
        <div className='search-results'>
            {searchResults.map(track => (console.log("URI:  " + track.uri),
                <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
            ))}
        </div>
        <div className='player'>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
        </div>
        </>
    );  
}

export default SearchBar;