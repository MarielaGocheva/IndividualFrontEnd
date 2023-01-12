import { useState } from "react";
import album_photo from "../audioslave.jpeg";
import "./Playlist.css";


export default function Playlist({song, playlist}){
    console.log("PLAYLIST ", song, playlist);
    // const [title, setTitle] = useState("Audioslave top 10");
    // const [creator, setCreator] = useState("Chris Cornell");
    // const[id,setId]=useState('')
    // const[duration,setDuration]=useState('')
    // const[userId, setUserId] = useState('');
    // const[playlists,setPlaylists]=useState([])

    // if(playlistName != null && author != null){
    //     setTitle(playlistName);
    //     setCreator(author);
    // }
    
    return (playlist?
        // playlistName && author ?
        // <>
        // <div className="playlist_container">
        //     <div className="photo">
        //         <img className="playlist_img" src={album_photo} alt="album_photo"></img>
        //     </div>
        //     <div className="description">
        //         <p className="title">Playlist</p>
        //         <div className="playlist_name">{playlistName}</div>
        //         <span className="playlist_creator">{author}</span>
        //     </div>
        // </div>
        // </> 
        // :
        <>
        <div className="playlist_container">
            <div className="photo">
                <img className="playlist_img" src={playlist.imageUrl} alt="album_photo"></img>
            </div>
            <div className="description">
                <p className="title">Playlist</p>
                <div className="playlist_name">{playlist.title}</div>
                <span className="playlist_creator">Chris Cornell</span>
            </div>
        </div>
        </> :
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