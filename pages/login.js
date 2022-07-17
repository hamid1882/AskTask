import React,{useState, useEffect} from "react";
import Link from 'next/link';
import axios from "axios";

export default function login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [route, setRoute]  = useState("./");
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUser,setIsUser] = useState({});
  const [logggedInId, setLoggedInId] = useState(0);

  const getAllUsers = () => {
    axios.get("https://62d361ea81cb1ecafa6cb7b8.mockapi.io/api/v1/users").then(res => {
      setUsers(res.data)
    }).catch(err => {
      console.log(err);
    })
  }
  
  const handleInputText = (event, name) => {


    if(name === "username") {
      setUserName(event.target.value);
      const foundUser = users.find(val => val.name === event.target.value);
      if(foundUser) {
        setIsUser(foundUser);
      } else {
        setIsUser({})
      }
    } 
    
    if(name === "password") {
      setPassword(event.target.value);
      const foundUser = users.find(val => val.password === event.target.value);
      if(foundUser) {
        setIsUser(foundUser);
      } else {
        setIsUser({});
      } 
    }
  }

  const handleLogin = () => {
    if(isUser.name === username && isUser.password === password) {
      setIsLogin(true);
      setIsError(false);
      setRoute("./home")
      localStorage.setItem("user", JSON.stringify(isUser));
      localStorage.setItem("isLoggedIn", true);
    } else {
      setIsLogin(false);
      setIsError(true);
      setRoute("./");
      localStorage.removeItem("user")
      localStorage.setItem("isLoggedIn", false);
    }
  }

  useEffect(() => {
    getAllUsers();

    if(isUser.name === username && isUser.password === password) {
      setRoute("./home")
    } else {
      setRoute("./")
    }

  }, [isUser])

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


  