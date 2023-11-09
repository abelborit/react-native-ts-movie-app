import React, {useContext, useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GradientContext} from '../context/GradientContext';
import {useFadeAnimated} from '../hooks/useFadeAnimated';

interface GradientBackgroundProps {
  children: JSX.Element | JSX.Element[];
}

/* style={{...StyleSheet.absoluteFillObject}} es para que se pueda estirar a toda la pantalla y se usa el spread operator (...) para construir un nuevo objeto y es lo mismo que aplicar manualmente:
 {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
 }
 */
export const GradientBackground = ({children}: GradientBackgroundProps) => {
  const {currentColors, prevColors, setPrevMainColors} =
    useContext(GradientContext);
  const {opacityAnimated, fadeIn, fadeOut} = useFadeAnimated();

  /* el LinearGradient al inicio tiene que ser con los prevColors porque es quien debe mantener la transición mientras se anima otro gradiente que se pondrá encima como un fadeIn y eso dará la ilusión óptica de que el gradiente está cambiando de color pero no es cierto ya que solo se está colocando otro gradiente encima */

  /* se cambiarán los prevColors después de haber hecho las animaciones del fadeIn y fadeOut */
  useEffect(() => {
    /* cuando el fadeIn se dispara y termina entonces le voy a establecer los colores */
    fadeIn(() => {
      setPrevMainColors(currentColors);
      fadeOut(0);
    });
  }, [currentColors]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[prevColors.primaryColor, prevColors.secondaryColor, '#fff']}
        style={{...StyleSheet.absoluteFillObject}}
        start={{x: 0.1, y: 0.1}} // para tener cierta inclinación con valor de 0.1
        end={{x: 0.5, y: 0.7}} // para que termine casi a la mitad de la pantalla
      />

      {/* este <Animated.View></Animated.View> contendrá el nuevo gradiente */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: opacityAnimated,
        }}>
        <LinearGradient
          colors={[
            currentColors.primaryColor,
            currentColors.secondaryColor,
            '#fff',
          ]}
          style={{...StyleSheet.absoluteFillObject}}
          start={{x: 0.1, y: 0.1}} // para tener cierta inclinación con valor de 0.1
          end={{x: 0.5, y: 0.7}} // para que termine casi a la mitad de la pantalla
        />
      </Animated.View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
