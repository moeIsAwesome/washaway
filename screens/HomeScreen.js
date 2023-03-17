import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

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
    console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log('response from LOCATION', response);

      //==> Response from location would be an array of objects, basically it should be an array with only one element, but there might be multiple addresses for the same location, so we are looping through the array and updating the address with the last element of the array.

      for (let item of response) {
        let address = `${item.country}, ${item.name}, ${item.city}, `;
        setDisplayCurrentLocation(address);
        console.log(address, 'address');
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
      <Text style={styles.text}>{displayCurrentLocation}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'red',
  },
});
