
const addExerciseValidation = (exerciseString:string):[boolean,string?] =>  {

    if(exerciseString.length === 0) return [false,"The exercise cant be empty!"];

    if(exerciseString.length > 50) return [false,"Length of the exercise cant exceed 50 characters"];
    
    else return [true]
}

export default addExerciseValidation