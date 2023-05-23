import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Hub from './Hub';
import Camera from './Camera';
import Contact from './Contact';
import User from './User';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home} 
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen 
          name="Hub" 
          component={Hub} 
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen 
          name="Camera" 
          component={Camera} 
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen 
          name="Contact" 
          component={Contact} 
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen 
          name="User" 
          component={User} 
          options={{headerShown: false, animation: 'none'}}
        />       
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
