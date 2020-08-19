
const NOTE_LENGTH_LIMIT = 400

const validateNote = (note:string):[boolean,string?] =>{
    if(note.length > 400) return [false,`Note length cant be more than ${NOTE_LENGTH_LIMIT} characters!`];
    else return [true]
}

export default validateNote