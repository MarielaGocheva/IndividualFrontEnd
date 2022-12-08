import React, { useEffect, useState } from 'react';
import photo from '../girlLog.png';
import './RegisterPage.css';
import {Link,useNavigate} from "react-router-dom";
import logo from '../logo-transbg.png'
import SpotifyURL from "../api/SpotifyURL"
import AccountService from '../api/loginServices';
import RegisterPage from './RegisterPage';
import { useAuth } from '../providers/AuthProvider';
import jwt_decode from "jwt-decode";

export default function LoginPage(){
    const [user, setUser] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [credentialsState, setCredentialsState] = useState({
        email: "",
        password: ""
    })

    const onInputChange = (e) => {
        setCredentialsState({ ...credentialsState, [e.target.name]: e.target.value });
        console.log("Input changed: ", credentialsState.email, credentialsState.password)
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        (async() => {
            const response = await AccountService.login(credentialsState.email, credentialsState.password);
            if(response.status === 200){
                setCredentialsState({email:"", password:""})
                  localStorage.setItem('login_access_token',response.data.accessToken);
                  var decoded = jwt_decode(localStorage.getItem('login_access_token'));
                  if(decoded.roles == "DJ"){
                    login("DJ");
                  }
                  else if(decoded.roles == "CLIENT"){
                    login("CLIENT");
                  }
              }
              else if(response.status === 204){
                setCredentialsState({email:"", password:"", failureMessage:"Incorrect Credentials"})
              }          
            // alert("Response" + response.data);
            // alert(response.data);
            <script>{window.location.href=SpotifyURL}</script>
            
            // login(user);
        })();
      };

      const handleRedirectToRegister = (e) =>{
        navigate("/register");
      }

      const [redirect, setRedirect] = useState("");
      const redirectToRegister = () => {
        setRedirect(<RegisterPage />) 
        redirect.push(<RegisterPage />)
    }

    useEffect(() =>{
      },[redirect])

    return (
        redirect ?
        <RegisterPage /> :
        <>
        <img className='logo-transbg' src={logo} alt='logo'></img>
        <div className="register-body">
            <div className="register-picture">
                <img src={photo} alt='login-picture'></img>
            </div>
            <div className='register-credentials'>
                <h1 className='login-title'>LOGIN</h1>
                <div className='email-container'>
                    <span>Email</span>
                    <div className='email-input'>
                    <input name='email' type="text"  onChange={onInputChange}></input>
                    </div>
                </div>
                <div className='password-container'>
                    <span>Password</span>
                    <div className='password-input'>
                    <input name='password' type="password" value={credentialsState.password} onChange={onInputChange}></input>
                    </div>
                </div>
                <div className='forgot-pass'>
                    <ul>
                    <li>
                        <Link to='../playlists'>Forgot password?</Link></li>
                    </ul>
                </div>
                <div className='remember-me'>
                   <input type='checkbox' id='remember'></input>
                   <label for='remember'>Remember me</label>
                </div>
                <div className='regiter-btn'>
                <a className='btn btn-success btn-lg' onClick={handleLogin}>
                Login
            </a>
                </div>
                <div className='new-account'>
                    <span className = "LoginText" onClick={() => redirectToRegister()}>Don't have an account?</span>
                </div>
            </div>
        </div>
        </>
    );
}
 