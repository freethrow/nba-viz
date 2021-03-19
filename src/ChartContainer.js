import React, { useState, useContext } from "react";
import { PlayersContext } from './PlayersContext'



import sample from './sample';

import {descending} from 'd3'




// chart container
// data state

const ChartContainer = ({ renderChart }) => {
  const {players,setPlayers} = useContext(PlayersContext)

  const [data, setData] = useState(players);
  return (
    <div className="chartContainer">
      
      {renderChart(data)}    
    </div>
  );
};

export default ChartContainer;