var width = 1200, height=1000;
// create the main workspace
var bodySelect = d3.select("body");
var svg = bodySelect.append("svg")
    .attr("width", 1300)
    .attr("height", 1300);

//create the three subdivisional workspaces
var teamSelect = svg.append("rect")
    .attr("width", width)
    .attr("height", 200)
    .attr("x", 75)
    .attr("y", 0)
    .attr("fill", "gray");

var graphWindow = svg.append("rect")
    .attr("width", width-50)
    .attr("height", 400)
    .attr("x", 100)
    .attr("y", 210)
    .attr("fill", "steelblue");

var analysisWindow = svg.append("rect")
    .attr("width", width-100)
    .attr("height", 200)
    .attr("x", 125)
    .attr("y", 620)
    .attr("fill", "lightsteelblue");

//create the two rounded rectangles for the Australia and New Zealand teams
//official hexidecimal australian colours: #FCD116 and #008751
var AusWindow = svg.append("rect")
    .attr("width", 600)
    .attr("height", 100)
    .attr("x", 75)
    .attr("y", 0)
    .attr("rx", 30)
    .attr("ry", 30)
    .attr("fill", "#FCD116") 
    .attr("stoke", "gray");

writeText(300,300,"AUSTRALIA", "#008751");

function writeText(x,y,text,color){   
this["var"+text]= svg.append("text")
    .attr("x", x)
    .attr("y", y)
    .text(text)
    .attr("font-size", "20px")
    .attr("fill", color);
}

