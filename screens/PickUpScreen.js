import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState([]);
  const deliveryTime = [
    { id: '1', time: '10:00 AM' },
    { id: '2', time: '11:00 AM' },
    { id: '3', time: '12:00 PM' },
    { id: '4', time: '01:00 PM' },
    { id: '5', time: '02:00 PM' },
  ];

  const proceedToCart = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Empty', 'Please select all the fields!', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
    if (selectedDate && selectedTime) {
      navigation.replace('Cart');
    }
  };

  return (
    <>
      <SafeAreaView>
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10 }}>
          Enter address:
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: 'gray',
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
          placeholder="Enter your name"
        />
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10 }}>
          Pickup date:
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date('2023-08-20')}
          endDate={new Date('2023-08-25')}
          initialSelectedDate={new Date('2023-08-22')}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#777"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10 }}>
          Pickup time:
        </Text>
        <ScrollView horizontal>
          {deliveryTime.map((item) => {
            return (
              <Pressable
                key={item.id}
                style={
                  selectedTime.includes(item.time)
                    ? {
                        margin: 10,
                        borderRadius: 7,
                        padding: 15,
                        borderColor: 'red',
                        borderWidth: 0.7,
                      }
                    : {
                        margin: 10,
                        borderRadius: 7,
                        padding: 15,
                        borderColor: 'gray',
                        borderWidth: 0.7,
                      }
                }
                onPress={() => {
                  setSelectedTime(item.time);
                }}
              >
                <Text>{item.time}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <Pressable
          style={{
            backgroundColor: '#088f8f',
            marginTop: 20,

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
          <Pressable onPress={proceedToCart}>
            <Text style={{ fontSize: 17, fontWeight: 600, color: 'white' }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  selectedItemTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  flatListContainerStyle: {
    marginTop: 10,
  },
});
