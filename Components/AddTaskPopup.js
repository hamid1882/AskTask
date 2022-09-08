import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Input from "./Input.js";
import { weekDays } from './weekDays.js';

export default function AddTaskPopup({
  setIsPopup, allHabits, setAllHabits, dataId, editHabit, setEditHabit, isEdit, setIsEdit, setSelectedHabitDay, setIsHovered }) {
  const [habitName, setHabitName] = useState("");
  const [habitMotive, setHabitMotive] = useState("");
  const [days, setDays] = useState(21);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const handleInputChange = (e, name) => {
    if (name === "name" && e.target.value.length <= 35) {
      setHabitName(e.target.value);
    } else if (name === "motive") {
      setHabitMotive(e.target.value);
    } else if (name === "days") {
      setDays(e.target.value);
    } else {
      alert("Minimum value must be between 1 - 35 characters")
    }
  }

  const handleEditHabit = (name) => {

    if (name === "repeat") {
      setIsRepeating(true);
      const selectedHabit = allHabits.find(val => val.id === editHabit.id);

      let dayArr = [];

      let scroll = [];

      const getGoalDate = (initializer) => {

        let date = new Date();

        return new Date(date.setDate(date.getDate() + initializer));

      }

      for (let i = 1; i <= days; i++) {
        dayArr.push({
          value: i,
          isCompleted: false,
          isUpcoming: true,
          checked: false,
          scroll: i >= 6 ? 60 * 1 : 0,
          goalDate: getGoalDate(i - 1),
        });
      }

      selectedHabit.name = habitName;
      selectedHabit.motive = habitMotive;
      selectedHabit.days = dayArr;
      selectedHabit.scroll = scroll;
      selectedHabit.taskCompleted = false;
      selectedHabit.totalDays = days;

      const userId = JSON.parse(localStorage.getItem('user')).data_id;
      const id = JSON.parse(localStorage.getItem('user')).id;


      const newData = { data: { [userId]: { habit: allHabits } } };

      axios.put(process.env.NEXT_PUBLIC_URL + "/data/" + id, newData).then(res => {
        console.log(allHabits)
        setAllHabits(res.data.data[userId].habit);
        setIsRepeating(false)
        alert("Updated successfully");
        setIsPopup(false);
        setSelectedHabitDay(1);
      }).catch(err => {
        console.log(err.message)
        setIsRepeating(false)
        alert("Something went wrong");
      })
    } else {
      setIsUpdating(true);
      const selectedHabit = allHabits.find(val => val.id === editHabit.id);
      selectedHabit.name = habitName;
      selectedHabit.motive = habitMotive;

      const userId = JSON.parse(localStorage.getItem('user')).data_id;
      const id = JSON.parse(localStorage.getItem('user')).id;

      const newData = { data: { [userId]: { habit: allHabits } } };

      axios.put(process.env.NEXT_PUBLIC_URL + "/data/" + id, newData).then(res => {
        // setAllHabits(res.data.data[userId].habit);
        setIsUpdating(false)
        alert("Updated successfully");
        setIsPopup(false);
      }).catch(err => {
        console.log(err.message)
        setIsUpdating(false)
        alert("Something went wrong");
      })
    }
  }

  const handleAddNewHabit = () => {
    const userId = JSON.parse(localStorage.getItem('user')).data_id;
    const id = JSON.parse(localStorage.getItem('user')).id;
    setIsHovered(false);

    const habitId = allHabits.length > 0 && allHabits[0].id ? allHabits[0].id : 0;

    let dayArr = [];

    let scroll = [];

    const getGoalDate = (initializer) => {

      let date = new Date();

      return new Date(date.setDate(date.getDate() + initializer));

    }

    for (let i = 1; i <= days; i++) {
      dayArr.push({
        value: i,
        isCompleted: false,
        isUpcoming: true,
        checked: false,
        scroll: i >= 6 ? 60 * 1 : 0,
        goalDate: getGoalDate(i - 1),
      });
    }

    const habitData = {
      name: habitName,
      motive: habitMotive,
      days: dayArr,
      id: habitId + 1,
      totalDays: days,
      scroll: scroll,
      taskCompleted: false,
      dateCreated: new Date(),
    }

    if (habitName.length > 0 && habitMotive.length > 0 && days !== 0) {

      if (isEdit === true) {
        let selectedHabit = allHabits.find(val => val.id === editHabit.id);
        selectedHabit.name = habitName;
        selectedHabit.motive = habitMotive;
        selectedHabit.days = days;
      } else {
        allHabits.unshift(habitData);
      }

      const newData = { data: { [userId]: { habit: allHabits } } };

      axios.put(process.env.NEXT_PUBLIC_URL + "/data/" + id, newData).then(res => {
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
    if (isEdit === true) {
      setHabitName(editHabit.name);
      setHabitMotive(editHabit.motive);
      setDays(editHabit.totalDays);
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
        <h2 className="title">{isEdit ? "Habit Details" : "Create A New Habit"}</h2>
        <div className="input-bar">
          <Input
            title={"Habit Name"}
            type={"text"}
            value={habitName}
            name={"name"}
            handleInputChange={handleInputChange}
            placeholder={"Enter your Habit name"}
            theme={"dark"}
          />
        </div>
        <div className="input-bar">
          <Input
            title={"Motive of the Habit"}
            type={"text"}
            value={habitMotive}
            name={"motive"}
            handleInputChange={handleInputChange}
            placeholder={"Enter your Habit Motive"}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: "0.7em" }}>
          {/* {isEdit ?
            <button 
              disabled={isEdit}
              className={isEdit ? "btn-dark-disabled" :"btn-dark"}
              onClick={handleAddNewHabit}
              >Repeat
            </button>
            : null} */}
          {
            !isEdit
              ?
              <button
                className={"btn-dark"}
                onClick={handleAddNewHabit}
              >Create Now
              </button>
              :
              <div className="date-input-section">
                <button
                  className={!isRepeating ? "btn-dark" : "btn-dark-img"}
                  onClick={() => handleEditHabit("repeat")}
                >
                  {!isRepeating
                    ? "Start as new"
                    : <img style={{ width: '4em', height: '2em', }} src="/static/loader/button-loader.svg" />
                  }
                </button>
                <button
                  className={!isUpdating ? "btn-dark" : "btn-dark-img"}
                  onClick={handleEditHabit}
                >
                  {!isUpdating
                    ? "Update"
                    : <img style={{ width: '4em', height: '2em', }} src="/static/loader/button-loader.svg" />
                  }
                </button>
              </div>
          }
        </div>
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
            left: 7em;
            cursor: pointer;
          }
          
          .btn-dark-img {
            background-color: transparent;
            margin-top: 3em;
            position: relative;
            left: 7em;
            cursor: pointer;
            border: none;
          }

          .btn-dark-disabled {
            color: rgba(0, 0, 0, 0.5);
            background-color: coffe;
            padding: 0.8em;
            border-radius: 3em;
            margin-top: 3em;
            position: relative;
            left: 6em;
            cursor: not-allowed;
          }
          `
        }
      </style>
    </div>
  )
}

