import React, { useContext,useState } from 'react';
import {StyleSheet,Text, FlatList, View, TouchableOpacity, Alert} from 'react-native';

import {GlobalContext} from "../context/GlobalContext"

import WorkoutView from "../WorkoutView";
import Workout from '../models/Workout';


interface Props 
{
  navigation: any;
}

const Workouts:React.FC<Props> = ({navigation}) => {
 
  const {workouts,deleteWorkout,loadWorkouts} = useContext(GlobalContext)

  //Goes to Add Workout Screen
  //if Workout passed it means we are editing it
  //Else we are adding a new Workout
  const goToAddWorkoutHandler = (workout?:Workout) => {
    if(workout !== undefined) navigation.navigate("Add Workout",{editedWorkout:workout});
    else navigation.navigate("Add Workout",{editedWorkout:undefined});
  }

  //When top of the list is reached tries to download more Workouts
  const loadWorkoutsHandler = () => loadWorkouts && loadWorkouts();

  const deleteWorkoutHandler = (workout:Workout) => {

    if(deleteWorkout === undefined) return;
      
    Alert.alert(
    "Are you sure about deleting this Workout?",
    "The Progress you put in it will be gone!",
    [
      { text: "OK", onPress: () => deleteWorkout(workout) },
      {
        text: "Cancel",onPress: () => {}, style: "cancel"
      },
    ],
    { cancelable: false }
    );


  }

  return (
    <View style={styles.Container}>
      <Text style={styles.Title}> Here are all your Workouts !</Text>
      <FlatList 
      style={styles.List}
      inverted data={workouts} 
      keyExtractor={(item)=> item.workoutDate}
      onEndReached={loadWorkoutsHandler}
      renderItem={({item}) =>
      <WorkoutView 
      deleteWorkout={deleteWorkoutHandler}
      goToEditWorkout={goToAddWorkoutHandler} 
      workout={item}/>}
      />
      <TouchableOpacity
         style={styles.Button}
         onPress={()=>goToAddWorkoutHandler()}
      >
          <Text style={styles.ButtonText}>Add Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    height:"100%",
    backgroundColor: "#1f1f1f",
  },
  Title:{
    backgroundColor : "#3b3b3b",
    color:"#fff",
    fontSize:16,
    marginBottom:10
  },
  List:{
    height:"90%"
  },
  Button:{
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    padding: 10,
    marginTop:5,
  },
  ButtonText:{
    fontSize:16,
    color:"#d4d4d4",
    textTransform:"uppercase"
  }
});

export default Workouts;
