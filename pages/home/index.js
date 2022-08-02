import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Topbar from '../../Components/Topbar';
import Sidebar from '../../Components/Sidebar';
import TaskContainer from '../../Components/TaskContainer';
import axios from 'axios';

export default function home() {
  const [isAvatar, setIsAvatar] = useState("/static/images/logo.png");
  const [userName, setUserName] = useState("user");
  const [userDataId, setUserDataId] = useState("");
  const [userData, setUserData] = useState([]);
  const [dataId, setDataId] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "./"
  }

  const getAllData = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user) {
      axios.get(`${process.env.NEXT_PUBLIC_URL + "/data"}`,).then(res => {
        const resultData = res.data.find(val => val.data[user.data_id]);
        const parsedData = resultData.data[user.data_id];
        setUserData(parsedData);
        setDataId(res.data.find(val => val.data).id);
      }).catch(err => {
        console.log(err);
      })
    }
  }

  useEffect(() => {
    if(typeof window !== "undefined") {
      const isLogged = localStorage.getItem("isLoggedIn");
      const user = JSON.parse(localStorage.getItem("user"));
      setIsAvatar("/static/loader/mini-loader.svg")
      if(user) {
        setIsAvatar(user.avatar);
        setUserName(user.full_name);
        setUserDataId(user.data_id);
      }
    }

    getAllData();
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
      <TaskContainer 
        habitList={userData.habit}
        setUserData={setUserData}
        dataId={dataId}
      />
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
