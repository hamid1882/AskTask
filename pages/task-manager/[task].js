import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function TaskDetailsPage() {
  const router = useRouter()
  const { task } = router.query;

  const newTaskEntry = [];

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("all_tasks"));
    const filteredData = savedData.find((val) => val.name === task.replace(/-/, " "));
    setTaskData(filteredData)
  }, []);

  return (
    <div className='task-details-container'>
      <div className='task-details-card'>
        <h2>{task && task.toUpperCase().replace(/-/g, " ")}</h2>
        <div>
          <h3>To-do List</h3>
          {
            taskData.todo ? taskData.todo.map((val, idx) => (
              <div key={val.id} className="task-list">
                <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                  <p>{val.id}</p>
                  <h4>{val.name.toUpperCase()}</h4>
                </div>
                <input type="checkbox" checked={val.isCompleted} />
              </div>
            ))
              : <h4>No To-do's Added</h4>
          }
        </div>
      </div>
      <style jsx>{
        `
      .task-details-container{
        height: calc(100vh - 2em);
        width: 100%;
        background-color: #000;
      }

      .task-details-card {
        margin: 0 auto;
        width: 60em;
        height: 40em;
        background-color: #cca;
        padding: 1em 3em;
      }

      .task-list {
        height: 2em;
        background-color: #fff;
        margin: 2em 0em;
        border-radius: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1em 2em;
        cursor: pointer;
        position: relative;
        font-family: monospace;

      }
      `
      }</style>
    </div>
  )
}
