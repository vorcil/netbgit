

function drawYears(){
    drawYear("bin/2008-Table1.csv",890,-70);
    drawYear("bin/2009-Table1.csv",990,-70);
    drawYear("bin/2010-Table1.csv",890,-20);
    drawYear("bin/2011-Table1.csv",990,-20);
    drawYear("bin/2012-Table1.csv",890,30);
    drawYear("bin/2013-Table1.csv",990,30);
}

//writes the year button;
function drawYear(path,x,y){
    vis.append("rect")
	.attr("x", x).attr("y", y).attr("width", 100).attr("height", 48)
	.attr("rx", 20).attr("ry",20)
	.attr("fill", "white").attr("stroke", "gray").attr("stroke-width", 2)
	.on("click", function(d) {restart(path)});

    vis.append("text")
	.attr("x", x+30).attr("y",y+30).text(path.substring(4,8))
	.on("click", function(d) {restart(path)});

}

function restart(path){
    d3.select("body").selectAll("*").remove();
    prepFinalData();
    store(path);
   
    all();
     
    
}












    /*
      Functional scripts to assist in *drawing* the page and reduce main.js clutter
    */
    function prepScoreData(d){
	var data=[];
	for(i=0; i<d.length; i++){
	    if(d[i].team==selectedTeam){
		
		var toPush={
		    "date" : d[i].date,
		    "time" : d[i].time,
		    "team" : d[i].team,
		    "team2" : d[i].team2,
		    "location" : d[i].location,
		    "round" : d[i].round,
		    "score" : d[i].score.substring(0,2),
		    "score2" : d[i].score.substring(3,5),
		    "colour" : selectedColour,
		    "colour2" : selectedColour2,
		    "fullscore" : d[i].score
		};
		data.push(toPush);
	    } else
		if(d[i].team2==selectedTeam){
		    var toPush={
			"date" : d[i].date,
			"time" : d[i].time,
			"team" : d[i].team,
			"team2" : d[i].team2,
			"location" : d[i].location,
			"round" : d[i].round,
			"score" : d[i].score.substring(3,5),
			"score2" : d[i].score.substring(0,2),
			"colour" : selectedColour,
			"colour2" : selectedColour2,
			"fullscore" : d[i].score
			
		    };
		    data.push(toPush);
		    
		}
	}
	
	//fill in the missing rounds with 0 values (point 1 scores)
	for(i=0; i<13; i++){
	    
	    if(data[i].round != i+1){
		var temp={
		    "round" : "BYE",
		    "score" : 1,
		    "score2" : 1
		};
		
		data.splice(i, 0, temp);
	    }
	}
	/*if(data[i].score == "w " || data[i].score=="dr"){
	  var temp={
	  "round" : "DRAW",
	  "score" : 1
	  };
	  
	  data.splice(i, 0, temp);
	  }*/
	
	
	return data;
	
    }

    //calculate the averages across the selected team's scores
    function calcAverages(d){
	temp1=0, temp2=0;
	//deal with the draw problem across multiple files
	divis=1;
	if (fileName=="bin/2008-Table1.csv" && (selectedTeam=="West Coast Fever" || selectedTeam=="Central Pulse")){ divis=2;
														   }

	var dataReturn=[];
	for(i=0; i<d.length; i++){
	    if(d[i].score != "w " && d[i].score2 !="dr" && d[i].score != "dr" && d[i].score2 !="w" && d[i].score != "undefined" && d[i].score2 != "undefined"){
		temp1=temp1+parseInt(d[i].score);
		temp2=temp2+parseInt(d[i].score2);
	    }
	}
	
	averages =[temp1/(d.length-divis),temp2/(d.length-divis)]
	for(i=0; i<2; i++){ temp = { "average" : averages[i] };  dataReturn.push(temp)};
	
	
	//var dataReturn = { "average1" : averages[0], "average2" : averages[1]};
	//console.log(dataReturn);
	return dataReturn;
    }


    //A function to return the location of a teamphoto by teamname
    function returnTeamPhoto(name){
	if(name=="Melbourne Vixens"){
	    return "bin/team0.png" }
	if(name=="West Coast Fever"){
	    return "bin/team1.png" }
	if(name=="Adelaide Thunderbirds"){
	    return "bin/team2.png" }
	if(name=="Queensland Firebirds"){
	    return "bin/team3.png" }
	if(name=="New South Wales Swifts"){
	    return "bin/team4.png" }
	if(name=="Southern Steel"){
	    return "bin/team5.png" }
	if(name=="Central Pulse"){
	    return "bin/team6.png"}
	if(name=="Canterbury Tactix"){
	    return "bin/team7.png"}
	if(name=="Waikato Bay of Plenty Magic"){
	    return "bin/team8.png"}
	if(name=="Northern Mystics"){
	    return "bin/team9.png"}
    }





    /*A safe function to append text with x,y,text,color being:
      x     - the xcoordinate on the application
      y     - the ycoordinate on the application
      text  - the text to parse
      color - the colour name or hexidecimal color to parse
    */
    function writeText(x,y,text,color,size,visibility,svg){   
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

    /*Attemp to filter out rounds of finals data*/
    function prepFinalData(){
	chart.selectAll("*").remove();
	banner.selectAll("*").remove();
	svg.selectAll("*").style("opacity", 1);
	svg.selectAll("g").remove();

	var finalBanner = banner.append("image")
	    .attr("xlink:href", "bin/finals-banner.png")
	    .attr("x", 25)
	    .attr("y", 0)
	    .attr("width", 1308)
	    .attr("height", 202);
	
	if(drawnFinal==0){
	    var tempFinalData=finalsData;
	    tempFinalData=tempFinalData.splice(tempFinalData.indexOf("15"),tempFinalData.length);
	    tempSemi1=tempFinalData.splice(0,tempFinalData.indexOf("16"));
	    tempSemi2=tempFinalData.splice(0,tempFinalData.indexOf("17"));
	    tempSemi3=tempFinalData.splice(0,tempFinalData.length);
	    
	    semi1=[];
	    semi2=[];
	    semi3=[];
	    var toPush={
		"round" : tempSemi1[0],
		"date" : tempSemi1[1],
		"time" : tempSemi1[2],
		"team1" : tempSemi1[3],
		"fullscore" : tempSemi1[4],
		"team2" : tempSemi1[5],
		"location" : tempSemi1[6],
		"score" : tempSemi1[4].substring(0,2),
		"score2" : tempSemi1[4].substring(3,5)
	    }
	    var toPush2={
		"round" : tempSemi1[7],
		"date" : tempSemi1[8],
		"time" : tempSemi1[9],
		"team1" : tempSemi1[10],
		"fullscore" : tempSemi1[11],
		"team2" : tempSemi1[12],
		"location" : tempSemi1[13],
		"score" : tempSemi1[11].substring(0,2),
		"score2" : tempSemi1[11].substring(3,5)
	    }
	    
	    semi1.push(toPush);
	    semi1.push(toPush2);
	    
	    var toPush ={
		"round" : tempSemi2[0],
		"date" : tempSemi2[1],
		"time" : tempSemi2[2],
		"team1" : tempSemi2[3],
		"fullscore" : tempSemi2[4],
		"team2" : tempSemi2[5],
		"location" : tempSemi2[6],
		"score" : tempSemi2[4].substring(0,2),
		"score2" : tempSemi2[4].substring(3,5)
	    }
	    semi2.push(toPush);
	    var toPush ={
		"round" : tempSemi3[0],
		"date" : tempSemi3[1],
		"time" : tempSemi3[2],
		"team1" : tempSemi3[3],
		"fullscore" : tempSemi3[4],
		"team2" : tempSemi3[5],
		"location" : tempSemi3[6],
		"score" : tempSemi3[4].substring(0,2),
		"score2" : tempSemi3[4].substring(3,5)
	    }
	    semi3.push(toPush);
	    drawnFinal=1;

	    
	
	}
    }
    

function drawFinal(){
  
    prepFinalData();
    
    
    drawRect(90,50); drawRect(90,150);drawRect(90,275); drawRect(90,375);
    drawRect(490,150); drawRect(490,275);drawRect(890,150); drawRect(890,275);

    chart.append("image")
	.attr("x", 0).attr("y", 20).attr("width", 100).attr("height", 100)
	.attr("xlink:href", returnTeamPhoto(semi1[0].team1));
    chart.append("image")
	.attr("x", 0).attr("y", 120).attr("width", 100).attr("height", 100)
	.attr("xlink:href", returnTeamPhoto(semi1[0].team2));
    chart.append("image")
	.attr("x", 0).attr("y", 250).attr("width", 100).attr("height", 100)
	.attr("xlink:href", returnTeamPhoto(semi1[1].team1));
    chart.append("image")
	.attr("x", 0).attr("y", 350).attr("width", 100).attr("height", 100)
	.attr("xlink:href", returnTeamPhoto(semi1[1].team2));

    
    chart.append("image")
	.attr("x", 400).attr("y", 120).attr("width", 100).attr("height", 100)
	.attr("xlink:href",returnTeamPhoto(semi2[0].team1));
    chart.append("image")
	.attr("x", 400).attr("y", 250).attr("width", 100).attr("height", 100)
	.attr("xlink:href", returnTeamPhoto(semi2[0].team2));

    
    chart.append("image")
	.attr("x", 800).attr("y", 120).attr("width", 100).attr("height", 100)
	.attr("xlink:href", returnTeamPhoto(semi3[0].team1));
    chart.append("image")
	.attr("x", 800).attr("y", 250).attr("width", 100).attr("height", 100)
	.attr("xlink:href", returnTeamPhoto(semi3[0].team2));

    drawText(100,80,semi1[0].team1);drawText(100,180,semi1[0].team2);
    drawText(100,305,semi1[1].team1);drawText(100,410,semi1[1].team2);
    drawText(500,180,semi2[0].team1);drawText(500,305,semi2[0].team2);
    drawText(900,180,semi3[0].team1);drawText(900,305,semi3[0].team2);

    drawLine(390,180,403,180);drawLine(390,80,403,80);
    drawLine(390,300,403,300);drawLine(390,400,395,400);
    drawLine(395,80,395,180);drawLine(395,400,395,300);
    drawLine(790,180,803,180);drawLine(790,300,795,300);
    drawLine(795,180,795,300);drawLine(395,80,855,80);
    drawLine(855,80,855,123);

    drawPoints(360,80,180,semi1[0]);drawPoints(360,305,405,semi1[1]);
    drawPoints(760,180,305,semi2[0]);drawPoints(1160,180,305,semi3[0]);

    
}


function drawRect(x,y){
    chart.append("rect")
	.attr("x", x).attr("y", y).attr("width", 300).attr("height",50)
	.attr("rx", 10).attr("ry", 10).attr("fill", "white")
	.attr("stroke", "gray").attr("stroke-width", 2)
	.on("mouseover", function(d) {d3.select(this).attr("opacity",.8);
				      d3.select(this).attr("fill", selectedColour2)})
	.on("mouseout", function(d) {d3.select(this).attr("opacity",1);
				     d3.select(this).attr("fill","white")});
    
}

function drawText(x,y,name){
    chart.append("text")
	.attr("x", x).attr("y",y).text(name)
	.attr("font-size", "15px").style("font-weight", "bold");
}

function drawLine(x1,y1,x2,y2){
    chart.append("line")
	.style("stroke", "black").style("stroke-width", 3)
	.attr("x1", x1).attr("x2",x2)
	.attr("y1", y1).attr("y2",y2);
}
function drawPoints(x,y,y2,semi){
   
    chart.append("text")
	.attr("x", x).attr("y", y).text(semi.score)
	.attr("fill", function(d) {
	    if(semi.score>semi.score2){
		return "green" }
	    if(semi.score<semi.score2){
		return "red" }
	});
    
    chart.append("text")
	.attr("x", x).attr("y", y2).text(semi.score2)
	.attr("fill", function(d) {
	    if(semi.score2>semi.score){
		return "green" }
	    if(semi.score2<semi.score){
		return "red" }
	});
    

}

