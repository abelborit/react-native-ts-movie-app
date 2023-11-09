import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigators/StackNavigator';
import {GradientProvider} from './src/context/GradientContext';
// import {FadeScreen} from './src/screens/FadeScreen';

export const App = () => {
  return (
    <NavigationContainer>
      <GradientProvider>
        <StackNavigator />
        {/* <FadeScreen /> */}
      </GradientProvider>
    </NavigationContainer>
  );
};
