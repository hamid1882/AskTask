import React, {useState} from 'react';
import Input from "./Input.js";

export default function AddTaskPopup({setIsPopup, allHabits, setAllHabits}) {
  const [habitName, setHabitName] = useState("");
  const [habitMotive, setHabitMotive] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleInputChange = (e, name) => {
    if(name === "name") { 
      setHabitName(e.target.value);
    } else if(name === "motive") {
      setHabitMotive(e.target.value);
    } else if(name === "startDate") {
      setStartDate(e.target.value);
    } else if(name === "endDate") {
      setEndDate(e.target.value);
    }
  }

  const handleAddNewHabit = () => {
    const habitData = {
      name: habitName,
      motive: habitMotive,
      start_date: startDate,
      end_date: endDate,
      id: allHabits.length + 1,
    }

    if(habitName.length > 0 && habitMotive.length > 0 && startDate.length > 0 && endDate.length > 0) {
      allHabits.unshift(habitData);
      setIsPopup(false);
    } else {
      alert("Please make sure you have added all the data in all the fields");
    }

  }

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
          <div className="small-title">When you start</div>
          <input 
            type="date" 
            className='date-picker'
            onChange={(e) => handleInputChange(e, "startDate")} 
            value={startDate}
            />
          {/* <input type="time" className="date-picker" /> */}
        </div>
        <div className="date-input-section">
          <div className="small-title">Set up a Goal</div>
          <input 
            type="date" 
            className='date-picker'
            onChange={(e) => handleInputChange(e, "endDate")} 
            value={endDate}
          />
          {/* <input type="time" className="date-picker" /> */}
        </div>
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

