import React,{useState} from 'react'
import AddTaskPopup from './AddTaskPopup'

export default function TaskContainer() {
  const [isPopup, setIsPopup] = useState(false);
  const [allHabits, setAllHabits] = useState([]);

  return (
    <div className="task-container">
      { allHabits.length > 0
      ? <img 
        src="/static/images/plus.svg" 
        alt="add" 
        onClick={() => setIsPopup(true)} 
        className="add-floating-icon" 
      />
      : null
      }
      <div className={allHabits.length > 5 ? "task-bar-big"  :"task-bar"}>
    {
      allHabits && allHabits.length < 1
          ? <div className="task-container-inner">
              <h3 className="qoute">Your Habits will determine your future</h3>
              <img src="/static/images/plus.svg" alt="add" onClick={() => setIsPopup(true)} className="add-icon" />
              <p className="create-text">Create now</p>
            </div>  
          :
          allHabits && allHabits.map((data, idx) => (
              <div className="task-item">
                <p style={{background: "#fff"}}>{idx + 1 }</p>
                <h1>Data rendered</h1>
              </div>
          ))
        }
        </div>
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
          height: 580px;
          background: #C9B8D3;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
          position: relative;
          padding: 1em;
          margin: 0 1em;
        }

        .task-container-inner {
          width: 100%;
          height: 580px;
          background: #C9B8D3;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
          position: relative;
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
          height: 95%;
          border-radius: 30px;
          background-color: #A486B5;
          padding: 1em;
          display: flex;
          flex-direction: column;
          gap: 1em;
        }

        .task-bar-big {
          width: 97%;
          height: 95%;
          background-color: #A486B5;
          padding: 1em;
          display: flex;
          flex-direction: column;
          gap: 1em;
          overflow-y: scroll;
          border-top-left-radius: 30px;
          border-bottom-left-radius: 30px;
        }

        .task-bar-big::-webkit-scrollbar {
          width: 10px;
          
        }
        
        /* Track */
        .task-bar-big::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 50%;
        }
        
        /* Handle */
        .task-bar-big::-webkit-scrollbar-thumb {
          background-color: #55445F;
          height: 5em;
        }
        
        /* Handle on hover */
        .task-bar-big::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .task-item {
          width: 98.5%;
          background-color: #C9B8D3;
          border-radius: 30px;
          padding: 0.5em
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        `
      }</style>
    </div>
  )
}
