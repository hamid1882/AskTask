import React,{useState,useEffect} from 'react'
import AddTaskPopup from './AddTaskPopup'
import OptionsBar from './OptionsBar';

export default function TaskContainer({habitList}) {
  const [isPopup, setIsPopup] = useState(false);
  const [allHabits, setAllHabits] = useState([]);
  const [isOptions, setIsOptions] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleToggleOptions = (id) => {
    setSelectedId(id);
    setIsOptions(!isOptions);
  }

  const handlePopupOpen = () => {
    setIsPopup(true);
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
        onClick={() => setIsPopup(true)} 
        className="add-floating-icon" 
      />
      : null
      }
      <div className={allHabits &&  allHabits.length > 5 ? "task-bar-big"  :"task-bar"}>

      {
        isLoading ? <img src="/static/loader/new-mini-loader.svg" alt="loading" style={{width: "10em", height: "10em"}} /> : null
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
                  <OptionsBar />
                : null
                }
                <div style={{display: "flex", alignItems: "center", gap: "1em"}}>
                  <p style={{background: "rgba(255,255,255,0.4)",borderRadius: "50%",padding: "14px 18px", }}>{idx + 1 }</p>
                  <h1 className="task-title">{data.name.toUpperCase()}</h1>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "1em"}}>
                  <div className="input-bar">
                    <input type="checkbox" className="checkbox" />
                    <text style={{color: "rgba(0,0,0,0.6)"}}>Completed</text>
                  </div>
                  <div className="input-bar">
                    <input type="checkbox" className="checkbox" />
                    <text style={{color: "rgba(0,0,0,0.6)"}}>Not Completed</text>
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
          overflow-x: hidden;
          border-top-left-radius: 30px;
          border-bottom-left-radius: 30px;
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
          width: 97.5%;
          height: 5em;
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
