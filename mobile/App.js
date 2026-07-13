import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Ballina     from './src/screens/Ballina';
import Login       from './src/screens/Login';
import Register    from './src/screens/Register';
import Contact     from './src/screens/Contact';
import ShtoProdukt from './src/screens/ShtoProdukt';
import Profile     from './src/screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Ballina"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Ballina"     component={Ballina} />
        <Stack.Screen name="Login"       component={Login} />
        <Stack.Screen name="Register"    component={Register} />
        <Stack.Screen name="Contact"     component={Contact} />
        <Stack.Screen name="ShtoProdukt" component={ShtoProdukt} />
        <Stack.Screen name="Profile"     component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
