import { Tabs } from "expo-router"

export default () => {
    return(
        <Tabs screenOptions={{
            headerShown: false, // Hide the header on all screens
          }}>
            <Tabs.Screen name='home' />
        </Tabs>
    )
}