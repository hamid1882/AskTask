import axios from 'axios';
import React, {useRef} from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary, Transformation} from "@cloudinary/url-gen";

export default function Topbar({userName, isAvatar, handleLogout}) {
  const inputFile = useRef(null);

  const toggleImage = () => {
    inputFile.current.click();
  }

  const handleChangeImage = (e) => {
    const formData = new FormData();

		formData.append('File', formData);

    // const userId = JSON.parse(localStorage.getItem("user"))

		// fetch(
		// 	`https://62d361ea81cb1ecafa6cb7b8.mockapi.io/api/v1/users/${userId.id}`,
		// 	{ 
		// 		method: 'PUT',
		// 		body: {avatar: formData},
		// 	}
		// )
		// 	.then((response) => response.json()).then(result => {
    //     console.log(result);
    //   })
		// 	.catch((error) => {
		// 		console.error('Error:', error);
		// 	});
	};

  // const cld = new Cloudinary({
  //   cloud: {
  //     apiKey: process.env.CLOUDINARY_API_KEY,
  //     apiSecret: process.env.CLOUDINARY_API_SECRET,
  //     cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  //     secure: true
  //   },
  //   url: {
  //     secureDistribution: 'https://res.cloudinary.com/cloudihafeez/image/upload/v1644508307/avatars/yifdbme0vjans8xxxu65.jpg', 
  //     secure: true 
  //   },
  // });



  // const myImage = cld.image('sample');


  // console.log(cld.image("Hamid"), process.env.CLOUDINARY_API_KEY)


  return (
    <div className="top-bar">
        <div className="flex-1">
          <img 
            src="/static/images/logo.png" 
            alt="icon" 
            style={{height: "3em", width: "3em", opacity: "0.7"}} />
          <h2 className="title">#AskTask</h2>
        </div>
        <div className="flex-1">
          <div className="top-text-bar">
            <h4 className="welcome-text">Welcome {userName.toUpperCase()}!</h4>
            <button className="dashboard-btn">Dashboard</button>
          </div>
          <input 
            type='file' 
            id='file' 
            ref={inputFile} 
            style={{display: 'none'}}
            name="img"
            accept="image/*"
            onChange={handleChangeImage}
          />
            <img 
            src={isAvatar} 
            alt="icon" 
            className="profile-pic" 
            style={{height: "3em", width: "3em", borderRadius: "50%"}}
            // onClick={toggleImage}
            />
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
