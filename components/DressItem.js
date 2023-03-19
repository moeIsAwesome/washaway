import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../CartReducer';
import { incrementQty, decrementQty } from '../ProductReducer';
import { incrementQuantity, decrementQuantity } from '../CartReducer';
const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(addToCart(item));
    dispatch(incrementQty(item));
  };
  const cart = useSelector((state) => state.cart.cart);

  return (
    <View>
      <Pressable
        style={{
          backgroundColor: '#f8f8f8',
          borderRadius: 8,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 10,
        }}
        r
      >
        <View>
          <Image
            style={{ height: 70, width: 70 }}
            source={{ uri: item.image }}
          />
        </View>
        <View>
          <Text
            style={{
              width: 75,
              marginBottom: 5,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {item.name}
          </Text>
          <Text style={{ color: 'gray', fontSize: 15 }}>€{item.price}</Text>
        </View>
        {cart.some((cartItem) => cartItem.id === item.id) ? (
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
                style={{ fontSize: 20, color: '#BEBEBE', paddingHorizontal: 6 }}
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
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: 'gray',
                borderWidth: 0.8,
                marginVertical: 10,
                color: '#088fbf',
                textAlign: 'center',
                padding: 5,
                borderRadius: 5,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default DressItem;
