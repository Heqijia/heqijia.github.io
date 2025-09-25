var myWords =[{'word': 'dodge', 'size': 57.640058323491274},
 {'word': 'ford', 'size': 100.0},
 {'word': 'cadillac', 'size': 27.515542731794618},
 {'word': 'nissan', 'size': 73.56743542093518},
 {'word': 'ram', 'size': 21.944684743343732},
 {'word': 'toyota', 'size': 65.44965903140834},
 {'word': 'hyundai', 'size': 47.45384544074479},
 {'word': 'volkswagen', 'size': 35.78729167523196},
 {'word': 'mercury', 'size': 13.79332601226772},
 {'word': 'bmw', 'size': 46.40622017823651},
 {'word': 'acura', 'size': 23.070759703536105},
 {'word': 'jeep', 'size': 39.302250529096156},
 {'word': 'infiniti', 'size': 41.231257515500864},
 {'word': 'kia', 'size': 43.84801357381019},
 {'word': 'lexus', 'size': 35.391084655199236},
 {'word': 'chevrolet', 'size': 81.5246522794723},
 {'word': 'subaru', 'size': 22.78050454123359},
 {'word': 'honda', 'size': 55.03821447388623},
 {'word': 'chrysler', 'size': 42.832191771472154},
 {'word': 'mini', 'size': 18.50521119918935},
 {'word': 'mercedes-benz', 'size': 41.21159439593621},
 {'word': 'buick', 'size': 22.89603687561673},
 {'word': 'jaguar', 'size': 12.04523186651806},
 {'word': 'smart', 'size': 5.919309105686521},
 {'word': 'gmc', 'size': 33.516685678253594},
 {'word': 'pontiac', 'size': 21.813720567205646},
 {'word': 'lincoln', 'size': 24.240351587956145},
 {'word': 'mazda', 'size': 28.755836104556387},
 {'word': 'audi', 'size': 24.192923192256384},
 {'word': 'saturn', 'size': 17.208563497229004},
 {'word': 'land rover', 'size': 12.468202057187998},
 {'word': 'porsche', 'size': 11.461260067145862},
 {'word': 'scion', 'size': 13.4528453036932},
 {'word': 'volvo', 'size': 19.028563398991036},
 {'word': 'mitsubishi', 'size': 19.6141603373521},
 {'word': 'tesla', 'size': 1.327094660915434},
 {'word': 'bentley', 'size': 3.3883382625496528},
 {'word': 'ferrari', 'size': 1.0466468757435508},
 {'word': 'hummer', 'size': 9.172685396155197},
 {'word': 'fiat', 'size': 8.864477584461012},
 {'word': 'suzuki', 'size': 9.376765708772776},
 {'word': 'oldsmobile', 'size': 5.733664967870107},
 {'word': 'isuzu', 'size': 4.258637287747277},
 {'word': 'maserati', 'size': 3.233997396453445},
 {'word': 'saab', 'size': 6.808875019406615},
 {'word': 'rolls-royce', 'size': 0.9680966464427578},
 {'word': 'fisker', 'size': 0.5983166318964144},
 {'word': 'aston martin', 'size': 1.2612127259556691},
 {'word': 'geo', 'size': 0.4840483232213789},
 {'word': 'plymouth', 'size': 0.5983166318964144},
 {'word': 'lamborghini', 'size': 0.0},
 {'word': 'daewoo', 'size': 0.0}];

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 500 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_wordcloud = d3.select("#word_cloud_id").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It runs an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
    .size([width, height])
    .words(myWords.map(function (d) { return { text: d.word, size: d.size }; }))
    .padding(5)        //space between words
    .rotate(function () { return ~~(Math.random() * 2) * 90; })
    .fontSize(function (d) { return d.size; })      // font size of words
    .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
    svg_wordcloud
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function (d) { return d.size; })
        .style("fill", function () {
            // Generate a random color
            return "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        })
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .on("click", function (d) {
            // Output the clicked word to the console
            // console.log("Clicked word:", d.text);
            window.make=d.text;
            window.parallel_value_df=0;
            // window.parallel_value_2=0;
            reload_svg_f('model_make_id','model_make.js','model_make_container');
            reload_svg_f('body_make_id','body_make.js','body_make_container');
            reload_svg_f('parallel_id','parallel.js','parallel_container');


            
        })
        .text(function (d) { return d.text; });
}