import React from 'react'

export default function Input({
  title = "",
  type = "",
  value = "",
  name = "",
  handleInputChange = () => {},
  placeholder = "",
  isViewPassword = undefined, 
  togglePassword = () => {},
  theme = "",
})


{
  return (
    <div className="input-bar">
      {
        value.length > 0 &&
        <p className={theme === "dark" ? 'input-title-dark' : 'input-title'}>{title}</p>
      }
      <input 
        type={isViewPassword ? "password" : type} 
        className={theme === 'dark' ? "input-dark" : "input" }
        onChange={(e) => handleInputChange(e, name)} 
        value={value}
        placeholder={placeholder}
      />
      {
        isViewPassword !== undefined
        ? <p className="show-psk" onClick={() => togglePassword(!isViewPassword)}>👁</p>
        : null
      }
    <style jsx>
      {
        `
        .input-bar {
          text-align: left;
          color: #fff;
          margin-bottom: -2em;
        }
  
        .input-title {
          text-align: left;
          margin-bottom: 5px;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.5);
        }

        .input-title-dark {
          text-align: left;
          margin-bottom: 5px;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(0, 0, 0, 0.5);
        }
  
        .input {
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          outline: none;
          shadow: none;
          padding: 0.5em 0;
          font-style: Roboto;
          background: transparent;
          color: #fff;
        }

        .input-dark {
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(112, 112, 112, 0.4);
          outline: none;
          shadow: none;
          padding: 0.5em 0;
          font-style: Roboto;
          background: transparent;
          color: #000;
        }
  
        .input:focus {
          outline: none;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
  
        .input:active {
          outline: none;
          border: none;
          background: transparent;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
  
        .show-psk {
          position: relative;
          top: -3em;
          left: 18em;
          cursor: pointer;
        }
        }`
      }
    </style>
    </div>
  )
}
