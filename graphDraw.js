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
	/*if(data[i].score == "w " || data[i].score=="dr"){
	    var temp={
		"round" : "DRAW",
		"score" : 1
	    };
	    
	    data.splice(i, 0, temp);
	}*/
    }
    return data;
}

//calculate the averages across the selected team's scores
function calcAverages(d){
     temp1=0, temp2=0;
    
    for(i=0; i<d.length; i++){
	if(d[i].score != "dr" && d[i].score2 !="w" && d[i].score != "undefined" && d[i].score2 != "undefined"){
	    temp1=temp1+parseInt(d[i].score);
	    temp2=temp2+parseInt(d[i].score2);
	}
    }
    averages=[temp1/(d.length-(numByes/5)),temp2/(d.length-(numByes/5))]
    console.log("averages: " + averages)
    return averages;
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
