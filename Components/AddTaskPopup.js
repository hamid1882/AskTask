import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Input from "./Input.js";

export default function AddTaskPopup({
  setIsPopup, allHabits, setAllHabits, dataId, editHabit, setEditHabit, isEdit, setIsEdit}) {
  const [habitName, setHabitName] = useState("");
  const [habitMotive, setHabitMotive] = useState("");
  const [days, setDays] = useState(21);

  const handleInputChange = (e, name) => {
    if(name === "name") { 
      setHabitName(e.target.value);
    } else if(name === "motive") {
      setHabitMotive(e.target.value);
    } else if(name === "days") {
      setDays(e.target.value);
    } 
  }

  const handleAddNewHabit = () => {
    const userId = JSON.parse(localStorage.getItem('user')).data_id;

    const habitId = allHabits.length > 0 && allHabits[0].id ? allHabits[0].id : 0;

    let dayArr = [];

    for(let i=1; i<=days; i++) {
      dayArr.push({
        value: i,
        isCompleted: false,
        isUpcoming: true,
        checked: false,
      });
    }

    const habitData = {
      name: habitName,  
      motive: habitMotive,
      days: dayArr,
      id: habitId + 1,
    }

    if(habitName.length > 0 && habitMotive.length > 0 && days !== 0) {
      
      if(isEdit === true) {
        let selectedHabit = allHabits.find(val => val.id === editHabit.id);
        selectedHabit.name = habitName;
        selectedHabit.motive = habitMotive;
        selectedHabit.days = days;
      } else {
        allHabits.unshift(habitData);
      }

      const newData = {data : { [userId] : { habit : allHabits}} };
      axios.put(`https://62d361ea81cb1ecafa6cb7b8.mockapi.io/api/v1/data/${dataId}`, newData).then(res => {
        const parsedData = res.data.data[userId];
        // setAllHabits(parsedData);
        
    }).catch(err => {
        console.log("error:", err);
    })
      setIsPopup(false);
    } else {
      alert("Please make sure you have added all the data in all the fields");
    }

    localStorage.setItem("allHabits", JSON.stringify(allHabits));
    }


    useEffect(() => {
      if(isEdit === true) {
        setHabitName(editHabit.name);
        setHabitMotive(editHabit.motive);
        setStartDate(editHabit.start_date);
        setEndDate(editHabit.end_date);
      }
    }, []);


  return (
    <div className="container">
      <div className="popup-container">
        <img 
          src="/static/images/cross.svg" 
          alt="cross" 
          className="cancel-icon" 
          onClick={() => setIsPopup(false)}
        />
        <h2 className="title">Create A New Habit</h2>
        <div className="input-bar">
          <Input 
            title = {"Habit Name"}
            type = {"text"}
            value = {habitName}
            name = {"name"}
            handleInputChange = {handleInputChange}
            placeholder = {"Enter your Habit name"}
            theme={"dark"}
          />
        </div>
        <div className="input-bar">
          <Input 
            title = {"Motive of the Habit"}
            type = {"text"}
            value = {habitMotive}
            name = {"motive"}
            handleInputChange = {handleInputChange}
            placeholder = {"Enter your Habit Motive"}
            theme={"dark"}
          />
        </div>
        <div className="date-input-section">
          <div className="small-title">Select Goal</div>
          <input 
            type="number" 
            className='date-picker'
            onChange={(e) => handleInputChange(e, "days")} 
            value={days}
            />
        </div>
        {/* <div className="date-input-section">
          <div className="small-title">Set up a Goal</div>
          <input 
            type="date" 
            className='date-picker'
            onChange={(e) => handleInputChange(e, "endDate")} 
            value={endDate}
          />
        </div> */}
        <button 
          className="btn-dark"
          onClick={handleAddNewHabit}
          >Create Now</button>
      </div>
      <style jsx>
        {
          `

          input[type="time"]::-webkit-calendar-picker-indicator {
            background: none;
            display: none;
          }

          .date-picker {
            background-color: #C9B8D3;
            border: 1px solid #707070;
            color: rgba(0,0,0,0.5);
            height: 2em;
            padding: 0.2em 0.5em;
          }

          .date-picker:focus {
            border: 1px solid #707070;
            outline: none;
          }

          .container {
            position: absolute;
            width: 100%;
            margin: -1em 1em;
            height: 612px;
            background: rgba(0,0,0, 0.4);
            border-radius: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
          }

          .popup-container {
            width: 360px;
            height: 500px;
            background-color: #EFDEF9;
            border-radius: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1em;
          }

          .cancel-icon {
            width: 2.5em;
            height: 2.5em;
            background-color: #A486B5;
            border-radius: 50%;
            position: relative;
            top: -1.8em;
            right: -12.2em;
            cursor: pointer;
          }

          .title {
            color: #52435B
          }

          .small-title {
            color: rgba(0, 0, 0, 0.5);
            font-family: sans-serif;
            letter-spacing: 0.1em;
            font-size: 14px;
            font-weight: bold;
            width: 9em;
            // border-bottom: 1px solid rgba(0,0,0,0.2);
            padding: 0.5em;
          }

          .input-bar {
            width: 100%;
            margin: 1.5em auto;
          }

          .date-input-section {
            width: 100%;
            margin: 1.5em 1.5em;
            display: flex;
            gap: 0.5em;
            justify-content: space-between;
            align-items: center;
            padding: 0.5em;
            margin-bottom: -1em;
          }

          .btn-dark {
            color: rgba(255, 255, 255, 0.8);
            background-color: #564560;
            padding: 0.8em;
            border-radius: 3em;
            border: 1px solid #564560;
            margin-top: 3em;
            position: relative;
            left: 10em;
            cursor: pointer;
          }
          `
        }
      </style>
    </div>
  )
}

