import React, { useEffect, useState } from "react";
import photo from "../girlLog.png";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo-transbg.png";
import SpotifyURL from "../api/SpotifyURL";
import AccountService from "../api/loginServices";
import RegisterPage from "./RegisterPage";
import { useAuth } from "../providers/AuthProvider";
import jwt_decode from "jwt-decode";
import useSpotifyAuth from "../useAuth";
import SpotifyAccess from "../providers/SpotifyAccess";
import LoginSpotify from "../LoginSpotify";
import Swal from "sweetalert2";

const code = new URLSearchParams(window.location.search).get("code");

export default function LoginPage() {
  if (code) {
    SpotifyAccess({ code });
  }
  // useEffect(() => {
    
  //   else {
  //     navigate(SpotifyURL, {replace: true});
  //   }
  // }, [])
  

  const [user, setUser] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentialsState, setCredentialsState] = useState({
    email: null,
    password: null
  });

  const onInputChange = (e) => {
    setCredentialsState({
      ...credentialsState,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (credentialsState.email && credentialsState.password) {
      (async () => {
        const response = await AccountService.login(
          credentialsState.email,
          credentialsState.password
        );
        if (response.status === 200) {
          setCredentialsState({ email: "", password: "" });
          localStorage.setItem("login_access_token", response.data.accessToken);
          var decoded = jwt_decode(localStorage.getItem("login_access_token"));
          if (decoded.roles == "DJ") {
            login("DJ");
          } else if (decoded.roles == "CLIENT") {
            login("CLIENT");
          }
        } else if (response.status === 204) {
          setCredentialsState({email: "", password: ""});
          Swal.fire("Incorrect credentials!", "Please try again.", "error");
        }
      })();
    } else {
      Swal.fire(
        "No credentials provided!",
        "Please fill the fields for email and password.",
        "warning"
      );
    }
    // <script>{window.location.href=SpotifyURL}</script>
  };

  const handleRedirectToRegister = (e) => {
    navigate("/register");
  };

  const [redirect, setRedirect] = useState("");
  const redirectToRegister = () => {
    setRedirect(<RegisterPage />);
    redirect.push(<RegisterPage />);
  };

  useEffect(() => {}, [redirect]);

  return redirect ? (
    <RegisterPage />
  ) : (
    <>
      <div className="register-body">
        <div className="register-picture">
          <a className="btn btn-success btn-lg" href={SpotifyURL}>
            Login With Spotify
          </a>
          <img
            className="logo-transbg"
            src={logo}
            alt="logo"
            id="logo-trans"
          ></img>
          <img src={photo} alt="login-picture"></img>
        </div>
        <div className="login-credentials">
          <div className="login-container">
            <h1 className="login-title">LOGIN</h1>
            <div className="email-container">
              <span>Email</span>
              <div className="email-input">
                <input
                  className="login-email-input"
                  name="email"
                  type="text"
                  value={credentialsState.email}
                  onChange={onInputChange}
                ></input>
              </div>
            </div>
            <div className="password-container">
              <span>Password</span>
              <div className="password-input">
                <input
                  className="login-password-input"
                  name="password"
                  type="password"
                  value={credentialsState.password}
                  onChange={onInputChange}
                ></input>
              </div>
            </div>
            <div className="forgot-pass">
              <ul>
                <li>
                  <Link className="forgot-pass-link" to="../playlists">
                    Forgot password?
                  </Link>
                </li>
              </ul>
            </div>
            <div className="remember-me">
              <input
                className="remember-checkbox"
                type="checkbox"
                id="remember"
              ></input>
              <span className="checkmark"></span>
              <label for="remember">Remember me</label>
            </div>
            <div className="login-btn">
              <a
                className="btn btn-success btn-lg"
                onClick={handleLogin}
                id="login-btn"
              >
                Log in
              </a>
            </div>
            <div className="new-account">
              <span className="LoginText" onClick={() => redirectToRegister()}>
                Don't have an account?
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
