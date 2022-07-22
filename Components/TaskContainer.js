import axios from 'axios';
import React,{useState,useEffect, useRef} from 'react'
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
  const [currentHabitId, setCurrentHabitId] = useState(0);
  const [selectedHabitId, setSelectedHabitId] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingFailed, setIsUpdatingFailed] = useState(false);
  const [totalDaysGoal, setTotalDaysGoal] = useState(0);

  let scrollRef = useRef(null);

  const handleScroll = (id, value) => {
    setCurrentHabitId(id);

    if(currentHabitId === id) {
      scrollRef.current ? scrollRef.current.scrollLeft += value : null;
    }
  }
  
  const handleToggleOptions = (id) => {
    setSelectedId(id);
    setIsOptions(!isOptions);
    setSelectedHabitId(1)
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

  const handleHabitStatus = (status, id) => {
    if(status === true) {
      setIsUpdating(true);
    }

    if(status === false) {
      setIsUpdatingFailed(true);
    }

    setSelectedId(id);

    // No.of Total day              10
    // No. of Total days Success    5
    // No. of Total days Failed     5


    const selectedHabit = habitList.find(val => val.id === id);
    const selectedHabitDate = selectedHabit && selectedHabit.days.find(val => val.value === selectedHabitId);
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const userDataId = JSON.parse(localStorage.getItem('user')).data_id;

    selectedHabitDate.isCompleted = status === true ? true : false;
    selectedHabitDate.isUpcoming = status === true ? false : true;
    selectedHabitDate.checked = true;

    const newData = {data : { [userDataId] : { habit : habitList }} };

    axios.put(`https://62d361ea81cb1ecafa6cb7b8.mockapi.io/api/v1/data/${userId}`, newData).then(res => {
      const parsedData = res.data.data[userDataId].habit
      setAllHabits(parsedData);
      setIsUpdating(false);
      setIsUpdatingFailed(false);
    }).catch(err => {
        console.log("error:", err);
      setIsUpdating(false);
      setIsUpdatingFailed(false);
    })
      setIsPopup(false);
    }

    const handleCheckDay = (id, value) => {
      setSelectedHabitId(value);
      setSelectedId(id);
    }

    // const getAllHabits = () => {
    //   const userDataId = JSON.parse(localStorage.getItem('user')).data_id;
    //   const userId = JSON.parse(localStorage.getItem('user')).id;

    //   axios.get(`https://62d361ea81cb1ecafa6cb7b8.mockapi.io/api/v1/data/${userId}`).then(res => {
    //     const parsedData = res.data.data[userDataId].habit
    //     setAllHabits(parsedData);
    //   }).catch(err => {
    //       console.log("error:", err);
    //   })
    // }

  useEffect(() => {
    setIsLoading(habitList ? false : true);
    // getAllHabits();
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
                      <div 
                      style={{zIndex: "2"}}
                        className={data.days.length >= 6 
                          ? ["track-habit", "track-habit-padding-lg"].join(" ") 
                          : 'track-habit-limit'} ref={data.id === currentHabitId ? scrollRef : null}>
                        {
                          data.days && data.days.map(val => (
                              <span className="progress-icon" key={val.value}>
                                {val.value == 1 ? "" : 
                                <span className={val.checked ? val.isCompleted ? "habit-done" : "habit-missed" : "habit-upcoming"}>---</span>}
                                <span 
                                onClick={() => handleCheckDay(data.id,val.value)}
                                className={["day-value", val.checked ? val.isCompleted ? "habit-done, habit-count-bg-done" : "habit-missed, habit-count-bg-missed" : "habit-upcoming"].join(" ")}>{val.value}</span>
                                {val.value == data.days.length ? "" : 
                                <span className={val.checked ? val.isCompleted ? "habit-done" : "habit-missed" : "habit-upcoming"}>---</span>}
                              </span>
                          ))
                        }
                      </div>
                          {
                            data.days.length > 10 ?
                            <div className="pagination">
                              <img  
                                className="right-scroll"
                                onClick={() => handleScroll(data.id, 60)}
                                src="/static/images/right-arrow.svg" 
                                alt="right" 
                                style={{height: "1.5em", width: "1.5em"}}
                                />
                              {
                                <img  
                                  className="left-scroll"
                                  onClick={() => handleScroll(data.id, -60)}
                                  src="/static/images/left-arrow.svg" 
                                  alt="left"
                                  style={{height: "1.5em", width: "1.5em",}}
                                />
                              }
                          </div>
                          : null
                          }
                    </div>
                  </div>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "1em"}}>
                  <div onClick={() => setSelectedId(data.id)} className="day-check">
                    <h3 className="check-text">Day-{selectedId === data.id ? selectedHabitId : 1}</h3>
                    {
                      data.id === selectedId ?
                      <div className="checkbar">
                      {
                        !isUpdating 
                        ?
                        <img 
                        src="/static/images/right.svg" 
                        alt="check" 
                        className='check-icon-1'
                        onClick={() => handleHabitStatus(true, data.id)}
                        />
                        :
                        <img 
                          src="/static/loader/new-loader.svg" 
                          alt="check" 
                          className='check-icon-1'
                          style={{width: "25px", height: "25px"}}
                        />
                      }
                      {
                        !isUpdatingFailed
                        ?
                        <img 
                        src="/static/images/wrong.svg" 
                        alt="check" 
                        className='check-icon-2' 
                        onClick={() => handleHabitStatus(false, data.id)}
                      />
                      :
                        <img 
                          src="/static/loader/new-loader.svg" 
                          alt="check" 
                          className='check-icon-1'
                          style={{width: "25px", height: "25px"}}
                        />
                      }
                    </div>
                    : null
                    }
                  </div>
                  <div 
                    style={{background: isOptions && data.id === selectedId && "rgba(255,255,255, 0.5)"}} 
                    className="task-toggle-options" onClick={() => handleToggleOptions(data.id)}>
                    <img 
                    src={isOptions && data.id === selectedId ? "/static/images/uparrow.svg" :"/static/images/downarrow.svg" }
                    onClick={() => handleToggleOptions(data.id)} alt="up" />
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
          width: 13.5em;
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
          margin-top: 1em;
        }

        .habit-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1em;
          margin-top: -1em;
          color: rgba(0,0,0,0.5);
        }

        .consistent {
          color: rgba(0,0,0,0.5);
          text-size: 12px;
          margin-top: -0.7em;
        }

        .track-habit {
          width: 32em;
          overflow-x: scroll;
          margin-top: 0.3em;  
          white-space: nowrap;
        }

        .track-habit-padding-lg {
          padding: 1em 0 0.7em 0;
        }
        
        .track-habit-limit {
          width: 32em;
          padding: 0.4em 1em 0.5em 0;
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

        .track-habit::-webkit-scrollbar-corner {
          width: 30px;
          height: 30px;
          background: rgba(0,0,0,0.5);
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
          padding: 1em 1em;
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

        .pagination {
          position: relative;
          top: -1.15em;
          right: -3.5em;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 1em;
          margin-top: -1em;
          padding: 0.5em 0;
          gap: 2em;
        }

        .right-scroll {
          padding: 0.2em;
          position: relative;
          right: -2em;
        }
        
        .left-scroll {
          transform: rotate(180deg);;
          padding: 0.2em;
        }

        .day-value {
          background: rgba(255,255,255,0.6);
          padding: 0.33em 0.55em;
          border-radius: 50%;
          color: white;
        }

        .habit-count-bg-missed {
          background-color: red;
        }

        .habit-count-bg-done {
          background-color: darkgreen;
        }


        .habit-done {
          color: darkgreen;
          font-weight: bold;
        }

        .habit-missed {
          color: red;
          font-weight: bold;
        }

        .habit-upcoming {
          color: gray;
          font-weight: bold;
          opacity: 0.7;
        }
        `
      }</style>
    </div>
  )
}
