import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter
import React, { useState } from 'react';
import Account from '../models/Account';
import { sharedData } from '@/components/SharedData';
import Recipe from '../models/Recipe';
import { parse } from '@babel/core';
import { fetchFavRecipes } from '@/api/recipe';



export default function Login() {
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const router = useRouter(); // Create router instance to navigate

    // go save all the fave recipes by url

    const handleClick = async () => {
        console.log('User clicked login');
        if (!userName || !passWord) {
            alert("Please fill out all fields");
        } else {
            try {
                const response = await fetch('http://localhost:3000/user/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: userName,
                        password: passWord
                    }),
                });

                const data = await response.json();

                // Check the response status
                if (response.ok) {
                    sharedData.username=userName;
                    fetchFavRecipes();
                    // Navigate to home screen only if login is successful
                    router.push({
                        pathname: '/home',
                    });

                } else {
                    alert(data.error || 'Login failed.');
                }

            } catch (error) {
                console.error('Error logging in:', error);
                alert('Login request failed.');
            }
        }
    };

    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
    });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <FontAwesome name='arrow-left' style={styles.backIcon} onPress={() => router.push('/landing')} />
                <Text style={styles.header}>
                    Login
                </Text>
            </View>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    value={userName}
                    onChangeText={setUserName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={passWord}
                    onChangeText={setPassWord}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleClick}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        width: '100%',
        height: '10%',
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    backIcon: {
        color: '#CFCFCF',
        position: 'absolute',
        left: 35,
    },
    header: {
        color: '#2A2C41',
        fontSize: 25,
        fontFamily: 'Inter_500Medium',
        fontWeight: 600,
    },
    container: {
        width: '100%',
        height: '90%',
        marginTop: 175,
        alignItems: 'center',
    },
    input: {
        marginTop: 30,
        color: '#CFCFCF',
        borderWidth: 2,
        fontSize: 18,
        width: 300,
        height: 50,
        borderRadius: 25,
        padding: 2,
        paddingLeft: 15,
        borderColor: '#CFCFCF',
        backgroundColor: '#F1F1F1',
        fontFamily: 'Inter_400Regular',
        paddingRight: 15,
    },
    button: {
        backgroundColor: '#FFC350',
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 25,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
        fontFamily: 'Inter_500Medium',
    },
});
