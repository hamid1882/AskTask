import React, { Fragment } from 'react'

export default function OptionsBar({id, handleDelete, isDeleteLoading, handleEdit}) {
  return (
    <div className="options-bar">
      <div className="option-flex" onClick={() => handleEdit(id)}>
        <img className="options-icon" src="/static/images/edit.svg" alt="edit" />
        <div className="options-text">Edit</div>
      </div>
      <div>|</div>
      <div className="option-flex">
        {!isDeleteLoading
        ?
          <Fragment>
            <img className="options-icon" src="/static/images/delete.svg" alt="edit" />
            <div 
            className="options-text"
            onClick={() => handleDelete(id)}
            >Delete</div>
          </Fragment>
         : <img 
            src="/static/loader/button-loader.svg" 
            alt="loading..." 
            style={{width: "1.6em", height: "1.6em",}} />
        }
      </div>
      <style jsx>
        {
          `
          .options-bar {
            width: 163px;
            height: 26px;
            background-color:rgba(255, 255, 255, 0.5);
            border: 1px solid #C9B8D3;
            border-radius: 1em;
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 0.3em;
            padding: 0 0.5em;
            position: absolute;
            top: -1.9em;
            right: 3em;
            z-index: 2;
          }
  
          .option-flex {
            display: flex;
            align-items: center;
            gap: 0.3em;
          }
  
          .options-text {
            color: rgba(0,0,0, 0.6);
            font-family: sans-serif;
            font-size: 14px;
            letter-style: 0.1em;
          }`
        }
      </style>
    </div>
  )
}
