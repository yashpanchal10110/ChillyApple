import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [notification, setNotification] = useState('');

  const handleSendOTP = () => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    axios.get(`https://chillyapple.com/SN-CH-Test/api/send-signup-otp?mobile=${mobileNumber}`)
      .then((response) => {
        if (response.data.success) {
          setOtpSent(true);
          setNotification('OTP has been sent successfully');
          setTimeout(() => setNotification(''), 3000);
        } else {
          Alert.alert('Failed', 'OTP could not be sent');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Something went wrong');
        console.error(error);
      });
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    axios.post('https://chillyapple.com/SN-CH-Test/api/mobile,otp', { mobileNumber, otp })
      .then((response) => {
        if (response.data.success) {
          return axios.post('https://chillyapple.com/SN-CH-Test/api/sign-up', {
            name,
            email,
            mobileNumber,
            password,
            referralCode,
          });
        } else {
          throw new Error('Invalid OTP');
        }
      })
      .then((response) => {
        if (response.data.success) {
          Alert.alert('Sign Up Successful', `Welcome ${name}!`);
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Sign Up Failed', response.data.message || 'Please try again');
        }
      })
      .catch((error) => {
        console.error('Error during sign up:', error.response || error.message);
        Alert.alert('Error', 'Signup failed. ' + (error.response?.data?.message || error.message));
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/logo/dvb.png')}
        style={styles.container}
      >
        <Text style={styles.headline}>Sign Up</Text>
        <View style={styles.redLine} />

        <Text style={styles.valuable}>Give us more valuable information</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email (Optional)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainerRow}>
          <TextInput
            style={styles.inputMobile}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.otpButton} onPress={handleSendOTP}>
            <Text style={styles.otpButtonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>

        {otpSent && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Referral Code (Optional)"
                value={referralCode}
                onChangeText={setReferralCode}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>

            {notification !== '' && (
              <View style={styles.notificationBox}>
                <Text style={styles.notificationText}>{notification}</Text>
              </View>
            )}
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headline: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 12,
  },
  redLine: {
    width: '15%',
    height: 3,
    backgroundColor: 'red',
    marginBottom: 10,
  },
  inputContainer: {
    borderRadius: 30,
    backgroundColor: '#FFF8DC',
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  inputContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#FFF8DC',
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    fontSize: 16,
  },
  inputMobile: {
    height: 50,
    fontSize: 16,
    flex: 1,
  },
  otpButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  otpButtonText: {
    color: 'black',
    fontSize: 17,
  },
  button: {
    backgroundColor: 'green',
    height: 55,
    width: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  notificationBox: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 14,
  },
  valuable: {
    color: 'grey',
    marginBottom: 30,
  },
});

export default SignUpScreen;
