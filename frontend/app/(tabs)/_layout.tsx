import { Tabs } from "expo-router"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchFavRecipes } from "@/api/recipe";


export default () => {
    fetchFavRecipes()
    return(
        <Tabs screenOptions={{
            headerShown: false, // Hide the header on all screens
          }}>
            <Tabs.Screen 
                name='home' 
                options={{ 
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ), // Set the icon for the home tab
                }} 
            />
            <Tabs.Screen 
                name='profile' 
                options={{ 
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ), // Set the icon for the profile tab
                }}
                
            />
        </Tabs>
        
    )
    
}