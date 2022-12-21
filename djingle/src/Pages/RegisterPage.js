import React, { useState } from 'react';
import photo from '../girlLog.png';
import './RegisterPage.css';
import Button from '../Components/Button';
import {Link} from "react-router-dom";
import logo from '../logo-transbg.png'
import SpotifyURL from "../api/SpotifyURL"
import AccountService from '../api/loginServices';

export default function RegisterPage(){
    const [credentialsState, setCredentialsState] = useState({
        fname: "",
        lname: "",
        email: "",
        role: "",
        password: ""
    })

    const onInputChange = (e) => {
        setCredentialsState({ ...credentialsState, [e.target.name]: e.target.value });
        console.log("Input changed: ", credentialsState.email, credentialsState.password)
    };


    const handleOnClick = async (e) => {
        e.preventDefault();
        (async() => {
            console.log("I'm sending the API");
            const response = await AccountService.register(credentialsState.fname, credentialsState.lname, credentialsState.email, credentialsState.role, credentialsState.password);
            console.log("Response" + response.data);
            alert(response.data);
            <script>{window.location.href=SpotifyURL}</script>
        })();

        
        
      };

    return (
        <>
        <img className='logo-transbg' src={logo} alt='logo'></img>
        <div className="register-body">
            <div className="register-picture">
                <img src={photo} alt='login-picture'></img>
            </div>
            <div className='register-credentials'>
                <h1 className='login-title'>REGISTER</h1>
                <div className='firs-name-container'>
                    <span>First Name</span>
                    <div className='first-name-input'>
                        <input name="fname" type="text" value={credentialsState.fname} onChange={onInputChange}></input>
                    </div>
                </div>
                <div className='last-name-container'>
                    <span>Last Name</span>
                    <div className='last-name-input'>
                        <input name="lname" type="text" value={credentialsState.lname} onChange={onInputChange}></input>
                    </div>
                </div>
                <div className='email-container'>
                    <span>Email</span>
                    <div className='email-input'>
                    <input name='email' type="text" value={credentialsState.email} onChange={onInputChange}></input>
                    </div>
                </div>
                <div className='role-container'>
                    <span>Role</span>
                    <div className='role-input'>
                    <input name='role' type="text" value={credentialsState.role} onChange={onInputChange}></input>
                    </div>
                </div>
                <div className='password-container'>
                    <span>Password</span>
                    <div className='password-input'>
                    <input name='password' type="text" value={credentialsState.password} onChange={onInputChange}></input>
                    </div>
                </div>
                <div className='forgot-pass'>
                </div>
                <div className='remember-me'>
                   <input type='checkbox' id='remember'></input>
                   <label for='remember'>Remember me</label>
                </div>
                <div className='regiter-btn'>
                <a className='btn btn-success btn-lg' onClick={handleOnClick}>
                Register
            </a>
                </div>
            </div>
        </div>
        </>
    );
}