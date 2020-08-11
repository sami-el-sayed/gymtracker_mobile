import React,{useState,useContext, useEffect} from 'react';
import {StyleSheet,Text, View, FlatList} from 'react-native';
import {GlobalContext} from "../context/GlobalContext"
import loadProgress from '../helpers/loadExerciseProgress';
import Point from '../models/Point';

interface Props 
{
  route:any;
}

const ExerciseDetail:React.FC<Props> = ({route}) => {

  const {exercise} = route.params

  const {workouts} = useContext(GlobalContext)

  const [ExerciseProgress,setExerciseProgress] = useState<Point[]>([])


  useEffect(()=>{
    if(workouts) setExerciseProgress(loadProgress(workouts,exercise))
  },[workouts])

  return (
    <View style={styles.Container}>
      <FlatList
      data={ExerciseProgress}
      keyExtractor={(item)=>item.date.toString()}
      renderItem={({item})=>
      <View>
       <Text>{ item.date.toString()}</Text>
       <Text>{ item.reps}</Text>
       <Text>{ item.sets}</Text>
       <Text>{ item.weight}</Text>
       <Text>{ item.status}</Text>
      </View>
      }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    
  }
});

export default ExerciseDetail;
