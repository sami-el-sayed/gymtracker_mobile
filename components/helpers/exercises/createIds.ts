import Exercise from "../../models/Exercise";

const createIds = (exercises:Exercise[]):Exercise[] =>{
    for (let i = 0; i < exercises.length; i++) {
        exercises[i].id = i;
      }
      return exercises
}

export default createIds;