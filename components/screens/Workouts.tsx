import React, { useContext,useState,useEffect } from 'react';
import {StyleSheet,Text, FlatList, View, TouchableOpacity, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {WorkoutContext} from "../context/WorkoutContext"
import {SettingsContext} from "../context/SettingsContext"


import WorkoutView from "../WorkoutView";
import Workout from '../models/Workout';
import parseDate from '../helpers/date/parseDate';


interface Props 
{
  navigation: any;
}

const Workouts:React.FC<Props> = ({navigation}) => {
 
  const {workouts,deleteWorkout,loadWorkouts} = useContext(WorkoutContext)
  const {showCollapsedWorkouts} = useContext(SettingsContext)


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
        <DateTimePicker maximumDate={new Date()}  mode="date" value={new Date()} onChange={(event,date)=>onDateChange(event,date)} />
      )}
      <View style={styles.SearchContainer}>
        {showSearch ? 
        <View style={styles.Search}>
          <TouchableOpacity
          style={styles.Button}
          onPress={()=>setShowDatePicker(true)}
          >
            <Text style={styles.ButtonTextDate}>
              {searchDate ? `${(searchDate.getMonth()+1)+'-'+searchDate.getDate()+'-'+searchDate.getFullYear()}` : "Pick Date"}</Text>
              </TouchableOpacity>
              {searchDate ?
              <View style={styles.searchButtons}>
                <TouchableOpacity
                style={styles.SearchButton}
                onPress={()=>filterWorkouts("before")}
                >
                 <Text style={styles.SearchButtonText}>{"<"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.SearchButton}
                onPress={()=>filterWorkouts("after")}
                >
                  <Text style={styles.SearchButtonText}>{">"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.SearchButton}
                onPress={()=>filterWorkouts("equals")}
                >
                  <Text style={styles.SearchButtonText}>{"="}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.SearchButton}
                onPress={()=>filterWorkouts("none")}
                >
                  <Text style={styles.SearchButtonText}>{"X"}</Text>
                </TouchableOpacity>
              </View>
              :
              <View/>
              }

        </View>
        :
        <TouchableOpacity
         style={styles.Button}
         onPress={()=>setShowSearch(true)}
        >
          <Text style={styles.ButtonText}>Search Workouts</Text>
        </TouchableOpacity>
        }
      </View>
      <FlatList 
      style={styles.List}
      inverted data={filteredWorkouts} 
      keyExtractor={(item)=> item.workoutDate}
      onEndReached={loadWorkoutsHandler}
      renderItem={({item}) =>
      <WorkoutView 
      deleteWorkout={deleteWorkoutHandler}
      goToEditWorkout={goToAddWorkoutHandler}
      showCollapsedWorkouts={showCollapsedWorkouts} 
      workout={item}/>}
      />
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
  },

  SearchContainer:{
    backgroundColor : "#3b3b3b",
    color:"#fff",
    fontSize:16,
    marginBottom:15
  },
  Search:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:10,
    paddingRight:10
  },
  searchButtons:{
    flexDirection:"row",
    alignItems: 'center',

  },
  SearchButton:{
    backgroundColor: '#3b3b3b',
    paddingLeft: 20,
    paddingRight: 20,
  },
  SearchButtonText:{
    fontSize:20,
    color:"#d4d4d4",
    textTransform:"uppercase"
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
  },
  ButtonTextDate:{
    fontSize:18,
    fontWeight:"700",
    color:"#d4d4d4",
    textTransform:"uppercase"

  }
});

export default Workouts;
