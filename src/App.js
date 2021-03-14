
import './App.css';

import ChartContainer from './ChartContainer'
import BarChart from './BarChart'
import sample from './sample'
import {useState} from 'react'


function App() {

  const [stat, setStat] = useState('PTS')

  return (
    <div className="App">
      <h2>React and D3.js + Freethrow => NBA Stats</h2>
      <ChartContainer
        renderChart={data => (
            
            <BarChart
                data={data}
                stat={stat}
                width={800}
                height={400}
            />
        )}
    />
    <div className="btnContainer">
    <button
        style={{
          width: "200px",
          margin: "2em",
          background: "#011627",
          color: "white",
          fontSize: "1em"
        }}
        onClick={() => {
            setStat('MIN')
        }}
      >
        MINUTES PER GAME
      </button>
      <button
        style={{
          width: "200px",
          margin: "2em",
          background: "#011627",
          color: "white",
          fontSize: "1em"
        }}
        onClick={() => {
            setStat('FG_PCT')
        }}
      >
        Field Goal %
      </button>
      <button
        style={{
          width: "200px",
          margin: "2em",
          background: "#011627",
          color: "white",
          fontSize: "1em"
        }}
        onClick={() => {
            setStat('AGE')
        }}
      >
        Player age
      </button>

      <button
        style={{
          width: "200px",
          margin: "2em",
          background: "#011627",
          color: "white",
          fontSize: "1em"
        }}
        onClick={() => {
            setStat('REB')
        }}
      >
        Rebounds
      </button>
        </div>
    </div>
  );
}

export default App;
