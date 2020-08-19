import React, { useState, useContext,useEffect,useRef, useLayoutEffect } from 'react';
import { Text, StyleSheet,FlatList, View, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import ExerciseFormView from '../ExerciseFormView';
import NoteView from '../NoteView';
import DropdownAlert from 'react-native-dropdownalert';
import DateTimePicker from '@react-native-community/datetimepicker';

import {ExerciseContext} from "../context/ExerciseContext"
import {WorkoutContext} from "../context/WorkoutContext"

import EditIcon from "../icons/edit_icon.png"
import DeleteIcon from "../icons/delete_icon.png"
import NoteIcon from "../icons/note_icon.png"

import Exercise from '../models/Exercise';
import Workout from '../models/Workout';

import addWorkoutValidation from '../helpers/form_validation/addWorkoutValidation';
import checkForDuplicateExercise from '../helpers/exercises/checkforDuplicateExercise';
import createIds from '../helpers/exercises/createIds';
import validateNote from '../helpers/form_validation/noteValidation';

interface Props 
{
  navigation: any;
  route:any;
}

//Screen for adding a new Workout
//If Workout is passed in params it means we want to edit it 
const AddWorkout:React.FC<Props> = ({navigation,route}) => {

  const {editedWorkout} = route.params;
  const {copiedWorkout} = route.params;
  let originalWorkoutDate:Date;




  if(editedWorkout !==undefined) originalWorkoutDate = editedWorkout.workoutDate;


  const {addWorkout,saveEditedWorkout} = useContext(WorkoutContext)
  const {exercises} = useContext(ExerciseContext)

  
  //State related to showing Date
  const [workoutDate,setWorkoutDate] = useState<Date>( editedWorkout ? new Date(editedWorkout.workoutDate) :  new Date())
  const [dateSet,setDateSet] = useState<boolean>(editedWorkout ? true: false)
  const [showDatePicker,setShowDatePicker] = useState<boolean>(false)

  //state for errors
  const DropdownAlertRef = useRef<DropdownAlert | null>(null);

  //state for exercises that we want to add to new workout
  const [localExercises,setLocalExercises] = useState<Exercise[]>( copiedWorkout ? copiedWorkout.exercises :  editedWorkout ? editedWorkout.exercises : [])
  const [exerciseToEdit,setExerciseToEdit] = useState<Exercise | undefined>(undefined)

  //State for note
  const [note,setNote] = useState<string>( editedWorkout?.notes !== undefined ? editedWorkout.notes : "");

  //For KeyboardAvoidingView
  const [keyboardEnabled,setKeyboardEnabled] = useState<boolean>(false)
  const [showExerciseForm,setShowExerciseForm] = useState<boolean>(false)
  const [showNoteForm,setShowNoteForm] = useState<boolean>(false)


  //Changes what the back Arrow does depending on where we are on Add Workout
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ()=> (<HeaderBackButton tintColor="#fff" onPress={() => {
        if (showExerciseForm) setShowExerciseForm(false)
        else if (showNoteForm) setShowNoteForm(false)
        else navigation.navigate("Workouts")
      }}/>)
    })
  }, [navigation,showExerciseForm,showNoteForm]);


  //Sets Ids for exercises on render if editWorkout passed
  //Thanks to this exercises can be edited 
  useEffect(()=>{
    if(editedWorkout){ 
      const exercisesCopy = createIds(localExercises.slice());
      setLocalExercises(exercisesCopy);
    }
  },[editedWorkout])

  //If Copie Workout is passed it sets its exercises to the one being copied
  useEffect(()=>{
    if(copiedWorkout) {
      setLocalExercises(createIds(copiedWorkout.exercises));
      DropdownAlertRef.current?.alertWithType("success","Workout Copied!","Now Pick a Date!");
    }
  
  },[copiedWorkout])

  //Goes to the page that lets copying workouts
  const copyWorkoutHandler=() => {
    navigation.push("Copy Workout");
  }
  

  
  //Resets State when screen is left
  const resetState = () => {
    setWorkoutDate(new Date());
    setDateSet(false);
    setShowDatePicker(false);
    setLocalExercises([]);
    setShowExerciseForm(false);
    setExerciseToEdit(undefined);
  }



  //Changes Date when picked in Picker
  const onDateChange = (event: Event, selectedDate:Date | undefined) => {
    const currentDate = selectedDate || workoutDate;
    setWorkoutDate(currentDate);
    setDateSet(true);
    setShowDatePicker(false);
  };

  //If editedWorkout is present means we want to EditWorkout
  //Else if editedWorkout is not present means we want to Add a Workout
  const addOrEditWorkout = async () => {

    //if boolean false we have an error message
    const workoutValidated:[boolean,string?] = addWorkoutValidation(localExercises);
    if(workoutValidated[0] === false){
      DropdownAlertRef.current?.alertWithType("error","Error!",`${workoutValidated[1]}`);
      return
    }

    //Creates new Workout to Add/Edit
    const newWorkout:Workout = new Workout(workoutDate, localExercises,undefined,note.trim().length > 0 ? note : undefined);

    //If Edited workout means we editing so we save the edit
    if(editedWorkout && saveEditedWorkout && originalWorkoutDate ) {
      const saved:[boolean,string?] =  await saveEditedWorkout(newWorkout,editedWorkout,originalWorkoutDate);
      if(saved[0] !== true){
        DropdownAlertRef.current?.alertWithType("error","Error!",saved[1] ? saved[1] : "An Error Occured");
      }
      else {
        navigation.navigate("Workouts");
        resetState();
      } 
    } 
    //ese we are adding a new Workout
    else if(addWorkout) {
      const saved: [boolean,string?] = await addWorkout(newWorkout)
      if(saved[0] !== true){
        DropdownAlertRef.current?.alertWithType("error","Error!",saved[1] ? saved[1] : "An Error Occured");
      }
      else {
        navigation.navigate("Workouts");
        resetState();
      }
    }
  }

  
  //Shows form for adding Exercise
  const addExerciseHandler = () => {
    setShowExerciseForm(true)
  }

  const editNote = () => {
    setShowNoteForm(true)
  }

  //Adds Exercise to Workout Exercises Array
  //Adds ID for easier editing
  const addExerciseToWorkout = (exerciseToAdd:Exercise) => {
    //Checks for duplicat exercises with every local exercise in the array
    //If it finds one it returns 
    let foundDuplicate:boolean = checkForDuplicateExercise(exerciseToAdd,localExercises);
    //If found duplicate returns after displaying error
    if(foundDuplicate === true){
      DropdownAlertRef.current?.alertWithType("error","Error!", "Found Duplicate Exercise");
      return
    }

    //Adds id for exercise so its easier to edit
    exerciseToAdd.id = localExercises.length;
    setLocalExercises([...localExercises,exerciseToAdd]);
  }
  


  //Edits exercise based on ID
  const editExercise = (readyEditedExercise:Exercise) => {
 
    if(readyEditedExercise.id === undefined) return
    //Checks for duplicat exercises with every local exercise in the array
    //If it finds one it returns 
    let foundDuplicate:boolean = checkForDuplicateExercise(readyEditedExercise,localExercises);
    
    //If found duplicate returns after displaying error
    if(foundDuplicate === true){
      DropdownAlertRef.current?.alertWithType("error","Error!", "Found Duplicate Exercise");
      setExerciseToEdit(undefined)
      return;
    }

    //copies id as the ready to edit exercise doesnt have one and adds it to local exercises
    const exercisesCopy:Exercise[] = localExercises.slice();
    exercisesCopy[readyEditedExercise.id] = readyEditedExercise;
    setLocalExercises(exercisesCopy);
    setExerciseToEdit(undefined);
  } 

  //Sets Exercise to Edit into state
  const exerciseToEditHandler = (exercise:Exercise) => {
    setExerciseToEdit(exercise)
    setShowExerciseForm(true)
  }


  //Deletes local exercise from added/edited workout
  const deleteExercise = (exerciseToDelete:Exercise) => {
    let exercisesCopy:Exercise[] = localExercises.slice();
    exercisesCopy = exercisesCopy.filter(exercise=>exercise.id !== exerciseToDelete.id);
    setLocalExercises(createIds(exercisesCopy));
  }

  const saveNote = (noteToSave:string) => {
    const noteValidated:[boolean,string?] = validateNote(noteToSave);
    if(noteValidated[0] === true){
      setNote(noteToSave)
      setShowNoteForm(false)
    }
    else DropdownAlertRef.current?.alertWithType("error","Error!", `${noteValidated[1]}`);
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
      {localExercises.length === 0 ?
       <TouchableOpacity
       style={styles.ButtonWithMargin}
       onPress={copyWorkoutHandler}
      >
        <Text style={styles.ButtonText}>Copy Workout</Text>
      </TouchableOpacity>
      :
      <View/>
      }
    </View>
    :
    <View>
    {showExerciseForm === false  && showNoteForm === false?
     <View>
       <View style={styles.DateContainer}>
        <Text style={styles.Date}>{workoutDate.toDateString()}</Text>

        <TouchableOpacity onPress={()=>setShowDatePicker(true)}>
          <Image style={styles.Icon} source={EditIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={editNote}>
          <Image style={styles.Icon} source={NoteIcon} />
        </TouchableOpacity>

       </View>
       <FlatList data={localExercises} 
       style={styles.ExercisesList}
       keyExtractor={(item)=>(`${item.name+item.points[0].sets.toString()+item.points[0].reps.toString()+item.points[0].weight.toString()}`)}
       renderItem={({item})=>
       <View style={styles.ExerciseContainer}>
         <View style={styles.ExerciseNameContainer}>
            <Text style={styles.ExerciseTextName}>{item.name}</Text>
         </View>
         <View style={styles.ExerciseStatsContainer}>
          <Text style={styles.ExerciseText}>{item.points[0].sets} x {item.points[0].reps}</Text>
          <Text style={styles.ExerciseText}>{item.points[0].weight}kg</Text>
          <Text style={styles.ExerciseText}>{item.points[0].status}</Text>
          <View style={styles.IconContainer}>
          <TouchableOpacity onPress={()=>exerciseToEditHandler(item)}>
            <Image style={styles.Icon} source={EditIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>deleteExercise(item)}>
            <Image style={styles.Icon} source={DeleteIcon} />
          </TouchableOpacity>
          </View>
         </View>
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
     showExerciseForm === false && showNoteForm === true ?
     <NoteView
     noteProps={note}
     saveNote={saveNote}
     setKeyboardEnabled={setKeyboardEnabled}
     /> 
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
    overflow:"scroll"
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
  IconContainer:{
    width:"30%",
    flexDirection:"row",
    alignItems:"center",
    paddingLeft:8,
    justifyContent:"space-between"
  },
  Icon:{
    width:15,
    height:15,
  },
  DateContainer:{
    backgroundColor : "#3b3b3b",
    paddingLeft:5,
    marginTop:15,
    width:"90%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingRight:40
  },
  ExercisesList:{
    maxHeight:"65%",
    overflow:"scroll",
  },
  ExerciseContainer:{
    width:"95%",
    flexDirection:"row",
    paddingLeft:10,
    flexWrap:"wrap",
    overflow:"scroll",
    alignItems:"center",
    backgroundColor: '#3b3b3b',
    marginTop:16,
  },
  ExerciseNameContainer:{
    marginBottom:5,
  },
  ExerciseTextName:{
    fontSize:16,
    color:"#fff",
    fontWeight:"700"
  },
  ExerciseStatsContainer:{
    flexDirection:"row",
    paddingLeft:10,
    alignItems:"center"
  },
  ExerciseText:{
    fontSize:16,
    color:"#fff",
    marginRight:10
  },
});

export default AddWorkout;
