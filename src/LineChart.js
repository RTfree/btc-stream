import React, { Component } from "react";
import * as d3 from "d3";
import { Element } from "react-faux-dom";

class LineChart extends Component {
  static defaultProps = {
    height: 250,
    width: 160
  };

  drawVerticalChart(odata) {
    const height = 400;
    const graphColor = "#1079BF";
    var data = odata.map((d, i) => {
      return {
        value: d["x"]["inputs"][0]["prev_out"]["value"],
        i: i+1
      };
    });

    let width = 500;
    
    if (data.length > 3 && data.length <= 8) {
      width = (data.length + 1) * 80;
    } else if (data.length > 8) {
      width = 740;
    }
    const element = new Element("div");
    element.style.display = "flex";
    element.style["justify-content"] = "center";
    const margin = { top: 80, right: 160, bottom: 80, left: 160 };

    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const domain = data.map(item => {
      return item.i;
    });
    const range = data.map((item, index) => {
      return (width / 10) * index;
    });

    var x = d3
      .scaleLinear()
      .domain(domain)
      .range(range);
    // x = d3.scaleBand().domain(domain).range([0,width]);

    svg
      .append("g")
      .attr("class", "x-axis")
      .style("font-size", "12px")
      .style("color", "#A9A3A1")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
      // .tickSize(-height)
      );

    // svg.selectAll(".x-axis .tick text").each(function() {
    //   const tick = d3.select(this);
    //   const s = tick.text().split(" "); // get the text and split it
    //   tick.text(""); // clear it out
    //   tick
    //     .append("tspan") // insert two tspans
    //     .attr("x", 0)
    //     .attr("dy", ".8em")
    //     .text(s[0]);
    //   tick
    //     .append("tspan")
    //     .attr("x", 0)
    //     .attr("dy", "1.8em")
    //     .text(s[1]);
    // });

    var maxHeightraw = d3.max(data.map(d => parseInt(d.value)));
    var maxHeight = parseInt(
      // Get highest number then increse most significant digit by 1 and then append zeros
      parseInt(maxHeightraw.toString()[0])+1 
      + (new Array(maxHeightraw.toString().length-1).fill(0)).join('') // Appending zeros
    );
    const y = d3
      .scaleLinear()
      .domain([0, maxHeight])
      .rangeRound([height, 0]);

    svg
      .append("g")
      .attr("class", "y-axis")
      .style("font-size", "12px")
      .style("color", "#A9A3A1")
      .call(d3.axisLeft(y));

    // Add the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", graphColor)
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function(d) {
            return x(d.i);
          })
          .y(function(d) {
            return y(parseInt(d.value));
          })
      );

    // Add the points
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "myCircle")
      .attr("cx", function(d) {
        return x(d.i);
      })
      .attr("cy", function(d) {
        return y(parseInt(d.value));
      })
      .attr("r", 3)
      .attr("stroke", graphColor)
      .attr("stroke-width", 3)
      .attr("fill", graphColor);

    // Add label
    // svg
    //   .selectAll(".text")
    //   .data(data)
    //   .join("text")
    //   .attr("fill", "#4A4B4D")
    //   .attr("font-weight", "600")
    //   //y position of the label is halfway down the bar
    //   .attr("y", function(d) {
    //     return y(parseInt(d.value)) - 10;
    //   })
    //   .attr("x", function(d) {
    //     return x(d.i);
    //   })
    //   .text(function(d) {
    //     return d.value;
    //   });

    return element.toReact();
    // return null;
  }

  render() {
    const { data } = this.props;
    console.log(data)
    return data.length ? this.drawVerticalChart(data) : null;
  }
}

export default LineChart;
