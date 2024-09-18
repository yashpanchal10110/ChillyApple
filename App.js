import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import DrawerNavigator from './screens/DrawerNavigator';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000); // Splash screen duration in milliseconds

    // Clear timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <>
            <StackNavigator />
            <StatusBar style="auto" backgroundColor="red" />
          </>
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // You can set your preferred background color here
  },
});

export default App;
