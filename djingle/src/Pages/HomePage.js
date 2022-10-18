import axios from "axios";
import { useEffect, useState } from "react";
import '../HomePage.css';
import Playlist from "../Components/Playlist";
import SearchBar from "../Components/SearchBar";
import Song from "../Components/Song";

function HomePage() {

const [posts, setPosts] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/playlists")
        .then((response) => {
            console.log(response.data.playlists);
            setPosts(response.data.playlists);
        });
    },[]);

    return (
      <>
      {/* <div className="your-playlists">
        <p>Your playlists IDs are {posts.map(element => ( <span>{element.id}</span>))}</p>
      </div> */}
        <div className="home">
            <div className="last_grid">
                <h1>Your last work</h1>
                <div className="last_work"><Playlist /></div>
            </div>
          
           <div className="top_playlists_grid">
                <h2>Top trending playlists now</h2>
                <div className="symbols">
                    <div className="nr-symbol"><p>#</p></div>
                    <div className="title-symbol"><p>Title</p></div>
                    
                    <div className="DJ-symbol"><p>DJ</p></div>
                    <div className="Date-symbol"><p>Date</p></div>
                    
                </div>
                <hr></hr>
                <div className="trending">
                    <div className="trending-row">
                        <div className="nr">1</div>
                        <div className="pl"><Playlist /></div>
                        <div className="pl_creator">DJ Stamat</div>
                        <div className="free">10/10/2022</div>
                    </div>
                    <div className="trending-row">
                        <div className="nr">2</div>
                        <div className="pl"><Playlist /></div>
                        <div className="pl_creator">DJ Spitnoise</div>
                        <div className="free">10/10/2022</div>
                    </div>
                    <div className="trending-row">
                        <div className="nr">3</div>
                        <div className="pl"><Playlist /></div>
                        <div className="pl_creator">DJ Qvor</div>
                        <div className="free">10/10/2022</div>
                    </div>
                    <div className="trending-row">
                        <div className="nr">4</div>
                        <div className="pl"><Playlist /></div>
                        <div className="pl_creator">DJ Desov</div>
                        <div className="free">10/10/2022</div>
                    </div>
                </div>
           </div>
           <div className="search_songs_grid">
            <div className="search"><SearchBar /></div>
            <div className="top-songs">
                <h1>Trending songs</h1>
            </div>
            <div className="song-containers">
                <Song />
                <Song />
                <Song />
                <Song />
                <Song />
                <Song />
                <Song />
                <Song />
            </div>
           </div>
           
            </div>
      </>
    );
  
    }
  export default HomePage;