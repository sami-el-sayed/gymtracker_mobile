import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {StyleSheet} from 'react-native';

import { ExerciseProvider } from "./components/context/ExerciseContext";
import { WorkoutProvider } from './components/context/WorkoutContext';
import { SettingsProvider } from './components/context/SettingsContext';


import ExercisesStackScreen from './components/stacks/ExercisesStackScreen';
import WorkoutsStackScreen from './components/stacks/WorkoutsStackScreen';
import Settings from './components/screens/Settings';


declare const global: {HermesInternal: null | {}};


const Tabs = createBottomTabNavigator();

const App = () => {
  return (
      <WorkoutProvider>
      <ExerciseProvider>
      <SettingsProvider>
        <NavigationContainer>
        <Tabs.Navigator
        tabBarOptions={{
          activeBackgroundColor:"#171717",
          inactiveBackgroundColor:"#292929",
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle:{
            fontSize:14
          }
        }}
        >
          <Tabs.Screen name="Exercises" component={ExercisesStackScreen as any} />
          <Tabs.Screen name="Workouts" component={WorkoutsStackScreen as any} />
          <Tabs.Screen name="Settings" component={Settings} />
        </Tabs.Navigator>
      </NavigationContainer>
      </SettingsProvider>
      </ExerciseProvider>
      </WorkoutProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
