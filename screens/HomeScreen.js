import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { getProducts } from '../ProductReducer';

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const [displayCurrentLocation, setDisplayCurrentLocation] = useState(
    'Loading your location...'
  );

  const checkIfLocationIsEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location services not enabled',
        'Please enable the location service',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission to access location was denied',
        'Please allow the app to access your location',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      //==> Response from location would be an array of objects, basically it should be an array with only one element, but there might be multiple addresses for the same location, so we are looping through the array and updating the address with the last element of the array.

      for (let item of response) {
        let address = `${item.country}, ${item.name}, ${item.city}, `;
        setDisplayCurrentLocation(address);
      }
    }
  };

  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationIsEnabled();
    getCurrentLocation();
  });

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = () => {
      services.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  // products data
  const services = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4643/4643574.png',
      name: 'shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: '11',
      image: 'https://cdn-icons-png.flaticon.com/128/892/892458.png',
      name: 'T-shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: '12',
      image: 'https://cdn-icons-png.flaticon.com/128/9609/9609161.png',
      name: 'dresses',
      quantity: 0,
      price: 10,
    },
    {
      id: '13',
      image: 'https://cdn-icons-png.flaticon.com/128/599/599388.png',
      name: 'jeans',
      quantity: 0,
      price: 10,
    },
    {
      id: '14',
      image: 'https://cdn-icons-png.flaticon.com/128/9431/9431166.png',
      name: 'Sweater',
      quantity: 0,
      price: 10,
    },
    {
      id: '15',
      image: 'https://cdn-icons-png.flaticon.com/128/3345/3345397.png',
      name: 'shorts',
      quantity: 0,
      price: 10,
    },
    {
      id: '16',
      image: 'https://cdn-icons-png.flaticon.com/128/293/293241.png',
      name: 'Sleeveless',
      quantity: 0,
      price: 10,
    },
  ];
  return (
    <>
      <ScrollView style={{ backgroundColor: '#f0f0f0', flex: 1 }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
        >
          {Platform.OS === 'ios' ? (
            <Ionicons name="ios-location" size={24} color="orange" />
          ) : (
            <MaterialIcons name="location-on" size={24} color="orange" />
          )}
          <View>
            <Text style={styles.addressTitle}>Home</Text>
            <Text style={styles.addressText}>{displayCurrentLocation}</Text>
          </View>
          <Pressable style={{ marginLeft: 'auto', marginRight: 7 }}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://lh3.googleusercontent.com/ogw/AAEL6shMEiPwvrpjjN6RoNW68FfIJ9QqiU7Anl1H7d3b=s64-c-mo',
              }}
            />
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 0.8,
            borderColor: 'lightgrey',
            borderRadius: 10,
          }}
        >
          <TextInput placeholder="Search for items..." keyboardType="numeric" />
          <Ionicons name="md-search" size={24} color="orange" />
        </View>
        <Carousel />
        <Services />
        {product.map((item) => (
          <DressItem key={item.id} item={item} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: '#088f8f',
            padding: 18,
            marginBottom: 30,
            margin: 15,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: 600, color: 'white' }}>
              {cart.length} items | ${total}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 300,
                color: 'white',
                marginVertical: 5,
              }}
            >
              Extra charges might apply
            </Text>
          </View>
          <Pressable>
            <Text style={{ fontSize: 17, fontWeight: 600, color: 'white' }}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 12,
    color: 'black',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
