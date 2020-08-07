import React from 'react';
import {StyleSheet,Text, View, Image} from 'react-native';

import EditIcon from "./icons/edit_icon.png";

import parseDate from "./helpers/parseDate"

import Workout from './models/Workout';


interface Props{
    workout:Workout
}

const WorkoutView:React.FC<Props> = ({workout}) => { 

  return (
    <View style={styles.Container}>
      <View style={styles.DateContainer}>
        <Text style={styles.Date}>{parseDate(workout.workoutDate)}</Text>
        <Image style={styles.Icon} source={EditIcon} />
      </View>
      {workout.exercises.map((exercise)=>{
       return <View style={styles.Exercise}>
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
    marginLeft:5,
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
