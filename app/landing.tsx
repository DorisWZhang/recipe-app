import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

export default function LandingPage() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <View />; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FastFeasts</Text>
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: '500'
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
