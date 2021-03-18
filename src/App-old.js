
import { Container } from 'react-bootstrap'

import './App.css';


import ChartContainer from './ChartContainer'
import BarChart from './BarChart'
import HorizontalBarChart from './HorizontalBarChart'
import ScatterPlot from './ScatterPlot'
import sample from './sample'
import {useState} from 'react'

// components
import Header from './components/Header'
import Footer from './components/Footer'


function App() {

  const [stat, setStat] = useState('PTS')
  const [stat1,setStat1] = useState('PTS')
  const [stat2,setStat2] = useState('REB')
  const [stat3,setStat3] = useState('PLUS_MINUS')
  const [stat4,setStat4] = useState('MIN')
  return (
    <div className="App">
      <Header/>
      <h2>React and D3.js + Freethrow  NBA Stats</h2>
      <ChartContainer
        renderChart={data => (
            
            <ScatterPlot
                data={data}
                stat1={stat1}
                stat2={stat2}
                stat3={stat3}
                stat4={stat4}
                height={600}
                width={800}
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
            setStat4('AGE')
        }}
      >
        Rebounds
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
            setStat1('AGE')
        }}
      >
        Rebounds
      </button>


        </div>
        <Footer />
    </div>
  );
}

export default App;
