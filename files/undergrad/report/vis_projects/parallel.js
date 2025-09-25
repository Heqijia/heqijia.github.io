
    var margin_para = {top: 50, right: 50, bottom: 10, left: 50},
      width_para = 830 - margin_para.left - margin_para.right,
      height_para = 440 - margin_para.top - margin_para.bottom;
    
    var svg_parr = d3.select("#parallel_id")
    .append("svg")
      .attr("width", width_para + margin_para.left + margin_para.right)
      .attr("height", height_para + margin_para.top + margin_para.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin_para.left + "," + margin_para.top + ")");
    var path;
    var data_global;
    

    d3.csv("https://raw.githubusercontent.com/Heqijia/CSE332_lab5/main/car_data_2.csv", function(data) {
        // 将数据随机打乱顺序
        data_global=data;

      var filteredData = data.filter(function(d) {
        // 将 'columnA' 替换为实际的列名
        return d['make'] === window.make;
      });


      if (filteredData.length <= 150) {
        // 数据小于等于 500 时获取全部数据
        filteredData = filteredData;
      } else {
        // 数据超过 500 时获取前 300 条数据
        filteredData = filteredData.slice(0, 150);
      }

      data=filteredData

    
      dimensions = ['year', 'condition', 'odometer', 'mmr', 'sellingprice', 'income','using_time'];
    // dimensions =['condition', 'odometer', 'mmr', 'sellingprice', 'income',	'using_time', 'difference', 'selling_year']

      var y_para = {}
      for (i in dimensions) {
        
        name = dimensions[i]
        var xValues = data.map(function(d) {
            return +d[name]; // 将'X'列的字符串转换为数值
        });

        var minX = d3.min(xValues);
        var maxX = d3.max(xValues);
        // console.log(minX,  maxX)

        y_para[name] = d3.scaleLinear()
          .domain( [minX,maxX] ) 

          .range([height_para, 0])
      }

    
      // add X scale
      x_para = d3.scalePoint()
        .range([0, width_para])
        .domain(dimensions);

    
        path = function(d) {
          return d3.line()(dimensions.map(function(p) { return [x_para(p), y_para[p](d[p])]; }));
        };
    
      svg_parr
        .selectAll("myPath")
        .data(data)
        .enter()
        .append("path")
        .attr("class", function(d) { return "line"; })
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", 'green')
        .style("stroke-width", 1.5)
        .style("opacity", 0)
        .transition()
        .duration(800)
        .style("opacity", 1);
    

      // add the axis:
      svg_parr.selectAll("myAxis")
        .data(dimensions).enter()
        .append("g")
        .attr("class", "axis")
        .attr("transform", function(d) { return "translate(" + x_para(d) + ")"; })
        .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y_para[d])); })
        .append("text")
          .style("text-anchor", "middle")
          .attr("y", -9)
          .text(function(d) { return d; })
          .style("fill", "white")
          //title
      svg_parr.append('text')
        .attr("y", -margin_para.top / 2) 
        .attr('x', width/2+margin_para.left*3)
        .style("text-anchor", "middle")
        .style("font-size", "20px")  
        .style('font-family', 'Playpen Sans')
        .style("font-weight", "bold")
        .text(window.make+ '\'s sencond hand market data display')
        .style("fill", "white");



      svg_parr.selectAll(".axis path")
        .style("stroke", "white");
      
      // 设置坐标轴刻度线的颜色为白色
      svg_parr.selectAll(".axis line")
        .style("stroke", "white");
      
      // 设置坐标轴刻度文本的颜色为白色
      svg_parr.selectAll(".axis text")
        .style("fill", "white");
    
    })
//   function path(d) {
//     return d3.line()(dimensions.map(function(p) { return [x_para(p), y_para[p](d[p])]; }));
// }




    
function removeRedLinesFromParallelPlot() {
  // Select red lines and remove them
  svg_parr.selectAll(".line")
    .filter(function(d) {
      // Customize the condition based on your data structure and color
      return d3.select(this).style("stroke") === "yellow";
    })
    .transition()
    .duration(100)
    .style("opacity", 0)
    .remove();

  // Update the data array to exclude the removed lines
  data_global = data_global.filter(function(d) {
    // Customize the condition based on your data structure and color
    return d.color !== "yellow";
  });
}

function addLinesToParallelPlot(newData) {
  // data_global = data_global.concat(newData);

  // // Update y scales for the new dimensions
  // dimensions.forEach(function(name) {
  //   var xValues = data_global.map(function(d) {
  //     return +d[name];
  //   });

  //   var minX = d3.min(xValues);
  //   var maxX = d3.max(xValues);

  //   y_para[name] = d3.scaleLinear()
  //     .domain([minX, maxX])
  //     .range([height_para, 0]);
  // });

  svg_parr
    .selectAll("myPath")
    .data(newData)
    .enter()
    .append("path")
    .attr("class", function(d) { return "line"; })
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", 'yellow')
    .style("stroke-width", 1.8)
    .style("opacity", 0)
    .transition()
    .duration(300)
    .style("opacity", 0.8);
}
function add_newLine(){
    d3.csv("https://raw.githubusercontent.com/Heqijia/CSE332_lab5/main/car_data_2.csv", function(newData) {
    // Filter or process the new data as needed
    var filteredData = newData.filter(function(d) {
      // 将 'columnA' 替换为实际的列名
      return d['make'] === window.make;
    });

    if (filteredData.length <= 150) {
      // 数据小于等于 500 时获取全部数据
      filteredData = filteredData;
    } else {
      // 数据超过 500 时获取前 300 条数据
      filteredData = filteredData.slice(0, 150);
    }

    if(window.parallel_value_df!=0){
      filteredData = filteredData.filter(function(d) {
        // 将 'columnA' 替换为实际的列名
        return d[window.parallel_value_df] === window.parallel_value_2;
      });
    }


    newData=filteredData

    addLinesToParallelPlot(newData);
  });
}