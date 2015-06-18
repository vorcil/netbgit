//load data from image.json file and store in an array
d3.json("teams.json", function(data){
    var jsonImages=data;
    
    /*global variables
      width and height variables are used for calculating the dimensions of the app
      xselect is used to determine the xposition of the banner arrow of the selected team
     */
    var width = 1200, height=1000, xselect;
    
    // create the main workspace
    var bodySelect = d3.select("body");
    var svg = bodySelect.append("svg")
	.attr("width", 1300)
	.attr("height", 1000);
    
    
    //create the three subdivisional workspaces
  

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
    //New Zealand colours: #191919 and #E6E6E6
    var AusWindow = svg.append("rect")
	.attr("width", 600)
	.attr("height", 100)
	.attr("x", 75)
	.attr("y", 0)
	.attr("rx", 30)
	.attr("ry", 30)
	.attr("fill", "#FCD116") 
	.attr("stroke", "lightgray")
	.attr("stroke-width", 2);

    var NzWindow = svg.append("rect")
	.attr("width", 600)
	.attr("height", 100)
	.attr("x", 675)
	.attr("y", 0)
	.attr("rx", 30)
	.attr("ry", 30)
	.attr("fill", "#191919")
	.attr("stroke", "lightgray")
	.attr("stroke-width", 2);

    writeText(300,35,"AUSTRALIA", "#008751");
    writeText(900, 35, "NEW ZEALAND", "#E6E6E6");

    //Append the images to the application
    var images = svg.selectAll("image")
	.data(jsonImages)
	.enter()
	.append("image");
    
    var imageAttr = images
	.attr("id", function(d) { return d.id})
	.attr("x", function(d) { return d.x_axis})
	.attr("y", function(d) { return d.y_axis})
	.attr("height", function(d) { return d.height})
	.attr("width", function(d) { return d.width})
	.attr("xlink:href", function(d) { return d.image})
	.attr("selected", function(d) { return d.selected})
	.on("click", function(d){
	    clearSelected();
	    d.selected="true"
	    xselect=d.x_axis;
	    selectTransition();
	});
    

    
    /*A safe function to append text with x,y,text,color being:
      x     - the xcoordinate on the application
      y     - the ycoordinate on the application
      text  - the text to parse
      color - the colour name or hexidecimal color to parse
    */
    function writeText(x,y,text,color){   
	this["var"+text]= svg.append("text")
	    .attr("x", x)
	    .attr("y", y)
	    .text(text)
	    .attr("font-size", "30px")
	    .attr("font-family", "cursive")
	//.style("font-weight", "bold")
	    .attr("fill", color);
    }

    
    /*A function to clear all variables of the currently "selected" status and avoid bugs
     */
    function clearSelected(){
	for(i=0; i<jsonImages.length; i++){
	    if(jsonImages[i].selected==="true"){
		jsonImages[i].selected="false";
	    }
	}
    }

    /*A function to transition the selected banner to the next one

     */
    function selectTransition(){
	var bannerWindow = svg.append("rect")
	    .attr("width", width)
	    .attr("height", 100)
	    .attr("x", 75)
	    .attr("y", 150)
	    .attr("rx", 30)
	    .attr("ry", 30)
	    .attr("fill", "lightgray")
	
	var pointerPath = [ {"x":xselect,"y":160},
			    {"x":xselect+50,"y":130},
			    {"x":xselect+100,"y":160},
			    {"x":xselect,"y":160}];
	var lineFunction=d3.svg.line()
	    .x(function(d) { return d.x; })
	    .y(function(d) { return d.y; })
	    .interpolate("linear");
	
	var pointer = svg.append("path")
	    .attr("d", lineFunction(pointerPath))
	    .attr("fill", "lightgray");
    }
 });
