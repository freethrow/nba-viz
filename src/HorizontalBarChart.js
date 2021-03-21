import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { legendColor, legendSize} from 'd3-svg-legend'


import {firstBy} from "thenby"

const formatPercent = d3.format(".0%");

const pctStats = [
  'FG3_PCT',
  'FT_PCT',
  'W_PCT',
  'AST_PCT',
  'OREB_PCT',
  'DREB_PCT',
  'REB_PCT',
  'TM_TOV_PCT',
  'E_TOV_PCT',
  'EFG_PCT',
  'TS_PCT',
  'USG_PCT',
  'E_USG_PCT',
  'FG_PCT'
]

const HorizontalBarChart = ({
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



    d3.select(svgRef.current)
    .selectAll(".labels").remove() 

    d3.select(svgRef.current)
    .selectAll(".legendColor").remove() 
    
    
    // y scale will ALWAYS be the players names
    const yScale = d3
      .scaleBand()
      .domain(data.map((value,index) => value.PLAYER_NAME))
      .paddingInner(0.15)
      .range([height,0]);

    const yAxis = d3.axisLeft(yScale);

    // this will change according to the stat provides, for now AGE
    const xScale = d3
      .scaleLinear()      
      .domain([d3.min(data,d=>d[stat]),d3.max(data,d=>d[stat])]).nice()
      .range([0,width])




    let teams = [...new Set(data.map(item => item.TEAM_ABBREVIATION))].sort();

    const paletteScale = d3.scaleOrdinal(d3.schemePastel1)
        .domain(teams);

    // create color legend
    d3.select(svgRef.current)
        .append("g")
        .attr("class", "legendColor")
        .attr("transform", `translate(${width+40},20)`);

    const legendLinear = legendColor()
        .shapeWidth(30)
        .cells(10)
        .orient('vertical')
        .scale(paletteScale);

    d3.select(".legendColor")
        .call(legendLinear);

    const xAxis = d3.axisBottom(xScale).ticks(12);
    if(pctStats.includes(stat)){
      xAxis.tickFormat(formatPercent)}

       

    // call to create x axis
    d3.select(svgRef.current)
        .select('.x-axis')
        .style('transform',`translateY(${height}px)`)
        .transition()
        .duration(1000)      
        .call(xAxis);

    // call to create y axis
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
      .attr("y", d =>yScale(d.PLAYER_NAME))
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .attr("width", d => xScale(d[stat]))
      .style("fill", (d,i) => paletteScale(d['TEAM_ABBREVIATION']));



      d3.select(svgRef.current)
      .selectAll(".labels")     
      .data(data)
      .enter()
      .append("text")
      .attr('class','labels')
      .text(d => {
        if(stat.includes("PCT")){
          return parseFloat(100*d[stat]).toFixed(1)+"%"
        } else {
          return d[stat]
        }
        })
      .attr("y", d =>yScale(d.PLAYER_NAME)+0.5*yScale.bandwidth()+5)
      .transition()
      .duration(1000)
      .attr("x",d => xScale(d[stat])+12)
    
      .attr('text-anchor','left')
      .attr('font-size',0.15*yScale.bandwidth()+12) 

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
            
            data.sort((a,b) => d3.ascending(a[stat], b[stat]));
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
            data.sort((a,b) => d3.descending(a['PLAYER_NAME'], b['PLAYER_NAME']));
            draw();
        }}
      >
        order alphabetical
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

          data.sort(
            firstBy("TEAM_ABBREVIATION", {ignoreCase:true})
            .thenBy(stat)
        );
          
            draw();
        }}
      >
        order by team
      </button>
      
      </div>
      </div>
     
  );
};

export default HorizontalBarChart;