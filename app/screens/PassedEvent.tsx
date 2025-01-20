import { View, Text , Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

const PassedEvent = () => {

    const handleLogout = async () => {
        try {
          await FIREBASE_AUTH.signOut();
          console.log('User signed out successfully');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
  return (
    <View>
      <Text>PassedEvent</Text>
      <Button onPress={handleLogout} title='LOGOUT'></Button>
    </View>
  )
}

export default PassedEvent