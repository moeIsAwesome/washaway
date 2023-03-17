import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
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
  return (
    <View style={styles.wrapper}>
      {Platform.OS === 'ios' ? (
        <Ionicons name="ios-location" size={24} color="black" />
      ) : (
        <MaterialIcons name="location-on" size={24} color="black" />
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
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
