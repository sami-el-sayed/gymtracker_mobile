import React,{useContext,useRef} from 'react';
import {StyleSheet,Text, TouchableOpacity, View} from 'react-native';
import {SettingsContext} from "../context/SettingsContext"
import clearAppData from '../helpers/clearAppData';
import DropdownAlert from 'react-native-dropdownalert';


const Settings:React.FC = () => {

  const {showCollapsedWorkouts,switchShowCollapsedWorkouts} = useContext(SettingsContext)
  const DropdownAlertRef = useRef<DropdownAlert | null>(null);


  const setShowCollapsedWorkoutsHandler = (show:boolean) => {
    switchShowCollapsedWorkouts && switchShowCollapsedWorkouts(show);
    DropdownAlertRef?.current?.alertWithType("info","Your Settings have been changed","Reset your application to see effects")

  }

  return (
    <View style={styles.Container}>
      <View style={styles.InlineOption}>
        <Text style={styles.Text}>
          Show Collapsed Workouts
        </Text>
        <View style={styles.InlineButtons}>
        <TouchableOpacity
        onPress={()=>setShowCollapsedWorkoutsHandler(true)}
        style={styles.smallButton}
        >
          <Text style={showCollapsedWorkouts === true ? styles.TextActive : styles.Text}>Yes</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
      style={styles.smallButton}
      onPress={()=>setShowCollapsedWorkoutsHandler(false)}
     >
       <Text style={showCollapsedWorkouts === false ? styles.TextActive : styles.Text}>No</Text>
    </TouchableOpacity>
    </View>
      </View>

     <TouchableOpacity
      style={styles.Button}
      onPress={()=>clearAppData()} 
     >
       <Text style={styles.Text}>
          CLEAR WORKOUTS STARTING FROM 2 QUARTERS AGO
       </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.Button}
      onPress={()=>clearAppData()} 
     >
       <Text style={styles.Text}>
          CLEAR ALL EXERCISES
       </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.Button}
      onPress={()=>clearAppData()} 
     >
       <Text style={styles.Text}>
          CLEAR APP DATA DEBUG
       </Text>
    </TouchableOpacity>
    <DropdownAlert ref={DropdownAlertRef}/>
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    backgroundColor: "#1f1f1f",
    height:"100%"
  },
  InlineOption:{
    marginTop:20,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"center"
  },
  InlineButtons:{
    display:"flex",
    flexDirection:"row",
    width:"50%",
    justifyContent:"space-evenly"
  },
  smallButton:{
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    padding: 10,

  },
  Button:{
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    padding: 10,
    marginTop:40,
  },
  Text:{
    color:"#fff"
  },
  TextActive:{
    color: "tomato"
  },

});

export default Settings;
