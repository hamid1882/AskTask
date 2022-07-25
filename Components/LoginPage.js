import React,{useState, useEffect} from "react";
import Link from 'next/link';
import axios from "axios";
import Signup from "./Signup";
import Login from "./Login";

export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [route, setRoute]  = useState("./");
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUser,setIsUser] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [logggedInId, setLoggedInId] = useState(0);
  const [isViewPassword, setIsViewPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = () => {
    axios.get(process.env.NEXT_PUBLIC_URL + "/users").then(res => {
      setUsers(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  
  const handleInputText = (event, name, type) => {
    if(name === "username") {
      setUserName(event.target.value);
      const foundUser = users && users.find(val => val.username === event.target.value);
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

    if(name === "fullname") {
      setFullName(event.target.value);
    }

    if(name === "confirm-password") {
      setConfirmPassword(event.target.value);
    }

    if(type === "signup" && name === "username") {
      const foundUser = users && users.find(val => val.username === event.target.value);
      if(foundUser) {
        alert("User already exists");
      } else {
        console.log("Continue to signup");
      }
    }
  }

  const handleLogin = () => {
    if(isUser.username === username && isUser.password === password) {
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

  const handleCreateData = () => {
    const id = username+123;
    let idx = 0;
    const data = {
        [id] : {
          habit: []
          }
        }
    axios.post(process.env.NEXT_PUBLIC_URL + "/data", {data: data}).then(res => {
        // console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  const handleSignup = () => {
    if(users.find(val => val.username === username)) {
      alert("User already exists");
      setUserName("");
      setPassword("");
      setFullName("");
      setConfirmPassword("");
    } else if (username.length > 3 && password.length > 3 && confirmPassword.length > 3) {
      setIsLoading(true);

      const data = {
        username: username, 
        password: password, 
        full_name: fullName,
        data_id: username+123
      }

      axios.post(process.env.NEXT_PUBLIC_URL +"/users", data).then(res => {
        users.push(res.data)
        setIsSignup(false);
        setUserName("");
        setPassword("");
        setFullName("");
        handleCreateData();
        alert("Account created successfully, login to continue");
        setIsLoading(false);
      }).catch(err => console.log(err));

    } else {
      setIsLoading(false);
      alert("Make sure you have entered your name, password and confirm password correctly")
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

    if(isUser.username === username && isUser.password === password) {
      setRoute("./home");
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
        isLoading={isLoading}
        fullName={fullName}
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


  