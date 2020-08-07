import React from "react"

import {createStackNavigator} from "@react-navigation/stack"
import Exercises from "../screens/Exercises";
import ExerciseDetail from "../screens/ExerciseDetail";


const ExercisesStack = createStackNavigator();

const ExercisesStackScreen = () => {
   return (
    <ExercisesStack.Navigator>
        <ExercisesStack.Screen name="Exercises" component = {Exercises} />
        <ExercisesStack.Screen name="ExerciseDetail" component = {ExerciseDetail} />
    </ExercisesStack.Navigator>
    )
}

export default ExercisesStackScreen