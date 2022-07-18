import React from 'react'

export default function Input({
  title = "",
  type = "",
  value = "",
  name = "",
  handleInputChange = () => {},
  placeholder = "",
  isViewPassword = "", 
  togglePassword = () => {}
})

{
  return (
    <div>
      {value.length > 0 && <p className='input-title'>{title}</p>}
      <input 
        type={isViewPassword ? "password" : type} 
        className="input" 
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
          width: 90%;
          margin: 1em 0em;
          text-align: left;
          color: #fff;
        }
  
        .input-title {
          text-align: left;
          margin-bottom: 5px;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.5);
        }
  
        .input {
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          outline: none;
          shadow: none;
          padding: 0.5em;
          font-style: Roboto;
          background: transparent;
          color: #fff;
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
  
        .forgot-password {
          font-size: 10px;
          color:rgba(255, 255, 255, 0.5);
          position: relative;
          top: -5em;
          left: 10em;
          cursor: pointer;
        }`
      }
    </style>
    </div>
  )
}
