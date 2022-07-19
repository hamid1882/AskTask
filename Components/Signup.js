import Link from 'next/link'
import React, {useState} from 'react'

export default function Signup({
  username, password, confirmPassword, handleSignup, handleInputText, isLoading, fullName}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="login-container">
        <div className="input-bar">
          {fullName.length > 0 &&  <p className='input-title'>Full Name</p>}
          <input 
            type="text" 
            className="input" 
            onChange={(e) => handleInputText(e, "fullname", "signup")} 
            value={fullName}
            placeholder="Enter your Full Name"
          />
        </div>
        <div className="input-bar">
          {username.length > 0 &&  <p className='input-title'>Username</p>}
          <input 
            type="text" 
            className="input" 
            onChange={(e) => handleInputText(e, "username", "signup")} 
            value={username}
            placeholder="Enter your Username"
          />
        </div>
        <div className="input-bar">
          {password.length > 0 && <p className='input-title'>Password</p>}
          <input 
            type={!showPassword ? "password" : "input" }
            className="input" 
            onChange={(e) => handleInputText(e, "password", "signup")} 
            value={password}
            placeholder="Enter Password"
          />
          <p className="show-psk" onClick={() => setShowPassword(!showPassword)}>👁</p>
        </div>
        <div className="input-bar">
          {confirmPassword.length > 0 && <p className='input-title'>Confirm Password</p>}
          <input 
            type={!showConfirmPassword ? "password" : "input"} 
            className="input" 
            onChange={(e) => handleInputText(e, "confirm-password", "signup")} 
            value={confirmPassword}
            placeholder="Confirm Password"
          />
          <p className="show-psk" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>👁</p>
        </div>
        <div className="login-bar">
          <Link href={"./"}>
          {!isLoading
            ? <a className="button" onClick={handleSignup}>Sign up</a>
            : <img className='button' src="/static/loader/new-mini-loader.svg" alt="loading" style={{width: "2em", height: "2em"}}/>
          }
          </Link>
        </div>
        <style jsx>{`
      .login-page {
        height: 100%;
        text-align: center;
        width: 100%;
      }

      .login-container {
        width: 100%;
        height: 10em;
        border-radius: 2em;
        padding: 1em 1.5em;
      }

      .input-bar {
        width: 100%;
        margin: 1em 0em;
        text-align: left;
        color: #fff;
      }

      .input-title {
        text-align: left;
        margin-bottom: 5px;
        font-size: 10px;
        letter-spacing: 0.2em;
        color: rgba(255, 255, 255, 0.5);
      }

      .input {
        width: 100%;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        outline: none;
        shadow: none;
        padding: 0.5em;
        font-style: Roboto;
        background: transparent;
        color: #fff;
      }

      .input:focus {
        outline: none;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }

      .input:active {
        outline: none;
        border: none;
        background: transparent;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }

      .show-psk {
        position: relative;
        top: -3em;
        left: 18em;
        cursor: pointer;
        margin-bottom: -2em;
      }

      .forgot-password {
        font-size: 10px;
        color:rgba(255, 255, 255, 0.5);
        position: relative;
        top: -5em;
        left: 10em;
        cursor: pointer;
      }

      .login-bar {
        width: 10em;
        text-align: center;
        margin: 2em auto;
      }

      .button {
        background-color: #fff;
        border: none;
        color: black;
        padding: 0.5em;
        text-align: center;
        text-decoration: none;
        display: flex;
        justify-content: center;
        margin: 1em auto;
        cursor: pointer;
        border-radius: 2em;
        width: 100%;
      }

      .button:hover {
        background: #A486B5;
        color: white
      }
      
      .button:focus {
        border: 1px solid #A486B5;
        outline: none;
      }

      .show-psk {
        position: relative;
        top: -3em;
        left: 18em;
        cursor: pointer;
      }

      .success-text {
        color: green;
        font-weight: bold;
        font-size: 14px;
        letter-spacing: 0.1em;
      }

      .error-text {
        color: red;
        font-weight: bold;
        font-size: 14px;
        letter-spacing: 0.1em;
      }
      `}
      </style>    
      </div>
  )
}
