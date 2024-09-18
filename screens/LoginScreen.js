import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import axios from 'axios'; // Importing axios
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons from vector-icons

const LoginScreen = (props) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility

  const handleLogin = () => {
    if (password.length < 8) {
      setPasswordWarning('Password should be at least 8 characters long.');
      return;
    } else {
      setPasswordWarning('');
    }

    // Make the API call here
    axios
      .post('https://chillyapple.com/SN-CH-Test/api/username, password', {
        mobileNumber: mobileNumber,
        password: password,
      })
      .then((response) => {
        // Handle successful response
        const data = response.data;
        if (data.success) {
          Alert.alert('Login Successful', `Welcome ${data.username}!`);
          props.navigation.navigate('Home'); // Use props.navigation to navigate
        } else {
          Alert.alert('Login Failed', 'Invalid credentials');
        }
      })
      .catch((error) => {
        // Handle errors
        Alert.alert('Error', 'Something went wrong');
        console.error(error);
      });
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length < 8) {
      setPasswordWarning('Password should be at least 8 characters long.');
    } else {
      setPasswordWarning('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/logo/something.png')} // Replace with your background image path
        style={styles.container}
      >
        {/* App Logo */}
        <Image
          source={require('../assets/logo/logo.png')} // Replace with your app logo path
          style={styles.logo}
        />

        {/* Login Headline */}
        <Text style={styles.headline}>LOGIN</Text>
        <View style={styles.redLine} />

        {/* Mobile Number Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Mobile Number"
            keyboardType="phone-pad" // Changed to accept only numbers for mobile
            underlineColorAndroid="transparent"
            onChangeText={(text) => setMobileNumber(text)}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible} // Toggle visibility based on state
            underlineColorAndroid="transparent"
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle password visibility
          >
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'} // Change icon based on visibility state
              size={25}
              color="red"
            />
          </TouchableOpacity>
        </View>

        {/* Password warning */}
        {passwordWarning ? (
          <Text style={styles.warningText}>{passwordWarning}</Text>
        ) : null}

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Direct Navigation to Home Button */}
        <TouchableOpacity
          style={styles.directHomeButton}
          onPress={() => props.navigation.navigate('Home')}
        >
          <Text style={styles.directHomeText}>Go to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Forgot password pressed')}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            New to ChillyApple?{' '}
            <Text style={styles.signupLink} onPress={() => props.navigation.navigate('SignUpScreen')}>
              SignUp
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Optional background color for SafeArea
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 50,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  headline: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 5,
  },
  redLine: {
    width: '15%',
    height: 3,
    backgroundColor: 'red',
    marginBottom: 30,
  },
  inputContainer: {
    borderRadius: 30,
    backgroundColor: '#FFF8DC',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  inputs: {
    height: 50,
    flex: 1,
    fontSize: 16,
  },
  eyeIconContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: 'green',
    height: 55,
    width: 370,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  directHomeButton: {
    backgroundColor: 'pink',
    height: 40,
    width: 120, // Small size button
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Absolute positioning
    bottom: 20, // Positioned to the bottom-left corner
    left: 20,
  },
  directHomeText: {
    color: 'white',
    fontSize: 12, // Smaller font size
    fontWeight: 'bold',
  },
  warningText: {
    color: 'black',
    fontSize: 13,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    marginBottom: 100,
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
