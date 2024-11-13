import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useFonts, Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react'; 
import { Link } from 'expo-router';


export default function SignUp() {

    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    const handleClick = async () => {
        if (!userName || !name || !password) {
            alert('Please fill in all fields');
        } else { 
            // !!!check database to see if an existing account with user exists
            // if not save 
            try {
                const response = await fetch('http://localhost:3000/user/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name, 
                        username: userName, 
                        password: password }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    alert('User registered successfully!');

                } else {
                    alert(data.error || 'Registration failed.');
                }
            } catch (error) {
                console.error('Error registering user:', error);
                alert('did not work');
            }

        }

    };

    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        
      });



    return (
        <View style= {styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Link href='/landing' asChild>
                    <FontAwesome name='arrow-left' style={styles.backIcon} />
                </Link>
                <Text style={styles.header}>
                    Sign up
                </Text>
            </View>

            <View style= {styles.container}>
                
                <TextInput
                style = {styles.input}
                placeholder='Name'
                value={name}
                onChangeText={setName}
                />
                <TextInput
                style = {styles.input}
                placeholder='Username'
                value={userName}
                onChangeText={setUserName}
                />
                <TextInput
                style = {styles.input}
                placeholder='Password'
                value = {password}
                onChangeText={setPassword}
                />
                <Link href='/home' asChild>
                    <TouchableOpacity style = {styles.button} onPress={handleClick}>
                        <Text style = {styles.buttonText}>Sign up</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
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
