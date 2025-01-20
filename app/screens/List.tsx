import { View, Text , Button } from 'react-native'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '@/FirebaseConfig'

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
    <View>
      <Button onPress={()=>navigation.navigate("Details")} title='Open Details'/>
      <Button onPress={handleLogout} title='LOGOUT'/>
      
    </View>
  )
}

export default List