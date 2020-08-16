import React from 'react';
import {StyleSheet,Text, View} from 'react-native';



import Workout from './models/Workout';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props{
    workout:Workout,
    copyWorkout?:(workout:Workout) => void | undefined,
}
//Using this View if no icons nor state is needed like for Copy Workout
const BarebonesWorkoutView:React.FC<Props> = ({workout,copyWorkout}) => { 


  //If coming from Add Workout lets copy Workout when touching date
  const copyWorkoutHandler = () => copyWorkout && copyWorkout(workout);

  
  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={copyWorkoutHandler}>
      <View style={styles.DateContainer}>
        <Text style={styles.Date}>{workout.workoutDate}</Text>   
        </View>
      </TouchableOpacity>
      {workout.exercises.map((exercise)=>{
        return <View key={`${exercise.name+exercise.points[0].sets.toString()
        +exercise.points[0].reps.toString()
        +exercise.points[0].weight.toString()}
        `} style={styles.Exercise}>
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
    fontSize:26,
  },
  DateContainer:{
    width:"95%",
    backgroundColor : "#3b3b3b",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
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

export default BarebonesWorkoutView;
