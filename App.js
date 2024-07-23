import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { enableScreens } from 'react-native-screens';

enableScreens();

// firebase
import { initializeApp } from 'firebase/app';
const firebaseConfig = { databaseURL: 'https://iotlightsensor-default-rtdb.asia-southeast1.firebasedatabase.app/' };
initializeApp(firebaseConfig);

// Import components
import Home from './components/HomeComponent';
import Security from './components/SecurityComponent';
import Weather from './components/WeatherComponent';
import Utility from './components/UtilityComponent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Utilities"
        component={Utility}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="wrench" color={color} size={size} />
          ),
          headerShown: false, // Hide the header
        }}
      />
      <Tab.Screen
        name="Security"
        component={Security}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shield" color={color} size={size} />
          ),
          headerShown: false, // Hide the header
        }}
      />
      <Tab.Screen
        name="Weather"
        component={Weather}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="weather-cloudy" color={color} size={size} />
          ),
          headerShown: false, // Hide the header
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }} // Hide the header for Home screen
        />
        <Stack.Screen
          name="Utility"
          component={TabNavigator}
          options={{ headerShown: false }} // Hide the header for TabNavigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}