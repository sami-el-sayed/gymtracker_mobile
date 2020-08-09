import React, { useState, useContext,useEffect } from 'react';
import { Text, StyleSheet,FlatList, View, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {GlobalContext} from "../context/GlobalContext"

import EditIcon from "../icons/edit_icon.png"

import Exercise from '../models/Exercise';
import ExerciseFormView from '../ExerciseFormView';
import Workout from '../models/Workout';

interface Props 
{
  navigation: any;
  route:any;
}

const AddWorkout:React.FC<Props> = ({navigation,route}) => {

  const {editedWorkout} = route.params;
  let originalWorkoutDate:Date;

  if(editedWorkout !==undefined) originalWorkoutDate = editedWorkout.workoutDate;


  const {addWorkout,saveEditedWorkout} = useContext(GlobalContext)
  
  const [workoutDate,setWorkoutDate] = useState<Date>( editedWorkout ? new Date(editedWorkout.workoutDate) :  new Date())
  const [dateSet,setDateSet] = useState<boolean>(editedWorkout ? true: false)
  const [showDatePicker,setShowDatePicker] = useState<boolean>(false)

  const [exercises,setExercises] = useState<Exercise[]>(editedWorkout ? editedWorkout.exercises : [])
  const [showExerciseForm,setShowExerciseForm] = useState<boolean>(false)
  const [exerciseToEdit,setExerciseToEdit] = useState<Exercise | undefined>(undefined)


  //Sets Ids for exercises on render if editWorkout passed
  //Thanks to this exercises can be edited 
  useEffect(()=>{
    if(editedWorkout){ 
      const exercisesCopy = exercises.slice();
      for (let i = 0; i < exercises.length; i++) {
        exercisesCopy[i].id = i;
      }
      setExercises(exercisesCopy);
    }
  },[editedWorkout])

  //For KeyboardAvoidingView
  const [keyboardEnabled,setKeyboardEnabled] = useState<boolean>(false)

  const onDateChange = (event: Event, selectedDate:Date | undefined) => {
    const currentDate = selectedDate || workoutDate;
    setWorkoutDate(currentDate);
    setDateSet(true);
    setShowDatePicker(false);
  };

  //If editedWorkout is present means we want to EditWorkout
  //Else if editedWorkout is not present means we want to Add a Workout
  const addOrEditWorkout = () => {

    const newWorkout:Workout = new Workout(workoutDate,exercises);

    //If Edited workout means we editing so we save the edit
    if(editedWorkout 
      && saveEditedWorkout 
      && originalWorkoutDate ) saveEditedWorkout(newWorkout,originalWorkoutDate)
    //ese we are adding a new Workout
    else if(addWorkout) addWorkout(newWorkout)
    navigation.push("Workouts") 
  }

  
  //Shows form for adding Exercise
  const addExerciseHandler = () => {
    setShowExerciseForm(true)
  }

  //Adds Exercise to Workout Exercises Array
  const addExerciseToWorkout = (exercise:Exercise) => {
    exercise.id = exercises.length;
    setExercises([...exercises,exercise])
  }


  //Edits exercise based on ID
  const editExercise = (exercise:Exercise) => {
    if(exerciseToEdit === undefined) return
    if(exerciseToEdit.id === undefined) return

    const exercisesCopy:Exercise[] = exercises.slice();
    exercisesCopy[exerciseToEdit.id] = exercise;

    setExercises(exercisesCopy);
  } 

  //Sets Exercise to Edit
  const exerciseToEditHandler = (exercise:Exercise) => {
    setExerciseToEdit(exercise)
    setShowExerciseForm(true)
  }



  //Todo Reformat this piece of trash
  return (
    <KeyboardAvoidingView behavior="position" enabled={keyboardEnabled} style={styles.Container}>
     <Text style={styles.Title}> Add your new workout!</Text>
      {showDatePicker && (
        <DateTimePicker maximumDate={new Date()}  mode="date" value={workoutDate ? workoutDate : new Date()} onChange={(event,date)=>onDateChange(event,date)} />
      )}
     {dateSet === false ?
     <View>
      <TouchableOpacity
         style={styles.Button}
         onPress={()=>setShowDatePicker(true)}
      >
          <Text style={styles.ButtonText}>Pick Workout Date</Text>
      </TouchableOpacity>
    </View>
    :
    <View>
    {showExerciseForm === false ?
     <View>
       <View style={styles.DateContainer}>
        <Text style={styles.Date}>{workoutDate.toDateString()}</Text>
        <TouchableOpacity onPress={()=>setShowDatePicker(true)}>
          <Image style={styles.Icon} source={EditIcon} />
        </TouchableOpacity>
       </View>
       <FlatList data={exercises} 
       renderItem={({item})=>
       <View style={styles.ExerciseContainer}>
         <Text style={styles.Exercise}>{item.name}</Text>
         <TouchableOpacity onPress={()=>exerciseToEditHandler(item)}>
          <Image style={styles.Icon} source={EditIcon} />
        </TouchableOpacity>
        </View>} 
       />
       <TouchableOpacity
         style={styles.ButtonWithMargin}
         onPress={addExerciseHandler}
      >
          <Text style={styles.ButtonText}>Add Exercise</Text>
      </TouchableOpacity>
       {exercises.length > 0 ? 
         <TouchableOpacity
         style={styles.ButtonWithMargin}
         onPress={addOrEditWorkout}
         >
          <Text style={styles.ButtonText}>Add Workout</Text>
        </TouchableOpacity>
       :
        <View/>
       }

     </View>
     :
     <ExerciseFormView
     exercise={exerciseToEdit}
     editExercise={editExercise}
     addExerciseToWorkout={addExerciseToWorkout} 
     setKeyboardEnabled={setKeyboardEnabled} 
     setShowExerciseForm={setShowExerciseForm}
     />
    }
    </View>
    }
   
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Container:{
    backgroundColor: "#1f1f1f",
    flex:1,
  },
  Title:{
    backgroundColor : "#3b3b3b",
    color:"#fff",
    fontSize:16,
    marginBottom:20
  },
  Button:{
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    padding: 10,

  },
  ButtonWithMargin:{
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    padding: 10,
    marginTop:20
  },
  ButtonText:{
    fontSize:16,
    color:"#d4d4d4",
    textTransform:"uppercase"
  },
  Date:{
    color:"#fff",
    fontSize:32,
  },
  Icon:{
    width:15,
    height:15,
    marginLeft:10,
  },
  DateContainer:{
    backgroundColor : "#3b3b3b",
    paddingLeft:5,
    width:"70%",
    flexDirection:"row",
    alignItems:"center"
  },
  ExerciseContainer:{
    marginLeft:5,
    marginTop:15,
    flexDirection:"row",
    backgroundColor : "#3b3b3b",
    alignSelf: 'flex-start',
    alignItems:"center",
    paddingLeft:5,
    paddingRight:15,
  },
  Exercise:{
    fontSize:20,
    color:"#fff",
  }
});

export default AddWorkout;
