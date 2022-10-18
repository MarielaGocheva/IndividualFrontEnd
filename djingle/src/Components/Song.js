import './Song.css';
import song from '../song.jpeg';
import PlayBtn from './PlayBtn';

export default function Song(){
    return(
        <>
        <div className="song-container">
            <div className="song-img">
                <img src={song} alt='song-img'></img>
            </div>
            <div className="song-info">
                <h4>Some title</h4>
                <span>Some artist</span>
            </div>
            <div className="song-btn"><PlayBtn /></div>
        </div>
        </>
    );
}