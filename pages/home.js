import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import all_tasks from '../Data/all_tasks';


export default function Home() {
  const [taskData, setTaskData] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handlePopup = (name) => {
    if(name === "open") {
      setIsPopup(true)
    } else {
      setIsPopup(false)
    }
  }

  const handleNewTask = () => {
    const newTaskEntry = {
      id: taskData && taskData[taskData.length - 1].id + 1,
      name: newTask,
      status: {
        started: false,
        completed: false,
      },
      todo: {
        id: taskData && taskData[taskData.length - 1].todo.id + 1,
        name: "Not-yet",
        isCompleted: false
      }
    };

    taskData.unshift(newTaskEntry);
    setIsPopup(false);
  }

  useEffect(() => {
    setTaskData(all_tasks)
  }, [])

  return (
    <div>
      <Head>
        <title>Task Manager - Home</title>
      </Head>
      {
        isPopup ?
        <div className="add-task-popup">
        <div className="task-popup-container">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/High-contrast-dialog-close.svg/640px-High-contrast-dialog-close.svg.png" 
            alt="Close popup"
            className='close-icon'
            onClick={() => handlePopup("close")}
          />
          <div className="add-task-bar">
            <input 
              className='input' 
              type="text" 
              placeholder="Task Title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="btn btn-start" onClick={handleNewTask}>Add new Task</button>
          </div>
        </div>
      </div>
      :null
      }
      <div className="home">
        <div className="task-container">
          <h3>Current Tasks</h3>
          {
            taskData && taskData.map((data, idx) => (
            <div key={data.id} className="task-list">
              <div className="task-flex">
                <input type="checkbox" className="checkbox" />
                <div className="tast-bar">
                  <h3 className="task-title">{data.name}</h3>
                  <span>Todo: Remaining:5, Completed:5</span>
                </div>
              </div>
              <div className="task-flex">
                <button className="btn btn-start">Start</button>
                <button className="btn btn-completed">Completed</button>
                <button className="btn btn-freeze">Freeze</button>
              </div>
            </div>
            ))
          }
          <button className="new-task-btn" onClick={() => handlePopup("open")}>
            New Task
          </button>
        </div>
      </div>
      <style jsx>{
        `
        .home{
          background-color: #ccf;
          height: 100vh;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .task-container {
          background-color: #cfc;
          height: 80%;
          width: 70%;
          padding: 1em 3em;
        }

        .task-list {
          height: 5em;
          background-color: #fff;
          margin: 1em 0em;
          border-radius: 1em;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0em 2em;
          cursor: pointer;
        }

        .task-flex {
          display: flex;
          align-items: center;
          gap: 1em;
          font-family: monospace;
        }

        .task-title {
          margin-bottom: 0.3em;
          margin-top: -0.2em;
        }

        .checkbox {
          padding: 1em;
          width: 2em;
          height: 2em;
          cursor: pointer;
        }

        .checkbox:hoveer {
          border: 1px solid #ccf
        }

        .btn {
          padding: 0.7em 1.5em;
          border-radius: 0.5em;
          border: none;
          cursor: pointer;
        }

        .btn-start {
          background-color: lightgreen;
        }

        .btn-completed {
          background-color: yellow;
        }

        .new-task-btn {
          height: 5em;
          width: 6em;
          padding: 0.3em;
          border-radius: 2em;
          position: absolute;
          bottom: 10em;
          right: 55em;
          border: 2px solid #ccf;
          box-shadow: 1px 2px 1px 2px 5px #ccf;
          cursor: pointer;
        }

        .add-task-popup {
          height: 100%;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          position: absolute;
          margin: 0 auto;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .task-popup-container {
          width: 55%;
          height: 75%;
          background-color: #fff;
          display: grid;
          place-items: center;
        }

        .close-icon {
          width: 3em;
          height: 3em;
          position: absolute;
          top: 7em;
          right: 22em;
          cursor: pointer;
        }

        .add-task-bar {
          border: 1px solid black;
          height: 50%;
          width: 50%;
          display: grid;
          justify-content: center;
          align-items: center;
        }

        .input {
          width: 100%;
          border: 1px solid #ccc;
          padding: 0.5em;
          font-style: Roboto;
          border-radius: 0.4em;
        }
  
        .input:focus {
          outline: none;
          border: 2px solid #ccf;
        }
        `
      }</style>
      </div>
  )
}
