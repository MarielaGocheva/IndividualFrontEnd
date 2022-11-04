import photo from '../girlLog.png';
import './RegisterPage.css';
import Button from '../Components/Button';
import {Link} from "react-router-dom";
import logo from '../logo-transbg.png'

export default function RegisterPage(){
    return (
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
                    <input></input>
                    </div>
                </div>
                <div className='password-container'>
                    <span>Password</span>
                    <div className='password-input'>
                    <input></input>
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
                <div className='register-btn'>
                    <Button />
                </div>
            </div>
        </div>
        </>
    );
}