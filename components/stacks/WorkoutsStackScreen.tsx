import React from "react"

import {createStackNavigator} from "@react-navigation/stack";

import Workouts from "../screens/Workouts";
import AddWorkout from "../screens/AddWorkout";


const WorkoutsStack = createStackNavigator();

const WorkoutsStackScreen = () => {
  return (
    <WorkoutsStack.Navigator>
        <WorkoutsStack.Screen name="Workouts" component = {Workouts} />
        <WorkoutsStack.Screen name="Add Workout" component = {AddWorkout} />
    </WorkoutsStack.Navigator>
  )
}

export default WorkoutsStackScreen