import React,{useState} from "react";
import Link from 'next/link';

export default function login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [route, setRoute]  = useState("./");
  const [isError, setIsError] = useState(false);
  
  const handleInputText = (event, name) => {
    if(name === "username") {
      setUserName(event.target.value);
    } else {
      setPassword(event.target.value);
    }

    if(name === "password" && event.target.value === "hamid") {
        setRoute("./home")
    } else {
      setRoute("./")
    }
  }

  const handleLogin = () => {
    if(username.toLowerCase() === "hamid" && password.toLowerCase() === "hamid") {
      setIsLogin(true);
      setIsError(false);
    } else {
      setIsLogin(false);
      setIsError(true)
      setUserName("");
      setPassword("");
      setRoute("./")
    }
  }

  return (
    <div className="login-page">
      <h1>Please Login to Continue</h1>
      <p>Now Manage your Daily tasks and track your task's Efficiency and Speed!</p>
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
          <Link href={route}>
            <a className="button" onClick={handleLogin}>
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
        margin: 2em 20%;
        border-radius: 2em;
        padding: 1em 3em;
        display: grid;
        place-items: center;
        height: 20em;
      }

      .input-bar {
        width: 50%;
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
        margin-left: -2.5em;
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


  