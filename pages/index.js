import React,{useEffect} from "react";
import Head from 'next/head';
import LoginPage from "../Components/LoginPage";

export default function Home() {

  useEffect(() => {
    if(typeof document !== "undefined") {
      let isLogin = localStorage.getItem('isLoggedIn');
      if(isLogin === true) {
        window.location.href = "./home"
      }
    }
  }, []);


  return (
    <div className='main'>
      <Head>
        <title>AskTask - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="top-bar">
        <img src="/static/images/logo.png" alt="logo" className="logo" style={{height: "5em", width: "5em"}} />
        <span className="title" style={{fontSize: "46px"}}>#AskTask</span>
      </div>
      <div className="user-login-container">
        <LoginPage />
      </div>
      <style jsx>{`
        .main {
          height: 100vh;
          background: radial-gradient(#694D78,#52435B);
          overflow: hidden;
          position: relative;
        }

        .user-login-container {
          position: relative;
          top: -1.5em;
          left: 50em;
          width: 360px;
          height: 496px;
          background: radial-gradient(#694D78,#52435B);
          opacity: 0.9;
          border-radius: 34px;
          border: 1px solid #707070;
        }

        .login-page {
          height: "496px";
          width: "360px";
          text-align: center;
        }
  
        .top-bar {
          display: flex;
          gap: 1.5em;
          align-items: center;
          padding: 2em;
          height: auto;
        }
  
        .logo {
          border-radius: 1em;
        }
  
        .title {
          font-size: "46px";
          font-weight: bold;
          color: rgba(255,255,255, 0.8)
        }

        .topbar {
          height: 4em;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1em 2em;
        }

        .login-btn {
          padding: 1em;
          width: 15em;
          cursor: pointer;
          border: none;
        }

        .login-btn:hover {
          outline: none;
          border: none;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        @media (max-width: 1000px) {
          .user-login-container {
            position: relative;
            top: 2em;
            left: 5em;
            width: 360px;
            height: auto;
            background: radial-gradient(#694D78,#52435B);
            opacity: 0.9;
            border-radius: 34px;
            border: 1px solid #707070;
            overflow: scroll;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
