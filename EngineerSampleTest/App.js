/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Listing from './src/screens/ListingScreen';
import ListingDetails from './src/screens/ListingDetails';

const Stack = createStackNavigator();

function MyState() {
  return (
    <Stack.Navigator initialRouteName="Listing">
      <Stack.Screen
        name="Listing"
        component={Listing}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ListingDetails"
        component={ListingDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyState />
    </NavigationContainer>
  );
}
