import React from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';
import {useFadeAnimated} from '../hooks/useFadeAnimated';

/* ejemplo del los efectos fadeIn y fadeOut usando el useFadeAnimated() */
export const FadeScreen = () => {
  const {opacityAnimated, fadeIn, fadeOut} = useFadeAnimated();

  return (
    <View style={styles.container}>
      {/* se necesita colocar el Animated.<componente a animar> porque en sus estilos tiene que aceptar una propiedad de tipo Animated.Value que es el opacityAnimated  */}
      <Animated.View
        style={{...styles.subContainer, opacity: opacityAnimated}}
      />

      <Button title="FadeIn" onPress={() => fadeIn()} />
      <Button title="FadeOut" onPress={() => fadeOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: 150,
    height: 150,
    backgroundColor: '#084F6A',
    borderColor: '#fff',
    borderWidth: 10,
    marginBottom: 20,
  },
});
