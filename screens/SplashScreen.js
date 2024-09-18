import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from "react-native";

export default function SplashScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    source={require('../assets/logo/logo.png')} // Replace with your app logo path
                    style={styles.logo}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});
