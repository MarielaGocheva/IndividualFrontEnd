import {Link, useMatch, useResolvedPath} from "react-router-dom";
import home from '../home_i.png';
import playlists_ico from '../playlist.png';
import recently from '../rec.png';
import chart from '../chart.png';
import useAuth from '../useAuth';
import SearchBar from "./SearchBar";
import HomePage from "../Pages/HomePage";

export default function NavBar({code}){
    const accessToken = useAuth(code);

    return <nav className="nav">
        {/* <h1>{code}</h1> */}
        <div className="menu-container">
        <ul>    
            <CustomLink to="/"><img className='menu-icons' src={home} alt='home_icon'></img> Home</CustomLink>
            <CustomLink to="/playlists/:userId"><img className='menu-icons' src={playlists_ico} alt='home_icon'></img> Playlists</CustomLink>          
            <CustomLink to="/recentlyplayed"><img className='menu-icons' src={recently} alt='home_icon'></img> Recently played</CustomLink>
            <CustomLink to="/charts"><img className='menu-icons' src={chart} alt='home_icon'></img> Charts</CustomLink>
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/login://callback">callback</CustomLink>
        </ul>
        </div>
        <SearchBar accessToken = {accessToken}/>
       
       
    </nav>
}

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
return (
    <li className={isActive? "active" : ""}>
        <Link to ={to} {...props}>{children}</Link>
    </li>
)
}