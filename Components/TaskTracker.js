import React from 'react'

export default function TaskTracker({data, currentHabitId, scrollRef, selectedId, selectedHabitId, handleScroll}) {
  return (
    <div>
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
                  onClick={() => val.isChecked === true && handleCheckDay(data.id, val.value)}
                  className={[selectedHabitId === val.value && data.id === selectedId ? "day-value, currentBorder" : "day-value", val.checked ? val.isCompleted ? "habit-done, habit-count-bg-done" : "habit-missed, habit-count-bg-missed" : "habit-upcoming"].join(" ")}>{val.value}</span>
                  {val.value == data.days.length ? "" : 
                  <span className={val.checked ? val.isCompleted ? "habit-done" : "habit-missed" : "habit-upcoming"}>---</span>}
                </span>
            ))
          }
        </div>
            {
              data.days.length >= 10 ?
              <div className="pagination">
                <img  
                  className="right-scroll"
                  onClick={() => handleScroll(data.id, 60)}
                  src="/static/images/right-arrow.svg" 
                  alt="right" 
                  style={{height: "1.5em", width: "1.5em"}}
                  />
                  <h3>{data.days.filter(val => val.checked === true).length}/{data.totalDays}</h3>
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
            : <div 
              className="pagination-pre">
                <h3>{data.days.filter(val => val.checked === true).length}/{data.totalDays}</h3>
              </div>
            }
      </div>
      <style jsx>{`
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
          right: -6.6em;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 1em;
          margin-top: -1em;
          padding: 0.5em 0;
          gap: 2em;
          text-align: center;
        }

        .currentBorder {
          border: 2px solid gold;
          background: rgba(255,255,255,0.6);
          padding: 0.33em 0.55em;
          border-radius: 50%;
          color: white;
        }
        
        .pagination-pre {
          position: relative;
          top: -1.15em;
          right: -2.3em;
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
          margin-left: -2em;
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
