import React,{useContext,useEffect,useRef} from 'react';
import {StyleSheet,Text, TouchableOpacity, View, Alert} from 'react-native';
import {SettingsContext} from "../context/SettingsContext"
import {WorkoutContext} from "../context/WorkoutContext"
import {ExerciseContext} from '../context/ExerciseContext';
import DropdownAlert from 'react-native-dropdownalert';




const Settings:React.FC = () => {

  const {showCollapsedWorkouts,switchShowCollapsedWorkouts} = useContext(SettingsContext)

  const {deleteAllWorkouts} = useContext(WorkoutContext)
  const {deleteAllExercises} = useContext(ExerciseContext)


  const DropdownAlertRef = useRef<DropdownAlert | null>(null);


  const setShowCollapsedWorkoutsHandler = (show:boolean) => {
    switchShowCollapsedWorkouts && switchShowCollapsedWorkouts(show);
    DropdownAlertRef?.current?.alertWithType("info","Your Settings have been changed!","Reset your application to see effects")
  }


  //handler for deleting all workouts from storage
  const deleteWorkoutsButtonHandler = () => {
      Alert.alert(
      "Are you sure about deleting All Workouts?",
      "All Your Progress will be gone!",
      [
        { text: "OK", onPress: () => deleteAllWorkouts && deleteAllWorkouts()},
        {text: "Cancel",onPress: () => {}, style: "cancel"},
      ],
      { cancelable: false }
      );
  }

  //handler for deleting all exercises from storage
  const deleteExercisesHandler = () => {
    Alert.alert(
    "Are you sure about deleting All Exercises?",
    "You won't be able to add them to new Workouts!",
    [
      { text: "OK", onPress: () => deleteAllExercises && deleteAllExercises()},
      {text: "Cancel",onPress: () => {}, style: "cancel"},
    ],
    { cancelable: false }
    );
}


  return (
    <View style={styles.Container}>
      <View style={styles.InlineOption}>
        <Text style={styles.Text}>
          Show Collapsed Workouts
        </Text>
        <View style={styles.InlineButtons}>
        <TouchableOpacity
        onPress={()=>setShowCollapsedWorkoutsHandler(true)}
        style={styles.smallButton}
        >
          <Text style={showCollapsedWorkouts === true ? styles.TextActive : styles.Text}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.smallButton}
        onPress={()=>setShowCollapsedWorkoutsHandler(false)}
        >
          <Text style={showCollapsedWorkouts === false ? styles.TextActive : styles.Text}>No</Text>
        </TouchableOpacity>
        </View>
      </View>

     <TouchableOpacity
      style={styles.Button}
      onPress={deleteWorkoutsButtonHandler} 
     >
       <Text style={styles.Text}>
          CLEAR ALL WORKOUTS 
       </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.Button}
      onPress={deleteExercisesHandler} 
     >
       <Text style={styles.Text}>
          CLEAR ALL EXERCISES
       </Text>
    </TouchableOpacity>
    <DropdownAlert ref={DropdownAlertRef}/>
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    backgroundColor: "#1f1f1f",
    height:"100%"
  },
  InlineOption:{
    marginTop:20,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"center"
  },
  InlineButtons:{
    display:"flex",
    flexDirection:"row",
    width:"50%",
    justifyContent:"space-evenly"
  },
  smallButton:{
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    padding: 10,

  },
  Button:{
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    padding: 10,
    marginTop:40,
  },
  Text:{
    color:"#fff"
  },
  TextActive:{
    color: "tomato"
  },

});

export default Settings;
