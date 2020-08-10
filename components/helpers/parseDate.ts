
/* Turns :
Thu May 07 2020 00:00:00 GMT + 00000 (GMT) 
Thu May 07 2020

*/

function parseDate(date:Date):string {

    let dateStr = date.toString();

    //If length > 15 means we have something with hours in it
    if(dateStr.length > 15){
        dateStr = date.toString().split(":")[0];
        dateStr = dateStr.substr(0,dateStr.length-3)
        return dateStr.trim();    
    }
    else return dateStr.trim();
    
}

export default parseDate