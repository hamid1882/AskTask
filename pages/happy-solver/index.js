import React,{useState,useEffect} from 'react';
import Topbar from '../../Components/Topbar';
import Sidebar from '../../Components/Sidebar';
import HappyContainer from '../../Components/happySolverCompo/HappyContainer';

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
      />
      <div className="main-container">
        <Sidebar />
        <div className="happy-container">
          <HappyContainer />
        </div>
      </div>
      <style jsx>{
        `
        .home-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(#694D78,#52435B);
          margin: 0;
          position: relative;
        }

        .main-container {
          display: flex;
        }  
        
        .happy-container {
          width: 100%;
        }
        `
      }</style>
    </div>
  )
}
