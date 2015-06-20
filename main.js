//load data from image.json file and store in an array
d3.json("teams.json", function(data){
    var jsonImages=data;
    
    /*global variables
      width and height variables are used for calculating the dimensions of the app
      init allows me to figure out if a new banner is the same as the last banner
     */
    var width = 1400, height=1000, initBanner=0;
    finalClick=1;
    selectedTeam="null";
    
    // create the main workspace
    var bodySelect = d3.select("body");
    var svg = bodySelect.append("svg")
	.attr("width", 1500)
	.attr("height", 1000);

    var banner = svg.append("svg")
	.attr("x", 100)
	.attr("y", 165)
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
	    //check if banner - stops the au-bg and nz-bg from being clickable
	    if(d.button="true"){
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
		
	    }//check if banner or not
	    selectedTeam=d.id;
	    test();
	    //drawGraph(prepScoreData(findTeamData(selectedTeam)));
	});

    
    var finals = svg.append("svg");
    //initial draw
    finalsButton();








    function test(){
	teemp=prepScoreData(findTeamData(selectedTeam));
	
	//create the three subdivisional workspaces
	//graph window
	svg.selectAll("rect")
	    .data(teemp)
	    .enter()
	    .append("rect")
	    .attr("x", function(d) { return d.round*100})
	    .attr("y", 500)
	    .attr("width", 90)
	    .attr("height", function(d) { return d.score})
	    .attr("fill", "red");
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
    
    //this function initializes the finals button and sets it's state
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
    //end of finals function
   
});
  
