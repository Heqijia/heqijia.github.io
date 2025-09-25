// set the dimensions and margins of the graph
var margin_model_make = { top: 40, right: 30, bottom: 70, left: 60 },
  width_model_make = 600 - margin_model_make.left - margin_model_make.right,
  height_model_make = 380 - margin_model_make.top - margin_model_make.bottom;

// append the svg object to the body of the page
var svg_model_make = d3
  .select("#model_make_id")
  .append("svg")
  .attr("width", width_model_make + margin_model_make.left + margin_model_make.right)
  .attr("height", height_model_make + margin_model_make.top + margin_model_make.bottom)
  .append("g")
  .attr("transform", "translate(" + margin_model_make.left + "," + margin_model_make.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/Heqijia/CSE332_lab5/main/model_make.csv", function (data) {
  // X axis
  var x_model_make = d3
    .scaleBand()
    .range([0, width_model_make])
    .domain(data.map(function (d) { return d[window.make]; }))
    .padding(0.2);

  svg_model_make
    .append("g")
    .attr("transform", "translate(0," + height_model_make + ")")
    .call(d3.axisBottom(x_model_make))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-30)")
    .style("text-anchor", "end")
    .style('font-family', 'Playpen Sans')
    .style("font-size", "16px") // 设置字体大小，可以根据需要调整
    .style("fill", "white"); // 设置轴线颜色为白色

  // 设置X轴坐标轴线的颜色为白色
  svg_model_make.selectAll(".domain")  
      .style("stroke", "white");

  // 设置X轴刻度线的颜色为白色
  svg_model_make.selectAll(".tick line") 
      .style("stroke", "white");

  // 设置X轴刻度文本的颜色为白色
  svg_model_make.selectAll(".tick text")  
      .style("fill", "white");


  // Add Y axis
  // 获取 'ford1' 列的最大值
  var maxYValue = data[0][window.make + "1"];

  // 创建 y 轴的线性比例尺
  var y_model_make = d3.scaleLinear()
      .domain([0, maxYValue])
      .range([height_model_make, 0]);

  // 创建 y 轴并调用它，同时设置颜色为白色
  // 创建 y 轴并调用它
  svg_model_make
      .append("g")
      .call(d3.axisLeft(y_model_make))
      .selectAll("path")  // 选择轴线
      .style("stroke", "white"); // 设置轴线颜色为白色

  svg_model_make.selectAll("g.tick line") // 选择所有刻度线
      .style("stroke", "white"); // 设置刻度线颜色为白色

  svg_model_make.selectAll("g.tick text") // 选择所有刻度文本
      .style("fill", "white"); // 设置刻度文本颜色为白色





  // Bars
  svg_model_make
    .selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x_model_make(d[window.make]);
    })
    .attr("y", height_model_make) // 设置起始位置在底部
    .attr("width", x_model_make.bandwidth())
    .attr("height", 0) // 设置初始高度为0
    .attr("fill", "#69b3a2")
    .on("mouseover", function (d) {
      // 添加鼠标悬停事件，显示数值
      svg_model_make
        .append("text")
        .attr("class", "value-label")
        .attr("x", x_model_make(d[window.make]) + x_model_make.bandwidth() / 2)
        .attr("y", y_model_make(d[window.make + "1"]) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text(d[window.make + "1"])
        .style("fill", "white");


      // 生成随机颜色并应用到柱子上
      d3.select(this).attr(
        "fill",
        "rgb(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ")"
      );
    })
    .on("mouseout", function () {
      // 移除数值标签
      svg_model_make.select(".value-label").remove();

      // 恢复初始颜色
      d3.select(this).attr("fill", "#69b3a2");
    })
    .on("click", function (d) {
      // 在控制台输出当前柱子的标签
      //   console.log("hey! " + d[window.make]);
      window.parallel_value_df = "model";
      window.parallel_value_2 = d[window.make];
      removeRedLinesFromParallelPlot();
      add_newLine();
    })
    .transition() // 添加过渡效果
    .duration(800) // 设置过渡时间（以毫秒为单位）
    .attr("y", function (d) {
      return y_model_make(d[window.make + "1"]);
    }) // 终点高度
    .attr("height", function (d) {
      return height_model_make - y_model_make(d[window.make + "1"]);
    }); // 实际柱子的高度

  // // 添加 x 轴标签
  // svg_model_make
  //   .append("text")
  //   .attr("transform", "translate(" + width_model_make / 2 + " ," + (height_model_make + margin_model_make.top + 20) + ")")
  //   .style("text-anchor", "middle")
  //   .style("font-size", "16px")
  //   .text("Car Model");

  // 添加 y 轴标签
  svg_model_make
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin_model_make.left)
    .attr("x", 0 - height_model_make / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "16px")
    .style('font-family', 'Playpen Sans')
    .text("Number")
    .style("fill", "white");


  // 添加标题
  svg_model_make
    .append("text")
    .attr("x", width_model_make / 2)
    .attr("y", 0 - margin_model_make.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style('font-family', 'Playpen Sans')
    .text("The most popular 7 models in "+ window.make)
    .style("fill", "white");

});
