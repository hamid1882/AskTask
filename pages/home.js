import React, {useEffect, useState} from 'react';
import Link from "next/link";

export default function home() {
  const [isAvatar, setIsAvatar] = useState("/static/images/logo.png");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "./"
  }

  useEffect(() => {
    if(typeof window !== "undefined") {
      const isLogged = localStorage.getItem("isLoggedIn");
      const user = JSON.parse(localStorage.getItem("user"));
      setIsAvatar(user.avatar);
      // !isLogged && window.location.href = "./";
      console.log(user.avatar);
    }
    }, []);


  return (
    <div className='home-container'>
      <div className="top-bar">
        <div className="flex-1">
          <img src="/static/images/logo.png" alt="icon" style={{height: "3em", width: "3em"}} />
          <h2 className="title">Habit Tracker</h2>
        </div>
        <div className="flex-1">
          <div className="top-text-bar">
            <h4 className="welocome-text">Welcome Touheed Ur Rehman</h4>
            <button className="dashboard-btn">Dashboard</button>
          </div>
          <img 
            src={isAvatar} 
            alt="icon" 
            className="profile-pic" 
            style={{height: "3em", width: "3em", borderRadius: "50%"}} />
        </div>
      </div>
      <style jsx>{
        `
        .home-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(#694D78,#52435B);
        }

        .top-bar {
          height: 3em;
          background-color: #C9B8D3;
          margin: 1em;
          border-radius: 3.5em;
          display: flex;
          justify-content: space-between;
          padding: 1em 2em;
        }

        .flex-1 {
          display: flex;
          align-items: center;
          gap: 1em;
        }

        .top-text-bar {
          display: grid; 
        }
        `
      }</style>
    </div>
  )
}
