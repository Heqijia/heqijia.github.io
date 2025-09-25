// set the dimensions and margins of the graph
var width_body_make = 500
var height_body_make = 400
var margin_body_make = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width_body_make, height_body_make) / 2 - margin_body_make

// append the svg object to the div called 'my_dataviz'
d3.csv("https://raw.githubusercontent.com/Heqijia/CSE332_lab5/main/body_make.csv", function(data) {

  var svg_model_body = d3.select("#body_make_id")
    .append("svg")
    .attr("width", width_body_make)
    .attr("height", height_body_make)
    .append("g")
    .attr("transform", "translate(" + width_body_make / 2 + "," + height_body_make / 2 + ")");

  // Create dummy data
  var data = data.reduce(function(result, d) {
    result[d[window.make]] = d[window.make + '1'];
    return result;
  }, {});

  var keys = Object.keys(data);
  var temp = keys[keys.length - 2];
  keys[keys.length - 2] = keys[1];
  keys[1] = temp;

  // 重新构建对象
  var reorderedData = {};
  keys.forEach(function(key) {
    reorderedData[key] = data[key];
  });

  data = reorderedData

  var keys = Object.keys(data);
  var temp = keys[keys.length - 4];
  keys[keys.length - 4] = keys[3];
  keys[3] = temp;

  // 重新构建对象
  reorderedData = {};
  keys.forEach(function(key) {
    reorderedData[key] = data[key];
  });

  data = reorderedData

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(['van', 'cab', 'sedan', 'suv', 'coupe', 'convertible', 'wagon',
      'hatchback', 'others'])
    .range(d3.schemeDark2);

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .sort(null) // Do not sort group by size
    .value(function(d) { return d.value; })
  var data_ready = pie(d3.entries(data))

  // The arc generator
  var arc = d3.arc()
    .innerRadius(radius * 0.5) // This is the size of the donut hole
    .outerRadius(radius * 0.8)

  // Another arc that won't be drawn. Just for labels positioning
  var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg_model_body
  .selectAll('allSlices')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d) { return (color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .on("mouseover", function(d) {
    d3.select(this)
      .style("opacity", 1); // Increase opacity on mouseover
  })
  .on("mouseout", function(d) {
    d3.select(this)
      .style("opacity", 0.7); // Reset opacity on mouseout
  })
  .on("click", function(d) {
    // console.log("Clicked on: " + d.data.key); // Log label on click
    window.parallel_value_df='body';
    window.parallel_value_2=d.data.key;
    removeRedLinesFromParallelPlot();
    add_newLine();

  })
  .transition()
  .duration(800)
  .attrTween("d", function(d) {
    var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
    return function(t) {
      return arc(interpolate(t));
    };
  });

  // Add the polylines between chart and labels:
  svg_model_body
    .selectAll('allPolylines')
    .data(data_ready)
    .enter()
    .append('polyline')
    .attr("stroke", "white")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
      var posA = arc.centroid(d) // line insertion in the slice
      var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
      var posC = outerArc.centroid(d); // Label position = almost the same as posB
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    })

  // Add the polylines between chart and labels:
  svg_model_body
    .selectAll('allLabels')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d) { return d.data.key })
    .style("fill", "white")

    .attr('transform', function(d) {
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midangle < Math.PI ? 'start' : 'end')
    });

  svg_model_body.append('text')
    .text(window.make)
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em') // 垂直方向上微调标签位置
    .style('font-size', '22px') // 设置字体大小
    .style('fill', 'red') // 设置字体颜色
    .style('font-family', 'Playpen Sans');
});
