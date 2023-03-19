import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView />
      <StatusBar style="auto" />
      <StackNavigator />
      <SafeAreaView />
    </Provider>
  );
}
