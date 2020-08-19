import React,{useState} from 'react';
import {StyleSheet,Text, View, Image} from 'react-native';

import EditIcon from "./icons/edit_icon.png";
import DeleteIcon from "./icons/delete_icon.png";

import Workout from './models/Workout';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props{
    workout:Workout,
    goToEditWorkout?:(workout:Workout)=>void | undefined,
    deleteWorkout?:(workout:Workout)=>void | undefined,
    //From Global Settings
    //if true collapse and dont show exercises on load
    showCollapsedWorkouts:boolean | undefined,
    //if true show weight in Lbs

}
//View of single Workout 
const WorkoutView:React.FC<Props> = ({workout,goToEditWorkout,deleteWorkout,showCollapsedWorkouts}) => { 

  //Collapse exercises for Workout
  const [collapsed,setCollapsed] = useState<boolean>(showCollapsedWorkouts ? showCollapsedWorkouts : false)


  //Sets workout to be edited as the workout in this component
  const goToEditWorkoutHandler = () => goToEditWorkout && goToEditWorkout(workout);

  //Deletes the passed Workout
  const deleteWorkoutHandler = () =>  deleteWorkout && deleteWorkout(workout);

  const switchCollapsed = () => setCollapsed(!collapsed)
  
  return (
    <View style={styles.Container}>
      <View style={styles.DateContainer}>
        <Text style={styles.Date}>{workout.workoutDate}</Text>
            {goToEditWorkout !== undefined ?
            //If goToEditWorkout === undefined means we coming from add Workout
            //So we dont need icons
            <View style={styles.IconContainer}>
               {showCollapsedWorkouts=== true ?
        <View style={collapsed=== false ? styles.ExpandIconContainerRotated : styles.ExpandIconContainer}>
         <TouchableOpacity onPress={switchCollapsed}>
            <Text style={styles.ExpandIcon}>V</Text>
         </TouchableOpacity>
         </View>
         :
         <View/>
        }
            <TouchableOpacity onPress={goToEditWorkoutHandler}>
                <Image style={styles.Icon} source={EditIcon} />
            </TouchableOpacity>
             <TouchableOpacity onPress={deleteWorkoutHandler}>
             <Image style={styles.Icon} source={DeleteIcon} />
           </TouchableOpacity>
           </View>
            :
            <View/>
            }            
        </View>
      {collapsed === false ? 
        workout.exercises.map((exercise)=>{
        return <View key={`${exercise.name+exercise.points[0].sets.toString()
        +exercise.points[0].reps.toString()
        +exercise.points[0].weight.toString()}
        `} style={styles.Exercise}>
            
            <Text style={styles.ExerciseName}>{exercise.name}</Text>
            <View style={styles.ExerciseInfo}>
              <Text style={styles.SetsReps}>{exercise.points[0].sets} x {exercise.points[0].reps} </Text>
              <Text style={styles.Weight}>Weight: {exercise.points[0].weight}kg</Text>
              <Text style={styles.Status}>{exercise.points[0].status}</Text>
            </View>
          </View>
      })
      :
      <View/>
      }
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
    fontSize:24,
  },
  DateContainer:{
    width:"95%",
    backgroundColor : "#3b3b3b",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  IconContainer:{
    width:"40%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingRight:20,
  },
  Icon:{
    width:20,
    height:20,
  },
  ExpandIcon:{
    color:"#fff",
    fontWeight:"700",
    fontSize:26,
  },
  ExpandIconContainer:{

  },
  ExpandIconContainerRotated:{
    transform: [{rotateX:"180deg"}]
  },
  Exercise:{
    backgroundColor : "#3b3b3b",
    paddingLeft:5,
    paddingRight:10,
    marginTop:10,
    marginBottom:5,
    paddingBottom:2,
    maxWidth:"75%"
  },
  ExerciseName:{
    fontSize:18,
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
