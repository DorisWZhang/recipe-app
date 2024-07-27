import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useFonts, Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Navigator } from 'expo-router';




export default function Login() {

    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        
      });

    return (
        <View style= {styles.mainContainer}>
            <View style= {styles.headerContainer}> 
                    <FontAwesome name='arrow-left' style= {{color: '#CFCFCF',
                    marginLeft: 30
                    }}>
                        <Link href='/landing'>
                        </Link>
                    </FontAwesome>
                <View style= {{ width: '100%', alignItems:'center',
                    marginTop: 30
                }}>
                    <Text style = {styles.header}>
                        Login
                    </Text>
                </View>
            </View>
            <View style= {styles.container}>
                

                <TextInput
                style = {styles.input}
                placeholder='Email'
                />
                <TextInput
                style = {styles.input}
                placeholder='Password'
                />
                <Link href='/home'>
                    <TouchableOpacity style = {styles.button}>
                        <Text style = {styles.buttonText}>Login</Text>
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
    },
    headerContainer: {
        width: '100%',
        height: '10%',
        marginTop: 25,
    },
    container: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 25,
        fontFamily: 'Inter_500Medium'
    },
    input: {
        marginTop: 30,
        color: '#CFCFCF',
        borderWidth: 2,
        fontSize:18,
        width: 300,
        height:50,
        borderRadius: 25,
        padding: 2,
        paddingLeft: 15,
        borderColor: '#CFCFCF',
        backgroundColor: '#F1F1F1',
        fontFamily: 'Inter_400Regular',
        paddingRight: 15,
    },
    button: {
        backgroundColor:'#FFC350',
        height:50,
        width:300,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 25,
        marginTop: 25
    },
    buttonText: {
        fontSize: 20,
        color:'white',
        fontWeight: '500',
        fontFamily:'Inter_500Medium'
    }
})