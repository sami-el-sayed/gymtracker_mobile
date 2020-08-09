
/* Turns :
Thu May 07 2020 00:00:00 GMT + 00000 (GMT) 
Thu May 07 2020
*/

function parseDate(date:Date):string {
    
    let dateStr:string = date.toString().split(":")[0];
    dateStr = dateStr.substr(0,dateStr.length-3)
    return dateStr;
}

export default parseDate