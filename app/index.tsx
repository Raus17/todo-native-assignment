import React, { Children, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import List  from "./screens/List";
import Details  from "./screens/Details";
import {onAuthStateChanged, User} from "firebase/auth"
import { FIREBASE_AUTH } from "@/FirebaseConfig";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name = "My todos" component={List} options={{ headerShown: false }}/>
      <InsideStack.Screen name = "Details" component={Details}/>
    </InsideStack.Navigator>
  );
} 

export default function Index() {
  
  const [user , setUser] = useState<User | null>(null);

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH , (user) => {
      console.log('user' , user);
      setUser(user);
    })
  }, [])

  return (
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
          name="Inside"
          component={InsideLayout}
          options={{ headerShown: false }}
        />
        ) : (
          <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        )}
        
      </Stack.Navigator>
    
  );
}

