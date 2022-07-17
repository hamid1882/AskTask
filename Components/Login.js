import Link from 'next/link'
import React from 'react'

export default function Login({isLogin, isError, username, password, isViewPassword, handleLogin, route, handleInputText, setIsViewPassword}) {
  return (
    <div className="login-container">
    <div className="input-bar">
        {
          isLogin && <p className="success-text">Logging you in...</p> 
        }
        {
          isError && <p className="error-text">Please Enter Valid Credentials</p>

        }
      </div>
      <div className="input-bar">
        {username.length > 0 && <p className='input-title'>Username/Email</p>}
        <input 
          type="text" 
          className="input" 
          onChange={(e) => handleInputText(e, "username")} 
          value={username}
          placeholder="Enter Email or your Username"
        />
      </div>
      <div className="input-bar">
        {password.length > 0 && <p className='input-title'>Password</p>}
        <input 
          type={!isViewPassword ? "password" : "text"}
          className="input" 
          onChange={(e) => handleInputText(e, "password")} 
          value={password}
          placeholder="Enter Password"
        />
        <p className="show-psk" onClick={() => setIsViewPassword(!isViewPassword)}>👁</p>
      </div>
      <div className="forgot-password">Forgot password?</div>
      <div className="login-bar">
        <Link href={route}>
          <a className="button" onClick={handleLogin} style={{textAlign: "center"}}>Login</a>
        </Link>
      </div>
      <style jsx>{`
      .tab-bar {
        width: 90%;
        background-color: #fff;
        border: none;
        color: black;
        text-align: center;
        text-decoration: none;
        display: flex;
        margin: 1.5em 1em;
        cursor: pointer;
        border-radius: 2em;
      }

      .tab-btn {
        padding: 0.7em;
        width: 100%;
        border-radius: 2em;
        border: none;
        cursor: pointer;
        background-color: #fff;
        font-weight: bold;
        letter-spacing: 0.1em;
      }
      
      .tab-active {
        color: #fff;
        background-color: #A486B5;
      }

      .top-bar {
        display: flex;
        gap: 1.5em;
        align-items: center;
        padding: 2em;
      }

      .logo {
        width: 5em;
        height: 5em;
        border-radius: 50%;
      }

      .title {
        font-size: "46px";
        font-weight: bold;
        color: rgba(255,255,255, 0.8)
      }

      .login-container {
        border-radius: 2em;
        display: grid;
        place-items: center;
        height: 20em;
      }

      .input-bar {
        width: 90%;
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
      }

      .button:hover {
        background: #A486B5;
        color: white
      }
      
      .button:focus {
        border: 1px solid #A486B5;
        outline: none;
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
