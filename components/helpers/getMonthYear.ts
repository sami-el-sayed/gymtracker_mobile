import getQuarter from "./getQuarter";
import parseDate from "./parseDate";


const getMonthYear = (workoutDate:Date):string => {
    workoutDate = new Date(workoutDate);
    console.log("MONTHHH" + workoutDate.getMonth())
    //+1 Because it starts from 0 
    const quarter: number = getQuarter(workoutDate.getMonth() +1 );
    const year = workoutDate.getFullYear();
    return `q${quarter}-${year}`     
}


export default getMonthYear;