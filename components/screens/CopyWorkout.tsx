import React, { useContext } from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {WorkoutContext} from "../context/WorkoutContext"

import Workout from '../models/Workout';
import BarebonesWorkoutView from '../BarebonesWorkoutView';


interface Props 
{
  navigation:any,
}

const CopyWorkout:React.FC<Props> = ({navigation}) => {
 
  const {workouts} = useContext(WorkoutContext)

  const copyWorkout = (workout:Workout) => {
    navigation.navigate("Add Workout",{copiedWorkout:workout});
  }


  return (
    <View style={styles.Container}>
      <FlatList 
      style={styles.List}
      inverted data={workouts} 
      keyExtractor={(item)=> item.workoutDate}
      renderItem={({item}) =>
      <BarebonesWorkoutView
      copyWorkout={copyWorkout}
      workout={item}/>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    height:"100%",
    backgroundColor: "#1f1f1f",
  },
  List:{
    height:"90%"
  }
});

export default CopyWorkout;
