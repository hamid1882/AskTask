import React,{useState, useEffect} from "react";
import Link from 'next/link';
import axios from "axios";
import Signup from "../Components/Signup";
import Logo from "../public/images/Logo.svg";
import Login from "../Components/Login";

export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [route, setRoute]  = useState("./");
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUser,setIsUser] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [logggedInId, setLoggedInId] = useState(0);
  const [isViewPassword, setIsViewPassword] = useState(false);

  const getAllUsers = () => {
    axios.get("https://62d361ea81cb1ecafa6cb7b8.mockapi.io/api/v1/users").then(res => {
      setUsers(res.data)
    }).catch(err => {
      console.log(err);
    })
  }
  
  const handleInputText = (event, name, type) => {
    console.log(users);
    if(name === "username") {
      setUserName(event.target.value);
      const foundUser = users && users.find(val => val.name === event.target.value);
      if(foundUser) {
        setIsUser(foundUser);
      } else {
        setIsUser({})
      }
    } 
    
    if(name === "password") {
      setPassword(event.target.value);
      const foundUser = users && users.find(val => val.password === event.target.value);
      if(foundUser) {
        setIsUser(foundUser);
      } else {
        setIsUser({});
      } 
    }

    if(name === "confirm-password") {
      setConfirmPassword(event.target.value);
    }

    if(type === "signup" && name === "username") {
      const foundUser = users && users.find(val => val.name === event.target.value);
      if(foundUser) {
        alert("User already exists");
      } else {
        console.log("Continue to signup");
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

  const handleSignup = () => {
    if(users.find(val => val.name === username)) {
      alert("User already exists");
      setUserName("");
      setPassword("");
      setConfirmPassword("");
    } else {
      axios.post("https://62d361ea81cb1ecafa6cb7b8.mockapi.io/api/v1/users",{name: username, password: password}).then(res => {
        users.push(res.data)
        setIsSignup(false);
        setUserName("");
        setPassword("");
        alert("Account created successfully, login to continue");
      }).catch(err => console.log(err));
    }
  }

  const handleTabSwitch = (name) => {
    if(name === "login") {
      setIsSignup(false);
      setUserName("");
      setPassword("");
    } else if(name === "signup") {
      setIsSignup(true);
      setUserName("");
      setPassword("");
      setConfirmPassword("");
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
      <div className="tab-bar">
        <button 
          className={!isSignup ? ["tab-btn", "tab-active"].join(" ") : "tab-btn"} 
          onClick={() => handleTabSwitch("login")}>
            Login
        </button>
        <button 
          className={isSignup ? ["tab-btn", "tab-active"].join(" ") : "tab-btn"} 
          onClick={() => handleTabSwitch("signup")}>
            Sign Up
        </button>
      </div>
      {
      !isSignup
      ? <Login 
          isLogin={isLogin}
          isError={isError}
          username={username}
          password={password}
          isViewPassword={isViewPassword}
          handleInputText={handleInputText}
          setIsViewPassword={setIsViewPassword}
          handleLogin={handleLogin}
          route={route}
      />
      : <Signup 
        username={username} 
        password={password} 
        confirmPassword={confirmPassword}
        handleSignup={handleSignup}
        handleInputText={handleInputText}
      />
      }
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


  