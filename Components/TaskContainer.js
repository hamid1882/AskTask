import React from 'react'

export default function TaskContainer() {
  return (
    <div className="task-container">
        <h3 className="qoute">Your Habits will determine your future</h3>
        <img src="/static/images/plus.svg" alt="add" className="add-icon" />
        <p className="create-text">Create now</p>

        <style jsx>{
        `
        .task-container {
          width: 100%;
          margin: 0em 1em;
          height: 610px;
          background: #C9B8D3;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
        }

        .qoute {
          margin-top: 4em;
          font-size: 2.5em;
          font-weight: light;
          color: #55445F
        }

        .add-icon {
          background-color: #fff;
          padding: 0.6em;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .create-text {
          color: #55445F;
          margin-top: 1.5em;
        }
        `
      }</style>
    </div>
  )
}
