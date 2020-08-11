import React from 'react';
import {StyleSheet,Text, View, Image} from 'react-native';

import EditIcon from "./icons/edit_icon.png";
import DeleteIcon from "./icons/delete_icon.png";



import Workout from './models/Workout';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props{
    workout:Workout,
    goToEditWorkout:(workout:Workout)=>void,
    deleteWorkout:(workout:Workout)=>void | undefined,
}

const WorkoutView:React.FC<Props> = ({workout,goToEditWorkout,deleteWorkout}) => { 


  //Sets workout to be edited as the workout in this component
  const goToEditWorkoutHandler = () => goToEditWorkout(workout);

  const deleteWorkoutHandler = () => {
    deleteWorkout(workout);
  }
  

  return (
    <View style={styles.Container}>
      <View style={styles.DateContainer}>
        <Text style={styles.Date}>{workout.workoutDate}</Text>
        <TouchableOpacity onPress={goToEditWorkoutHandler}>
          <Image style={styles.Icon} source={EditIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteWorkoutHandler}>
          <Image style={styles.Icon} source={DeleteIcon} />
        </TouchableOpacity>
      </View>
      {workout.exercises.map((exercise)=>{
       return <View key={exercise.name} style={styles.Exercise}>
            <Text style={styles.ExerciseName}>{exercise.name}</Text>
            <View style={styles.ExerciseInfo}>
              <Text style={styles.SetsReps}>{exercise.points[0].sets} x {exercise.points[0].reps} </Text>
              <Text style={styles.Weight}>Weight:  {exercise.points[0].weight}kg</Text>
              <Text style={styles.Status}>{exercise.points[0].status}</Text>
            </View>
          </View>
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    marginTop:12,
    marginBottom:10,
  },
  Date:{
    color:"#fff",
    fontSize:32,
  },
  Icon:{
    width:15,
    height:15,
    marginLeft:15,
    marginRight:15
  },
  DateContainer:{
    backgroundColor : "#3b3b3b",
    width:"80%",
    flexDirection:"row",
    alignItems:"center"
  },
  Exercise:{
    backgroundColor : "#3b3b3b",
    paddingLeft:8,
    marginTop:15,
    marginBottom:5,
    paddingBottom:2,
    width:"60%"
  },
  ExerciseName:{
    fontSize:20,
    color:"#fff"
  },
  ExerciseInfo:{
    paddingLeft:20,
    flexDirection:"row",
  },
  SetsReps:{
    color:"#fff",
    marginRight:5
  },
  Weight:{
    color:"#fff",
    marginRight:5
  },
  Status:{
    color:"#fff",
    textTransform:"uppercase"
  }
});

export default WorkoutView;
