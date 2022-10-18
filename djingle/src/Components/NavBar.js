import {Link, useMatch, useResolvedPath} from "react-router-dom";
import home from '../home_i.png';
import playlists_ico from '../playlist.png';
import recently from '../rec.png';
import chart from '../chart.png';

export default function NavBar(){
    return <nav className="nav">
        <div className="menu-container">
        <ul>
                
            <CustomLink to="/home"><img className='menu-icons' src={home} alt='home_icon'></img> Home</CustomLink>
            <CustomLink to="/playlists"><img className='menu-icons' src={playlists_ico} alt='home_icon'></img> Playlists</CustomLink>          
            <CustomLink to="/recentlyplayed"><img className='menu-icons' src={recently} alt='home_icon'></img> Recently played</CustomLink>
            <CustomLink to="/charts"><img className='menu-icons' src={chart} alt='home_icon'></img> Charts</CustomLink>
        </ul>
        </div>
       
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