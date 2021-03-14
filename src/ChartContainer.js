import React, { useState } from "react";

import { getRandomData } from "./utils";

import sample from './sample';

import {descending} from 'd3'





// chart container
// data state

const ChartContainer = ({ renderChart }) => {
  const [data, setData] = useState(sample);
  return (
    <div>
      {renderChart(data)}
     {/*  <button
        style={{
          width: "200px",
          margin: "2em",
          background: "#011627",
          color: "white",
          fontSize: "1em"
        }}
        onClick={() => setData(getRandomData())}
      >
        get new data
      </button> */}

     
    </div>
  );
};

export default ChartContainer;