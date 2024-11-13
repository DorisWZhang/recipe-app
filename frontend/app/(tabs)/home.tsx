import { Link, useFocusEffect } from 'expo-router'; 
import { StyleSheet, View, Text, Pressable, FlatList, ScrollView, TextInput} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react'; 
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';
import Recipe from '../../models/Recipe';
import RecipeCard from "../../components/RecipeCard";
import { TouchableOpacity } from 'react-native-gesture-handler';
import FilterModal from '@/components/FilterModal';


export default function Home() {

    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
      });

    // !!! its easier to parse without stringifying it!
    const [stringJSON, setJSON] = useState('')

    // searchQuery 
    const [searchQuery, setSearchQuery] = useState('')

    // list of Recipe objects
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    // visibility for filter modal
    const [visible, setVisible] = useState<boolean>(false);
    const [filters, setFilters] = useState<{ [key: string]: any }>({}); // Filter options state


    const toggleModal = (): void => {
        setVisible((prevState) => !prevState);
    };

    // make recipe as an object
    // make list of Recipe object 


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
            data = data.hits
            console.log('Recipes:', data);
            
            // get only the recipes
            // recipes rn is a json 

            setJSON(JSON.stringify(data)); // Update recipes state 
            
            // parse the JSON into Recipe objects
            const parsedRecipes = data.slice(0, 20).map((recipe:any) => {
                return new Recipe(
                    recipe.recipe.label,          // Name of the recipe
                    recipe.recipe.ingredients,    // Ingredients array
                    recipe.recipe.uri,            // Link to the recipe
                    recipe.recipe.image           // Image URL
                );
            });
            setRecipes(parsedRecipes); // Update the recipes state

            //
            
         
            console.log(parsedRecipes);

        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });



};

    useFocusEffect(
        useCallback(() => {
            // Clear search query and recipes when the page comes back into focus
            setSearchQuery('');
            setRecipes([]);
        }, [])
    );


        
      
    const parseJSON = (stringedJSON = String, ) => {


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
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='What will you cook today?' 
                    style={styles.input}
                    // make the text inputs = value searchQuery
                    value={searchQuery}  // Bind the input's value to the searchQuery state
                    // update the state of searchQuery
                    onChangeText={(text) => setSearchQuery(text)}  // Update the state on text change
                >     
                </TextInput>
                <TouchableOpacity
                    onPress={toggleModal}
                    >
                        <Text>
                            Apply more filters
                        </Text>
                    
                </TouchableOpacity>

                <FilterModal visible={visible} toggleModal={toggleModal} setFilters={setFilters}></FilterModal>
                
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
                        {recipes.length > 0 ? (
                            recipes.map((recipe, index) => (
                            <RecipeCard key={index} recipe={recipe} />
                            ))
                            ) : (<Text>No recipes available</Text>)
                        }
                    </ScrollView>
                </View>
            </View>

            {/* !! fixed favourites recipes*/ }
            <View style={styles.sectionContainer}>
                <Text style={styles.popularText}> Favourited </Text>
                <View>
                    <ScrollView horizontal={true}>
                        {recipes.length > 0 ? (
                            recipes.map((recipe, index) => (
                            <RecipeCard key={index} recipe={recipe} />
                            ))
                            ) : (<Text>No recipes available</Text>)
                        }
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
    inputContainer: {
        alignItems: 'center',
        marginLeft: -35,
        justifyContent: 'center',
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