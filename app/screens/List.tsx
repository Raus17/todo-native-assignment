import { View, Text , Button ,StyleSheet} from 'react-native'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'
import { NavigationContainer, NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Details from './Details'
import PassedEvent from './PassedEvent'

const PassedEventName = "passedEvent"
const DetailsName = "Details"


const Tab = createBottomTabNavigator();

interface RouterProps {
    navigation : NavigationProp<any , any>
}

const List = ({navigation} : RouterProps) => {

    const handleLogout = async () => {
        try {
          await FIREBASE_AUTH.signOut(); // Properly invoke the signOut method
          console.log('User signed out successfully');
          // Optionally, navigate to the login screen after logout
          navigation.navigate('Login');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
    

  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Details') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'PassedEvent') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen 
          name="Details" 
          component={Details}
          options={{headerShown: false}}
        />
        <Tab.Screen 
          name="PassedEvent" 
          component={PassedEvent} 
          options={{headerShown: false}}
        />

    {/* <Button onPress={handleLogout} title='LOGOUT'></Button> */}

      </Tab.Navigator>
        

  )
}

export default List


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});