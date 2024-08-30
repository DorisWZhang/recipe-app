import { Redirect,Link } from 'expo-router';
import { StyleSheet, View, Text, Pressable, FlatList, ScrollView, TextInput} from 'react-native';
import React, { useState } from 'react'; // Import useState
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';

export default function Home() {

    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
      });

    const [recipes, setRecipes] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = () => {
        // Define the query parameters (example: searching for "chicken")
        

        const queryParams = new URLSearchParams({
          q: searchQuery, // Example query
          // ... Add other query parameters here
        });
      
        // Construct the full URL
        const url = `http://localhost:3000/search?${queryParams.toString()}`;
      
        // Use fetch to send a request to the backend
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log('Recipes:', data);
            
            // get only the recipes
            // recipes rn is a json 

            setRecipes(JSON.stringify(data)); // Update recipes state
            

          })
          .catch(error => {
            console.error('Error fetching recipes:', error);
          });
      };
      
 
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
                <TextInput 
                placeholder='What will you cook today?' 
                style={styles.input}
                // make the text inputs = value searchQuery
                value={searchQuery}  // Bind the input's value to the searchQuery state
                // update the state of searchQuery
                onChangeText={(text) => setSearchQuery(text)}  // Update the state on text change
                >
                </TextInput>

                    <Pressable onPress={handleSearch}>
                        <Text>
                            Search
                        </Text>
                    </Pressable>
                
            </View>
            
            <View style={styles.sectionContainer}>
                <Text style={styles.popularText}> Popular Today </Text>
                <View>
                    <ScrollView horizontal={true}>
                        <Text>
                        {recipes || 'No data available'}
            
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
        backgroundColor: 'white'
    
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