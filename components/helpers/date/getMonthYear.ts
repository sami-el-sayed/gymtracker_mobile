import getQuarter from "../workouts_quarters/getQuarter";


const getMonthYear = (workoutDate:Date):string => {
    workoutDate = new Date(workoutDate);
    //+1 Because it starts from 0 
    const quarter: number = getQuarter(workoutDate.getMonth() +1 );
    const year = workoutDate.getFullYear();
    return `q${quarter}-${year}`     
}


export default getMonthYear;