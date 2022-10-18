import search from '../search-i.png';
import './SearchBar.css';

export default function SearchBar(){
    return(
        <div className="search-bar">
            <div className="search-container">
                <div className='search-text'>
                <p>Search playlists, songs</p>
                </div>
                
            </div>
            <div className="search-icon">
            <img className="search-img" src={search} alt='search-icon'></img>
             </div>
        </div>
    );  
}