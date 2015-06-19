/*

**IMPORTANT** 
The prepData script will find all CSV files within the local repository (inside netbgit/bin/) and concatenate each file to a master JSON file.

**WARNING**
The initial program ASSUMES that there are only 6 CSV files covering the years from 2008 to 2013, any later ADDITIONS require the user to change the variable numFiles from 6 to 6+n where n is an integer and the number of sequential years/CSV files you are adding, so for example including 2014 to the data set will require you to manually set numFiles=7

Also EACH CSV file must have the naming convention of yyyy-Table1.csv Where year must be a year greater or equal to 2014 and include all previous years. For example adding the dataset for 2015, you must include both 2014 and 2015 csv files in the bin folder as 2015-Table1.csv and 2014-Table1.csv

**WARNING**
Furthermore a manual addition is required to the heading field of each CSV file to the value "venue" and must become "venue," that is to add a comma to the end
Rajol Kochlashvili 2015
*/

var numFiles=6;
var files=[];

for(i=0; i<numFiles; i++){
    files[i]=(2008+i+"-Table1.csv");
}

var textFile=[];
var arrayJson=[];
store("bin/2008-Table1.csv");

//can put an argument in store
function store(text){

    
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
    arrayJson=textFile.split(',');
    
    //systematically remove all byes
    for(i=0; i<arrayJson.length; i++){
	//if the string contains byes
	if(arrayJson[i].indexOf("BYES") != -1){
	    //remove previous string(that is the round number
	    arrayJson.splice((i-1),1);
	    //remove empty string containing byes
	    arrayJson.splice((i-1),1);

	}
    }
   
    //this leaves several empty values which need to be removed also
    arrayJson = arrayJson.filter(Boolean);

    
}
   
//alert(textFile);
//console.log(arrayJson);

