//load data from image.json file and store in an array
d3.json("teams.json", function(data){
    var jsonImages=data;
    
    /*global variables
      width and height variables are used for calculating the dimensions of the app
      init allows me to figure out if a new banner is the same as the last banner
     */
    var width = 1400, height=1000, initBanner=0,finalClick=1, selectedTeam="null";
    
    // create the main workspace
    var bodySelect = d3.select("body");
    var svg = bodySelect.append("svg")
	.attr("width", 1500)
	.attr("height", 1000);

    //create the two rounded rectangles for the Australia and New Zealand teams
    //official hexidecimal australian colours: #FCD116 and #008751
    //New Zealand colours: #191919 and #E6E6E6
    var AusWindow = svg.append("rect")
	.attr("width", 700)
	.attr("height", 100)
	.attr("x", 75)
	.attr("y", 0)
	.attr("rx", 30)
	.attr("ry", 30)
	.attr("fill", "#FCD116") 
	.attr("stroke", "lightgray")
	.attr("stroke-width", 2);

    var NzWindow = svg.append("rect")
	.attr("width", 700)
	.attr("height", 100)
	.attr("x", 775)
	.attr("y", 0)
	.attr("rx", 30)
	.attr("ry", 30)
	.attr("fill", "#191919")
	.attr("stroke", "lightgray")
	.attr("stroke-width", 2);

    writeText(350,35,"AUSTRALIA", "#008751","30px","visible");
    writeText(1050, 35, "NEW ZEALAND", "#E6E6E6","30px","visible");

    var banner = svg.append("svg")
	.attr("x", 100)
	.attr("y", 150)
	.attr("height", 250)
	.attr("width", 1400);
    
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
	.attr("stroke", "gray")
	.attr("stroke-width", 2)
	.on("click", function(d){
	    clearSelected();
	    d.selected="true"
	    
	    if(initBanner<1){
		var bannerWindow = banner.append("image")
		    .attr("height", 200)
		    .attr("width", 1350)
		    .attr("xlink:href", d.banner);
		initBanner=1;
	    } else if(initBanner>0){
		banner.selectAll("*").remove();
		var BannerWindow = banner.append("image")
		    .attr("height", 200)
		    .attr("width", 1350)
		    .attr("xlink:href", d.banner);
	    }
	    selectedTeam=d.id;
	});
    
    var finals = svg.append("svg");
    //initial draw
    finalsButton();

    
    //START WORK FROM HERE NEXT
    function finalsButton(){
	
	//check initial state of button
	if(finalClick==0){
	    finalClick=1;
	} else {
	    finalClick=0;
	}
	
	//clear finalButton
	finals.selectAll("*").remove();

	//draw viewFinal button and text
	if(finalClick==0){
	    var viewFinals = finals.append("rect")
		.attr("x",625)
		.attr("y", 105)
		.attr("rx", 10)
		.attr("ry", 10)
		.attr("width", 300)
		.attr("height", 50)
		.attr("fill", "#BDC7C5")
	    	.on("click",function(){
		    finalsButton();
		});
	    var viewPrelimText= finals.append("text")
		.attr("x", 705)
		.attr("y", 135)
		.text("VIEW FINALS")
		.attr("font-size", "20px")
		.attr("font-family", "cursive") 
		.attr("fill", "black")
	    	.on("click",function(){
		    finalsButton();
		});
	}
	
	//draw viewPrelim button and text
	if(finalClick==1){
	    var viewPrelim = finals.append("rect")
		.attr("x",625)
		.attr("y", 105)
		.attr("rx", 10)
		.attr("ry", 10)
		.attr("width", 300)
		.attr("height", 50)
		.attr("fill", "#BDC7C5")
	    	.on("click",function(){
		    finalsButton();
		});
	    var viewPrelimText= finals.append("text")
		.attr("x", 705)
		.attr("y", 135)
		.text("PRELIMINARIES")
		.attr("font-size", "20px")
		.attr("font-family", "cursive") 
		.attr("fill", "black")
	    	.on("click",function(){
		    finalsButton();
		});
	}
	
	    
    }








    
    
    //create the three subdivisional workspaces
  
    //inner window color #8EA09D outer #BDC7C5
    var graphWindow = svg.append("rect")
	.attr("width", width-100)
	.attr("height", 400)
	.attr("x", 125)
	.attr("y", 350)
	.attr("rx", 10)
	.attr("ry", 10)
	.attr("fill", "#BDC7C5");

    var analysisWindow = svg.append("rect")
	.attr("width", width-150)
	.attr("height", 200)
	.attr("x", 150)
	.attr("y", 760)
	.attr("fill", "#BDC7C5");




    
    
    /*A safe function to append text with x,y,text,color being:
      x     - the xcoordinate on the application
      y     - the ycoordinate on the application
      text  - the text to parse
      color - the colour name or hexidecimal color to parse
    */
	    function writeText(x,y,text,color,size,visibility){   
	this["var"+text]= svg.append("text")
	    .attr("x", x)
	    .attr("y", y)
	    .text(text)
	    .attr("font-size", size)
	    .attr("font-family", "cursive")
	    .style("visibility", visibility)
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

   
});
  
