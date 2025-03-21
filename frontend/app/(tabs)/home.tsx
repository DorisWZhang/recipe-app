import { Link, useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router'; 
import { StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react'; 
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { FontAwesome } from '@expo/vector-icons';
import Recipe from '../../models/Recipe';
import FilterModal from '@/components/FilterModal';
import { SearchBar } from '@rneui/themed';
import RecipeCard from '@/components/RecipeCard';
import { sharedData } from '@/components/SharedData';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  const [isFocused, setIsFocused] = useState(false); // track focus state of search bar

  const [stringJSON, setJSON] = useState('');  // Raw JSON from the API
  const [searchQuery, setSearchQuery] = useState('');  // Search query input
  const [recipes, setRecipes] = useState<Recipe[]>([]);  // List of Recipe objects
  const [visible, setVisible] = useState<boolean>(false);  // Modal visibility for filters
  const [filters, setFilters] = useState<{ [key: string]: any }>({});  // Filter options state
  const [favRecipes, setFavRecipes] = useState<Recipe[]>([]);

  // !!!!!! testing
  const recipe_example = sharedData.savedRecipes[0];

  const router = useRouter();
  const userName = sharedData.username;

  const toggleModal = (): void => {
    setVisible((prevState) => !prevState);
  };

  // function to handle search request based on the ingredients
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      q: searchQuery,
      // consider adding other filters
    });

    const url = `http://localhost:3000/search?${queryParams.toString()}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const recipesData = data.hits;
        setJSON(JSON.stringify(recipesData)); // Save raw data if needed

        // Map the fetched data to Recipe objects
        const parsedRecipes = recipesData.slice(0, 20).map((recipe: any) => {
          return new Recipe(
            recipe.recipe.label,
            recipe.recipe.ingredients,
            recipe.recipe.uri,
            recipe.recipe.image
          );
        });

        // apply other filters after parsing, ex: ingredient count
        const filteredRecipes = applyFilters(parsedRecipes);
        setRecipes(filteredRecipes);  // update the state with filtered recipes
        // save them to database
        enterDatabase(filteredRecipes);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  };

  // Function to apply filters on the recipes
  function applyFilters(recipes: Recipe[]): Recipe[] {
    let filteredRecipes = recipes;

    // Apply ingredient count filter if it's specified
    if (filters.maxIngredients) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.getNumIngredients() <= filters.maxIngredients
      );
    }

    // Create more functions to filter the fetched recipes if needed

    return filteredRecipes;
  }

  // !!!! enter search results recipes into database
  const enterDatabase = async (recipes: Recipe[]) => {
    // Create an array to hold promises for all recipe requests
    const requests = recipes.map(async (recipe) => {
      const name = recipe.getName();
      console.log('Saving recipe:', { name });
  
      const data = { name: name };
      console.log('Sending recipe data:', data); // Log data before sending it
  
      try {
        const response = await fetch('http://localhost:3000/user/storerecipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log('Backend response:', result);
      } catch (error) {
        console.error('Error sending recipe:', error);
      }
    });
  
    // Wait for all requests to complete
    await Promise.all(requests);
    console.log('All recipes have been processed.');
  };

  // load recipe page depending on recipe clicked
  const clickRecipe = (recipe: Recipe) => {
    // Handle navigation to recipe detail page
  }

  // Clear search query and recipes when the page comes back into focus
  useFocusEffect(
    useCallback(() => {
      setSearchQuery('');
      setRecipes([]);
    }, [])
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}> 
        <Link href='/landing' style={{ width: 0 }}>
          <FontAwesome name='arrow-left' style={{color: '#CFCFCF', marginLeft: 30}} />
        </Link>
        <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
          <Text style={styles.header}>What will you cook today?</Text>
        </View>
        
      </View>

      <View style={styles.inputContainer}>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <TextInput 
            placeholder='What will you cook today?' 
            style={styles.input}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <View style= {{marginTop: 10, marginLeft: 10}}>
            <Pressable onPress={handleSearch} >
              <Ionicons  name="search-outline" size={30} color="#CFCFCF" />
            </Pressable>
          </View>
          
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={toggleModal} style={{alignSelf: 'flex-start'}}>
            <Text style={{fontSize: 16, marginTop: 5}}>Apply more filters</Text>
          </TouchableOpacity>
        </View>

        <FilterModal visible={visible} toggleModal={toggleModal} setFilters={setFilters} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.popularText}>Popular Today</Text>
        <ScrollView horizontal={true}>
          {applyFilters(recipes).length > 0 ? (
            applyFilters(recipes).map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          ) : (<Text>No recipes available</Text>)}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.popularText}>Favourited</Text>
        <ScrollView horizontal={true}>
          <View>{recipe_example}</View>
          {applyFilters(recipes).length > 0 ? (
            applyFilters(recipes).map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          ) : (<Text>No recipes available</Text>)}
        </ScrollView>
      </View>
    </View>
  );
}const styles = StyleSheet.create({
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
    color: '#2A2C41',
    fontSize: 25,
    fontFamily: 'Inter_500Medium'
  },
  inputContainer: {
    alignItems: 'center',
    marginLeft: 0,
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
    color: '#CFCFCF',
    borderWidth: 2,
    fontSize: 18,
    width: 325,
    height: 50,
    borderRadius: 15,
    padding: 2,
    paddingLeft: 15,
    borderColor: '#CFCFCF',
    backgroundColor: '#F1F1F1',
    fontFamily: 'Inter_400Regular',
    paddingRight: 15,
  },
  sectionContainer: {
    marginTop: 15,
    marginLeft: 15,
  },
  popularText: {
    fontSize: 20,
    color: '#2A2C41',
    fontWeight: '500',
  }
});