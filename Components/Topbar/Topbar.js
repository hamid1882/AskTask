import axios from 'axios';
import Image from 'next/image';
import classes from"./Topbar.module.css";
import React, {useState,useRef, useEffect} from 'react';

export default function Topbar({userName, isAvatar, handleLogout, setIsAvatar}) {
const [isImage, setIsImage] = useState("");
const [isUpdating, setIsUpdating] = useState(false);

  const inputFile = useRef(null);

  const toggleImage = () => {
    inputFile.current.click();
  }

  const UpdateProfilePicture = (url) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    userData.avatar = url;

    axios.put(`${process.env.NEXT_PUBLIC_URL}/users/${userData.id}/`, userData).then(res => {
      console.log(res);
    }).catch(err => console.log(err))

    localStorage.setItem("user", JSON.stringify(userData));
  }

  const UploadImage = () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("file", isImage);
    formData.append("upload_preset", "k8izzzm7");


    axios.post(`https://api.cloudinary.com/v1_1/cloudihafeez/image/upload`, formData).then(res => {
      UpdateProfilePicture(res.data.url);
      setIsAvatar(res.data.url);
      setIsUpdating(false);
    }).catch(err => {
      console.log(err)
      setIsUpdating(false);
    })
  }
  
  useEffect(() => {
    if(isImage) {
      UploadImage();
    }
  }, [isImage])


  return (
    <div className="top-bar">
        <div className="flex-1">
          <img
            src="/static/images/logo.png"
            alt="icon" 
            className={classes.img} />
          <h2 className="title">#AskTask</h2>
        </div>
        <div className="flex-1">
          <div className="top-text-bar">
            <h4 className="welcome-text">Welcome {userName.toUpperCase()}!</h4>
            <button 
              className="dashboard-btn" 
              onClick={() => document.location.href = "./"}
              >Logout</button>
          </div>
          <input 
            type='file' 
            id='file' 
            ref={inputFile} 
            style={{display: 'none'}}
            name="img"
            accept="image/*"
            onChange={(e) => setIsImage(e.target.files[0])}
          />
           { 
           !isUpdating ?
           <img 
            src={isAvatar} 
            alt="icon" 
            className="profile-pic" 
            title="Change Profile Pic"
            style={{height: "3.5em", width: "3.5em", borderRadius: "50%"}}
            onClick={toggleImage}
            />
            : 
            <img
               style={{height: "3em", width: "3em", borderRadius: "50%"}}
               src="/static/loader/button-loader.svg" 
            />
            }
        </div>
        <style jsx>{
        `
        .top-bar {
          height: 3em;
          background-color: #C9B8D3;
          margin: 1em;
          border-radius: 3.5em;
          display: flex;
          justify-content: space-between;
          padding: 1em 1.5em;
        }

        .flex-1 {
          display: flex;
          align-items: center;
          gap: 1em;
        }

        .top-text-bar {
          display: grid;
          margin-top: -1em;
        }

        .profile-pic {
          cursor: pointer;
          object-fit: cover;
        }
        
        .profile-pic:hover {
          opacity: 0.8;
          box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.7);
          transition: all 0.3s;
        }

        .welcome-text {
          font-size: 14px;
          font-family: sans-serif;
        }

        .dashboard-btn {
          margin-top: -1em;
          cursor: pointer;
          background-color: #A486B5;
          color: #fff;
          font-weight: bold;
          border: none;
          border-radius:2em;
          padding: 0.3em;
        }

        .dashboard-btn:hover {
          background-color: #52435B;
        }
        `
      }</style>
      </div>
  )
}
