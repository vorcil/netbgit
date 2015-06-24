/*

**IMPORTANT** 
The prepData script will find all CSV files within the local repository (inside netbgit/bin/) and concatenate each file to a master JSON file.

**WARNING**
The initial program ASSUMES that there are only 6 CSV files covering the years from 2008 to 2013, any later ADDITIONS require the user to change the variable numFiles from 6 to 6+n where n is an integer and the number of sequential years/CSV files you are adding, so for example including 2014 to the data set will require you to manually set numFiles=7

Also EACH CSV file must have the naming convention of yyyy-Table1.csv Where year must be a year greater or equal to 2014 and include all previous years. For example adding the dataset for 2015, you must include both 2014 and 2015 csv files in the bin folder as 2015-Table1.csv and 2014-Table1.csv

*WARNING*
In each CSV file the location "TSB Bank Arena, Wellington" is not a singular csv element.
Because of the oversight of this format and inconsistent periodicity, each CSV file must be 
manually checked. I could have written some code to deal with this (as I did for the heading problem, removing the BYES and for adding commas at the end of each line i.e. ""TSB Bank Arena, Wellington"," and I may do this later.

**WARNING**
Furthermore a manual addition is required to the heading field of each CSV file to the value "venue" and must become "venue," that is to add a comma to the end

***WARNING!***
The standard output of each CSV file:
First Line: Round,Date,Home Team,Score,Away Team,Venue
Each Consecutive Line: R,"DATE, TIME",TEAM1,N1-N2,TEAM2,LOCATION
Date and time must be encapsulated within quotation marks, if there is no time available and only "DATE", a manual addition of "0", After ""DATE"," is required.
TEAM1 & TEAM2 Must not be in Quotes and be of the standard naming of the team, e.g. Central Pulse. Not central Pulse, or Central-Pulse ect.
N1-N2 deontes the scores for the game, where N1 is attributed to team1 and must be double digits, N2 is attributed to team2 and double digits, no other additions are allowed such as N1-N2 (N3 N4) as in the 2010-Table2.CSV where random scores had seconday points attached. If there are extra stats, those must be excluded from the data and N1-N2 naming convention adopted. 
"LOCATION" or LOCATION is accepted, however NO commas "," are allowed within the LOCATION.

All other differences from standardized CSV convention have been taken into account for and code in place for automatic processing. Such as placing new lines (which aren't allowed in CSV files) for example.



(c) Rajol Kochlashvili 2015 - prepData.js, graph.js, main.js


*/

var numFiles=6;
var files=[];
fileName="bin/2013-Table1.csv";
for(i=0; i<numFiles; i++){
    files[i]=(2008+i+"-Table1.csv");
}

var textFile=[];
//setting the following arrays as global - each of the teams
var array1, array2, array3, array4, array5, array6, array7, array8, array9, array10;
var arrayFile=[];
var arrayJson=[];
var myJson="";

store(fileName);
//splitArrays();






//can put an argument in store
function store(text){
   numByes=0;
    
    var csvFile= new XMLHttpRequest();
    csvFile.open("GET", text, false);
    csvFile.onreadystatechange= function()
    {
	if(csvFile.readyState===4){
	    if(csvFile.statue===200||csvFile.status==0){
		textFile=csvFile.responseText;
		
	    }
	}
    }
    csvFile.send(null);
    //alert(textFile)
    /*fix the first line problem
      1: find position of venue
      2: only include in the file everything after venue
     */
    var n = textFile.search("Venue");
    textFile=textFile.slice(n+6,textFile.length+n+6);
    
    //replace all new lines with commas (because the CSV file is not actually a real CSV file
    textFile=textFile.replace(/\n/g, ",");
   
    //convert the text to elements in an array
    arrayFile=textFile.split(',');

    
    //systematically remove all byes
    for(i=0; i<arrayFile.length; i++){
	//if the string contains byes
	if(arrayFile[i].indexOf("BYES") != -1){
	    //remove previous string(that is the round number
	    numByes++;
	    arrayFile.splice((i-1),1);
	    //remove empty string containing byes
	    arrayFile.splice((i-1),1);
	}
    }
    
    //this leaves several empty values which need to be removed also
    arrayFile = arrayFile.filter(Boolean);
    finalsData=arrayFile;
}
   
//alert(textFile);
//console.log(arrayJson);
//alert(arrayFile);

/*want to split into 10 arrays 
1:"Melbourne Vixens"
2:"New South Wales Swifts"
3:"Queensland Firebirds"
4:"West Coast Fever"
5:"Adelaide Thunderbirds"
6:"Southern Steel"
7:"Central Pulse"
8:"Canterbury Tactix"
9:"Waikato Bay of Plenty Magic"
10:"Northern Mystics"

parse through the entire json - or maybe the array?
extract three pieces of information per and push into the array
want 
*/
/*function returnTeamImage(team){
    
    if(team=="Melbourne Vixens"){
	return "bin/team0.png";}
    if(team=="West Coast Fever"){
	return "bin/team1.png";}
    if(team=="Adelaide Thunderbirds"){
	return "bin/team2.png";}
    if(team=="Queensland Firebirds"){
	return "bin/team3.png";}
    if(team=="New South Wales Swifts"){
	return "bin/team4.png";}
    if(team=="Southern Steel"){
	return "bin/team5.png";}
    if(team=="Central Pulse"){
	return "bin/team6.png";}
    if(team=="Canterbury Tactix"){
	return "bin/team7.png";}
    if(team=="Waikato Bay of Plenty Magic"){
	return "bin/team8.png";}
    if(team=="Northern Mystics"){
	return "bin/team9.png";}
 
}
*/
//create a json of a single team's games, all their games.
function findTeamData(teamName){
    var tempArray=[];
    for(i=3; i<(arrayFile.length); i=i+7){
	//console.log("i is: " + i + " teamName: " + teamName + " arrayFile[i]: " + arrayFile[i+2] + " round: " + arrayFile[i-3]);
	if(arrayFile[i]==teamName){
	    var toPush = {
		"round" : arrayFile[i-3],
		"date" : arrayFile[i-2],
		"time" : arrayFile[i-1],
		"team" : arrayFile[i],
		"score" : arrayFile[i+1],
		"team2" : arrayFile[i+2],
		"location" : arrayFile[i+3]
	    };
	    tempArray.push(toPush);	
	} else if(arrayFile[i+2]==teamName){
	    var toPush= {
		"round" : arrayFile[i-3],
		"date" : arrayFile[i-2],
		"time" : arrayFile[i-1],
		"team" : arrayFile[i],
		"score" : arrayFile[i+1],
		"team2" : arrayFile[i+2],
		"location" : arrayFile[i+3]
	    
	    };
	    tempArray.push(toPush);	
	}
	  
    }
    return tempArray;
    
}
    
function jsonify(){
    for(i=0; i<arrayFile.length; i=i+7){
	var toPush = {
	    "round" : arrayFile[i],
	    "date" : arrayFile[i+1],
	    "time" : arrayFile[i+2],
	    "team1" : arrayFile[i+3],
	    "score" : arrayFile[i+4],
	    "team2" : arrayFile[i+5],
	    "location" : arrayFile[i+6]
	};
	arrayJson.push(toPush);
    }
    myJson = JSON.stringify({arrayJson: arrayJson});
}

