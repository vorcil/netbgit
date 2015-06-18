/*

**IMPORTANT** 
The prepData script will find all CSV files within the local repository (inside netbgit/bin/) and concatenate each file to a master JSON file.

**WARNING**
The initial program ASSUMES that there are only 6 CSV files covering the years from 2008 to 2013, any later ADDITIONS require the user to change the variable numFiles from 6 to 6+n where n is an integer and the number of sequential years/CSV files you are adding, so for example including 2014 to the data set will require you to manually set numFiles=7

Also EACH CSV file must have the naming convention of yyyy-Table1.csv Where year must be a year greater or equal to 2014 and include all previous years. For example adding the dataset for 2015, you must include both 2014 and 2015 csv files in the bin folder as 2015-Table1.csv and 2014-Table1.csv

Rajol Kochlashvili 2015
*/

var numFiles=6;
var files=[];

for(i=0; i<numFiles; i++){
    files[i]=(2008+i+"-Table1.csv");
}

upload();

function upload(){
    var fileUpload= document.getElementById("bin/2008-Table1.csv")
    console.log(fileUpload);
}
