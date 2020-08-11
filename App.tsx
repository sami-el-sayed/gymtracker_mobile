import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {StyleSheet} from 'react-native';

import {GlobalProvider} from "./components/context/GlobalContext"

import ExercisesStackScreen from './components/stacks/ExercisesStackScreen';
import WorkoutsStackScreen from './components/stacks/WorkoutsStackScreen';
import Profile from './components/screens/Profile';



declare const global: {HermesInternal: null | {}};


const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <GlobalProvider>
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
          <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
