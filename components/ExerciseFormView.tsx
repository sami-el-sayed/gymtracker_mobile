import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import {Picker} from "@react-native-community/picker"
import Point from './models/Point';
import Exercise from './models/Exercise';
import DropdownAlert from 'react-native-dropdownalert';
import addExerciseToWorkoutValidation from './helpers/form_validation/addExerciseToWorkoutValidation';

interface Props{
    exercise?:Exercise,
    exerciseNames:string[] | undefined,
    editExercise:(exercise:Exercise)=>void,
    addExerciseToWorkout:(exercise:Exercise) => void,
    setShowExerciseForm:Function,
    setKeyboardEnabled:Function,
    dropDownAlert:DropdownAlert | null,
}

//View for adding Exercises to Workout
//Exercise Can be Passed for editing it 
const ExerciseFormView:React.FC<Props> = ({exerciseNames, exercise,setShowExerciseForm,addExerciseToWorkout,editExercise,setKeyboardEnabled,dropDownAlert}) => {
    
 //If Exercise is passed loads exercise parameters into form
 const [exerciseForm,setExerciseForm] = useState({
    //Had Error where name was "" on adding new exercise
    //Hack way to fix it take the first element of the array 
     name: exercise ? exercise.name : exerciseNames ? exerciseNames[0] : "",
     sets:exercise ? exercise.points[0].sets.toString() : "",
     reps:exercise ? exercise.points[0].reps.toString() : "",
     weight:exercise ? exercise.points[0].weight.toString() : "",
     status: exercise ? exercise.points[0].status.toString() : "success"
 });

 //Handler which determines which parameter of the workout form should be changed based on input
 const onChangeHandler = (parameter:string,value:string) => {

    switch (parameter) {
        case "name":
            setExerciseForm({...exerciseForm,name:value})
            break;
        case "sets":
            setExerciseForm({...exerciseForm,sets:value})
            break;
        case "reps":
            setExerciseForm({...exerciseForm,reps:value})
            break;
        case "weight":
            setExerciseForm({...exerciseForm,weight:value})
            break;
        case "status":
            setExerciseForm({...exerciseForm,status:value})
            break;
        default:
            break;
    }
 }

 //Creates and adds Exercise then hides component
 //If Exercise was passed means we are editing it
 //So it doesnt add the Exercise, it edits it 
 const saveHandler = () => {

    if(
        exerciseForm.name === "" ||  exerciseForm.sets === "" ||
        exerciseForm.reps === "" || exerciseForm.weight === "" ||
        exerciseForm.status === "" )
    {   
        if(dropDownAlert !== null){
            dropDownAlert.alertWithType("error","Error!","Fill out every field!")
        }
        return;
    }
    
    const point:Point = new Point(
        new Date(),
        parseInt(exerciseForm.sets),
        parseInt(exerciseForm.reps),
        parseFloat(exerciseForm.weight),
        exerciseForm.status,
    )
    
    //Creates ready exercise, if exercise present we can copy its Id
    const newExercise = new Exercise(exerciseForm.name,[point]);
    if(exercise !== undefined){
        newExercise.id = exercise.id
    }

    const exerciseValidated = addExerciseToWorkoutValidation(newExercise);

    if(exerciseValidated[0]===false){
        if(dropDownAlert !== null){
            dropDownAlert.alertWithType("error","Error!",`${exerciseValidated[1]}`)
        }
        return;
    }

    
    //If Exercise was passed means we dont want to add one, we want to edit it
    if(exercise)  editExercise(newExercise);
    else  addExerciseToWorkout(newExercise);

    setShowExerciseForm(false);
 }
 


  return (
    <>
      <Text style={styles.Title}>Exercise Name</Text>
      <View style={styles.PickerView}>
        <Picker
           selectedValue={exerciseForm.name}
           style={styles.Picker}
           onValueChange={(itemValue) => onChangeHandler("name",itemValue.toString())}
         >
           {exerciseNames && (exerciseNames.map((exerciseName)=>{
                 return(
                       <Picker.Item key={exerciseName} label={exerciseName} value={exerciseName.toString()} />
                 )
           }))}          
        </Picker>
      </View>
      <Text style={styles.Title}>Sets</Text>
      <TextInput
          keyboardType="numeric"
          onFocus={()=>setKeyboardEnabled(false)}
          style={styles.TextInputNumber}
          onChangeText={text => onChangeHandler("sets",text)}
          value={exerciseForm.sets}
      />
      <Text style={styles.Title}>Reps</Text>
      <TextInput
          keyboardType="numeric"
          onFocus={()=>setKeyboardEnabled(false)}
          style={styles.TextInputNumber}
          onChangeText={text => onChangeHandler("reps",text)}
          value={exerciseForm.reps}
      />
      <Text style={styles.Title}>Weight (kg)</Text>
      <TextInput
          keyboardType="numeric"
          onFocus={()=>setKeyboardEnabled(true)}
          style={styles.TextInputNumber}
          onChangeText={text => onChangeHandler("weight",text)}
          value={exerciseForm.weight}
      />
      <Text style={styles.Title}>Status</Text>
      <View style={styles.PickerView}>
        <Picker
          selectedValue={exerciseForm.status}
          style={styles.Picker}
          onValueChange={(itemValue) => onChangeHandler("status",itemValue.toString())}
        >
          <Picker.Item label="SUCCESS" value="success" />
          <Picker.Item label="FAIL" value="fail" />
        </Picker>
      </View>
      <TouchableOpacity
         style={styles.Button}
         onPress={saveHandler}
         >
          <Text style={styles.ButtonText}>Save</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
    Title:{
        backgroundColor:"#3b3b3b",
        width:"30%",
        marginBottom:10,
        marginTop:10,
        fontSize:16,
        color:"#fff"
    },
    TextInput:{
        height:40,
        backgroundColor:"#3b3b3b",
        color:"#fff",
        fontSize:16,
    },
    TextInputNumber:{
        height:40,
        width:50,
        backgroundColor:"#3b3b3b",
        color:"#fff",
        fontSize:16,
    },
    Button:{
        alignItems: 'center',
        backgroundColor: '#3b3b3b',
        padding: 10,
        marginTop:40
    
      },
    ButtonText:{
        fontSize:16,
        color:"#d4d4d4",
        textTransform:"uppercase"
    },
    Picker:{
        color:"#fff",
    },
    PickerView:{
        backgroundColor: '#3b3b3b',
    }
});

export default ExerciseFormView;
