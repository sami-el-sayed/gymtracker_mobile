import React,{useState, useContext,useEffect,useRef} from 'react';
import {ExerciseContext} from "../context/ExerciseContext";
import DropdownAlert from 'react-native-dropdownalert';
import {StyleSheet,Text, FlatList, TextInput, View, TouchableOpacity, Image, Alert} from 'react-native';


import DeleteIcon from "../icons/delete_icon.png"
import addExerciseValidation from '../helpers/form_validation/addExerciseValidation';
import NoDataView from '../NoDataView';

interface Props{
  navigation:any
}


const Exercises:React.FC<Props> = ({navigation}) => {

 const {exercises,addExercise,deleteExecise} = useContext(ExerciseContext)
 const [filteredExercises,setFilteredExercises] = useState<string[]>([]);
 
 const dropDownAlertRef = useRef<DropdownAlert | null>(null);


 const [showAddExercise,setShowAddExercise] = useState<boolean>(false)

 const [exerciseToAdd,setExerciseToAdd] = useState<string>("");
 const [searchedExercise,setSearchedExercise] = useState<string>("");


 useEffect(()=>{
   if(exercises === undefined) return
  setFilteredExercises(exercises.filter((exercise)=>exercise.includes(searchedExercise)))
 },[exercises,searchedExercise]) 


 
 const goToExerciseDetailsHandler = (exercise:string) => {
  navigation.navigate("Exercise Detail",{exercise:exercise});
 }



 //Handles adding Exercise
 const addExerciseHandler = async (exercise:string) => {
    if(!addExercise) return 

    const exerciseValidated:[boolean,string?] = addExerciseValidation(exercise);
    if(exerciseValidated[0] === false){
      dropDownAlertRef.current?.alertWithType("error","Error",`${exerciseValidated[1]}`);
      return
    }

    const exerciseAdded = await addExercise(exercise);
    if(exerciseAdded[0] === false){
      dropDownAlertRef.current?.alertWithType("error","Error",`${exerciseAdded[1]}`);
    }
    else{
      setExerciseToAdd("");
      setShowAddExercise(false)  
    }
 }

 //Handles deleting Exercise
 //Creates Alert to see if the user is sure about it 
 const deleteExerciseHandler = (exercise:string) => {
  if(deleteExecise === undefined) return;
  
  Alert.alert(
    "Are you sure about deleting this Exercise?",
    "Info about it will remain in your old Workouts you wont be able to add new progress with it!",
    [
      { text: "OK", onPress: () => deleteExecise(exercise) },
      {
        text: "Cancel",onPress: () => {},style: "cancel"
      },
    ],
    { cancelable: false }
  );
  
 }


  return (
    <View style={styles.Container}>
      {!exercises || exercises.length === 0 ? 
      <NoDataView
      option={"exercises"}
      />
      :
      <View>
        <View style={styles.Search}>
          <Text style={styles.SearchText}> Search: </Text>
          <TextInput
          style={styles.SearchInput}
          onChangeText={text => setSearchedExercise(text)}
          value={searchedExercise}
          /> 
        </View>
        <FlatList
        keyExtractor={(item)=>item.toString()}
        style={styles.List}
        data={filteredExercises} 
        renderItem={({item}) => 
        <View style={styles.ExerciseContainer}>
          <TouchableOpacity style={styles.Item} onPress={()=>goToExerciseDetailsHandler(item)}><Text style={styles.ItemText}>{item}</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>deleteExerciseHandler(item)}><Image style={styles.Icon} source={DeleteIcon}/></TouchableOpacity>
        </View>
        }
        />
      </View>
      }
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
      <DropdownAlert ref={dropDownAlertRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    backgroundColor: "#1f1f1f",
    height: "100%",
    flex: 1,
    justifyContent: 'flex-end',  

  },
  Search:{
    paddingLeft:10,
    color:"#fff",
    fontSize:16,
    flexDirection:"row",
    alignItems:"center"
  },
  SearchText:{
    color:"#fff",
    fontSize:16,
    textTransform:"uppercase",
    backgroundColor : "#3b3b3b",
    marginRight:20,
    paddingTop:15,
    paddingBottom:15

  },
  SearchInput:{
    backgroundColor : "#3b3b3b",
    width:"58%",
    color:"#fff"
  },
  List:{
    marginTop: 24,
    height:"80%",
    paddingLeft:10,
  },
  ExerciseContainer:{
    backgroundColor:"#3b3b3b",
    flexDirection:"row",
    marginBottom:16,
    padding:8,
    alignItems:"center",
    width:"80%"
  },
  Item:{
    width:"90%"
  },
  Icon:{
    width:15,
    height:15,
    marginLeft:5,
    marginRight:15
  },

  ItemText:{
    fontSize:16,
    color:"#fff"
  },
  TextInput:{
    backgroundColor:"#3b3b3b",
    color:"#fff",
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

export default Exercises;
