import React,{useState} from 'react'
import AddTaskPopup from './AddTaskPopup'

export default function TaskContainer() {
  const [isPopup, setIsPopup] = useState(false);
  const [allHabits, setAllHabits] = useState([]);

  return (
    <div className="task-container">
      <img src="/static/images/plus.svg" alt="add" onClick={() => setIsPopup(true)} className="add-floating-icon" />
    {
      allHabits && allHabits.length < 1
          ? <div className="task-container">
              <h3 className="qoute">Your Habits will determine your future</h3>
              <img src="/static/images/plus.svg" alt="add" onClick={() => setIsPopup(true)} className="add-icon" />
              <p className="create-text">Create now</p>
            </div>  
          :
          allHabits && allHabits.map((data, idx) => (
            <div className="task-bar">
              <div className="task-item">
                <h1>Data rendered</h1>
              </div>
            </div>
          ))
        }
        {
          isPopup ?
            <AddTaskPopup
            setIsPopup={setIsPopup}
            setAllHabits={setAllHabits}
            allHabits={allHabits}
            />
            : null
      }
        <style jsx>{
        `
        .task-container {
          width: 100%;
          margin: 0em 1em;
          height: 580px;
          background: #C9B8D3;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
          position: relative;
          padding: 1em;
        }

        .add-floating-icon {
          position: absolute;
          bottom: 2em;
          right:2em;
          background-color: #fff;
          padding: 0.6em;
          border-radius: 50%;
          cursor: pointer;
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

        .task-bar {
          width: 97%;
          height: 100%;
          border-radius: 30px;
          background-color: #A486B5;
          padding: 1em;
        }

        .task-item {
          width: 98.5%;
          background-color: #C9B8D3;
          border-radius: 30px;
          padding: 0.5em
        }
        `
      }</style>
    </div>
  )
}
