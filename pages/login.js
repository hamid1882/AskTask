import React,{useState} from "react";
import Link from 'next/link'

export default function login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  

  const handleInputText = (event, name) => {
    if(name === "username") {
      setUserName(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }

  return (
    <div className="login-page">
      <h1>Please Login to Continue</h1>
      <p>Now Manage your Daily tasks and track your task's Efficiency and Speed!</p>
      <div className="login-container">
        <div className="input-bar">
          <p className='input-title'>Username</p>
          <input 
            type="text" 
            className="input" 
            onChange={(e) => handleInputText(e, "username")} 
            value={username}
          />
        </div>
        <div className="input-bar">
          <p className='input-title'>Password</p>
          <input 
            type="text" 
            className="input" 
            onChange={(e) => handleInputText(e, "password")} 
            value={password}
          />
        </div>
        <div className="login-bar">
          <Link href="./home">
            <a className="button">
              Login
            </a>
          </Link>
        </div>
      </div>
      <style jsx>{`
      .login-page {
        height: 100%;
        text-align: center;
      }

      .login-container {
        border: 1px solid #ccc;
        box-shadow: 2px 2px 5px 1px #ccf;
        margin: 2em 20%;
        border-radius: 2em;
        padding: 1em 3em;
        display: grid;
        place-items: center;
        height: 14em;
      }

      .input-bar {
        width: 20em;
        text-align: left;
      }

      .input-title {
        text-align: left;
        margin-bottom: 2px;
      }

      .input {
        width: 100%;
        border: 1px solid #ccc;
        padding: 0.5em;
        font-style: Roboto;
        border-radius: 0.4em;
      }

      .input:focus {
        outline: none;
        border: 2px solid #ccf;
      }

      .login-bar {
        width: 20em;
        text-align: left;
        margin: 2em;
      }

      .button {
        margin: 2em 0em;
        padding: 0.7em;
        padding-right: 2em;
        padding-left: 2em;
        border: none;
        background-color: #ccc;
        cursor: pointer;
        border-radius: 0.4em;
        text-decoration: none;
        color: black;
      }

      .button:hover {
        background-color: #fff;
        box-shadow: 1px 1px 2px 1px #ccf;
      }
      
      .button:focus {
        border: 1px solid #ccf;
        outline: none;
      }
      `}
      </style>    
    </div>
  )
}


  