import { useState } from "react";
import album_photo from "../audioslave.jpeg";
import "./Playlist.css";


export default function Playlist(){
    // const[id,setId]=useState('')
    // const[duration,setDuration]=useState('')
    // const[userId, setUserId] = useState('');
    // const[playlists,setPlaylists]=useState([])
    
    return (
        <>
        <div className="playlist_container">
            <div className="photo">
                <img className="playlist_img" src={album_photo} alt="album_photo"></img>
            </div>
            <div className="description">
                <p className="title">Playlist</p>
                <div className="playlist_name">Audioslave top 10</div>
                <span className="playlist_creator">Chris Cornell</span>
            </div>
        </div>
        </>
    );
}

// function PlaylistElement({title, author}){
//     // const[id,setId]=useState('')
//     // const[duration,setDuration]=useState('')
//     // const[userId, setUserId] = useState('');
//     // const[playlists,setPlaylists]=useState([])
    
//     return (
//         <>
//         <div className="playlist_container">
//             <div className="photo">
//                 <img className="playlist_img" src={album_photo} alt="album_photo"></img>
//             </div>
//             <div className="description">
//                 <p className="title">Playlist</p>
//                 <div className="playlist_name">Audioslave top 10</div>
//                 <span className="playlist_creator">Chris Cornell</span>
//             </div>
//         </div>
//         </>
//     );
// }

// export  {Playlist, PlaylistElement};