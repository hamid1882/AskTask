import React,{useState,useEffect} from 'react';
import Topbar from '../../Components/Topbar/Topbar';
import Sidebar from '../../Components/Sidebar';

export default function Happyhome() {
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
        setUserName(user.full_name);
      }
    }

    }, []);

  return (
    <div className='home-container'>
      <Topbar 
        userName={userName}
        isAvatar={isAvatar}
        handleLogout={handleLogout}
        setIsAvatar={setIsAvatar}
      />
      <div className="main-container">
      <Sidebar />
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
