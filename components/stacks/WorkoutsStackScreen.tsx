import React from "react"

import {createStackNavigator} from "@react-navigation/stack";

import Workouts from "../screens/Workouts";
import AddWorkout from "../screens/AddWorkout";
import CopyWorkout from "../screens/CopyWorkout";


const WorkoutsStack = createStackNavigator();

const WorkoutsStackScreen = () => {
  return (
    <WorkoutsStack.Navigator>
        <WorkoutsStack.Screen name="Workouts" component = {Workouts}
          options={{
            headerLeft:()=>null,
            title: 'Workouts',
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
        <WorkoutsStack.Screen name="Add Workout" component = {AddWorkout}
        options={{
          title: 'Add/Edit Workout',
          headerStyle: {
            backgroundColor: '#292929',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            alignItems:"center",
            fontWeight: 'bold',
          },
        }}
        />
        <WorkoutsStack.Screen name="Copy Workout" component = {CopyWorkout}
        options={{
          title: 'Pick the Workout to Copy',
          headerStyle: {
            backgroundColor: '#292929',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            alignItems:"center",
            fontWeight: 'bold',
          },
        }}
        />
    </WorkoutsStack.Navigator>
  )
}

export default WorkoutsStackScreen