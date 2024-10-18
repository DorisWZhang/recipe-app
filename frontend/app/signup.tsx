import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useFonts, Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react'; 
import { Link } from 'expo-router';


export default function SignUp() {

    // temporary that updates as user changes the text boxes
    const [tempUserName, setTempUserName] = useState('');
    const [tempName, setTempName] = useState('');
    const [tempPassword, setTempPassword] = useState('');

    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        if (!userName || !name || !password) {
            alert('Please fill in all fields');
        } else { 
            setUserName(tempUserName);
            setName(tempName);
            setPassword(tempPassword);
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
                value={tempUserName}
                onChangeText={setTempUserName}
                />
                <TextInput
                style = {styles.input}
                placeholder='Username'
                value={tempName}
                onChangeText={setTempName}
                />
                <TextInput
                style = {styles.input}
                placeholder='Password'
                value = {tempPassword}
                onChangeText={setTempPassword}
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
