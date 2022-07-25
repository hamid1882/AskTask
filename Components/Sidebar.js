import React,{useEffect} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";

export default function Sidebar() {
  const router = useRouter();
  
  return (
    <div className="side-bar">
        <Link href={"./home"}>
          <a className={["task-tab-container", router.asPath === "/home" ? "task-tab-active" : null].join(" ")}>
            <img src="/static/images/habit.svg" alt="icon" className='task-icon'/>
            <h4 className="task-title">Habit Tracker</h4>
          </a>
        </Link>
        <Link href={"./happy-solver"}>
          <a className={["task-tab-container", router.asPath === "/happy-solver" ? "task-tab-active" : null].join(" ")}>
            <img src="/static/images/solve.svg" alt="icon" className='task-icon'/>
            <h4 className="task-title">Happy Solver</h4>
          </a>
        </Link>
        <div className={["task-tab-container", "task-tab-bg"].join(" ")}>
          <img src="/static/images/time.svg" alt="icon" className='task-icon'/>
          <h4 className="task-title">Schedule</h4>
        </div>
        <div className={["task-tab-container", "task-tab-bg"].join(" ")}>
          <img src="/static/images/textly.svg" alt="icon" className='task-icon'/>
          <h4 className="task-title">Textly</h4>
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

        .side-bar {
          width: 150px;
          height: 610px;
          background-color: #C9B8D3;
          margin-left: 1em;
          border-radius: 30px;
          padding-top: 0.1em;
          padding-right: 0.8em;
          padding-left: 0.8em;
        }

        .task-tab-container {
          width: 140px;
          height: 120px;
          border-radius: 30px;
          margin: 1em auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #8C729B;
          cursor: pointer;
          text-decoration: none;
          color: rgba(0,0,0,0.7);
        }

        .task-tab-bg {
          background-color: #C9B8D3;
        }
        
        .task-tab-active {
          background-color: #fff;
        }

        .task-icon {
          height: 2em;
          width: 2em;
          margin-top: 1em;
          margin-bottom: -0.4em;
        }

        `
      }</style>
    </div>
  )
}
