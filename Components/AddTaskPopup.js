import React from 'react';
import Input from "./Input.js";

export default function AddTaskPopup() {
  return (
    <div className="container">
      <div className="popup-container">
        <img src="/static/images/cross.svg" alt="cross" className="cancel-icon" />
        <h2>Create A New Habit</h2>
        <Input 
          title = {"Habit Name"}
          type = {"text"}
          value = {""}
          name = {""}
          handleInputChange = {() => {}}
          placeholder = {"Enter your habit name"}
        />
        <input type="text" placeholder="Motive of the Habit" />
        <div>
          <p>When you start</p>
          <input type="date" />
          <p>12:00</p>
        </div>
      </div>
      <style jsx>
        {
          `
          .container {
            position: absolute;
            width: 100%;
            margin: 0em 1em;
            height: 610px;
            background: rgba(201, 184, 211, 0.4);
            border-radius: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .popup-container {
            width: 360px;
            height: 500px;
            background-color: #EFDEF9;
            border-radius: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .cancel-icon {
            width: 2.5em;
            height: 2.5em;
            background-color: #A486B5;
            border-radius: 50%;
            position: relative;
            top: -0.7em;
            right: -11em;
            cursor: pointer;
          }
          `
        }
      </style>
    </div>
  )
}

