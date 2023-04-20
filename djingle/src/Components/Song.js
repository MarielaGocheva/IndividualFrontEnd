import './Song.css';
import song from '../song.jpeg';
import PlayBtn from './PlayBtn';

export default function Song({song}){
    return(
        <>
        <div className="song-container">
            <div className="song-img">
                <img src={song.imageUrl} alt='song-img'></img>
            </div>
            <div className="song-info">
                <h4>{song.title}</h4>
                <span>{song.artist}</span>
            </div>
            <div className="song-btn"><PlayBtn /></div>
        </div>
        </>
    );
}