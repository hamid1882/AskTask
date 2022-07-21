import axios from 'axios';
import React,{useState,useEffect} from 'react'
import AddTaskPopup from './AddTaskPopup'
import OptionsBar from './OptionsBar';

export default function TaskContainer({habitList, dataId, setUserData}) {
  const [isPopup, setIsPopup] = useState(false);
  const [allHabits, setAllHabits] = useState([]);
  const [isOptions, setIsOptions] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [editHabit, setEditHabit] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  
  const handleToggleOptions = (id) => {
    setSelectedId(id);
    setIsOptions(!isOptions);
  }

  const handlePopupOpen = () => {
    setIsPopup(true);
    setIsEdit(false);
  }

  const handleEdit = (id) => {
    const newHabitList =  habitList.find(val => val.id === id);
    setEditHabit(newHabitList);
    setIsPopup(true);
    setIsOptions(false);
    setIsEdit(true);
  }

  const handleDelete = (id) => {
    const newHabitList =  habitList.filter(val => val.id !== id);
    const userId = JSON.parse(localStorage.getItem('user')).data_id;
    
    const newData = {data : { [userId] : { habit : newHabitList}} }
    
    setIsDeleteLoading(true);
    axios.put(`https://62d361ea81cb1ecafa6cb7b8.mockapi.io/api/v1/data/${dataId}`, newData).then(res => {
      setUserData(res.data.data[userId]);
      setIsDeleteLoading(false);
      setIsOptions(false);
    }).catch(err => {
      alert("Not Able to delete, check console for more info");
      console.log("error:", err);
      setIsDeleteLoading(false)
    })
  }

  useEffect(() => {
    setIsLoading(habitList ? false : true);
    setAllHabits(habitList);
  }, [habitList])



  return (
    <div className="task-container">
      { allHabits && allHabits.length > 0
      ? <img 
        src="/static/images/plus.svg" 
        alt="add" 
        onClick={handlePopupOpen} 
        className="add-floating-icon" 
      />
      : null
      }
      <div className={allHabits &&  allHabits.length > 4 ? "task-bar-big"  :"task-bar"}>

      {
        isLoading ? 
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
          <img 
          src="/static/loader/new-loader.svg" 
          alt="loading" 
          style={{width: "10em", height: "10em"}}
        />
        </div> : null
      }
    {
      allHabits && allHabits.length < 1
          ? <div  className="task-container-inner">
              <h3 className="qoute">Your Habits will determine your future</h3>
              <img src="/static/images/plus.svg" alt="add" onClick={handlePopupOpen} className="add-icon" />
              <p className="create-text">Create now</p>
            </div>  
          :
          allHabits && allHabits.map((data, idx) => (
              <div key={data.id} className="task-item">
                { isOptions && selectedId === data.id ?
                  <OptionsBar 
                    id={data.id} 
                    handleDelete={handleDelete} 
                    isDeleteLoading={isDeleteLoading} 
                    handleEdit={handleEdit}
                  />
                : null
                }
                <div style={{display: "flex", alignItems: "center", gap: "1em"}}>
                  <p style={{background: "rgba(255,255,255,0.4)",borderRadius: "50%",padding: "14px 18px", }}>{idx + 1 }</p>
                  <div>
                    <h1 className="task-title">{data.name.toUpperCase()}</h1>
                    <div className="habit-progress">
                      <p className="consistent">Consistency:</p>
                      <div className="track-habit">
                        {
                          data.days && data.days.map(val => (
                            <span>{val == 1 ? "" : "---"}({val}){val == data.days.length ? "" : "---"}</span>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "1em"}}>
                  <div className="day-check">
                    <h3 className="check-text">Day-1</h3>
                    <div className="checkbar">
                      <img src="/static/images/right.svg" alt="check" className='check-icon-1'/>
                      <img src="/static/images/wrong.svg" alt="check" className='check-icon-2' />
                    </div>
                  </div>
                  <div style={{background: isOptions && data.id === selectedId && "rgba(255,255,255, 0.5)"}} className="task-toggle-options" onClick={() => handleToggleOptions(data.id)}>
                    <img src={isOptions && data.id === selectedId ? "/static/images/uparrow.svg" :"/static/images/downarrow.svg" } onClick={() => handleToggleOptions(data.id)} alt="up" />
                  </div>
                </div>
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
            dataId={dataId} 
            editHabit={editHabit}
            setEditHabit={setEditHabit}
            isEdit={isEdit}
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
          z-index: 2;
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

        .day-check {
          width: 12em;
          height: 1.5em;
          padding: 1.5em 1em;
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 30px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 1.4em;
        }
        
        .checkbar {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 1.5em;
          width: 4em;
          border-radius: 30px;
          background-color: #92618E;
          padding: 0.4em 0.8em;
          gap: 0.5em;
        }

        .check-text {
          color: rgba(0,0,0,0.5);
          letter-spacing: 0.1em;
          font-family: monospace;
          font-size: 18px;
        }

        .check-icon-1 {
          width: 1.7em;
          height: 1.8em;
        }

        .check-icon-1:hover {
          width: 2.3em;
          height: 2.3em;
          transition: all 0.2s ease-in-out;
        }
        
        .check-icon-2 {
          width: 2em;
          height: 2em;
        }
        
        .check-icon-2:hover {
          width: 2.3em;
          height: 2.3em;
          transition: all 0.2s ease-in-out;
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
          padding: 2.2em 1em;
          display: flex;
          flex-direction: column;
          gap: 1em;
          border-top-left-radius: 30px;
          border-bottom-left-radius: 30px;
          overflow-y: scroll;
        }

        .task-bar-big::-webkit-scrollbar {
          width: 10px;
        }

        .task-title {
          font-family: sans-serif;
          font-size: 20px;
          color: rgba(0,0,0,0.5);
          letter-spacing: 0.1em;
        }

        .habit-progress {
          display: flex;
          align-items: center;
          gap: 1em;
          margin-top: -1em;
          color: rgba(0,0,0,0.5);
        }

        .consistent {
          color: rgba(0,0,0,0.5);
        }

        .track-habit {
          width: 30em;
          padding: 0 0 0.5em 0;
          overflow-x: scroll;
          margin-top: 0.6em;  
          white-space: nowrap;
        }

        .track-habit::-webkit-scrollbar {
          width: 5px;
          height: 4px;
          background:rgba(255,255,255,0.7);
        }
        
        /* Track */
        .track-habit::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.7);
          height: 0.1em;
          width: 5px;
          border-radius: 30px;
        }

        .track-habit::-webkit-scrollbar-track-piece {
          background: #A486B5;
          
        }
        
        .track-habit::-webkit-scrollbar-thumb {
          background-color: #55445F;
          width: 5px;
          height: 0.1em;
          border-radius: 30px;
        }

        .track-habit::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        /* Track */
        .task-bar-big::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.7);
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
          width: 96%;
          height: 6em;
          background-color: #C9B8D3;
          border-radius: 30px;
          padding: 0.5em 1em;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          cursor: pointer;
          position: relative;
        }

        .input-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .checkbox {
          padding: 1em;
          width: 2em;
          height: 2em;
          cursor: pointer;
          border: none;
          background-color: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.5);
        }

        .checkbox:hover {
          border: 1px solid #ccf
        }

        .task-toggle-options {
          position: relative;
          top: -2em;
          right: 1em;
          margin: 0 1em;
          padding: 0.1em 1em; 
          background: rgba(164, 134, 181, 0.3); 
          border-radius:1em;
        }
        `
      }</style>
    </div>
  )
}
