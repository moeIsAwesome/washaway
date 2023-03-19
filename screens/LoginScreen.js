import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from '@firebase/auth';
const LoginScreen = () => {
  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, []);
  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log('user credential', userCredential);
      const user = userCredential.user;
      console.log('user', user);
    });
  };
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <View>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}
          >
            <Text style={{ fontSize: 20, marginTop: 8, fontWeight: 600 }}>
              Sign in
            </Text>
            <Text style={{ fontSize: 20, marginTop: 8, fontWeight: 600 }}>
              Sign in to your account
            </Text>
            <View style={{ marginTop: 50 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color="black"
                />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    width: 300,
                    marginVertical: 10,
                    marginLeft: 10,
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 50 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="key-outline" size={24} color="black" />
                <TextInput
                  placeholder="Password"
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    width: 300,
                    marginVertical: 10,
                    marginLeft: 10,
                  }}
                />
              </View>
            </View>
            <Pressable
              onPress={login}
              style={{
                width: 200,
                backgroundColor: '#318CE7',
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Text
                style={{ fontSize: 18, textAlign: 'center', color: 'white' }}
              >
                Login
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Register')}
              style={{
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#666',
                }}
              >
                Don't have an account? Sign up!
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
