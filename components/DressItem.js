import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
const DressItem = ({ item }) => {
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
        <Pressable style={{ width: 80 }}>
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
      </Pressable>
    </View>
  );
};

export default DressItem;
