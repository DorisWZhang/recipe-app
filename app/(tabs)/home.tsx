import { Redirect,Link } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, TextInput} from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';

export default function Home() {

    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
      });

   
    return(
        <View style = {styles.mainContainer}>
            <View style= {styles.headerContainer}> 
                <Link href='/landing' style= {{width: 0}}>
                    <FontAwesome name='arrow-left' style= {{color: '#CFCFCF',
                    marginLeft: 30
                    }}>
                    </FontAwesome>
                </Link>
                <View style= {{ width: '100%', alignItems:'center',
                    marginTop: 30
                }}>
                    <Text style = {styles.header}>
                        What will you cook today?
                    </Text>
                </View>
                </View>
            <View style={{alignItems:'center', marginLeft: -35}}>
                <TextInput placeholder='What will you cook today?' style={styles.input}>
                </TextInput>
            </View>
            
            <View style={styles.sectionContainer}>
                <Text style={styles.popularText}> Popular Today </Text>
                <View>
                    <ScrollView horizontal={true}>
                        <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            
                        </Text>
                    </ScrollView>
                </View>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create( {
    mainContainer: {
        width: '100%',
        height: '100%',
        
    
    },
    headerContainer: {
        width: '100%',
        height: '10%',
        marginTop: 25,
    },
    header: {
        fontSize: 25,
        fontFamily: 'Inter_500Medium'
    },
    input: {
        marginTop: 10,
        color: '#CFCFCF',
        borderWidth: 2,
        fontSize: 18,
        width: 325,
        height: 50,
        borderRadius: 25,
        padding: 2,
        paddingLeft: 15,
        borderColor: '#CFCFCF',
        backgroundColor: '#F1F1F1',
        fontFamily: 'Inter_400Regular',
        paddingRight: 15,
    },
    sectionContainer: {
        marginTop:15,
        marginLeft: 15,
    },
    popularText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
    }


})