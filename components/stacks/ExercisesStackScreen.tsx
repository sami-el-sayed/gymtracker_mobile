import React from "react"

import {createStackNavigator} from "@react-navigation/stack"
import Exercises from "../screens/Exercises";
import ExerciseDetail from "../screens/ExerciseDetail";


const ExercisesStack = createStackNavigator();

const ExercisesStackScreen = () => {
   return (
    <ExercisesStack.Navigator>
        <ExercisesStack.Screen name="Exercises" component = {Exercises} 
         options={{
            title: 'Exercises',
            headerStyle: {
              backgroundColor: '#292929',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              alignSelf:"center",
              fontWeight: 'bold',
            },
          }}
        />
        <ExercisesStack.Screen name="Exercise Detail" component = {ExerciseDetail} 
         options={{
            title: ' Details',
            headerStyle: {
              backgroundColor: '#292929',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
    </ExercisesStack.Navigator>
    )
}

export default ExercisesStackScreen