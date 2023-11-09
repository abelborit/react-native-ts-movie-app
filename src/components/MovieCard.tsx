import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {MovieDataInterface} from '../interfaces/movieInterface';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigators/StackNavigator';

interface MovieCardProps {
  movie: MovieDataInterface;
  heightProp?: number;
  widthProp?: number;
}

export const MovieCard = ({
  movie,
  heightProp = 420,
  widthProp = 300,
}: MovieCardProps) => {
  /* https://developer.themoviedb.org/docs/image-basics */
  const uriImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  /* el useNavigation es un hook que llama a una función entonces al tener tantos elementos en pantalla se estaría llamando varias veces pero estos elementos están pasados internamente por referencia a este useNavigation lo que lo hace también óptimo y eficiente y también que este hook no dispara ninguna renderización del componente, pero cabe recalcar que es un hook y hace uso de funciones */
  /* OTRA FORMA: en vez de usar el hook useNavigation también se puede hacer que el HomeScreen le pase como prop el navigation a este MovieCard o sino al HorizontalSlider porque adentro hace uso de este MovieCard y de esta forma sería un poco más tedioso estar pasando propiedades pero ya se tendría todo en el componente padre lo que puede ser que sea más óptimo que usar el hook useNavigation */
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', movie)}
      activeOpacity={0.8}
      style={{
        ...styles.container,
        width: widthProp,
        height: heightProp,
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: uriImage,
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginHorizontal: 8,
  },
  imageContainer: {
    flex: 1, // para que tome todo el largo y ancho de su padre
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    flex: 1,
    borderRadius: 20,
  },
});
