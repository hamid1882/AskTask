import Link from 'next/link'
import React, {useState} from 'react'

export default function Signup({username, password, confirmPassword, handleSignup, handleInputText}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="login-container">
      {/* <div className="input-bar">
          {
            isLogin && <p className="success-text">Logging you in...</p> 
          }
          {
            isError && <p className="error-text">Please Enter Valid Credentials</p>

          }
        </div> */}
        <div className="input-bar">
          {username.length > 0 &&  <p className='input-title'>Name</p>}
          <input 
            type="text" 
            className="input" 
            onChange={(e) => handleInputText(e, "username", "signup")} 
            value={username}
            placeholder="Enter your Name"
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
            <a className="button" onClick={handleSignup}>
              Sign up
            </a>
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
        border-radius: 2em;
        padding: 1em 1.5em;
        display: grid;
        place-items: center;
        height: 20em;
      }

      .input-bar {
        width: 100%;
        margin: 0.5em 0em;
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
        margin-bottom: -3em;
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
        margin: 0 auto;
        cursor: pointer;
        border-radius: 2em;
        width: 100%;
        margin: 3.5em 0em;
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
