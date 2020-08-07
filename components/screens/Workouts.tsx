import React, { useContext } from 'react';
import {StyleSheet,Text, FlatList, Button, View, TouchableOpacity} from 'react-native';

import {GlobalContext} from "../context/GlobalContext"

import WorkoutView from "../WorkoutView";


interface Props 
{
  navigation: any;
}

const Workouts:React.FC<Props> = ({navigation}) => {
 
  const {workouts} = useContext(GlobalContext)

  return (
    <View style={styles.Container}>
      <Text style={styles.Title}> Here are all your Workouts !</Text>
      <FlatList style={styles.List} inverted data={workouts} renderItem={({item}) =><WorkoutView workout={item}/>}/>
      <TouchableOpacity
         style={styles.Button}
         onPress={()=>navigation.push("Add Workout")}
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
  Title:{
    backgroundColor : "#3b3b3b",
    color:"#fff",
    fontSize:16,
    marginBottom:10
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
