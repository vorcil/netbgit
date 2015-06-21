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
		"location" : d[i].team2,
		"round" : d[i].round,
		"score" : d[i].score.substring(0,2),
		"colour" : selectedColour,
		"colour2" : selectedColour2
	    };
	    data.push(toPush);
	} else
	    if(d[i].team2==selectedTeam){
		var toPush={
		    "date" : d[i].date,
		    "time" : d[i].time,
		    "team" : d[i].team,
		    "team2" : d[i].team2,
		    "location" : d[i].team2,
		    "round" : d[i].round,
		    "score" : d[i].score.substring(3,5),
		    "colour" : selectedColour,
		    "colour2" : selectedColour2
		};
		data.push(toPush);
	    }
    }
    //fill in the missing rounds with 0 values (point 1 scores)
    for(i=0; i<13; i++){
	console.log(data[i].score)
	if(data[i].round != i+1){
	    var temp={
		"round" : "BYE",
		"score" : 1
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
