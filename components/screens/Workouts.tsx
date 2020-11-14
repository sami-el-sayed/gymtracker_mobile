import React, { useContext,useState,useEffect } from 'react';
import {StyleSheet,Text, FlatList, View, TouchableOpacity, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {WorkoutContext} from "../context/WorkoutContext"
import {SettingsContext} from "../context/SettingsContext"


import WorkoutView from "../WorkoutView";
import Workout from '../models/Workout';
import parseDate from '../helpers/date/parseDate';
import SearchWorkoutBar from '../SearchWorkoutBar';
import getDatePlusMonth from '../helpers/date/getDatePlusMonth';
import NoDataView from '../NoDataView';


interface Props 
{
  navigation: any;
}

const Workouts:React.FC<Props> = ({navigation}) => {
 
  const {workouts,deleteWorkout,loadWorkouts} = useContext(WorkoutContext)
  const {showCollapsedWorkouts} = useContext(SettingsContext)

  //Saved Workout from add Workout created when leaving component without adding workout

  const [filteredWorkouts,setFilteredWorkouts] = useState<Workout[]>([])

  //Goes to Add Workout Screen
  //if Workout passed it means we are editing it
  //Else we are adding a new Workout
  const goToAddWorkoutHandler = (workout?:Workout) => {
    if(workout !== undefined) navigation.navigate("Add Workout",{editedWorkout:workout});
    else navigation.navigate("Add Workout",{editedWorkout:undefined});
  }

  
  useEffect(()=>{
    if(workouts) setFilteredWorkouts(workouts)
    setSearchDate(undefined)
    setShowSearch(false)
  },[workouts])

  //Filters workouts based on date and optin from search bar
  const filterWorkouts = (option:string) => {
    if(workouts === undefined) return
    if(searchDate === undefined) return

    const parsedDateElapsedTime = new Date(parseDate(searchDate)).getTime();

    switch (option) {
      case "before":
        setFilteredWorkouts(workouts.filter((workout)=>{
          return new Date(workout.workoutDate).getTime() < parsedDateElapsedTime;
        }));
        break;
      case "equals":
        setFilteredWorkouts(workouts.filter((workout)=>{
          return new Date(workout.workoutDate).getTime() === parsedDateElapsedTime;
        }));
        break;
      case "after":
        setFilteredWorkouts(workouts.filter((workout)=>{
          return new Date(workout.workoutDate).getTime() > parsedDateElapsedTime;
        }));
        break;
      default:
        setFilteredWorkouts(workouts)
        setSearchDate(undefined)
        setShowSearch(false)
        break;
    }
  }



  //When top of the list is reached tries to download more Workouts
  const loadWorkoutsHandler = () => loadWorkouts && loadWorkouts();

  //Call to deleting workout from button
  const deleteWorkoutHandler = (workout:Workout) => {

    if(deleteWorkout === undefined) return;
      
    Alert.alert(
    "Are you sure about deleting this Workout?",
    "The Progress you put in it will be gone!",
    [
      { text: "OK", onPress: () => deleteWorkout(workout)},
      {
        text: "Cancel",onPress: () => {}, style: "cancel"
      },
    ],
    { cancelable: false }
    );

  }


  //SEARCH
  const [searchDate,setSearchDate] = useState<Date | undefined>(undefined)
  const [showSearch,setShowSearch] = useState(false);
  const [showDatePicker,setShowDatePicker] = useState(false);


  const onDateChange = (event: Event, selectedDate:Date | undefined) => {
    setSearchDate(selectedDate);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.Container}>
      {showDatePicker && (
        <DateTimePicker maximumDate={getDatePlusMonth()}  mode="date" value={new Date()} onChange={(event,date)=>onDateChange(event,date)} />
      )}
      {!workouts || workouts.length === 0  ?
      <NoDataView
      option={"workouts"}
      />
      :
      <View>
        <SearchWorkoutBar
        filterWorkouts={filterWorkouts}
        showSearch={showSearch}
        searchDate={searchDate}
        setShowDatePicker={setShowDatePicker}
        setShowSearch={setShowSearch}
        />
        <FlatList 
        style={styles.List}
        inverted data={filteredWorkouts} 
        keyExtractor={(item)=> item.workoutDate}
        onEndReached={(loadWorkoutsHandler)}
        renderItem={({item}) =>
        <WorkoutView 
        deleteWorkout={deleteWorkoutHandler}
        goToEditWorkout={goToAddWorkoutHandler}
        showCollapsedWorkouts={showCollapsedWorkouts} 
        workout={item}/>}
        />
      </View>
      }
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
    flex: 1,
    justifyContent: 'flex-end',  
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
