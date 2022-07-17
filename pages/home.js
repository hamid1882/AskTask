import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';
import TaskContainer from '../Components/TaskContainer';

export default function home() {
  const [isAvatar, setIsAvatar] = useState("/static/images/logo.png");
  const [userName, setUserName] = useState("user");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "./"
  }

  useEffect(() => {
    if(typeof window !== "undefined") {
      const isLogged = localStorage.getItem("isLoggedIn");
      const user = JSON.parse(localStorage.getItem("user"));
      setIsAvatar("/static/loader/mini-loader.svg")
      if(user) {
        setIsAvatar(user.avatar);
        setUserName(user.name);
      }
    }
    }, []);


  return (
    <div className='home-container'>
      <Topbar 
        userName={userName}
        isAvatar={isAvatar}
        handleLogout={handleLogout}
      />
      <div className="main-container">
      <Sidebar />
      <TaskContainer />
      </div>
      <style jsx>{
        `
        .home-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(#694D78,#52435B);
          margin: 0;
        }

        .main-container {
          display: flex;
        }    
        `
      }</style>
    </div>
  )
}
