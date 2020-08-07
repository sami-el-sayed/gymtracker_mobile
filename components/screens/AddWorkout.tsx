import React, { useState, useContext } from 'react';
import { Text, StyleSheet,FlatList, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {GlobalContext} from "../context/GlobalContext"

import Exercise from '../models/Exercise';
import ExerciseFormView from '../ExerciseFormView';
import Workout from '../models/Workout';
import parseDate from '../helpers/parseDate';

interface Props 
{
  navigation: any;
}

const AddWorkout:React.FC<Props> = ({navigation}) => {

  const {addWorkout} = useContext(GlobalContext)
  
  const [workoutDate,setWorkoutDate] = useState<Date>(new Date())
  const [dateSet,setDateSet] = useState<boolean>(false)
  const [showDatePicker,setShowDatePicker] = useState<boolean>(false)

  const [exercises,setExercises] = useState<Exercise[]>([])
  const [showExerciseForm,setShowExerciseForm] = useState<boolean>(false)

  //For KeyboardAvoidingView
  const [keyboardEnabled,setKeyboardEnabled] = useState<boolean>(false)

  const onDateChange = (event: Event, selectedDate:Date | undefined) => {
    const currentDate = selectedDate || workoutDate;
    setWorkoutDate(currentDate);
    setDateSet(true);
    setShowDatePicker(false);
  };


  const addWorkoutHandler = () => {
    const newWorkout:Workout = new Workout(workoutDate,exercises);
    if(addWorkout) addWorkout(newWorkout)
    navigation.push("Workouts") 
  }

  const addExerciseHandler = () => {
    setShowExerciseForm(true)
  }

  const addExerciseToWorkout = (exercise:Exercise) => {
    setExercises([...exercises,exercise])
  }
  
  //Todo Reformat this piece of trash
  return (
    <KeyboardAvoidingView behavior="position" enabled={keyboardEnabled} style={styles.Container}>
     <Text style={styles.Title}> Add your new workout!</Text>
     {dateSet === false ?
     <View>
      <TouchableOpacity
         style={styles.Button}
         onPress={()=>setShowDatePicker(true)}
      >
          <Text style={styles.ButtonText}>Pick Workout Date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker  mode="date" value={workoutDate ? workoutDate : new Date()} onChange={(event,date)=>onDateChange(event,date)} />
      )}
    </View>
    :
    <View>
    {showExerciseForm === false ?
     <View>
       <View style={styles.DateContainer}>
        <Text style={styles.Date}>{parseDate(workoutDate)}</Text>
       </View>
       <FlatList data={exercises} 
       renderItem={({item})=><View style={styles.ExerciseContainer}><Text style={styles.Exercise}>{item.name}</Text></View>} 
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
         onPress={addWorkoutHandler}
         >
          <Text style={styles.ButtonText}>Add Workout</Text>
        </TouchableOpacity>
       :
        <View/>
       }

     </View>
     :
     <ExerciseFormView addExerciseToWorkout={addExerciseToWorkout} setKeyboardEnabled={setKeyboardEnabled} setShowExerciseForm={setShowExerciseForm}/>
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
  DateContainer:{
    backgroundColor : "#3b3b3b",
    width:"70%",
  },
  ExerciseContainer:{
    marginLeft:5,
    marginTop:15,
  },
  Exercise:{
    fontSize:20,
    color:"#fff",
    backgroundColor : "#3b3b3b",
    alignSelf: 'flex-start',
    paddingLeft:5,
    paddingRight:20,
  }
});

export default AddWorkout;
