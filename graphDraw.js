/*
Functional scripts to assist in *drawing* the page and reduce main.js clutter
*/

function prepScoreData(d){
    var data=[];
    for(i=0; i<d.length; i++){
	if(d[i].team==selectedTeam){
	    var toPush={
		"round" : d[i].round,
		"score" : d[i].score.substring(0,2)
	    };
	    data.push(toPush);
	} else
	    if(d[i].team2==selectedTeam){
		var toPush={
		    "round" : d[i].round,
		    "score" : d[i].score.substring(3,5)
		};
		data.push(toPush);
	    }
    }
    //fill in the missing rounds with 0 values (point 1 scores)
    
    return data;
}

function drawGraph(data){

    bar.append("rect")
	.attr("y", function(d) { return d.score })
	.attr("height", function(d) { return height - y(d.value); })
	.attr("width", barWidth -1);

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
