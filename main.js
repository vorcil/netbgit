name="bin/2008-Table1.csv"

all();

function all(){
    
    //load data from image.json file and store in an array
    d3.json("teams.json", function(data){
	var jsonImages=data;
	
	/*global variables
	  width and height variables are used for calculating the dimensions of the app
	  init allows me to figure out if a new banner is the same as the last banner
	*/
	var width = 1400, height=1000, initBanner=0;
	finalClick=1;
	drawnFinal=0;
	selectedTeam="null";
	selectedTeam2="null";
	chartTeam="null";
	chartTeam2="null";
	graphInit="false";
	selectedColour="null";
	selectedColour2="null";
	fullscore="null";
	selectedLocation="null";
	selectedDate="null";
	averages="null";
	
	// create the main workspace
	var bodySelect = d3.select("body");
	svg = bodySelect.append("svg")
	    .attr("width", 1500)
	    .attr("height", 1500);

	banner = svg.append("svg")
	    .attr("x", 100)
	    .attr("y", 165)
	    .attr("height", 250)
	    .attr("width", 1400);
	
	var info = banner.append("image")
	    .attr("x", 250)
	    .attr("y", -75)
	    .attr("height", 400)
	    .attr("width", 850)
	    .attr("xlink:href", "bin/prompt.png");
	
	var ausbg = svg.append("image")
	    .attr("xlink:href", "bin/au-bg.png")
	    .attr("x", 75)
	    .attr("y", 0)
	    .attr("height", 150)
	    .attr("width", 700)
	var nzbg = svg.append("image")
	    .attr("xlink:href", "bin/nz-bg.png")
	    .attr("x", 775)
	    .attr("y", 0)
	    .attr("height", 150)
	    .attr("width", 700);
	var graphbg = svg.append("image")
	    .attr("xlink:href", "bin/graph-bg.png")
	    .attr("x", 140)
	    .attr("y", 365)
	    .attr("height", 500)
	    .attr("width", 1270);
	var statsbg=svg.append("image")
	    .attr("xlink:href", "bin/info-bg.png")
	    .attr("x", 140)
	    .attr("y", 865)
	    .attr("height", 210)
	    .attr("width", 1270);
	var finalsbtn=svg.append("image")
	    .attr("xlink:href", "bin/finals-btn.png")
	    .attr("x", 675)
	    .attr("y", 133)
	    .attr("width", 208)
	    .attr("height", 46)
	    .style("opacity", 0)
	    .on("click", function(d){
		d3.selectAll("*").transition().style("opacity", 1);
		d3.select(this).transition().style("opacity", .7);
		prepFinalData();
		drawFinal();
	
	    });
	
	
	
	
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
		    d3.selectAll("*").style("opacity", 1);
		    d3.select(this).transition().style("opacity", .7);
		    svg.selectAll("text").remove();
		    svg.selectAll("g").remove();
		    
		    
		    clearSelected();
		    d.selected="true"
		    
		    //for global selected team colour
		    selectedColour=d.colour;
		    selectedColour2=d.colour2;
		    if(initBanner<1){
			var bannerWindow = banner.append("image")
			    .attr("height", 200)
			    .attr("width", 1350)
			    .attr("y", 5)
			    .attr("xlink:href", d.banner);
			initBanner=1;
		    } else if(initBanner>0){
			banner.selectAll("*").remove();
			
			var BannerWindow = banner.append("image")
			    .attr("height", 200)
			    .attr("width", 1350)
			    .attr("y", 5)
			    .attr("xlink:href", d.banner);
		    }
		    
		    //check if banner or not
		    if(graphInit=="true"){
			chart.selectAll("*").remove();
		
		    }
		    selectedTeam=d.id;
		    test();
		    drawPieAverages();
		    
		}
	    });
	
	
	
	function changeYear(){
	    bodySelect.selectAll("*").remove();
	    all();
	}
	//initial draw
	//finalsButton();






	function test(){
	    teemp=prepScoreData(findTeamData(selectedTeam));
	    averages=calcAverages(teemp);
	    graphInit="true";
	    
	    chart = d3.select("svg").append("svg")
		.attr("width", 1200)
		.attr("height", 500)
		.attr("x", 180)
		.attr("y", 375);
	    var vis=d3.select("#chart").append("svg:svg")
		.attr("width", 100)
		.attr("height", 100);
	    
	    //var margin = {top: 20, right:20, bottom:70, left:40};

	    var x = d3.scale.ordinal().rangeRoundBands([0, 1200], .1);

	    var y = d3.scale.linear().range([450, 0]);

	    var xAxis = d3.svg.axis().scale(x).orient("bottom");

	    var yAxis = d3.svg.axis().scale(y).orient("left");

	    /*var chart = d3.select("body").append("svg")
	      .attr("width", width+margin.left + margin.right)
	      .attr("height", height+margin.top + margin.bottom)
	      .append("g")
	      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

	    x.domain(teemp.map(function(d) { return d.round; }));
	    y.domain([0, 100]);

	    svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(180,825)")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", "-.55em")
		.style("fill", selectedColour2)
		.attr("transform", "translate(35,25)");

	    chart.append("g")
	      .attr("class", "y axis")
	      .attr("transform", "translate(30, 0)")
	      .call(yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 0)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Points");
	    
	    chart.selectAll("bar")
		.data(teemp)
		.enter().append("rect")
		.style("fill", function(d) { return d.colour; })
		.attr("x", function(d) { return 20+x(d.round);})
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.score);})
		.attr("height", function(d) { return 450 - y(d.score);})
		.on("mouseover", function(d){
		    //console.log("team1: " + teemp.team + "  team2: " + teemp.team2);
		    d3.select(this)
			.style("fill", function(d) { return d.colour2;})
		    
		    if(selectedTeam==d.team2){selectedTeam2=d.team;}
		    if(selectedTeam==d.team){selectedTeam2=d.team2;}
		    chartTeam=d.team;
		    chartTeam2=d.team2;
		    fullscore=d.fullscore;
		    selectedDate=d.date;
		    selectedLocation=d.location;
		    
		    
		    chart.append("svg:image")
			.attr("xlink:href", function(d) { return returnTeamPhoto(chartTeam)})
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 150)
			.attr("height", 150);
		    
		    chart.append("svg:image")
			.attr("xlink:href", function(d){ return returnTeamPhoto(chartTeam2)})
			.attr("x", 1050)
			.attr("y", 0)
			.attr("width", 150)
			.attr("height", 150);

		    chart.append("circle")
			.style("opacity", .5)
			.attr("cx", 625)
			.attr("cy", -50)
			.attr("r", 250)
			.attr("fill", "white")
			.attr("stroke", "gray")
			.attr("stroke-width", 2);
		    
		    
		    chart.append("text")
			.attr("x", 560)
			.attr("y", 140)
			.text(fullscore)
			.attr("font-size", 40)
			.attr("fill", function(d) { return selectedColour2});

		    chart.append("text")
			.attr("x", 550)
			.attr("y", 90)
			.text(selectedDate)
			.attr("font-size", 20)
			.attr("fill", function(d) { return selectedColour2});
		    
		    chart.append("text")
			.attr("x", function(d,i){return 500-teemp[i].location.length})
			.attr("y", 50)
			.text(selectedLocation)
			.attr("font-size", 15)
			.attr("fill", function(d) { return selectedColour2});		
		})
		.on("mouseout", function(){
		    d3.select(this).style("fill", function(d) { return d.colour; })
		    chart.selectAll("image").remove();
		    chart.selectAll("text").remove();
		    chart.selectAll("circle").remove();
		});
	    //an array of [selected team seasona average, rival teams season average] 
	    //bottom part of the graph
	}
	
	function drawPieAverages(){
	    
	    var colour=[selectedColour,selectedColour2];
	    
	    vis= svg.append("svg")
		.attr("x", 180)
		.attr("y", 875)
		.attr("width", 1200)
		.attr("height", 500)
		.append("g")
		.attr("transform", "translate(100,100)");

	    var arc = d3.svg.arc().outerRadius(80).innerRadius(0);
	    var pie = d3.layout.pie().value(function(d){ return d.average;});
	    var g = vis.selectAll(".arc")
		.data(pie(averages))
		.enter()
		.append("g")
		.attr("class", "arc");

	    g.append("path")
		.attr("fill", function(d,i) { return colour[i];})
		.attr("d", arc)
		.attr("x", 100)
		.attr("y", 100);

	    vis.append("rect")
		.attr("x", 125)
		.attr("y", 0)
		.attr("rx", 10)
		.attr("ry", 10)
		.attr("width", 50)
		.attr("height", 50)
		.attr("fill", "white")
		.attr("stroke", "gray")
		.attr("stroke-width", 2);
	    
	    vis.append("rect")
		.attr("x", -100)
		.attr("y", -100)
		.attr("rx", 10)
		.attr("ry", 10)
		.attr("width", 300)
		.attr("height", 25)
		.attr("fill", "white")
		.attr("stroke", "gray")
		.attr("stroke-width", 2);
	    
    	    vis.append("image")
		.attr("xlink:href", function(d) { return returnTeamPhoto(selectedTeam)} )
		.attr("x", 100)
		.attr("y", -75)
		.attr("width", 100)
		.attr("height", 100)
	    vis.append("image")
		.attr("xlink:href", function(d) { return returnTeamPhoto2(selectedTeam)})
		.attr("x", 205)
		.attr("y", -100)
		.attr("height", 190)
		.attr("width", 675);
	    
	    vis.append("text")
		.attr("x", 140)
		.attr("y", 38)
		.style("fill", selectedColour)
		.text(averages[0].average.toPrecision([2]));

	    vis.append("text")
		.attr("x", -80)
		.attr("y", -80)
		.style("fill", selectedColour)
		.text("AVERAGE POINTS PER GAME");

	    vis.append("rect")
		.attr("x",940).attr("y", -97).attr("rx",10).attr("ry",10).attr("width",100)
		.attr("height",25).attr("fill","white").attr("stroke","gray").attr("stroke-width",2);

	    vis.append("text").attr("x",946).attr("y",-80).style("fill",selectedColour2)
		.text("Select Year");
	    


	    drawYears();

	    /*
	      vis.selectAll("rect")
	      .data(averages)
	      .enter().append("rect")
	      .style("fill", function(d,i){return colour[i]})
	      .attr("x", function(d,i){return 100+(100*i);})
	      .attr("width", function(d) {return d.average})
	      .attr("y", 0)
	      .attr("height", function(d) {return d.average});*/
	    
	    //pie = d3.layout.pie().value(function(d){return d.
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
	/*function finalsButton(){
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
	*/
    });
    
}
