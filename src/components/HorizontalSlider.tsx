import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {MovieDataInterface} from '../interfaces/movieInterface';
import {MovieCard} from './MovieCard';

interface HorizontalSliderProps {
  title?: string;
  moviesData: MovieDataInterface[];
}

export const HorizontalSlider = ({
  title,
  moviesData,
}: HorizontalSliderProps) => {
  return (
    <View style={{...styles.container, height: title ? 255 : 215}}>
      {title ? <Text style={styles.containerText}>{title}</Text> : null}
      {/* diferencia entre un flatlist y un map: FlatList muestra lo que sale en pantalla y va renderizando cuando es necesario, básicamente tiene lazyload, por lo que puede manejar una gran cantidad de items. Con un map también podemos mostrar una lista de items en React, ya que es una práctica común, pero en React Native, para listas grandes está recomendado FlatList sobre map por cómo gestiona la carga en pantalla de los items. */}
      <FlatList
        data={moviesData}
        renderItem={({item}: any) => (
          <MovieCard movie={item} widthProp={145} heightProp={185} />
        )}
        keyExtractor={(item: MovieDataInterface) => item.id.toString()} // el keyExtractor es como el key de los map pero este keyExtractor tiene que ser un string
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  containerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 10,
  },
});
