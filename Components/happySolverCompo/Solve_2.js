import React from 'react'
import Input from '../Input'

export default function Solve_2({page, handleNextPage}) {
  return (
    <div className={page === 6 ? 'happy-container-inner-1-active' : 'happy-container-inner-1'}>
        <h2>Happy Solver</h2>
        <img style={{width: "7em", height: "7em"}} src="/static/animation/happy.svg" alt="dfd" />
        <h4>How exactly this could work?</h4>
        <Input value="Hello" title="Problem" theme="dark"/>
        <div className="login-bar">
            <button className="button" style={{textAlign: "center"}} onClick={() => handleNextPage("solution-2", 7)}>Next</button>
        </div>
        <style jsx>{`
        .happy-container {
          width: 100%;
          height: 580px;
          background: #C9B8D3;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
          position: relative;
          padding: 0.7em;
          margin: 0 1em;
        }

        .happy-container-inner {
          width: 100%;
          height: 580px;
          background: #C9B8D3;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
        }

        .happy-container-inner-off {
          width: 100%;
          height: 580px;
          background: #C9B8D3;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
        }

        .happy-container-inner-1 {
          width: 100%;
          height: 580px;
          background: #C9B8D3;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
          position: absolute;
          right: -1000em;
          transition: all 0.5s;
        }

        .happy-container-inner-1-active {
          width: 100%;
          height: 580px;
          background: #C9B8D3;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
          position: absolute;
          right: 0;
          transition: all 0.5s;
        }

        .login-bar {
          margin: 2.5em 1em;
        }
        
        .button {
          background-color: #fff;
          border: none;
          color: black;
          padding: 0.7em;
          text-align: center;
          text-decoration: none;
          display: flex;
          justify-content: center;
          margin: 1.5em auto;
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
        }`}</style>
    </div>

  )
}
