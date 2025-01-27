import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator, LogBox, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MainRoute from './src/navigation/main_route';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/state/store';
import { PersistGate } from 'redux-persist/integration/react';
import Colors from './src/constants/colors';

function App(): React.JSX.Element {
  LogBox.ignoreAllLogs();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          </View>
        } persistor={persistor}>
          <PaperProvider>
            <NavigationContainer>
              <MainRoute />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
