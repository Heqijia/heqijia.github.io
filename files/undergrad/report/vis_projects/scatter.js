// set the dimensions and margins of the graph
var margin_scatter = {top: 35, right: 30, bottom: 50, left: 60},
    width = 460 - margin_scatter.left - margin_scatter.right,
    height = 440 - margin_scatter.top - margin_scatter.bottom;

// append the svg object to the body of the page
var svg_scatter = d3.select("#scatter_id")
  .append("svg")
    .attr("width", width + margin_scatter.left + margin_scatter.right)
    .attr("height", height + margin_scatter.top + margin_scatter.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_scatter.left + "," + margin_scatter.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/Heqijia/CSE332_lab5/main/car_data_3.csv", function(data) {

    data = data.filter(function(d) {
        // 将 'columnA' 替换为实际的列名
        return d['model'] === window.scatter_model;
    });

    data.forEach(function(d) {
        d['sellingprice'] = parseFloat(d['sellingprice']);
        d['com_D'] = parseFloat(d['com_D']);
    });

    var newPoint = { com_D: window.predict_coor[0], sellingprice: window.predict_coor[1] };

    // 将新的数据点添加到数据数组中
    data.push(newPoint);

    var max_com_D = d3.max(data, function(d) {
        return +d['com_D']; // 使用 + 转换为数值类型
    });
    var min_com_D = d3.min(data, function(d) {
        return +d['com_D']; // 使用 + 转换为数值类型
    });
    var max_sellingprice = d3.max(data, function(d) {
        return +d['sellingprice']; // 使用 + 转换为数值类型
    });


    

var x_scatter = d3.scaleLinear()
    .domain([min_com_D, max_com_D])
    .range([0, width]);

    svg_scatter.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_scatter))
    .selectAll('path, line') // 选择轴线和刻度线
    .style('stroke', 'white'); // 设置为白色

// svg_scatter.selectAll(".tick text") // 选择 X 轴和 Y 轴的所有刻度文本
//     .style('fill', 'white'); // 设置文本颜色为白色

// Add Y axis
var y_scatter = d3.scaleLinear()
    .domain([0, max_sellingprice])
    .range([height, 0]);

// 注意在这里添加 Y 轴，而不是在 g 元素内部
svg_scatter.append("g")
    .call(d3.axisLeft(y_scatter))
    .selectAll('path, line') // 选择轴线和刻度线
    .style('stroke', 'white'); // 设置为白色

    svg_scatter.selectAll(".tick text") // 选择 X 轴和 Y 轴的所有刻度文本
    .style('fill', 'white'); // 设置文本颜色为白色

  // Add dots
  // 更新已有的数据点
  svg_scatter.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return x_scatter(d.com_D); })
        .attr("cy", function(d) { return y_scatter(d.sellingprice); })
        .attr("r", function(d){
            return d=== newPoint ? 5 : 1.5;
        })
        .style("fill", function(d) {
            // 如果是新的数据点，设置为红色，否则设置为绿色
            return d === newPoint ? "red" : "#DCEBFF ";
        })
        .style("opacity", 0)  // 设置初始透明度为 0
        .transition()  // 启动过渡动画
        .duration(800)  // 设置过渡时间
        .style("opacity", 1);  // 设置最终透明度为 1

  // 添加 y 轴标签
  svg_scatter
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin_scatter.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "16px")
    .style('font-family', 'Playpen Sans')
    .text("Price")
    .style("fill", "white");


  // 添加 x 轴标签
  svg_scatter
    .append("text")
    .attr("transform", "translate(" + width / 2 + " ," + (height + margin_scatter.top ) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "16px")
    .style('font-family', 'Playpen Sans')
    .text("combine_axis")
    .style("fill", "white");


  // 添加标题
  svg_scatter
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin_scatter.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style('font-family', 'Playpen Sans')
    .text("Your " + window.scatter_model + " Price Prediction")
    .style("fill", "white");



});
