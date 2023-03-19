import React from 'react';
import { View, SafeAreaView, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { decrementQuantity, incrementQuantity } from '../CartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Ionicons
        onPress={() => {
          navigation.goBack();
        }}
        name="arrow-back-outline"
        size={24}
        color="black"
      />
      {total === 0 ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ marginTop: 40 }}>Your card is empty!</Text>
        </View>
      ) : (
        <View
          style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text>Your basket</Text>
        </View>
      )}
      <Pressable
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          marginLeft: 10,
          marginRight: 10,
          padding: 14,
        }}
      >
        {cart.map((item) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}
              key={item.id}
            >
              <Text style={{ width: 100, fontSize: 16, fontWeight: 500 }}>
                {item.name}
              </Text>
              <Pressable
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Pressable
                  onPress={() => {
                    dispatch(decrementQuantity(item));
                    dispatch(decrementQty(item));
                  }}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderColor: '#BEBEBE',
                    backgroundColor: '#E8E8E8',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#BEBEBE',
                      paddingHorizontal: 6,
                    }}
                  >
                    -
                  </Text>
                </Pressable>

                <Pressable>
                  <Text
                    style={{
                      fontSize: 19,
                      color: '#088f8f',
                      paddingHorizontal: 8,
                      fontWeight: 600,
                    }}
                  >
                    {item.quantity}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    dispatch(incrementQuantity(item));
                    dispatch(incrementQty(item));
                  }}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderColor: '#BEBEBE',
                    backgroundColor: '#E8E8E8',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#BEBEBE',
                      paddingHorizontal: 6,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    +
                  </Text>
                </Pressable>
              </Pressable>

              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                €{item.price * item.quantity}
              </Text>
            </View>
          );
        })}
      </Pressable>
      <View style={{ padding: 10 }}>
        <Text>Billing details</Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 30 }}>
          Billing Details
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 7,
            padding: 10,
            marginTop: 15,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}>
              Item Total
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '400' }}>₹{total}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 8,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}>
            Delivery Fee | 1.2KM
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#088F8F',
            }}
          >
            FREE
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>
            Free Delivery on Your order
          </Text>
        </View>
        <View
          style={{
            borderColor: 'gray',
            height: 1,
            borderWidth: 0.5,
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>
            selected Date
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#088F8F',
            }}
          >
            {/* {route.params.pickUpDate} */}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>
            No Of Days
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#088F8F',
            }}
          >
            {/* {route.params.no_Of_days} */}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>
            selected Pick Up Time
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#088F8F',
            }}
          >
            {/* {route.params.selectedTime} */}
          </Text>
        </View>
        <View
          style={{
            borderColor: 'gray',
            height: 1,
            borderWidth: 0.5,
            marginTop: 10,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 8,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>To Pay</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            €{total + 95}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
