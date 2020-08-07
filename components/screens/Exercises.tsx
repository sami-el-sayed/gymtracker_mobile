import React,{useState, useContext} from 'react';
import {GlobalContext} from "../context/GlobalContext"
import {StyleSheet,Text, FlatList, Button, TextInput, View, TouchableOpacity} from 'react-native';

interface Props{
  navigation:any
}


const Exercises:React.FC<Props> = ({navigation}) => {

 const {exercises,addExercise} = useContext(GlobalContext)

 const [showAddExercise,setShowAddExercise] = useState<boolean>(false)

 const [exerciseToAdd,setExerciseToAdd] = useState<string>("");


 //Handles adding Exercise
 const addExerciseHandler = (exercise:string) => {
    if(addExercise) addExercise(exercise);
    setShowAddExercise(false)
 }

  return (
    <View style={styles.Container}>
      <Text style={styles.Title}> Add All your Exercises and track your progress! </Text>
      <FlatList
        style={styles.List}
        data={exercises} 
        renderItem={({item}) => 
        <TouchableOpacity style={styles.Item} onPress={()=>navigation.push("ExerciseDetail")}><Text style={styles.ItemText}>{item}</Text></TouchableOpacity>}
      />
      {showAddExercise === false ? 
      <TouchableOpacity
      style={styles.Button}
      onPress={()=>setShowAddExercise(true)} 
     >
       <Text style={styles.ButtonText}> Add Exercise </Text>
     </TouchableOpacity>
      :
      <View>
        <TextInput
        style={styles.TextInput}
        onChangeText={text => setExerciseToAdd(text)}
        value={exerciseToAdd}
        /> 
        <TouchableOpacity
         style={styles.Button}
         onPress={()=>addExerciseHandler(exerciseToAdd)}
        >
          <Text style={styles.ButtonText}> Save </Text>
        </TouchableOpacity>

      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    backgroundColor: "#1f1f1f",
    height: "100%",
  },
  Title:{
    backgroundColor : "#3b3b3b",
    color:"#fff",
    fontSize:16
  },
  List:{
    marginTop: 24,
    height:"80%",
    paddingLeft:10,
  },
  Item:{
    width:"80%",
    backgroundColor:"#3b3b3b",
    marginBottom:16,
    padding:8
  },
  ItemText:{
    fontSize:16,
    color:"#fff"
  },
  TextInput:{
    backgroundColor:"#3b3b3b",
    color:"#fff"
  },
  Button:{
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    padding: 10,
  },
  ButtonText:{
    fontSize:16,
    color:"#d4d4d4",
    textTransform:"uppercase"
  }
});

export default Exercises;
