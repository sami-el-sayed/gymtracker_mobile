import React,{useState,useContext, useEffect} from 'react';
import {StyleSheet,Text, View, FlatList} from 'react-native';
import {WorkoutContext} from '../context/WorkoutContext';
import loadProgress from '../helpers/exercises/loadExerciseProgress';
import Point from '../models/Point';
import LoadWorkoutsFromStorage from '../helpers/workouts_quarters/LoadWorkoutsFromStorage';
import Workout from '../models/Workout';
import sortWorkouts from '../helpers/workouts_quarters/sortWorkouts';

interface Props 
{
  route:any;
}

const ExerciseDetail:React.FC<Props> = ({route}) => {

  const {exercise} = route.params

  const {workouts,currentQuarterIdx,quarters} = useContext(WorkoutContext)


  const [ExerciseProgress,setExerciseProgress] = useState<Workout[]>([])


  useEffect(()=>{
    if(workouts) loadPoints();
  },[workouts])

  //Sort points by Date
  const sortPoints = (pointsArr:Point[]):Point[] => pointsArr.sort((a,b)=>b.date.getTime()-a.date.getTime())

  //Loads All the Points found in the Workouts Storage
  const loadPoints = async () => {
    if(workouts === undefined) return;
    if(currentQuarterIdx === undefined) return;
    if(quarters === undefined) return; 
    
    let filteredWorkouts:Workout[] = sortWorkouts(loadProgress(workouts,exercise));
    if(currentQuarterIdx !== quarters.length-1){

      for (let i = currentQuarterIdx; i < quarters.length; i++) {
         const result = await LoadWorkoutsFromStorage(quarters[i]);
         filteredWorkouts = filteredWorkouts.concat(result[0]);
      }
      setExerciseProgress(sortWorkouts(loadProgress(filteredWorkouts,exercise)))
    }
    else setExerciseProgress(filteredWorkouts);
    

  }

  return (
    <View style={styles.Container}>
      <FlatList
      style={styles.List}
      inverted={true}
      data={ExerciseProgress}
      keyExtractor={(workout)=>workout.workoutDate.toString()}
      renderItem={({item})=>
      <View style={styles.ItemContainer}>
        <View style={styles.DateContainer}>
          <Text style={styles.Date}>{ item.workoutDate.toString()}</Text>
        </View>
        {item.exercises.map((exercise)=>{
          return(
           <View style={styles.Point}
           key={`${exercise.name+exercise.points[0].sets.toString()
            +exercise.points[0].reps.toString()
            +exercise.points[0].weight.toString()}
           `} 
           >
           <Text style={styles.SetsReps}>{exercise.points[0].sets} x {exercise.points[0].sets}</Text>
           <Text style={styles.Weight}>{exercise.points[0].weight}kg</Text>
           <Text style={styles.Status}>{exercise.points[0].status}</Text>
         </View>
          )
        })}
      </View>
      }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    height:"100%",
    backgroundColor: "#1f1f1f"
  },
  List:{
    marginTop:20,
    marginBottom:20
  },
  ItemContainer:{
    marginBottom:15
  },
  Date:{
    color:"#fff",
    fontSize:32,
  },
  DateContainer:{
    backgroundColor : "#3b3b3b",
    width:"80%",
  },
  Point:{
    backgroundColor : "#3b3b3b",
    paddingLeft:8,
    paddingRight:20,
    marginTop:10,
    marginBottom:5,
    paddingBottom:2,
    width:"50%",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  SetsReps:{
    color:"#fff",
  },
  Weight:{
    color:"#fff",
  },
  Status:{
    color:"#fff",
    textTransform:"uppercase"
  }
  
});

export default ExerciseDetail;
