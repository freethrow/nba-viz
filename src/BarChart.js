import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";


const BarChart = ({
  width,
  height,
  data,
  stat
}) => {
  let svgRef = useRef(null);
  console.log(data);

 
  // set the state of the chosen stat

 


  
  useEffect(() => draw(), [data,stat]);

  const draw = () => {
    //define scales


    // x scale will ALWAYS be the players names
    const xScale = d3
      .scaleBand()
      .domain(data.map((value,index) => value.PLAYER_NAME))
      .paddingInner(0.1)
      .range([0, width]);

    const xAxis = d3.axisBottom(xScale);

    // this will change according to the stat provides, for now AGE
    const yScale = d3
      .scaleLinear()
      .domain([0,d3.max(data,d=>d[stat])]).nice()
      .range([height,0]);

    const colorScale = d3
        .scaleLinear()
        .domain(d3.extent(data,d=>d[stat])).nice()
        .range(["blue", "green"])

    const paletteScale = d3.scaleSequential()
        .domain([0,d3.max(data,d=>d[stat])])
        .interpolator(d3.interpolateViridis);

    const yAxis = d3.axisLeft(yScale).ticks(6);

   
       
      
    // call to create x axis
    d3.select(svgRef.current)
        .select('.x-axis')
        .style('transform',`translateY(${height}px)`)
        .transition()
        .duration(1000)      
        .call(xAxis);

    // call to create x axis
    d3.select(svgRef.current)
        .select('.y-axis')
        .call(yAxis);

    //grab elements and style/position
    d3.select(svgRef.current)
      .selectAll("rect")
      .attr('class','bar')
      .data(data)
      .transition()
      .duration(1000)
      .attr("x", d => xScale(d.PLAYER_NAME))
      .attr("y", d => yScale(d[stat]))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d[stat]))
      .style("fill", (d,i) => paletteScale(d[stat]));


  };

  //create elements (but without anything special)
  const bars = data.map(d => <rect key={d.PLAYER_NAME} />);

  return (
      <div className="barContainer">
    <svg
      width={width}
      height={height}
      ref={svgRef}
    >
      {bars}
      <g className='x-axis' />
      <g className='y-axis' />
    </svg>
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
            data.sort((a,b) => d3.descending(a[stat], b[stat]));
            draw();
        }}
      >
        order by {stat}
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
            data.sort((a,b) => d3.ascending(a['PLAYER_NAME'], b['PLAYER_NAME']));
            draw();
        }}
      >
        order alphabetical
      </button>

      
      </div>
      </div>
     
  );
};

export default BarChart;