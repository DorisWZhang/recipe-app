import { Tabs } from "expo-router"
import Ionicons from 'react-native-vector-icons/Ionicons';


export default () => {
    return(
        <Tabs screenOptions={{
            headerShown: false, // Hide the header on all screens
          }}>
            <Tabs.Screen 
                name='home' 
                options={{ title: 'Home' }} // Set the label for the home tab
            />
            <Tabs.Screen 
                name='profile' 
                options={{ title: 'Profile' }} // Set the label for the profile tab
            />
        </Tabs>
    )
}