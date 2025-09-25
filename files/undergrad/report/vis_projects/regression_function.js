  function loadModelAndPredict() {
    // d3.csv("https://raw.githubusercontent.com/Heqijia/CSE332_lab5/main/regression_model.csv", function(data) {



    // // Get input values
    //     var using_time = parseInt(document.getElementById('input1').value) || 0;
    //     var odometer = parseInt(document.getElementById('input2').value) || 0;
    //     var car_model = document.getElementById('input3').value || 0;

    //     var b0= parseInt(data[0][car_model]);
    //     var b1=parseInt(data[1][car_model]);
    //     var b2=parseInt(data[2][car_model]);
    //     window.scatter_model=car_model;

    //     console.log(b0,b1,b2,'usingT',using_time);
        

    // // Calculate sum
    //     var specific=b0+b1*using_time+b2*odometer;
    //     var general=parseInt(data[0]['total'])
    //                 +parseInt(data[1]['total'])*using_time
    //                 +parseInt(data[2]['total'])*odometer;
    //     console.log('specific', specific, 'general',general)
    //     result=specific//*0.8+general*0.2
    //     // Display the result
    //     document.getElementById('result').textContent = 'Result: ' + result;
    //     window.predict_coor=[b1*using_time+b2*odometer,result];

    //     reload_svg_f('scatter_id','scatter.js','scatter_container');

    // });


        // Get input values
        var using_time = parseInt(document.getElementById('input1').value) || 0;
        var odometer = parseInt(document.getElementById('input2').value) || 0;
        var car_model = document.getElementById('input3').value || 0;

        // var b0= parseInt(data[0][car_model]);
        // var b1=parseInt(data[1][car_model]);
        // var b2=parseInt(data[2][car_model]);
        window.scatter_model=car_model;
        var input_x=using_time*(-7.209678e+02)+odometer*(-6.936549e-02);

        // console.log(b0,b1,b2,'usingT',using_time);
  

    d3.csv("https://raw.githubusercontent.com/Heqijia/CSE332_lab5/main/car_data_3.csv", function(data) {
        // 将 A 列和 B 列的值转换为数值类型
        data = data.filter(function(d) {
            // 将 'columnA' 替换为实际的列名
            return d['model'] === window.scatter_model;
        });

        data.forEach(function(d) {
            d['com_D'] = parseFloat(d['com_D']);
            d['sellingprice'] = parseFloat(d['sellingprice']);
        });


        // 输入值 a
        var inputValue = input_x;  // 请替换为实际的输入值
        // 调用 K 近邻函数获取最近的 10 行数据
        var nearestNeighbors = kNearestNeighbors(data, inputValue, 10);
        // 计算 B 列的平均值
        var averageB = calculateAverage(nearestNeighbors, 'sellingprice');
        // console.log('nearest___:', nearestNeighbors);

        var resultElement = document.getElementById('result');
        resultElement.textContent = 'Estimated Price: $' + averageB;        // 设置字体样式
// resultElement.style.fontFamily = 'Playpen Sans';
        resultElement.style.color = 'red';
        resultElement.style.fontWeight = 'bold';
        resultElement.style.fontSize = '22px';
        window.predict_coor=[input_x,averageB];

        reload_svg_f('scatter_id','scatter.js','scatter_container');
    });

    function kNearestNeighbors(data, a, k) {
        // 计算每行数据 A 列与 a 的差值的绝对值
        data.forEach(function(d) {
            d.distance = Math.abs(d['com_D'] - a);
        });

        // 根据差值升序排序
        data.sort(function(a, b) {
            return a.distance - b.distance;
        });
        // 选取最近的 k 行数据
        var nearestNeighbors = data.slice(0, k);
        // console.log(nearestNeighbors);
        return nearestNeighbors;
    }

    // 定义计算平均值函数
    function calculateAverage(data, column) {
        var sum = 0;
        data.forEach(function(d) {
            sum += d[column];
        });
        return sum / data.length;
    }
}




