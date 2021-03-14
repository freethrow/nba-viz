import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { transition } from "d3";
import { legendColor, legendSize} from 'd3-svg-legend'


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

    // x scale will be stat1s
    const xScale = d3
      .scaleLinear()      
      .domain([d3.min(data,d=>d[stat1]),d3.max(data,d=>d[stat1])]).nice()
      .range([0,width]);

   
    const xAxis = d3.axisBottom(xScale).ticks(12);

    // add legend for x scale
    d3.select(svgRef.current)
        .append('text')
        .attr('class','xlabel')
        .text(`metric: ${stat1}`)
        .style('stroke','gray')
        .attr('y',height+20)
        .attr('x',width+30)


    // add legend for y scale
    d3.select(svgRef.current)
        .append('text')
        .attr('class','ylabel')
        .text(`metric: ${stat2}`)
        .style('stroke','gray')
        .attr('y',20)
        .attr('x',0)

    // add legend for color scale
    d3.select(svgRef.current)
        .append('text')
        .attr('class','colorlabel')
        .text(`metric: ${stat3}`)
        .style('stroke','gray')
        .attr('y',20)
        .attr('x',width)


    // add legend for radius scale
    d3.select(svgRef.current)
        .append('text')
        .attr('class','radiuslabel')
        .text(`metric: ${stat4}`)
        .style('stroke','gray')
        .attr('y',140)
        .attr('x',width)

    // this will change according to the stat provides
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data,d=>d[stat2]),d3.max(data,d=>d[stat2])]).nice()
      .range([height,0]);


    const yAxis = d3.axisLeft(yScale).ticks(6);

   
    const paletteScale = d3.scaleSequential()
    .domain([d3.min(data,d=>d[stat3]),d3.max(data,d=>d[stat3])])
    .interpolator(d3.interpolateViridis);
       
    // radius scale
    const rScale = d3
    .scaleLinear()
    .domain([d3.min(data,d=>d[stat4]),d3.max(data,d=>d[stat4])])
    .range([5,20]);

      
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
        .attr("transform", `translate(${width-20},20)`);

    const legendLinear = legendColor()
        .shapeWidth(30)
        .cells(10)
        .orient('horizontal')
        .scale(paletteScale);

    d3.select(".legendLinear")
        .call(legendLinear);

    // create size legend
    d3.select(svgRef.current)
    .append("g")
    .attr("class", "legendSize")
    .attr("transform", `translate(${width-20},150)`);

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
    .style('opacity',0.6)
    .attr('fill',d=>paletteScale(d[stat3]))
    
    

    d3.select(svgRef.current)
    .selectAll("circle")
    .data(data)
    .on("mouseover", function(ev,d) {	        	
        tooltip		
        .style("opacity", 1)	
        .html(`<p>${d.PLAYER_NAME}<hr/>
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
      <div className="barContainer">
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