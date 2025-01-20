import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView , Platform,
} from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { ActivityIndicator } from 'react-native-paper'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const SignIn = async () => {

        setLoading(true);

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            alert("Login Sucessfull");
        } catch (error) {
            console.log(error);
            alert("Login failed : " + error);
        } finally {
            setLoading(false);
        }
    }

    const SignUp = async () => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
        } catch (error) {
            console.log(error);
            alert("email send : " + error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >

            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)} ></TextInput>
            <TextInput value={password} style={styles.input} placeholder='Password' autoCapitalize='none' secureTextEntry={true} onChangeText={(text) => setPassword(text)} ></TextInput>

            {loading ? (<ActivityIndicator size="large" color='#000ff' />

            )
                : <>
                    <Button title="Login" onPress={SignIn} />
                    <Button title="Create an Account" onPress={SignUp} />
                </>
            }
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        paddingBottom:10,
    },
    keyboardAvoidingView :{
        width: '100%',

    }
});
