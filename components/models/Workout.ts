import Exercise from "./Exercise"
import parseDate from "../helpers/date/parseDate";

export default class Workout {
    
    id?:number;
    workoutDate: string;
    exercises: Exercise[];

    constructor(_date: Date | string,_exercises:Exercise[],_id?:number) {
        if (_id) this.id = _id;

        if(typeof _date === "string" ) this.workoutDate = _date;
        else this.workoutDate = parseDate(_date);

        this.exercises = _exercises;

      }
     
    //Adds Exercise to exercise array
    addExercise(exercise:Exercise):boolean{
      for (let i = 0; i < this.exercises.length; i++) {
          if(this.exercises[i].name === exercise.name){
            return false
          }
      }
      this.exercises.push(exercise)
      return true
    }


    //Changes Date of exercises to match workoutDate
    changeDate(){
      const date = new Date(this.workoutDate)
      for (let i = 0; i < this.exercises.length; i++) {
        this.exercises[i].points[0].date = date;
      }
    }
}
