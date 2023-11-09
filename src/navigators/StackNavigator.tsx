import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailScreen, HomeScreen} from '../screens';
import {MovieDataInterface} from '../interfaces/movieInterface';

export type RootStackParams = {
  /* colocar las rutas que vamos a tener y sus posibles parámetros */
  HomeScreen: undefined; // undefined significa que la ruta no tiene parámetros
  DetailScreen: MovieDataInterface;
};
const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    /* screenOptions={{}} para personalizar varias cosas */
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   elevation: 0, // quitar la linea abajo del header en Android
        //   shadowColor: 'transparent', // quitar la linea abajo del header en iOS
        //   backgroundColor: '#fff',
        // },
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="HomeScreen"
        options={{title: 'Home'}}
        component={HomeScreen}
      />

      <Stack.Screen
        name="DetailScreen"
        options={{title: 'Detail'}}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};
