import { Link, useMatch, useResolvedPath } from "react-router-dom";
import home from "../home_i.png";
import playlists_ico from "../playlist.png";
import recently from "../rec.png";
import logo from "../logoDark.png";
import logout from "../djingle-logout.png"

export default function NavBar() {
  const removeAccessToken = () => {
    localStorage.clear();
  }
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
        {/* <div className="menu-container"> */}
        <ul>
          <CustomLink to="/">
            <img className="menu-icons" src={home} alt="home_icon"></img> Home
          </CustomLink>
          <CustomLink to="/playlists/:userId">
            <img
              className="menu-icons"
              src={playlists_ico}
              alt="home_icon"
            ></img>{" "}
            Playlists
          </CustomLink>
          <CustomLink to="/recentlyPlayed">
            <img className="menu-icons" src={recently} alt="home_icon"></img>{" "}
            Recently played
          </CustomLink>
          <CustomLink to="/login" onClick={removeAccessToken}>
            <img className="menu-icons" src={logout} alt="logout_icon"></img>{" "}
            Logout
          </CustomLink>
        </ul>
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

function LogoLink({ to, children, ...props }) {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
}
