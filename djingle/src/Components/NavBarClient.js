import { Link, useMatch, useResolvedPath } from "react-router-dom";
import home from "../home_i.png";
import playlists_ico from "../playlist.png";
import recently from "../rec.png";
import chart from "../chart.png";
import logo from "../logoDark.png"

export default function NavBarClient() {
  return (
    <>
    <nav className="nav-logo">
        <ul>
          <LogoLink to="/">
            <img src={logo} className="logo" id="nav-bar-logo" alt="logo" />
          </LogoLink>
        </ul>
      </nav>
    <nav className="nav">
      <div className="menu-container">
        <ul>
          <CustomLink to="/client">
            <img className="menu-icons" src={home} alt="home_icon"></img> Home
          </CustomLink>
          <CustomLink to="/playlists/:userId">
            <img
              className="menu-icons"
              src={playlists_ico}
              alt="home_icon"
            ></img>{" "}
            Library
          </CustomLink>
          <CustomLink to="/recentlyPlayed">
            <img className="menu-icons" src={recently} alt="home_icon"></img>{" "}
            Recently played
          </CustomLink>
          <CustomLink to="/charts">
            <img className="menu-icons" src={chart} alt="home_icon"></img>{" "}
            Charts
          </CustomLink>
          {/* <CustomLink to="/artist">Artist</CustomLink> */}
        </ul>
      </div>
    </nav>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

function LogoLink ({to, children, ...props}){
    const resolvedPath = useResolvedPath(to);
    return (
        <li>
            <Link to={to} >
                {children}
            </Link>
        </li>
    )
}