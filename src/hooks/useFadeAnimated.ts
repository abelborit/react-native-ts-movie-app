import {useRef} from 'react';
import {Animated} from 'react-native';

export const useFadeAnimated = (
  initialValue: number = 0,
  finishValue: number = 1,
  duration: number = 300,
) => {
  /* para hacer las animaciones tenemos un componente de React Native que es el Animated y eso tiene un objeto que cambia los valores desde 0 hasta el valor que uno quiera con cierto tiempo (en este caso serán los valores de 0 a 1 ya que la opacidad de css va de 0 a 1) */
  /* new Animated.Value(<valor inicial>) es el valor inicial y también se tiene el ValueXY por si queremos usar pares de valores (X, Y) pero aquí con el Value ya resuelve nuestro problema del efecto Fade */
  /* según la documentación nos hace incapié en usar useRef() https://reactnative.dev/docs/animated */
  const opacityAnimated = useRef(new Animated.Value(initialValue)).current;

  /* cuando el componente se crea entonces la opacidad está en 0 y lo que se requiere es decirle a la opacidad que se empiece a animar y que su valor inicial 0 vaya en este caso al valor 1. Aquí podemos usar un useEffect() pero lo haremos mediante una función */
  const fadeIn = (callback?: Function) => {
    /* Animated.timing() para manejar el tiempo */
    Animated.timing(
      /* valor al cual se estarán cambiando sus valores */
      opacityAnimated,
      {
        /* configurar el efecto */
        toValue: finishValue, // a qué valor se quiere llegar
        duration: duration, // tiempo en milésimas de segundo 1000ms = 1s
        useNativeDriver: true, // para que sea acelerado por hardware y se verá mejor el fecto
      },
    ).start(() => {
      /* este callback se ejecuta cuando toda la animación termine */
      callback ? callback() : null;
    });
  };

  const fadeOut = (durationFadeOut: number = 300) => {
    /* Animated.timing() para manejar el tiempo */
    Animated.timing(
      /* valor al cual se estarán cambiando sus valores */
      opacityAnimated,
      {
        /* configurar el efecto */
        toValue: initialValue, // a qué valor se quiere llegar
        duration: durationFadeOut, // tiempo en milésimas de segundo 1000ms = 1s
        useNativeDriver: true, // para que sea acelerado por hardware y se verá mejor el fecto
      },
    ).start();
  };

  return {opacityAnimated, fadeIn, fadeOut};
};
