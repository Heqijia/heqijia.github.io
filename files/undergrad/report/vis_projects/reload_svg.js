function reload_svg_f(svgid,source,svg_div){
    var oldDiv = document.getElementById(svgid);
    var parentElement = oldDiv.parentNode;
  
    // 创建一个新的div元素
    var newDiv = document.createElement('div');
    newDiv.className = svg_div;
    newDiv.id = svgid; // 设置新div元素的id属性
  
    // // 使用 replaceChild 方法将新的div元素替换为旧的div元素
    parentElement.replaceChild(newDiv, oldDiv);
    var script = document.createElement("script");
    script.src = source;
    document.head.appendChild(script);
}

function removeElementById(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
      element.parentNode.removeChild(element);
    }
}
window.reload_svg_f = reload_svg_f;


function getRandomColor() {
    // 生成随机的 R、G 和 B 值（0 到 255）
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
  
    // 使用 RGB 值创建颜色字符串
    var color = "rgb(" + r + "," + g + "," + b + ")";
  
    return color;
  }
  window.getRandomColor=getRandomColor

