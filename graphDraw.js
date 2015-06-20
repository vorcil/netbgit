/*
Functional scripts to assist in *drawing* the page and reduce main.js clutter
*/


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
