import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const categories = [
    { id: '1', name: 'Fresh Vegetables', image: require('../assets/logo/apple.png') },
    { id: '2', name: 'Exotic Vegetables', image: require('../assets/logo/apple.png') },
    { id: '3', name: 'Fresh Fruits', image: require('../assets/logo/apple.png') },
    { id: '4', name: 'Aluminium Foil', image: require('../assets/logo/apple.png') },
    { id: '5', name: 'Grocery', image: require('../assets/logo/apple.png') },
    { id: '6', name: 'Offers Category', image: require('../assets/logo/apple.png') },
    { id: '7', name: 'Bulk Order', image: require('../assets/logo/apple.png') },
    { id: '8', name: 'Dairy Products', image: require('../assets/logo/apple.png') },
  ];

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Home</Text>
          <View style={styles.iconsContainer}>
            <Icon name="notifications-outline" size={25} color="white" style={styles.icon} />
            <Icon name="cart-outline" size={25} color="white" style={styles.icon} />
          </View>
        </View>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for Products"
            placeholderTextColor="#888"
          />
        </View>

        <Text style={styles.sectionTitle}>Brand Store</Text>
        <View style={styles.brandStore}>
          <Image source={require('../assets/logo/apple.png')} style={styles.brandImage} />
        </View>
        <View>
          <Text style={styles.brandText}>CHILLY APPLE</Text>
        </View>

        <Text style={styles.sectionTitle}>Shop By Category</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.categoryGrid}
        />
        <TouchableOpacity style={styles.referAndEarn}>
          <Text style={styles.referText}>Refer & Earn</Text>
          <Text style={styles.referSubText}>Refer a friend or family for discounts on all groceries.</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  headerTitle: {
    fontSize: 25,
    color: 'white',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  searchBarContainer: {
    backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  searchBar: {
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 15,
  },
  brandStore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  brandImage: {
    width: 80,
    height: 80,
    marginLeft: 20,
    marginRight: 10,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: -15,
    marginBottom: 8,
  },
  categoryContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  categoryImage: {
    width: 50,
    height: 60,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 13,
    textAlign: 'center',
  },
  referAndEarn: {
    borderStyle: 'dashed',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 30,
    width: 360,
    height: 120,
    marginBottom: 20,
    marginLeft: 25,
  },
  referText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: 10,
  },
  referSubText: {
    fontSize: 15,
    color: '#555',
    marginTop: 10,
    marginLeft: 25,
  },
});

export default HomeScreen;
