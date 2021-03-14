import { range as d3range } from "d3-array";
import { randomNormal as d3randomNormal } from "d3-random";


export const getRandomData = (totalPoints = 6) =>
  d3range(totalPoints).map((d, i) => {
    return { x: d, y: (20*Math.abs(d3randomNormal()()))};
  });