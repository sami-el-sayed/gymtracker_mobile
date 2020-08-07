import Exercise from "./Exercise"

export default class Workout {
    
    id?:number;
    workoutDate: Date;
    exercises: Exercise[];

    constructor(_date: Date,_exercises:Exercise[],_id?:number) {
        if (_id) this.id = _id;
        this.workoutDate = _date;
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
      for (let i = 0; i < this.exercises.length; i++) {
        this.exercises[i].points[0].date = this.workoutDate;
      }
    }
}
