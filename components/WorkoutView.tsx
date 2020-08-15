import React from 'react';
import {StyleSheet,Text, View, Image} from 'react-native';

import EditIcon from "./icons/edit_icon.png";
import DeleteIcon from "./icons/delete_icon.png";



import Workout from './models/Workout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Exercises from './screens/Exercises';


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
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={goToEditWorkoutHandler}>
            <Image style={styles.Icon} source={EditIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteWorkoutHandler}>
            <Image style={styles.Icon} source={DeleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {workout.exercises.map((exercise)=>{
       return <View key={workout.exercises.indexOf(exercise).toString()} style={styles.Exercise}>
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
  DateContainer:{
    width:"95%",
    backgroundColor : "#3b3b3b",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  IconContainer:{
    flexDirection:"row"
  },
  Icon:{
    width:20,
    height:20,
    marginRight:30
  },
  Exercise:{
    backgroundColor : "#3b3b3b",
    paddingLeft:5,
    paddingRight:10,
    marginTop:15,
    marginBottom:5,
    paddingBottom:2,
    maxWidth:"75%"
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
