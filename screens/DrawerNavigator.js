import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';  
import axios from 'axios';

const CustomDrawerContent = (props) => {
  const [drawerData, setDrawerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrawerData = async () => {
      try {
        const response = await axios.get('https://chillyapple.com/SN-CH-Test/api/AppMenus/myMenus.json?city_id=1');
        if (response.data) {
          setDrawerData(response.data.menus || []);
        } else {
          setDrawerData([]); 
        }
      } catch (err) {
        console.error('Error fetching drawer data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawerData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Welcome</Text>
        </View>
        {drawerData.length > 0 ? (
          drawerData.map((item, index) => (
            <DrawerItem
              key={index}
              label={item.name}
              onPress={() => props.navigation.navigate(item.screen)}
            />
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No menu items available</Text>
          </View>
        )}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 310,
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    padding: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
  },
});

export default DrawerNavigator;
