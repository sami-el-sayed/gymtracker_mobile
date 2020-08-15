import React,{useState,useContext, useEffect} from 'react';
import {StyleSheet,Text, View, FlatList} from 'react-native';
import {WorkoutContext} from '../context/WorkoutContext';
import loadProgress from '../helpers/exercises/loadExerciseProgress';
import Point from '../models/Point';
import LoadWorkoutsFromStorage from '../helpers/workouts_quarters/LoadWorkoutsFromStorage';
import Workout from '../models/Workout';

interface Props 
{
  route:any;
}

const ExerciseDetail:React.FC<Props> = ({route}) => {

  const {exercise} = route.params

  const {workouts,currentQuarterIdx,quarters} = useContext(WorkoutContext)

  const [ExerciseProgress,setExerciseProgress] = useState<Point[]>([])


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
    let points:Point[] = sortPoints(loadProgress(workouts,exercise));
    let loadedWorkouts:Workout[] = [];
    if(currentQuarterIdx !== quarters.length-1){

      for (let i = currentQuarterIdx; i < quarters.length; i++) {
         const result = await LoadWorkoutsFromStorage(quarters[i]);
         loadedWorkouts = loadedWorkouts.concat(result[0]);
      }
      setExerciseProgress(points.concat(sortPoints(loadProgress(loadedWorkouts,exercise))));
    }
    else setExerciseProgress(points);
    

  }

  return (
    <View style={styles.Container}>
      <FlatList
      style={styles.List}
      inverted={true}
      data={ExerciseProgress}
      keyExtractor={(item)=>item.date.toString()}
      renderItem={({item})=>
      <View style={styles.ItemContainer}>
        <View style={styles.DateContainer}>
          <Text style={styles.Date}>{ item.date.toString().split("00:")[0]}</Text>
        </View>
        <View style={styles.Point}>
          <Text style={styles.SetsReps}>{item.sets} x {item.reps}</Text>
          <Text style={styles.Weight}>{item.weight}kg</Text>
          <Text style={styles.Status}>{item.status}</Text>
        </View>
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
