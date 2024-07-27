import { Redirect,Link } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';

export default function Home() {

    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
      });

    const data = ['hi', 'hello', 'what up']

    return(
        <View style = {styles.mainContainer}>
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
                        What will you cook today?
                    </Text>
                </View>
                </View>
            <View>
                <Text> Popular Today </Text>
            </View>
            <View>
                
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


})