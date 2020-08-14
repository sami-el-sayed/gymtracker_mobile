import React, { useState, useContext,useEffect,useRef, useCallback } from 'react';
import { Text, StyleSheet,FlatList, View, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import DateTimePicker from '@react-native-community/datetimepicker';

import {ExerciseContext} from "../context/ExerciseContext"
import {WorkoutContext} from "../context/WorkoutContext"

import EditIcon from "../icons/edit_icon.png"
import DeleteIcon from "../icons/delete_icon.png"

import Exercise from '../models/Exercise';
import ExerciseFormView from '../ExerciseFormView';
import Workout from '../models/Workout';
import { useFocusEffect } from '@react-navigation/native';

interface Props 
{
  navigation: any;
  route:any;
}

const AddWorkout:React.FC<Props> = ({navigation,route}) => {

  const {editedWorkout} = route.params;
  let originalWorkoutDate:Date;

  if(editedWorkout !==undefined) originalWorkoutDate = editedWorkout.workoutDate;


  const {addWorkout,saveEditedWorkout} = useContext(WorkoutContext)
  const {exercises} = useContext(ExerciseContext)
  
  const [workoutDate,setWorkoutDate] = useState<Date>( editedWorkout ? new Date(editedWorkout.workoutDate) :  new Date())
  const [dateSet,setDateSet] = useState<boolean>(editedWorkout ? true: false)
  const [showDatePicker,setShowDatePicker] = useState<boolean>(false)
  const DropdownAlertRef = useRef<DropdownAlert | null>(null);

  const [localExercises,setLocalExercises] = useState<Exercise[]>(editedWorkout ? editedWorkout.exercises : [])
  const [showExerciseForm,setShowExerciseForm] = useState<boolean>(false)
  const [exerciseToEdit,setExerciseToEdit] = useState<Exercise | undefined>(undefined)


  //Sets Ids for exercises on render if editWorkout passed
  //Thanks to this exercises can be edited 
  useEffect(()=>{
    if(editedWorkout){ 
      const exercisesCopy = localExercises.slice();
      for (let i = 0; i < localExercises.length; i++) {
        exercisesCopy[i].id = i;
      }
      setLocalExercises(exercisesCopy);
    }
  },[editedWorkout])

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused

      return () => {
        resetState();
      };
    }, [])
  );

  const resetState = () => {
    setWorkoutDate(new Date());
    setDateSet(false);
    setShowDatePicker(false);
    setLocalExercises([]);
    setShowExerciseForm(false);
    setExerciseToEdit(undefined)
  }


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
  const addOrEditWorkout = async () => {

    const newWorkout:Workout = new Workout(workoutDate,localExercises);

    //If Edited workout means we editing so we save the edit
    if(editedWorkout && saveEditedWorkout && originalWorkoutDate ) {
      const saved:[boolean,string?] =  await saveEditedWorkout(newWorkout,editedWorkout,originalWorkoutDate);
      if(saved[0] !== true){
        DropdownAlertRef.current?.alertWithType("error","Error!",saved[1] ? saved[1] : "An Error Occured");
      }
      else navigation.push("Workouts") 
    } 
    //ese we are adding a new Workout
    else if(addWorkout) {
      const saved: [boolean,string?] = await addWorkout(newWorkout)
      if(saved[0] !== true){
        DropdownAlertRef.current?.alertWithType("error","Error!",saved[1] ? saved[1] : "An Error Occured");
      }
      else navigation.push("Workouts") 
    }
  }

  
  //Shows form for adding Exercise
  const addExerciseHandler = () => {
    setShowExerciseForm(true)
  }

  //Adds Exercise to Workout Exercises Array
  //Adds ID for easier editing
  const addExerciseToWorkout = (exercise:Exercise) => {
    exercise.id = localExercises.length;
    setLocalExercises([...localExercises,exercise])
  }


  //Edits exercise based on ID
  const editExercise = (exercise:Exercise) => {
    if(exerciseToEdit === undefined) return
    if(exerciseToEdit.id === undefined) return

    const exercisesCopy:Exercise[] = localExercises.slice();
    exercisesCopy[exerciseToEdit.id] = exercise;

    setLocalExercises(exercisesCopy);
  } 

  //Sets Exercise to Edit into state
  const exerciseToEditHandler = (exercise:Exercise) => {
    setExerciseToEdit(exercise)
    setShowExerciseForm(true)
  }

  //Deletes local exercise from added/edited workout
  const deleteExercise = (exerciseToDelete:Exercise) => {
    setLocalExercises(localExercises.filter(exercise=>exercise.id !== exerciseToDelete.id))
  }


  //Todo Reformat this piece of trash
  return (
    <KeyboardAvoidingView behavior="position" enabled={keyboardEnabled} style={styles.Container}>
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
       <FlatList data={localExercises} 
       keyExtractor={(item)=>item.name}
       renderItem={({item})=>
       <View style={styles.ExerciseContainer}>
         <Text style={styles.ExerciseText}>{item.name}</Text>
         <Text style={styles.ExerciseText}>{item.points[0].sets} x {item.points[0].reps}</Text>
         <Text style={styles.ExerciseText}>{item.points[0].weight}kg</Text>
         <Text style={styles.ExerciseText}>{item.points[0].status}</Text>
         <TouchableOpacity onPress={()=>exerciseToEditHandler(item)}>
          <Image style={styles.Icon} source={EditIcon} />
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>deleteExercise(item)}>
          <Image style={styles.Icon} source={DeleteIcon} />
         </TouchableOpacity>
        </View>} 
       />
       <TouchableOpacity
         style={styles.ButtonWithMargin}
         onPress={addExerciseHandler}
       >
          <Text style={styles.ButtonText}>Add Exercise</Text>
      </TouchableOpacity>
       {localExercises.length > 0 ? 
         <TouchableOpacity
         style={styles.ButtonWithMargin}
         onPress={addOrEditWorkout}
         >
          <Text style={styles.ButtonText}>Save Workout</Text>
        </TouchableOpacity>
       :
        <View/>
       }

     </View>
     :
     <ExerciseFormView
     exerciseNames={exercises}
     exercise={exerciseToEdit}
     editExercise={editExercise}
     addExerciseToWorkout={addExerciseToWorkout} 
     setKeyboardEnabled={setKeyboardEnabled} 
     setShowExerciseForm={setShowExerciseForm}
     dropDownAlert={DropdownAlertRef.current}
     />
    }
    </View>
    }

    <DropdownAlert ref={DropdownAlertRef} />
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
    marginLeft:20,
  },
  DateContainer:{
    backgroundColor : "#3b3b3b",
    paddingLeft:5,
    marginTop:15,
    width:"80%",
    flexDirection:"row",
    alignItems:"center",
  },
  ExerciseContainer:{
    marginTop:15,
    flexDirection:"row",
    backgroundColor : "#3b3b3b",
    alignSelf: 'flex-start',
    alignItems:"center",
    justifyContent:"space-evenly",
    paddingLeft:2,
    paddingRight:15,
  },
  ExerciseText:{
    fontSize:16,
    color:"#fff",
    marginRight:10
  },
});

export default AddWorkout;
