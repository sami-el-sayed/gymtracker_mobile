import Exercise from "components/models/Exercise";

const sortExercisesByName = (exercises:Exercise[]):Exercise[] =>{
    return exercises.sort((a,b)=>a.name.localeCompare(b.name))
}

export default sortExercisesByName