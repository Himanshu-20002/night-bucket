
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
const App = () => {
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
         <Navigation />
    </GestureHandlerRootView>

  );
};

export default App;