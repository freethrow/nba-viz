import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import { legendColor, legendSize} from 'd3-svg-legend'

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


const ScatterPlot = ({
  width,
  height,
  data,
  stat1,
  stat2,
  stat3,
  stat4
}) => {
  let svgRef = useRef(null);
  console.log(data);

 
  // set the state of the chosen stat

 


  
  useEffect(() => draw(), [data,stat1,stat2,stat3,stat4]);

  const draw = () => {


   console.log(stat1,stat2,stat3,stat4)

   d3.select(".legendLinear").remove();
   d3.select(".legendSize").remove();
   d3.select(".xlabel").remove();
   d3.select(".ylabel").remove();
   d3.select(".colorlabel").remove();
   d3.select(".radiuslabel").remove();
   d3.selectAll(".axis-grid").remove();
   

    // x scale will be stat1s
    const xScale = d3
      .scaleLinear()      
      .domain([0.9*d3.min(data,d=>d[stat1]),1.1*d3.max(data,d=>d[stat1])]).nice()
      .range([0,width]);

   
    const xAxis = d3.axisBottom(xScale).ticks(12);

    if(pctStats.includes(stat1)){
      xAxis.tickFormat(formatPercent)}

    // add legend for x scale
    d3.select(svgRef.current)
        .append('text')
        .attr('class','xlabel')
        .text(`metric: ${stat1}`)
        .style('stroke','gray')
        .attr('y',height+20)
        .attr('x',width+10)


    // add legend for y scale
    d3.select(svgRef.current)
        .append('text')
        .attr('class','ylabel')
        .text(`metric: ${stat2}`)
        .style('stroke','gray')
        .attr('y',20)
        .attr('x',20)


    // add legend for color scale
    d3.select(svgRef.current)
        .append('text')
        .attr('class','colorlabel')
        .text(`metric: ${stat3}`)
        .attr('stroke','#999')
        .attr('font-weight',100)
        .attr('y',20)
        .attr('x',width+30)


    // add legend for radius scale
    d3.select(svgRef.current)
        .append('text')
        .attr('class','radiuslabel')
        .text(`metric: ${stat4}`)
        .attr('stroke','#999')
        .attr('font-weight',100)
        .attr('y',140)
        .attr('x',width+30)

    // this will change according to the stat provides
    const yScale = d3
      .scaleLinear()
      .domain([0.9*d3.min(data,d=>d[stat2]),d3.max(data,d=>d[stat2])]).nice()
      .range([height,0]);


    const yAxis = d3.axisLeft(yScale);

    if(pctStats.includes(stat2)){
      yAxis.tickFormat(formatPercent)}

    const xAxisGrid = d3.axisBottom(xScale).tickSize(-height).tickFormat('').ticks(10);
    const yAxisGrid = d3.axisLeft(yScale).tickSize(-width).tickFormat('').ticks(10);


    // Create grids.
    d3.select(svgRef.current).append('g')
      .attr('class', 'x axis-grid')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisGrid);
      d3.select(svgRef.current).append('g')
      .attr('class', 'y axis-grid')
      .call(yAxisGrid);




    let paletteScale;

    // create domain for ordinal scale
    let teams = [...new Set(data.map(item => item.TEAM_ABBREVIATION))].sort();

    const ordinalScale = d3.scaleOrdinal(d3.schemePastel1)
    .domain(teams);

    const contScale = d3.scaleSequential()
    .domain([d3.min(data,d=>d[stat3]),d3.max(data,d=>d[stat3])])
    .interpolator(d3.interpolateOrRd);

    {stat3==='TEAM_ABBREVIATION' ? paletteScale = ordinalScale: paletteScale=contScale}

    if(pctStats.includes(stat3)){
      paletteScale.tickFormat(formatPercent)}

  
    // radius scale
    const rScale = d3
    .scaleLinear()
    .domain([d3.min(data,d=>d[stat4]),d3.max(data,d=>d[stat4])])
    .range([10,30]);

      
    // call to create x axis
    d3.select(svgRef.current)
        .select('.x-axis')
        .style('transform',`translateY(${height}px)`) 
        .call(xAxis);

    // call to create y axis
    d3.select(svgRef.current)
        .select('.y-axis')
        .call(yAxis);



    // create color legend
    d3.select(svgRef.current)
        .append("g")
        .attr("class", "legendLinear")
        .attr("transform", `translate(${width+20},20)`);

    const legendLinear = legendColor()
        .shapeWidth(30)
        .cells(10)
        .shapePadding(10)
        .orient('horizontal')
        .scale(paletteScale);

    d3.select(".legendLinear")
        .call(legendLinear);

    // create size legend
    d3.select(svgRef.current)
    .append("g")
    .attr("class", "legendSize")
    .attr("transform", `translate(${width+20},150)`);

    let legendRadius = legendSize()
    .shapeWidth(30)
    .shape('circle')
    .shapePadding(25)
    .labelOffset(30)
    .cells(5)
    .orient('horizontal')
    .scale(rScale);

    d3.select(svgRef.current).select(".legendSize")
        .call(legendRadius);



    // create tooltip div

    const tooltip = d3.select("body")
    .append("div")	
    .attr("class", "tooltip")
    .attr("opacity",0)



    //grab elements and style/position
    const dots = d3.select(svgRef.current)
    .selectAll("circle")
    .attr('class','dots')
    .data(data)
    .transition()
    .duration(1000)
    .attr("cx", d=>xScale(d[stat1]))
    .attr("cy", d=>yScale(d[stat2]))
    .attr("r",d=>rScale(d[stat4]))
    .style('opacity',0.8)
    .attr("stroke","black")
    .attr('fill',d=>paletteScale(d[stat3]))
    
    

    d3.select(svgRef.current)
    .selectAll("circle")
    .data(data)
    .on("mouseover", function(ev,d) {	        	
        tooltip		
        .style("opacity", 0.8)	
        .html(`<p><strong>${d.PLAYER_NAME}</strong><br/>
        <strong>${d.TEAM_ABBREVIATION}</strong>
        <hr/>
        ${stat1}:<strong>${d[stat1]}</strong><br/>
        ${stat2}:<strong>${d[stat2]}</strong><br/>
        ${stat3}:<strong>${d[stat3]}</strong><br/>
        ${stat4}:<strong>${d[stat4]}</strong></p>`)	
        .style("left", (ev.pageX) + "px")             
        .style("top", (ev.pageY - 28) + "px");
        })					
    .on("mouseout", function(d) {		
        tooltip		
            .style("opacity", 0);	
    })
    

  };

  //create elements (but without anything special)
  const circles = data.map(d => <circle key={d.PLAYER_NAME} />);

  return (
      <div className="scatterContainer">
    <svg
      width={width}
      height={height}
      ref={svgRef}
    >
     {circles}
      <g className='x-axis' />
      <g className='y-axis' />
    </svg>

      </div>
     
  );
};

export default ScatterPlot;